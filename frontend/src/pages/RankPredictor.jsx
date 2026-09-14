import React, { useMemo, useState } from "react";

const exams = [
  {
    id: "neet",
    name: "NEET UG",
    type: "Medical",
    icon: "⚕",
    bg: "#EAF8F3",
    color: "#007050",
    maxScore: 720,
  },
  {
    id: "jee-main",
    name: "JEE Main",
    type: "Engineering",
    icon: "⚙",
    bg: "#F2EAFE",
    color: "#7B35C8",
    maxScore: 300,
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    type: "IIT Admission",
    icon: "🎓",
    bg: "#FFF1DF",
    color: "#A66A22",
    maxScore: 360,
  },
  {
    id: "cuet",
    name: "CUET UG",
    type: "Central Universities",
    icon: "▣",
    bg: "#EAF4FF",
    color: "#1769D1",
    maxScore: 800,
  },
  {
    id: "neet-pg",
    name: "NEET PG",
    type: "PG Medical",
    icon: "♥",
    bg: "#EAF5FF",
    color: "#1769D1",
    maxScore: 800,
  },
  {
    id: "aiims",
    name: "AIIMS",
    type: "Medical",
    icon: "◎",
    bg: "#EAF8F3",
    color: "#08795D",
    maxScore: 200,
  },
  {
    id: "nursing",
    name: "Nursing",
    type: "Nursing",
    icon: "▣",
    bg: "#F0EAFE",
    color: "#673AB7",
    maxScore: 200,
  },
  {
    id: "paramedical",
    name: "Paramedical",
    type: "Paramedical",
    icon: "♟",
    bg: "#EAF4FF",
    color: "#1976D2",
    maxScore: 200,
  },
];

const questions = [
  {
    question:
      "Which organelle is known as the powerhouse of the cell?",
    options: [
      "Nucleus",
      "Mitochondria",
      "Ribosome",
      "Golgi body",
    ],
    answer: 1,
  },
  {
    question:
      "What is the SI unit of electric current?",
    options: [
      "Volt",
      "Ohm",
      "Ampere",
      "Watt",
    ],
    answer: 2,
  },
  {
    question:
      "The pH of a neutral solution at 25°C is:",
    options: [
      "5",
      "6",
      "7",
      "8",
    ],
    answer: 2,
  },
  {
    question:
      "Which gas is most abundant in Earth's atmosphere?",
    options: [
      "Oxygen",
      "Nitrogen",
      "Carbon dioxide",
      "Hydrogen",
    ],
    answer: 1,
  },
  {
    question:
      "Which blood cells are primarily responsible for immunity?",
    options: [
      "RBCs",
      "Platelets",
      "WBCs",
      "Plasma",
    ],
    answer: 2,
  },
];

const getRank = (examId, percentage) => {
  const p = Math.max(1, Math.min(100, percentage));

  switch (examId) {
    case "neet":
      return Math.max(
        1,
        Math.round(
          1200000 - (p / 100) * 1195000
        )
      );

    case "jee-main":
      return Math.max(
        1,
        Math.round(
          1200000 - (p / 100) * 1195000
        )
      );

    case "jee-advanced":
      return Math.max(
        1,
        Math.round(
          200000 - (p / 100) * 199500
        )
      );

    case "cuet":
      return Math.max(
        1,
        Math.round(
          500000 - (p / 100) * 498000
        )
      );

    case "neet-pg":
      return Math.max(
        1,
        Math.round(
          300000 - (p / 100) * 298500
        )
      );

    case "aiims":
      return Math.max(
        1,
        Math.round(
          150000 - (p / 100) * 149000
        )
      );

    case "nursing":
      return Math.max(
        1,
        Math.round(
          100000 - (p / 100) * 99000
        )
      );

    case "paramedical":
      return Math.max(
        1,
        Math.round(
          100000 - (p / 100) * 99000
        )
      );

    default:
      return 1;
  }
};

const formatRank = (rank) =>
  new Intl.NumberFormat("en-IN").format(rank);

