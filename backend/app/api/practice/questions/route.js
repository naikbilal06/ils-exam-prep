import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
};

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders,
  });
}

function normalizeDifficulty(value) {
  if (!value) return null;

  const difficulty = String(value)
    .trim()
    .toLowerCase();

  if (difficulty === "easy") return "Easy";
  if (difficulty === "medium") return "Medium";
  if (difficulty === "hard") return "Hard";
  if (difficulty === "mixed") return "Mixed";

  return null;
}

function normalizeSubject(value) {
  if (!value) return "";

  return String(value)
    .trim()
    .toLowerCase();
}

function toSafeQuestion(question) {
  return {
    _id: question._id,
    questionId: question.questionId,
    exam: question.exam,
    testId: question.testId,
    subjectId: question.subjectId,
    subjectName: question.subjectName,
    chapterId: question.chapterId,
    chapterName: question.chapterName,
    questionText: question.questionText,
    options: question.options,
    explanation: question.explanation || "",
    difficulty: question.difficulty || "Easy",
    marks: Number(question.marks) || 4,
    negativeMarks:
      Number(question.negativeMarks) || 1,
    language:
      question.language || "English",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const exam =
      searchParams
        .get("exam")
        ?.trim()
        .toLowerCase();

    const subject =
      normalizeSubject(
        searchParams.get("subject")
      );

    const testId =
      searchParams
        .get("testId")
        ?.trim() || "";

    const chapter =
      searchParams
        .get("chapter")
        ?.trim() || "";

    const difficulty =
      normalizeDifficulty(
        searchParams.get("difficulty")
      );

    const requestedLimit = Number(
      searchParams.get("limit") || 20
    );

    /*
      Development mode can explicitly request
      available questions even when the configured
      test size is larger.

      Production remains strict.
    */
    const allowPartial =
      searchParams.get("allowPartial") ===
      "true";

    if (!exam) {
      return jsonResponse(
        {
          success: false,
          message: "Exam is required.",
        },
        400
      );
    }

    if (
      !Number.isInteger(
        requestedLimit
      ) ||
      requestedLimit < 1
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Limit must be a positive integer.",
        },
        400
      );
    }

    if (
      requestedLimit > 500
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Maximum 500 questions can be requested at once.",
        },
        400
      );
    }

    if (
      searchParams.get("difficulty") &&
      !difficulty
    ) {
      return jsonResponse(
        {
          success: false,
          message:
            "Difficulty must be Easy, Medium, Hard or Mixed.",
        },
        400
      );
    }

    const filter = {
      exam,
      isActive: true,
    };

    if (subject) {
      filter.subjectId = subject;
    }

    if (testId) {
      filter.testId = testId;
    }

    if (chapter) {
      filter.chapterId = chapter;
    }

    if (
      difficulty &&
      difficulty !== "Mixed"
    ) {
      filter.difficulty = difficulty;
    }

    const availableCount =
      await Question.countDocuments(
        filter
      );

    /*
      Strict mode:
      Required count must exist.

      Partial mode:
      Return whatever unique questions are
      currently available. This is useful while
      the Admin Panel question bank is still
      being built.
    */
    if (
      availableCount <
        requestedLimit &&
      !allowPartial
    ) {
      return jsonResponse(
        {
          success: false,
          code:
            "INSUFFICIENT_QUESTIONS",
          message:
            `Only ${availableCount} questions are available for this selection, but ${requestedLimit} are required.`,
          requested:
            requestedLimit,
          available:
            availableCount,
          exam,
          subject:
            subject || null,
          difficulty:
            difficulty || "Mixed",
        },
        409
      );
    }

    const sampleSize =
      Math.min(
        requestedLimit,
        availableCount
      );

    if (sampleSize <= 0) {
      return jsonResponse(
        {
          success: false,
          code:
            "NO_QUESTIONS_AVAILABLE",
          message:
            "No active questions are available for this selection.",
          requested:
            requestedLimit,
          available: 0,
          exam,
          subject:
            subject || null,
          difficulty:
            difficulty || "Mixed",
        },
        404
      );
    }

    const questions =
      await Question.aggregate([
        {
          $match: filter,
        },
        {
          $sample: {
            size: sampleSize,
          },
        },
      ]);

    const uniqueMap =
      new Map();

    for (
      const question of questions
    ) {
      const id = String(
        question.questionId ||
          question._id
      );

      if (
        !uniqueMap.has(id)
      ) {
        uniqueMap.set(
          id,
          question
        );
      }
    }

    const safeQuestions =
      Array.from(
        uniqueMap.values()
      ).map(
        toSafeQuestion
      );

    if (
      safeQuestions.length === 0
    ) {
      return jsonResponse(
        {
          success: false,
          code:
            "NO_UNIQUE_QUESTIONS",
          message:
            "No unique questions are available for this selection.",
        },
        404
      );
    }

    return jsonResponse(
      {
        success: true,

        count:
          safeQuestions.length,

        requested:
          requestedLimit,

        available:
          availableCount,

        complete:
          safeQuestions.length >=
          requestedLimit,

        partial:
          safeQuestions.length <
          requestedLimit,

        exam,

        subject:
          subject || null,

        difficulty:
          difficulty || "Mixed",

        questions:
          safeQuestions,
      },
      200
    );
  } catch (error) {
    console.error(
      "GET /api/practice/questions error:",
      error
    );

    return jsonResponse(
      {
        success: false,
        message:
          "Unable to load questions.",
        error:
          process.env.NODE_ENV ===
          "development"
            ? error.message
            : undefined,
      },
      500
    );
  }
}