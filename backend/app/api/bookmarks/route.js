import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import Question from "@/models/Question";

export const runtime = "nodejs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mobile",
};

function jsonResponse(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders,
  });
}

function identityFrom(request, body = {}) {
  return {
    mobile: String(body.mobile || request.headers.get("x-mobile") || "").trim(),
    email: String(body.email || "").trim().toLowerCase(),
    googleId: String(body.googleId || "").trim(),
  };
}

function identityQuery(identity) {
  if (identity.mobile) return { mobile: identity.mobile };
  if (identity.email) return { email: identity.email };
  if (identity.googleId) return { googleId: identity.googleId };
  return null;
}

function safeBookmark(bookmark, question) {
  return {
    id: String(bookmark._id),
    questionId: bookmark.questionId,
    exam: bookmark.exam,
    subjectId: question?.subjectId || bookmark.subjectId || "",
    subjectName: question?.subjectName || "",
    chapterId: question?.chapterId || bookmark.chapterId || "",
    chapterName: question?.chapterName || "",
    questionText: question?.questionText || "",
    options: question?.options || [],
    difficulty: question?.difficulty || "Medium",
    marks: Number(question?.marks) || 4,
    negativeMarks: Number(question?.negativeMarks) || 1,
    createdAt: bookmark.createdAt,
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const identity = identityFrom(request, {
      mobile: searchParams.get("mobile"),
      email: searchParams.get("email"),
      googleId: searchParams.get("googleId"),
    });
    const owner = identityQuery(identity);

    if (!owner) return jsonResponse({ success: false, message: "A student identity is required." }, 400);

    const filter = { ...owner };
    if (searchParams.get("exam")) filter.exam = searchParams.get("exam").trim().toLowerCase();
    if (searchParams.get("subject")) filter.subjectId = searchParams.get("subject").trim();
    if (searchParams.get("chapter")) filter.chapterId = searchParams.get("chapter").trim();
    if (searchParams.get("difficulty")) filter.difficulty = searchParams.get("difficulty").trim();

    const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 }).lean();
    const ids = bookmarks.map((bookmark) => bookmark.questionId);
    const questions = ids.length
      ? await Question.find({ questionId: { $in: ids }, isActive: true }).lean()
      : [];
    const questionMap = new Map(questions.map((question) => [String(question.questionId), question]));

    return jsonResponse({
      success: true,
      count: bookmarks.length,
      bookmarks: bookmarks
        .map((bookmark) => safeBookmark(bookmark, questionMap.get(bookmark.questionId)))
        .filter((bookmark) => bookmark.questionText),
    });
  } catch (error) {
    console.error("GET /api/bookmarks error:", error);
    return jsonResponse({ success: false, message: "Unable to load bookmarks." }, 500);
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const identity = identityFrom(request, body);
    const owner = identityQuery(identity);
    const questionId = String(body.questionId || "").trim();
    const question = await Question.findOne({ questionId, isActive: true }).lean();

    if (!owner || !questionId) return jsonResponse({ success: false, message: "Student identity and questionId are required." }, 400);
    if (!question) return jsonResponse({ success: false, message: "Question not found." }, 404);

    const bookmark = await Bookmark.findOneAndUpdate(
      { ...owner, questionId },
      {
        $setOnInsert: {
          ...identity,
          questionId,
          exam: String(body.exam || question.exam || "").toLowerCase(),
          subjectId: question.subjectId || "",
          chapterId: question.chapterId || "",
        },
      },
      { upsert: true, new: true }
    ).lean();

    return jsonResponse({ success: true, bookmark: safeBookmark(bookmark, question) }, 201);
  } catch (error) {
    console.error("POST /api/bookmarks error:", error);
    return jsonResponse({ success: false, message: "Unable to save bookmark." }, 500);
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const identity = identityFrom(request, body);
    const owner = identityQuery(identity);
    const questionId = String(body.questionId || new URL(request.url).searchParams.get("questionId") || "").trim();

    if (!owner || !questionId) return jsonResponse({ success: false, message: "Student identity and questionId are required." }, 400);
    await Bookmark.deleteOne({ ...owner, questionId });
    return jsonResponse({ success: true, questionId });
  } catch (error) {
    console.error("DELETE /api/bookmarks error:", error);
    return jsonResponse({ success: false, message: "Unable to remove bookmark." }, 500);
  }
}
