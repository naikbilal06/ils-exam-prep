import React from "react";

const subjectProgress = {
  biology: {
    name: "Biology",
    value: 72,
    status: "Strong",
    icon: "✓",
    bg: "#EAF8F3",
    color: "#007050",
  },

  chemistry: {
    name: "Chemistry",
    value: 58,
    status: "Needs Work",
    icon: "♨",
    bg: "#FFF5E4",
    color: "#C78A13",
  },

  physics: {
    name: "Physics",
    value: 43,
    status: "Focus Here",
    icon: "♥",
    bg: "#FFF0F2",
    color: "#D94B55",
  },

  mathematics: {
    name: "Mathematics",
    value: 72,
    status: "Good",
    icon: "∑",
    bg: "#EEF4FF",
    color: "#3679C9",
  },

  english: {
    name: "English",
    value: 58,
    status: "Needs Work",
    icon: "A",
    bg: "#F3EEFF",
    color: "#7652C8",
  },

  "general-test": {
    name: "General Test",
    value: 66,
    status: "Good",
    icon: "▥",
    bg: "#EAF8F3",
    color: "#007050",
  },
};

const fallbackSubjects = [
  subjectProgress.biology,
  subjectProgress.chemistry,
  subjectProgress.physics,
];

function Icon({ type, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "test") {
    return (
      <svg {...common}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (type === "rank") {
    return (
      <svg {...common}>
        <path d="M6 18V9" />
        <path d="M12 18V5" />
        <path d="M18 18v-6" />
        <path d="M4 20h16" />
        <path d="M5 7l5-3 4 3 5-4" />
      </svg>
    );
  }

  if (type === "college") {
    return (
      <svg {...common}>
        <path d="M3 9.5 12 5l9 4.5L12 14 3 9.5Z" />
        <path d="M6 12v4.5c3.5 2 8.5 2 12 0V12" />
        <path d="M21 10v5" />
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg {...common}>
        <rect x="5" y="6" width="14" height="12" rx="3" />
        <path d="M9 11h.01" />
        <path d="M15 11h.01" />
        <path d="M9 14c1.8 1.2 4.2 1.2 6 0" />
        <path d="M12 3v2" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg {...common}>
        <path d="M3.5 10.5 12 3l8.5 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    );
  }

  if (type === "tests") {
    return (
      <svg {...common}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  if (type === "analysis") {
    return (
      <svg {...common}>
        <path d="M5 19V10" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
        <path d="M3.5 21h17" />
      </svg>
    );
  }

  if (type === "profile") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
      </svg>
    );
  }

  if (type === "bell") {
    return (
      <svg {...common}>
        <path d="M18 9a6 6 0 0 0-12 0c0 6-2.5 6-2.5 8h17c0-2-2.5-2-2.5-8" />
        <path d="M10 21h4" />
      </svg>
    );
  }

  return null;
}

function QuickAction({
  icon,
  title,
  background,
  color,
  onClick,
}) {
  return (
    <button
      type="button"
      style={styles.quickCard}
      onClick={onClick}
    >
      <div
        style={{
          ...styles.quickIcon,
          background,
          color,
        }}
      >
        <Icon type={icon} size={21} />
      </div>

      <span style={styles.quickTitle}>
        {title}
      </span>
    </button>
  );
}

export default function Dashboard({
  profile,
  onOpenSection,
}) {
  const name =
    profile?.name?.trim() || "Student";

  const firstName =
    name.split(" ")[0];

  const selectedExamIds =
    profile?.exams || [];

  const selectedSubjectIds =
    profile?.subjects || [];

  const examNameMap = {
    neet: "NEET UG",
    "jee-main": "JEE Main",
    "jee-advanced": "JEE Advanced",
    cuet: "CUET UG",
    "neet-pg": "NEET PG",
    aiims: "AIIMS",
    nursing: "Nursing",
    paramedical: "Paramedical",
  };

  const selectedExam =
    examNameMap[selectedExamIds[0]] ||
    "NEET UG";

  const selectedSubjects =
    selectedSubjectIds
      .map((id) => subjectProgress[id])
      .filter(Boolean);

  const preparationSubjects =
    selectedSubjects.length > 0
      ? selectedSubjects.slice(0, 3)
      : fallbackSubjects;

  const open = (section) => {
    onOpenSection(section);
  };

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>
        {/* HEADER */}
        <header style={styles.header}>
          <button
            type="button"
            style={styles.menuButton}
            onClick={() => open("menu")}
            aria-label="Open menu"
          >
            <span style={styles.menuLine} />
            <span style={styles.menuLine} />
            <span style={styles.menuLine} />
          </button>

          <div style={styles.brand}>
            <span style={styles.brandTop}>
              ILS RANKER
            </span>

            <span style={styles.brandBottom}>
              KNOW YOUR POTENTIAL
            </span>
          </div>

          <button
            type="button"
            style={styles.avatar}
            onClick={() => open("profile")}
            aria-label="Open profile"
          >
            {name.charAt(0).toUpperCase()}
          </button>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main style={styles.content}>
          <section style={styles.greeting}>
            <div style={styles.greetingText}>
              <div style={styles.welcome}>
                WELCOME BACK
              </div>

              <h1 style={styles.greetingTitle}>
                Good Morning, {firstName} 👋
              </h1>

              <div style={styles.greetingExam}>
                {selectedExam} • 2026
              </div>
            </div>

            <button
              type="button"
              style={styles.bellButton}
              onClick={() =>
                open("notifications")
              }
              aria-label="Notifications"
            >
              <Icon type="bell" size={21} />
            </button>
          </section>

          {/* TAKE A TEST */}
          <section style={styles.testCard}>
            <div style={styles.testDecorOne} />
            <div style={styles.testDecorTwo} />

            <div style={styles.testTitleRow}>
              <div style={styles.testIcon}>
                <Icon type="test" size={23} />
              </div>

              <div>
                <div style={styles.testTitle}>
                  Take a Test
                </div>

                <div style={styles.testSubtitle}>
                  Analyse • Predict • Improve
                </div>
              </div>
            </div>

            <button
              type="button"
              style={styles.startButton}
              onClick={() =>
                open("mock-tests")
              }
            >
              Start a Test
            </button>
          </section>

          {/* QUICK ACTIONS */}
          <section style={styles.quickGrid}>
            <QuickAction
              icon="rank"
              title={
                <>
                  Rank
                  <br />
                  Predictor
                </>
              }
              background="#EAF8F3"
              color="#007050"
              onClick={() =>
                open("rank-predictor")
              }
            />

            <QuickAction
              icon="college"
              title={
                <>
                  College
                  <br />
                  Predictor
                </>
              }
              background="#EAF8F3"
              color="#007050"
              onClick={() =>
                open("college-prediction")
              }
            />

            <QuickAction
              icon="ai"
              title={
                <>
                  AI
                  <br />
                  Counsellor
                </>
              }
              background="#F2EAFE"
              color="#7652C8"
              onClick={() =>
                open("ai-counsellor")
              }
            />
          </section>

          {/* PREPARATION */}
          <section>
            <div style={styles.sectionHeader}>
              <div>
                <div style={styles.sectionKicker}>
                  YOUR PREPARATION
                </div>

                <h2 style={styles.sectionTitle}>
                  Subject-wise Analysis
                </h2>
              </div>

              <button
                type="button"
                style={styles.viewButton}
                onClick={() =>
                  open("analysis")
                }
              >
                View All
              </button>
            </div>

            <div style={styles.preparationGrid}>
              {preparationSubjects.map(
                (subject) => (
                  <button
                    type="button"
                    key={subject.name}
                    style={{
                      ...styles.prepCard,
                      background:
                        subject.bg,
                      borderColor:
                        `${subject.color}20`,
                    }}
                    onClick={() =>
                      open("analysis")
                    }
                  >
                    <div
                      style={{
                        ...styles.prepIcon,
                        color:
                          subject.color,
                      }}
                    >
                      {subject.icon}
                    </div>

                    <div style={styles.prepName}>
                      {subject.name}
                    </div>

                    <div style={styles.prepValue}>
                      {subject.value}%
                    </div>

                    <div
                      style={{
                        ...styles.prepStatus,
                        color:
                          subject.color,
                      }}
                    >
                      {subject.status}
                    </div>
                  </button>
                )
              )}
            </div>
          </section>

          {/* UPCOMING TEST */}
          <section>
            <div style={styles.sectionHeader}>
              <div>
                <div style={styles.sectionKicker}>
                  NEXT UP
                </div>

                <h2 style={styles.sectionTitle}>
                  Upcoming Test
                </h2>
              </div>

              <button
                type="button"
                style={styles.viewButton}
                onClick={() =>
                  open("mock-tests")
                }
              >
                All Tests
              </button>
            </div>

            <div style={styles.upcomingCard}>
              <div style={styles.upcomingIcon}>
                <Icon
                  type="tests"
                  size={20}
                />
              </div>

              <div style={styles.upcomingText}>
                <span style={styles.upcomingName}>
                  Full Syllabus Mock Test
                </span>

                <span style={styles.upcomingMeta}>
                  Today • 6:00 PM
                </span>
              </div>

              <button
                type="button"
                style={styles.upcomingStart}
                onClick={() =>
                  open("mock-tests")
                }
              >
                Start
              </button>
            </div>
          </section>

          <div style={styles.bottomSpace} />
        </main>

        {/* FIXED MOBILE NAV */}
        <nav style={styles.bottomNav}>
          <button
            type="button"
            style={{
              ...styles.navButton,
              ...styles.navActive,
            }}
            onClick={() =>
              open("dashboard")
            }
          >
            <span style={styles.navIcon}>
              <Icon type="home" size={21} />
            </span>

            <span>Home</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("mock-tests")
            }
          >
            <span style={styles.navIcon}>
              <Icon type="tests" size={20} />
            </span>

            <span>Tests</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("analysis")
            }
          >
            <span style={styles.navIcon}>
              <Icon
                type="analysis"
                size={21}
              />
            </span>

            <span>Analysis</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("college-prediction")
            }
          >
            <span style={styles.navIcon}>
              <Icon
                type="college"
                size={20}
              />
            </span>

            <span>Colleges</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("profile")
            }
          >
            <span style={styles.navIcon}>
              <Icon
                type="profile"
                size={21}
              />
            </span>

            <span>Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

