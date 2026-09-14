import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subject from "@/models/Subject";

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

    const subjects = await Subject.find({ active: true })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        subjects,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error("Get subjects error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch subjects",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}