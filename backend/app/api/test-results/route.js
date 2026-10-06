import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";
import TestResult from "@/models/TestResult";

function getCorsHeaders(request) {
  const origin = request?.headers.get("origin") || "";
  const isLocalOrigin =
    /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?$/i.test(
      origin
    );

  return {
    "Access-Control-Allow-Origin": isLocalOrigin
      ? origin
      : "*",
    "Access-Control-Allow-Methods":
      "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Mobile",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(request, data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: getCorsHeaders(request),
  });
}

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

    let body;

    try {
      body = await request.json();
    } catch {
      return jsonResponse(
        request,
        {
          success: false,
          message: "Request body must be valid JSON.",
        },
        400
      );
    }

    const {
      mobile,
      email,
      googleId,
      testId,
      testTitle,
      exam,
      estimatedRank,
      answers,
      subjectResults,
      chapterResults,
    } = body;

    const userMobile =
      (mobile || getMobile(request)).trim();

    if (!userMobile) {
      return jsonResponse(
        request,
        {
          success: false,
          message: "Mobile number is required.",
        },
        400
      );
    }

    if (!testId) {
      return jsonResponse(
        request,
        {
          success: false,
          message: "Test ID is required.",
        },
        400
      );
    }

    if (!testTitle) {
      return jsonResponse(
        request,
        {
          success: false,
          message: "Test title is required.",
        },
        400
      );
    }

    if (!exam) {
      return jsonResponse(
        request,
        {
          success: false,
          message: "Exam is required.",
        },
        400
      );
    }

    if (!Array.isArray(answers)) {
      return jsonResponse(
        request,
        {
          success: false,
          message: "Answers must be an array.",
        },
        400
      );
    }

    const submittedAnswers = answers
      .map((answer) => ({
        questionId: String(
          answer?.questionId || ""
        ).trim(),
        selectedAnswer:
          answer?.selectedAnswer === null ||
          answer?.selectedAnswer === undefined ||
          answer?.selectedAnswer === ""
            ? null
            : String(answer.selectedAnswer),
      }))
      .filter((answer) => answer.questionId);

    const questionIds = [
      ...new Set(
        submittedAnswers.map(
          (answer) => answer.questionId
        )
      ),
    ];

    const questions =
      questionIds.length > 0
        ? await Question.find({
            questionId: {
              $in: questionIds,
            },
          }).lean()
        : [];

    const questionMap = new Map(
      questions.map((question) => [
        String(question.questionId),
        question,
      ])
    );

    const evaluatedAnswers = submittedAnswers.map(
      (answer) => {
        const question = questionMap.get(
          answer.questionId
        );
        const selectedAnswer = answer.selectedAnswer;
        const isSkipped = !selectedAnswer;
        const isCorrect = Boolean(
          question &&
            !isSkipped &&
            String(question.correctAnswer)
              .trim()
              .toUpperCase() ===
              selectedAnswer.trim().toUpperCase()
        );

        return {
          questionId: answer.questionId,
          selectedAnswer,
          correctAnswer: question?.correctAnswer || null,
          isCorrect,
          isSkipped,
          timeTaken: 0,
        };
      }
    );

    const totalQuestions = evaluatedAnswers.length;
    const attempted = evaluatedAnswers.filter(
      (answer) => !answer.isSkipped
    ).length;
    const correct = evaluatedAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    const skipped = evaluatedAnswers.filter(
      (answer) => answer.isSkipped
    ).length;
    const incorrect = attempted - correct;
    const totalMarks = questions.reduce(
      (total, question) =>
        total + (Number(question.marks) || 4),
      0
    );
    const score = evaluatedAnswers.reduce(
      (total, answer) => {
        const question = questionMap.get(
          answer.questionId
        );

        if (answer.isCorrect) {
          return total + (Number(question?.marks) || 4);
        }

        if (!answer.isSkipped) {
          return total - (Number(question?.negativeMarks) || 1);
        }

        return total;
      },
      0
    );
    const accuracy = attempted > 0
      ? Number(((correct / attempted) * 100).toFixed(2))
      : 0;

    let finalSubjectResults = Array.isArray(subjectResults) && subjectResults.length > 0
      ? subjectResults
      : [];

    if (finalSubjectResults.length === 0 && questions.length > 0) {
      const sMap = new Map();
      evaluatedAnswers.forEach((ans) => {
        const q = questionMap.get(ans.questionId);
        if (!q) return;
        const sId = String(q.subjectId || q.subject || q.subjectName || "general").toLowerCase().trim();
        const sName = q.subjectName || q.subject || sId;
        if (!sMap.has(sId)) {
          sMap.set(sId, { subjectId: sId, subjectName: sName, totalQuestions: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 });
        }
        const sStat = sMap.get(sId);
        sStat.totalQuestions += 1;
        if (ans.isSkipped) {
          sStat.skipped += 1;
        } else {
          sStat.attempted += 1;
          const marks = Number(q.marks || 4);
          const neg = Number(q.negativeMarks || 1);
          if (ans.isCorrect) {
            sStat.correct += 1;
            sStat.score += marks;
          } else {
            sStat.incorrect += 1;
            sStat.score -= neg;
          }
        }
      });
      finalSubjectResults = Array.from(sMap.values()).map((s) => ({
        ...s,
        accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
      }));
    }

    const result = await TestResult.create({
      mobile: userMobile,
      email: email || "",
      googleId: googleId || "",
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

      estimatedRank:
        estimatedRank === null ||
        estimatedRank === undefined ||
        estimatedRank === ""
          ? null
          : Number(estimatedRank),

      answers: evaluatedAnswers,

      subjectResults: finalSubjectResults,

      chapterResults:
        Array.isArray(chapterResults)
          ? chapterResults
          : [],

      submittedAt: new Date(),
    });

    return jsonResponse(
      request,
      {
        success: true,
        message: "Test result saved successfully.",
        result,
      },
      201
    );
  } catch (error) {
    console.error(
      "POST /api/test-results error:",
      error
    );

    return jsonResponse(
      request,
      {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Unable to save test result.",
      },
      500
    );
  }
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
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
      return jsonResponse(
        request,
        {
          success: false,
          message:
            "Mobile number is required.",
        },
        400
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

    return jsonResponse(request, {
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error(
      "GET /api/test-results error:",
      error
    );

    return jsonResponse(
      request,
      {
        success: false,
        message:
          "Unable to fetch test history.",
      },
      500
    );
  }
}