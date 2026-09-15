import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-mobile",
};

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

    const exam = (
      searchParams.get("exam") || ""
    )
      .trim()
      .toLowerCase();

    const subject = (
      searchParams.get("subject") || ""
    )
      .trim()
      .toLowerCase();

    const difficulty = (
      searchParams.get("difficulty") || ""
    )
      .trim();

    const limitParam =
      Number(searchParams.get("limit")) || 10;

    const limit = Math.min(
      Math.max(limitParam, 1),
      50
    );

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const query = {
      exam: new RegExp(
        `^${escapeRegex(exam)}$`,
        "i"
      ),
      isActive: true,
    };

    if (subject) {
      query.subjectId = new RegExp(
        `^${escapeRegex(subject)}$`,
        "i"
      );
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const questions =
      await Question.find(query)
        .select(
          "questionId exam testId subjectId subjectName chapterId chapterName questionText options explanation difficulty marks negativeMarks language"
        )
        .limit(limit)
        .lean();

    const sanitizedQuestions =
      questions.map((question) => ({
        id: question.questionId,
        question: question.questionText,
        options: Array.isArray(question.options)
          ? question.options.map((option) => ({
              key: option.key,
              text: option.text,
            }))
          : [],
        explanation:
          question.explanation || "",
        exam: question.exam,
        testId: question.testId,
        subjectId: question.subjectId,
        subjectName: question.subjectName,
        chapterId: question.chapterId,
        chapterName: question.chapterName,
        difficulty:
          question.difficulty || "Medium",
        marks:
          Number(question.marks) || 4,
        negativeMarks:
          Number(question.negativeMarks) || 1,
        language:
          question.language || "English",
      }));

    return NextResponse.json(
      {
        success: true,
        exam,
        subject: subject || null,
        totalQuestions:
          sanitizedQuestions.length,
        questions: sanitizedQuestions,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/practice/questions error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load practice questions.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

function escapeRegex(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}