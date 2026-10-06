import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import OTP from "@/models/OTP";
import { sendWhatsAppOtp } from "@/lib/whatsapp";

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

function generateOTP() {
  return crypto
    .randomInt(100000, 1000000)
    .toString();
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

    const otpHash = await bcrypt.hash(
      otp,
      10
    );

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

    console.log(`\n========================================\n🔑 [ILS OTP AUTH] Mobile: +91-${mobile}\n👉 Your OTP Code: ${otp}\n========================================\n`);

    // Attempt WhatsApp dispatch optionally without breaking the flow
    let whatsappResult = null;
    try {
      if (process.env.WHATSAPP_CLOUD_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
        whatsappResult = await sendWhatsAppOtp({ mobile, otp });
      }
    } catch (waError) {
      console.warn("[OTP Request] WhatsApp dispatch skipped/failed:", waError?.message || waError);
    }

    return NextResponse.json(
      {
        success: true,
        message: whatsappResult?.sent
          ? "OTP sent to your WhatsApp successfully"
          : "OTP generated from backend successfully",
        expiresIn: 300,
        otp,
        devOtp: otp,
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
        message:
          "Unable to generate OTP",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}