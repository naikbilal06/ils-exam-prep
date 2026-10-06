import React, { useMemo, useState, useEffect } from "react";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
  cardBg: "rgba(6, 35, 30, 0.72)",
  border: "rgba(255, 255, 255, 0.1)",
  borderHighlight: "rgba(16, 231, 157, 0.35)",
  muted: "rgba(226, 232, 240, 0.65)",
  blue: "#38BDF8",
  purple: "#A855F7",
  yellow: "#FBBF24",
  orange: "#F97316",
};

const DEFAULT_SUBJECTS = [
  {
    id: "physics",
    name: "Physics",
    current: 78,
    target: 90,
    color: "#38BDF8",
    icon: "atom",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    current: 64,
    target: 85,
    color: "#A855F7",
    icon: "flask",
  },
  {
    id: "biology",
    name: "Biology",
    current: 91,
    target: 95,
    color: "#10E79D",
    icon: "leaf",
  },
];

const INITIAL_MILESTONES = [
  {
    id: 1,
    number: "01",
    title: "Complete 10 Mock Tests",
    text: "Build test-taking speed and exam temperament.",
    current: 7,
    target: 10,
    unit: "tests",
    completed: false,
  },
  {
    id: 2,
    number: "02",
    title: "Reach 80% Overall Accuracy",
    text: "Improve precision across all topics.",
    current: 74,
    target: 80,
    unit: "%",
    completed: false,
  },
  {
    id: 3,
    number: "03",
    title: "Finish High-Yield Syllabus",
    text: "Revise all top weightage chapters.",
    current: 20,
    target: 28,
    unit: "ch",
    completed: false,
  },
];

function Icon({ name, size = 20, stroke = "currentColor" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
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
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),
    trend: (
      <>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </>
    ),
    trophy: (
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
        <path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2Z" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    flame: (
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    ),
    atom: (
      <>
        <circle cx="12" cy="12" r="2" fill={stroke} />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-30 12 12)" />
      </>
    ),
    flask: (
      <>
        <path d="M10 2v7.31L4.1 19.3A2 2 0 0 0 5.8 22h12.4a2 2 0 0 0 1.7-2.7L14 9.31V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </>
    ),
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </>
    ),
    calc: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
      </>
    ),
    sparkles: (
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    ),
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

