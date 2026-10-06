import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    shortName: {
      type: String,
      trim: true,
      default: "",
    },

    exam: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    type: {
      type: String,
      trim: true,
      default: "College",
    },

    city: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },

    state: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    courses: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    /* =========================================
       ADMISSION / CUTOFF DATA
       ========================================= */

    cutoff: {
      type: String,
      trim: true,
      default: "",
    },

    expectedCutoff: {
      type: String,
      trim: true,
      default: "",
    },

    rank: {
      type: String,
      trim: true,
      default: "",
    },

    expectedRank: {
      type: String,
      trim: true,
      default: "",
    },

    /* =========================================
       OPTIONAL NUMERIC RANGE FOR FUTURE
       PREDICTION LOGIC
       ========================================= */

    cutoffMin: {
      type: Number,
      default: null,
    },

    cutoffMax: {
      type: Number,
      default: null,
    },

    rankMin: {
      type: Number,
      default: null,
    },

    rankMax: {
      type: Number,
      default: null,
    },

    /* =========================================
       CATEGORY SUPPORT
       ========================================= */

    categories: {
      type: [String],
      default: [],
    },

    /* =========================================
       STATUS
       ========================================= */

    active: {
      type: Boolean,
      default: true,
      index: true,
    },

    published: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/* =========================================
   INDEXES
========================================= */

CollegeSchema.index({
  exam: 1,
  state: 1,
  active: 1,
  published: 1,
});

CollegeSchema.index({
  exam: 1,
  city: 1,
});

CollegeSchema.index({
  name: 1,
});

/* =========================================
   MODEL
========================================= */

const College =
  mongoose.models.College ||
  mongoose.model(
    "College",
    CollegeSchema
  );

export default College;