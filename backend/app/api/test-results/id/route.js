import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestResult from "@/models/TestResult";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Test result ID is required.",
        },
        { status: 400 }
      );
    }

    const result =
      await TestResult.findById(id).lean();

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Test result not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(
      "GET /api/test-results/[id] error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch test result.",
      },
      { status: 500 }
    );
  }
}