const styles = {
  screen: {
    width: "100%",
    minHeight: "100vh",
    minHeight: "100dvh",
    background: "#F4FBF7",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
    boxSizing: "border-box",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  phone: {
    width: "100%",
    maxWidth: "390px",
    height: "100vh",
    height: "100dvh",
    minHeight: 0,
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  header: {
    height: "64px",
    minHeight: "64px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#FFFFFF",
    borderBottom: "1px solid #EDF2F0",
    flexShrink: 0,
  },

  menuButton: {
    width: "40px",
    height: "40px",
    border: 0,
    borderRadius: "12px",
    background: "#F4FBF7",
    color: "#082F3C",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    cursor: "pointer",
  },

  menuLine: {
    display: "block",
    width: "18px",
    height: "2px",
    borderRadius: "4px",
    background: "#082F3C",
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1,
  },

  brandTop: {
    fontSize: "16px",
    fontWeight: 900,
    color: "#082F3C",
    letterSpacing: "-0.4px",
  },

  brandBottom: {
    marginTop: "4px",
    fontSize: "7.5px",
    fontWeight: 900,
    letterSpacing: "1.7px",
    color: "#007050",
  },

  avatar: {
    width: "40px",
    height: "40px",
    border: 0,
    borderRadius: "50%",
    background: "#007050",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 900,
    cursor: "pointer",
  },

  content: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "17px 15px 12px",
    boxSizing: "border-box",
    WebkitOverflowScrolling: "touch",
  },

  greeting: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 14,
  },

  greetingText: {
    minWidth: 0,
    flex: 1,
  },

  welcome: {
    fontSize: "8px",
    fontWeight: 900,
    letterSpacing: "1px",
    color: "#007050",
    marginBottom: "5px",
  },

  greetingTitle: {
    margin: 0,
    fontSize: "21px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: "#082F3C",
    letterSpacing: "-0.5px",
  },

  greetingExam: {
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: 800,
    color: "#007050",
  },

  bellButton: {
    width: 40,
    height: 40,
    border: "1px solid #E8EFEC",
    borderRadius: 12,
    background: "#FFFFFF",
    color: "#007050",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  testCard: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    border: 0,
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #008C67 0%, #007050 100%)",
    color: "#FFFFFF",
    padding: "18px",
    boxSizing: "border-box",
    textAlign: "left",
    boxShadow:
      "0 10px 24px rgba(0,112,80,0.19)",
    marginBottom: 13,
  },

  testDecorOne: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    right: -55,
    top: -65,
    background:
      "rgba(255,255,255,0.07)",
  },

  testDecorTwo: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: "50%",
    right: 34,
    bottom: -50,
    background:
      "rgba(255,255,255,0.045)",
  },

  testTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    position: "relative",
    zIndex: 1,
  },

  testIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    background:
      "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  testTitle: {
    fontSize: "20px",
    lineHeight: 1.1,
    fontWeight: 900,
  },

  testSubtitle: {
    marginTop: "4px",
    fontSize: "10px",
    fontWeight: 650,
    opacity: 0.86,
  },

  startButton: {
    position: "relative",
    zIndex: 2,
    marginTop: 15,
    marginLeft: 54,
    height: 38,
    padding: "0 19px",
    border: 0,
    borderRadius: 11,
    background: "#FFFFFF",
    color: "#007050",
    fontSize: "11.5px",
    fontWeight: 900,
    cursor: "pointer",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 8,
    marginBottom: 20,
  },

  quickCard: {
    minWidth: 0,
    minHeight: 88,
    border: "1px solid #E9EFED",
    borderRadius: 15,
    background: "#FFFFFF",
    padding: "10px 5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    cursor: "pointer",
  },

  quickIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  quickTitle: {
    color: "#183848",
    fontSize: "9.5px",
    lineHeight: 1.15,
    fontWeight: 850,
    textAlign: "center",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 9,
  },

  sectionKicker: {
    fontSize: "7.5px",
    fontWeight: 900,
    letterSpacing: "1px",
    color: "#007050",
    marginBottom: 3,
  },

  sectionTitle: {
    margin: 0,
    fontSize: "17px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: "#082F3C",
    letterSpacing: "-0.3px",
  },

  viewButton: {
    border: 0,
    background: "transparent",
    color: "#007050",
    padding: "5px 2px",
    fontSize: "9px",
    fontWeight: 900,
    cursor: "pointer",
  },

  preparationGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 7,
    marginBottom: 20,
  },

  prepCard: {
    minWidth: 0,
    minHeight: 132,
    border: "1px solid",
    borderRadius: 16,
    padding: "11px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  prepIcon: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: 900,
    marginBottom: 7,
  },

  prepName: {
    color: "#213B45",
    fontSize: "9.5px",
    lineHeight: 1.15,
    fontWeight: 850,
    textAlign: "center",
  },

  prepValue: {
    marginTop: 5,
    color: "#082F3C",
    fontSize: "16px",
    lineHeight: 1,
    fontWeight: 900,
  },

  prepStatus: {
    marginTop: 5,
    fontSize: "7.5px",
    lineHeight: 1.1,
    fontWeight: 850,
    textAlign: "center",
  },

  upcomingCard: {
    width: "100%",
    minHeight: 64,
    border: "1px solid #E7EEEB",
    borderRadius: 15,
    background: "#FFFFFF",
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxSizing: "border-box",
  },

  upcomingIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    background: "#EEF7FF",
    color: "#3679C9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  upcomingText: {
    minWidth: 0,
    flex: 1,
  },

  upcomingName: {
    display: "block",
    color: "#173747",
    fontSize: "11px",
    lineHeight: 1.2,
    fontWeight: 850,
  },

  upcomingMeta: {
    display: "block",
    marginTop: 4,
    color: "#7A898E",
    fontSize: "8.5px",
  },

  upcomingStart: {
    height: 33,
    padding: "0 13px",
    border: 0,
    borderRadius: 10,
    background: "#007050",
    color: "#FFFFFF",
    fontSize: "9.5px",
    fontWeight: 900,
    cursor: "pointer",
    flexShrink: 0,
  },

  bottomSpace: {
    height: 8,
  },

  bottomNav: {
    height: 68,
    minHeight: 68,
    borderTop: "1px solid #E7EEEB",
    background: "#FFFFFF",
    display: "grid",
    gridTemplateColumns:
      "repeat(5, minmax(0, 1fr))",
    padding: "4px 3px 5px",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 10,
  },

  navButton: {
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: "#8A9699",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    cursor: "pointer",
    fontSize: "8px",
    fontWeight: 750,
    padding: "3px 0",
  },

  navActive: {
    color: "#007050",
    fontWeight: 900,
  },

  navIcon: {
    width: 25,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};