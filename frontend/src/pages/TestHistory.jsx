import React from "react";

const tests = [
  {
    name: "NEET Mock Test 1",
    date: "12 Jul 2026",
    score: "580 / 720",
    percentage: 81,
  },
  {
    name: "NEET Mock Test 2",
    date: "08 Jul 2026",
    score: "620 / 720",
    percentage: 86,
  },
  {
    name: "NEET Mock Test 3",
    date: "01 Jul 2026",
    score: "540 / 720",
    percentage: 75,
  },
  {
    name: "NEET Mock Test 4",
    date: "25 Jun 2026",
    score: "680 / 720",
    percentage: 94,
  },
  {
    name: "NEET Mock Test 5",
    date: "18 Jun 2026",
    score: "490 / 720",
    percentage: 68,
  },
];

function Icon({ type, size = 22 }) {
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

  if (type === "document") {
    return (
      <svg {...common}>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </svg>
    );
  }

  if (type === "trophy") {
    return (
      <svg {...common}>
        <path d="M8 4h8v4c0 3.2-1.7 5.5-4 5.5S8 11.2 8 8V4Z" />
        <path d="M8 6H5c0 3 1.2 4.5 3.6 4.7" />
        <path d="M16 6h3c0 3-1.2 4.5-3.6 4.7" />
        <path d="M12 13.5V18" />
        <path d="M8.5 20h7" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg {...common}>
        <path d="M5 19V10" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
        <path d="M3.5 21h17" />
      </svg>
    );
  }

  return null;
}

