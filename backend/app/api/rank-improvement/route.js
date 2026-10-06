import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestResult from "@/models/TestResult";

export const dynamic = "force-dynamic";

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function corsHeaders(request) {
  const origin = request.headers.get("origin") || "";

  const allowedOrigin =
    /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?$/i.test(
      origin
    )
      ? origin
      : "http://localhost:5173";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(request, data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(request),
  });
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const mobile = (searchParams.get("mobile") || "").trim();
    const email = (searchParams.get("email") || "").trim();
    const googleId = (searchParams.get("googleId") || "").trim();

    console.log("");
    console.log("========== RANK IMPROVEMENT DEBUG ==========");
    console.log("mobile:", mobile);
    console.log("email:", email);
    console.log("googleId:", googleId);
    console.log("============================================");

    const identityConditions = [];

    if (mobile) {
      identityConditions.push({ mobile });
    }

    if (email) {
      identityConditions.push({ email });
    }

    if (googleId) {
      identityConditions.push({ googleId });
    }

    if (!identityConditions.length) {
      return jsonResponse(request, {
        success: false,
        message: "User identity is required.",
      }, 400);
    }

    const results = await TestResult.find({
      $or: identityConditions,
    })
      .sort({ submittedAt: 1, _id: 1 })
      .lean();

    console.log("Rank improvement results found:", results.length);

    if (!results.length) {
      return jsonResponse(request, {
        success: true,
        hasData: false,
        summary: {
          totalTests: 0,
          currentScore: 0,
          bestScore: 0,
          averageScore: 0,
          firstScore: 0,
          improvement: 0,
        },
        recentTests: [],
        trend: [],
      });
    }

    const scores = results.map((item) => number(item.score));

    const totalTests = results.length;

    const firstScore = scores[0];

    const currentScore = scores[scores.length - 1];

    const bestScore = Math.max(...scores);

    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    const improvement = currentScore - firstScore;

    const recentResults = results.slice(-5);

    const recentTests = recentResults.map((item, index) => ({
      testId: String(item.testId || ""),
      testTitle: item.testTitle || "Test",
      exam: item.exam || "",
      score: number(item.score),
      accuracy: number(item.accuracy),
      totalQuestions: number(item.totalQuestions),
      attempted: number(item.attempted),
      correct: number(item.correct),
      incorrect: number(item.incorrect),
      skipped: number(item.skipped),
      submittedAt: item.submittedAt || item.createdAt || null,
      attemptNumber:
        results.length - recentResults.length + index + 1,
    }));

    const trend = results.map((item, index) => ({
      attempt: index + 1,
      score: number(item.score),
      accuracy: number(item.accuracy),
      testTitle: item.testTitle || "Test",
      submittedAt: item.submittedAt || item.createdAt || null,
    }));

    const response = {
      success: true,
      hasData: true,

      summary: {
        totalTests,
        currentScore,
        bestScore,
        averageScore: Number(averageScore.toFixed(2)),
        firstScore,
        improvement,
      },

      recentTests,

      trend,
    };

    console.log("Rank improvement summary:", response.summary);
    console.log("============================================");
    console.log("");

    return jsonResponse(request, response);
  } catch (error) {
    console.error("Rank improvement API error:", error);

    return jsonResponse(
      request,
      {
        success: false,
        message: "Unable to calculate rank improvement.",
      },
      500
    );
  }
}