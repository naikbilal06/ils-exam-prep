import React, { useMemo } from "react";

const subjects = [
  {
    id: "physics",
    name: "Physics",
    value: 78,
    icon: "⚛",
    bg: "#EAF4FF",
    color: "#1769D1",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    value: 64,
    icon: "⚗",
    bg: "#F2EAFE",
    color: "#7B35C8",
  },
  {
    id: "biology",
    name: "Biology",
    value: 91,
    icon: "🌿",
    bg: "#EAF8F3",
    color: "#007050",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    value: 72,
    icon: "∑",
    bg: "#FFF1DF",
    color: "#A66A22",
  },
  {
    id: "english",
    name: "English",
    value: 58,
    icon: "A",
    bg: "#FFF0F3",
    color: "#D94A68",
  },
  {
    id: "general-test",
    name: "General Test",
    value: 66,
    icon: "▥",
    bg: "#EEF4FF",
    color: "#3867C7",
  },
];

function getStatus(value) {
  if (value >= 80) {
    return {
      text: "Strong",
      color: "#007050",
      bg: "#EAF8F3",
    };
  }

  if (value >= 60) {
    return {
      text: "Good",
      color: "#A66A22",
      bg: "#FFF6E7",
    };
  }

  return {
    text: "Needs Work",
    color: "#D94A68",
    bg: "#FFF0F3",
  };
}

