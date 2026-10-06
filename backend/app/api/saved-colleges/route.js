import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import SavedCollege from "@/models/SavedCollege";
import College from "@/models/College";

function json(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function OPTIONS() {
  return json({ success: true });
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "";

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return json(
        {
          success: false,
          message: "Valid userId is required.",
        },
        400
      );
    }

    const saved = await SavedCollege.find({ userId })
      .populate("collegeId")
      .sort({ createdAt: -1 })
      .lean();

    const colleges = saved
      .filter((item) => item.collegeId)
      .map((item) => ({
        id: String(item.collegeId._id),
        savedCollegeId: String(item._id),
        name: item.collegeId.name || "",
        shortName: item.collegeId.shortName || "",
        exam: item.collegeId.exam || "",
        type: item.collegeId.type || "",
        city: item.collegeId.city || "",
        state: item.collegeId.state || "",
        location: item.collegeId.location || "",
        courses: Array.isArray(item.collegeId.courses)
          ? item.collegeId.courses
          : [],
        description: item.collegeId.description || "",
        website: item.collegeId.website || "",
        icon: item.collegeId.icon || "",
        cutoff: item.collegeId.cutoff || "",
        expectedCutoff: item.collegeId.expectedCutoff || "",
        rank: item.collegeId.rank || "",
        expectedRank: item.collegeId.expectedRank || "",
        cutoffMin: item.collegeId.cutoffMin ?? null,
        cutoffMax: item.collegeId.cutoffMax ?? null,
        rankMin: item.collegeId.rankMin ?? null,
        rankMax: item.collegeId.rankMax ?? null,
        categories: Array.isArray(item.collegeId.categories)
          ? item.collegeId.categories
          : [],
      }));

    return json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    console.error("Saved colleges GET error:", error);

    return json(
      {
        success: false,
        message: "Unable to load saved colleges.",
      },
      500
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const userId = String(body?.userId || "").trim();
    const collegeId = String(body?.collegeId || "").trim();

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !collegeId ||
      !mongoose.Types.ObjectId.isValid(collegeId)
    ) {
      return json(
        {
          success: false,
          message: "Valid userId and collegeId are required.",
        },
        400
      );
    }

    const college = await College.findOne({
      _id: collegeId,
      active: true,
      published: true,
    }).lean();

    if (!college) {
      return json(
        {
          success: false,
          message: "College not found.",
        },
        404
      );
    }

    const saved = await SavedCollege.findOneAndUpdate(
      {
        userId,
        collegeId,
      },
      {
        $set: {
          userId,
          collegeId,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      }
    );

    return json({
      success: true,
      message: "College saved successfully.",
      savedId: String(saved._id),
    });
  } catch (error) {
    console.error("Saved colleges POST error:", error);

    return json(
      {
        success: false,
        message: "Unable to save college.",
      },
      500
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId") || "";
    const collegeId = searchParams.get("collegeId") || "";

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !collegeId ||
      !mongoose.Types.ObjectId.isValid(collegeId)
    ) {
      return json(
        {
          success: false,
          message: "Valid userId and collegeId are required.",
        },
        400
      );
    }

    await SavedCollege.deleteOne({
      userId,
      collegeId,
    });

    return json({
      success: true,
      message: "College removed from My Colleges.",
    });
  } catch (error) {
    console.error("Saved colleges DELETE error:", error);

    return json(
      {
        success: false,
        message: "Unable to remove college.",
      },
      500
    );
  }
}