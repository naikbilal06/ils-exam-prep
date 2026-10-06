import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

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

  return {
    "Access-Control-Allow-Origin":
      allowedOrigins.includes(origin)
        ? origin
        : "*",

    "Access-Control-Allow-Methods":
      "GET, PUT, OPTIONS",

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
   GET PROFILE BY MOBILE
========================================================= */

export async function GET(request) {
  const corsHeaders =
    getCorsHeaders(request);

  try {
    const { searchParams } =
      new URL(request.url);

    const mobile =
      String(
        searchParams.get("mobile") || ""
      ).replace(/\D/g, "");

    if (
      !/^[6-9]\d{9}$/.test(
        mobile
      )
    ) {
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

    const user =
      await User.findOne({
        mobile,
      }).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,

        user: {
          id: user._id.toString(),

          mobile:
            user.mobile || "",

          email:
            user.email || "",

          googleId:
            user.googleId || "",

          authProvider:
            user.authProvider ||
            "mobile",

          name:
            user.name || "",

          exams:
            Array.isArray(
              user.exams
            )
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
      "Get profile error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch profile",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

/* =========================================================
   SAVE / COMPLETE PROFILE
========================================================= */

export async function PUT(request) {
  const corsHeaders =
    getCorsHeaders(request);

  try {
    const body =
      await request.json();

    const mobile =
      String(
        body.mobile || ""
      ).replace(/\D/g, "");

    const email =
      String(
        body.email || ""
      )
        .trim()
        .toLowerCase();

    const googleId =
      String(
        body.googleId || ""
      ).trim();

    const name =
      String(
        body.name || ""
      ).trim();

    const exams =
      Array.isArray(body.exams)
        ? body.exams
        : [];

    const subjects =
      Array.isArray(
        body.subjects
      )
        ? body.subjects
        : [];

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name is required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (exams.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select at least one exam",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (subjects.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select at least one subject",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    /*
     * A mobile user must have a valid mobile.
     * A Google user may have no mobile yet.
     */

    if (
      !mobile &&
      !googleId &&
      !email
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User identification is required",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (
      mobile &&
      !/^[6-9]\d{9}$/.test(
        mobile
      )
    ) {
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

    /* =====================================================
       DATABASE
    ===================================================== */

    await connectDB();

    /* =====================================================
       FIND EXISTING USER
       Google ID first
       then email
       then mobile
    ===================================================== */

    const conditions = [];

    if (googleId) {
      conditions.push({
        googleId,
      });
    }

    if (email) {
      conditions.push({
        email,
      });
    }

    if (mobile) {
      conditions.push({
        mobile,
      });
    }

    let user =
      await User.findOne({
        $or: conditions,
      });

    /* =====================================================
       GOOGLE USER NOT FOUND
       CREATE USER
    ===================================================== */

    if (!user) {
      const userData = {
        name,
        exams,
        subjects,
        profileComplete: true,
      };

      if (mobile) {
        userData.mobile =
          mobile;
      }

      if (email) {
        userData.email =
          email;
      }

      if (googleId) {
        userData.googleId =
          googleId;
        userData.authProvider =
          "google";
      } else {
        userData.authProvider =
          "mobile";
      }

      user =
        await User.create(
          userData
        );
    } else {
      /* ===================================================
         UPDATE EXISTING USER
      =================================================== */

      user.name = name;

      user.exams = exams;

      user.subjects =
        subjects;

      user.profileComplete =
        true;

      if (mobile) {
        user.mobile =
          mobile;
      }

      if (email) {
        user.email =
          email;
      }

      if (googleId) {
        user.googleId =
          googleId;
      }

      /*
       * Preserve/link authentication methods.
       */

      if (
        googleId &&
        user.authProvider ===
          "mobile"
      ) {
        user.authProvider =
          "both";
      } else if (
        googleId &&
        !user.authProvider
      ) {
        user.authProvider =
          "google";
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
          "Profile saved successfully",

        user: {
          id:
            user._id.toString(),

          mobile:
            user.mobile || "",

          email:
            user.email || "",

          googleId:
            user.googleId || "",

          authProvider:
            user.authProvider ||
            "mobile",

          name:
            user.name || "",

          exams:
            Array.isArray(
              user.exams
            )
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
      "Save profile error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to save profile",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}