export default function GoalTracker({ profile, activeExam, onBack, onOpenSection }) {
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

  // Determine exam configuration
  const activeExamName =
    (activeExam && examNameMap[activeExam]) ||
    profile?.exams?.[0] ||
    "NEET UG";
  const isJee = activeExamName.toLowerCase().includes("jee");
  const maxScore = isJee ? 300 : 720;
  const defaultTarget = isJee ? 250 : 680;

  // State loaded from localStorage if available
  const [targetScore, setTargetScore] = useState(() => {
    const saved = localStorage.getItem("ils_target_score");
    return saved ? Number(saved) : defaultTarget;
  });

  const [studyHours, setStudyHours] = useState(() => {
    const saved = localStorage.getItem("ils_study_hours");
    return saved ? Number(saved) : 4;
  });

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem("ils_subjects_goals");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return DEFAULT_SUBJECTS;
  });

  const [milestones, setMilestones] = useState(() => {
    const saved = localStorage.getItem("ils_milestones");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_MILESTONES;
  });

  const [streakDays, setStreakDays] = useState(() => {
    const saved = localStorage.getItem("ils_streak_days");
    return saved ? Number(saved) : 7;
  });

  const [loggedToday, setLoggedToday] = useState(() => {
    const lastLog = localStorage.getItem("ils_last_streak_log");
    const today = new Date().toDateString();
    return lastLog === today;
  });

  const [saveToast, setSaveToast] = useState(false);

  // Auto-hide toast
  useEffect(() => {
    if (saveToast) {
      const timer = setTimeout(() => setSaveToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveToast]);

  // Overall calculations
  const overallTargetPercent = Math.min(
    100,
    Math.round((targetScore / maxScore) * 100)
  );

  const avgSubjectCurrent = useMemo(() => {
    if (!subjects.length) return 72;
    const sum = subjects.reduce((acc, s) => acc + s.current, 0);
    return Math.round(sum / subjects.length);
  }, [subjects]);

  const avgSubjectTarget = useMemo(() => {
    if (!subjects.length) return 90;
    const sum = subjects.reduce((acc, s) => acc + s.target, 0);
    return Math.round(sum / subjects.length);
  }, [subjects]);

  const overallProgress = useMemo(() => {
    return Math.min(100, Math.round((avgSubjectCurrent / avgSubjectTarget) * 100));
  }, [avgSubjectCurrent, avgSubjectTarget]);

  const scoreGap = Math.max(0, targetScore - Math.round((avgSubjectCurrent / 100) * maxScore));

  const predictedRank = useMemo(() => {
    if (isJee) {
      if (targetScore >= 280) return "Top 100 AIR";
      if (targetScore >= 250) return "Top 1,000 AIR";
      if (targetScore >= 210) return "Top 5,000 AIR";
      return "Top 15,000 AIR";
    }
    if (targetScore >= 700) return "Top 200 AIR";
    if (targetScore >= 670) return "Top 1,500 AIR";
    if (targetScore >= 630) return "Top 5,000 AIR";
    return "Top 15,000 AIR";
  }, [targetScore, isJee]);

  // Quick Score Presets
  const scorePresets = isJee
    ? [200, 240, 260, 280]
    : [600, 650, 680, 700];

  // Quick Hour Presets
  const hourPresets = [2, 3, 4, 6, 8];

  const updateSubjectTarget = (id, target) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, target } : s))
    );
  };

  const toggleMilestone = (id) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      )
    );
  };

  const handleLogStreak = () => {
    if (loggedToday) return;
    const newStreak = streakDays + 1;
    setStreakDays(newStreak);
    setLoggedToday(true);
    localStorage.setItem("ils_streak_days", String(newStreak));
    localStorage.setItem("ils_last_streak_log", new Date().toDateString());
    setSaveToast("Streak updated! +1 Day added 🔥");
  };

  const handleSaveGoals = () => {
    localStorage.setItem("ils_target_score", String(targetScore));
    localStorage.setItem("ils_study_hours", String(studyHours));
    localStorage.setItem("ils_subjects_goals", JSON.stringify(subjects));
    localStorage.setItem("ils_milestones", JSON.stringify(milestones));
    setSaveToast(`Goals saved successfully! Target: ${targetScore} Marks`);
  };

  return (
    <div style={styles.root}>
      <div style={styles.phone}>
        {/* Sticky Header */}
        <header style={styles.header}>
          <button
            type="button"
            style={styles.backButton}
            onClick={onBack}
            aria-label="Go back"
          >
            <Icon name="back" size={20} stroke="#10E79D" />
          </button>

          <div style={styles.headerCenter}>
            <div style={styles.brand}>ILS RANKER</div>
            <div style={styles.tagline}>KNOW YOUR POTENTIAL</div>
          </div>

          <div style={styles.examBadge}>
            <span style={styles.examDot} />
            {activeExamName}
          </div>
        </header>

        {/* Scrollable Container */}
        <main style={styles.container}>
          {/* Toast Notification */}
          {saveToast && (
            <div style={styles.toast}>
              <Icon name="check" size={16} stroke="#10E79D" />
              <span>{saveToast}</span>
            </div>
          )}

          {/* Page Title */}
          <div style={styles.kicker}>PREPARATION GOALS</div>
          <h1 style={styles.title}>Goal Tracker</h1>
          <p style={styles.subtitle}>
            Set measurable targets and stay consistent until your exam day.
          </p>

          {/* HERO GOAL OVERVIEW CARD (High Contrast Emerald Glass) */}
          <section style={styles.heroCard}>
            <div style={styles.heroTop}>
              <div>
                <div style={styles.heroEyebrow}>TARGET SCORE</div>
                <div style={styles.heroScoreRow}>
                  <span style={styles.heroScore}>{targetScore}</span>
                  <span style={styles.heroMaxScore}>/ {maxScore} Marks</span>
                </div>
                <div style={styles.predictedRankPill}>
                  <Icon name="sparkles" size={12} stroke="#10E79D" />
                  <span>Est. {predictedRank}</span>
                </div>
              </div>

              <div style={styles.heroIconBox}>
                <Icon name="target" size={26} stroke="#10E79D" />
              </div>
            </div>

            {/* Progress Bar */}
            <div style={styles.progressHeader}>
              <span>Overall Goal Progress</span>
              <strong style={{ color: "#10E79D" }}>{overallProgress}%</strong>
            </div>
            <div style={styles.progressBarBg}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${overallProgress}%`,
                }}
              />
            </div>

            {/* Quick Metrics Bar */}
            <div style={styles.heroMetrics}>
              <div style={styles.heroMetricItem}>
                <span style={styles.metricLabel}>CURRENT</span>
                <span style={styles.metricVal}>{avgSubjectCurrent}%</span>
              </div>
              <div style={styles.metricDivider} />
              <div style={styles.heroMetricItem}>
                <span style={styles.metricLabel}>TARGET</span>
                <span style={styles.metricVal}>{overallTargetPercent}%</span>
              </div>
              <div style={styles.metricDivider} />
              <div style={styles.heroMetricItem}>
                <span style={styles.metricLabel}>GAP</span>
                <span style={{ ...styles.metricVal, color: "#FBBF24" }}>
                  +{scoreGap}m
                </span>
              </div>
            </div>
          </section>

          {/* YOUR GOALS CONTROLS */}
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Target Score Adjuster</span>
            <span style={styles.sectionBadge}>Customizable</span>
          </div>

          <div style={styles.card}>
            <div style={styles.sliderHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={styles.iconCircle}>
                  <Icon name="trophy" size={18} stroke="#10E79D" />
                </div>
                <div>
                  <div style={styles.controlTitle}>Target Score</div>
                  <div style={styles.controlSubtitle}>
                    Desired marks on exam day
                  </div>
                </div>
              </div>

              <div style={styles.scoreInputContainer}>
                <button
                  type="button"
                  style={styles.stepBtn}
                  onClick={() =>
                    setTargetScore((prev) => Math.max(100, prev - 10))
                  }
                >
                  -
                </button>
                <span style={styles.scoreNumber}>{targetScore}</span>
                <button
                  type="button"
                  style={styles.stepBtn}
                  onClick={() =>
                    setTargetScore((prev) => Math.min(maxScore, prev + 10))
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Score Slider */}
            <input
              type="range"
              min={isJee ? 100 : 350}
              max={maxScore}
              step={5}
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              style={styles.rangeSlider}
            />

            {/* Quick Presets */}
            <div style={styles.presetRow}>
              <span style={styles.presetLabel}>Quick Presets:</span>
              {scorePresets.map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() => setTargetScore(sc)}
                  style={{
                    ...styles.presetPill,
                    ...(targetScore === sc ? styles.presetPillActive : {}),
                  }}
                >
                  {sc}m
                </button>
              ))}
            </div>
          </div>

          {/* DAILY STUDY GOAL */}
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Daily Study Goal</span>
            <span style={styles.sectionSubText}>
              {studyHours * 7} hrs/week planned
            </span>
          </div>

          <div style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={styles.iconCircle}>
                <Icon name="clock" size={18} stroke="#38BDF8" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.controlTitle}>Focused Study Hours</div>
                <div style={styles.controlSubtitle}>
                  Recommended daily active problem solving
                </div>
              </div>
              <div style={styles.activeHourText}>{studyHours} Hours</div>
            </div>

            <div style={styles.hoursButtonGroup}>
              {hourPresets.map((hr) => (
                <button
                  key={hr}
                  type="button"
                  onClick={() => setStudyHours(hr)}
                  style={{
                    ...styles.hourBtn,
                    ...(studyHours === hr ? styles.hourBtnActive : {}),
                  }}
                >
                  {hr}h
                </button>
              ))}
            </div>
          </div>

          {/* SUBJECT TARGETS */}
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Subject-Wise Targets</span>
            <span style={styles.sectionSubText}>Target Mastery</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {subjects.map((subj) => {
              const subjProgress = Math.min(
                100,
                Math.round((subj.current / subj.target) * 100)
              );

              return (
                <div key={subj.id} style={styles.subjectRowCard}>
                  <div style={styles.subjectCardTop}>
                    <div
                      style={{
                        ...styles.subjectIconBox,
                        borderColor: `rgba(${
                          subj.color === "#38BDF8"
                            ? "56, 189, 248"
                            : subj.color === "#A855F7"
                            ? "168, 85, 247"
                            : "16, 231, 157"
                        }, 0.35)`,
                        background: `rgba(${
                          subj.color === "#38BDF8"
                            ? "56, 189, 248"
                            : subj.color === "#A855F7"
                            ? "168, 85, 247"
                            : "16, 231, 157"
                        }, 0.12)`,
                      }}
                    >
                      <Icon name={subj.icon} size={19} stroke={subj.color} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={styles.subjectName}>{subj.name}</div>
                      <div style={styles.subjectMeta}>
                        <span>{subj.current}% current</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span style={{ color: subj.color }}>
                          {subj.target}% target
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.subjectPercentBadge,
                        color: subj.color,
                        borderColor: `rgba(${
                          subj.color === "#38BDF8"
                            ? "56, 189, 248"
                            : subj.color === "#A855F7"
                            ? "168, 85, 247"
                            : "16, 231, 157"
                        }, 0.35)`,
                      }}
                    >
                      {subjProgress}%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={styles.subjProgressBg}>
                    <div
                      style={{
                        ...styles.subjProgressFill,
                        width: `${subjProgress}%`,
                        background: subj.color,
                      }}
                    />
                  </div>

                  {/* Target selectors */}
                  <div style={styles.subjTargetsRow}>
                    <span style={styles.setTargetLabel}>Set Target:</span>
                    <div style={styles.targetBtns}>
                      {[75, 80, 85, 90, 95].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => updateSubjectTarget(subj.id, val)}
                          style={{
                            ...styles.targetBtn,
                            ...(subj.target === val
                              ? {
                                  background: subj.color,
                                  color: "#010F0E",
                                  borderColor: subj.color,
                                  fontWeight: 900,
                                }
                              : {}),
                          }}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MILESTONES SECTION */}
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Milestones</span>
            <span style={styles.sectionSubText}>Tap to mark</span>
          </div>

          <div style={styles.card}>
            {milestones.map((m, idx) => {
              const isLast = idx === milestones.length - 1;
              const pct = Math.min(
                100,
                Math.round((m.current / m.target) * 100)
              );

              return (
                <div
                  key={m.id}
                  style={{
                    ...styles.milestoneItem,
                    borderBottom: isLast
                      ? "none"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  onClick={() => toggleMilestone(m.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div
                    style={{
                      ...styles.milestoneCheck,
                      ...(m.completed ? styles.milestoneCheckDone : {}),
                    }}
                  >
                    {m.completed ? (
                      <Icon name="check" size={14} stroke="#010F0E" />
                    ) : (
                      m.number
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        ...styles.milestoneTitle,
                        ...(m.completed ? styles.milestoneDoneText : {}),
                      }}
                    >
                      {m.title}
                    </div>
                    <div style={styles.milestoneSub}>{m.text}</div>

                    <div style={styles.milestoneTrack}>
                      <div
                        style={{
                          ...styles.milestoneFill,
                          width: `${pct}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div style={styles.milestoneStat}>
                    {m.current}/{m.target} {m.unit}
                  </div>
                </div>
              );
            })}
          </div>

          {/* STREAK & LOG STUDY CARD */}
          <section style={styles.streakCard}>
            <div style={styles.streakIcon}>
              <Icon name="flame" size={22} stroke="#F97316" />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={styles.streakTitle}>
                {streakDays} Day Study Streak 🔥
              </div>
              <div style={styles.streakText}>
                {loggedToday
                  ? "Today's goal completed! Awesome consistency."
                  : "Log today's study session to keep your streak alive."}
              </div>
            </div>

            <button
              type="button"
              style={{
                ...styles.logStreakBtn,
                ...(loggedToday ? styles.logStreakBtnDone : {}),
              }}
              onClick={handleLogStreak}
              disabled={loggedToday}
            >
              {loggedToday ? "Logged ✓" : "+ Log Today"}
            </button>
          </section>

          {/* ACTION BUTTONS */}
          <div style={styles.actionButtons}>
            <button
              type="button"
              style={styles.saveBtn}
              onClick={handleSaveGoals}
            >
              <Icon name="check" size={18} stroke="#010F0E" />
              Save My Goals
            </button>

            <button
              type="button"
              style={styles.backDashboardBtn}
              onClick={onBack}
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
    minHeight: "100vh",
    minHeight: "100dvh",
    background:
      "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
    boxSizing: "border-box",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#FFFFFF",
  },

  phone: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "100vh",
    minHeight: "100dvh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    background: "transparent",
  },

  header: {
    height: "64px",
    minHeight: "64px",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(6, 49, 43, 0.88)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    position: "sticky",
    top: 0,
    zIndex: 20,
    flexShrink: 0,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    color: "#10E79D",
    flexShrink: 0,
    transition: "transform 0.15s ease",
  },

  headerCenter: {
    flex: 1,
    minWidth: 0,
    marginLeft: 14,
  },

  brand: {
    fontSize: 16,
    fontWeight: 950,
    letterSpacing: 1.2,
    lineHeight: 1,
    color: "#FFFFFF",
  },

  tagline: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: 0.8,
  },

  examBadge: {
    padding: "5px 10px",
    borderRadius: 20,
    background: "rgba(16, 231, 157, 0.15)",
    border: "1px solid rgba(16, 231, 157, 0.35)",
    color: "#10E79D",
    fontSize: 10,
    fontWeight: 850,
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexShrink: 0,
  },

  examDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#10E79D",
    boxShadow: "0 0 6px #10E79D",
  },

  container: {
    flex: 1,
    width: "100%",
    padding: "20px 18px 145px",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  toast: {
    marginBottom: 14,
    padding: "10px 14px",
    borderRadius: 12,
    background: "rgba(16, 231, 157, 0.18)",
    border: "1px solid rgba(16, 231, 157, 0.4)",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 750,
    display: "flex",
    alignItems: "center",
    gap: 8,
    animation: "fadeIn 0.2s ease",
  },

  kicker: {
    fontSize: 11,
    letterSpacing: 1.2,
    color: "#10E79D",
    fontWeight: 900,
    marginBottom: 5,
  },

  title: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: -0.6,
    color: "#FFFFFF",
  },

  subtitle: {
    margin: "8px 0 0",
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: 13,
    lineHeight: 1.45,
  },

  heroCard: {
    marginTop: 18,
    padding: "18px 18px 16px",
    borderRadius: 20,
    background:
      "linear-gradient(145deg, rgba(16, 231, 157, 0.15) 0%, rgba(6, 42, 36, 0.88) 60%, rgba(4, 25, 22, 0.95) 100%)",
    border: "1px solid rgba(16, 231, 157, 0.35)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.35)",
  },

  heroTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },

  heroEyebrow: {
    fontSize: 9.5,
    letterSpacing: 1.2,
    fontWeight: 900,
    color: "#10E79D",
  },

  heroScoreRow: {
    marginTop: 4,
    display: "flex",
    alignItems: "baseline",
    gap: 8,
  },

  heroScore: {
    fontSize: 38,
    fontWeight: 950,
    lineHeight: 1,
    color: "#FFFFFF",
    letterSpacing: -1,
  },

  heroMaxScore: {
    fontSize: 14,
    color: "rgba(226, 232, 240, 0.6)",
    fontWeight: 700,
  },

  predictedRankPill: {
    marginTop: 8,
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "3px 9px",
    borderRadius: 12,
    background: "rgba(16, 231, 157, 0.16)",
    border: "1px solid rgba(16, 231, 157, 0.3)",
    fontSize: 10.5,
    fontWeight: 800,
    color: "#10E79D",
  },

  heroIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "rgba(16, 231, 157, 0.14)",
    border: "1px solid rgba(16, 231, 157, 0.28)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  progressHeader: {
    marginTop: 18,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11.5,
    fontWeight: 750,
    color: "rgba(226, 232, 240, 0.8)",
  },

  progressBarBg: {
    marginTop: 7,
    height: 8,
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 20,
    background: "linear-gradient(90deg, #10E79D 0%, #38BDF8 100%)",
    transition: "width 0.3s ease",
  },

  heroMetrics: {
    marginTop: 16,
    padding: "10px 14px",
    borderRadius: 12,
    background: "rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  heroMetricItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },

  metricLabel: {
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 0.8,
    color: "rgba(226, 232, 240, 0.55)",
  },

  metricVal: {
    fontSize: 14,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  metricDivider: {
    width: 1,
    height: 22,
    background: "rgba(255, 255, 255, 0.12)",
  },

  sectionHeader: {
    marginTop: 22,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  sectionBadge: {
    fontSize: 10,
    fontWeight: 800,
    color: "#10E79D",
    background: "rgba(16, 231, 157, 0.12)",
    padding: "2px 7px",
    borderRadius: 6,
  },

  sectionSubText: {
    fontSize: 11,
    color: "rgba(226, 232, 240, 0.55)",
    fontWeight: 700,
  },

  card: {
    padding: "14px 15px",
    borderRadius: 16,
    background: "rgba(6, 35, 30, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },

  sliderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  controlTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  controlSubtitle: {
    marginTop: 2,
    fontSize: 10.5,
    color: "rgba(226, 232, 240, 0.6)",
  },

  scoreInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    background: "rgba(0, 0, 0, 0.3)",
    padding: "4px 8px",
    borderRadius: 10,
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },

  stepBtn: {
    width: 26,
    height: 26,
    borderRadius: 7,
    border: "none",
    background: "rgba(255, 255, 255, 0.12)",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  scoreNumber: {
    fontSize: 16,
    fontWeight: 900,
    color: "#10E79D",
    minWidth: 42,
    textAlign: "center",
  },

  rangeSlider: {
    width: "100%",
    marginTop: 14,
    accentColor: "#10E79D",
    cursor: "pointer",
  },

  presetRow: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },

  presetLabel: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "rgba(226, 232, 240, 0.55)",
    marginRight: 4,
  },

  presetPill: {
    padding: "4px 10px",
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "rgba(226, 232, 240, 0.8)",
    fontSize: 11,
    fontWeight: 800,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  presetPillActive: {
    background: "rgba(16, 231, 157, 0.22)",
    borderColor: "#10E79D",
    color: "#10E79D",
  },

  activeHourText: {
    fontSize: 14,
    fontWeight: 900,
    color: "#38BDF8",
    background: "rgba(56, 189, 248, 0.14)",
    padding: "5px 10px",
    borderRadius: 8,
    border: "1px solid rgba(56, 189, 248, 0.3)",
  },

  hoursButtonGroup: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 8,
  },

  hourBtn: {
    padding: "8px 0",
    borderRadius: 10,
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.04)",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.15s ease",
  },

  hourBtnActive: {
    background: "#38BDF8",
    color: "#010F0E",
    borderColor: "#38BDF8",
    fontWeight: 900,
  },

  subjectRowCard: {
    padding: "13px 15px",
    borderRadius: 16,
    background: "rgba(6, 35, 30, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.09)",
  },

  subjectCardTop: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  subjectIconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  subjectName: {
    fontSize: 14,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  subjectMeta: {
    marginTop: 2,
    fontSize: 11,
    color: "rgba(226, 232, 240, 0.65)",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  subjectPercentBadge: {
    padding: "4px 9px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 900,
    background: "rgba(0, 0, 0, 0.25)",
    border: "1px solid",
  },

  subjProgressBg: {
    marginTop: 10,
    height: 6,
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },

  subjProgressFill: {
    height: "100%",
    borderRadius: 10,
    transition: "width 0.3s ease",
  },

  subjTargetsRow: {
    marginTop: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  setTargetLabel: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "rgba(226, 232, 240, 0.5)",
  },

  targetBtns: {
    display: "flex",
    gap: 5,
  },

  targetBtn: {
    padding: "4px 8px",
    borderRadius: 7,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.04)",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 10.5,
    fontWeight: 750,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },

  milestoneItem: {
    padding: "11px 0",
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
  },

  milestoneCheck: {
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.18)",
    background: "rgba(255, 255, 255, 0.06)",
    color: "rgba(226, 232, 240, 0.6)",
    fontSize: 10,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s ease",
  },

  milestoneCheckDone: {
    background: "#10E79D",
    borderColor: "#10E79D",
    color: "#010F0E",
  },

  milestoneTitle: {
    fontSize: 12.5,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  milestoneDoneText: {
    textDecoration: "line-through",
    color: "rgba(226, 232, 240, 0.5)",
  },

  milestoneSub: {
    marginTop: 2,
    fontSize: 10,
    color: "rgba(226, 232, 240, 0.55)",
  },

  milestoneTrack: {
    marginTop: 6,
    height: 4,
    borderRadius: 6,
    background: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
  },

  milestoneFill: {
    height: "100%",
    background: "#10E79D",
    borderRadius: 6,
  },

  milestoneStat: {
    fontSize: 10.5,
    fontWeight: 800,
    color: "rgba(226, 232, 240, 0.6)",
    whiteSpace: "nowrap",
  },

  streakCard: {
    marginTop: 16,
    padding: "14px 15px",
    borderRadius: 16,
    background:
      "linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(6, 35, 30, 0.7) 100%)",
    border: "1px solid rgba(249, 115, 22, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  streakIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(249, 115, 22, 0.18)",
    border: "1px solid rgba(249, 115, 22, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  streakTitle: {
    fontSize: 13,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  streakText: {
    marginTop: 3,
    fontSize: 10.5,
    color: "rgba(226, 232, 240, 0.65)",
    lineHeight: 1.4,
  },

  logStreakBtn: {
    padding: "7px 11px",
    borderRadius: 9,
    border: "none",
    background: "#F97316",
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: 850,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  logStreakBtnDone: {
    background: "rgba(255, 255, 255, 0.1)",
    color: "rgba(226, 232, 240, 0.6)",
    cursor: "default",
  },

  actionButtons: {
    marginTop: 22,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  saveBtn: {
    width: "100%",
    height: 48,
    borderRadius: 14,
    border: "none",
    background: "#10E79D",
    color: "#010F0E",
    fontSize: 14,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(16, 231, 157, 0.25)",
    transition: "transform 0.15s ease",
  },

  backDashboardBtn: {
    width: "100%",
    height: 44,
    borderRadius: 14,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.05)",
    color: "rgba(226, 232, 240, 0.8)",
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
    textAlign: "center",
  },
};