export default function RankPredictor({
  onBack,
  initialExam = "",
}) {
  const [screen, setScreen] = useState(
    initialExam ? "select" : "select"
  );

  const [selectedExam, setSelectedExam] =
    useState(initialExam || "");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [finalScore, setFinalScore] =
    useState(0);

  const [predictedRank, setPredictedRank] =
    useState(null);

  const selectedExamData = useMemo(
    () =>
      exams.find(
        (exam) => exam.id === selectedExam
      ),
    [selectedExam]
  );

  const handleSelectExam = (id) => {
    setSelectedExam(id);
    setAnswers({});
    setCurrentQuestion(0);
    setFinalScore(0);
    setPredictedRank(null);
  };

  const startExam = () => {
    if (!selectedExam) return;

    setCurrentQuestion(0);
    setAnswers({});
    setFinalScore(0);
    setPredictedRank(null);
    setScreen("exam");
  };

  const selectAnswer = (optionIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  };

  const nextQuestion = () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (current) => current + 1
      );
      return;
    }

    submitExam();
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (current) => current - 1
      );
    }
  };

  const submitExam = () => {
    let correct = 0;

    questions.forEach((item, index) => {
      if (answers[index] === item.answer) {
        correct += 1;
      }
    });

    setFinalScore(correct);
    setScreen("submitted");
  };

  const calculateRank = () => {
    const percentage =
      (finalScore / questions.length) * 100;

    const rank = getRank(
      selectedExam,
      percentage
    );

    setPredictedRank(rank);
    setScreen("result");
  };

  const restart = () => {
    setScreen("select");
    setCurrentQuestion(0);
    setAnswers({});
    setFinalScore(0);
    setPredictedRank(null);
  };

  const styles = {
    screen: {
      minHeight: "100vh",
      background: "#F4FBF7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    phone: {
      width: "100%",
      maxWidth: "390px",
      minHeight: "720px",
      maxHeight: "900px",
      background: "#FFFFFF",
      borderRadius: "30px",
      border: "1px solid #DDE7E3",
      boxShadow:
        "0 16px 40px rgba(8, 47, 60, 0.10)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },

    header: {
      height: "62px",
      padding: "0 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#FFFFFF",
      borderBottom: "1px solid #EEF3F1",
      flexShrink: 0,
    },

    headerButton: {
      width: "40px",
      height: "40px",
      border: 0,
      borderRadius: "12px",
      background: "#F4FBF7",
      color: "#082F3C",
      fontSize: "20px",
      cursor: "pointer",
    },

    brand: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      lineHeight: 1,
    },

    brandMain: {
      fontSize: "16px",
      fontWeight: 900,
      color: "#082F3C",
    },

    brandSub: {
      marginTop: "4px",
      fontSize: "8px",
      fontWeight: 800,
      letterSpacing: "1.7px",
      color: "#007050",
    },

    headerIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#EAF5F1",
      color: "#007050",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
    },

    content: {
      flex: 1,
      overflowY: "auto",
      padding: "18px 16px 20px",
      boxSizing: "border-box",
    },

    kicker: {
      display: "block",
      fontSize: "9px",
      fontWeight: 900,
      letterSpacing: "1px",
      color: "#007050",
      marginBottom: "6px",
    },

    title: {
      margin: 0,
      fontSize: "25px",
      lineHeight: 1.15,
      fontWeight: 850,
      color: "#082F3C",
      letterSpacing: "-0.5px",
    },

    description: {
      margin: "8px 0 0",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    intro: {
      marginBottom: "18px",
    },

    examList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginTop: "14px",
    },

    examCard: {
      width: "100%",
      minHeight: "63px",
      padding: "9px 11px",
      borderRadius: "15px",
      border: "1px solid #E2EBE8",
      background: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      cursor: "pointer",
      boxSizing: "border-box",
    },

    selectedCard: {
      border: "1.5px solid #007050",
      background: "#F4FBF7",
    },

    examIcon: {
      width: "42px",
      height: "42px",
      borderRadius: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "19px",
      flexShrink: 0,
    },

    examText: {
      flex: 1,
      paddingLeft: "11px",
    },

    examName: {
      display: "block",
      fontSize: "12px",
      fontWeight: 850,
      color: "#173747",
    },

    examType: {
      display: "block",
      marginTop: "3px",
      fontSize: "9px",
      color: "#7B888C",
    },

    arrow: {
      fontSize: "17px",
      color: "#8A9795",
    },

    startButton: {
      width: "100%",
      height: "51px",
      marginTop: "16px",
      border: 0,
      borderRadius: "14px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 850,
      cursor: selectedExam
        ? "pointer"
        : "not-allowed",
      opacity: selectedExam ? 1 : 0.45,
      boxShadow:
        "0 7px 16px rgba(0, 112, 80, 0.17)",
    },

    examHeader: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "18px",
    },

    examHeaderIcon: {
      width: "43px",
      height: "43px",
      borderRadius: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "19px",
    },

    progressOuter: {
      height: "7px",
      background: "#EAF1EE",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "18px",
    },

    progressInner: {
      height: "100%",
      background: "#007050",
      borderRadius: "10px",
      transition: "width 0.2s ease",
    },

    questionNumber: {
      fontSize: "10px",
      fontWeight: 800,
      color: "#007050",
      marginBottom: "8px",
    },

    question: {
      margin: 0,
      fontSize: "17px",
      lineHeight: 1.4,
      fontWeight: 800,
      color: "#082F3C",
    },

    options: {
      display: "flex",
      flexDirection: "column",
      gap: "9px",
      marginTop: "17px",
    },

    option: {
      width: "100%",
      minHeight: "50px",
      padding: "11px 12px",
      borderRadius: "13px",
      border: "1px solid #E1EAE6",
      background: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textAlign: "left",
      cursor: "pointer",
      boxSizing: "border-box",
      fontSize: "12px",
      fontWeight: 700,
      color: "#173747",
    },

    selectedOption: {
      border: "1.5px solid #007050",
      background: "#EAF8F3",
      color: "#00644A",
    },

    optionNumber: {
      width: "26px",
      height: "26px",
      borderRadius: "9px",
      background: "#F1F6F4",
      color: "#68777B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "10px",
      fontWeight: 900,
    },

    bottomButtons: {
      display: "flex",
      gap: "9px",
      marginTop: "18px",
    },

    secondaryButton: {
      flex: 1,
      height: "47px",
      border: "1px solid #DCE7E2",
      borderRadius: "13px",
      background: "#FFFFFF",
      color: "#53686D",
      fontSize: "12px",
      fontWeight: 800,
      cursor: "pointer",
    },

    nextButton: {
      flex: 1.3,
      height: "47px",
      border: 0,
      borderRadius: "13px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "12px",
      fontWeight: 850,
      cursor: "pointer",
    },

    submittedCard: {
      marginTop: "25px",
      borderRadius: "20px",
      background:
        "linear-gradient(135deg, #EAF8F3 0%, #F7FCF9 100%)",
      border: "1px solid #CFE8DE",
      padding: "23px 18px",
      textAlign: "center",
    },

    submittedIcon: {
      width: "58px",
      height: "58px",
      borderRadius: "17px",
      background: "#FFFFFF",
      margin: "0 auto 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
    },

    submittedTitle: {
      margin: 0,
      fontSize: "21px",
      fontWeight: 900,
      color: "#082F3C",
    },

    submittedText: {
      margin: "7px 0 0",
      fontSize: "11px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    scoreBox: {
      marginTop: "15px",
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      padding: "9px 14px",
      borderRadius: "12px",
      background: "#FFFFFF",
      color: "#007050",
      fontSize: "12px",
      fontWeight: 850,
    },

    predictButton: {
      width: "100%",
      height: "51px",
      marginTop: "16px",
      border: 0,
      borderRadius: "14px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "14px",
      fontWeight: 850,
      cursor: "pointer",
      boxShadow:
        "0 7px 16px rgba(0, 112, 80, 0.17)",
    },

    resultCard: {
      marginTop: "20px",
      borderRadius: "21px",
      background:
        "linear-gradient(135deg, #EAF8F3 0%, #F8FCFA 100%)",
      border: "1px solid #CDE7DC",
      padding: "24px 18px",
      textAlign: "center",
    },

    resultIcon: {
      width: "62px",
      height: "62px",
      borderRadius: "19px",
      background: "#FFFFFF",
      margin: "0 auto 12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "31px",
    },

    resultLabel: {
      display: "block",
      fontSize: "9px",
      fontWeight: 900,
      letterSpacing: "1.1px",
      color: "#007050",
    },

    rank: {
      display: "block",
      marginTop: "7px",
      fontSize: "39px",
      lineHeight: 1,
      fontWeight: 900,
      color: "#082F3C",
      letterSpacing: "-1.2px",
    },

    resultExam: {
      marginTop: "8px",
      fontSize: "11px",
      color: "#68777B",
      fontWeight: 700,
    },

    resultScore: {
      marginTop: "5px",
      fontSize: "10px",
      color: "#78868A",
    },

    tryAgain: {
      width: "100%",
      height: "43px",
      marginTop: "15px",
      border: "1px solid #C4DDD3",
      borderRadius: "12px",
      background: "#FFFFFF",
      color: "#007050",
      fontSize: "11px",
      fontWeight: 850,
      cursor: "pointer",
    },

    info: {
      marginTop: "14px",
      padding: "12px",
      borderRadius: "14px",
      background: "#F4FBF7",
      border: "1px solid #E1ECE8",
      fontSize: "9px",
      lineHeight: 1.45,
      color: "#78868A",
    },
  };

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>
        {/* HEADER */}
        <header style={styles.header}>
          <button
            type="button"
            onClick={onBack}
            style={styles.headerButton}
          >
            ←
          </button>

          <div style={styles.brand}>
            <span style={styles.brandMain}>
              ILS RANKER
            </span>

            <span style={styles.brandSub}>
              KNOW YOUR POTENTIAL
            </span>
          </div>

          <div style={styles.headerIcon}>
            {screen === "exam"
              ? currentQuestion + 1
              : "R"}
          </div>
        </header>

        <main style={styles.content}>
          {/* =========================
              SELECT EXAM
          ========================= */}
          {screen === "select" && (
            <>
              <section style={styles.intro}>
                <span style={styles.kicker}>
                  RANK PREDICTION
                </span>

                <h1 style={styles.title}>
                  Select your exam
                </h1>

                <p style={styles.description}>
                  Choose your exam to start a short
                  practice test and predict your rank.
                </p>
              </section>

              <div style={styles.examList}>
                {exams.map((exam) => {
                  const selected =
                    selectedExam === exam.id;

                  return (
                    <button
                      key={exam.id}
                      type="button"
                      onClick={() =>
                        handleSelectExam(exam.id)
                      }
                      style={{
                        ...styles.examCard,
                        ...(selected
                          ? styles.selectedCard
                          : {}),
                      }}
                    >
                      <div
                        style={{
                          ...styles.examIcon,
                          background: exam.bg,
                          color: exam.color,
                        }}
                      >
                        {exam.icon}
                      </div>

                      <div style={styles.examText}>
                        <span style={styles.examName}>
                          {exam.name}
                        </span>

                        <span style={styles.examType}>
                          {exam.type}
                        </span>
                      </div>

                      <span
                        style={{
                          ...styles.arrow,
                          color: selected
                            ? "#007050"
                            : "#8A9795",
                        }}
                      >
                        {selected ? "✓" : "→"}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={startExam}
                disabled={!selectedExam}
                style={styles.startButton}
              >
                Start Exam
              </button>
            </>
          )}

          {/* =========================
              EXAM
          ========================= */}
          {screen === "exam" && (
            <>
              <div style={styles.examHeader}>
                <div
                  style={{
                    ...styles.examHeaderIcon,
                    background:
                      selectedExamData?.bg ||
                      "#EAF8F3",
                    color:
                      selectedExamData?.color ||
                      "#007050",
                  }}
                >
                  {selectedExamData?.icon}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 850,
                      color: "#082F3C",
                    }}
                  >
                    {selectedExamData?.name}
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      fontSize: "9px",
                      color: "#7B888C",
                    }}
                  >
                    Rank Prediction Test
                  </div>
                </div>
              </div>

              <div style={styles.progressOuter}>
                <div
                  style={{
                    ...styles.progressInner,
                    width: `${
                      ((currentQuestion + 1) /
                        questions.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div style={styles.questionNumber}>
                QUESTION {currentQuestion + 1} OF{" "}
                {questions.length}
              </div>

              <h2 style={styles.question}>
                {questions[currentQuestion].question}
              </h2>

              <div style={styles.options}>
                {questions[
                  currentQuestion
                ].options.map((option, index) => {
                  const selected =
                    answers[currentQuestion] ===
                    index;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        selectAnswer(index)
                      }
                      style={{
                        ...styles.option,
                        ...(selected
                          ? styles.selectedOption
                          : {}),
                      }}
                    >
                      <span
                        style={{
                          ...styles.optionNumber,
                          background: selected
                            ? "#007050"
                            : "#F1F6F4",
                          color: selected
                            ? "#FFFFFF"
                            : "#68777B",
                        }}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      {option}
                    </button>
                  );
                })}
              </div>

              <div style={styles.bottomButtons}>
                <button
                  type="button"
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  style={{
                    ...styles.secondaryButton,
                    opacity:
                      currentQuestion === 0
                        ? 0.45
                        : 1,
                  }}
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextQuestion}
                  style={{
                    ...styles.nextButton,
                    opacity:
                      answers[currentQuestion] !==
                      undefined
                        ? 1
                        : 0.65,
                  }}
                >
                  {currentQuestion ===
                  questions.length - 1
                    ? "Submit Exam"
                    : "Next →"}
                </button>
              </div>
            </>
          )}

          {/* =========================
              SUBMITTED
          ========================= */}
          {screen === "submitted" && (
            <>
              <span style={styles.kicker}>
                EXAM SUBMITTED
              </span>

              <h1 style={styles.title}>
                Test completed
              </h1>

              <p style={styles.description}>
                Your answers have been evaluated. Now
                calculate your estimated rank.
              </p>

              <div style={styles.submittedCard}>
                <div style={styles.submittedIcon}>
                  ✓
                </div>

                <h2 style={styles.submittedTitle}>
                  Ready for prediction
                </h2>

                <p style={styles.submittedText}>
                  You answered{" "}
                  <strong>
                    {finalScore} / {questions.length}
                  </strong>{" "}
                  questions correctly.
                </p>

                <div style={styles.scoreBox}>
                  Score
                  <strong>
                    {Math.round(
                      (finalScore /
                        questions.length) *
                        100
                    )}
                    %
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={calculateRank}
                style={styles.predictButton}
              >
                Predict My Rank
              </button>
            </>
          )}

          {/* =========================
              RESULT
          ========================= */}
          {screen === "result" && (
            <>
              <span style={styles.kicker}>
                RESULT
              </span>

              <h1 style={styles.title}>
                Your Rank Prediction
              </h1>

              <p style={styles.description}>
                Based on your performance in the
                prediction test.
              </p>

              <div style={styles.resultCard}>
                <div style={styles.resultIcon}>
                  🏆
                </div>

                <span style={styles.resultLabel}>
                  YOUR PREDICTED RANK
                </span>

                <strong style={styles.rank}>
                  {formatRank(
                    predictedRank
                  )}
                </strong>

                <div style={styles.resultExam}>
                  {selectedExamData?.name}
                </div>

                <div style={styles.resultScore}>
                  Test Score: {finalScore}/
                  {questions.length} (
                  {Math.round(
                    (finalScore /
                      questions.length) *
                      100
                  )}
                  %)
                </div>

                <button
                  type="button"
                  onClick={restart}
                  style={styles.tryAgain}
                >
                  Try Another Exam →
                </button>
              </div>

              <div style={styles.info}>
                <strong>
                  Demo prediction
                </strong>
                <br />
                This rank is generated using demo
                calculation logic for app functionality.
                It is not an official examination rank.
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}