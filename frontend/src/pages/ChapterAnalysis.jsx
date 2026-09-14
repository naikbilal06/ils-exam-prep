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
  yellow: "#C78A13",
  blue: "#3679C9",
  purple: "#7652C8",
};

const subjects = [
  {
    name: "Physics",
    icon: "⚛",
    color: C.blue,
    score: 78,
    chapters: [
      { name: "Mechanics", score: 84, questions: 42 },
      { name: "Current Electricity", score: 28, questions: 25 },
      { name: "Electrostatics", score: 42, questions: 22 },
      { name: "Optics", score: 76, questions: 31 },
      { name: "Modern Physics", score: 34, questions: 18 },
    ],
  },
  {
    name: "Chemistry",
    icon: "◇",
    color: C.red,
    score: 64,
    chapters: [
      { name: "Physical Chemistry", score: 72, questions: 34 },
      { name: "Organic Chemistry", score: 58, questions: 38 },
      { name: "Inorganic Chemistry", score: 61, questions: 35 },
      { name: "Chemical Bonding", score: 68, questions: 26 },
      { name: "Thermodynamics", score: 49, questions: 21 },
    ],
  },
  {
    name: "Biology",
    icon: "✦",
    color: C.green,
    score: 91,
    chapters: [
      { name: "Human Physiology", score: 94, questions: 45 },
      { name: "Genetics", score: 89, questions: 37 },
      { name: "Cell Biology", score: 92, questions: 32 },
      { name: "Ecology", score: 88, questions: 29 },
      { name: "Plant Physiology", score: 81, questions: 31 },
    ],
  },
  {
    name: "Mathematics",
    icon: "Σ",
    color: C.purple,
    score: 72,
    chapters: [
      { name: "Algebra", score: 76, questions: 35 },
      { name: "Calculus", score: 69, questions: 42 },
      { name: "Coordinate Geometry", score: 74, questions: 27 },
      { name: "Probability", score: 58, questions: 19 },
      { name: "Vectors & 3D", score: 83, questions: 24 },
    ],
  },
  {
    name: "English",
    icon: "A",
    color: C.yellow,
    score: 58,
    chapters: [
      { name: "Reading Comprehension", score: 64, questions: 24 },
      { name: "Vocabulary", score: 52, questions: 31 },
      { name: "Grammar", score: 61, questions: 28 },
      { name: "Verbal Ability", score: 55, questions: 22 },
    ],
  },
  {
    name: "General Test",
    icon: "▦",
    color: C.green,
    score: 66,
    chapters: [
      { name: "Logical Reasoning", score: 71, questions: 31 },
      { name: "Quantitative Ability", score: 63, questions: 27 },
      { name: "General Awareness", score: 59, questions: 35 },
      { name: "Data Interpretation", score: 72, questions: 18 },
    ],
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

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),

    trend: (
      <>
        <path d="M4 17l6-6 4 4 6-7" />
        <path d="M16 8h4v4" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l3-4 3 2 5-6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function getStatus(score) {
  if (score >= 85) {
    return {
      label: "Excellent",
      color: C.green,
      bg: C.mint,
    };
  }

  if (score >= 70) {
    return {
      label: "Good",
      color: C.blue,
      bg: "#EEF5FC",
    };
  }

  if (score >= 50) {
    return {
      label: "Needs Practice",
      color: C.yellow,
      bg: "#FFF8E8",
    };
  }

  return {
    label: "Weak Area",
    color: C.red,
    bg: "#FFF0F1",
  };
}

export default function ChapterAnalysis({
  onBack,
  onOpenSection,
}) {
  const [selectedSubject, setSelectedSubject] = useState(0);

  const subject = subjects[selectedSubject];

  const overall = useMemo(() => {
    return Math.round(
      subjects.reduce((sum, item) => sum + item.score, 0) /
        subjects.length
    );
  }, []);

  const weakChapters = subject.chapters.filter(
    (chapter) => chapter.score < 60
  );

  const strongChapters = subject.chapters.filter(
    (chapter) => chapter.score >= 80
  );

  const openPractice = () => {
    onOpenSection?.("practice");
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
              <Icon name="back" size={20} />
            </button>

            <div style={styles.brandWrap}>
              <div style={styles.brand}>ILS RANKER</div>

              <div style={styles.tagline}>
                KNOW YOUR POTENTIAL
              </div>
            </div>

            <div style={styles.headerLabel}>
              Analysis
            </div>
          </div>
        </header>

        <main style={styles.container}>
          <div style={styles.kicker}>
            DETAILED PERFORMANCE
          </div>

          <h1 style={styles.title}>
            Chapter Analysis
          </h1>

          <p style={styles.subtitle}>
            Understand exactly where you are performing well
            and which chapters need more attention.
          </p>

          <section style={styles.overviewCard}>
            <div style={styles.overviewLeft}>
              <div style={styles.donut}>
                <div style={styles.donutInner}>
                  <div style={styles.donutValue}>
                    {overall}%
                  </div>

                  <div style={styles.donutLabel}>
                    Overall
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.overviewMain}>
              <div style={styles.overviewEyebrow}>
                OVERALL PREPARATION
              </div>

              <div style={styles.overviewTitle}>
                Good Progress
              </div>

              <div style={styles.overviewText}>
                Your overall preparation is moving in the
                right direction. Focus on low-scoring
                chapters to improve your performance.
              </div>

              <div style={styles.overviewStats}>
                <MiniStat
                  label="Subjects"
                  value="6"
                />

                <MiniStat
                  label="Chapters"
                  value="28"
                />

                <MiniStat
                  label="Accuracy"
                  value="72%"
                />
              </div>
            </div>
          </section>

          <div style={styles.sectionHeading}>
            <div>
              <h2 style={styles.sectionTitle}>
                Select Subject
              </h2>

              <p style={styles.sectionSubtitle}>
                View chapter-wise performance
              </p>
            </div>
          </div>

          <div style={styles.subjectScroller}>
            {subjects.map((item, index) => {
              const active =
                selectedSubject === index;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() =>
                    setSelectedSubject(index)
                  }
                  style={{
                    ...styles.subjectButton,
                    ...(active
                      ? styles.activeSubject
                      : {}),
                  }}
                >
                  <span
                    style={{
                      ...styles.subjectIcon,
                      color: active
                        ? C.white
                        : item.color,
                    }}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <section style={styles.chapterCard}>
            <div style={styles.chapterHeader}>
              <div style={styles.chapterHeaderLeft}>
                <div
                  style={{
                    ...styles.largeSubjectIcon,
                    color: subject.color,
                  }}
                >
                  {subject.icon}
                </div>

                <div>
                  <div style={styles.chapterEyebrow}>
                    {subject.name.toUpperCase()}
                  </div>

                  <div style={styles.chapterTitle}>
                    Chapter Performance
                  </div>
                </div>
              </div>

              <div style={styles.subjectScore}>
                {subject.score}%
              </div>
            </div>

            <div style={styles.subjectProgressTrack}>
              <div
                style={{
                  ...styles.subjectProgressFill,
                  width: `${subject.score}%`,
                  background: subject.color,
                }}
              />
            </div>

            <div style={styles.chapterList}>
              {subject.chapters.map(
                (chapter, index) => {
                  const status = getStatus(
                    chapter.score
                  );

                  return (
                    <div
                      key={chapter.name}
                      style={{
                        ...styles.chapterRow,
                        borderBottom:
                          index ===
                          subject.chapters.length - 1
                            ? "none"
                            : `1px solid ${C.border}`,
                      }}
                    >
                      <div style={styles.chapterNumber}>
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div style={styles.chapterBody}>
                        <div
                          style={
                            styles.chapterNameRow
                          }
                        >
                          <div
                            style={styles.chapterName}
                          >
                            {chapter.name}
                          </div>

                          <div
                            style={{
                              ...styles.status,
                              color: status.color,
                              background:
                                status.bg,
                            }}
                          >
                            {status.label}
                          </div>
                        </div>

                        <div style={styles.chapterMeta}>
                          {chapter.questions} Questions
                        </div>

                        <div
                          style={
                            styles.chapterProgressTrack
                          }
                        >
                          <div
                            style={{
                              ...styles.chapterProgressFill,
                              width: `${chapter.score}%`,
                              background:
                                status.color,
                            }}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          ...styles.chapterScore,
                          color: status.color,
                        }}
                      >
                        {chapter.score}%
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          <div style={styles.insightGrid}>
            <InsightCard
              icon="trend"
              title="Strong Chapters"
              number={strongChapters.length}
              text="Keep revising these chapters to maintain your edge."
              color={C.green}
            />

            <InsightCard
              icon="target"
              title="Needs Attention"
              number={weakChapters.length}
              text="Prioritise these chapters in your next study session."
              color={C.red}
            />
          </div>

          <section style={styles.recommendationCard}>
            <div style={styles.recommendationIcon}>
              <Icon
                name="target"
                size={21}
                stroke={C.green}
              />
            </div>

            <div style={styles.recommendationMain}>
              <div
                style={styles.recommendationEyebrow}
              >
                RECOMMENDED NEXT STEP
              </div>

              <div style={styles.recommendationTitle}>
                Focus on your weakest chapters
              </div>

              <div style={styles.recommendationText}>
                Start with{" "}
                <strong>
                  {weakChapters[0]?.name ||
                    "your revision"}
                </strong>{" "}
                and then attempt a topic test to
                measure improvement.
              </div>

              <button
                type="button"
                style={styles.practiceButton}
                onClick={openPractice}
              >
                Practice Now

                <Icon
                  name="arrow"
                  size={15}
                  stroke={C.green}
                />
              </button>
            </div>
          </section>

          <button
            type="button"
            style={styles.dashboardButton}
            onClick={onBack}
          >
            <Icon
              name="chart"
              size={17}
              stroke="#FFFFFF"
            />

            Back to Dashboard
          </button>
        </main>
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div style={styles.miniStat}>
      <div style={styles.miniValue}>{value}</div>
      <div style={styles.miniLabel}>{label}</div>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  number,
  text,
  color,
}) {
  return (
    <div style={styles.insightCard}>
      <div
        style={{
          ...styles.insightIcon,
          color,
        }}
      >
        <Icon
          name={icon}
          size={18}
          stroke={color}
        />
      </div>

      <div style={styles.insightTitle}>
        {title}
      </div>

      <div
        style={{
          ...styles.insightNumber,
          color,
        }}
      >
        {number}
      </div>

      <div style={styles.insightText}>
        {text}
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
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box",
  },

  mobileShell: {
    width: "100%",
    maxWidth: "390px",
    minHeight: "100dvh",
    background: C.white,
    overflow: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: C.white,
    borderBottom: `1px solid ${C.border}`,
    flexShrink: 0,
  },

  headerInner: {
    width: "100%",
    minHeight: "64px",
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
    border: `1px solid ${C.border}`,
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
    fontSize: 10,
    fontWeight: 900,
    color: C.green,
    flexShrink: 0,
  },

  container: {
    width: "100%",
    maxWidth: "390px",
    margin: "0 auto",
    padding: "20px 15px 105px",
    boxSizing: "border-box",
    flex: 1,
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },

  kicker: {
    fontSize: 9,
    letterSpacing: 1.1,
    color: C.green,
    fontWeight: 900,
    marginBottom: 6,
  },

  title: {
    margin: 0,
    fontSize: 25,
    fontWeight: 900,
    letterSpacing: -0.6,
    lineHeight: 1.15,
  },

  subtitle: {
    margin: "8px 0 0",
    color: C.muted,
    fontSize: 11.5,
    lineHeight: 1.5,
  },

  overviewCard: {
    marginTop: 18,
    padding: 15,
    background: C.white,
    borderRadius: 19,
    border: `1px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    gap: 14,
    boxSizing: "border-box",
  },

  overviewLeft: {
    flexShrink: 0,
  },

  overviewMain: {
    flex: 1,
    minWidth: 0,
  },

  donut: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    background:
      "conic-gradient(#007050 0 72%, #EAF5F1 72% 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  donutInner: {
    width: 68,
    height: 68,
    borderRadius: "50%",
    background: C.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  donutValue: {
    fontSize: 20,
    fontWeight: 900,
    color: C.navy,
    lineHeight: 1,
  },

  donutLabel: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8,
    fontWeight: 750,
  },

  overviewEyebrow: {
    color: C.green,
    fontSize: 7.5,
    letterSpacing: 0.8,
    fontWeight: 900,
  },

  overviewTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 900,
  },

  overviewText: {
    marginTop: 5,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.5,
  },

  overviewStats: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 10,
  },

  miniStat: {
    minWidth: 48,
  },

  miniValue: {
    fontSize: 12,
    fontWeight: 900,
    color: C.green,
  },

  miniLabel: {
    marginTop: 2,
    fontSize: 7.5,
    color: C.muted,
    fontWeight: 700,
  },

  sectionHeading: {
    marginTop: 20,
    marginBottom: 9,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 900,
  },

  sectionSubtitle: {
    margin: "4px 0 0",
    color: C.muted,
    fontSize: 9.5,
  },

  subjectScroller: {
    display: "flex",
    gap: 7,
    overflowX: "auto",
    paddingBottom: 2,
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "touch",
  },

  subjectButton: {
    border: `1px solid ${C.border}`,
    background: C.white,
    borderRadius: 11,
    padding: "8px 10px",
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: C.muted,
    fontSize: 9.5,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  activeSubject: {
    borderColor: C.green,
    background: C.green,
    color: C.white,
  },

  subjectIcon: {
    fontSize: 14,
    fontWeight: 900,
  },

  chapterCard: {
    marginTop: 11,
    background: C.white,
    borderRadius: 19,
    border: `1px solid ${C.border}`,
    overflow: "hidden",
  },

  chapterHeader: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  chapterHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    minWidth: 0,
  },

  largeSubjectIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 900,
    flexShrink: 0,
  },

  chapterEyebrow: {
    fontSize: 7.5,
    letterSpacing: 0.8,
    color: C.green,
    fontWeight: 900,
  },

  chapterTitle: {
    marginTop: 3,
    fontSize: 12.5,
    fontWeight: 900,
  },

  subjectScore: {
    fontSize: 21,
    color: C.green,
    fontWeight: 900,
    flexShrink: 0,
  },

  subjectProgressTrack: {
    height: 5,
    background: C.softMint,
    margin: "0 15px",
    borderRadius: 30,
    overflow: "hidden",
  },

  subjectProgressFill: {
    height: "100%",
    borderRadius: 30,
  },

  chapterList: {
    padding: "3px 15px 5px",
  },

  chapterRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 0",
  },

  chapterNumber: {
    width: 25,
    height: 25,
    borderRadius: 7,
    background: "#F7F9F8",
    color: C.muted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8,
    fontWeight: 900,
    flexShrink: 0,
  },

  chapterBody: {
    flex: 1,
    minWidth: 0,
  },

  chapterNameRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
  },

  chapterName: {
    fontSize: 10.5,
    fontWeight: 850,
    minWidth: 0,
  },

  status: {
    fontSize: 7,
    fontWeight: 900,
    padding: "4px 5px",
    borderRadius: 6,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  chapterMeta: {
    marginTop: 3,
    color: C.muted,
    fontSize: 7.5,
  },

  chapterProgressTrack: {
    marginTop: 6,
    height: 4,
    background: C.softMint,
    borderRadius: 20,
    overflow: "hidden",
  },

  chapterProgressFill: {
    height: "100%",
    borderRadius: 20,
  },

  chapterScore: {
    width: 36,
    textAlign: "right",
    fontSize: 11.5,
    fontWeight: 900,
    flexShrink: 0,
  },

  insightGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 9,
    marginTop: 11,
  },

  insightCard: {
    position: "relative",
    padding: 13,
    borderRadius: 16,
    background: C.white,
    border: `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  insightTitle: {
    marginTop: 9,
    fontSize: 9.5,
    fontWeight: 850,
  },

  insightNumber: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 21,
    fontWeight: 900,
  },

  insightText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8,
    lineHeight: 1.45,
  },

  recommendationCard: {
    marginTop: 11,
    padding: 14,
    borderRadius: 17,
    background: C.softMint,
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    boxSizing: "border-box",
  },

  recommendationIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  recommendationMain: {
    flex: 1,
    minWidth: 0,
  },

  recommendationEyebrow: {
    color: C.green,
    fontSize: 7.5,
    letterSpacing: 0.8,
    fontWeight: 900,
  },

  recommendationTitle: {
    marginTop: 4,
    fontSize: 11.5,
    fontWeight: 900,
  },

  recommendationText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9,
    lineHeight: 1.5,
  },

  practiceButton: {
    marginTop: 9,
    border: "none",
    background: C.white,
    color: C.green,
    borderRadius: 9,
    padding: "7px 9px",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 8.5,
    fontWeight: 900,
    cursor: "pointer",
  },

  dashboardButton: {
    marginTop: 16,
    width: "100%",
    border: "none",
    background: C.green,
    color: C.white,
    borderRadius: 12,
    padding: "12px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontSize: 11.5,
    fontWeight: 900,
    cursor: "pointer",
  },
};