import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mobile = String(searchParams.get("mobile") || "").replace(
      /\D/g,
      ""
    );

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 10-digit Indian mobile number",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    await connectDB();

    const user = await User.findOne({ mobile }).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
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
          mobile: user.mobile,
          name: user.name || "",
          exams: Array.isArray(user.exams) ? user.exams : [],
          subjects: Array.isArray(user.subjects)
            ? user.subjects
            : [],
          profileComplete: Boolean(user.profileComplete),
        },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Get profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch profile",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const mobile = String(body.mobile || "").replace(
      /\D/g,
      ""
    );

    const name = String(body.name || "").trim();

    const exams = Array.isArray(body.exams)
      ? body.exams
      : [];

    const subjects = Array.isArray(body.subjects)
      ? body.subjects
      : [];

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid 10-digit Indian mobile number",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
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
          message: "Please select at least one exam",
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
          message: "Please select at least one subject",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      { mobile },
      {
        $set: {
          name,
          exams,
          subjects,
          profileComplete: true,
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
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
        message: "Profile saved successfully",
        user: {
          id: user._id.toString(),
          mobile: user.mobile,
          name: user.name,
          exams: user.exams,
          subjects: user.subjects,
          profileComplete: user.profileComplete,
        },
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Save profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save profile",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}