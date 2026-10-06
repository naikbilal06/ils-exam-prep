import "dotenv/config";
import mongoose from "mongoose";

import Question from "../models/Question.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined in .env"
  );
}

const questions = [
  /* ======================================================
     BIOLOGY — EASY
     031 - 050
  ====================================================== */

  {
    questionId: "neet-bio-031",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-biology",
    chapterName: "Cell: The Unit of Life",
    questionText:
      "The plasma membrane is mainly composed of:",
    options: [
      { key: "A", text: "Cellulose only" },
      { key: "B", text: "Lipids and proteins" },
      { key: "C", text: "Starch and proteins" },
      { key: "D", text: "DNA and RNA" },
    ],
    correctAnswer: "B",
    explanation:
      "The plasma membrane mainly consists of lipids and proteins arranged in a fluid mosaic structure.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-032",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-biology",
    chapterName: "Cell: The Unit of Life",
    questionText:
      "Ribosomes are primarily involved in:",
    options: [
      { key: "A", text: "Lipid digestion" },
      { key: "B", text: "Protein synthesis" },
      { key: "C", text: "DNA storage" },
      { key: "D", text: "ATP storage" },
    ],
    correctAnswer: "B",
    explanation:
      "Ribosomes are the cellular structures responsible for protein synthesis.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-033",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-physiology",
    chapterName: "Human Physiology",
    questionText:
      "Which chamber of the human heart pumps oxygenated blood into the aorta?",
    options: [
      { key: "A", text: "Right atrium" },
      { key: "B", text: "Right ventricle" },
      { key: "C", text: "Left atrium" },
      { key: "D", text: "Left ventricle" },
    ],
    correctAnswer: "D",
    explanation:
      "The left ventricle pumps oxygenated blood into the aorta.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-034",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-physiology",
    chapterName: "Human Physiology",
    questionText:
      "Which part of the digestive system is the main site of nutrient absorption?",
    options: [
      { key: "A", text: "Stomach" },
      { key: "B", text: "Small intestine" },
      { key: "C", text: "Large intestine" },
      { key: "D", text: "Oesophagus" },
    ],
    correctAnswer: "B",
    explanation:
      "Most digestion is completed and nutrients are absorbed through the small intestine.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-035",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-physiology",
    chapterName: "Human Physiology",
    questionText:
      "Which hormone is mainly responsible for reducing blood glucose level?",
    options: [
      { key: "A", text: "Glucagon" },
      { key: "B", text: "Insulin" },
      { key: "C", text: "Adrenaline" },
      { key: "D", text: "Thyroxine" },
    ],
    correctAnswer: "B",
    explanation:
      "Insulin promotes glucose uptake and storage, thereby lowering blood glucose.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-036",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-physiology",
    chapterName: "Plant Physiology",
    questionText:
      "Which pigment is directly involved in photosynthesis?",
    options: [
      { key: "A", text: "Melanin" },
      { key: "B", text: "Chlorophyll" },
      { key: "C", text: "Haemoglobin" },
      { key: "D", text: "Keratin" },
    ],
    correctAnswer: "B",
    explanation:
      "Chlorophyll absorbs light energy used during photosynthesis.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-037",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-anatomy",
    chapterName: "Anatomy of Flowering Plants",
    questionText:
      "Phloem mainly transports:",
    options: [
      { key: "A", text: "Water only" },
      { key: "B", text: "Minerals only" },
      { key: "C", text: "Organic food materials" },
      { key: "D", text: "Oxygen only" },
    ],
    correctAnswer: "C",
    explanation:
      "Phloem transports organic assimilates such as sugars from source to sink.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-038",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-reproduction",
    chapterName: "Human Reproduction",
    questionText:
      "The male gamete in humans is called:",
    options: [
      { key: "A", text: "Ovum" },
      { key: "B", text: "Zygote" },
      { key: "C", text: "Sperm" },
      { key: "D", text: "Embryo" },
    ],
    correctAnswer: "C",
    explanation:
      "The male reproductive gamete is the sperm.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-039",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-reproduction",
    chapterName: "Human Reproduction",
    questionText:
      "Fertilization in humans normally occurs in the:",
    options: [
      { key: "A", text: "Uterus" },
      { key: "B", text: "Vagina" },
      { key: "C", text: "Ampullary region of fallopian tube" },
      { key: "D", text: "Cervix" },
    ],
    correctAnswer: "C",
    explanation:
      "Human fertilization normally occurs at the ampullary-isthmic junction of the oviduct.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-040",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "genetics",
    chapterName: "Principles of Inheritance and Variation",
    questionText:
      "A gene is best described as:",
    options: [
      { key: "A", text: "A type of cell" },
      { key: "B", text: "A segment of DNA carrying hereditary information" },
      { key: "C", text: "A complete chromosome only" },
      { key: "D", text: "A protein molecule" },
    ],
    correctAnswer: "B",
    explanation:
      "A gene is a functional segment of DNA associated with hereditary information.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-041",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "ecology",
    chapterName: "Ecosystem",
    questionText:
      "The first trophic level in a grazing food chain is occupied by:",
    options: [
      { key: "A", text: "Primary consumers" },
      { key: "B", text: "Secondary consumers" },
      { key: "C", text: "Producers" },
      { key: "D", text: "Decomposers" },
    ],
    correctAnswer: "C",
    explanation:
      "Producers form the first trophic level because they synthesize organic food.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-042",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biodiversity",
    chapterName: "Biodiversity and Conservation",
    questionText:
      "The variety of life forms present on Earth is called:",
    options: [
      { key: "A", text: "Ecological succession" },
      { key: "B", text: "Biodiversity" },
      { key: "C", text: "Population density" },
      { key: "D", text: "Biogeography" },
    ],
    correctAnswer: "B",
    explanation:
      "Biodiversity refers to the variety and variability of living organisms.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-043",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-health",
    chapterName: "Human Health and Disease",
    questionText:
      "The causative organism of malaria belongs to:",
    options: [
      { key: "A", text: "Virus" },
      { key: "B", text: "Bacterium" },
      { key: "C", text: "Protozoan" },
      { key: "D", text: "Fungus" },
    ],
    correctAnswer: "C",
    explanation:
      "Malaria is caused by Plasmodium, a protozoan parasite.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-044",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biotechnology",
    chapterName: "Biotechnology",
    questionText:
      "PCR is mainly used to:",
    options: [
      { key: "A", text: "Translate proteins" },
      { key: "B", text: "Amplify DNA" },
      { key: "C", text: "Digest carbohydrates" },
      { key: "D", text: "Produce ATP" },
    ],
    correctAnswer: "B",
    explanation:
      "Polymerase chain reaction amplifies a selected DNA sequence.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-045",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "evolution",
    chapterName: "Evolution",
    questionText:
      "The process by which organisms better adapted to their environment tend to survive is called:",
    options: [
      { key: "A", text: "Natural selection" },
      { key: "B", text: "Translation" },
      { key: "C", text: "Transpiration" },
      { key: "D", text: "Mutation repair" },
    ],
    correctAnswer: "A",
    explanation:
      "Natural selection favours heritable variations that improve survival and reproduction.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-046",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "animal-kingdom",
    chapterName: "Animal Kingdom",
    questionText:
      "Animals with a segmented body and jointed appendages belong to:",
    options: [
      { key: "A", text: "Mollusca" },
      { key: "B", text: "Annelida" },
      { key: "C", text: "Arthropoda" },
      { key: "D", text: "Echinodermata" },
    ],
    correctAnswer: "C",
    explanation:
      "Arthropods characteristically have segmented bodies and jointed appendages.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-047",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-growth",
    chapterName: "Plant Growth and Development",
    questionText:
      "Auxin is mainly associated with:",
    options: [
      { key: "A", text: "Cell elongation" },
      { key: "B", text: "Blood clotting" },
      { key: "C", text: "Muscle contraction" },
      { key: "D", text: "Digestion" },
    ],
    correctAnswer: "A",
    explanation:
      "Auxin promotes cell elongation and influences several growth responses in plants.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-048",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "body-fluids",
    chapterName: "Body Fluids and Circulation",
    questionText:
      "Platelets are mainly involved in:",
    options: [
      { key: "A", text: "Gas exchange" },
      { key: "B", text: "Blood clotting" },
      { key: "C", text: "Antibody production" },
      { key: "D", text: "Digestion" },
    ],
    correctAnswer: "B",
    explanation:
      "Platelets play a major role in haemostasis and blood clot formation.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-049",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "breathing",
    chapterName: "Breathing and Exchange of Gases",
    questionText:
      "The functional units responsible for gas exchange in human lungs are:",
    options: [
      { key: "A", text: "Nephrons" },
      { key: "B", text: "Alveoli" },
      { key: "C", text: "Villi" },
      { key: "D", text: "Bronchioles only" },
    ],
    correctAnswer: "B",
    explanation:
      "Alveoli provide a large surface area for exchange of oxygen and carbon dioxide.",
    difficulty: "Easy",
  },

  {
    questionId: "neet-bio-050",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "neural-control",
    chapterName: "Neural Control and Coordination",
    questionText:
      "The basic structural and functional unit of the nervous system is:",
    options: [
      { key: "A", text: "Neuron" },
      { key: "B", text: "Nephron" },
      { key: "C", text: "Osteon" },
      { key: "D", text: "Sarcomere" },
    ],
    correctAnswer: "A",
    explanation:
      "The neuron is the basic structural and functional unit of the nervous system.",
    difficulty: "Easy",
  },

  /* ======================================================
     BIOLOGY — MEDIUM
     051 - 070
  ====================================================== */

  {
    questionId: "neet-bio-051",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-biology",
    chapterName: "Cell: The Unit of Life",
    questionText:
      "Which cell organelle modifies, packages and sorts proteins?",
    options: [
      { key: "A", text: "Lysosome" },
      { key: "B", text: "Golgi apparatus" },
      { key: "C", text: "Centrosome" },
      { key: "D", text: "Peroxisome" },
    ],
    correctAnswer: "B",
    explanation:
      "The Golgi apparatus modifies, sorts and packages proteins and lipids.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-052",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biomolecules",
    chapterName: "Biomolecules",
    questionText:
      "Which level of protein structure is determined by the amino acid sequence?",
    options: [
      { key: "A", text: "Primary structure" },
      { key: "B", text: "Secondary structure" },
      { key: "C", text: "Tertiary structure" },
      { key: "D", text: "Quaternary structure" },
    ],
    correctAnswer: "A",
    explanation:
      "The primary structure is the specific linear sequence of amino acids.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-053",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "photosynthesis",
    chapterName: "Photosynthesis in Higher Plants",
    questionText:
      "The light reaction of photosynthesis occurs mainly in the:",
    options: [
      { key: "A", text: "Stroma" },
      { key: "B", text: "Thylakoid membranes" },
      { key: "C", text: "Cytoplasm" },
      { key: "D", text: "Nucleus" },
    ],
    correctAnswer: "B",
    explanation:
      "Photosystems and electron carriers involved in light reactions are located in thylakoid membranes.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-054",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "respiration",
    chapterName: "Respiration in Plants",
    questionText:
      "Glycolysis takes place in the:",
    options: [
      { key: "A", text: "Nucleus" },
      { key: "B", text: "Cytoplasm" },
      { key: "C", text: "Mitochondrial inner membrane" },
      { key: "D", text: "Golgi apparatus" },
    ],
    correctAnswer: "B",
    explanation:
      "Glycolysis is the cytoplasmic pathway that converts glucose to pyruvate.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-055",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "body-fluids",
    chapterName: "Body Fluids and Circulation",
    questionText:
      "The valve between the left atrium and left ventricle is the:",
    options: [
      { key: "A", text: "Tricuspid valve" },
      { key: "B", text: "Mitral valve" },
      { key: "C", text: "Pulmonary semilunar valve" },
      { key: "D", text: "Aortic semilunar valve" },
    ],
    correctAnswer: "B",
    explanation:
      "The mitral or bicuspid valve lies between the left atrium and left ventricle.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-056",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "excretory",
    chapterName: "Excretory Products and Their Elimination",
    questionText:
      "Ultrafiltration of blood takes place in the:",
    options: [
      { key: "A", text: "Loop of Henle" },
      { key: "B", text: "Glomerulus" },
      { key: "C", text: "Collecting duct" },
      { key: "D", text: "Ureter" },
    ],
    correctAnswer: "B",
    explanation:
      "Ultrafiltration occurs across the glomerular capillaries into Bowman's capsule.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-057",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "endocrine",
    chapterName: "Chemical Coordination and Integration",
    questionText:
      "Thyroxine synthesis requires an adequate supply of:",
    options: [
      { key: "A", text: "Iron" },
      { key: "B", text: "Iodine" },
      { key: "C", text: "Calcium" },
      { key: "D", text: "Sodium" },
    ],
    correctAnswer: "B",
    explanation:
      "Iodine is an essential component of thyroid hormones.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-058",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "neural-control",
    chapterName: "Neural Control and Coordination",
    questionText:
      "The part of the brain mainly responsible for maintaining posture and balance is:",
    options: [
      { key: "A", text: "Medulla" },
      { key: "B", text: "Cerebellum" },
      { key: "C", text: "Hypothalamus" },
      { key: "D", text: "Cerebrum" },
    ],
    correctAnswer: "B",
    explanation:
      "The cerebellum coordinates muscular activity and helps maintain posture and balance.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-059",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-reproduction",
    chapterName: "Human Reproduction",
    questionText:
      "The hormone secreted by the posterior pituitary that promotes uterine contraction is:",
    options: [
      { key: "A", text: "FSH" },
      { key: "B", text: "Oxytocin" },
      { key: "C", text: "Estrogen" },
      { key: "D", text: "Progesterone" },
    ],
    correctAnswer: "B",
    explanation:
      "Oxytocin released from the posterior pituitary promotes uterine contractions during labour.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-060",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "genetics",
    chapterName: "Principles of Inheritance and Variation",
    questionText:
      "A homozygous dominant genotype contains:",
    options: [
      { key: "A", text: "Two identical dominant alleles" },
      { key: "B", text: "Two different alleles" },
      { key: "C", text: "Only one allele" },
      { key: "D", text: "Two recessive alleles" },
    ],
    correctAnswer: "A",
    explanation:
      "Homozygous dominant means both alleles are the dominant form.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-061",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "molecular-basis",
    chapterName: "Molecular Basis of Inheritance",
    questionText:
      "Which enzyme joins Okazaki fragments during DNA replication?",
    options: [
      { key: "A", text: "Helicase" },
      { key: "B", text: "Primase" },
      { key: "C", text: "DNA ligase" },
      { key: "D", text: "RNA polymerase" },
    ],
    correctAnswer: "C",
    explanation:
      "DNA ligase joins adjacent DNA fragments by forming phosphodiester bonds.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-062",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "evolution",
    chapterName: "Evolution",
    questionText:
      "Homologous organs are evidence of:",
    options: [
      { key: "A", text: "Divergent evolution" },
      { key: "B", text: "Convergent evolution" },
      { key: "C", text: "Artificial selection only" },
      { key: "D", text: "Genetic engineering" },
    ],
    correctAnswer: "A",
    explanation:
      "Homologous organs have a common origin but may perform different functions, supporting divergent evolution.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-063",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-health",
    chapterName: "Human Health and Disease",
    questionText:
      "Vaccination primarily provides:",
    options: [
      { key: "A", text: "Passive immunity only" },
      { key: "B", text: "Active acquired immunity" },
      { key: "C", text: "No immune memory" },
      { key: "D", text: "Only physical protection" },
    ],
    correctAnswer: "B",
    explanation:
      "Vaccines stimulate the immune system to generate an active immune response and memory.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-064",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biotechnology",
    chapterName: "Biotechnology: Principles and Processes",
    questionText:
      "The vector commonly used to introduce recombinant DNA into bacteria is:",
    options: [
      { key: "A", text: "Plasmid" },
      { key: "B", text: "Ribosome" },
      { key: "C", text: "Lysosome" },
      { key: "D", text: "Centrosome" },
    ],
    correctAnswer: "A",
    explanation:
      "Plasmids are commonly used as vectors for transferring recombinant DNA into bacteria.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-065",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "ecology",
    chapterName: "Ecosystem",
    questionText:
      "The pyramid of energy in an ecosystem is always:",
    options: [
      { key: "A", text: "Inverted" },
      { key: "B", text: "Upright" },
      { key: "C", text: "Spindle-shaped" },
      { key: "D", text: "Random" },
    ],
    correctAnswer: "B",
    explanation:
      "Energy decreases at successive trophic levels, so the energy pyramid is always upright.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-066",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-transport",
    chapterName: "Transport in Plants",
    questionText:
      "Transpiration pull is closely associated with:",
    options: [
      { key: "A", text: "Cohesion and adhesion of water" },
      { key: "B", text: "Protein digestion" },
      { key: "C", text: "ATP synthesis in ribosomes" },
      { key: "D", text: "DNA replication" },
    ],
    correctAnswer: "A",
    explanation:
      "Cohesion between water molecules and adhesion to xylem walls help maintain the transpiration stream.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-067",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "animal-kingdom",
    chapterName: "Animal Kingdom",
    questionText:
      "Radial symmetry is characteristic of adult members of:",
    options: [
      { key: "A", text: "Annelida" },
      { key: "B", text: "Arthropoda" },
      { key: "C", text: "Echinodermata" },
      { key: "D", text: "Chordata" },
    ],
    correctAnswer: "C",
    explanation:
      "Adult echinoderms generally show radial symmetry, while larvae are bilaterally symmetrical.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-068",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-growth",
    chapterName: "Plant Growth and Development",
    questionText:
      "Ethylene is especially associated with:",
    options: [
      { key: "A", text: "Fruit ripening" },
      { key: "B", text: "Blood pressure regulation" },
      { key: "C", text: "Bone mineralization" },
      { key: "D", text: "Muscle contraction" },
    ],
    correctAnswer: "A",
    explanation:
      "Ethylene is a gaseous plant hormone strongly associated with fruit ripening.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-069",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-reproduction",
    chapterName: "Sexual Reproduction in Flowering Plants",
    questionText:
      "Pollen grains are produced in the:",
    options: [
      { key: "A", text: "Ovule" },
      { key: "B", text: "Anther" },
      { key: "C", text: "Stigma" },
      { key: "D", text: "Ovary wall" },
    ],
    correctAnswer: "B",
    explanation:
      "Microspore mother cells in the anther give rise to pollen grains.",
    difficulty: "Medium",
  },

  {
    questionId: "neet-bio-070",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-health",
    chapterName: "Human Health and Disease",
    questionText:
      "Antibodies are produced by differentiated:",
    options: [
      { key: "A", text: "RBCs" },
      { key: "B", text: "B-lymphocytes" },
      { key: "C", text: "Platelets" },
      { key: "D", text: "Neutrophils only" },
    ],
    correctAnswer: "B",
    explanation:
      "B-lymphocytes differentiate into plasma cells that produce antibodies.",
    difficulty: "Medium",
  },

  /* ======================================================
     BIOLOGY — HARD
     071 - 090
  ====================================================== */

  {
    questionId: "neet-bio-071",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-cycle",
    chapterName: "Cell Cycle and Cell Division",
    questionText:
      "During metaphase of mitosis, chromosomes are arranged at the:",
    options: [
      { key: "A", text: "Pole" },
      { key: "B", text: "Equatorial plate" },
      { key: "C", text: "Nuclear membrane" },
      { key: "D", text: "Centrosome only" },
    ],
    correctAnswer: "B",
    explanation:
      "In metaphase, chromosomes align at the equatorial plate before sister chromatids separate.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-072",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "molecular-basis",
    chapterName: "Molecular Basis of Inheritance",
    questionText:
      "The template strand of DNA is read by RNA polymerase in the direction:",
    options: [
      { key: "A", text: "5' to 3'" },
      { key: "B", text: "3' to 5'" },
      { key: "C", text: "Both directions simultaneously" },
      { key: "D", text: "Without polarity" },
    ],
    correctAnswer: "B",
    explanation:
      "RNA polymerase reads the template strand in the 3' to 5' direction while synthesizing RNA 5' to 3'.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-073",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "photosynthesis",
    chapterName: "Photosynthesis in Higher Plants",
    questionText:
      "The oxygen evolved during photosynthesis is derived primarily from:",
    options: [
      { key: "A", text: "Carbon dioxide" },
      { key: "B", text: "Glucose" },
      { key: "C", text: "Water" },
      { key: "D", text: "Chlorophyll" },
    ],
    correctAnswer: "C",
    explanation:
      "Photolysis of water during the light reaction releases oxygen.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-074",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "respiration",
    chapterName: "Respiration in Plants",
    questionText:
      "The final electron acceptor in the mitochondrial electron transport chain during aerobic respiration is:",
    options: [
      { key: "A", text: "Carbon dioxide" },
      { key: "B", text: "Oxygen" },
      { key: "C", text: "Pyruvate" },
      { key: "D", text: "NADH" },
    ],
    correctAnswer: "B",
    explanation:
      "Oxygen accepts electrons and protons at the end of the mitochondrial electron transport chain, forming water.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-075",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "excretory",
    chapterName: "Excretory Products and Their Elimination",
    questionText:
      "Which nephron segment is highly permeable to water and contributes to concentration of filtrate?",
    options: [
      { key: "A", text: "Descending limb of loop of Henle" },
      { key: "B", text: "Ascending limb of loop of Henle" },
      { key: "C", text: "Early distal tubule only" },
      { key: "D", text: "Glomerulus" },
    ],
    correctAnswer: "A",
    explanation:
      "The descending limb is highly permeable to water, while the ascending limb is relatively impermeable to water.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-076",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "neural-control",
    chapterName: "Neural Control and Coordination",
    questionText:
      "Saltatory conduction in myelinated neurons occurs because impulses jump between:",
    options: [
      { key: "A", text: "Synaptic terminals" },
      { key: "B", text: "Nodes of Ranvier" },
      { key: "C", text: "Dendrites" },
      { key: "D", text: "Cell bodies" },
    ],
    correctAnswer: "B",
    explanation:
      "Action potentials appear to jump from one node of Ranvier to the next in myelinated axons.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-077",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "endocrine",
    chapterName: "Chemical Coordination and Integration",
    questionText:
      "Which hormone increases blood calcium level?",
    options: [
      { key: "A", text: "Calcitonin" },
      { key: "B", text: "Parathyroid hormone" },
      { key: "C", text: "Insulin" },
      { key: "D", text: "ADH" },
    ],
    correctAnswer: "B",
    explanation:
      "Parathyroid hormone raises blood Ca2+ concentration by acting on bone, kidney and indirectly intestine.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-078",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "genetics",
    chapterName: "Principles of Inheritance and Variation",
    questionText:
      "In incomplete dominance, the F1 phenotype is:",
    options: [
      { key: "A", text: "Always identical to dominant parent" },
      { key: "B", text: "Intermediate between the parental phenotypes" },
      { key: "C", text: "Always recessive" },
      { key: "D", text: "Absent" },
    ],
    correctAnswer: "B",
    explanation:
      "In incomplete dominance, neither allele is completely dominant, producing an intermediate F1 phenotype.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-079",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "molecular-basis",
    chapterName: "Molecular Basis of Inheritance",
    questionText:
      "The degeneracy of the genetic code means that:",
    options: [
      { key: "A", text: "One codon codes for many amino acids" },
      { key: "B", text: "More than one codon can specify the same amino acid" },
      { key: "C", text: "Codons are absent" },
      { key: "D", text: "Every organism has a different genetic code" },
    ],
    correctAnswer: "B",
    explanation:
      "The genetic code is degenerate because several codons can specify the same amino acid.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-080",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "evolution",
    chapterName: "Evolution",
    questionText:
      "Genetic drift is most pronounced in:",
    options: [
      { key: "A", text: "Very large populations" },
      { key: "B", text: "Small populations" },
      { key: "C", text: "Populations without genes" },
      { key: "D", text: "Only plant populations" },
    ],
    correctAnswer: "B",
    explanation:
      "Random changes in allele frequency due to chance are stronger in small populations.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-081",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-reproduction",
    chapterName: "Human Reproduction",
    questionText:
      "The acrosome of a sperm contains enzymes important for:",
    options: [
      { key: "A", text: "ATP production only" },
      { key: "B", text: "Penetration of the ovum coverings" },
      { key: "C", text: "DNA replication" },
      { key: "D", text: "Blood clotting" },
    ],
    correctAnswer: "B",
    explanation:
      "Acrosomal enzymes help the sperm penetrate the egg coverings during fertilization.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-082",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "immunity",
    chapterName: "Human Health and Disease",
    questionText:
      "The secondary immune response is stronger mainly because of:",
    options: [
      { key: "A", text: "Absence of lymphocytes" },
      { key: "B", text: "Immunological memory" },
      { key: "C", text: "Loss of antibodies" },
      { key: "D", text: "Reduced antigen recognition" },
    ],
    correctAnswer: "B",
    explanation:
      "Memory cells generated during the primary response allow a faster and stronger secondary response.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-083",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "ecology",
    chapterName: "Organisms and Populations",
    questionText:
      "A population growing under carrying-capacity conditions generally follows a:",
    options: [
      { key: "A", text: "J-shaped growth curve" },
      { key: "B", text: "S-shaped growth curve" },
      { key: "C", text: "Straight line only" },
      { key: "D", text: "Random curve" },
    ],
    correctAnswer: "B",
    explanation:
      "Logistic growth produces an S-shaped curve as population size approaches carrying capacity.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-084",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-physiology",
    chapterName: "Plant Physiology",
    questionText:
      "In C4 plants, the initial fixation of carbon dioxide occurs in:",
    options: [
      { key: "A", text: "Bundle sheath cells only" },
      { key: "B", text: "Mesophyll cells" },
      { key: "C", text: "Guard cells only" },
      { key: "D", text: "Root cells" },
    ],
    correctAnswer: "B",
    explanation:
      "PEP carboxylase initially fixes CO2 in mesophyll cells of C4 plants.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-085",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "biotechnology",
    chapterName: "Biotechnology: Principles and Processes",
    questionText:
      "A selectable marker in a cloning vector is mainly used to:",
    options: [
      { key: "A", text: "Increase chromosome number" },
      { key: "B", text: "Identify transformed host cells" },
      { key: "C", text: "Digest proteins" },
      { key: "D", text: "Stop transcription in all cells" },
    ],
    correctAnswer: "B",
    explanation:
      "Selectable markers help identify host cells that have successfully received the vector.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-086",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-reproduction",
    chapterName: "Sexual Reproduction in Flowering Plants",
    questionText:
      "Double fertilization in angiosperms results in the formation of:",
    options: [
      { key: "A", text: "Only zygote" },
      { key: "B", text: "Zygote and primary endosperm nucleus" },
      { key: "C", text: "Two zygotes" },
      { key: "D", text: "Only endosperm" },
    ],
    correctAnswer: "B",
    explanation:
      "Syngamy forms the zygote while triple fusion forms the primary endosperm nucleus.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-087",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "plant-transport",
    chapterName: "Transport in Plants",
    questionText:
      "The cohesion-tension theory explains ascent of:",
    options: [
      { key: "A", text: "Phloem sap only" },
      { key: "B", text: "Xylem water" },
      { key: "C", text: "Proteins in sieve tubes" },
      { key: "D", text: "Starch in roots" },
    ],
    correctAnswer: "B",
    explanation:
      "The cohesion-tension theory explains upward movement of water through xylem during transpiration.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-088",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "cell-cycle",
    chapterName: "Cell Cycle and Cell Division",
    questionText:
      "During meiosis I, homologous chromosomes separate during:",
    options: [
      { key: "A", text: "Anaphase I" },
      { key: "B", text: "Anaphase II" },
      { key: "C", text: "Metaphase II" },
      { key: "D", text: "Prophase II" },
    ],
    correctAnswer: "A",
    explanation:
      "Homologous chromosomes separate during anaphase I, reducing chromosome number.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-089",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "human-physiology",
    chapterName: "Human Physiology",
    questionText:
      "The Bohr effect refers to the influence of increased CO2 and H+ concentration on haemoglobin's:",
    options: [
      { key: "A", text: "Increased affinity for oxygen" },
      { key: "B", text: "Reduced affinity for oxygen" },
      { key: "C", text: "Complete inability to bind oxygen" },
      { key: "D", text: "Production of oxygen" },
    ],
    correctAnswer: "B",
    explanation:
      "Higher CO2 and H+ promote oxygen unloading by reducing haemoglobin's affinity for oxygen.",
    difficulty: "Hard",
  },

  {
    questionId: "neet-bio-090",
    exam: "neet",
    testId: "neet-question-bank",
    subjectId: "biology",
    subjectName: "Biology",
    chapterId: "ecology",
    chapterName: "Ecosystem",
    questionText:
      "Approximately what fraction of energy is transferred from one trophic level to the next?",
    options: [
      { key: "A", text: "1%" },
      { key: "B", text: "10%" },
      { key: "C", text: "50%" },
      { key: "D", text: "90%" },
    ],
    correctAnswer: "B",
    explanation:
      "Lindeman's ten-percent law states that, on average, about 10% of energy is transferred to the next trophic level.",
    difficulty: "Hard",
  },
];

async function seedBiology() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "ils-exam-prep",
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("MongoDB connected");

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

    const easy = questions.filter(
      (q) => q.difficulty === "Easy"
    ).length;

    const medium = questions.filter(
      (q) => q.difficulty === "Medium"
    ).length;

    const hard = questions.filter(
      (q) => q.difficulty === "Hard"
    ).length;

    console.log("");
    console.log(
      "========================================"
    );
    console.log(
      "NEET BIOLOGY QUESTION BANK UPDATED"
    );
    console.log(
      "========================================"
    );
    console.log(
      `Added/updated: ${questions.length}`
    );
    console.log(`Easy: ${easy}`);
    console.log(`Medium: ${medium}`);
    console.log(`Hard: ${hard}`);
    console.log(
      "========================================"
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(
      "Biology seed failed:"
    );
    console.error(error);

    await mongoose.disconnect();
    process.exit(1);
  }
}

seedBiology();