export default function TestHistory({ onBack }) {
  const styles = {
    screen: {
      minHeight: "100vh",
      background: "#F4FBF7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    phone: {
      width: "100%",
      maxWidth: "390px",
      minHeight: "720px",
      maxHeight: "900px",
      background: "#FFFFFF",
      borderRadius: "30px",
      border: "1px solid #DDE7E3",
      boxShadow:
        "0 16px 40px rgba(8, 47, 60, 0.10)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },

    header: {
      height: "62px",
      padding: "0 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#FFFFFF",
      borderBottom: "1px solid #EEF3F1",
      flexShrink: 0,
    },

    back: {
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
    },

    content: {
      flex: 1,
      overflowY: "auto",
      padding: "18px 16px 22px",
      boxSizing: "border-box",
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
      margin: "8px 0 17px",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
      marginBottom: "19px",
    },

    statCard: {
      minHeight: "106px",
      border: "1px solid #E2EBE7",
      borderRadius: "16px",
      background: "#FFFFFF",
      padding: "12px 7px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      textAlign: "center",
    },

    statIcon: {
      width: "35px",
      height: "35px",
      borderRadius: "11px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "7px",
    },

    statValue: {
      display: "block",
      fontSize: "18px",
      fontWeight: 900,
      lineHeight: 1,
      color: "#082F3C",
    },

    statLabel: {
      display: "block",
      marginTop: "5px",
      fontSize: "8px",
      fontWeight: 700,
      color: "#7B888C",
      lineHeight: 1.2,
    },

    sectionTitle: {
      margin: "0 0 10px",
      fontSize: "19px",
      lineHeight: 1.2,
      fontWeight: 850,
      color: "#082F3C",
    },

    list: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    testCard: {
      width: "100%",
      minHeight: "71px",
      border: "1px solid #E2EBE7",
      borderRadius: "16px",
      background: "#FFFFFF",
      padding: "10px 11px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxSizing: "border-box",
    },

    testIcon: {
      width: "41px",
      height: "41px",
      borderRadius: "12px",
      background: "#EAF8F3",
      color: "#007050",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },

    testMain: {
      flex: 1,
      minWidth: 0,
    },

    testName: {
      display: "block",
      fontSize: "11px",
      fontWeight: 850,
      color: "#173747",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    testDate: {
      display: "block",
      marginTop: "4px",
      fontSize: "9px",
      color: "#899598",
    },

    testScore: {
      display: "block",
      fontSize: "12px",
      fontWeight: 900,
      color: "#082F3C",
      textAlign: "right",
    },

    testPercentage: {
      display: "block",
      marginTop: "4px",
      fontSize: "8px",
      fontWeight: 800,
      textAlign: "right",
    },

    arrow: {
      color: "#8A9795",
      fontSize: "18px",
      marginLeft: "2px",
    },

    keepCard: {
      marginTop: "16px",
      borderRadius: "17px",
      background: "#F4FBF7",
      border: "1px solid #DDEAE5",
      padding: "13px",
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
    },

    keepIcon: {
      width: "38px",
      height: "38px",
      borderRadius: "12px",
      background: "#FFFFFF",
      color: "#007050",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "17px",
      flexShrink: 0,
    },

    keepTitle: {
      margin: 0,
      fontSize: "11px",
      fontWeight: 850,
      color: "#173747",
    },

    keepText: {
      margin: "4px 0 0",
      fontSize: "9px",
      lineHeight: 1.45,
      color: "#78868A",
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
            onClick={onBack}
            style={styles.back}
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

          <div style={styles.headerIcon}>
            <Icon type="document" size={19} />
          </div>
        </header>

        <main style={styles.content}>
          {/* INTRO */}
          <span style={styles.kicker}>
            YOUR TESTS
          </span>

          <h1 style={styles.title}>
            Test History
          </h1>

          <p style={styles.description}>
            Review your past tests and track your
            preparation progress.
          </p>

          {/* STATS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background: "#EAF4FF",
                  color: "#1769D1",
                }}
              >
                <Icon type="document" size={19} />
              </div>

              <span style={styles.statValue}>
                12
              </span>

              <span style={styles.statLabel}>
                Total Tests
              </span>
            </div>

            <div style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background: "#FFF4CB",
                  color: "#A66A22",
                }}
              >
                <Icon type="trophy" size={19} />
              </div>

              <span style={styles.statValue}>
                680
              </span>

              <span style={styles.statLabel}>
                Best Score
              </span>
            </div>

            <div style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background: "#EAF8F3",
                  color: "#007050",
                }}
              >
                <Icon type="chart" size={19} />
              </div>

              <span style={styles.statValue}>
                542
              </span>

              <span style={styles.statLabel}>
                Average Score
              </span>
            </div>
          </div>

          {/* TEST LIST */}
          <h2 style={styles.sectionTitle}>
            Your Tests
          </h2>

          <div style={styles.list}>
            {tests.map((test) => (
              <button
                key={`${test.name}-${test.date}`}
                type="button"
                onClick={() => {}}
                style={styles.testCard}
              >
                <div style={styles.testIcon}>
                  <Icon
                    type="document"
                    size={19}
                  />
                </div>

                <div style={styles.testMain}>
                  <span style={styles.testName}>
                    {test.name}
                  </span>

                  <span style={styles.testDate}>
                    {test.date}
                  </span>
                </div>

                <div>
                  <span style={styles.testScore}>
                    {test.score}
                  </span>

                  <span
                    style={{
                      ...styles.testPercentage,
                      color:
                        test.percentage >= 80
                          ? "#007050"
                          : test.percentage >= 60
                          ? "#A66A22"
                          : "#D94A68",
                    }}
                  >
                    {test.percentage}%
                  </span>
                </div>

                <span style={styles.arrow}>
                  ›
                </span>
              </button>
            ))}
          </div>

          {/* KEEP GOING */}
          <div style={styles.keepCard}>
            <div style={styles.keepIcon}>
              <Icon
                type="document"
                size={18}
              />
            </div>

            <div>
              <p style={styles.keepTitle}>
                Keep going!
              </p>

              <p style={styles.keepText}>
                Your progress shows your hard work.
                Attempt more tests to improve further.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            style={styles.backButton}
          >
            ← Back to Dashboard
          </button>
        </main>
      </div>
    </div>
  );
}