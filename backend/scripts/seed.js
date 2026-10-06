import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

const QuestionSchema = new mongoose.Schema(
  {
    questionId: String,
    exam: String,
    testId: String,
    subjectId: String,
    subjectName: String,
    chapterId: String,
    chapterName: String,
    questionText: String,
    options: {
      A: String,
      B: String,
      C: String,
      D: String,
    },
    correctAnswer: String,
    explanation: String,
    difficulty: String,
    marks: Number,
    negativeMarks: Number,
    language: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

const Question =
  mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);

function createQuestion({
  questionId,
  subjectId,
  subjectName,
  chapterId,
  chapterName,
  questionText,
  options,
  correctAnswer,
  explanation,
  difficulty,
}) {
  return {
    questionId,
    exam: "neet",
    testId: "neet-question-bank",
    subjectId,
    subjectName,
    chapterId,
    chapterName,
    questionText,
    options,
    correctAnswer,
    explanation,
    difficulty,
    marks: 4,
    negativeMarks: 1,
    language: "English",
    isActive: true,
  };
}

/* =========================================================
   BIOLOGY
   30 QUESTIONS
   10 EASY + 10 MEDIUM + 10 HARD
========================================================= */

const biologyQuestions = [
  // ---------------- EASY ----------------
  createQuestion({
    questionId: "neet-bio-001",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell",
    chapterName: "Cell: The Unit of Life",
    questionText: "Which organelle is known as the powerhouse of the cell?",
    options: {
      A: "Nucleus",
      B: "Mitochondria",
      C: "Golgi apparatus",
      D: "Lysosome",
    },
    correctAnswer: "B",
    explanation: "Mitochondria generate most cellular ATP through aerobic respiration.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-002",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biomolecules",
    chapterName: "Biomolecules",
    questionText: "The sugar present in DNA is:",
    options: {
      A: "Ribose",
      B: "Glucose",
      C: "Deoxyribose",
      D: "Fructose",
    },
    correctAnswer: "C",
    explanation: "DNA contains the pentose sugar deoxyribose.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-003",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "body-fluids",
    chapterName: "Body Fluids and Circulation",
    questionText: "Which blood cells are biconcave and normally lack a nucleus in humans?",
    options: {
      A: "WBCs",
      B: "Platelets",
      C: "RBCs",
      D: "Lymphocytes",
    },
    correctAnswer: "C",
    explanation: "Mature human RBCs are biconcave and enucleated.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-004",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "excretory",
    chapterName: "Excretory Products and Their Elimination",
    questionText: "The structural and functional unit of the kidney is:",
    options: {
      A: "Neuron",
      B: "Nephron",
      C: "Alveolus",
      D: "Glomerulus",
    },
    correctAnswer: "B",
    explanation: "The nephron is the basic structural and functional unit of the kidney.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-005",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "chemical-coordination",
    chapterName: "Chemical Coordination and Integration",
    questionText: "Insulin is secreted by the:",
    options: {
      A: "Alpha cells of pancreas",
      B: "Beta cells of pancreas",
      C: "Thyroid cells",
      D: "Adrenal medulla",
    },
    correctAnswer: "B",
    explanation: "Beta cells of the islets of Langerhans secrete insulin.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-006",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "photosynthesis",
    chapterName: "Photosynthesis in Higher Plants",
    questionText: "Photosynthesis mainly occurs in which organelle?",
    options: {
      A: "Mitochondrion",
      B: "Chloroplast",
      C: "Ribosome",
      D: "Vacuole",
    },
    correctAnswer: "B",
    explanation: "Chloroplasts contain chlorophyll and the photosynthetic machinery.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-007",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-genetics",
    chapterName: "Human Genetics",
    questionText: "The normal diploid chromosome number in humans is:",
    options: {
      A: "23",
      B: "44",
      C: "46",
      D: "48",
    },
    correctAnswer: "C",
    explanation: "Human somatic cells normally contain 46 chromosomes arranged in 23 pairs.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-008",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-anatomy",
    chapterName: "Transport in Plants",
    questionText: "Which tissue mainly transports water from roots to aerial parts?",
    options: {
      A: "Phloem",
      B: "Xylem",
      C: "Cambium",
      D: "Epidermis",
    },
    correctAnswer: "B",
    explanation: "Xylem conducts water and mineral ions mainly upward through the plant.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-009",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-physiology",
    chapterName: "Plant Physiology",
    questionText: "Stomata are mainly involved in:",
    options: {
      A: "Protein synthesis",
      B: "Gas exchange and transpiration",
      C: "Water absorption from soil",
      D: "Seed formation",
    },
    correctAnswer: "B",
    explanation: "Stomata regulate gaseous exchange and water loss by transpiration.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-bio-010",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "principles-of-inheritance",
    chapterName: "Principles of Inheritance and Variation",
    questionText: "Mendel conducted his classical experiments mainly on:",
    options: {
      A: "Drosophila",
      B: "Pea plant",
      C: "Maize",
      D: "Wheat",
    },
    correctAnswer: "B",
    explanation: "Gregor Mendel used Pisum sativum for his classical inheritance experiments.",
    difficulty: "Easy",
  }),

  // ---------------- MEDIUM ----------------
  createQuestion({
    questionId: "neet-bio-011",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "neural-control",
    chapterName: "Neural Control and Coordination",
    questionText: "During the rising phase of a typical neuronal action potential, which ion moves rapidly into the neuron?",
    options: {
      A: "K+",
      B: "Na+",
      C: "Ca2+",
      D: "Cl-",
    },
    correctAnswer: "B",
    explanation: "Rapid opening of voltage-gated sodium channels causes Na+ influx and depolarization.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-012",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "excretory",
    chapterName: "Excretory Products and Their Elimination",
    questionText: "ADH primarily increases water reabsorption in the:",
    options: {
      A: "Proximal convoluted tubule only",
      B: "Collecting ducts",
      C: "Glomerulus",
      D: "Bowman's capsule",
    },
    correctAnswer: "B",
    explanation: "ADH increases water permeability of collecting ducts, promoting water reabsorption.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-013",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-reproduction",
    chapterName: "Human Reproduction",
    questionText: "The LH surge in the menstrual cycle is most directly associated with:",
    options: {
      A: "Menstruation",
      B: "Ovulation",
      C: "Implantation",
      D: "Lactation",
    },
    correctAnswer: "B",
    explanation: "A mid-cycle LH surge triggers ovulation.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-014",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-division",
    chapterName: "Cell Cycle and Cell Division",
    questionText: "Crossing over occurs during which stage of meiosis?",
    options: {
      A: "Leptotene",
      B: "Zygotene",
      C: "Pachytene",
      D: "Diplotene",
    },
    correctAnswer: "C",
    explanation: "Crossing over between homologous chromosomes occurs during pachytene of prophase I.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-015",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "molecular-basis",
    chapterName: "Molecular Basis of Inheritance",
    questionText: "In DNA replication, the leading strand is synthesized:",
    options: {
      A: "Discontinuously",
      B: "Continuously",
      C: "Without DNA polymerase",
      D: "Only after the lagging strand",
    },
    correctAnswer: "B",
    explanation: "DNA polymerase synthesizes the leading strand continuously in the direction of the replication fork.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-016",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "respiration",
    chapterName: "Respiration in Plants",
    questionText: "The electron transport system of aerobic respiration is located mainly in the:",
    options: {
      A: "Outer mitochondrial membrane",
      B: "Inner mitochondrial membrane",
      C: "Mitochondrial matrix",
      D: "Cytoplasm",
    },
    correctAnswer: "B",
    explanation: "The mitochondrial electron transport chain is embedded in the inner mitochondrial membrane.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-017",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "genetics",
    chapterName: "Principles of Inheritance and Variation",
    questionText: "The genotype frequency expression in Hardy-Weinberg equilibrium is:",
    options: {
      A: "p + q = 1",
      B: "p2 + q2 = 1",
      C: "p² + 2pq + q² = 1",
      D: "2p + 2q = 1",
    },
    correctAnswer: "C",
    explanation: "For two alleles, genotype frequencies are p², 2pq and q², whose sum is 1.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-018",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "immunity",
    chapterName: "Human Health and Disease",
    questionText: "Which antibody is most abundant in normal human serum?",
    options: {
      A: "IgA",
      B: "IgE",
      C: "IgG",
      D: "IgM",
    },
    correctAnswer: "C",
    explanation: "IgG is the most abundant immunoglobulin in serum.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-019",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "photosynthesis",
    chapterName: "Photosynthesis in Higher Plants",
    questionText: "The primary CO2 acceptor in C3 plants is:",
    options: {
      A: "PEP",
      B: "RuBP",
      C: "OAA",
      D: "Pyruvate",
    },
    correctAnswer: "B",
    explanation: "Ribulose-1,5-bisphosphate (RuBP) accepts CO2 in the Calvin cycle of C3 plants.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-bio-020",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "population",
    chapterName: "Organisms and Populations",
    questionText: "A population showing exponential growth under unlimited resources follows a:",
    options: {
      A: "J-shaped curve",
      B: "S-shaped curve",
      C: "Linear curve",
      D: "Bell-shaped curve",
    },
    correctAnswer: "A",
    explanation: "Exponential growth under ideal unlimited conditions gives a J-shaped curve.",
    difficulty: "Medium",
  }),

  // ---------------- HARD ----------------
  createQuestion({
    questionId: "neet-bio-021",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "excretory",
    chapterName: "Excretory Products and Their Elimination",
    questionText: "The counter-current mechanism in the kidney mainly helps to:",
    options: {
      A: "Increase glucose filtration",
      B: "Maintain the medullary osmotic gradient",
      C: "Decrease blood flow to kidneys",
      D: "Stop tubular secretion",
    },
    correctAnswer: "B",
    explanation: "The loop of Henle and vasa recta contribute to the medullary osmotic gradient required for urine concentration.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-022",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "genetics",
    chapterName: "Principles of Inheritance and Variation",
    questionText: "If the recessive allele frequency in a Hardy-Weinberg population is 0.2, the expected heterozygote frequency is:",
    options: {
      A: "0.04",
      B: "0.16",
      C: "0.32",
      D: "0.64",
    },
    correctAnswer: "C",
    explanation: "q = 0.2, p = 0.8, therefore 2pq = 2 × 0.8 × 0.2 = 0.32.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-023",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "photosynthesis",
    chapterName: "Photosynthesis in Higher Plants",
    questionText: "Photorespiration is particularly significant in:",
    options: {
      A: "C4 plants under high CO2",
      B: "C3 plants under high temperature and low CO2",
      C: "CAM plants only at night",
      D: "All plants equally",
    },
    correctAnswer: "B",
    explanation: "Rubisco acts increasingly as an oxygenase under high temperature and low CO2, promoting photorespiration in C3 plants.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-024",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-division",
    chapterName: "Cell Cycle and Cell Division",
    questionText: "Synapsis of homologous chromosomes occurs during:",
    options: {
      A: "Leptotene",
      B: "Zygotene",
      C: "Pachytene",
      D: "Diakinesis",
    },
    correctAnswer: "B",
    explanation: "Pairing of homologous chromosomes, called synapsis, occurs during zygotene.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-025",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "molecular-basis",
    chapterName: "Molecular Basis of Inheritance",
    questionText: "The enzyme that synthesizes the RNA primer during DNA replication is:",
    options: {
      A: "DNA ligase",
      B: "DNA polymerase",
      C: "Primase",
      D: "Topoisomerase",
    },
    correctAnswer: "C",
    explanation: "Primase synthesizes the short RNA primer required for DNA polymerase activity.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-026",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "neural-control",
    chapterName: "Neural Control and Coordination",
    questionText: "At a chemical synapse, neurotransmitter release is directly triggered by entry of:",
    options: {
      A: "Na+",
      B: "K+",
      C: "Ca2+",
      D: "Cl-",
    },
    correctAnswer: "C",
    explanation: "Arrival of the action potential opens voltage-gated Ca2+ channels, triggering synaptic vesicle fusion.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-027",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "respiration",
    chapterName: "Respiration in Plants",
    questionText: "In aerobic respiration, most ATP is generated during:",
    options: {
      A: "Glycolysis",
      B: "Link reaction",
      C: "Krebs cycle",
      D: "Oxidative phosphorylation",
    },
    correctAnswer: "D",
    explanation: "The largest share of ATP is generated through oxidative phosphorylation using the electron transport chain and chemiosmosis.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-028",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-reproduction",
    chapterName: "Human Reproduction",
    questionText: "The corpus luteum primarily secretes:",
    options: {
      A: "FSH",
      B: "Progesterone",
      C: "Growth hormone",
      D: "TSH",
    },
    correctAnswer: "B",
    explanation: "The corpus luteum secretes mainly progesterone during the luteal phase.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-029",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "evolution",
    chapterName: "Evolution",
    questionText: "In a population, natural selection directly acts on:",
    options: {
      A: "Genotype frequencies only",
      B: "Phenotypic variations affecting survival and reproduction",
      C: "Only DNA replication",
      D: "The genetic code itself",
    },
    correctAnswer: "B",
    explanation: "Selection acts on phenotypic variation, while evolutionary change is reflected in genetic composition of populations.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-bio-030",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biotechnology",
    chapterName: "Biotechnology: Principles and Processes",
    questionText: "Restriction endonucleases generally recognize:",
    options: {
      A: "Random RNA sequences",
      B: "Specific DNA recognition sequences",
      C: "Only amino acid sequences",
      D: "Only promoter proteins",
    },
    correctAnswer: "B",
    explanation: "Restriction enzymes recognize specific nucleotide sequences and cleave DNA at or near those sites.",
    difficulty: "Hard",
  }),
];

/* =========================================================
   PHYSICS
   30 QUESTIONS
   10 EASY + 10 MEDIUM + 10 HARD
========================================================= */

const physicsQuestions = [
  // ---------------- EASY ----------------
  createQuestion({
    questionId: "neet-phy-001",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "units",
    chapterName: "Units and Measurements",
    questionText: "The SI unit of force is:",
    options: {
      A: "Joule",
      B: "Watt",
      C: "Newton",
      D: "Pascal",
    },
    correctAnswer: "C",
    explanation: "The SI unit of force is newton (N).",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-002",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "current-electricity",
    chapterName: "Current Electricity",
    questionText: "According to Ohm's law, at constant temperature:",
    options: {
      A: "V is proportional to I",
      B: "V is inversely proportional to I",
      C: "R is proportional to I",
      D: "V is always zero",
    },
    correctAnswer: "A",
    explanation: "Ohm's law states V = IR for an ohmic conductor at constant physical conditions.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-003",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "work-energy",
    chapterName: "Work, Energy and Power",
    questionText: "The SI unit of power is:",
    options: {
      A: "Joule",
      B: "Newton",
      C: "Watt",
      D: "Volt",
    },
    correctAnswer: "C",
    explanation: "Power is measured in watts (W), equivalent to joule per second.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-004",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "ray-optics",
    chapterName: "Ray Optics",
    questionText: "A convex lens is also called a:",
    options: {
      A: "Diverging lens",
      B: "Converging lens",
      C: "Plane lens",
      D: "Reflecting lens",
    },
    correctAnswer: "B",
    explanation: "A convex lens converges parallel rays of light toward its principal focus.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-005",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "electricity",
    chapterName: "Current Electricity",
    questionText: "The resistance of two resistors connected in series is:",
    options: {
      A: "R1R2",
      B: "R1 + R2",
      C: "R1/R2",
      D: "R1 - R2",
    },
    correctAnswer: "B",
    explanation: "Series resistances add directly: Req = R1 + R2.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-006",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "motion",
    chapterName: "Motion in a Straight Line",
    questionText: "The slope of a velocity-time graph represents:",
    options: {
      A: "Distance",
      B: "Displacement",
      C: "Acceleration",
      D: "Momentum",
    },
    correctAnswer: "C",
    explanation: "Slope of the velocity-time graph gives acceleration.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-007",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "electrostatics",
    chapterName: "Electrostatics",
    questionText: "The SI unit of electric charge is:",
    options: {
      A: "Ampere",
      B: "Volt",
      C: "Coulomb",
      D: "Ohm",
    },
    correctAnswer: "C",
    explanation: "Electric charge is measured in coulombs (C).",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-008",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "gravitation",
    chapterName: "Gravitation",
    questionText: "The value of acceleration due to gravity near Earth's surface is approximately:",
    options: {
      A: "3.8 m/s²",
      B: "9.8 m/s²",
      C: "15.8 m/s²",
      D: "19.6 m/s²",
    },
    correctAnswer: "B",
    explanation: "Near Earth's surface, g is approximately 9.8 m/s².",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-009",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "magnetism",
    chapterName: "Moving Charges and Magnetism",
    questionText: "The SI unit of magnetic field is:",
    options: {
      A: "Tesla",
      B: "Weber",
      C: "Henry",
      D: "Farad",
    },
    correctAnswer: "A",
    explanation: "Magnetic flux density is measured in tesla (T).",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-phy-010",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "modern-physics",
    chapterName: "Modern Physics",
    questionText: "The charge of an electron is:",
    options: {
      A: "Positive",
      B: "Negative",
      C: "Zero",
      D: "Variable",
    },
    correctAnswer: "B",
    explanation: "The electron carries a negative elementary charge.",
    difficulty: "Easy",
  }),

  // ---------------- MEDIUM ----------------
  createQuestion({
    questionId: "neet-phy-011",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "projectile",
    chapterName: "Motion in a Plane",
    questionText: "For a projectile launched and landing at the same level, maximum range occurs at:",
    options: {
      A: "30°",
      B: "45°",
      C: "60°",
      D: "90°",
    },
    correctAnswer: "B",
    explanation: "Range is maximum when sin 2θ = 1, giving θ = 45°.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-012",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "work-energy",
    chapterName: "Work, Energy and Power",
    questionText: "If the speed of a body is doubled, its kinetic energy becomes:",
    options: {
      A: "Half",
      B: "Double",
      C: "Four times",
      D: "Eight times",
    },
    correctAnswer: "C",
    explanation: "K = 1/2 mv², so doubling speed makes kinetic energy four times.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-013",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "electrostatics",
    chapterName: "Electrostatic Potential and Capacitance",
    questionText: "When a dielectric is inserted between capacitor plates, its capacitance generally:",
    options: {
      A: "Decreases",
      B: "Increases",
      C: "Becomes zero",
      D: "Remains exactly unchanged",
    },
    correctAnswer: "B",
    explanation: "For a completely filled dielectric, capacitance increases by the dielectric constant.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-014",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "current-electricity",
    chapterName: "Current Electricity",
    questionText: "For resistors connected in parallel, the equivalent resistance is:",
    options: {
      A: "Greater than every resistor",
      B: "Equal to the largest resistor",
      C: "Less than the smallest resistor",
      D: "Always zero",
    },
    correctAnswer: "C",
    explanation: "The equivalent resistance of parallel branches is less than the smallest individual resistance.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-015",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "gravitation",
    chapterName: "Gravitation",
    questionText: "Escape velocity from Earth's surface is related to orbital velocity near the surface by:",
    options: {
      A: "ve = vo",
      B: "ve = 2vo",
      C: "ve = √2 vo",
      D: "ve = vo/√2",
    },
    correctAnswer: "C",
    explanation: "Escape velocity is √2 times the orbital velocity close to Earth's surface.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-016",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "ray-optics",
    chapterName: "Ray Optics",
    questionText: "The power of a lens of focal length 0.5 m is:",
    options: {
      A: "0.5 D",
      B: "1 D",
      C: "2 D",
      D: "5 D",
    },
    correctAnswer: "C",
    explanation: "Power P = 1/f(in metres) = 1/0.5 = 2 D.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-017",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "semiconductors",
    chapterName: "Semiconductor Electronics",
    questionText: "A p-type semiconductor is formed by doping silicon with a:",
    options: {
      A: "Pentavalent impurity",
      B: "Trivalent impurity",
      C: "Monovalent impurity",
      D: "Noble gas",
    },
    correctAnswer: "B",
    explanation: "Trivalent dopants create holes and form p-type semiconductors.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-018",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "oscillations",
    chapterName: "Oscillations",
    questionText: "In simple harmonic motion, acceleration is:",
    options: {
      A: "Constant",
      B: "Always zero",
      C: "Proportional and opposite to displacement",
      D: "Proportional to velocity",
    },
    correctAnswer: "C",
    explanation: "For SHM, a = -ω²x.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-019",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "wave-optics",
    chapterName: "Wave Optics",
    questionText: "In Young's double-slit experiment, fringe width is proportional to:",
    options: {
      A: "d/λ",
      B: "λd",
      C: "1/λd",
      D: "Only d",
    },
    correctAnswer: "B",
    explanation: "Fringe width β = λD/d, so it is directly proportional to wavelength.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-phy-020",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "modern-physics",
    chapterName: "Dual Nature of Matter and Radiation",
    questionText: "The de Broglie wavelength of a particle is inversely proportional to its:",
    options: {
      A: "Charge",
      B: "Momentum",
      C: "Potential energy only",
      D: "Volume",
    },
    correctAnswer: "B",
    explanation: "de Broglie relation is λ = h/p.",
    difficulty: "Medium",
  }),

  // ---------------- HARD ----------------
  createQuestion({
    questionId: "neet-phy-021",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "current-electricity",
    chapterName: "Current Electricity",
    questionText: "In a balanced Wheatstone bridge, the ratio condition is:",
    options: {
      A: "P + Q = R + S",
      B: "P/Q = R/S",
      C: "P/R = Q/S only if all are equal",
      D: "PQ = RS only",
    },
    correctAnswer: "B",
    explanation: "For balance, P/Q = R/S.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-022",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "rotational-motion",
    chapterName: "System of Particles and Rotational Motion",
    questionText: "The rotational kinetic energy of a rigid body is:",
    options: {
      A: "Iω",
      B: "1/2 Iω²",
      C: "I/ω",
      D: "1/2 I²ω",
    },
    correctAnswer: "B",
    explanation: "Rotational kinetic energy is K = 1/2 Iω².",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-023",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "electrostatics",
    chapterName: "Electrostatic Potential and Capacitance",
    questionText: "Two capacitors C and 2C are connected in series. Their equivalent capacitance is:",
    options: {
      A: "3C",
      B: "2C/3",
      C: "C/3",
      D: "3C/2",
    },
    correctAnswer: "B",
    explanation: "For series capacitors, Ceq = C1C2/(C1+C2) = 2C²/3C = 2C/3.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-024",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "magnetism",
    chapterName: "Moving Charges and Magnetism",
    questionText: "A charged particle moving parallel to a uniform magnetic field experiences magnetic force:",
    options: {
      A: "Maximum force",
      B: "Zero force",
      C: "qvB always",
      D: "Infinite force",
    },
    correctAnswer: "B",
    explanation: "F = qvB sin θ. For parallel motion θ = 0°, so F = 0.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-025",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    questionText: "For an ideal gas undergoing an isothermal process, the change in internal energy is:",
    options: {
      A: "Positive",
      B: "Negative",
      C: "Zero",
      D: "Infinite",
    },
    correctAnswer: "C",
    explanation: "For an ideal gas, internal energy depends only on temperature. Isothermal means constant temperature.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-026",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "modern-physics",
    chapterName: "Atoms and Nuclei",
    questionText: "In the Bohr model, the angular momentum of an electron is quantized as:",
    options: {
      A: "nh",
      B: "nh/2π",
      C: "2πnh",
      D: "h/n",
    },
    correctAnswer: "B",
    explanation: "Bohr's quantization condition is mvr = nh/2π.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-027",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "waves",
    chapterName: "Waves",
    questionText: "For a stationary wave, adjacent nodes are separated by:",
    options: {
      A: "λ",
      B: "λ/2",
      C: "λ/4",
      D: "2λ",
    },
    correctAnswer: "B",
    explanation: "The distance between two consecutive nodes is λ/2.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-028",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "gravitation",
    chapterName: "Gravitation",
    questionText: "If Earth's radius is R, the escape velocity from its surface is proportional to:",
    options: {
      A: "1/R",
      B: "1/√R",
      C: "√R",
      D: "R²",
    },
    correctAnswer: "B",
    explanation: "ve = √(2GM/R), so for fixed mass it is proportional to 1/√R.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-029",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "semiconductors",
    chapterName: "Semiconductor Electronics",
    questionText: "In a forward-biased p-n junction, the depletion region generally:",
    options: {
      A: "Widens",
      B: "Narrows",
      C: "Becomes infinite",
      D: "Does not exist in principle",
    },
    correctAnswer: "B",
    explanation: "Forward bias lowers the barrier potential and reduces the depletion-layer width.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-phy-030",
    subjectId: "physics",
    subjectName: "Physics",
    chapterId: "electromagnetic-induction",
    chapterName: "Electromagnetic Induction",
    questionText: "Lenz's law is a consequence of the conservation of:",
    options: {
      A: "Mass only",
      B: "Charge only",
      C: "Energy",
      D: "Momentum only",
    },
    correctAnswer: "C",
    explanation: "The induced current opposes the change producing it, consistent with conservation of energy.",
    difficulty: "Hard",
  }),
];

/* =========================================================
   CHEMISTRY
   30 QUESTIONS
   10 EASY + 10 MEDIUM + 10 HARD
========================================================= */

const chemistryQuestions = [
  // ---------------- EASY ----------------
  createQuestion({
    questionId: "neet-chem-001",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "atomic-structure",
    chapterName: "Structure of Atom",
    questionText: "Atomic number of an element represents the number of:",
    options: {
      A: "Neutrons only",
      B: "Protons",
      C: "Nucleons only",
      D: "Shells",
    },
    correctAnswer: "B",
    explanation: "Atomic number equals the number of protons in the nucleus.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-002",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "solutions",
    chapterName: "Solutions",
    questionText: "At 25°C, a neutral aqueous solution has pH:",
    options: {
      A: "0",
      B: "5",
      C: "7",
      D: "14",
    },
    correctAnswer: "C",
    explanation: "At 25°C, neutral water has [H+] = 10^-7 M and pH 7.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-003",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "mole-concept",
    chapterName: "Some Basic Concepts of Chemistry",
    questionText: "One mole contains approximately:",
    options: {
      A: "6.022 × 10^20 particles",
      B: "6.022 × 10^23 particles",
      C: "9.8 × 10^23 particles",
      D: "3.011 × 10^23 particles",
    },
    correctAnswer: "B",
    explanation: "Avogadro constant is approximately 6.022 × 10^23 mol^-1.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-004",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "chemical-bonding",
    chapterName: "Chemical Bonding and Molecular Structure",
    questionText: "The bond formed by transfer of electrons is generally called:",
    options: {
      A: "Hydrogen bond",
      B: "Ionic bond",
      C: "Coordinate bond",
      D: "Metallic bond",
    },
    correctAnswer: "B",
    explanation: "An ionic bond forms due to electrostatic attraction after electron transfer.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-005",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    questionText: "A catalyst changes the:",
    options: {
      A: "Equilibrium constant",
      B: "Activation energy",
      C: "Overall enthalpy change",
      D: "Products at equilibrium",
    },
    correctAnswer: "B",
    explanation: "A catalyst provides an alternative pathway with lower activation energy.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-006",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "redox",
    chapterName: "Redox Reactions",
    questionText: "Oxidation is commonly defined as:",
    options: {
      A: "Gain of electrons",
      B: "Loss of electrons",
      C: "Gain of protons only",
      D: "Loss of neutrons",
    },
    correctAnswer: "B",
    explanation: "Oxidation can be defined as loss of electrons.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-007",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "gases",
    chapterName: "States of Matter",
    questionText: "The ideal gas equation is:",
    options: {
      A: "PV = RT",
      B: "PV = nRT",
      C: "P = nR",
      D: "V = nT only",
    },
    correctAnswer: "B",
    explanation: "For n moles of ideal gas, PV = nRT.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-008",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "periodic-table",
    chapterName: "Classification of Elements and Periodicity",
    questionText: "Elements in the same group generally have the same number of:",
    options: {
      A: "Neutrons",
      B: "Valence electrons",
      C: "Shells",
      D: "Nucleons",
    },
    correctAnswer: "B",
    explanation: "Main-group elements in the same group generally have similar valence-electron configurations.",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-009",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "organic-basics",
    chapterName: "Organic Chemistry - Basic Principles",
    questionText: "The functional group of alcohols is:",
    options: {
      A: "-CHO",
      B: "-COOH",
      C: "-OH",
      D: "-NH2",
    },
    correctAnswer: "C",
    explanation: "Alcohols contain the hydroxyl functional group (-OH).",
    difficulty: "Easy",
  }),

  createQuestion({
    questionId: "neet-chem-010",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "electrochemistry",
    chapterName: "Electrochemistry",
    questionText: "Oxidation occurs at the:",
    options: {
      A: "Cathode",
      B: "Anode",
      C: "Salt bridge only",
      D: "Electrolyte only",
    },
    correctAnswer: "B",
    explanation: "Oxidation always occurs at the anode.",
    difficulty: "Easy",
  }),

  // ---------------- MEDIUM ----------------
  createQuestion({
    questionId: "neet-chem-011",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "chemical-bonding",
    chapterName: "Chemical Bonding and Molecular Structure",
    questionText: "The hybridization of carbon in methane is:",
    options: {
      A: "sp",
      B: "sp2",
      C: "sp3",
      D: "dsp2",
    },
    correctAnswer: "C",
    explanation: "Carbon in CH4 forms four sigma bonds with tetrahedral sp3 hybridization.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-012",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "equilibrium",
    chapterName: "Equilibrium",
    questionText: "For a buffer containing a weak acid and its salt, addition of a small amount of acid causes:",
    options: {
      A: "A very large change in pH",
      B: "A relatively small change in pH",
      C: "The pH to become exactly 7",
      D: "Complete neutralization of the buffer",
    },
    correctAnswer: "B",
    explanation: "Buffers resist significant changes in pH when small amounts of acid or base are added.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-013",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "solutions",
    chapterName: "Solutions",
    questionText: "Colligative properties depend primarily on the:",
    options: {
      A: "Chemical identity of solute only",
      B: "Number of solute particles",
      C: "Colour of solution",
      D: "Density of solvent only",
    },
    correctAnswer: "B",
    explanation: "Colligative properties depend on the number of dissolved solute particles.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-014",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    questionText: "For a spontaneous process at constant temperature and pressure, ΔG is generally:",
    options: {
      A: "Positive",
      B: "Zero only",
      C: "Negative",
      D: "Infinite",
    },
    correctAnswer: "C",
    explanation: "A spontaneous process under constant T and P has ΔG < 0.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-015",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "organic-basics",
    chapterName: "Organic Chemistry - Basic Principles",
    questionText: "Which effect involves displacement of sigma electrons along a carbon chain due to electronegativity differences?",
    options: {
      A: "Inductive effect",
      B: "Resonance only",
      C: "Steric effect",
      D: "Hydrogen bonding",
    },
    correctAnswer: "A",
    explanation: "The inductive effect is transmission of electron displacement through sigma bonds.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-016",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "coordination",
    chapterName: "Coordination Compounds",
    questionText: "The species that donates a lone pair to a central metal ion is called:",
    options: {
      A: "Ligand",
      B: "Counter ion",
      C: "Catalyst",
      D: "Oxidant",
    },
    correctAnswer: "A",
    explanation: "A ligand donates one or more lone pairs to the central metal ion.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-017",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "periodic-table",
    chapterName: "Classification of Elements and Periodicity",
    questionText: "Across a period from left to right, atomic radius generally:",
    options: {
      A: "Increases greatly",
      B: "Decreases",
      C: "Remains constant",
      D: "Becomes zero",
    },
    correctAnswer: "B",
    explanation: "Effective nuclear charge generally increases across a period, causing atomic size to decrease.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-018",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "electrochemistry",
    chapterName: "Electrochemistry",
    questionText: "In a galvanic cell, the reaction is spontaneous and the cell potential under standard conditions is:",
    options: {
      A: "Positive",
      B: "Negative",
      C: "Always zero",
      D: "Undefined",
    },
    correctAnswer: "A",
    explanation: "A spontaneous galvanic-cell reaction has positive standard cell potential.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-019",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "chemical-kinetics",
    chapterName: "Chemical Kinetics",
    questionText: "A catalyst affects the rate of a reaction by changing its:",
    options: {
      A: "Equilibrium composition",
      B: "Activation energy",
      C: "Stoichiometric equation",
      D: "Atomic number",
    },
    correctAnswer: "B",
    explanation: "A catalyst lowers the activation energy of the reaction pathway.",
    difficulty: "Medium",
  }),

  createQuestion({
    questionId: "neet-chem-020",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "d-block",
    chapterName: "The d- and f-Block Elements",
    questionText: "Transition-metal ions often show colour because of:",
    options: {
      A: "Complete absence of d electrons",
      B: "Electronic transitions involving d orbitals",
      C: "Only nuclear reactions",
      D: "Only ionic size",
    },
    correctAnswer: "B",
    explanation: "Many transition-metal ions absorb visible light through electronic transitions involving d orbitals.",
    difficulty: "Medium",
  }),

  // ---------------- HARD ----------------
  createQuestion({
    questionId: "neet-chem-021",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "electrochemistry",
    chapterName: "Electrochemistry",
    questionText: "The Nernst equation is used to determine cell potential under:",
    options: {
      A: "Only absolute zero",
      B: "Non-standard conditions",
      C: "Only gaseous conditions",
      D: "Only vacuum conditions",
    },
    correctAnswer: "B",
    explanation: "The Nernst equation relates electrode or cell potential to reaction quotient under non-standard conditions.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-022",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "equilibrium",
    chapterName: "Equilibrium",
    questionText: "For a sparingly soluble salt AB, if its molar solubility is s, its Ksp is:",
    options: {
      A: "s",
      B: "2s",
      C: "s²",
      D: "1/s",
    },
    correctAnswer: "C",
    explanation: "AB(s) ⇌ A+ + B-, so Ksp = [A+][B-] = s × s = s².",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-023",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    questionText: "The thermodynamic relation connecting spontaneity with enthalpy and entropy is:",
    options: {
      A: "ΔG = ΔH + TΔS",
      B: "ΔG = ΔH - TΔS",
      C: "ΔG = TΔH - ΔS",
      D: "ΔG = ΔH/T + ΔS",
    },
    correctAnswer: "B",
    explanation: "The Gibbs free-energy relation is ΔG = ΔH - TΔS.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-024",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "chemical-kinetics",
    chapterName: "Chemical Kinetics",
    questionText: "For a first-order reaction, the half-life is:",
    options: {
      A: "Directly proportional to initial concentration",
      B: "Independent of initial concentration",
      C: "Always zero",
      D: "Equal to the rate constant",
    },
    correctAnswer: "B",
    explanation: "For a first-order reaction, t1/2 = 0.693/k and does not depend on initial concentration.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-025",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "organic-carbonyl",
    chapterName: "Aldehydes, Ketones and Carboxylic Acids",
    questionText: "Aldehydes are generally more easily oxidized than ketones because aldehydes contain:",
    options: {
      A: "A hydrogen attached to the carbonyl carbon",
      B: "An extra alkyl group",
      C: "No carbonyl group",
      D: "Only aromatic carbon",
    },
    correctAnswer: "A",
    explanation: "The carbonyl carbon of an aldehyde bears hydrogen, making oxidation to carboxylic acid comparatively easy.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-026",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "coordination",
    chapterName: "Coordination Compounds",
    questionText: "The coordination number of a central metal ion is the number of:",
    options: {
      A: "Oxidation states",
      B: "Donor atoms directly attached to it",
      C: "Electrons in the metal",
      D: "Counter ions only",
    },
    correctAnswer: "B",
    explanation: "Coordination number counts donor atoms directly coordinated to the central metal ion.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-027",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "organic-stereochemistry",
    chapterName: "Organic Chemistry",
    questionText: "A carbon atom attached to four different groups is generally called:",
    options: {
      A: "Achiral carbon",
      B: "Chiral centre",
      C: "Carbonyl carbon",
      D: "Aromatic carbon",
    },
    correctAnswer: "B",
    explanation: "A tetrahedral carbon attached to four different substituents is a stereogenic/chiral centre.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-028",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "solutions",
    chapterName: "Solutions",
    questionText: "The osmotic pressure of a dilute solution is described by:",
    options: {
      A: "π = nRT only",
      B: "π = CRT",
      C: "π = C/R",
      D: "π = RT/C",
    },
    correctAnswer: "B",
    explanation: "For a dilute solution, osmotic pressure follows the van't Hoff equation π = CRT.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-029",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "redox",
    chapterName: "Redox Reactions",
    questionText: "In a disproportionation reaction, the same species is simultaneously:",
    options: {
      A: "Only reduced",
      B: "Only oxidized",
      C: "Oxidized and reduced",
      D: "Neither oxidized nor reduced",
    },
    correctAnswer: "C",
    explanation: "Disproportionation involves simultaneous oxidation and reduction of the same element or species.",
    difficulty: "Hard",
  }),

  createQuestion({
    questionId: "neet-chem-030",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    chapterId: "organic-reactions",
    chapterName: "Organic Chemistry",
    questionText: "An SN1 reaction proceeds through the formation of a:",
    options: {
      A: "Carbanion intermediate",
      B: "Carbocation intermediate",
      C: "Free atom intermediate",
      D: "Nitrene only",
    },
    correctAnswer: "B",
    explanation: "SN1 reactions are unimolecular nucleophilic substitutions involving a carbocation intermediate.",
    difficulty: "Hard",
  }),
];

/* =========================================================
   OPTIONAL EXAM + SUBJECT DOCUMENTS
   Keeps them available in MongoDB.
========================================================= */

const ExamSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    description: String,
    active: Boolean,
  },
  { timestamps: true }
);

const SubjectSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    description: String,
    active: Boolean,
  },
  { timestamps: true }
);

const Exam =
  mongoose.models.Exam ||
  mongoose.model("Exam", ExamSchema);

const Subject =
  mongoose.models.Subject ||
  mongoose.model("Subject", SubjectSchema);

/* =========================================================
   MAIN
========================================================= */

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "ils-exam-prep",
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected");

    await Exam.findOneAndUpdate(
      { id: "neet" },
      {
        id: "neet",
        name: "NEET",
        description: "National Eligibility cum Entrance Test",
        active: true,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const subjects = [
      {
        id: "physics",
        name: "Physics",
        description: "NEET Physics",
        active: true,
      },
      {
        id: "chemistry",
        name: "Chemistry",
        description: "NEET Chemistry",
        active: true,
      },
      {
        id: "biology",
        name: "Biology",
        description: "NEET Biology",
        active: true,
      },
    ];

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

    const questions = [
      ...biologyQuestions,
      ...physicsQuestions,
      ...chemistryQuestions,
    ];

    for (const question of questions) {
      await Question.findOneAndUpdate(
        { questionId: question.questionId },
        question,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    const counts = {
      Easy: questions.filter((q) => q.difficulty === "Easy").length,
      Medium: questions.filter((q) => q.difficulty === "Medium").length,
      Hard: questions.filter((q) => q.difficulty === "Hard").length,
    };

    console.log("");
    console.log("========================================");
    console.log("NEET QUESTION BANK SEEDED");
    console.log("========================================");
    console.log(`Total new/updated questions: ${questions.length}`);
    console.log(`Easy: ${counts.Easy}`);
    console.log(`Medium: ${counts.Medium}`);
    console.log(`Hard: ${counts.Hard}`);
    console.log("========================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  }
}

seed();