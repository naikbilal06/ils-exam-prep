import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      default: "",
    },

    googleId: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      index: true,
    },

    authProvider: {
      type: String,
      enum: ["mobile", "google", "both"],
      default: "mobile",
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    exams: {
      type: [String],
      default: [],
    },

    subjects: {
      type: [String],
      default: [],
    },

    profileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);

export default User;