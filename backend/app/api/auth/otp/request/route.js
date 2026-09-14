import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import OTP from "@/models/OTP";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function normalizeMobile(value) {
  return String(value || "").replace(/\D/g, "");
}

function generateOTP() {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    const mobile = normalizeMobile(body.mobile);

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

    await connectDB();

    await OTP.deleteMany({
      mobile,
      verified: false,
    });

    const otp = generateOTP();

    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await OTP.create({
      mobile,
      otpHash,
      expiresAt,
      attempts: 0,
      verified: false,
    });

    console.log(
      `ILS OTP for +91${mobile}: ${otp}`
    );

    return NextResponse.json(
      {
        success: true,
        message: "OTP generated successfully",
        expiresIn: 300,

        ...(process.env.NODE_ENV !== "production"
          ? { devOtp: otp }
          : {}),
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "OTP request error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate OTP",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}