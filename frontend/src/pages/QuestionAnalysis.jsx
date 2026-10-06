import React, { useMemo, useState } from "react";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
  softMint: "rgba(16, 231, 157, 0.12)",
  white: "rgba(255, 255, 255, 0.05)",
  muted: "rgba(226, 232, 240, 0.65)",
  border: "rgba(255, 255, 255, 0.12)",
  red: "#FF5E62",
  blue: "#38BDF8",
  purple: "#A855F7",
  yellow: "#FBBF24",
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

export default function QuestionAnalysis({ onBack, onOpenSection }) {
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
        <div style={styles.mobileShell}>
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
            type="button"
            style={styles.secondaryBackButton}
            onClick={() => setSelectedQuestion(null)}
          >
            ← Back to Question Analysis
          </button>
        </main>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
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

        {onOpenSection && (
          <button
            type="button"
            style={styles.primaryButton}
            onClick={() => onOpenSection("weakness-insights")}
          >
            <span>View Weakness Insights →</span>
          </button>
        )}

        <button
          type="button"
          style={styles.secondaryBackButton}
          onClick={onBack}
        >
          ← Back to Chapter Analysis
        </button>
      </main>
      </div>
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
    minHeight: "100dvh",
    background: C.mint,
    color: C.navy,
    display: "flex",
    justifyContent: "center",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  mobileShell: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "100dvh",
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(6, 49, 43, 0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: `1px solid ${C.border}`,
  },

  headerInner: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxSizing: "border-box",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.08)",
    color: "#10E79D",
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
    fontSize: 12,
    fontWeight: 800,
  },

  container: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    padding: "16px 16px 125px",
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
    fontSize: 22,
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: -0.5,
  },

  subtitle: {
    margin: "6px 0 0",
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 1.5,
  },

  summaryCard: {
    marginTop: 16,
    padding: 16,
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 18,
    boxShadow: "0 7px 21px rgba(8,47,60,0.045)",
  },

  summaryTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
  },

  summaryEyebrow: {
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  summaryValue: {
    marginTop: 4,
    fontSize: 32,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  summaryText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 11.5,
    lineHeight: 1.45,
  },

  accuracyCircle: {
    width: 82,
    height: 82,
    borderRadius: "50%",
    background:
      "conic-gradient(#10E79D 0 80%, rgba(255, 255, 255, 0.08) 80% 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  accuracyInner: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: "#031D1B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#10E79D",
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
    borderRadius: 10,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  filterPillActive: {
    background: "#10E79D",
    borderColor: "#10E79D",
    color: "#010F0E",
    fontWeight: 800,
  },

  list: {
    marginTop: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  questionRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 15,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    background: C.white,
    textAlign: "left",
    cursor: "pointer",
  },

  questionNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 800,
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
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "4px 8px",
    borderRadius: 7,
    fontSize: 11,
    fontWeight: 700,
    textTransform: "capitalize",
    whiteSpace: "nowrap",
  },

  questionPreview: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: 650,
    lineHeight: 1.45,
  },

  questionMeta: {
    marginTop: 7,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 11.5,
    fontWeight: 600,
  },

  timeMeta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  rowArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  insightCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    background: "rgba(16, 231, 157, 0.08)",
    border: "1px solid rgba(16, 231, 157, 0.2)",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
  },

  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  insightEyebrow: {
    color: C.green,
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0.8,
  },

  insightTitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  insightText: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: 12,
    lineHeight: 1.5,
  },

  emptyCard: {
    marginTop: 14,
    padding: "36px 20px",
    borderRadius: 18,
    background: C.white,
    border: `1px solid ${C.border}`,
    textAlign: "center",
  },

  emptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: 800,
    color: "#FFFFFF",
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
    borderRadius: 14,
    background: "linear-gradient(135deg, #10E79D 0%, #007050 100%)",
    color: "#010F0E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(16, 231, 157, 0.35)",
  },

  secondaryBackButton: {
    width: "100%",
    marginTop: 10,
    padding: "13px 16px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 13,
    background: "rgba(255, 255, 255, 0.05)",
    color: "#10E79D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
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