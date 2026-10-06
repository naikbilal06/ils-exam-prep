import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, x-mobile",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const questionId = String(
      body.questionId || ""
    ).trim();

    const selectedAnswer =
      body.selectedAnswer;

    if (!questionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Question ID is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (
      selectedAnswer === undefined ||
      selectedAnswer === null ||
      selectedAnswer === ""
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected answer is required.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const question =
      await Question.findOne({
        questionId,
        isActive: true,
      }).lean();

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: "Question not found.",
        },
        {
          status: 404,
          headers: corsHeaders,
        }
      );
    }

    const options = Array.isArray(
      question.options
    )
      ? question.options
      : [];

    const selectedValue =
      String(selectedAnswer).trim();

    let selectedKey = selectedValue;

    /*
     * Practice.jsx currently sends the selected
     * option as an array index.
     *
     * Example:
     * 0 -> A
     * 1 -> B
     * 2 -> C
     * 3 -> D
     *
     * We also support sending A/B/C/D directly.
     */

    if (
      /^\d+$/.test(selectedValue)
    ) {
      const selectedIndex =
        Number(selectedValue);

      if (
        selectedIndex >= 0 &&
        selectedIndex < options.length
      ) {
        selectedKey =
          String(
            options[selectedIndex]?.key ||
              ""
          ).trim();
      }
    }

    const correctKey =
      String(
        question.correctAnswer || ""
      ).trim();

    const isCorrect =
      selectedKey.toUpperCase() ===
      correctKey.toUpperCase();

    return NextResponse.json(
      {
        success: true,

        questionId:
          question.questionId,

        isCorrect,

        selectedAnswer:
          selectedKey,

        correctAnswer:
          correctKey,

        explanation:
          question.explanation || "",

        marks:
          Number(question.marks) || 4,

        negativeMarks:
          Number(question.negativeMarks) || 1,

        subjectId:
          question.subjectId,

        subjectName:
          question.subjectName,

        chapterId:
          question.chapterId,

        chapterName:
          question.chapterName,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/practice/answer error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to verify answer.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}