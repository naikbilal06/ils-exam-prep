import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const GOOGLE_CLIENT_ID =
  "363554744342-stl3n7rcatuol3hutjpv2ck2f7ei69oq.apps.googleusercontent.com";

const googleClient = new OAuth2Client(
  GOOGLE_CLIENT_ID
);

/* =========================================================
   CORS
========================================================= */

function getCorsHeaders(request) {
  const origin =
    request.headers.get("origin") || "";

  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost",
    "https://localhost",
    "capacitor://localhost",
  ];

  const allowOrigin =
    allowedOrigins.includes(origin)
      ? origin
      : "*";

  return {
    "Access-Control-Allow-Origin":
      allowOrigin,
    "Access-Control-Allow-Methods":
      "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type",
  };
}

/* =========================================================
   OPTIONS
========================================================= */

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}

/* =========================================================
   GOOGLE LOGIN
========================================================= */

export async function POST(request) {
  const corsHeaders =
    getCorsHeaders(request);

  try {
    await connectDB();

    const body = await request.json();

    const idToken =
      String(body?.idToken || "").trim();

    if (!idToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google ID token is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    /* =====================================================
       VERIFY GOOGLE ID TOKEN
    ===================================================== */

    const ticket =
      await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });

    const payload =
      ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to verify Google account.",
        },
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    const googleId =
      String(payload.sub || "").trim();

    const email =
      String(payload.email || "")
        .trim()
        .toLowerCase();

    const name =
      String(payload.name || "").trim();

    const emailVerified =
      payload.email_verified === true;

    /* =====================================================
       VALIDATE GOOGLE ACCOUNT
    ===================================================== */

    if (!googleId || !email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google account information is incomplete.",
        },
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    if (!emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Google email is not verified.",
        },
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    /* =====================================================
       FIND EXISTING USER
       1. Google ID
       2. Email
    ===================================================== */

    let user =
      await User.findOne({
        googleId,
      });

    if (!user) {
      user =
        await User.findOne({
          email,
        });
    }

    /* =====================================================
       CREATE NEW GOOGLE USER
    ===================================================== */

    if (!user) {
      user = await User.create({
        email,
        googleId,
        authProvider: "google",
        name,
        exams: [],
        subjects: [],
        profileComplete: false,
      });
    } else {
      /* ===================================================
         LINK GOOGLE TO EXISTING ACCOUNT
      =================================================== */

      user.email = email;
      user.googleId = googleId;

      if (
        user.authProvider === "mobile"
      ) {
        user.authProvider = "both";
      } else if (
        !user.authProvider
      ) {
        user.authProvider = "google";
      }

      if (
        !user.name &&
        name
      ) {
        user.name = name;
      }

      await user.save();
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Google login successful.",

        user: {
          id: user._id.toString(),

          mobile:
            user.mobile || "",

          email:
            user.email || "",

          googleId:
            user.googleId || "",

          authProvider:
            user.authProvider,

          name:
            user.name || "",

          exams:
            Array.isArray(user.exams)
              ? user.exams
              : [],

          subjects:
            Array.isArray(
              user.subjects
            )
              ? user.subjects
              : [],

          profileComplete:
            Boolean(
              user.profileComplete
            ),
        },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/auth/google error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to complete Google login.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}