function Bar({ value, color }) {
  return (
    <div
      style={{
        width: "100%",
        height: "7px",
        background: "#E8EFEC",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: color,
          borderRadius: "10px",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}

export default function Analysis({
  profile,
  onBack,
  onOpenSection,
}) {
  const selectedSubjectIds = profile?.subjects || [];

  const visibleSubjects = useMemo(() => {
    if (!selectedSubjectIds.length) {
      return subjects;
    }

    const selected = subjects.filter((subject) =>
      selectedSubjectIds.includes(subject.id)
    );

    return selected.length ? selected : subjects;
  }, [selectedSubjectIds]);

  const overall = Math.round(
    visibleSubjects.reduce(
      (sum, subject) => sum + subject.value,
      0
    ) / visibleSubjects.length
  );

  const styles = {
    screen: {
      width: "100%",
      minHeight: "100dvh",
      background: "#F4FBF7",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      boxSizing: "border-box",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    phone: {
      width: "100%",
      maxWidth: "390px",
      minHeight: "100dvh",
      background: "#FFFFFF",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },

    header: {
      height: "62px",
      minHeight: "62px",
      padding: "0 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#FFFFFF",
      borderBottom: "1px solid #EEF3F1",
      flexShrink: 0,
      boxSizing: "border-box",
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
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
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
      letterSpacing: "-0.4px",
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
      fontSize: "18px",
      fontWeight: 900,
      flexShrink: 0,
    },

    content: {
      flex: 1,
      overflowY: "auto",
      padding: "18px 16px 105px",
      boxSizing: "border-box",
      WebkitOverflowScrolling: "touch",
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
      letterSpacing: "-0.6px",
    },

    description: {
      margin: "8px 0 0",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    performanceCard: {
      marginTop: "18px",
      border: "1px solid #DFEAE6",
      borderRadius: "19px",
      background: "#FFFFFF",
      padding: "18px 15px",
      display: "flex",
      alignItems: "center",
      gap: "18px",
      boxSizing: "border-box",
    },

    donutWrap: {
      width: "112px",
      height: "112px",
      flexShrink: 0,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    donut: {
      width: "112px",
      height: "112px",
      borderRadius: "50%",
      background: `conic-gradient(
        #007050 0deg ${overall * 3.6}deg,
        #E6F0EC ${overall * 3.6}deg 360deg
      )`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    donutInner: {
      width: "84px",
      height: "84px",
      borderRadius: "50%",
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    overallNumber: {
      fontSize: "25px",
      lineHeight: 1,
      fontWeight: 900,
      color: "#082F3C",
    },

    overallPercent: {
      marginTop: "3px",
      fontSize: "9px",
      fontWeight: 800,
      color: "#7B888C",
    },

    performanceText: {
      flex: 1,
      minWidth: 0,
    },

    good: {
      fontSize: "18px",
      fontWeight: 850,
      color: "#007050",
      marginBottom: "6px",
    },

    keepText: {
      margin: 0,
      fontSize: "11px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    section: {
      marginTop: "20px",
    },

    sectionHeader: {
      marginBottom: "11px",
    },

    sectionTitle: {
      margin: 0,
      fontSize: "19px",
      lineHeight: 1.2,
      fontWeight: 850,
      color: "#082F3C",
    },

    sectionDescription: {
      margin: "5px 0 0",
      fontSize: "10px",
      color: "#7A898E",
    },

    subjectList: {
      display: "flex",
      flexDirection: "column",
      gap: "9px",
    },

    subjectCard: {
      width: "100%",
      border: "1px solid #E2EBE7",
      borderRadius: "16px",
      background: "#FFFFFF",
      padding: "11px",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textAlign: "left",
      cursor: "pointer",
    },

    subjectIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "17px",
      fontWeight: 850,
      flexShrink: 0,
    },

    subjectMain: {
      flex: 1,
      minWidth: 0,
    },

    subjectTop: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "7px",
    },

    subjectName: {
      fontSize: "12px",
      fontWeight: 850,
      color: "#173747",
    },

    value: {
      fontSize: "12px",
      fontWeight: 900,
      color: "#082F3C",
    },

    statusRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "6px",
    },

    preparation: {
      fontSize: "9px",
      color: "#879498",
    },

    status: {
      padding: "4px 7px",
      borderRadius: "7px",
      fontSize: "8px",
      fontWeight: 850,
    },

    practiceCard: {
      marginTop: "18px",
      borderRadius: "17px",
      background: "#F4FBF7",
      border: "1px solid #DCEAE5",
      padding: "13px",
      display: "flex",
      alignItems: "center",
      gap: "11px",
      boxSizing: "border-box",
    },

    bulb: {
      width: "37px",
      height: "37px",
      borderRadius: "12px",
      background: "#FFFFFF",
      color: "#007050",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      flexShrink: 0,
    },

    practiceText: {
      flex: 1,
      minWidth: 0,
    },

    practiceTitle: {
      margin: 0,
      fontSize: "11px",
      fontWeight: 850,
      color: "#173747",
    },

    practiceDescription: {
      margin: "4px 0 0",
      fontSize: "9px",
      lineHeight: 1.45,
      color: "#78868A",
    },

    practiceButton: {
      marginTop: "9px",
      height: "38px",
      padding: "0 14px",
      border: 0,
      borderRadius: "10px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "10px",
      fontWeight: 850,
      cursor: "pointer",
    },

    backButton: {
      width: "100%",
      height: "45px",
      marginTop: "16px",
      border: "1px solid #DCE7E2",
      borderRadius: "13px",
      background: "#FFFFFF",
      color: "#53686D",
      fontSize: "11px",
      fontWeight: 800,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>
        {/* HEADER */}
        <header style={styles.header}>
          <button
            type="button"
            style={styles.headerButton}
            onClick={onBack}
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

          <div style={styles.headerIcon}>%</div>
        </header>

        <main style={styles.content}>
          {/* INTRO */}
          <section>
            <span style={styles.kicker}>
              YOUR PERFORMANCE
            </span>

            <h1 style={styles.title}>
              Subject Analysis
            </h1>

            <p style={styles.description}>
              Understand your strengths and identify
              subjects that need more attention.
            </p>
          </section>

          {/* OVERALL */}
          <section style={styles.performanceCard}>
            <div style={styles.donutWrap}>
              <div style={styles.donut}>
                <div style={styles.donutInner}>
                  <span style={styles.overallNumber}>
                    {overall}%
                  </span>

                  <span style={styles.overallPercent}>
                    OVERALL
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.performanceText}>
              <div style={styles.good}>
                {overall >= 75
                  ? "Excellent Progress!"
                  : overall >= 60
                  ? "Good Progress!"
                  : "Keep Improving!"}
              </div>

              <p style={styles.keepText}>
                Keep solving questions to improve your
                score and strengthen weaker subjects.
              </p>
            </div>
          </section>

          {/* SUBJECTS */}
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                Subject-wise Analysis
              </h2>

              <p style={styles.sectionDescription}>
                Track your preparation subject by subject.
              </p>
            </div>

            <div style={styles.subjectList}>
              {visibleSubjects.map((subject) => {
                const status = getStatus(subject.value);

                return (
                  <button
                    key={subject.id}
                    type="button"
                    style={styles.subjectCard}
                    onClick={() =>
                      onOpenSection?.("chapter-analysis")
                    }
                  >
                    <div
                      style={{
                        ...styles.subjectIcon,
                        background: subject.bg,
                        color: subject.color,
                      }}
                    >
                      {subject.icon}
                    </div>

                    <div style={styles.subjectMain}>
                      <div style={styles.subjectTop}>
                        <span style={styles.subjectName}>
                          {subject.name}
                        </span>

                        <span style={styles.value}>
                          {subject.value}%
                        </span>
                      </div>

                      <Bar
                        value={subject.value}
                        color={subject.color}
                      />

                      <div style={styles.statusRow}>
                        <span style={styles.preparation}>
                          Preparation level
                        </span>

                        <span
                          style={{
                            ...styles.status,
                            color: status.color,
                            background: status.bg,
                          }}
                        >
                          {status.text}
                        </span>
                      </div>
                    </div>

                    <span
                      style={{
                        color: "#8A9795",
                        fontSize: "17px",
                        flexShrink: 0,
                      }}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* PRACTICE */}
          <section style={styles.practiceCard}>
            <div style={styles.bulb}>💡</div>

            <div style={styles.practiceText}>
              <p style={styles.practiceTitle}>
                Keep Practicing
              </p>

              <p style={styles.practiceDescription}>
                Focus on weaker subjects to improve your
                overall score.
              </p>

              <button
                type="button"
                style={styles.practiceButton}
                onClick={() =>
                  onOpenSection?.("practice")
                }
              >
                Practice Weak Areas →
              </button>
            </div>
          </section>

          <button
            type="button"
            style={styles.backButton}
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>
        </main>
      </div>
    </div>
  );
}