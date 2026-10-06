import React, { useEffect, useState, useMemo } from "react";

const subjectIconMap = {
  biology: "🌿",
  chemistry: "⚗",
  physics: "⚛",
  mathematics: "∑",
  english: "A",
  "general-test": "▥",
};

function getSubjectPresentation(subjectId, subjectName, accuracy, attempted) {
  const rawId = String(subjectId || subjectName || "").toLowerCase().trim();
  const icon = subjectIconMap[rawId] || "•";

  if (attempted === 0 || attempted === undefined || attempted === null) {
    return {
      id: rawId,
      name: subjectName || (rawId.charAt(0).toUpperCase() + rawId.slice(1)),
      value: 0,
      hasData: false,
      status: "Ready",
      statusColor: "#10E79D",
      statusBg: "rgba(16, 231, 157, 0.12)",
      icon,
    };
  }

  const acc = Math.round(Number(accuracy) || 0);
  let status = "Needs Work";
  let statusColor = "#F87171";
  let statusBg = "rgba(248, 113, 113, 0.15)";

  if (acc >= 75) {
    status = "Strong";
    statusColor = "#10E79D";
    statusBg = "rgba(16, 231, 157, 0.15)";
  } else if (acc >= 50) {
    status = "Good";
    statusColor = "#38BDF8";
    statusBg = "rgba(56, 189, 248, 0.15)";
  }

  return {
    id: rawId,
    name: subjectName || (rawId.charAt(0).toUpperCase() + rawId.slice(1)),
    value: acc,
    hasData: true,
    status,
    statusColor,
    statusBg,
    icon,
  };
}

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
  activeExam,
  onActiveExamChange,
  onOpenSection,
}) {
  const name =
    profile?.name?.trim() || "Student";

  const firstName =
    name.split(" ")[0];

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: "Good Morning", emoji: "👋" };
    }
    if (hour >= 12 && hour < 17) {
      return { text: "Good Afternoon", emoji: "☀️" };
    }
    if (hour >= 17 && hour < 22) {
      return { text: "Good Evening", emoji: "🌆" };
    }
    return { text: "Good Night", emoji: "🌙" };
  }, []);

  const selectedExamIds = Array.isArray(
    profile?.exams
  )
    ? profile.exams
    : [];

  const selectedSubjectIds = Array.isArray(
    profile?.subjects
  )
    ? profile.subjects
    : [];

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

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Fetch real analytics from backend
  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      try {
        const mobile =
          profile?.mobile ||
          localStorage.getItem("ils_user_mobile") ||
          "";

        const email =
          profile?.email ||
          "";

        const googleId =
          profile?.googleId ||
          "";

        const params = new URLSearchParams();
        if (mobile) params.set("mobile", mobile);
        if (email) params.set("email", email);
        if (googleId) params.set("googleId", googleId);

        const res = await fetch(`${API_URL}/api/analytics?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load analytics");
        const data = await res.json();
        if (!cancelled && data?.success) {
          setAnalytics(data);
        }
      } catch (err) {
        console.warn("Dashboard analytics fetch notice:", err);
      } finally {
        if (!cancelled) setLoadingAnalytics(false);
      }
    }

    void loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [
    API_URL,
    profile?.mobile,
    profile?.email,
    profile?.googleId,
    activeExam,
  ]);

  /*
   * Active exam:
   * 1. Use activeExam if set.
   * 2. Otherwise use the first saved exam.
   * 3. Fallback to NEET.
   */
  const selectedExamId =
    activeExam ||
    (selectedExamIds.length > 0 ? selectedExamIds[0] : "neet");

  const selectedExam =
    examNameMap[selectedExamId] ||
    "NEET UG";

  const realSubjectsFromAPI = Array.isArray(analytics?.subjects)
    ? analytics.subjects
    : [];

  const preparationSubjects = useMemo(() => {
    // If real analytics has subjects with data, display real live performance!
    if (realSubjectsFromAPI.length > 0) {
      return realSubjectsFromAPI.slice(0, 3).map((sub) =>
        getSubjectPresentation(
          sub.subjectId,
          sub.subjectName,
          sub.accuracy,
          sub.attempted
        )
      );
    }

    // Default based on active exam type
    const isJeeExam = selectedExamId?.includes("jee");
    const defaultIds = isJeeExam
      ? ["mathematics", "physics", "chemistry"]
      : ["biology", "chemistry", "physics"];

    return defaultIds.map((id) =>
      getSubjectPresentation(
        id,
        examNameMap[id] || (id.charAt(0).toUpperCase() + id.slice(1)),
        0,
        0
      )
    );
  }, [realSubjectsFromAPI, selectedExamId]);

  const totalCompletedTests = analytics?.overview?.totalTests || 0;
  const bestScoreVal = analytics?.overview?.bestScore || 0;
  const avgAccuracyVal = analytics?.overview?.averageAccuracy || 0;

  const open = (section) => {
    onOpenSection(section);
  };

  const handleExamChange = (event) => {
    const examId = event.target.value;

    if (!examId) {
      return;
    }

    if (
      typeof onActiveExamChange ===
      "function"
    ) {
      onActiveExamChange(examId);
    }
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
                {greeting.text}, {firstName} {greeting.emoji}
              </h1>

              {/* ACTIVE EXAM PILL - Shows strictly the one selected exam */}
              <div
                style={styles.activeExamPill}
                onClick={() => open("rank-predictor")}
                title="Active Exam • Tap to switch"
                role="button"
                tabIndex={0}
              >
                <span style={styles.activeExamDot} />
                <span>{selectedExam} • 2026</span>
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
                  {totalCompletedTests > 0
                    ? `${totalCompletedTests} Tests Taken • Best: ${bestScoreVal} • Acc: ${avgAccuracyVal}%`
                    : "Analyse • Predict • Improve"}
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
              background="rgba(16, 231, 157, 0.15)"
              color="#10E79D"
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
              background="rgba(56, 189, 248, 0.15)"
              color="#38BDF8"
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
              background="rgba(168, 85, 247, 0.15)"
              color="#C084FC"
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
                    style={styles.prepCard}
                    onClick={() =>
                      open("analysis")
                    }
                  >
                    <div style={styles.prepIcon}>
                      {subject.icon}
                    </div>

                    <div style={styles.prepName}>
                      {subject.name}
                    </div>

                    <div style={styles.prepValue}>
                      {subject.hasData ? `${subject.value}%` : "0%"}
                    </div>

                    <div
                      style={{
                        ...styles.prepStatus,
                        color: subject.statusColor,
                        background: subject.statusBg,
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
    background: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    userSelect: "none",
  },

  phone: {
    width: "100%",
    maxWidth: "430px",
    height: "100vh",
    height: "100dvh",
    minHeight: 0,
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
    position: "relative",
  },

  header: {
    height: "64px",
    minHeight: "64px",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(6, 49, 43, 0.82)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    flexShrink: 0,
    zIndex: 10,
  },

  menuButton: {
    width: "38px",
    height: "38px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.06)",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
  },

  menuLine: {
    display: "block",
    width: "18px",
    height: "2px",
    borderRadius: "4px",
    background: "#FFFFFF",
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1,
  },

  brandTop: {
    fontSize: "17px",
    fontWeight: 900,
    color: "#FFFFFF",
    letterSpacing: "-0.3px",
  },

  brandBottom: {
    marginTop: "3px",
    fontSize: "8px",
    fontWeight: 800,
    letterSpacing: "1.8px",
    color: "#10E79D",
  },

  avatar: {
    width: "38px",
    height: "38px",
    border: "1.5px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #10E79D, #059669)",
    color: "#022019",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 0 14px rgba(16, 231, 157, 0.4)",
  },

  content: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "16px 16px 12px",
    boxSizing: "border-box",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
  },

  greeting: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 16,
  },

  greetingText: {
    minWidth: 0,
    flex: 1,
  },

  welcome: {
    fontSize: "9px",
    fontWeight: 800,
    letterSpacing: "1px",
    color: "#6EE7B7",
    marginBottom: "4px",
    textTransform: "uppercase",
  },

  greetingTitle: {
    margin: 0,
    fontSize: "20px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: "#FFFFFF",
    letterSpacing: "-0.4px",
  },

  /* ACTIVE EXAM PILL */
  activeExamPill: {
    marginTop: "8px",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "6px 14px 6px 10px",
    borderRadius: "12px",
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    border: "1px solid rgba(52, 211, 153, 0.35)",
    color: "#6EE7B7",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
    boxSizing: "border-box",
    backdropFilter: "blur(10px)",
    transition: "background 0.15s ease",
  },

  activeExamDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: "#10E79D",
    boxShadow: "0 0 8px #10E79D",
    flexShrink: 0,
  },

  bellButton: {
    width: 38,
    height: 38,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.06)",
    color: "#34D399",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    backdropFilter: "blur(10px)",
  },

  testCard: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    border: "1px solid rgba(52, 211, 153, 0.35)",
    borderRadius: "20px",
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.65) 100%)",
    color: "#FFFFFF",
    padding: "18px",
    boxSizing: "border-box",
    textAlign: "left",
    boxShadow: "0 14px 32px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(16px)",
    marginBottom: 16,
  },

  testDecorOne: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: "50%",
    right: -40,
    top: -50,
    background: "radial-gradient(circle, rgba(16, 231, 157, 0.2) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  testDecorTwo: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: "50%",
    right: 40,
    bottom: -40,
    background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
    pointerEvents: "none",
  },

  testTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    position: "relative",
    zIndex: 1,
  },

  testIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.12)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.25)",
  },

  testTitle: {
    fontSize: "20px",
    lineHeight: 1.15,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  testSubtitle: {
    marginTop: "4px",
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(226, 232, 240, 0.8)",
  },

  startButton: {
    position: "relative",
    zIndex: 2,
    marginTop: 15,
    marginLeft: 56,
    height: 38,
    padding: "0 22px",
    border: 0,
    borderRadius: 12,
    background: "linear-gradient(135deg, #10E79D 0%, #059669 100%)",
    color: "#022019",
    fontSize: "12px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(16, 231, 157, 0.35)",
  },

  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
    marginBottom: 20,
  },

  quickCard: {
    minWidth: 0,
    minHeight: 92,
    border: "1px solid rgba(255, 255, 255, 0.09)",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.045)",
    padding: "12px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.2s ease, background 0.2s ease",
  },

  quickIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.2)",
  },

  quickTitle: {
    color: "#FFFFFF",
    fontSize: "10.5px",
    lineHeight: 1.2,
    fontWeight: 800,
    textAlign: "center",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 11,
  },

  sectionKicker: {
    fontSize: "8.5px",
    fontWeight: 800,
    letterSpacing: "1px",
    color: "#6EE7B7",
    marginBottom: 3,
    textTransform: "uppercase",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: "#FFFFFF",
    letterSpacing: "-0.3px",
  },

  viewButton: {
    border: 0,
    background: "transparent",
    color: "#10E79D",
    padding: "4px 2px",
    fontSize: "11px",
    fontWeight: 800,
    cursor: "pointer",
  },

  preparationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 8,
    marginBottom: 20,
  },

  prepCard: {
    minWidth: 0,
    minHeight: 132,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.05)",
    padding: "14px 8px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
    transition: "transform 0.2s ease, background 0.2s ease",
  },

  prepIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "17px",
    fontWeight: 900,
    marginBottom: 8,
    color: "#10E79D",
  },

  prepName: {
    color: "#FFFFFF",
    fontSize: "11px",
    lineHeight: 1.15,
    fontWeight: 800,
    textAlign: "center",
  },

  prepValue: {
    marginTop: 6,
    color: "#10E79D",
    fontSize: "19px",
    lineHeight: 1,
    fontWeight: 900,
  },

  prepStatus: {
    marginTop: 6,
    fontSize: "9px",
    lineHeight: 1,
    fontWeight: 800,
    textAlign: "center",
    padding: "3px 8px",
    borderRadius: "6px",
  },

  upcomingCard: {
    width: "100%",
    minHeight: 64,
    border: "1px solid rgba(255, 255, 255, 0.09)",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.045)",
    padding: 12,
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxSizing: "border-box",
    backdropFilter: "blur(12px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
  },

  upcomingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(56, 189, 248, 0.15)",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    color: "#38BDF8",
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
    color: "#FFFFFF",
    fontSize: "13px",
    lineHeight: 1.25,
    fontWeight: 800,
  },

  upcomingMeta: {
    display: "block",
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.6)",
    fontSize: "10.5px",
  },

  upcomingStart: {
    height: 34,
    padding: "0 16px",
    border: 0,
    borderRadius: 10,
    background: "linear-gradient(135deg, #10E79D, #059669)",
    color: "#022019",
    fontSize: "11px",
    fontWeight: 900,
    cursor: "pointer",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(16, 231, 157, 0.3)",
  },

  bottomSpace: {
    height: 12,
  },

  bottomNav: {
    height: 68,
    minHeight: 68,
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(3, 29, 27, 0.92)",
    backdropFilter: "blur(18px)",
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    padding: "4px 3px 5px",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 10,
  },

  navButton: {
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: "rgba(226, 232, 240, 0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    cursor: "pointer",
    fontSize: "9px",
    fontWeight: 750,
    padding: "3px 0",
    transition: "color 0.2s ease",
  },

  navActive: {
    color: "#10E79D",
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