import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const neetQuestions = [
  {
    id: 1,
    question: "The powerhouse of the cell is:",
    options: [
      "Nucleus",
      "Mitochondria",
      "Ribosome",
      "Golgi apparatus",
    ],
    answer: 1,
  },
  {
    id: 2,
    question: "Which blood cells are mainly responsible for immunity?",
    options: [
      "RBCs",
      "Platelets",
      "WBCs",
      "Plasma",
    ],
    answer: 2,
  },
  {
    id: 3,
    question: "The SI unit of force is:",
    options: [
      "Joule",
      "Newton",
      "Watt",
      "Pascal",
    ],
    answer: 1,
  },
  {
    id: 4,
    question:
      "Which gas is most abundant in Earth's atmosphere?",
    options: [
      "Oxygen",
      "Carbon dioxide",
      "Nitrogen",
      "Hydrogen",
    ],
    answer: 2,
  },
  {
    id: 5,
    question:
      "The pH of a neutral solution at 25°C is:",
    options: [
      "5",
      "6",
      "7",
      "8",
    ],
    answer: 2,
  },
  {
    id: 6,
    question:
      "Which vitamin is mainly synthesized in the skin in sunlight?",
    options: [
      "Vitamin A",
      "Vitamin B12",
      "Vitamin C",
      "Vitamin D",
    ],
    answer: 3,
  },
  {
    id: 7,
    question:
      "The acceleration due to gravity near Earth's surface is approximately:",
    options: [
      "4.9 m/s²",
      "9.8 m/s²",
      "19.6 m/s²",
      "98 m/s²",
    ],
    answer: 1,
  },
  {
    id: 8,
    question:
      "Which organ is primarily responsible for filtration of blood and formation of urine?",
    options: [
      "Liver",
      "Heart",
      "Kidney",
      "Lung",
    ],
    answer: 2,
  },
  {
    id: 9,
    question: "The chemical symbol for sodium is:",
    options: [
      "So",
      "S",
      "Na",
      "N",
    ],
    answer: 2,
  },
  {
    id: 10,
    question: "DNA stands for:",
    options: [
      "Deoxyribonucleic Acid",
      "Dinucleic Acid",
      "Deoxyribose Nucleic Atom",
      "Double Nucleic Acid",
    ],
    answer: 0,
  },
];

const getPredictedRank = (score) => {
  const numericScore = Number(score);

  if (!numericScore || numericScore <= 0) {
    return null;
  }

  const rank = Math.round(
    1200000 - (numericScore / 720) * 1195000
  );

  return Math.max(1, rank);
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const exam = searchParams.get("exam");

    if (exam !== "neet") {
      return NextResponse.json(
        {
          success: false,
          message: "Only NEET is available currently.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const questions = neetQuestions.map(
      ({ answer, ...question }) => question
    );

    return NextResponse.json(
      {
        success: true,
        exam: "neet",
        totalQuestions: questions.length,
        questions,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "Rank predictor questions error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load questions.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const exam = String(body.exam || "");
    const answers = body.answers;

    if (exam !== "neet") {
      return NextResponse.json(
        {
          success: false,
          message: "Only NEET is available currently.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (!Array.isArray(answers)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid answers.",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    let correct = 0;

    neetQuestions.forEach((question) => {
      const submittedAnswer = answers.find(
        (item) => Number(item.questionId) === question.id
      );

      if (
        submittedAnswer &&
        Number(submittedAnswer.answer) === question.answer
      ) {
        correct += 1;
      }
    });

    const totalQuestions = neetQuestions.length;

    /*
     * Demo test scoring:
     * 10 questions → scaled to NEET 720 marks.
     */
    const score = Math.round(
      (correct / totalQuestions) * 720
    );

    const predictedRank = getPredictedRank(score);

    return NextResponse.json(
      {
        success: true,
        exam: "neet",
        totalQuestions,
        correctAnswers: correct,
        score,
        maxScore: 720,
        predictedRank,
      },
      {
        status: 200,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(
      "Rank predictor submit error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit test.",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}