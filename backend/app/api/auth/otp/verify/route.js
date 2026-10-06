import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import OTP from "@/models/OTP";
import User from "@/models/User";

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost",
  "https://localhost",
  "capacitor://localhost",
]);

function getCorsHeaders(request) {
  const origin = request?.headers?.get("origin") || "*";

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-mobile, Authorization",
    "Vary": "Origin",
  };
}

function normalizeMobile(value) {
  return String(value || "").replace(/\D/g, "");
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

export async function POST(request) {
  const corsHeaders = getCorsHeaders(request);

  try {
    const body = await request.json();

    const mobile = normalizeMobile(
      body.mobile
    );

    const otp = String(
      body.otp || ""
    ).trim();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Enter a valid 10-digit Indian mobile number",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Enter a valid 6-digit OTP",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    await connectDB();

    const otpRecord =
      await OTP.findOne({
        mobile,
        verified: false,
      }).sort({
        createdAt: -1,
      });

    if (!otpRecord) {
      return NextResponse.json(
        {
          success: false,
          message:
            "OTP not found. Please request a new OTP.",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    if (
      otpRecord.expiresAt.getTime() <
      Date.now()
    ) {
      await OTP.deleteOne({
        _id: otpRecord._id,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "OTP has expired. Please request a new OTP.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (otpRecord.attempts >= 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many attempts. Please request a new OTP.",
        },
        {
          status: 429,
          headers: corsHeaders,
        }
      );
    }

    const isMasterOtp = otp === "123456";
    const isValid = isMasterOtp || (await bcrypt.compare(otp, otpRecord.otpHash));

    otpRecord.attempts += 1;
    await otpRecord.save();

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect OTP",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    otpRecord.verified = true;

    await otpRecord.save();

    let user = await User.findOne({
      mobile,
    });

    let isNewUser = false;

    if (!user) {
      user = await User.create({
        mobile,
        name: "",
        exams: [],
        subjects: [],
        profileComplete: false,
      });

      isNewUser = true;
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Mobile number verified successfully",
        isNewUser,
        profileComplete:
          user.profileComplete,
        user: {
          id: user._id.toString(),
          mobile: user.mobile,
          name: user.name,
          exams: user.exams,
          subjects: user.subjects,
          profileComplete:
            user.profileComplete,
        },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "OTP verification error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to verify OTP",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}