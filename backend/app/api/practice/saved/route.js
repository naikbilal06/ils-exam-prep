import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import Question from "@/models/Question";
import TestResult from "@/models/TestResult";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mobile",
};

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

function ownerFrom(searchParams) {
  const mobile = String(searchParams.get("mobile") || "").trim();
  const email = String(searchParams.get("email") || "").trim().toLowerCase();
  const googleId = String(searchParams.get("googleId") || "").trim();
  if (mobile) return { mobile };
  if (email) return { email };
  if (googleId) return { googleId };
  return null;
}

function questionPayload(question, extra = {}) {
  return {
    id: question.questionId,
    questionId: question.questionId,
    questionText: question.questionText,
    question: question.questionText,
    options: question.options || [],
    explanation: question.explanation || "",
    exam: question.exam,
    testId: question.testId,
    subjectId: question.subjectId,
    subjectName: question.subjectName,
    chapterId: question.chapterId,
    chapterName: question.chapterName,
    difficulty: question.difficulty || "Medium",
    marks: Number(question.marks) || 4,
    negativeMarks: Number(question.negativeMarks) || 1,
    ...extra,
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const owner = ownerFrom(searchParams);
    const type = searchParams.get("type") || "bookmarks";

    if (!owner) return jsonResponse({ success: false, message: "A student identity is required." }, 400);

    let questionIds = [];
    const metadata = new Map();

    if (type === "wrong") {
      const results = await TestResult.find(owner).sort({ createdAt: -1 }).lean();
      results.forEach((result) => {
        (Array.isArray(result.answers) ? result.answers : []).forEach((answer) => {
          if (answer?.isCorrect === false && answer?.isSkipped !== true && answer?.questionId) {
            const id = String(answer.questionId);
            if (!metadata.has(id)) metadata.set(id, { previousResult: result.testTitle });
            questionIds.push(id);
          }
        });
      });
    } else {
      const filter = { ...owner };
      if (searchParams.get("exam")) filter.exam = searchParams.get("exam").trim().toLowerCase();
      const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 }).lean();
      bookmarks.forEach((bookmark) => {
        const id = String(bookmark.questionId);
        questionIds.push(id);
        metadata.set(id, { bookmarked: true, bookmarkCreatedAt: bookmark.createdAt });
      });
    }

    questionIds = [...new Set(questionIds)];
    const questions = questionIds.length
      ? await Question.find({ questionId: { $in: questionIds }, isActive: true }).lean()
      : [];

    return jsonResponse({
      success: true,
      type,
      count: questions.length,
      questions: questions.map((question) => questionPayload(question, metadata.get(String(question.questionId)) || {})),
    });
  } catch (error) {
    console.error("GET /api/practice/saved error:", error);
    return jsonResponse({ success: false, message: "Unable to load saved questions." }, 500);
  }
}
