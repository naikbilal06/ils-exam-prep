import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      default: "",
      index: true,
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
      index: true,
    },

    googleId: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    questionId: {
      type: String,
      required: true,
      index: true,
    },

    exam: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    subjectId: {
      type: String,
      default: "",
    },

    chapterId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

BookmarkSchema.index(
  { mobile: 1, questionId: 1 },
  { unique: true, partialFilterExpression: { mobile: { $type: "string", $gt: "" } } }
);
BookmarkSchema.index(
  { email: 1, questionId: 1 },
  { unique: true, partialFilterExpression: { email: { $type: "string", $gt: "" } } }
);
BookmarkSchema.index(
  { googleId: 1, questionId: 1 },
  { unique: true, partialFilterExpression: { googleId: { $type: "string", $gt: "" } } }
);

const Bookmark =
  mongoose.models.Bookmark ||
  mongoose.model("Bookmark", BookmarkSchema);

export default Bookmark;
