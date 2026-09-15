import React, { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const C = {
  green: "#007050",
  navy: "#082F3C",
  mint: "#F4FBF7",
  softMint: "#EAF5F1",
  white: "#FFFFFF",
  muted: "#68777B",
  border: "#E4EFEB",
  red: "#D94B55",
  blue: "#3679C9",
};

const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚛",
    color: C.blue,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "⚗",
    color: "#7652C8",
  },
  {
    id: "biology",
    name: "Biology",
    icon: "✦",
    color: C.green,
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "Σ",
    color: "#7652C8",
  },
  {
    id: "english",
    name: "English",
    icon: "A",
    color: "#C78A13",
  },
  {
    id: "general-test",
    name: "General Test",
    icon: "▦",
    color: "#3867C7",
  },
];

function Icon({ name, size = 20, stroke = C.navy }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const paths = {
    back: (
      <>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    check: (
      <path d="M5 12.5l4.2 4.2L19 7" />
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle
          cx="12"
          cy="12"
          r="1.5"
          fill={stroke}
        />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Practice({
  profile,
  onBack,
  onOpenSection,
}) {
  const [stage, setStage] = useState("subject");

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [mode, setMode] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [answered, setAnswered] =
    useState(false);

  const [answers, setAnswers] = useState([]);

  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [questionError, setQuestionError] =
    useState("");

  const [saving, setSaving] = useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const currentQuestion =
    questions[currentIndex];

  const selectedSubjectData = subjects.find(
    (item) => item.id === selectedSubject
  );

  const correctCount = answers.filter(
    (item) => item.correct === true
  ).length;

  const incorrectCount = answers.filter(
    (item) => item.correct === false
  ).length;

  const skippedCount = answers.filter(
    (item) => item.selected === null
  ).length;

  const score =
    correctCount * 4 -
    incorrectCount;

  const chooseSubject = (subjectId) => {
    setSelectedSubject(subjectId);
    setMode(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswers([]);
    setQuestionError("");
    setSaveMessage("");
    setStage("mode");
  };

  const startPractice = async () => {
    if (!selectedSubject || !mode) {
      return;
    }

    try {
      setLoadingQuestions(true);
      setQuestionError("");
      setQuestions([]);
      setAnswers([]);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnswered(false);
      setSaveMessage("");

      const exam =
        profile?.exams?.[0] || "neet";

      const url =
        `${API_URL}/api/practice/questions` +
        `?exam=${encodeURIComponent(
          exam.toLowerCase()
        )}` +
        `&subject=${encodeURIComponent(
          selectedSubject
        )}` +
        `&limit=10`;

      const response = await fetch(url);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load practice questions."
        );
      }

      if (
        !Array.isArray(data.questions) ||
        data.questions.length === 0
      ) {
        throw new Error(
          "No practice questions are available for this subject yet."
        );
      }

      const normalizedQuestions =
        data.questions.map((question) => ({
          id: question.id,
          question: question.question,
          options: Array.isArray(
            question.options
          )
            ? question.options
            : [],
          explanation:
            question.explanation || "",
          exam:
            question.exam || exam,
          testId:
            question.testId ||
            `practice-${selectedSubject}`,
          subjectId:
            question.subjectId ||
            selectedSubject,
          subjectName:
            question.subjectName ||
            selectedSubjectData?.name ||
            selectedSubject,
          chapterId:
            question.chapterId || "",
          chapterName:
            question.chapterName || "",
          difficulty:
            question.difficulty ||
            "Medium",
          marks:
            Number(question.marks) || 4,
          negativeMarks:
            Number(question.negativeMarks) || 1,
        }));

      setQuestions(normalizedQuestions);
      setStage("questions");
    } catch (error) {
      console.error(
        "Practice questions error:",
        error
      );

      setQuestionError(
        error.message ||
          "Unable to load practice questions."
      );
    } finally {
      setLoadingQuestions(false);
    }
  };

  const checkAnswer = () => {
    if (
      selectedAnswer === null ||
      answered ||
      !currentQuestion
    ) {
      return;
    }

    /*
     * The practice questions API does not expose the
     * correct answer to the browser.
     *
     * Answer verification will be handled by the
     * dedicated backend answer-check endpoint.
     *
     * For now we move the selected answer into state
     * and wait for the backend verification step.
     */

    setAnswered(true);

    setAnswers((current) => [
      ...current,
      {
        questionId:
          currentQuestion.id,
        selected: selectedAnswer,
        correct: null,
        answer: null,
      },
    ]);
  };

  const nextQuestion = () => {
    if (!answered) {
      return;
    }

    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (current) => current + 1
      );

      setSelectedAnswer(null);
      setAnswered(false);

      return;
    }

    setStage("result");
  };

  const saveResult = async () => {
    if (saving) {
      return;
    }

    const mobile =
      profile?.mobile || "";

    if (!mobile) {
      setSaveMessage(
        "Student mobile number is missing."
      );
      return;
    }

    const totalQuestions =
      questions.length;

    const attempted =
      answers.filter(
        (item) =>
          item.selected !== null
      ).length;

    const finalCorrect =
      answers.filter(
        (item) =>
          item.correct === true
      ).length;

    const finalIncorrect =
      answers.filter(
        (item) =>
          item.correct === false
      ).length;

    const finalSkipped =
      answers.filter(
        (item) =>
          item.selected === null
      ).length;

    const totalMarks =
      totalQuestions * 4;

    const finalScore =
      finalCorrect * 4 -
      finalIncorrect;

    const accuracy =
      attempted > 0
        ? Number(
            (
              (finalCorrect /
                attempted) *
              100
            ).toFixed(2)
          )
        : 0;

    try {
      setSaving(true);
      setSaveMessage("");

      const response = await fetch(
        `${API_URL}/api/test-results`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            mobile,

            testId:
              `practice-${selectedSubject}-${Date.now()}`,

            testTitle:
              `${selectedSubjectData?.name || selectedSubject} Practice`,

            exam:
              profile?.exams?.[0] ||
              "neet",

            totalQuestions,

            attempted,

            correct:
              finalCorrect,

            incorrect:
              finalIncorrect,

            skipped:
              finalSkipped,

            score:
              finalScore,

            totalMarks,

            accuracy,

            estimatedRank:
              null,

            answers:
              answers.map(
                (item) => ({
                  questionId:
                    item.questionId,
                  selected:
                    item.selected,
                  correctAnswer:
                    item.answer,
                  isCorrect:
                    item.correct,
                })
              ),

            subjectResults: [
              {
                subject:
                  selectedSubject,

                totalQuestions,

                attempted,

                correct:
                  finalCorrect,

                incorrect:
                  finalIncorrect,

                skipped:
                  finalSkipped,

                score:
                  finalScore,
              },
            ],

            chapterResults:
              questions.map(
                (question) => ({
                  chapterId:
                    question.chapterId,

                  chapterName:
                    question.chapterName,

                  subjectId:
                    question.subjectId,

                  subjectName:
                    question.subjectName,
                })
              ),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to save result."
        );
      }

      setSaveMessage(
        "Practice result saved successfully."
      );
    } catch (error) {
      console.error(
        "Practice result save error:",
        error
      );

      setSaveMessage(
        error.message ||
          "Unable to save result."
      );
    } finally {
      setSaving(false);
    }
  };

  const resetPractice = () => {
    setStage("subject");
    setSelectedSubject(null);
    setMode(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswers([]);
    setLoadingQuestions(false);
    setQuestionError("");
    setSaving(false);
    setSaveMessage("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <button
              type="button"
              style={styles.backButton}
              onClick={onBack}
            >
              <Icon
                name="back"
                size={20}
              />
            </button>

            <div style={styles.brandWrap}>
              <div style={styles.brand}>
                ILS RANKER
              </div>

              <div style={styles.tagline}>
                KNOW YOUR POTENTIAL
              </div>
            </div>

            <div style={styles.headerLabel}>
              Practice
            </div>
          </div>
        </header>

        <main style={styles.container}>
          {stage === "subject" && (
            <>
              <div style={styles.kicker}>
                PRACTICE
              </div>

              <h1 style={styles.title}>
                Practice Weak Areas
              </h1>

              <p style={styles.subtitle}>
                Choose a subject and start
                solving focused practice
                questions.
              </p>

              <section
                style={styles.infoCard}
              >
                <div
                  style={styles.infoIcon}
                >
                  <Icon
                    name="target"
                    size={20}
                    stroke={C.green}
                  />
                </div>

                <div>
                  <div
                    style={styles.infoTitle}
                  >
                    Smart Practice
                  </div>

                  <div
                    style={styles.infoText}
                  >
                    Questions are loaded
                    directly from your
                    practice question database.
                  </div>
                </div>
              </section>

              <div
                style={styles.sectionTitle}
              >
                Select Subject
              </div>

              <div
                style={styles.subjectGrid}
              >
                {subjects.map(
                  (subject) => (
                    <button
                      type="button"
                      key={
                        subject.id
                      }
                      style={
                        styles.subjectCard
                      }
                      onClick={() =>
                        chooseSubject(
                          subject.id
                        )
                      }
                    >
                      <div
                        style={{
                          ...styles.subjectIcon,
                          color:
                            subject.color,
                        }}
                      >
                        {subject.icon}
                      </div>

                      <div
                        style={
                          styles.subjectName
                        }
                      >
                        {subject.name}
                      </div>

                      <div
                        style={
                          styles.subjectArrow
                        }
                      >
                        →
                      </div>
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {stage === "mode" && (
            <>
              <div style={styles.kicker}>
                PRACTICE MODE
              </div>

              <h1 style={styles.title}>
                Choose Practice Mode
              </h1>

              <p style={styles.subtitle}>
                Select how you want to
                practice{" "}
                <strong>
                  {
                    selectedSubjectData?.name
                  }
                </strong>
                .
              </p>

              <div style={styles.modeList}>
                <button
                  type="button"
                  style={{
                    ...styles.modeCard,
                    ...(mode === "weak"
                      ? styles.modeCardActive
                      : {}),
                  }}
                  onClick={() =>
                    setMode("weak")
                  }
                >
                  <div
                    style={
                      styles.modeNumber
                    }
                  >
                    01
                  </div>

                  <div
                    style={
                      styles.modeBody
                    }
                  >
                    <div
                      style={
                        styles.modeTitle
                      }
                    >
                      Weak Areas
                    </div>

                    <div
                      style={
                        styles.modeText
                      }
                    >
                      Practice questions
                      focused on
                      improvement areas.
                    </div>
                  </div>

                  <span
                    style={
                      styles.modeArrow
                    }
                  >
                    →
                  </span>
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.modeCard,
                    ...(mode === "mixed"
                      ? styles.modeCardActive
                      : {}),
                  }}
                  onClick={() =>
                    setMode("mixed")
                  }
                >
                  <div
                    style={
                      styles.modeNumber
                    }
                  >
                    02
                  </div>

                  <div
                    style={
                      styles.modeBody
                    }
                  >
                    <div
                      style={
                        styles.modeTitle
                      }
                    >
                      Mixed Practice
                    </div>

                    <div
                      style={
                        styles.modeText
                      }
                    >
                      Mix different
                      questions for
                      balanced preparation.
                    </div>
                  </div>

                  <span
                    style={
                      styles.modeArrow
                    }
                  >
                    →
                  </span>
                </button>
              </div>

              {questionError && (
                <div
                  style={
                    styles.errorCard
                  }
                >
                  {questionError}
                </div>
              )}

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  opacity:
                    !mode ||
                    loadingQuestions
                      ? 0.55
                      : 1,
                }}
                disabled={
                  !mode ||
                  loadingQuestions
                }
                onClick={
                  startPractice
                }
              >
                {loadingQuestions
                  ? "Loading Questions..."
                  : "Start Practice"}

                {!loadingQuestions && (
                  <Icon
                    name="arrow"
                    size={17}
                    stroke="#FFFFFF"
                  />
                )}
              </button>

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={() =>
                  setStage("subject")
                }
              >
                ← Change Subject
              </button>
            </>
          )}

          {stage === "questions" &&
            currentQuestion && (
              <>
                <div
                  style={
                    styles.progressTop
                  }
                >
                  <div>
                    <div
                      style={
                        styles.kicker
                      }
                    >
                      {(
                        currentQuestion.subjectName ||
                        selectedSubjectData?.name ||
                        ""
                      ).toUpperCase()}
                    </div>

                    <div
                      style={
                        styles.questionCounter
                      }
                    >
                      Question{" "}
                      {currentIndex + 1} of{" "}
                      {questions.length}
                    </div>
                  </div>

                  <div
                    style={
                      styles.scorePill
                    }
                  >
                    {correctCount} Correct
                  </div>
                </div>

                <div
                  style={
                    styles.questionProgressTrack
                  }
                >
                  <div
                    style={{
                      ...styles.questionProgressFill,
                      width: `${
                        ((currentIndex + 1) /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <section
                  style={
                    styles.questionCard
                  }
                >
                  <div
                    style={
                      styles.questionNumber
                    }
                  >
                    Q{currentIndex + 1}
                  </div>

                  <div
                    style={
                      styles.chapterLabel
                    }
                  >
                    {currentQuestion.chapterName ||
                      "Practice Question"}
                  </div>

                  <h1
                    style={
                      styles.questionText
                    }
                  >
                    {
                      currentQuestion.question
                    }
                  </h1>

                  <div
                    style={
                      styles.optionsList
                    }
                  >
                    {currentQuestion.options.map(
                      (option, index) => {
                        const key =
                          option.key ||
                          String.fromCharCode(
                            65 + index
                          );

                        const text =
                          option.text ||
                          option;

                        const isSelected =
                          selectedAnswer ===
                          index;

                        return (
                          <button
                            type="button"
                            key={key}
                            disabled={
                              answered
                            }
                            onClick={() =>
                              setSelectedAnswer(
                                index
                              )
                            }
                            style={{
                              ...styles.option,
                              ...(isSelected
                                ? styles.optionSelected
                                : {}),
                            }}
                          >
                            <span
                              style={
                                styles.optionLetter
                              }
                            >
                              {key}
                            </span>

                            <span
                              style={
                                styles.optionText
                              }
                            >
                              {text}
                            </span>
                          </button>
                        );
                      }
                    )}
                  </div>

                  {answered && (
                    <div
                      style={
                        styles.pendingCard
                      }
                    >
                      <div
                        style={
                          styles.pendingTitle
                        }
                      >
                        Answer Submitted
                      </div>

                      <div
                        style={
                          styles.pendingText
                        }
                      >
                        Your answer has been
                        recorded. Backend answer
                        verification will be
                        connected next.
                      </div>
                    </div>
                  )}

                  {!answered ? (
                    <button
                      type="button"
                      style={{
                        ...styles.primaryButton,
                        opacity:
                          selectedAnswer ===
                          null
                            ? 0.55
                            : 1,
                      }}
                      disabled={
                        selectedAnswer ===
                        null
                      }
                      onClick={
                        checkAnswer
                      }
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={
                        styles.primaryButton
                      }
                      onClick={
                        nextQuestion
                      }
                    >
                      {currentIndex <
                      questions.length - 1
                        ? "Next Question"
                        : "Finish Practice"}

                      <Icon
                        name="arrow"
                        size={17}
                        stroke="#FFFFFF"
                      />
                    </button>
                  )}
                </section>
              </>
            )}

          {stage === "result" && (
            <>
              <div style={styles.kicker}>
                PRACTICE COMPLETE
              </div>

              <h1 style={styles.title}>
                Practice Result
              </h1>

              <p style={styles.subtitle}>
                Your practice session has
                been completed.
              </p>

              <section
                style={styles.resultCard}
              >
                <div
                  style={
                    styles.resultCircle
                  }
                >
                  <div
                    style={
                      styles.resultScore
                    }
                  >
                    {score}
                  </div>

                  <div
                    style={
                      styles.resultOutOf
                    }
                  >
                    /{" "}
                    {questions.length * 4}
                  </div>
                </div>

                <div
                  style={
                    styles.resultStatus
                  }
                >
                  Practice Completed
                </div>

                <div
                  style={
                    styles.resultSubtext
                  }
                >
                  {selectedSubjectData?.name}{" "}
                  •{" "}
                  {questions.length} Questions
                </div>
              </section>

              <div
                style={styles.resultGrid}
              >
                <ResultStat
                  label="Answered"
                  value={
                    answers.filter(
                      (item) =>
                        item.selected !==
                        null
                    ).length
                  }
                  color={C.green}
                />

                <ResultStat
                  label="Skipped"
                  value={skippedCount}
                  color={C.blue}
                />

                <ResultStat
                  label="Correct"
                  value={correctCount}
                  color={C.green}
                />

                <ResultStat
                  label="Attempted"
                  value={
                    questions.length
                  }
                  color={C.navy}
                />
              </div>

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  opacity: saving
                    ? 0.65
                    : 1,
                }}
                disabled={saving}
                onClick={
                  saveResult
                }
              >
                {saving
                  ? "Saving Result..."
                  : "Save Result to Profile"}

                <Icon
                  name="arrow"
                  size={17}
                  stroke="#FFFFFF"
                />
              </button>

              {saveMessage && (
                <div
                  style={{
                    ...styles.saveMessage,
                    color:
                      saveMessage.includes(
                        "successfully"
                      )
                        ? C.green
                        : C.red,
                  }}
                >
                  {saveMessage}
                </div>
              )}

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={
                  resetPractice
                }
              >
                Practice Again
              </button>

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={() =>
                  onOpenSection?.(
                    "analysis"
                  )
                }
              >
                View Analysis

                <Icon
                  name="arrow"
                  size={15}
                  stroke={C.muted}
                />
              </button>
            </>
          )}

          {stage === "questions" &&
            !currentQuestion &&
            !loadingQuestions && (
              <div
                style={styles.errorCard}
              >
                No question available.
              </div>
            )}
        </main>
      </div>
    </div>
  );
}

function ResultStat({
  label,
  value,
  color,
}) {
  return (
    <div style={styles.resultStat}>
      <div
        style={{
          ...styles.resultStatValue,
          color,
        }}
      >
        {value}
      </div>

      <div
        style={styles.resultStatLabel}
      >
        {label}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100dvh",
    background: C.mint,
    color: C.navy,
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box",
  },

  mobileShell: {
    width: "100%",
    maxWidth: 390,
    minHeight: "100dvh",
    background: C.white,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: C.white,
    borderBottom:
      `1px solid ${C.border}`,
    flexShrink: 0,
  },

  headerInner: {
    width: "100%",
    minHeight: 64,
    padding: "0 15px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brandWrap: {
    flex: 1,
    minWidth: 0,
  },

  brand: {
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.8,
    lineHeight: 1,
  },

  tagline: {
    marginTop: 5,
    fontSize: 8,
    color: C.muted,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  headerLabel: {
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
  },

  container: {
    width: "100%",
    maxWidth: 390,
    flex: 1,
    overflowY: "auto",
    padding:
      "20px 15px 105px",
    boxSizing: "border-box",
    WebkitOverflowScrolling:
      "touch",
  },

  kicker: {
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 1,
    color: C.green,
    marginBottom: 6,
  },

  title: {
    margin: 0,
    fontSize: 25,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: -0.6,
  },

  subtitle: {
    margin: "8px 0 0",
    color: C.muted,
    fontSize: 11.5,
    lineHeight: 1.5,
  },

  infoCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    background: C.softMint,
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  infoTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  infoText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.5,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 9,
    fontSize: 15,
    fontWeight: 900,
  },

  subjectGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 9,
  },

  subjectCard: {
    minHeight: 88,
    borderRadius: 16,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },

  subjectIcon: {
    fontSize: 19,
    fontWeight: 900,
  },

  subjectName: {
    fontSize: 10.5,
    fontWeight: 850,
    marginTop: 8,
  },

  subjectArrow: {
    alignSelf: "flex-end",
    color: "#8A9699",
    fontSize: 16,
  },

  modeList: {
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  modeCard: {
    width: "100%",
    minHeight: 90,
    border:
      `1px solid ${C.border}`,
    borderRadius: 16,
    background: C.white,
    padding: 13,
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    textAlign: "left",
    boxSizing: "border-box",
  },

  modeCardActive: {
    borderColor: C.green,
    background: C.mint,
  },

  modeNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: C.softMint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 9,
    fontWeight: 900,
    flexShrink: 0,
  },

  modeBody: {
    flex: 1,
    minWidth: 0,
  },

  modeTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  modeText: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 1.45,
    color: C.muted,
  },

  modeArrow: {
    color: C.green,
    fontSize: 17,
    flexShrink: 0,
  },

  errorCard: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    background: "#FFF1F3",
    border:
      "1px solid #F1D9DC",
    color: C.red,
    fontSize: 9.5,
    lineHeight: 1.45,
    fontWeight: 750,
  },

  primaryButton: {
    marginTop: 15,
    width: "100%",
    minHeight: 44,
    border: "none",
    borderRadius: 12,
    background: C.green,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 11.5,
    fontWeight: 900,
    cursor: "pointer",
    boxSizing: "border-box",
  },

  secondaryButton: {
    marginTop: 10,
    width: "100%",
    minHeight: 43,
    border:
      `1px solid ${C.border}`,
    borderRadius: 12,
    background: C.white,
    color: C.muted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontSize: 10.5,
    fontWeight: 850,
    cursor: "pointer",
    boxSizing: "border-box",
  },

  progressTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  questionCounter: {
    fontSize: 14,
    fontWeight: 900,
  },

  scorePill: {
    padding: "6px 8px",
    borderRadius: 8,
    background: C.mint,
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  questionProgressTrack: {
    marginTop: 10,
    width: "100%",
    height: 5,
    borderRadius: 30,
    background: C.softMint,
    overflow: "hidden",
  },

  questionProgressFill: {
    height: "100%",
    borderRadius: 30,
    background: C.green,
    transition:
      "width 180ms ease",
  },

  questionCard: {
    marginTop: 15,
    borderRadius: 18,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    padding: 15,
    boxSizing: "border-box",
  },

  questionNumber: {
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  chapterLabel: {
    marginTop: 5,
    color: C.muted,
    fontSize: 8,
    fontWeight: 750,
  },

  questionText: {
    margin: "8px 0 0",
    fontSize: 18,
    lineHeight: 1.35,
    fontWeight: 850,
    color: C.navy,
  },

  optionsList: {
    marginTop: 17,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  option: {
    width: "100%",
    minHeight: 47,
    border:
      `1px solid ${C.border}`,
    borderRadius: 12,
    background: C.white,
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "8px 10px",
    boxSizing: "border-box",
    cursor: "pointer",
    textAlign: "left",
  },

  optionSelected: {
    borderColor: C.green,
    background: C.mint,
  },

  optionLetter: {
    width: 27,
    height: 27,
    borderRadius: 8,
    background: "#F6F9F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.navy,
    fontSize: 9,
    fontWeight: 900,
    flexShrink: 0,
  },

  optionText: {
    flex: 1,
    minWidth: 0,
    fontSize: 10.5,
    fontWeight: 750,
    color: C.navy,
  },

  pendingCard: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    background: C.mint,
    border:
      `1px solid ${C.border}`,
  },

  pendingTitle: {
    fontSize: 9,
    fontWeight: 900,
    color: C.green,
  },

  pendingText: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 1.5,
    color: C.muted,
  },

  resultCard: {
    marginTop: 18,
    borderRadius: 19,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  resultCircle: {
    width: 112,
    height: 112,
    borderRadius: "50%",
    background:
      "conic-gradient(#007050 0 72%, #EAF5F1 72% 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  resultScore: {
    fontSize: 27,
    lineHeight: 1,
    fontWeight: 900,
    color: C.navy,
  },

  resultOutOf: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: 800,
    color: C.muted,
  },

  resultStatus: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: 900,
    color: C.green,
  },

  resultSubtext: {
    marginTop: 4,
    fontSize: 9,
    color: C.muted,
  },

  resultGrid: {
    marginTop: 11,
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 9,
  },

  resultStat: {
    padding: 13,
    borderRadius: 14,
    background: C.white,
    border:
      `1px solid ${C.border}`,
    textAlign: "center",
  },

  resultStatValue: {
    fontSize: 21,
    fontWeight: 900,
  },

  resultStatLabel: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 750,
  },

  saveMessage: {
    marginTop: 9,
    textAlign: "center",
    fontSize: 9.5,
    fontWeight: 800,
  },
};