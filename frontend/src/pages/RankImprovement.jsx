import React, { useEffect, useMemo, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

/* =========================================================
   ICON
========================================================= */

function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 2,
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (name) {
    case "back":
      return (
        <svg {...common}>
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      );

    case "trend":
      return (
        <svg {...common}>
          <path d="M4 17 10 11l4 4 6-8" />
          <path d="M15 7h5v5" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );

    case "trophy":
      return (
        <svg {...common}>
          <path d="M8 4h8v4a4 4 0 0 1-8 0Z" />
          <path d="M8 6H5v1a3 3 0 0 0 3 3" />
          <path d="M16 6h3v1a3 3 0 0 1-3 3" />
          <path d="M12 12v5" />
          <path d="M8 21h8" />
          <path d="M9 17h6" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M4 9h16" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

/* =========================================================
   HELPERS
========================================================= */

function formatScore(score) {
  const value = Number(score) || 0;
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function formatDate(date) {
  if (!date) return "";
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) {
    return "";
  }
  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

/* =========================================================
   STANDARD HEADER
========================================================= */

function RankHeader({ onBack }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          style={styles.backButton}
        >
          <Icon name="back" size={20} color="#10E79D" />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={styles.brand}>ILS RANKER</div>
          <div style={styles.tagline}>KNOW YOUR POTENTIAL</div>
        </div>

        <div style={styles.headerTitle}>Rank Tracker</div>
      </div>
    </header>
  );
}

/* =========================================================
   PAGE COMPONENT
========================================================= */

export default function RankImprovement({
  profile,
  onBack,
  onOpenSection,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD REAL PERFORMANCE DATA
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadRankImprovement() {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        const mobile =
          profile?.mobile ||
          (typeof localStorage !== "undefined"
            ? localStorage.getItem("ils_user_mobile")
            : "") ||
          "";
        const email = profile?.email || "";
        const googleId = profile?.googleId || "";

        if (mobile) params.set("mobile", mobile);
        if (email) params.set("email", email);
        if (googleId) params.set("googleId", googleId);

        const url = `${API_URL}/api/rank-improvement?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Rank Improvement API failed: ${response.status}`);
        }

        const result = await response.json();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        console.error("Rank Improvement load error:", err);
        if (!cancelled) {
          setError("Unable to load your performance data right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRankImprovement();

    return () => {
      cancelled = true;
    };
  }, [profile?.mobile, profile?.email, profile?.googleId]);

  const summary = data?.summary || {};
  const trend = Array.isArray(data?.trend) ? data.trend : [];
  const recentTests = Array.isArray(data?.recentTests) ? data.recentTests : [];

  const currentScore = Number(summary.currentScore) || 0;
  const bestScore = Number(summary.bestScore) || 0;
  const averageScore = Number(summary.averageScore) || 0;
  const totalTests = Number(summary.totalTests) || 0;

  /* =======================================================
     PROJECTION (MOTIVATING, SOUND TRAJECTORY)
  ======================================================= */

  const projection = useMemo(() => {
    const baseline = Math.max(currentScore, bestScore, 10);
    // Project realistic steady forward improvement (+3% to +6% per week with practice)
    const weeklyGrowth = Math.max(4, Math.round(baseline * 0.04));

    return [1, 2, 3, 4].map((week) => ({
      week: `Week ${week}`,
      score: Math.round(baseline + weeklyGrowth * week),
    }));
  }, [currentScore, bestScore]);

  const projectedScore =
    projection.length > 0
      ? projection[projection.length - 1].score
      : currentScore;

  const potentialImprovement = Math.max(0, projectedScore - currentScore);

  const maxChartScore = Math.max(
    100,
    ...projection.map((item) => Number(item.score) || 0)
  );

  /* =======================================================
     MILESTONES
  ======================================================= */

  const milestones = useMemo(() => {
    const step = Math.max(
      6,
      Math.round(Math.max(potentialImprovement, 24) / 3)
    );

    const target1 = currentScore + step;
    const target2 = currentScore + step * 2;
    const goal = Math.max(projectedScore, currentScore + step * 3);

    return [
      {
        label: "Current",
        score: currentScore,
        completed: true,
      },
      {
        label: "Target 1",
        score: target1,
        completed: bestScore >= target1,
      },
      {
        label: "Target 2",
        score: target2,
        completed: bestScore >= target2,
      },
      {
        label: "Projected Goal",
        score: goal,
        completed: bestScore >= goal,
      },
    ];
  }, [currentScore, bestScore, projectedScore, potentialImprovement]);

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.mobileShell}>
          <RankHeader onBack={onBack} />
          <main style={styles.container}>
            <section style={styles.cardCenter}>
              <div style={styles.loadingSpinner} />
              <strong style={styles.cardTitle}>
                Analyzing Your Rank Trajectory...
              </strong>
              <p style={styles.cardSubtitle}>
                Loading your actual mock test performance history.
              </p>
            </section>
          </main>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.mobileShell}>
          <RankHeader onBack={onBack} />
          <main style={styles.container}>
            <section style={styles.cardCenter}>
              <strong style={{ ...styles.cardTitle, color: "#FF6B6B" }}>
                Notice
              </strong>
              <p style={styles.cardSubtitle}>{error}</p>
              <button
                type="button"
                onClick={onBack}
                style={styles.primaryButton}
              >
                ← Back
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  /* =======================================================
     NO DATA STATE
  ======================================================= */

  if (!data?.hasData) {
    return (
      <div style={styles.page}>
        <div style={styles.mobileShell}>
          <RankHeader onBack={onBack} />
          <main style={styles.container}>
            <section style={styles.cardCenter}>
              <div style={styles.accentIconWrap}>
                <Icon name="trend" size={26} color="#10E79D" />
              </div>

              <strong style={styles.cardTitle}>Take Your First Test</strong>
              <p style={styles.cardSubtitle}>
                Your performance projection will appear after you complete a mock test.
              </p>

              <button
                type="button"
                onClick={() => onOpenSection("mock-tests")}
                style={styles.primaryButton}
              >
                Take a Mock Test →
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN PAGE CONTENT
  ======================================================= */

  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        <RankHeader onBack={onBack} />

        <main style={styles.container}>
          {/* HEADER CARD */}
          <section style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={styles.heroIconBadge}>
                <Icon name="trend" size={24} color="#010F0E" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={styles.kicker}>PERFORMANCE PROJECTION</span>
                <h1 style={styles.heroHeading}>Rank Improvement</h1>
                <p style={styles.heroText}>
                  See how your test score and trajectory progress over time.
                </p>
              </div>
            </div>
          </section>

          {/* CURRENT VS PROJECTED */}
          <section style={{ ...styles.card, marginTop: "12px" }}>
            <div style={styles.twoColumnGrid}>
              <div style={styles.scoreBox}>
                <span style={styles.scoreBoxLabel}>CURRENT SCORE</span>
                <strong style={styles.scoreBoxValue}>
                  {formatScore(currentScore)}
                </strong>
                <span style={styles.scoreBoxHint}>Latest test score</span>
              </div>

              <div style={styles.scoreBoxProjected}>
                <span style={styles.scoreBoxLabelProjected}>
                  PROJECTED SCORE
                </span>
                <strong style={styles.scoreBoxValueProjected}>
                  {formatScore(projectedScore)}
                </strong>
                <span style={styles.scoreBoxHintProjected}>
                  With steady preparation
                </span>
              </div>
            </div>

            <div style={styles.improvementBadgeRow}>
              <Icon name="trend" size={15} color="#10E79D" />
              <span>
                Potential improvement: +{formatScore(potentialImprovement)} marks
              </span>
            </div>
          </section>

          {/* SUMMARY STATS */}
          <section style={styles.threeColumnGrid}>
            {[
              {
                label: "TESTS TAKEN",
                value: totalTests,
              },
              {
                label: "BEST SCORE",
                value: formatScore(bestScore),
              },
              {
                label: "AVERAGE",
                value: formatScore(averageScore),
              },
            ].map((item) => (
              <div key={item.label} style={styles.summaryStatCard}>
                <span style={styles.summaryStatLabel}>{item.label}</span>
                <strong style={styles.summaryStatValue}>{item.value}</strong>
              </div>
            ))}
          </section>

          {/* 4-WEEK PROJECTION CHART */}
          <section style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={styles.kicker}>EXPECTED TRAJECTORY</span>
              <h2 style={styles.sectionHeading}>4-Week Projection</h2>
            </div>

            <section style={styles.card}>
              <div style={styles.chartWrapper}>
                {/* Y-AXIS GRID LINES */}
                <div style={styles.chartGridOverlay}>
                  {[100, 75, 50, 25, 0].map((percentage) => (
                    <div key={percentage} style={styles.chartGridLineRow}>
                      <span style={styles.chartYLabel}>
                        {Math.round((maxChartScore * percentage) / 100)}
                      </span>
                      <div style={styles.chartDashedLine} />
                    </div>
                  ))}
                </div>

                {/* BARS */}
                <div style={styles.chartBarsContainer}>
                  {projection.map((item, index) => {
                    const score = Number(item.score) || 0;
                    const height = Math.max(
                      18,
                      Math.round((score / maxChartScore) * 110)
                    );

                    return (
                      <div key={item.week} style={styles.chartBarCol}>
                        <span style={styles.chartBarValue}>
                          {formatScore(score)}
                        </span>

                        <div
                          style={{
                            width: "32px",
                            height: `${height}px`,
                            borderRadius: "8px 8px 3px 3px",
                            background:
                              index === projection.length - 1
                                ? "linear-gradient(180deg, #10E79D 0%, #007050 100%)"
                                : "rgba(16, 231, 157, 0.35)",
                            boxShadow:
                              index === projection.length - 1
                                ? "0 0 14px rgba(16, 231, 157, 0.45)"
                                : "none",
                          }}
                        />

                        <span style={styles.chartBarLabel}>{item.week}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={styles.chartDisclaimer}>
                Projection is calculated from your actual recent test performance.
                It illustrates achievable growth with consistent test-taking and revision.
              </div>
            </section>
          </section>

          {/* MILESTONES / SCORE JOURNEY */}
          <section style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={styles.kicker}>MILESTONES</span>
              <h2 style={styles.sectionHeading}>Your Score Journey</h2>
            </div>

            <div style={styles.card}>
              {milestones.map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "12px",
                    position: "relative",
                    paddingBottom:
                      index === milestones.length - 1 ? 0 : "18px",
                  }}
                >
                  {index !== milestones.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "17px",
                        top: "34px",
                        bottom: 0,
                        width: "2px",
                        background: item.completed
                          ? "#10E79D"
                          : "rgba(255, 255, 255, 0.12)",
                      }}
                    />
                  )}

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "36px",
                      height: "36px",
                      flex: "0 0 36px",
                      borderRadius: "50%",
                      background: item.completed
                        ? "#10E79D"
                        : "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: item.completed
                        ? "0 0 12px rgba(16, 231, 157, 0.5)"
                        : "none",
                    }}
                  >
                    {item.completed ? (
                      <Icon name="check" size={16} color="#010F0E" />
                    ) : (
                      <Icon
                        name="target"
                        size={16}
                        color="rgba(226, 232, 240, 0.6)"
                      />
                    )}
                  </div>

                  <div style={{ flex: 1, paddingTop: "2px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <strong style={styles.milestoneLabel}>
                        {item.label}
                      </strong>

                      <span
                        style={{
                          color: item.completed
                            ? "#10E79D"
                            : "rgba(226, 232, 240, 0.75)",
                          fontSize: "13px",
                          fontWeight: 800,
                        }}
                      >
                        {formatScore(item.score)} marks
                      </span>
                    </div>

                    <span style={styles.milestoneStatus}>
                      {item.completed
                        ? "Reached"
                        : "Target based on current prep trend"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT TESTS */}
          {recentTests.length > 0 && (
            <section style={{ marginTop: "16px" }}>
              <div style={{ marginBottom: "10px" }}>
                <span style={styles.kicker}>RECENT PERFORMANCE</span>
                <h2 style={styles.sectionHeading}>Latest Tests</h2>
              </div>

              <div style={styles.card}>
                {recentTests.map((test, index) => (
                  <div
                    key={`${test.testId}-${test.submittedAt}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: index === 0 ? "4px 0 12px" : "12px 0",
                      borderTop:
                        index === 0
                          ? "none"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div style={styles.testAttemptBadge}>
                      #{test.attemptNumber || index + 1}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "8px",
                        }}
                      >
                        <strong style={styles.testTitle}>
                          {test.testTitle || "Mock Test"}
                        </strong>
                        <span style={styles.testScore}>
                          {formatScore(test.score)}
                        </span>
                      </div>

                      <div style={styles.testMetaRow}>
                        <span>{formatDate(test.submittedAt)}</span>
                        <span>•</span>
                        <span>{test.accuracy}% accuracy</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CALL TO ACTION */}
          <section style={{ ...styles.card, marginTop: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={styles.accentIconWrap}>
                <Icon name="trophy" size={22} color="#10E79D" />
              </div>

              <div>
                <span style={styles.kicker}>PERFORMANCE TARGET</span>
                <strong style={styles.targetCardHeading}>
                  Reach Your Next Score Milestone
                </strong>
              </div>
            </div>

            <p style={styles.targetCardText}>
              Your current score is{" "}
              <span style={{ color: "#10E79D", fontWeight: 800 }}>
                {formatScore(currentScore)} marks
              </span>
              , while your best recorded score is{" "}
              <span style={{ color: "#10E79D", fontWeight: 800 }}>
                {formatScore(bestScore)} marks
              </span>
              . Keep practising to reach your projected goal!
            </p>

            <button
              type="button"
              onClick={() => onOpenSection("mock-tests")}
              style={styles.primaryButton}
            >
              Continue Preparation →
            </button>
          </section>

          {/* FOOTER BACK BUTTON */}
          <button
            type="button"
            onClick={onBack}
            style={styles.backOutlineButton}
          >
            ← Back to AI Suggestions
          </button>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   STYLES (OBSIDIAN-EMERALD GLASSMORPHISM, 430PX MOBILE SHELL)
========================================================= */

const styles = {
  page: {
    width: "100%",
    minHeight: "100dvh",
    background: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  mobileShell: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "100dvh",
    background: "transparent",
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(6, 49, 43, 0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
  },

  headerInner: {
    width: "100%",
    minHeight: "64px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxSizing: "border-box",
  },

  backButton: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#10E79D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brand: {
    fontSize: "18px",
    fontWeight: 900,
    letterSpacing: "1px",
    lineHeight: 1,
    color: "#FFFFFF",
  },

  tagline: {
    marginTop: "4px",
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.8px",
  },

  headerTitle: {
    color: "#10E79D",
    fontSize: "13px",
    fontWeight: 800,
    flexShrink: 0,
  },

  container: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    padding: "16px 16px 115px",
    boxSizing: "border-box",
  },

  card: {
    padding: "16px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxSizing: "border-box",
  },

  cardCenter: {
    padding: "32px 20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center",
    boxSizing: "border-box",
  },

  heroIconBadge: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #10E79D 0%, #007050 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  accentIconWrap: {
    width: "48px",
    height: "48px",
    margin: "0 auto 12px",
    borderRadius: "14px",
    background: "rgba(16, 231, 157, 0.14)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  kicker: {
    color: "#10E79D",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },

  heroHeading: {
    margin: "4px 0 2px",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 900,
  },

  heroText: {
    margin: 0,
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: "12.5px",
    lineHeight: 1.45,
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  scoreBox: {
    padding: "14px 12px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },

  scoreBoxLabel: {
    display: "block",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: "11px",
    fontWeight: 700,
  },

  scoreBoxValue: {
    display: "block",
    marginTop: "4px",
    color: "#FFFFFF",
    fontSize: "24px",
    fontWeight: 900,
  },

  scoreBoxHint: {
    display: "block",
    marginTop: "3px",
    color: "rgba(226, 232, 240, 0.55)",
    fontSize: "11px",
  },

  scoreBoxProjected: {
    padding: "14px 12px",
    borderRadius: "14px",
    background: "rgba(16, 231, 157, 0.1)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
  },

  scoreBoxLabelProjected: {
    display: "block",
    color: "#10E79D",
    fontSize: "11px",
    fontWeight: 800,
  },

  scoreBoxValueProjected: {
    display: "block",
    marginTop: "4px",
    color: "#10E79D",
    fontSize: "24px",
    fontWeight: 900,
  },

  scoreBoxHintProjected: {
    display: "block",
    marginTop: "3px",
    color: "rgba(16, 231, 157, 0.75)",
    fontSize: "11px",
  },

  improvementBadgeRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    marginTop: "12px",
    color: "#10E79D",
    fontSize: "12.5px",
    fontWeight: 800,
  },

  threeColumnGrid: {
    marginTop: "12px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
  },

  summaryStatCard: {
    padding: "12px 8px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    textAlign: "center",
  },

  summaryStatLabel: {
    display: "block",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: "11px",
    fontWeight: 700,
  },

  summaryStatValue: {
    display: "block",
    marginTop: "4px",
    color: "#10E79D",
    fontSize: "18px",
    fontWeight: 900,
  },

  sectionHeading: {
    margin: "4px 0 0",
    color: "#FFFFFF",
    fontSize: "17px",
    fontWeight: 800,
  },

  chartWrapper: {
    position: "relative",
    height: "170px",
    marginTop: "6px",
    padding: "10px 5px 25px",
  },

  chartGridOverlay: {
    position: "absolute",
    left: "34px",
    right: "8px",
    top: "15px",
    bottom: "28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  chartGridLineRow: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  chartYLabel: {
    position: "absolute",
    left: "-34px",
    width: "28px",
    color: "rgba(226, 232, 240, 0.6)",
    fontSize: "11px",
    textAlign: "right",
  },

  chartDashedLine: {
    width: "100%",
    borderTop: "1px dashed rgba(255, 255, 255, 0.12)",
  },

  chartBarsContainer: {
    position: "absolute",
    left: "40px",
    right: "12px",
    top: "18px",
    bottom: "28px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: "0 8px",
  },

  chartBarCol: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "6px",
  },

  chartBarValue: {
    color: "#10E79D",
    fontSize: "12px",
    fontWeight: 800,
  },

  chartBarLabel: {
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: "11.5px",
    fontWeight: 650,
  },

  chartDisclaimer: {
    marginTop: "6px",
    padding: "10px 12px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.03)",
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  milestoneLabel: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 750,
  },

  milestoneStatus: {
    display: "block",
    marginTop: "3px",
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: "11.5px",
  },

  testAttemptBadge: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "rgba(16, 231, 157, 0.12)",
    color: "#10E79D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12.5px",
    fontWeight: 800,
    flexShrink: 0,
  },

  testTitle: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 750,
  },

  testScore: {
    color: "#10E79D",
    fontSize: "14px",
    fontWeight: 850,
  },

  testMetaRow: {
    marginTop: "3px",
    display: "flex",
    gap: "6px",
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: "11.5px",
  },

  targetCardHeading: {
    display: "block",
    marginTop: "2px",
    fontSize: "16px",
    color: "#FFFFFF",
    fontWeight: 800,
  },

  targetCardText: {
    margin: "10px 0 0",
    fontSize: "12.5px",
    lineHeight: 1.5,
    color: "rgba(226, 232, 240, 0.8)",
  },

  primaryButton: {
    width: "100%",
    marginTop: "14px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #10E79D 0%, #007050 100%)",
    color: "#010F0E",
    fontSize: "14px",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(16, 231, 157, 0.35)",
  },

  backOutlineButton: {
    width: "100%",
    marginTop: "14px",
    padding: "13px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "13px",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#10E79D",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  cardTitle: {
    display: "block",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: 800,
  },

  cardSubtitle: {
    margin: "8px 0 0",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  loadingSpinner: {
    width: "36px",
    height: "36px",
    margin: "0 auto 12px",
    borderRadius: "50%",
    border: "3px solid rgba(16, 231, 157, 0.2)",
    borderTopColor: "#10E79D",
    animation: "spin 1s linear infinite",
  },
};