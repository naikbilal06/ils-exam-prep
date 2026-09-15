import "dotenv/config";
import mongoose from "mongoose";

import Exam from "../models/Exam.js";
import Subject from "../models/Subject.js";
import Question from "../models/Question.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const exams = [
  {
    id: "neet",
    name: "NEET",
    description:
      "National Eligibility cum Entrance Test",
  },
  {
    id: "jee-main",
    name: "JEE Main",
    description:
      "Joint Entrance Examination Main",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    description:
      "Joint Entrance Examination Advanced",
  },
  {
    id: "cuet",
    name: "CUET-UG",
    description:
      "Common University Entrance Test",
  },
];

const subjects = [
  {
    id: "physics",
    name: "Physics",
    description:
      "Mechanics, Electricity, Optics & more",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description:
      "Physical, Organic & Inorganic Chemistry",
  },
  {
    id: "biology",
    name: "Biology",
    description:
      "Botany, Zoology & Human Biology",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description:
      "Algebra, Calculus, Geometry & more",
  },
  {
    id: "english",
    name: "English",
    description:
      "Language, Vocabulary & Comprehension",
  },
  {
    id: "general-test",
    name: "General Test",
    description:
      "Reasoning, Quantitative Ability & GK",
  },
];

const questions = [
  {
    questionId: "neet-bio-001",
    exam: "neet",
    testId: "practice-biology-001",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-biology",
    chapterName: "Cell Biology",
    questionText:
      "The powerhouse of the cell is:",
    options: [
      {
        key: "A",
        text: "Nucleus",
      },
      {
        key: "B",
        text: "Mitochondria",
      },
      {
        key: "C",
        text: "Ribosome",
      },
      {
        key: "D",
        text: "Golgi apparatus",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Mitochondria are the major site of ATP production and are therefore called the powerhouse of the cell.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-bio-002",
    exam: "neet",
    testId: "practice-biology-001",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-physiology",
    chapterName: "Human Physiology",
    questionText:
      "Which blood cells are mainly responsible for immunity?",
    options: [
      {
        key: "A",
        text: "RBCs",
      },
      {
        key: "B",
        text: "Platelets",
      },
      {
        key: "C",
        text: "WBCs",
      },
      {
        key: "D",
        text: "Plasma",
      },
    ],
    correctAnswer: "C",
    explanation:
      "White blood cells play a major role in body defence and immunity.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-bio-003",
    exam: "neet",
    testId: "practice-biology-001",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-physiology",
    chapterName: "Human Physiology",
    questionText:
      "Which organ is primarily responsible for filtration of blood and formation of urine?",
    options: [
      {
        key: "A",
        text: "Liver",
      },
      {
        key: "B",
        text: "Heart",
      },
      {
        key: "C",
        text: "Kidney",
      },
      {
        key: "D",
        text: "Lung",
      },
    ],
    correctAnswer: "C",
    explanation:
      "The kidneys filter blood and form urine through the process of urine formation.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-bio-004",
    exam: "neet",
    testId: "practice-biology-001",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-biology",
    chapterName: "Cell Biology",
    questionText:
      "DNA stands for:",
    options: [
      {
        key: "A",
        text: "Deoxyribonucleic Acid",
      },
      {
        key: "B",
        text: "Dinucleic Acid",
      },
      {
        key: "C",
        text: "Deoxyribose Nucleic Atom",
      },
      {
        key: "D",
        text: "Double Nucleic Acid",
      },
    ],
    correctAnswer: "A",
    explanation:
      "DNA stands for Deoxyribonucleic Acid.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-phy-001",
    exam: "neet",
    testId: "practice-physics-001",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "mechanics",
    chapterName: "Mechanics",
    questionText:
      "The SI unit of force is:",
    options: [
      {
        key: "A",
        text: "Joule",
      },
      {
        key: "B",
        text: "Newton",
      },
      {
        key: "C",
        text: "Watt",
      },
      {
        key: "D",
        text: "Pascal",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Newton (N) is the SI unit of force.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-phy-002",
    exam: "neet",
    testId: "practice-physics-001",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "mechanics",
    chapterName: "Mechanics",
    questionText:
      "The acceleration due to gravity near Earth's surface is approximately:",
    options: [
      {
        key: "A",
        text: "4.9 m/s²",
      },
      {
        key: "B",
        text: "9.8 m/s²",
      },
      {
        key: "C",
        text: "19.6 m/s²",
      },
      {
        key: "D",
        text: "98 m/s²",
      },
    ],
    correctAnswer: "B",
    explanation:
      "The standard approximate value of acceleration due to gravity near Earth's surface is 9.8 m/s².",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-chem-001",
    exam: "neet",
    testId: "practice-chemistry-001",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "basic-chemistry",
    chapterName: "Basic Chemistry",
    questionText:
      "What is the atomic number of oxygen?",
    options: [
      {
        key: "A",
        text: "6",
      },
      {
        key: "B",
        text: "7",
      },
      {
        key: "C",
        text: "8",
      },
      {
        key: "D",
        text: "9",
      },
    ],
    correctAnswer: "C",
    explanation:
      "Oxygen has atomic number 8.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  },

  {
    questionId: "neet-chem-002",
    exam: "neet",
    testId: "practice-chemistry-001",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "basic-chemistry",
    chapterName: "Basic Chemistry",
    questionText:
      "The pH of a neutral solution at 25°C is:",
    options: [
      {
        key: "A",
        text: "5",
      },
      {
        key: "B",
        text: "6",
      },
      {
        key: "C",
        text: "7",
      },
      {
        key: "D",
        text: "8",
      },
    ],
    correctAnswer: "C",
    explanation:
      "At 25°C, a neutral aqueous solution has a pH of 7.",
    difficulty: "Easy",
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
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

    console.log(
      "Exams seeded successfully"
    );

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

    console.log(
      "Subjects seeded successfully"
    );

    for (const question of questions) {
      await Question.findOneAndUpdate(
        {
          questionId:
            question.questionId,
        },
        question,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log(
      `${questions.length} questions seeded successfully`
    );

    console.log(
      "Database seeding completed"
    );
  } catch (error) {
    console.error(
      "Database seeding failed:",
      error
    );

    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();