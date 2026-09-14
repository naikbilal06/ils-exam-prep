import "dotenv/config";
import mongoose from "mongoose";

import Exam from "../models/Exam.js";
import Subject from "../models/Subject.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const exams = [
  {
    id: "neet",
    name: "NEET",
    description: "National Eligibility cum Entrance Test",
  },
  {
    id: "jee-main",
    name: "JEE Main",
    description: "Joint Entrance Examination Main",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    description: "Joint Entrance Examination Advanced",
  },
  {
    id: "cuet",
    name: "CUET-UG",
    description: "Common University Entrance Test",
  },
];

const subjects = [
  {
    id: "physics",
    name: "Physics",
    description: "Mechanics, Electricity, Optics & more",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Physical, Organic & Inorganic Chemistry",
  },
  {
    id: "biology",
    name: "Biology",
    description: "Botany, Zoology & Human Biology",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Algebra, Calculus, Geometry & more",
  },
  {
    id: "english",
    name: "English",
    description: "Language, Vocabulary & Comprehension",
  },
  {
    id: "general-test",
    name: "General Test",
    description: "Reasoning, Quantitative Ability & GK",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "ils-exam-prep",
      family: 4,
    });

    console.log("MongoDB connected");

    for (const exam of exams) {
      await Exam.findOneAndUpdate(
        { id: exam.id },
        exam,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log("Exams seeded successfully");

    for (const subject of subjects) {
      await Subject.findOneAndUpdate(
        { id: subject.id },
        subject,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log("Subjects seeded successfully");

    console.log("Database seeding completed");
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();