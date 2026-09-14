import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import TestResult from "@/models/TestResult";

function getMobile(request) {
  const mobile = request.headers.get("x-mobile");

  if (!mobile) {
    return "";
  }

  return mobile.trim();
}

/* =========================================================
   POST
   Save a submitted test result
========================================================= */

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      mobile,
      testId,
      testTitle,
      exam,
      totalQuestions,
      attempted,
      correct,
      incorrect,
      skipped,
      score,
      totalMarks,
      accuracy,
      estimatedRank,
      answers,
      subjectResults,
      chapterResults,
    } = body;

    const userMobile =
      (mobile || getMobile(request)).trim();

    if (!userMobile) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!testId) {
      return NextResponse.json(
        {
          success: false,
          message: "Test ID is required.",
        },
        { status: 400 }
      );
    }

    if (!testTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Test title is required.",
        },
        { status: 400 }
      );
    }

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam is required.",
        },
        { status: 400 }
      );
    }

    const result = await TestResult.create({
      mobile: userMobile,
      testId,
      testTitle,
      exam,

      totalQuestions:
        Number(totalQuestions) || 0,

      attempted:
        Number(attempted) || 0,

      correct:
        Number(correct) || 0,

      incorrect:
        Number(incorrect) || 0,

      skipped:
        Number(skipped) || 0,

      score:
        Number(score) || 0,

      totalMarks:
        Number(totalMarks) || 0,

      accuracy:
        Number(accuracy) || 0,

      estimatedRank:
        estimatedRank === null ||
        estimatedRank === undefined ||
        estimatedRank === ""
          ? null
          : Number(estimatedRank),

      answers:
        Array.isArray(answers)
          ? answers
          : [],

      subjectResults:
        Array.isArray(subjectResults)
          ? subjectResults
          : [],

      chapterResults:
        Array.isArray(chapterResults)
          ? chapterResults
          : [],

      submittedAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Test result saved successfully.",
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/test-results error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to save test result.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   GET
   Get test history for a student
========================================================= */

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const mobile =
      (
        searchParams.get("mobile") ||
        getMobile(request)
      ).trim();

    const exam =
      (
        searchParams.get("exam") ||
        ""
      ).trim();

    if (!mobile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Mobile number is required.",
        },
        { status: 400 }
      );
    }

    const query = {
      mobile,
    };

    if (exam) {
      query.exam = exam;
    }

    const results =
      await TestResult.find(query)
        .sort({
          submittedAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error(
      "GET /api/test-results error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch test history.",
      },
      { status: 500 }
    );
  }
}