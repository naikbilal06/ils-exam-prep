import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import College from "@/models/College";

/* =========================================================
   CORS
========================================================= */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods":
    "GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization",
};

/* =========================================================
   OPTIONS
========================================================= */

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/* =========================================================
   HELPERS
========================================================= */

function cleanString(value) {
  return String(value ?? "").trim();
}

function escapeRegex(value) {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

function calculateMatch(score, college) {
  const numericScore = Number(score);

  if (!Number.isFinite(numericScore)) {
    return "";
  }

  const min =
    college.cutoffMin !== null &&
    college.cutoffMin !== undefined
      ? Number(college.cutoffMin)
      : null;

  const max =
    college.cutoffMax !== null &&
    college.cutoffMax !== undefined
      ? Number(college.cutoffMax)
      : null;

  /*
   * We only calculate a label when the admin
   * has supplied numeric cutoff data.
   */

  if (
    min === null &&
    max === null
  ) {
    return "";
  }

  if (
    max !== null &&
    numericScore >= max
  ) {
    return "High Match";
  }

  if (
    min !== null &&
    numericScore >= min
  ) {
    return "Good Match";
  }

  return "Below Current Range";
}

/* =========================================================
   GET /api/colleges
========================================================= */

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const exam = cleanString(
      searchParams.get("exam")
    ).toLowerCase();

    const scoreRaw = cleanString(
      searchParams.get("score")
    );

    const category = cleanString(
      searchParams.get("category")
    );

    const state = cleanString(
      searchParams.get("state")
    );

    const city = cleanString(
      searchParams.get("city")
    );

    const type = cleanString(
      searchParams.get("type")
    );

    const search = cleanString(
      searchParams.get("search")
    );

    const limitRaw = Number(
      searchParams.get("limit") || 50
    );

    const limit = Math.min(
      Math.max(
        Number.isFinite(limitRaw)
          ? Math.floor(limitRaw)
          : 50,
        1
      ),
      100
    );

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Exam is required.",
          colleges: [],
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const allowedExams = [
      "neet",
      "jee",
      "jee-main",
      "jee-advanced",
      "cuet",
    ];

    if (
      !allowedExams.includes(
        exam
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unsupported exam.",
          colleges: [],
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    let score = null;

    if (scoreRaw) {
      score = Number(scoreRaw);

      if (
        !Number.isFinite(score) ||
        score < 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Score must be a valid non-negative number.",
            colleges: [],
          },
          {
            status: 400,
            headers: corsHeaders,
          }
        );
      }
    }

    /* =====================================================
       QUERY
    ===================================================== */

    const query = {
      exam,
      active: true,
      published: true,
    };

    /*
     * "All India" means do not restrict by state.
     */

    if (
      state &&
      state.toLowerCase() !==
        "all india"
    ) {
      query.state = {
        $regex: `^${escapeRegex(
          state
        )}$`,
        $options: "i",
      };
    }

    if (city) {
      query.city = {
        $regex: escapeRegex(city),
        $options: "i",
      };
    }

    if (type) {
      query.type = {
        $regex: escapeRegex(type),
        $options: "i",
      };
    }

    /*
     * Search is restricted to the
     * college-name field.
     */

    if (search) {
      query.name = {
        $regex: escapeRegex(search),
        $options: "i",
      };
    }

    /*
     * Category filter is only applied when
     * the requested category is provided AND
     * the record has category information.
     */

    if (category) {
      query.$or = [
        {
          categories: {
            $in: [category],
          },
        },
        {
          categories: {
            $size: 0,
          },
        },
      ];
    }

    /* =====================================================
       FETCH
    ===================================================== */

    const colleges =
      await College.find(query)
        .sort({
          name: 1,
        })
        .limit(limit)
        .lean();

    /* =====================================================
       RESPONSE MAPPING
    ===================================================== */

    const mappedColleges =
      colleges.map(
        (college) => {
          const calculatedMatch =
            calculateMatch(
              score,
              college
            );

          return {
            id:
              String(
                college._id
              ),

            name:
              college.name || "",

            shortName:
              college.shortName || "",

            exam:
              college.exam || exam,

            type:
              college.type ||
              "College",

            city:
              college.city || "",

            state:
              college.state || "",

            location:
              college.location ||
              [
                college.city,
                college.state,
              ]
                .filter(Boolean)
                .join(", "),

            courses:
              Array.isArray(
                college.courses
              )
                ? college.courses
                : [],

            description:
              college.description ||
              "",

            website:
              college.website || "",

            icon:
              college.icon ||
              college.name
                ?.trim()
                ?.charAt(0) ||
              "C",

            cutoff:
              college.cutoff ||
              college.expectedCutoff ||
              "",

            expectedCutoff:
              college.expectedCutoff ||
              "",

            rank:
              college.rank ||
              college.expectedRank ||
              "",

            expectedRank:
              college.expectedRank ||
              "",

            cutoffMin:
              college.cutoffMin ??
              null,

            cutoffMax:
              college.cutoffMax ??
              null,

            rankMin:
              college.rankMin ??
              null,

            rankMax:
              college.rankMax ??
              null,

            categories:
              Array.isArray(
                college.categories
              )
                ? college.categories
                : [],

            match:
              calculatedMatch,

            active:
              college.active === true,

            published:
              college.published === true,
          };
        }
      );

    /* =====================================================
       OPTIONAL SCORE-BASED ORDERING
    ===================================================== */

    if (score !== null) {
      const priority = {
        "High Match": 1,
        "Good Match": 2,
        "": 3,
        "Below Current Range": 4,
      };

      mappedColleges.sort(
        (a, b) =>
          (priority[a.match] ?? 5) -
          (priority[b.match] ?? 5)
      );
    }

    /* =====================================================
       RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        filters: {
          exam,
          score,
          category,
          state,
          city,
          type,
          search,
        },

        count:
          mappedColleges.length,

        colleges:
          mappedColleges,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/colleges error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load college data.",
        colleges: [],
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}