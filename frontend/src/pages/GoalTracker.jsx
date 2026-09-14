import React, { useMemo, useState } from "react";

const C = {
  green: "#007050",
  navy: "#082F3C",
  mint: "#F4FBF7",
  softMint: "#EAF5F1",
  white: "#FFFFFF",
  muted: "#68777B",
  border: "#E4EFEB",
  blue: "#3679C9",
  purple: "#7652C8",
  yellow: "#C78A13",
};

const initialSubjects = [
  {
    name: "Physics",
    current: 78,
    target: 90,
    color: C.blue,
    icon: "⚛",
  },
  {
    name: "Chemistry",
    current: 64,
    target: 85,
    color: "#D94B55",
    icon: "◇",
  },
  {
    name: "Biology",
    current: 91,
    target: 95,
    color: C.green,
    icon: "✦",
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
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4.2L19 7" />,
    trophy: (
      <>
        <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
        <path d="M8 6H4v2a4 4 0 0 0 4 4" />
        <path d="M16 6h4v2a4 4 0 0 1-4 4" />
        <path d="M12 12v5" />
        <path d="M8 20h8" />
      </>
    ),
    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function GoalTracker({ onBack }) {
  const [targetScore, setTargetScore] = useState("700");
  const [studyGoal, setStudyGoal] = useState("3");
  const [subjects, setSubjects] =
    useState(initialSubjects);

  const overallProgress = useMemo(() => {
    const current =
      subjects.reduce(
        (sum, item) => sum + item.current,
        0
      ) / subjects.length;

    const target =
      subjects.reduce(
        (sum, item) => sum + item.target,
        0
      ) / subjects.length;

    return Math.min(
      100,
      Math.round((current / target) * 100)
    );
  }, [subjects]);

  const completedMilestones = subjects.filter(
    (item) => item.current >= item.target
  ).length;

  const updateTarget = (name, target) => {
    setSubjects((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, target }
          : item
      )
    );
  };

  return (
    <div style={styles.page}>
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

          <div style={styles.headerLabel}>
            Goal Tracker
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.kicker}>
          PREPARATION GOALS
        </div>

        <h1 style={styles.title}>
          Goal Tracker
        </h1>

        <p style={styles.subtitle}>
          Set measurable targets and stay consistent until
          your exam day.
        </p>

        <section style={styles.heroCard}>
          <div style={styles.heroTop}>
            <div>
              <div style={styles.heroEyebrow}>
                TARGET SCORE
              </div>

              <div style={styles.heroScore}>
                {targetScore}
              </div>

              <div style={styles.heroHint}>
                Your current preparation goal
              </div>
            </div>

            <div style={styles.heroIcon}>
              <Icon
                name="target"
                size={25}
                stroke="#FFFFFF"
              />
            </div>
          </div>

          <div style={styles.heroProgressMeta}>
            <span>Overall goal progress</span>
            <strong>{overallProgress}%</strong>
          </div>

          <div style={styles.heroProgressTrack}>
            <div
              style={{
                ...styles.heroProgressFill,
                width: `${overallProgress}%`,
              }}
            />
          </div>

          <div style={styles.heroBottom}>
            <div>
              <span style={styles.heroSmallLabel}>
                CURRENT
              </span>
              <strong>72%</strong>
            </div>

            <div>
              <span style={styles.heroSmallLabel}>
                TARGET
              </span>
              <strong>90%</strong>
            </div>

            <div>
              <span style={styles.heroSmallLabel}>
                GAP
              </span>
              <strong>18%</strong>
            </div>
          </div>
        </section>

        <div style={styles.sectionTitle}>
          Your Goals
        </div>

        <section style={styles.settingsCard}>
          <GoalSetting
            icon="trophy"
            title="Target Score"
            subtitle="Your desired exam score"
            value={targetScore}
            suffix="Marks"
            onChange={setTargetScore}
          />

          <GoalSetting
            icon="clock"
            title="Daily Study Goal"
            subtitle="Recommended focused study time"
            value={studyGoal}
            suffix="Hours"
            onChange={setStudyGoal}
            last
          />
        </section>

        <div style={styles.sectionTitle}>
          Subject Targets
        </div>

        <section style={styles.subjectCard}>
          {subjects.map((subject, index) => {
            const progress = Math.min(
              100,
              Math.round(
                (subject.current /
                  subject.target) *
                  100
              )
            );

            return (
              <div
                key={subject.name}
                style={{
                  ...styles.subjectRow,
                  borderBottom:
                    index === subjects.length - 1
                      ? "none"
                      : `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    ...styles.subjectIcon,
                    color: subject.color,
                  }}
                >
                  {subject.icon}
                </div>

                <div style={styles.subjectBody}>
                  <div style={styles.subjectTop}>
                    <div>
                      <div style={styles.subjectName}>
                        {subject.name}
                      </div>

                      <div style={styles.subjectScore}>
                        {subject.current}% current
                        <span> • </span>
                        {subject.target}% target
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.subjectProgress,
                        color: subject.color,
                      }}
                    >
                      {progress}%
                    </div>
                  </div>

                  <div style={styles.progressTrack}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${progress}%`,
                        background:
                          subject.color,
                      }}
                    />
                  </div>

                  <div style={styles.targetControl}>
                    <span>Set target</span>

                    <div style={styles.targetButtons}>
                      {[70, 80, 90].map((value) => (
                        <button
                          key={value}
                          onClick={() =>
                            updateTarget(
                              subject.name,
                              value
                            )
                          }
                          style={{
                            ...styles.targetButton,
                            ...(subject.target ===
                            value
                              ? styles.targetButtonActive
                              : {}),
                          }}
                        >
                          {value}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div style={styles.sectionTitle}>
          Milestones
        </div>

        <section style={styles.milestoneCard}>
          <Milestone
            number="01"
            title="Complete 10 Mock Tests"
            text="Build speed and exam temperament."
            progress={7}
            target={10}
            completed={false}
          />

          <Milestone
            number="02"
            title="Reach 80% Accuracy"
            text="Improve consistency across subjects."
            progress={72}
            target={80}
            completed={false}
          />

          <Milestone
            number="03"
            title="Finish Full Syllabus"
            text="Complete your planned chapters."
            progress={64}
            target={100}
            completed={false}
            last
          />
        </section>

        <section style={styles.streakCard}>
          <div style={styles.streakIcon}>
            <Icon
              name="trend"
              size={20}
              stroke={C.green}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={styles.streakTitle}>
              Keep the momentum going
            </div>

            <div style={styles.streakText}>
              {completedMilestones > 0
                ? `${completedMilestones} milestone completed. Keep building on it.`
                : "Small daily improvements will move you closer to your target."}
            </div>
          </div>

          <div style={styles.streakValue}>
            7
            <span>days</span>
          </div>
        </section>

        <button
          style={styles.primaryButton}
          onClick={() => {}}
        >
          <Icon
            name="check"
            size={17}
            stroke="#FFFFFF"
          />
          Save My Goals
        </button>

        <button
          style={styles.secondaryButton}
          onClick={onBack}
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}

function GoalSetting({
  icon,
  title,
  subtitle,
  value,
  suffix,
  onChange,
  last,
}) {
  return (
    <div
      style={{
        ...styles.goalRow,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
    >
      <div style={styles.settingIcon}>
        <Icon
          name={icon}
          size={18}
          stroke={C.green}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div style={styles.settingTitle}>
          {title}
        </div>

        <div style={styles.settingSubtitle}>
          {subtitle}
        </div>
      </div>

      <div style={styles.goalInputWrap}>
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          style={styles.goalInput}
        />
        <span>{suffix}</span>
      </div>
    </div>
  );
}

function Milestone({
  number,
  title,
  text,
  progress,
  target,
  completed,
  last,
}) {
  const percentage = Math.min(
    100,
    Math.round((progress / target) * 100)
  );

  return (
    <div
      style={{
        ...styles.milestoneRow,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          ...styles.milestoneNumber,
          ...(completed
            ? styles.milestoneCompleted
            : {}),
        }}
      >
        {completed ? (
          <Icon
            name="check"
            size={14}
            stroke="#FFFFFF"
          />
        ) : (
          number
        )}
      </div>

      <div style={styles.milestoneBody}>
        <div style={styles.milestoneTop}>
          <div>
            <div style={styles.milestoneTitle}>
              {title}
            </div>

            <div style={styles.milestoneText}>
              {text}
            </div>
          </div>

          <div style={styles.milestonePercent}>
            {percentage}%
          </div>
        </div>

        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${percentage}%`,
              background: C.green,
            }}
          />
        </div>

        <div style={styles.milestoneMeta}>
          {progress} / {target}
        </div>
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
  },

  brand: {
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: 1,
  },

  tagline: {
    marginTop: 5,
    color: C.muted,
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  headerLabel: {
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
  },

  heroCard: {
    marginTop: 21,
    padding: 20,
    borderRadius: 22,
    background: C.green,
    color: C.white,
    boxShadow:
      "0 14px 30px rgba(0,112,80,0.19)",
  },

  heroTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 15,
  },

  heroEyebrow: {
    fontSize: 8.5,
    letterSpacing: 1,
    fontWeight: 900,
    opacity: 0.8,
  },

  heroScore: {
    marginTop: 3,
    fontSize: 38,
    lineHeight: 1,
    fontWeight: 900,
  },

  heroHint: {
    marginTop: 6,
    fontSize: 10.5,
    opacity: 0.82,
  },

  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    background: "rgba(255,255,255,0.14)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  heroProgressMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 23,
    fontSize: 10,
    fontWeight: 750,
  },

  heroProgressTrack: {
    marginTop: 7,
    height: 7,
    borderRadius: 20,
    overflow: "hidden",
    background: "rgba(255,255,255,0.2)",
  },

  heroProgressFill: {
    height: "100%",
    background: C.white,
    borderRadius: 20,
  },

  heroBottom: {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
  },

  heroBottom: {
    marginTop: 16,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
  },

  heroBottomItem: {
    textAlign: "left",
  },

  heroSmallLabel: {
    display: "block",
    fontSize: 7.5,
    opacity: 0.7,
    fontWeight: 800,
  },

  sectionTitle: {
    margin: "24px 2px 10px",
    fontSize: 13,
    fontWeight: 900,
  },

  settingsCard: {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 18,
    padding: "0 16px",
  },

  goalRow: {
    minHeight: 72,
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "12px 0",
  },

  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  settingTitle: {
    fontSize: 12,
    fontWeight: 900,
  },

  settingSubtitle: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9.5,
  },

  goalInputWrap: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "7px 8px",
    border: `1px solid ${C.border}`,
    borderRadius: 9,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 750,
  },

  goalInput: {
    width: 48,
    border: "none",
    outline: "none",
    background: "transparent",
    color: C.green,
    fontSize: 13,
    fontWeight: 900,
    textAlign: "right",
  },

  subjectCard: {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 18,
    padding: "0 16px",
  },

  subjectRow: {
    display: "flex",
    gap: 11,
    padding: "15px 0",
  },

  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: 900,
    flexShrink: 0,
  },

  subjectBody: {
    flex: 1,
    minWidth: 0,
  },

  subjectTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },

  subjectName: {
    fontSize: 12,
    fontWeight: 900,
  },

  subjectScore: {
    marginTop: 3,
    color: C.muted,
    fontSize: 9,
  },

  subjectProgress: {
    fontSize: 13,
    fontWeight: 900,
  },

  progressTrack: {
    marginTop: 8,
    height: 6,
    borderRadius: 20,
    background: C.softMint,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
    transition: "width 200ms ease",
  },

  targetControl: {
    marginTop: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  targetButtons: {
    display: "flex",
    gap: 5,
  },

  targetButton: {
    border: `1px solid ${C.border}`,
    background: C.white,
    color: C.muted,
    borderRadius: 7,
    padding: "5px 7px",
    fontSize: 8,
    fontWeight: 850,
    cursor: "pointer",
  },

  targetButtonActive: {
    borderColor: C.green,
    background: C.mint,
    color: C.green,
  },

  milestoneCard: {
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 18,
    padding: "0 16px",
  },

  milestoneRow: {
    display: "flex",
    gap: 11,
    padding: "15px 0",
  },

  milestoneNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: C.mint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8.5,
    fontWeight: 900,
    flexShrink: 0,
  },

  milestoneCompleted: {
    background: C.green,
  },

  milestoneBody: {
    flex: 1,
    minWidth: 0,
  },

  milestoneTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
  },

  milestoneTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  milestoneText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 9,
  },

  milestonePercent: {
    color: C.green,
    fontSize: 11,
    fontWeight: 900,
  },

  milestoneMeta: {
    marginTop: 5,
    color: C.muted,
    fontSize: 8,
    textAlign: "right",
  },

  streakCard: {
    marginTop: 13,
    padding: 15,
    borderRadius: 17,
    background: C.softMint,
    display: "flex",
    alignItems: "center",
    gap: 11,
  },

  streakIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  streakTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  streakText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.45,
  },

  streakValue: {
    color: C.green,
    fontSize: 21,
    fontWeight: 900,
    textAlign: "center",
  },

  primaryButton: {
    width: "100%",
    marginTop: 18,
    border: "none",
    borderRadius: 13,
    padding: "14px 16px",
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

  secondaryButton: {
    width: "100%",
    marginTop: 9,
    border: `1px solid ${C.green}`,
    borderRadius: 13,
    padding: "13px 16px",
    background: C.white,
    color: C.green,
    fontSize: 12.5,
    fontWeight: 850,
    cursor: "pointer",
  },
};