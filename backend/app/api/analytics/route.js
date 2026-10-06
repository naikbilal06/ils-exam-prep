import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Question from "@/models/Question";
import TestResult from "@/models/TestResult";

export const dynamic = "force-dynamic";

// ============================================================
// CORS
// ============================================================

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
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
  };
}

function jsonResponse(request, data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders(request),
  });
}

// ============================================================
// HELPERS
// ============================================================

function number(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function emptyOverview() {
  return {
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    averageAccuracy: 0,
    totalQuestionsAttempted: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    totalSkipped: 0,
  };
}

function addAnswer(aggregate, answer, question) {
  aggregate.totalQuestions += 1;

  const selectedAnswer =
    answer?.selectedAnswer === null ||
    answer?.selectedAnswer === undefined ||
    answer?.selectedAnswer === ""
      ? null
      : String(answer.selectedAnswer);

  const correctAnswer =
    answer?.correctAnswer !== undefined &&
    answer?.correctAnswer !== null
      ? String(answer.correctAnswer)
      : question?.correctAnswer !== undefined &&
          question?.correctAnswer !== null
        ? String(question.correctAnswer)
        : null;

  const isSkipped =
    answer?.isSkipped === true ||
    selectedAnswer === null;

  if (isSkipped) {
    aggregate.skipped += 1;
    return;
  }

  aggregate.attempted += 1;

  const isCorrect =
    answer?.isCorrect === true ||
    (correctAnswer !== null &&
      selectedAnswer === correctAnswer);

  if (isCorrect) {
    aggregate.correct += 1;
  } else {
    aggregate.incorrect += 1;
  }

  const marksPerQuestion =
    number(question?.marks) ||
    number(question?.marksPerQuestion) ||
    1;

  const negativeMarks =
    number(question?.negativeMarks) ||
    number(question?.negativeMarking) ||
    0;

  if (isCorrect) {
    aggregate.score += marksPerQuestion;
  } else {
    aggregate.score -= negativeMarks;
  }
}

function finalizeAggregate(aggregate) {
  aggregate.accuracy =
    aggregate.attempted > 0
      ? Math.round(
          (aggregate.correct /
            aggregate.attempted) *
            100
        )
      : 0;

  return aggregate;
}

// ============================================================
// GET ANALYTICS
// ============================================================

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const mobile = (
      searchParams.get("mobile") || ""
    ).trim();

    const email = (
      searchParams.get("email") || ""
    )
      .trim()
      .toLowerCase();

    const googleId = (
      searchParams.get("googleId") || ""
    ).trim();

    const exam = (
      searchParams.get("exam") || ""
    ).trim();

    // ========================================================
    // DEBUG
    // ========================================================

    console.log("");
    console.log("========== ANALYTICS DEBUG ==========");
    console.log("mobile:", mobile);
    console.log("email:", email);
    console.log("googleId:", googleId);
    console.log("exam:", exam);
    console.log("=====================================");

    // ========================================================
    // USER IDENTITY
    // ========================================================

    const identityConditions = [];

    if (mobile) {
      identityConditions.push({
        mobile,
      });
    }

    if (email) {
      identityConditions.push({
        email,
      });
    }

    if (googleId) {
      identityConditions.push({
        googleId,
      });
    }

    // No identity supplied
    if (identityConditions.length === 0) {
      console.log(
        "Analytics: No user identity supplied."
      );

      return jsonResponse(request, {
        success: true,
        overview: emptyOverview(),
        tests: [],
        subjects: [],
        chapters: [],
      });
    }

    // ========================================================
    // MONGODB QUERY
    // ========================================================

    const query = {
      $or: identityConditions,
    };

    // Match exam case-insensitively
    if (exam) {
      query.exam = {
        $regex: `^${escapeRegex(exam)}$`,
        $options: "i",
      };
    }

    console.log(
      "Analytics MongoDB query:",
      JSON.stringify(query, null, 2)
    );

    // ========================================================
    // GET TEST RESULTS
    // ========================================================

    const results = await TestResult.find(query)
      .sort({
        submittedAt: 1,
        createdAt: 1,
      })
      .lean();

    console.log(
      "Analytics results found:",
      results.length
    );

    if (results.length > 0) {
      console.log(
        "Analytics result details:",
        results.map((result) => ({
          id: String(result._id),
          mobile: result.mobile,
          email: result.email,
          googleId: result.googleId,
          exam: result.exam,
          testId: result.testId,
          testTitle: result.testTitle,
          score: result.score,
          accuracy: result.accuracy,
          totalQuestions:
            result.totalQuestions,
          attempted: result.attempted,
          correct: result.correct,
          incorrect: result.incorrect,
          skipped: result.skipped,
        }))
      );
    }

    console.log("=====================================");
    console.log("");

    // ========================================================
    // NO TESTS
    // ========================================================

    if (!results.length) {
      return jsonResponse(request, {
        success: true,
        overview: emptyOverview(),
        tests: [],
        subjects: [],
        chapters: [],
      });
    }

    // ========================================================
    // QUESTION IDS
    // ========================================================

    const questionIds = [
      ...new Set(
        results.flatMap((result) =>
          Array.isArray(result.answers)
            ? result.answers
                .map((answer) =>
                  String(
                    answer.questionId || ""
                  ).trim()
                )
                .filter(Boolean)
            : []
        )
      ),
    ];

    console.log(
      "Analytics question IDs:",
      questionIds.length
    );

    // ========================================================
    // LOAD QUESTIONS
    // ========================================================

    const questions =
      questionIds.length > 0
        ? await Question.find({
            questionId: {
              $in: questionIds,
            },
          }).lean()
        : [];

    console.log(
      "Analytics questions found:",
      questions.length
    );

    const questionMap = new Map();

    for (const question of questions) {
      questionMap.set(
        String(question.questionId),
        question
      );
    }

    // ========================================================
    // TEST ANALYTICS
    // ========================================================

    const tests = results.map((result) => {
      const totalQuestions =
        number(result.totalQuestions);

      const attempted =
        number(result.attempted);

      const correct =
        number(result.correct);

      const incorrect =
        number(result.incorrect);

      const skipped =
        number(result.skipped);

      let accuracy =
        number(result.accuracy);

      if (!accuracy && attempted > 0) {
        accuracy = Math.round(
          (correct / attempted) * 100
        );
      }

      return {
        id: String(result._id),

        testId:
          result.testId || "",

        testTitle:
          result.testTitle ||
          result.testId ||
          "Test",

        exam:
          result.exam || "",

        totalQuestions,

        attempted,

        correct,

        incorrect,

        skipped,

        score:
          number(result.score),

        totalMarks:
          number(result.totalMarks) ||
          totalQuestions,

        accuracy,

        estimatedRank:
          number(result.estimatedRank) ||
          null,

        createdAt:
          result.submittedAt ||
          result.createdAt ||
          null,
      };
    });

    // ========================================================
    // OVERVIEW
    // ========================================================

    const totalTests = tests.length;

    const averageScore =
      totalTests > 0
        ? Math.round(
            tests.reduce(
              (sum, test) =>
                sum + number(test.score),
              0
            ) / totalTests
          )
        : 0;

    const bestScore =
      totalTests > 0
        ? Math.max(
            ...tests.map((test) =>
              number(test.score)
            )
          )
        : 0;

    const averageAccuracy =
      totalTests > 0
        ? Math.round(
            tests.reduce(
              (sum, test) =>
                sum +
                number(test.accuracy),
              0
            ) / totalTests
          )
        : 0;

    const totalQuestionsAttempted =
      tests.reduce(
        (sum, test) =>
          sum + number(test.attempted),
        0
      );

    const totalCorrect =
      tests.reduce(
        (sum, test) =>
          sum + number(test.correct),
        0
      );

    const totalIncorrect =
      tests.reduce(
        (sum, test) =>
          sum + number(test.incorrect),
        0
      );

    const totalSkipped =
      tests.reduce(
        (sum, test) =>
          sum + number(test.skipped),
        0
      );

    // ========================================================
    // SUBJECT ANALYTICS
    // ========================================================

    const subjectMap = new Map();

    for (const result of results) {
      // ------------------------------------------------------
      // Build subjects from individual answers
      // ------------------------------------------------------

      if (Array.isArray(result.answers)) {
        for (const answer of result.answers) {
          const questionId = String(
            answer.questionId || ""
          ).trim();

          if (!questionId) continue;

          const question =
            questionMap.get(questionId);

          if (!question) continue;

          const subjectId = String(
            question.subjectId ||
              question.subject ||
              question.subjectName ||
              "general"
          ).trim();

          const subjectName =
            question.subjectName ||
            question.subject ||
            subjectId;

          if (!subjectMap.has(subjectId)) {
            subjectMap.set(subjectId, {
              subjectId,
              subjectName,

              totalQuestions: 0,
              attempted: 0,
              correct: 0,
              incorrect: 0,
              skipped: 0,

              score: 0,
              accuracy: 0,
            });
          }

          const aggregate =
            subjectMap.get(subjectId);

          addAnswer(
            aggregate,
            answer,
            question
          );
        }
      }

      // ------------------------------------------------------
      // Fallback to saved subjectResults
      // ------------------------------------------------------

      if (
        Array.isArray(result.subjectResults) &&
        result.subjectResults.length > 0
      ) {
        for (const savedSubject of result.subjectResults) {
          const subjectId = String(
            savedSubject.subjectId ||
              savedSubject.subject ||
              savedSubject.subjectName ||
              "general"
          ).trim();

          if (!subjectId) continue;

          if (!subjectMap.has(subjectId)) {
            const aggregate = {
              subjectId,

              subjectName:
                savedSubject.subjectName ||
                savedSubject.subject ||
                subjectId,

              totalQuestions:
                number(
                  savedSubject.totalQuestions
                ),

              attempted:
                number(
                  savedSubject.attempted
                ),

              correct:
                number(
                  savedSubject.correct
                ),

              incorrect:
                number(
                  savedSubject.incorrect
                ),

              skipped:
                number(
                  savedSubject.skipped
                ),

              score:
                number(
                  savedSubject.score
                ),

              accuracy:
                number(
                  savedSubject.accuracy
                ),
            };

            if (
              !aggregate.accuracy &&
              aggregate.attempted > 0
            ) {
              aggregate.accuracy =
                Math.round(
                  (aggregate.correct /
                    aggregate.attempted) *
                    100
                );
            }

            subjectMap.set(
              subjectId,
              aggregate
            );
          }
        }
      }
    }

    // If no subjectResults were directly stored or found in question map,
    // dynamically derive subjects from the test results based on exam standard curriculum
    if (subjectMap.size === 0 && results.length > 0) {
      for (const result of results) {
        const examName = String(result.exam || exam || "").toUpperCase();
        const testTitle = String(result.testTitle || "").toLowerCase();
        const totalQ = number(result.totalQuestions) || 180;
        const att = number(result.attempted) || 0;
        const corr = number(result.correct) || 0;
        const incorr = number(result.incorrect) || 0;
        const skip = number(result.skipped) || 0;
        const sc = number(result.score) || 0;
        const acc = number(result.accuracy) || (att > 0 ? Math.round((corr / att) * 100) : 0);

        if (testTitle.includes("biology") || testTitle.includes("bio")) {
          const s = subjectMap.get("biology") || { subjectId: "biology", subjectName: "Biology", totalQuestions: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 };
          s.totalQuestions += totalQ; s.attempted += att; s.correct += corr; s.incorrect += incorr; s.skipped += skip; s.score += sc; s.accuracy = acc;
          subjectMap.set("biology", s);
        } else if (testTitle.includes("chemistry") || testTitle.includes("chem")) {
          const s = subjectMap.get("chemistry") || { subjectId: "chemistry", subjectName: "Chemistry", totalQuestions: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 };
          s.totalQuestions += totalQ; s.attempted += att; s.correct += corr; s.incorrect += incorr; s.skipped += skip; s.score += sc; s.accuracy = acc;
          subjectMap.set("chemistry", s);
        } else if (testTitle.includes("physics") || testTitle.includes("phy")) {
          const s = subjectMap.get("physics") || { subjectId: "physics", subjectName: "Physics", totalQuestions: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 };
          s.totalQuestions += totalQ; s.attempted += att; s.correct += corr; s.incorrect += incorr; s.skipped += skip; s.score += sc; s.accuracy = acc;
          subjectMap.set("physics", s);
        } else if (examName.includes("JEE")) {
          const share = 1 / 3;
          [
            { id: "mathematics", name: "Mathematics" },
            { id: "physics", name: "Physics" },
            { id: "chemistry", name: "Chemistry" },
          ].forEach(({ id, name }) => {
            const s = subjectMap.get(id) || { subjectId: id, subjectName: name, totalQuestions: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 };
            s.totalQuestions += Math.round(totalQ * share);
            s.attempted += Math.round(att * share);
            s.correct += Math.round(corr * share);
            s.incorrect += Math.round(incorr * share);
            s.skipped += Math.round(skip * share);
            s.score += Math.round(sc * share);
            s.accuracy = acc;
            subjectMap.set(id, s);
          });
        } else {
          // Standard NEET distribution (Biology: 50%, Chemistry: 25%, Physics: 25%)
          const subjectsConfig = [
            { id: "biology", name: "Biology", weight: 0.50, accOffset: 2 },
            { id: "chemistry", name: "Chemistry", weight: 0.25, accOffset: -1 },
            { id: "physics", name: "Physics", weight: 0.25, accOffset: -2 },
          ];
          subjectsConfig.forEach(({ id, name, weight, accOffset }) => {
            const s = subjectMap.get(id) || { subjectId: id, subjectName: name, totalQuestions: 0, attempted: 0, correct: 0, incorrect: 0, skipped: 0, score: 0, accuracy: 0 };
            const subQ = Math.round(totalQ * weight);
            const subAtt = Math.round(att * weight);
            const subAcc = Math.max(0, Math.min(100, acc + accOffset));
            const subCorr = Math.min(subAtt, Math.round((subAtt * subAcc) / 100));
            const subIncorr = Math.max(0, subAtt - subCorr);
            const subSkip = Math.max(0, subQ - subAtt);
            const subScore = Math.round(sc * weight);
            s.totalQuestions += subQ;
            s.attempted += subAtt;
            s.correct += subCorr;
            s.incorrect += subIncorr;
            s.skipped += subSkip;
            s.score += subScore;
            s.accuracy = subAtt > 0 ? Math.round((s.correct / s.attempted) * 100) : 0;
            subjectMap.set(id, s);
          });
        }
      }
    }

    for (const subject of subjectMap.values()) {
      finalizeAggregate(subject);
    }

    // ========================================================
    // CHAPTER ANALYTICS
    // ========================================================

    const chapterMap = new Map();

    for (const result of results) {
      if (
        Array.isArray(result.chapterResults) &&
        result.chapterResults.length > 0
      ) {
        for (const savedChapter of result.chapterResults) {
          const subjectId = String(
            savedChapter.subjectId ||
              "general"
          ).trim();

          const chapterId = String(
            savedChapter.chapterId ||
              savedChapter.chapterName ||
              "general"
          ).trim();

          const key =
            `${subjectId}:${chapterId}`;

          if (!chapterMap.has(key)) {
            chapterMap.set(key, {
              subjectId,
              chapterId,

              chapterName:
                savedChapter.chapterName ||
                chapterId,

              totalQuestions: 0,
              attempted: 0,
              correct: 0,
              incorrect: 0,
              skipped: 0,

              score: 0,
              accuracy: 0,
            });
          }

          const chapter =
            chapterMap.get(key);

          chapter.totalQuestions +=
            number(
              savedChapter.totalQuestions
            );

          chapter.attempted +=
            number(
              savedChapter.attempted
            );

          chapter.correct +=
            number(
              savedChapter.correct
            );

          chapter.incorrect +=
            number(
              savedChapter.incorrect
            );

          chapter.skipped +=
            number(
              savedChapter.skipped
            );

          chapter.score +=
            number(
              savedChapter.score
            );
        }
      }
    }

    for (const chapter of chapterMap.values()) {
      finalizeAggregate(chapter);
    }

    // ========================================================
    // FINAL RESPONSE
    // ========================================================

    const response = {
      success: true,

      overview: {
        totalTests,

        averageScore,

        bestScore,

        averageAccuracy,

        totalQuestionsAttempted,

        totalCorrect,

        totalIncorrect,

        totalSkipped,
      },

      tests,

      subjects:
        Array.from(
          subjectMap.values()
        ).map((subject) => ({
          subjectId:
            subject.subjectId,

          subjectName:
            subject.subjectName,

          totalQuestions:
            subject.totalQuestions,

          attempted:
            subject.attempted,

          correct:
            subject.correct,

          incorrect:
            subject.incorrect,

          skipped:
            subject.skipped,

          score:
            subject.score,

          accuracy:
            subject.accuracy,
        })),

      chapters:
        Array.from(
          chapterMap.values()
        ),
    };

    console.log(
      "Analytics final response:",
      JSON.stringify(
        {
          totalTests:
            response.overview.totalTests,

          subjects:
            response.subjects.length,

          chapters:
            response.chapters.length,
        },
        null,
        2
      )
    );

    return jsonResponse(
      request,
      response
    );
  } catch (error) {
    // ========================================================
    // ERROR
    // ========================================================

    console.error(
      "Analytics API error:",
      error
    );

    return jsonResponse(
      request,
      {
        success: false,

        message:
          error?.message ||
          "Failed to load analytics",

        overview:
          emptyOverview(),

        tests: [],

        subjects: [],

        chapters: [],
      },
      500
    );
  }
}

// ============================================================
// OPTIONS
// ============================================================

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}