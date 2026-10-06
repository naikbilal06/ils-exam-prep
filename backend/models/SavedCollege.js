import mongoose from "mongoose";

const SavedCollegeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

SavedCollegeSchema.index(
  { userId: 1, collegeId: 1 },
  { unique: true }
);

const SavedCollege =
  mongoose.models.SavedCollege ||
  mongoose.model("SavedCollege", SavedCollegeSchema);

export default SavedCollege;