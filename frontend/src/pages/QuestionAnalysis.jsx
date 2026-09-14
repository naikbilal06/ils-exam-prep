import React, { useMemo, useState } from "react";

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
  purple: "#7652C8",
  yellow: "#C78A13",
};

const questions = [
  {
    id: 1,
    chapter: "Current Electricity",
    question:
      "The SI unit of electric current is:",
    selected: "Ampere",
    correct: "Ampere",
    status: "correct",
    difficulty: "Easy",
    time: "18 sec",
  },
  {
    id: 2,
    chapter: "Current Electricity",
    question:
      "The resistance of a conductor depends upon:",
    selected: "Only its length",
    correct: "Length, area and material",
    status: "incorrect",
    difficulty: "Medium",
    time: "42 sec",
  },
  {
    id: 3,
    chapter: "Mechanics",
    question:
      "The acceleration due to gravity near Earth is approximately:",
    selected: "9.8 m/s²",
    correct: "9.8 m/s²",
    status: "correct",
    difficulty: "Easy",
    time: "21 sec",
  },
  {
    id: 4,
    chapter: "Modern Physics",
    question:
      "The energy of a photon is proportional to:",
    selected: "Frequency",
    correct: "Frequency",
    status: "correct",
    difficulty: "Medium",
    time: "31 sec",
  },
  {
    id: 5,
    chapter: "Electrostatics",
    question:
      "The electric field inside a conductor in electrostatic equilibrium is:",
    selected: "Zero",
    correct: "Zero",
    status: "correct",
    difficulty: "Easy",
    time: "17 sec",
  },
  {
    id: 6,
    chapter: "Modern Physics",
    question:
      "Which particle has no electric charge?",
    selected: "Proton",
    correct: "Neutron",
    status: "incorrect",
    difficulty: "Easy",
    time: "27 sec",
  },
  {
    id: 7,
    chapter: "Optics",
    question:
      "The focal length of a plane mirror is:",
    selected: "Infinity",
    correct: "Infinity",
    status: "correct",
    difficulty: "Easy",
    time: "14 sec",
  },
  {
    id: 8,
    chapter: "Electrostatics",
    question:
      "Coulomb's law describes the force between:",
    selected: "Two charges",
    correct: "Two charges",
    status: "correct",
    difficulty: "Easy",
    time: "19 sec",
  },
  {
    id: 9,
    chapter: "Mechanics",
    question:
      "Momentum of a body is the product of mass and:",
    selected: "Velocity",
    correct: "Velocity",
    status: "correct",
    difficulty: "Easy",
    time: "15 sec",
  },
  {
    id: 10,
    chapter: "Modern Physics",
    question:
      "Radioactivity is a:",
    selected: "Nuclear phenomenon",
    correct: "Nuclear phenomenon",
    status: "correct",
    difficulty: "Medium",
    time: "38 sec",
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

    check: <path d="M5 12.5l4.2 4.2L19 7" />,

    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l3-4 3 2 5-6" />
      </>
    ),

    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function QuestionAnalysis({ onBack }) {
  const [filter, setFilter] = useState("all");
  const [selectedQuestion, setSelectedQuestion] =
    useState(null);

  const correctCount = questions.filter(
    (q) => q.status === "correct"
  ).length;

  const incorrectCount = questions.filter(
    (q) => q.status === "incorrect"
  ).length;

  const skippedCount =
    questions.length - correctCount - incorrectCount;

  const accuracy = Math.round(
    (correctCount / questions.length) * 100
  );

  const filteredQuestions = useMemo(() => {
    if (filter === "correct") {
      return questions.filter(
        (q) => q.status === "correct"
      );
    }

    if (filter === "incorrect") {
      return questions.filter(
        (q) => q.status === "incorrect"
      );
    }

    if (filter === "easy") {
      return questions.filter(
        (q) => q.difficulty === "Easy"
      );
    }

    if (filter === "medium") {
      return questions.filter(
        (q) => q.difficulty === "Medium"
      );
    }

    return questions;
  }, [filter]);

  if (selectedQuestion) {
    return (
      <div style={styles.page}>
        <Header
          onBack={() => setSelectedQuestion(null)}
          right="Question Review"
        />

        <main style={styles.container}>
          <div style={styles.breadcrumb}>
            <span>Analysis</span>
            <span>›</span>
            <span>Questions</span>
            <span>›</span>
            <strong>Review</strong>
          </div>

          <div style={styles.reviewTop}>
            <div>
              <div style={styles.kicker}>
                QUESTION {String(selectedQuestion.id).padStart(2, "0")}
              </div>

              <h1 style={styles.title}>
                Question Review
              </h1>

              <p style={styles.subtitle}>
                {selectedQuestion.chapter} •{" "}
                {selectedQuestion.difficulty}
              </p>
            </div>

            <div
              style={{
                ...styles.reviewStatus,
                color:
                  selectedQuestion.status === "correct"
                    ? C.green
                    : C.red,
                background:
                  selectedQuestion.status === "correct"
                    ? C.mint
                    : "#FFF0F1",
              }}
            >
              <Icon
                name={
                  selectedQuestion.status === "correct"
                    ? "check"
                    : "close"
                }
                size={13}
                stroke={
                  selectedQuestion.status === "correct"
                    ? C.green
                    : C.red
                }
              />

              {selectedQuestion.status === "correct"
                ? "Correct"
                : "Incorrect"}
            </div>
          </div>

          <section style={styles.reviewCard}>
            <div style={styles.questionLabel}>
              QUESTION
            </div>

            <h2 style={styles.questionText}>
              {selectedQuestion.question}
            </h2>

            <div style={styles.answerBlock}>
              <div style={styles.answerLabel}>
                YOUR ANSWER
              </div>

              <div
                style={{
                  ...styles.answerValue,
                  color:
                    selectedQuestion.status === "correct"
                      ? C.green
                      : C.red,
                  background:
                    selectedQuestion.status === "correct"
                      ? C.mint
                      : "#FFF5F6",
                }}
              >
                {selectedQuestion.selected}
              </div>
            </div>

            {selectedQuestion.status !== "correct" && (
              <div style={styles.answerBlock}>
                <div style={styles.answerLabel}>
                  CORRECT ANSWER
                </div>

                <div
                  style={{
                    ...styles.answerValue,
                    color: C.green,
                    background: C.mint,
                  }}
                >
                  {selectedQuestion.correct}
                </div>
              </div>
            )}

            <div style={styles.reviewMetaGrid}>
              <ReviewMeta
                label="Difficulty"
                value={selectedQuestion.difficulty}
              />

              <ReviewMeta
                label="Time Taken"
                value={selectedQuestion.time}
              />

              <ReviewMeta
                label="Chapter"
                value={selectedQuestion.chapter}
              />
            </div>
          </section>

          <section style={styles.conceptCard}>
            <div style={styles.conceptIcon}>
              <Icon
                name="book"
                size={18}
                stroke={C.green}
              />
            </div>

            <div>
              <div style={styles.conceptTitle}>
                Concept Review
              </div>

              <div style={styles.conceptText}>
                Review the core concept from{" "}
                <strong>
                  {selectedQuestion.chapter}
                </strong>{" "}
                before attempting similar questions again.
              </div>
            </div>
          </section>

          <button
            style={styles.primaryButton}
            onClick={() => setSelectedQuestion(null)}
          >
            Back to Question Analysis
            <Icon
              name="arrow"
              size={17}
              stroke="#FFFFFF"
            />
          </button>
        </main>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Header
        onBack={onBack}
        right="Question Analysis"
      />

      <main style={styles.container}>
        <div style={styles.kicker}>
          QUESTION-LEVEL PERFORMANCE
        </div>

        <h1 style={styles.title}>
          Question Analysis
        </h1>

        <p style={styles.subtitle}>
          Review your answers, identify mistakes and understand
          where you are losing marks.
        </p>

        <section style={styles.summaryCard}>
          <div style={styles.summaryTop}>
            <div>
              <div style={styles.summaryEyebrow}>
                OVERALL ACCURACY
              </div>

              <div style={styles.summaryValue}>
                {accuracy}%
              </div>

              <div style={styles.summaryText}>
                {accuracy >= 80
                  ? "Excellent question-level performance."
                  : "Good progress. Keep working on incorrect questions."}
              </div>
            </div>

            <div style={styles.accuracyCircle}>
              <div style={styles.accuracyInner}>
                {accuracy}%
              </div>
            </div>
          </div>

          <div style={styles.breakdown}>
            <Breakdown
              label="Correct"
              value={correctCount}
              color={C.green}
            />

            <Breakdown
              label="Incorrect"
              value={incorrectCount}
              color={C.red}
            />

            <Breakdown
              label="Skipped"
              value={skippedCount}
              color={C.yellow}
            />

            <Breakdown
              label="Total"
              value={questions.length}
              color={C.navy}
            />
          </div>
        </section>

        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Question Review
            </h2>

            <p style={styles.sectionSubtitle}>
              Tap any question to inspect your response
            </p>
          </div>

          <button
            style={styles.filterButton}
            onClick={() => setFilter("all")}
          >
            <Icon
              name="filter"
              size={15}
              stroke={C.navy}
            />
            Filter
          </button>
        </div>

        <div style={styles.filterBar}>
          {[
            ["all", "All"],
            ["correct", "Correct"],
            ["incorrect", "Incorrect"],
            ["easy", "Easy"],
            ["medium", "Medium"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              style={{
                ...styles.filterPill,
                ...(filter === id
                  ? styles.filterPillActive
                  : {}),
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={styles.list}>
          {filteredQuestions.map((question) => (
            <button
              key={question.id}
              style={styles.questionRow}
              onClick={() =>
                setSelectedQuestion(question)
              }
            >
              <div
                style={{
                  ...styles.questionNumber,
                  color:
                    question.status === "correct"
                      ? C.green
                      : C.red,
                  background:
                    question.status === "correct"
                      ? C.mint
                      : "#FFF5F6",
                }}
              >
                {String(question.id).padStart(2, "0")}
              </div>

              <div style={styles.questionBody}>
                <div style={styles.questionRowTop}>
                  <div style={styles.chapterName}>
                    {question.chapter}
                  </div>

                  <div
                    style={{
                      ...styles.statusBadge,
                      color:
                        question.status === "correct"
                          ? C.green
                          : C.red,
                      background:
                        question.status === "correct"
                          ? C.mint
                          : "#FFF0F1",
                    }}
                  >
                    <Icon
                      name={
                        question.status === "correct"
                          ? "check"
                          : "close"
                      }
                      size={11}
                      stroke={
                        question.status === "correct"
                          ? C.green
                          : C.red
                      }
                    />

                    {question.status}
                  </div>
                </div>

                <div style={styles.questionPreview}>
                  {question.question}
                </div>

                <div style={styles.questionMeta}>
                  <span>{question.difficulty}</span>
                  <span>•</span>

                  <span style={styles.timeMeta}>
                    <Icon
                      name="clock"
                      size={11}
                      stroke={C.muted}
                    />
                    {question.time}
                  </span>
                </div>
              </div>

              <div style={styles.rowArrow}>
                <Icon
                  name="arrow"
                  size={15}
                  stroke={C.green}
                />
              </div>
            </button>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>
              <Icon
                name="target"
                size={24}
                stroke={C.muted}
              />
            </div>

            <div style={styles.emptyTitle}>
              No questions found
            </div>

            <div style={styles.emptyText}>
              Try another filter to view your questions.
            </div>
          </div>
        )}

        <section style={styles.insightCard}>
          <div style={styles.insightIcon}>
            <Icon
              name="chart"
              size={19}
              stroke={C.green}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={styles.insightEyebrow}>
              PERFORMANCE INSIGHT
            </div>

            <div style={styles.insightTitle}>
              Your biggest opportunity
            </div>

            <div style={styles.insightText}>
              Most of your incorrect answers are coming from
              <strong> Current Electricity</strong> and
              <strong> Modern Physics</strong>. Review these
              chapters before taking another Physics test.
            </div>
          </div>
        </section>

        <button
          style={styles.primaryButton}
          onClick={onBack}
        >
          Back to Chapter Analysis
          <Icon
            name="arrow"
            size={17}
            stroke="#FFFFFF"
          />
        </button>
      </main>
    </div>
  );
}

function Header({ onBack, right }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <button
          style={styles.backButton}
          onClick={onBack}
        >
          <Icon name="back" size={20} />
        </button>

        <div style={{ flex: 1 }}>
          <div style={styles.brand}>
            ILS RANKER
          </div>

          <div style={styles.tagline}>
            KNOW YOUR POTENTIAL
          </div>
        </div>

        <div style={styles.headerRight}>
          {right}
        </div>
      </div>
    </header>
  );
}

function Breakdown({ label, value, color }) {
  return (
    <div style={styles.breakdownItem}>
      <div
        style={{
          ...styles.breakdownDot,
          background: color,
        }}
      />

      <div>
        <div style={styles.breakdownValue}>
          {value}
        </div>

        <div style={styles.breakdownLabel}>
          {label}
        </div>
      </div>
    </div>
  );
}

function ReviewMeta({ label, value }) {
  return (
    <div style={styles.reviewMeta}>
      <div style={styles.reviewMetaLabel}>
        {label}
      </div>

      <div style={styles.reviewMetaValue}>
        {value}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: C.mint,
    color: C.navy,
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: C.white,
    borderBottom: `1px solid ${C.border}`,
  },

  headerInner: {
    maxWidth: 920,
    margin: "0 auto",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brand: {
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: 1,
    lineHeight: 1,
  },

  tagline: {
    marginTop: 5,
    color: C.muted,
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  headerRight: {
    color: C.green,
    fontSize: 10.5,
    fontWeight: 900,
  },

  container: {
    width: "100%",
    maxWidth: 920,
    margin: "0 auto",
    padding: "28px 20px 44px",
    boxSizing: "border-box",
  },

  kicker: {
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.1,
    marginBottom: 6,
  },

  title: {
    margin: 0,
    fontSize: 29,
    lineHeight: 1.18,
    fontWeight: 900,
    letterSpacing: -0.7,
  },

  subtitle: {
    margin: "8px 0 0",
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 1.55,
    maxWidth: 660,
  },

  summaryCard: {
    marginTop: 21,
    padding: 18,
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 20,
    boxShadow: "0 7px 21px rgba(8,47,60,0.045)",
  },

  summaryTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  summaryEyebrow: {
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  summaryValue: {
    marginTop: 4,
    fontSize: 34,
    fontWeight: 900,
  },

  summaryText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 10.5,
    lineHeight: 1.45,
  },

  accuracyCircle: {
    width: 86,
    height: 86,
    borderRadius: "50%",
    background:
      "conic-gradient(#007050 0 72%, #EAF5F1 72% 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  accuracyInner: {
    width: 63,
    height: 63,
    borderRadius: "50%",
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.green,
    fontSize: 15,
    fontWeight: 900,
  },

  breakdown: {
    marginTop: 17,
    paddingTop: 15,
    borderTop: `1px solid ${C.border}`,
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(100px, 1fr))",
    gap: 9,
  },

  breakdownItem: {
    display: "flex",
    alignItems: "center",
    gap: 7,
  },

  breakdownDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },

  breakdownValue: {
    fontSize: 14,
    fontWeight: 900,
  },

  breakdownLabel: {
    marginTop: 2,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  sectionHeader: {
    marginTop: 25,
    marginBottom: 10,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 900,
  },

  sectionSubtitle: {
    margin: "4px 0 0",
    color: C.muted,
    fontSize: 10,
  },

  filterButton: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    border: `1px solid ${C.border}`,
    borderRadius: 9,
    background: C.white,
    color: C.navy,
    padding: "8px 10px",
    fontSize: 9.5,
    fontWeight: 800,
    cursor: "pointer",
  },

  filterBar: {
    display: "flex",
    gap: 6,
    overflowX: "auto",
    paddingBottom: 2,
  },

  filterPill: {
    border: `1px solid ${C.border}`,
    background: C.white,
    color: C.muted,
    borderRadius: 9,
    padding: "7px 10px",
    fontSize: 9,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  filterPillActive: {
    background: C.green,
    borderColor: C.green,
    color: C.white,
  },

  list: {
    marginTop: 11,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  questionRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 13,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    background: C.white,
    textAlign: "left",
    cursor: "pointer",
  },

  questionNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 9,
    fontWeight: 900,
    flexShrink: 0,
  },

  questionBody: {
    flex: 1,
    minWidth: 0,
  },

  questionRowTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  chapterName: {
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 6px",
    borderRadius: 6,
    fontSize: 7.5,
    fontWeight: 900,
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },

  questionPreview: {
    marginTop: 5,
    color: C.navy,
    fontSize: 11,
    fontWeight: 750,
    lineHeight: 1.4,
  },

  questionMeta: {
    marginTop: 6,
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  timeMeta: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  },

  rowArrow: {
    width: 28,
    height: 28,
    borderRadius: 9,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  insightCard: {
    marginTop: 17,
    padding: 16,
    borderRadius: 18,
    background: C.softMint,
    display: "flex",
    alignItems: "flex-start",
    gap: 11,
  },

  insightIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  insightEyebrow: {
    color: C.green,
    fontSize: 8,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  insightTitle: {
    marginTop: 4,
    fontSize: 12.5,
    fontWeight: 900,
  },

  insightText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 10,
    lineHeight: 1.5,
  },

  emptyCard: {
    marginTop: 12,
    padding: "35px 20px",
    borderRadius: 18,
    background: C.white,
    border: `1px solid ${C.border}`,
    textAlign: "center",
  },

  emptyIcon: {
    width: 51,
    height: 51,
    borderRadius: 15,
    margin: "0 auto",
    background: "#F7F9F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: 900,
  },

  emptyText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9.5,
  },

  primaryButton: {
    width: "100%",
    marginTop: 18,
    padding: "14px 16px",
    border: "none",
    borderRadius: 13,
    background: C.green,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,112,80,0.15)",
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    color: C.muted,
    fontSize: 9.5,
    marginBottom: 15,
  },

  reviewTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
  },

  reviewStatus: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 9px",
    borderRadius: 8,
    fontSize: 9,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  reviewCard: {
    marginTop: 20,
    padding: 18,
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 19,
    boxShadow: "0 6px 18px rgba(8,47,60,0.04)",
  },

  questionLabel: {
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    letterSpacing: 0.9,
  },

  questionText: {
    margin: "9px 0 0",
    fontSize: 19,
    lineHeight: 1.45,
    fontWeight: 900,
  },

  answerBlock: {
    marginTop: 18,
  },

  answerLabel: {
    color: C.muted,
    fontSize: 8,
    letterSpacing: 0.7,
    fontWeight: 900,
  },

  answerValue: {
    marginTop: 6,
    padding: 12,
    borderRadius: 11,
    fontSize: 11.5,
    fontWeight: 850,
  },

  reviewMetaGrid: {
    marginTop: 17,
    paddingTop: 15,
    borderTop: `1px solid ${C.border}`,
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 10,
  },

  reviewMeta: {
    padding: 10,
    borderRadius: 10,
    background: C.mint,
  },

  reviewMetaLabel: {
    color: C.muted,
    fontSize: 8,
    fontWeight: 700,
  },

  reviewMetaValue: {
    marginTop: 3,
    fontSize: 10.5,
    fontWeight: 900,
  },

  conceptCard: {
    marginTop: 12,
    padding: 15,
    borderRadius: 17,
    background: C.softMint,
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },

  conceptIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  conceptTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  conceptText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 10,
    lineHeight: 1.5,
  },
};