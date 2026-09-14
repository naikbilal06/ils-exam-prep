import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    selectedAnswer: {
      type: String,
      default: null,
    },

    correctAnswer: {
      type: String,
      default: null,
    },

    isCorrect: {
      type: Boolean,
      default: false,
    },

    isSkipped: {
      type: Boolean,
      default: false,
    },

    timeTaken: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const SubjectResultSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    attempted: {
      type: Number,
      default: 0,
    },

    correct: {
      type: Number,
      default: 0,
    },

    incorrect: {
      type: Number,
      default: 0,
    },

    skipped: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const ChapterResultSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true,
    },

    chapterId: {
      type: String,
      required: true,
    },

    chapterName: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    attempted: {
      type: Number,
      default: 0,
    },

    correct: {
      type: Number,
      default: 0,
    },

    incorrect: {
      type: Number,
      default: 0,
    },

    skipped: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const TestResultSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      index: true,
    },

    testId: {
      type: String,
      required: true,
    },

    testTitle: {
      type: String,
      required: true,
    },

    exam: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    attempted: {
      type: Number,
      default: 0,
    },

    correct: {
      type: Number,
      default: 0,
    },

    incorrect: {
      type: Number,
      default: 0,
    },

    skipped: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    accuracy: {
      type: Number,
      default: 0,
    },

    estimatedRank: {
      type: Number,
      default: null,
    },

    answers: {
      type: [AnswerSchema],
      default: [],
    },

    subjectResults: {
      type: [SubjectResultSchema],
      default: [],
    },

    chapterResults: {
      type: [ChapterResultSchema],
      default: [],
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const TestResult =
  mongoose.models.TestResult ||
  mongoose.model(
    "TestResult",
    TestResultSchema
  );

export default TestResult;