import React, { useEffect, useMemo, useState } from "react";

/* =========================================================
   ILS RANKER — MOCK TESTS
   Production-style standalone screen
   ========================================================= */

const COLORS = {
  green: "#007050",
  navy: "#082F3C",
  mint: "#F4FBF7",
  softMint: "#EAF5F1",
  white: "#FFFFFF",
  muted: "#68777B",
  border: "#E4EFEB",
  red: "#D94B55",
  yellow: "#C78A13",
};

/* ------------------------- ICONS ------------------------- */

function Icon({ name, size = 22, stroke = COLORS.navy }) {
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
    check: <path d="M5 12.5l4.2 4.2L19 7" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    questions: (
      <>
        <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    play: <path d="M8 5.5v13L18 12 8 5.5Z" />,
    trophy: (
      <>
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
        <path d="M7 6H4v2a4 4 0 0 0 4 4" />
        <path d="M17 6h3v2a4 4 0 0 1-4 4" />
      </>
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
    trend: (
      <>
        <path d="M4 17l6-6 4 4 6-7" />
        <path d="M16 8h4v4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6l7-3Z" />
        <path d="M8.5 12l2.2 2.2 4.8-5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

/* ------------------------- DATA ------------------------- */

const tests = [
  {
    id: "neet-full",
    title: "NEET UG Full Mock Test",
    number: "Mock Test 05",
    description:
      "Complete NEET-style test covering Physics, Chemistry and Biology.",
    questions: 180,
    marks: 720,
    duration: "3 Hours",
    difficulty: "Full Syllabus",
    icon: "target",
    featured: true,
    subjects: [
      {
        name: "Physics",
        questions: 45,
        marks: 180,
        icon: "⚛",
        tone: "#2C77D0",
      },
      {
        name: "Chemistry",
        questions: 45,
        marks: 180,
        icon: "◇",
        tone: "#D94B55",
      },
      {
        name: "Biology",
        questions: 90,
        marks: 360,
        icon: "✦",
        tone: COLORS.green,
      },
    ],
  },
  {
    id: "neet-chapter",
    title: "NEET Chapter Test",
    number: "Chapter Practice",
    description:
      "Focused chapter-wise practice for targeted revision.",
    questions: 50,
    marks: 200,
    duration: "60 Min",
    difficulty: "Chapter Wise",
    icon: "questions",
    subjects: [
      {
        name: "Physics",
        questions: 15,
        marks: 60,
        icon: "⚛",
        tone: "#2C77D0",
      },
      {
        name: "Chemistry",
        questions: 15,
        marks: 60,
        icon: "◇",
        tone: "#D94B55",
      },
      {
        name: "Biology",
        questions: 20,
        marks: 80,
        icon: "✦",
        tone: COLORS.green,
      },
    ],
  },
  {
    id: "neet-pyq",
    title: "NEET Previous Year Paper",
    number: "PYQ Practice",
    description:
      "Practice with previous-year style questions.",
    questions: 200,
    marks: 800,
    duration: "200 Min",
    difficulty: "Previous Year",
    icon: "trend",
    subjects: [
      {
        name: "Physics",
        questions: 50,
        marks: 200,
        icon: "⚛",
        tone: "#2C77D0",
      },
      {
        name: "Chemistry",
        questions: 50,
        marks: 200,
        icon: "◇",
        tone: "#D94B55",
      },
      {
        name: "Biology",
        questions: 100,
        marks: 400,
        icon: "✦",
        tone: COLORS.green,
      },
    ],
  },
  {
    id: "biology",
    title: "Biology Mock Test",
    number: "Subject Test",
    description:
      "High-yield Biology practice for NEET preparation.",
    questions: 50,
    marks: 200,
    duration: "60 Min",
    difficulty: "Biology",
    icon: "shield",
    subjects: [
      {
        name: "Botany",
        questions: 25,
        marks: 100,
        icon: "B",
        tone: COLORS.green,
      },
      {
        name: "Zoology",
        questions: 25,
        marks: 100,
        icon: "Z",
        tone: "#2C77D0",
      },
    ],
  },
  {
    id: "chemistry",
    title: "Chemistry Mock Test",
    number: "Subject Test",
    description:
      "Balanced Physical, Organic and Inorganic practice.",
    questions: 50,
    marks: 200,
    duration: "60 Min",
    difficulty: "Chemistry",
    icon: "questions",
    subjects: [
      {
        name: "Physical Chemistry",
        questions: 17,
        marks: 68,
        icon: "P",
        tone: "#7C5AC7",
      },
      {
        name: "Organic Chemistry",
        questions: 17,
        marks: 68,
        icon: "O",
        tone: "#D94B55",
      },
      {
        name: "Inorganic Chemistry",
        questions: 16,
        marks: 64,
        icon: "I",
        tone: COLORS.green,
      },
    ],
  },
  {
    id: "physics",
    title: "Physics Mock Test",
    number: "Subject Test",
    description:
      "Build speed and accuracy with focused Physics practice.",
    questions: 50,
    marks: 200,
    duration: "60 Min",
    difficulty: "Physics",
    icon: "target",
    subjects: [
      {
        name: "Physics",
        questions: 50,
        marks: 200,
        icon: "⚛",
        tone: "#2C77D0",
      },
    ],
  },
];

const demoQuestions = [
  {
    question: "The SI unit of electric current is:",
    options: [
      "Volt",
      "Ampere",
      "Ohm",
      "Coulomb",
    ],
    answer: 1,
  },
  {
    question:
      "Which gas is most abundant in Earth's atmosphere?",
    options: [
      "Oxygen",
      "Carbon dioxide",
      "Nitrogen",
      "Hydrogen",
    ],
    answer: 2,
  },
  {
    question:
      "The powerhouse of the cell is:",
    options: [
      "Nucleus",
      "Ribosome",
      "Mitochondria",
      "Golgi body",
    ],
    answer: 2,
  },
  {
    question:
      "The pH of pure water at 25°C is:",
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
      "Which blood cells are mainly responsible for immunity?",
    options: [
      "RBCs",
      "WBCs",
      "Platelets",
      "Plasma",
    ],
    answer: 1,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function MockTests({ onBack }) {
  const [stage, setStage] = useState("list");
  const [selectedTest, setSelectedTest] =
    useState(null);
  const [activeTab, setActiveTab] =
    useState("subjects");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [score, setScore] =
    useState(0);

  const [submitProgress, setSubmitProgress] =
    useState(0);

  const currentQuestionData =
    demoQuestions[currentQuestion];

  const percentage = useMemo(() => {
    return Math.round(
      (score / demoQuestions.length) * 100
    );
  }, [score]);

  const predictedRank = useMemo(() => {
    return Math.max(
      1240,
      80000 - score * 7200
    ).toLocaleString();
  }, [score]);

  const openTest = (test) => {
    setSelectedTest(test);
    setActiveTab("subjects");
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setStage("preview");
  };

  const startTest = () => {
    setStage("test");
  };

  const chooseAnswer = (index) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: index,
    }));
  };

  const calculateScore = () => {
    let correct = 0;

    demoQuestions.forEach(
      (question, index) => {
        if (
          answers[index] ===
          question.answer
        ) {
          correct += 1;
        }
      }
    );

    return correct;
  };

  const submitTest = () => {
    const result = calculateScore();

    setScore(result);
    setSubmitProgress(0);
    setStage("submission");
  };

  const nextQuestion = () => {
    if (
      currentQuestion <
      demoQuestions.length - 1
    ) {
      setCurrentQuestion(
        (prev) => prev + 1
      );
      return;
    }

    submitTest();
  };

  useEffect(() => {
    if (stage !== "submission") {
      return;
    }

    setSubmitProgress(0);

    const interval = setInterval(() => {
      setSubmitProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 4;
      });
    }, 45);

    const timeout = setTimeout(() => {
      setStage("result");
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [stage]);

  const resetTests = () => {
    setStage("list");
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setSubmitProgress(0);
  };

  /* =======================================================
     LIST SCREEN
  ======================================================= */

  if (stage === "list") {
    return (
      <Page>
        <Header onBack={onBack} />

        <main style={styles.container}>
          <div style={styles.kicker}>
            TEST CENTER
          </div>

          <h1 style={styles.pageTitle}>
            Mock Tests
          </h1>

          <p style={styles.pageSubtitle}>
            Simulate the real exam environment,
            improve your accuracy and measure
            your preparation.
          </p>

          <div style={styles.featuredCard}>
            <div style={styles.featuredTop}>
              <div
                style={
                  styles.featuredIcon
                }
              >
                <Icon
                  name="target"
                  size={26}
                  stroke={COLORS.green}
                />
              </div>

              <span
                style={
                  styles.featuredBadge
                }
              >
                RECOMMENDED
              </span>
            </div>

            <div
              style={
                styles.featuredTitle
              }
            >
              Full Syllabus Mock
            </div>

            <div
              style={
                styles.featuredDescription
              }
            >
              Complete exam simulation with
              performance analysis and estimated
              rank.
            </div>

            <div
              style={
                styles.featuredStats
              }
            >
              <Stat
                icon="questions"
                text="180 Questions"
              />

              <Stat
                icon="clock"
                text="180 Minutes"
              />

              <Stat
                icon="trophy"
                text="720 Marks"
              />
            </div>

            <button
              type="button"
              style={
                styles.featuredButton
              }
              onClick={() =>
                openTest(tests[0])
              }
            >
              <span>Take Test</span>

              <Icon
                name="arrow"
                size={18}
                stroke="#FFFFFF"
              />
            </button>
          </div>

          <div
            style={
              styles.sectionHeader
            }
          >
            <h2
              style={
                styles.sectionTitle
              }
            >
              Available Tests
            </h2>

            <span
              style={
                styles.sectionCount
              }
            >
              {tests.length} Tests
            </span>
          </div>

          {tests.slice(1).map(
            (test) => (
              <TestCard
                key={test.id}
                test={test}
                onClick={() =>
                  openTest(test)
                }
              />
            )
          )}

          <div
            style={
              styles.tipCard
            }
          >
            <div
              style={styles.tipIcon}
            >
              <Icon
                name="trend"
                size={20}
                stroke={COLORS.green}
              />
            </div>

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={styles.tipTitle}
              >
                Practice strategically
              </div>

              <div
                style={styles.tipText}
              >
                Take regular mock tests to improve
                speed, accuracy and exam temperament.
              </div>
            </div>
          </div>
        </main>
      </Page>
    );
  }

  /* =======================================================
     PREVIEW / TAKE A TEST
  ======================================================= */

  if (
    stage === "preview" &&
    selectedTest
  ) {
    return (
      <Page>
        <Header
          onBack={() => {
            setSelectedTest(null);
            setStage("list");
          }}
        />

        <main style={styles.container}>
          <div
            style={styles.breadcrumb}
          >
            <span>Mock Tests</span>
            <span>›</span>
            <strong>
              Take a Test
            </strong>
          </div>

          <div
            style={styles.testHero}
          >
            <div
              style={
                styles.testHeroIcon
              }
            >
              <Icon
                name={selectedTest.icon}
                size={27}
                stroke={COLORS.green}
              />
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={
                  styles.testHeroEyebrow
                }
              >
                {selectedTest.number}
              </div>

              <h1
                style={
                  styles.testHeroTitle
                }
              >
                {selectedTest.title}
              </h1>

              <p
                style={
                  styles.testHeroDescription
                }
              >
                {selectedTest.description}
              </p>
            </div>
          </div>

          <div
            style={styles.metaGrid}
          >
            <MetaBox
              icon="questions"
              label="Questions"
              value={
                selectedTest.questions
              }
            />

            <MetaBox
              icon="clock"
              label="Duration"
              value={
                selectedTest.duration
              }
            />

            <MetaBox
              icon="trophy"
              label="Maximum"
              value={`${selectedTest.marks} Marks`}
            />
          </div>

          <div style={styles.tabs}>
            <button
              type="button"
              style={{
                ...styles.tab,
                ...(activeTab ===
                "subjects"
                  ? styles.activeTab
                  : {}),
              }}
              onClick={() =>
                setActiveTab(
                  "subjects"
                )
              }
            >
              Subjects
            </button>

            <button
              type="button"
              style={{
                ...styles.tab,
                ...(activeTab ===
                "instructions"
                  ? styles.activeTab
                  : {}),
              }}
              onClick={() =>
                setActiveTab(
                  "instructions"
                )
              }
            >
              Instructions
            </button>
          </div>

          {activeTab ===
          "subjects" ? (
            <div
              style={styles.panel}
            >
              <div
                style={
                  styles.panelHeader
                }
              >
                <div>
                  <h2
                    style={
                      styles.panelTitle
                    }
                  >
                    Test Structure
                  </h2>

                  <p
                    style={
                      styles.panelSubtitle
                    }
                  >
                    Questions included in this
                    test
                  </p>
                </div>

                <span
                  style={
                    styles.panelBadge
                  }
                >
                  {selectedTest.difficulty}
                </span>
              </div>

              <div
                style={
                  styles.subjectList
                }
              >
                {selectedTest.subjects.map(
                  (subject, index) => (
                    <div
                      key={
                        subject.name
                      }
                      style={{
                        ...styles.subjectItem,
                        borderBottom:
                          index ===
                          selectedTest
                            .subjects
                            .length -
                            1
                            ? "none"
                            : `1px solid ${COLORS.border}`,
                      }}
                    >
                      <div
                        style={{
                          ...styles.subjectAvatar,
                          color:
                            subject.tone,
                          background:
                            subject.tone ===
                            COLORS.green
                              ? COLORS.mint
                              : "#F6F8FA",
                        }}
                      >
                        {
                          subject.icon
                        }
                      </div>

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={
                            styles.subjectName
                          }
                        >
                          {subject.name}
                        </div>

                        <div
                          style={
                            styles.subjectMeta
                          }
                        >
                          {
                            subject.questions
                          }{" "}
                          Questions
                          <span>
                            {" • "}
                          </span>
                          {
                            subject.marks
                          }{" "}
                          Marks
                        </div>
                      </div>

                      <div
                        style={
                          styles.checkCircle
                        }
                      >
                        <Icon
                          name="check"
                          size={16}
                          stroke="#FFFFFF"
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div
              style={styles.panel}
            >
              <div
                style={
                  styles.panelHeader
                }
              >
                <div>
                  <h2
                    style={
                      styles.panelTitle
                    }
                  >
                    Test Instructions
                  </h2>

                  <p
                    style={
                      styles.panelSubtitle
                    }
                  >
                    Please read before starting
                  </p>
                </div>

                <div
                  style={
                    styles.infoCircle
                  }
                >
                  <Icon
                    name="info"
                    size={17}
                    stroke={COLORS.green}
                  />
                </div>
              </div>

              <Instruction
                number="01"
                text="The test will begin immediately after you tap Start Test."
              />

              <Instruction
                number="02"
                text="Each question has one best answer. Select the option you think is correct."
              />

              <Instruction
                number="03"
                text="Your performance will be analyzed after submission."
              />

              <Instruction
                number="04"
                text="An estimated rank will be generated based on your score."
                last
              />
            </div>
          )}

          <div
            style={styles.readyCard}
          >
            <div
              style={styles.readyHeader}
            >
              <div
                style={{
                  minWidth: 0,
                }}
              >
                <div
                  style={
                    styles.readyTitle
                  }
                >
                  Ready to begin?
                </div>

                <div
                  style={
                    styles.readySubtitle
                  }
                >
                  Your test is set up and
                  ready.
                </div>
              </div>

              <div
                style={
                  styles.readyCheck
                }
              >
                <Icon
                  name="check"
                  size={18}
                  stroke={COLORS.green}
                />
              </div>
            </div>

            <button
              type="button"
              style={
                styles.startButton
              }
              onClick={startTest}
            >
              <Icon
                name="play"
                size={18}
                stroke="#FFFFFF"
              />

              <span>Start Test</span>
            </button>
          </div>
        </main>
      </Page>
    );
  }

  /* =======================================================
     ACTIVE TEST
  ======================================================= */

  if (
    stage === "test" &&
    selectedTest
  ) {
    const progress =
      ((currentQuestion + 1) /
        demoQuestions.length) *
      100;

    return (
      <Page>
        <Header
          onBack={() =>
            setStage("preview")
          }
          right={
            <div
              style={
                styles.testCounter
              }
            >
              {currentQuestion + 1}/
              {demoQuestions.length}
            </div>
          }
        />

        <main style={styles.container}>
          <div
            style={styles.examBar}
          >
            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={
                  styles.examLabel
                }
              >
                CURRENT TEST
              </div>

              <div
                style={
                  styles.examName
                }
              >
                {selectedTest.title}
              </div>
            </div>

            <div
              style={
                styles.timerPill
              }
            >
              <Icon
                name="clock"
                size={15}
                stroke={COLORS.green}
              />
              <span>59:42</span>
            </div>
          </div>

          <div
            style={
              styles.progressWrapper
            }
          >
            <div
              style={
                styles.progressTrack
              }
            >
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`,
                }}
              />
            </div>

            <div
              style={
                styles.progressText
              }
            >
              <span>
                Question{" "}
                {currentQuestion + 1}{" "}
                of{" "}
                {demoQuestions.length}
              </span>

              <span>
                {Math.round(progress)}%
                complete
              </span>
            </div>
          </div>

          <div
            style={
              styles.questionPanel
            }
          >
            <div
              style={
                styles.questionLabel
              }
            >
              QUESTION{" "}
              {String(
                currentQuestion + 1
              ).padStart(2, "0")}
            </div>

            <h1
              style={
                styles.questionText
              }
            >
              {
                currentQuestionData.question
              }
            </h1>

            <div
              style={styles.options}
            >
              {currentQuestionData.options.map(
                (
                  option,
                  index
                ) => {
                  const selected =
                    answers[
                      currentQuestion
                    ] === index;

                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() =>
                        chooseAnswer(
                          index
                        )
                      }
                      style={{
                        ...styles.optionButton,
                        ...(selected
                          ? styles.selectedOption
                          : {}),
                      }}
                    >
                      <span
                        style={{
                          ...styles.optionLetter,
                          ...(selected
                            ? styles.selectedLetter
                            : {}),
                        }}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <span
                        style={{
                          minWidth: 0,
                        }}
                      >
                        {option}
                      </span>

                      {selected && (
                        <span
                          style={
                            styles.optionTick
                          }
                        >
                          <Icon
                            name="check"
                            size={14}
                            stroke="#FFFFFF"
                          />
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            <button
              type="button"
              style={
                styles.nextButton
              }
              onClick={nextQuestion}
            >
              {currentQuestion ===
              demoQuestions.length -
                1
                ? "Submit Test"
                : "Save & Next"}

              <Icon
                name="arrow"
                size={18}
                stroke="#FFFFFF"
              />
            </button>
          </div>
        </main>
      </Page>
    );
  }

  /* =======================================================
     SUBMISSION SCREEN
  ======================================================= */

  if (
    stage === "submission"
  ) {
    return (
      <Page>
        <main
          style={
            styles.submissionPage
          }
        >
          <div
            style={
              styles.submissionCard
            }
          >
            <div
              style={
                styles.successRing
              }
            >
              <Icon
                name="check"
                size={55}
                stroke="#FFFFFF"
              />
            </div>

            <div
              style={
                styles.successEyebrow
              }
            >
              TEST SUBMISSION
            </div>

            <h1
              style={
                styles.successTitle
              }
            >
              Test Submitted
              <br />
              Successfully!
            </h1>

            <p
              style={
                styles.successText
              }
            >
              Your test has been submitted. We
              are analyzing your performance and
              preparing your result.
            </p>

            <div
              style={
                styles.largeProgress
              }
            >
              <div
                style={{
                  ...styles.largeProgressFill,
                  width: `${submitProgress}%`,
                }}
              />
            </div>

            <div
              style={
                styles.analysisStatus
              }
            >
              <span>
                Analyzing your performance
              </span>

              <strong>
                {submitProgress}%
              </strong>
            </div>

            <div
              style={
                styles.secureNote
              }
            >
              <Icon
                name="shield"
                size={16}
                stroke={COLORS.green}
              />

              <span>
                Your responses are being
                processed securely.
              </span>
            </div>
          </div>
        </main>
      </Page>
    );
  }

  /* =======================================================
     RESULT SCREEN
  ======================================================= */

  if (
    stage === "result"
  ) {
    return (
      <Page>
        <Header
          onBack={() => {
            setStage("list");
            setSelectedTest(null);
          }}
        />

        <main style={styles.container}>
          <div
            style={styles.breadcrumb}
          >
            <span>Mock Test</span>
            <span>›</span>
            <strong>
              Result Overview
            </strong>
          </div>

          <div
            style={
              styles.resultHero
            }
          >
            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={styles.kicker}
              >
                PERFORMANCE
              </div>

              <h1
                style={
                  styles.pageTitle
                }
              >
                Test Completed
              </h1>

              <p
                style={
                  styles.pageSubtitle
                }
              >
                {selectedTest?.title}
              </p>
            </div>

            <div
              style={
                styles.resultStatus
              }
            >
              <Icon
                name="check"
                size={16}
                stroke={COLORS.green}
              />

              Completed
            </div>
          </div>

          <div
            style={
              styles.scoreCard
            }
          >
            <div
              style={
                styles.scoreCircle
              }
            >
              <div
                style={
                  styles.scoreValue
                }
              >
                {percentage}%
              </div>

              <div
                style={
                  styles.scoreCaption
                }
              >
                Accuracy
              </div>
            </div>

            <div
              style={
                styles.scoreSummary
              }
            >
              <div
                style={
                  styles.scoreSummaryLabel
                }
              >
                Correct Answers
              </div>

              <div
                style={
                  styles.scoreSummaryValue
                }
              >
                {score} /{" "}
                {demoQuestions.length}
              </div>

              <div
                style={
                  styles.scoreSummaryHint
                }
              >
                Keep practicing to improve your
                accuracy.
              </div>
            </div>
          </div>

          <div
            style={
              styles.resultGrid
            }
          >
            <ResultMetric
              label="Correct"
              value={score}
              icon="check"
            />

            <ResultMetric
              label="Accuracy"
              value={`${percentage}%`}
              icon="target"
            />

            <ResultMetric
              label="Estimated Rank"
              value={predictedRank}
              icon="trophy"
            />
          </div>

          <div
            style={styles.rankCard}
          >
            <div
              style={styles.rankIcon}
            >
              <Icon
                name="trophy"
                size={24}
                stroke={COLORS.green}
              />
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={styles.rankSmall}
              >
                ESTIMATED PERFORMANCE
              </div>

              <div
                style={styles.rankTitle}
              >
                Your Estimated Rank
              </div>

              <div
                style={styles.rankNumber}
              >
                {predictedRank}
              </div>
            </div>

            <Icon
              name="trend"
              size={26}
              stroke={COLORS.green}
            />
          </div>

          <button
            type="button"
            style={
              styles.primaryResultButton
            }
            onClick={() => {
              resetTests();
            }}
          >
            Explore More Tests

            <Icon
              name="arrow"
              size={18}
              stroke="#FFFFFF"
            />
          </button>

          <button
            type="button"
            style={
              styles.secondaryResultButton
            }
            onClick={onBack}
          >
            Back to Dashboard
          </button>
        </main>
      </Page>
    );
  }

  return null;
}

/* =========================================================
   SUB COMPONENTS
========================================================= */

function Page({ children }) {
  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        {children}
      </div>
    </div>
  );
}

function Header({ onBack, right }) {
  return (
    <header style={styles.header}>
      <div
        style={styles.headerInner}
      >
        <button
          type="button"
          onClick={onBack}
          style={styles.headerBack}
          aria-label="Go back"
        >
          <Icon
            name="back"
            size={20}
            stroke={COLORS.navy}
          />
        </button>

        <div
          style={styles.brandBlock}
        >
          <div style={styles.brand}>
            ILS RANKER
          </div>

          <div
            style={styles.tagline}
          >
            KNOW YOUR POTENTIAL
          </div>
        </div>

        {right}
      </div>
    </header>
  );
}

function Stat({ icon, text }) {
  return (
    <div
      style={
        styles.featuredStat
      }
    >
      <Icon
        name={icon}
        size={15}
        stroke="#FFFFFF"
      />

      <span>{text}</span>
    </div>
  );
}

function TestCard({
  test,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={styles.testCard}
    >
      <div
        style={
          styles.testCardIcon
        }
      >
        <Icon
          name={test.icon}
          size={22}
          stroke={COLORS.green}
        />
      </div>

      <div
        style={
          styles.testCardBody
        }
      >
        <div
          style={
            styles.testCardTopLine
          }
        >
          <span
            style={
              styles.testNumber
            }
          >
            {test.number}
          </span>

          <span
            style={
              styles.cardArrow
            }
          >
            <Icon
              name="arrow"
              size={17}
              stroke={COLORS.green}
            />
          </span>
        </div>

        <div
          style={
            styles.testCardTitle
          }
        >
          {test.title}
        </div>

        <div
          style={
            styles.testCardDescription
          }
        >
          {test.description}
        </div>

        <div
          style={
            styles.cardMetaRow
          }
        >
          <MetaPill
            icon="questions"
            text={`${test.questions} Questions`}
          />

          <MetaPill
            icon="clock"
            text={test.duration}
          />

          <span
            style={
              styles.difficultyPill
            }
          >
            {test.difficulty}
          </span>
        </div>
      </div>
    </button>
  );
}

function MetaPill({
  icon,
  text,
}) {
  return (
    <span
      style={styles.metaPill}
    >
      <Icon
        name={icon}
        size={13}
        stroke={COLORS.muted}
      />

      {text}
    </span>
  );
}

function MetaBox({
  icon,
  label,
  value,
}) {
  return (
    <div style={styles.metaBox}>
      <div
        style={
          styles.metaBoxIcon
        }
      >
        <Icon
          name={icon}
          size={18}
          stroke={COLORS.green}
        />
      </div>

      <div
        style={
          styles.metaBoxLabel
        }
      >
        {label}
      </div>

      <div
        style={
          styles.metaBoxValue
        }
      >
        {value}
      </div>
    </div>
  );
}

function Instruction({
  number,
  text,
  last,
}) {
  return (
    <div
      style={{
        ...styles.instruction,
        borderBottom: last
          ? "none"
          : `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={
          styles.instructionNumber
        }
      >
        {number}
      </div>

      <div
        style={
          styles.instructionText
        }
      >
        {text}
      </div>
    </div>
  );
}

function ResultMetric({
  label,
  value,
  icon,
}) {
  return (
    <div
      style={styles.resultMetric}
    >
      <div
        style={
          styles.resultMetricIcon
        }
      >
        <Icon
          name={icon}
          size={17}
          stroke={COLORS.green}
        />
      </div>

      <div
        style={
          styles.resultMetricLabel
        }
      >
        {label}
      </div>

      <div
        style={
          styles.resultMetricValue
        }
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    width: "100%",
    minHeight: "100dvh",
    background: COLORS.mint,
    color: COLORS.navy,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  mobileShell: {
    width: "100%",
    maxWidth: 390,
    minHeight: "100dvh",
    background: COLORS.mint,
    boxSizing: "border-box",
    overflow: "visible",
  },

  header: {
    background: COLORS.white,
    borderBottom: `1px solid ${COLORS.border}`,
    position: "sticky",
    top: 0,
    zIndex: 20,
  },

  headerInner: {
    width: "100%",
    minHeight: 64,
    padding: "12px 15px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxSizing: "border-box",
  },

  headerBack: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brandBlock: {
    flex: 1,
    minWidth: 0,
  },

  brand: {
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: 1,
    lineHeight: 1,
  },

  tagline: {
    fontSize: 9,
    color: COLORS.muted,
    letterSpacing: 0.7,
    fontWeight: 800,
    marginTop: 5,
  },

  container: {
    width: "100%",
    maxWidth: 390,
    margin: "0 auto",
    padding: "22px 15px 105px",
    boxSizing: "border-box",
  },

  kicker: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: 900,
    color: COLORS.green,
    marginBottom: 7,
  },

  pageTitle: {
    margin: 0,
    fontSize: 30,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: -0.8,
  },

  pageSubtitle: {
    margin: "9px 0 0",
    color: COLORS.muted,
    fontSize: 12,
    lineHeight: 1.55,
  },

  featuredCard: {
    marginTop: 22,
    borderRadius: 22,
    padding: 18,
    background:
      `linear-gradient(135deg, ${COLORS.green} 0%, #008C67 100%)`,
    color: "#FFFFFF",
    boxShadow:
      "0 14px 30px rgba(0,112,80,0.18)",
    boxSizing: "border-box",
  },

  featuredTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  featuredIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  featuredBadge: {
    fontSize: 8,
    fontWeight: 900,
    letterSpacing: 0.7,
    padding: "6px 8px",
    borderRadius: 99,
    background:
      "rgba(255,255,255,0.16)",
    border:
      "1px solid rgba(255,255,255,0.2)",
    whiteSpace: "nowrap",
  },

  featuredTitle: {
    fontSize: 22,
    lineHeight: 1.15,
    fontWeight: 900,
    marginTop: 17,
  },

  featuredDescription: {
    marginTop: 7,
    fontSize: 11.5,
    lineHeight: 1.5,
    opacity: 0.88,
  },

  featuredStats: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 15,
  },

  featuredStat: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 8px",
    borderRadius: 10,
    background:
      "rgba(255,255,255,0.11)",
    border:
      "1px solid rgba(255,255,255,0.14)",
    fontSize: 8.5,
    fontWeight: 800,
  },

  featuredButton: {
    marginTop: 17,
    border: "none",
    borderRadius: 12,
    background: "#FFFFFF",
    color: COLORS.green,
    padding: "12px 14px",
    minWidth: 135,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    fontWeight: 900,
    fontSize: 11.5,
    cursor: "pointer",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 24,
    marginBottom: 11,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 900,
  },

  sectionCount: {
    color: COLORS.muted,
    fontSize: 9.5,
    fontWeight: 750,
  },

  testCard: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    textAlign: "left",
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 17,
    padding: 12,
    marginBottom: 9,
    boxShadow:
      "0 5px 18px rgba(8,47,60,0.035)",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  testCardIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    background: COLORS.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  testCardBody: {
    minWidth: 0,
    flex: 1,
  },

  testCardTopLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },

  testNumber: {
    fontSize: 8,
    fontWeight: 900,
    color: COLORS.green,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  cardArrow: {
    width: 26,
    height: 26,
    borderRadius: 8,
    background: COLORS.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  testCardTitle: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 1.2,
    fontWeight: 850,
    color: COLORS.navy,
  },

  testCardDescription: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 9.5,
    lineHeight: 1.45,
  },

  cardMetaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },

  metaPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "5px 6px",
    background: "#F8FAF9",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 7,
    color: COLORS.muted,
    fontSize: 7.5,
    fontWeight: 750,
  },

  difficultyPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 6px",
    background: COLORS.mint,
    color: COLORS.green,
    borderRadius: 7,
    fontSize: 7.5,
    fontWeight: 800,
  },

  tipCard: {
    marginTop: 17,
    padding: 13,
    borderRadius: 16,
    background: COLORS.softMint,
    display: "flex",
    gap: 9,
    alignItems: "flex-start",
    boxSizing: "border-box",
  },

  tipIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    background: COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  tipTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  tipText: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 9.5,
    lineHeight: 1.5,
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 9,
    color: COLORS.muted,
    marginBottom: 13,
  },

  testHero: {
    display: "flex",
    gap: 11,
    alignItems: "flex-start",
  },

  testHeroIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow:
      "0 4px 14px rgba(8,47,60,0.04)",
  },

  testHeroEyebrow: {
    fontSize: 8.5,
    color: COLORS.green,
    fontWeight: 900,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  testHeroTitle: {
    margin: "5px 0 0",
    fontSize: 20,
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: -0.4,
  },

  testHeroDescription: {
    margin: "7px 0 0",
    color: COLORS.muted,
    fontSize: 11,
    lineHeight: 1.5,
  },

  metaGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 7,
    marginTop: 17,
  },

  metaBox: {
    minWidth: 0,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 15,
    padding: 11,
    boxSizing: "border-box",
  },

  metaBoxIcon: {
    width: 31,
    height: 31,
    borderRadius: 9,
    background: COLORS.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  metaBoxLabel: {
    marginTop: 8,
    fontSize: 8,
    color: COLORS.muted,
    fontWeight: 750,
  },

  metaBoxValue: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: 900,
    lineHeight: 1.25,
  },

  tabs: {
    display: "flex",
    gap: 4,
    padding: 4,
    marginTop: 16,
    borderRadius: 12,
    background: COLORS.softMint,
  },

  tab: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "9px 10px",
    borderRadius: 8,
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: 800,
    cursor: "pointer",
  },

  activeTab: {
    background: COLORS.white,
    color: COLORS.green,
    boxShadow:
      "0 2px 7px rgba(8,47,60,0.06)",
  },

  panel: {
    marginTop: 10,
    padding: 14,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 17,
    boxSizing: "border-box",
  },

  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "flex-start",
    marginBottom: 6,
  },

  panelTitle: {
    margin: 0,
    fontSize: 13,
    fontWeight: 900,
  },

  panelSubtitle: {
    margin: "4px 0 0",
    color: COLORS.muted,
    fontSize: 9,
  },

  panelBadge: {
    padding: "5px 7px",
    borderRadius: 7,
    background: COLORS.mint,
    color: COLORS.green,
    fontSize: 7,
    fontWeight: 900,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },

  subjectList: {
    marginTop: 5,
  },

  subjectItem: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "11px 0",
  },

  subjectAvatar: {
    width: 38,
    height: 38,
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 16,
    flexShrink: 0,
  },

  subjectName: {
    fontSize: 11,
    fontWeight: 850,
  },

  subjectMeta: {
    marginTop: 3,
    color: COLORS.muted,
    fontSize: 8.5,
  },

  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  infoCircle: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: COLORS.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  instruction: {
    display: "flex",
    gap: 10,
    padding: "11px 0",
  },

  instructionNumber: {
    width: 27,
    height: 27,
    borderRadius: 8,
    background: COLORS.mint,
    color: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8,
    fontWeight: 900,
    flexShrink: 0,
  },

  instructionText: {
    fontSize: 9.5,
    color: COLORS.muted,
    lineHeight: 1.55,
    paddingTop: 2,
  },

  readyCard: {
    marginTop: 11,
    padding: 14,
    borderRadius: 17,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    boxShadow:
      "0 5px 18px rgba(8,47,60,0.04)",
  },

  readyHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  readyTitle: {
    fontSize: 12,
    fontWeight: 900,
  },

  readySubtitle: {
    color: COLORS.muted,
    fontSize: 8.5,
    marginTop: 4,
  },

  readyCheck: {
    width: 32,
    height: 32,
    borderRadius: 9,
    background: COLORS.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  startButton: {
    marginTop: 12,
    width: "100%",
    padding: "12px 14px",
    borderRadius: 12,
    border: "none",
    background: COLORS.green,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 11.5,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow:
      "0 8px 18px rgba(0,112,80,0.16)",
  },

  testCounter: {
    padding: "6px 8px",
    background: COLORS.mint,
    borderRadius: 8,
    color: COLORS.green,
    fontSize: 9,
    fontWeight: 900,
  },

  examBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 12,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 15,
  },

  examLabel: {
    fontSize: 7.5,
    letterSpacing: 0.9,
    color: COLORS.green,
    fontWeight: 900,
  },

  examName: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 1.25,
    fontWeight: 850,
  },

  timerPill: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 8px",
    borderRadius: 8,
    background: "#FFF8E8",
    color: COLORS.yellow,
    fontSize: 9,
    fontWeight: 900,
    flexShrink: 0,
  },

  progressWrapper: {
    marginTop: 14,
  },

  progressTrack: {
    height: 6,
    borderRadius: 30,
    overflow: "hidden",
    background: COLORS.softMint,
  },

  progressFill: {
    height: "100%",
    borderRadius: 30,
    background: COLORS.green,
    transition:
      "width 220ms ease",
  },

  progressText: {
    marginTop: 6,
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    color: COLORS.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  questionPanel: {
    marginTop: 14,
    padding: 15,
    borderRadius: 17,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    boxSizing: "border-box",
  },

  questionLabel: {
    color: COLORS.green,
    fontSize: 8,
    letterSpacing: 0.9,
    fontWeight: 900,
  },

  questionText: {
    margin: "9px 0 0",
    fontSize: 16,
    lineHeight: 1.4,
    fontWeight: 900,
    letterSpacing: -0.2,
  },

  options: {
    marginTop: 16,
  },

  optionButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 9,
    textAlign: "left",
    border: `1px solid ${COLORS.border}`,
    background: COLORS.white,
    color: COLORS.navy,
    borderRadius: 12,
    padding: "11px 12px",
    marginBottom: 8,
    fontSize: 10.5,
    lineHeight: 1.35,
    fontWeight: 650,
    cursor: "pointer",
    boxSizing: "border-box",
  },

  selectedOption: {
    background: COLORS.mint,
    border:
      `2px solid ${COLORS.green}`,
    color: COLORS.green,
    fontWeight: 850,
  },

  optionLetter: {
    width: 27,
    height: 27,
    borderRadius: 8,
    background: "#F4F7F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 900,
    color: COLORS.muted,
    flexShrink: 0,
  },

  selectedLetter: {
    color: "#FFFFFF",
    background: COLORS.green,
  },

  optionTick: {
    marginLeft: "auto",
    width: 21,
    height: 21,
    borderRadius: "50%",
    background: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  nextButton: {
    marginTop: 4,
    width: "100%",
    padding: "13px 14px",
    border: "none",
    borderRadius: 12,
    background: COLORS.green,
    color: "#FFFFFF",
    fontSize: 11.5,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    cursor: "pointer",
  },

  submissionPage: {
    minHeight:
      "calc(100dvh - 64px)",
    padding:
      "24px 15px 105px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  submissionCard: {
    width: "100%",
    maxWidth: 360,
    textAlign: "center",
    background: COLORS.white,
    border:
      `1px solid ${COLORS.border}`,
    borderRadius: 22,
    padding: "30px 18px",
    boxShadow:
      "0 18px 45px rgba(8,47,60,0.08)",
    boxSizing: "border-box",
  },

  successRing: {
    width: 86,
    height: 86,
    borderRadius: "50%",
    margin: "0 auto",
    background: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "0 14px 28px rgba(0,112,80,0.18)",
  },

  successEyebrow: {
    marginTop: 22,
    color: COLORS.green,
    fontSize: 8,
    fontWeight: 900,
    letterSpacing: 1,
  },

  successTitle: {
    margin: "7px 0 0",
    fontSize: 23,
    lineHeight: 1.22,
    fontWeight: 900,
  },

  successText: {
    margin: "10px auto 0",
    maxWidth: 320,
    color: COLORS.muted,
    fontSize: 10.5,
    lineHeight: 1.6,
  },

  largeProgress: {
    height: 9,
    background: COLORS.softMint,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 23,
  },

  largeProgressFill: {
    height: "100%",
    borderRadius: 30,
    background: COLORS.green,
    transition:
      "width 80ms linear",
  },

  analysisStatus: {
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    color: COLORS.muted,
    fontSize: 8.5,
    fontWeight: 750,
  },

  secureNote: {
    marginTop: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    color: COLORS.muted,
    fontSize: 8.5,
  },

  resultHero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 9,
  },

  resultStatus: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 8px",
    borderRadius: 9,
    background: COLORS.mint,
    color: COLORS.green,
    fontSize: 8,
    fontWeight: 850,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  scoreCard: {
    marginTop: 16,
    padding: 15,
    borderRadius: 17,
    background: COLORS.white,
    border:
      `1px solid ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    gap: 14,
    boxSizing: "border-box",
  },

  scoreCircle: {
    width: 92,
    height: 92,
    borderRadius: "50%",
    background: COLORS.mint,
    border:
      `8px solid ${COLORS.green}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  scoreValue: {
    fontSize: 22,
    fontWeight: 900,
  },

  scoreCaption: {
    marginTop: 2,
    fontSize: 8,
    color: COLORS.muted,
    fontWeight: 800,
  },

  scoreSummary: {
    minWidth: 0,
    flex: 1,
  },

  scoreSummaryLabel: {
    color: COLORS.muted,
    fontSize: 8.5,
    fontWeight: 750,
  },

  scoreSummaryValue: {
    marginTop: 4,
    fontSize: 19,
    fontWeight: 900,
  },

  scoreSummaryHint: {
    marginTop: 5,
    color: COLORS.muted,
    fontSize: 8.5,
    lineHeight: 1.45,
  },

  resultGrid: {
    marginTop: 10,
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 7,
  },

  resultMetric: {
    minWidth: 0,
    background: COLORS.white,
    border:
      `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: 10,
    boxSizing: "border-box",
  },

  resultMetricIcon: {
    width: 28,
    height: 28,
    borderRadius: 9,
    background: COLORS.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  resultMetricLabel: {
    marginTop: 8,
    color: COLORS.muted,
    fontSize: 7.5,
    fontWeight: 750,
  },

  resultMetricValue: {
    marginTop: 3,
    fontSize: 12.5,
    lineHeight: 1.25,
    fontWeight: 900,
  },

  rankCard: {
    marginTop: 11,
    background: COLORS.softMint,
    borderRadius: 17,
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  rankIcon: {
    width: 41,
    height: 41,
    borderRadius: 12,
    background: COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  rankSmall: {
    fontSize: 7.5,
    fontWeight: 900,
    letterSpacing: 0.8,
    color: COLORS.green,
  },

  rankTitle: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: 850,
  },

  rankNumber: {
    marginTop: 2,
    color: COLORS.green,
    fontSize: 18,
    fontWeight: 900,
  },

  primaryResultButton: {
    marginTop: 16,
    width: "100%",
    border: "none",
    borderRadius: 12,
    padding: "13px 14px",
    background: COLORS.green,
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    fontSize: 11.5,
    fontWeight: 900,
    cursor: "pointer",
  },

  secondaryResultButton: {
    marginTop: 8,
    width: "100%",
    border:
      `1px solid ${COLORS.green}`,
    borderRadius: 12,
    padding: "12px 14px",
    background: COLORS.white,
    color: COLORS.green,
    fontSize: 10.5,
    fontWeight: 850,
    cursor: "pointer",
  },
};