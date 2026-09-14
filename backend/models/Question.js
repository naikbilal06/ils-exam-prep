import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const QuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    exam: {
      type: String,
      required: true,
      index: true,
    },

    testId: {
      type: String,
      required: true,
      index: true,
    },

    subjectId: {
      type: String,
      required: true,
      index: true,
    },

    subjectName: {
      type: String,
      required: true,
    },

    chapterId: {
      type: String,
      required: true,
      index: true,
    },

    chapterName: {
      type: String,
      required: true,
    },

    questionText: {
      type: String,
      required: true,
    },

    options: {
      type: [OptionSchema],
      default: [],
    },

    correctAnswer: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      enum: [
        "Easy",
        "Medium",
        "Hard",
      ],
      default: "Medium",
    },

    marks: {
      type: Number,
      default: 4,
    },

    negativeMarks: {
      type: Number,
      default: 1,
    },

    language: {
      type: String,
      default: "English",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question =
  mongoose.models.Question ||
  mongoose.model(
    "Question",
    QuestionSchema
  );

export default Question;