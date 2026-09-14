import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Exam from "@/models/Exam";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    await connectDB();

    const exams = await Exam.find({ active: true })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        exams,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Get exams error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch exams",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}