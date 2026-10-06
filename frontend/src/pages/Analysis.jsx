import React, { useEffect, useMemo, useState } from "react";

const subjectPresentation = {
  physics: {
    icon: "⚛",
    bg: "#EAF4FF",
    color: "#1769D1",
  },
  chemistry: {
    icon: "⚗",
    bg: "#F2EAFE",
    color: "#7B35C8",
  },
  biology: {
    icon: "🌿",
    bg: "#EAF8F3",
    color: "#007050",
  },
  mathematics: {
    icon: "∑",
    bg: "#FFF1DF",
    color: "#A66A22",
  },
  english: {
    icon: "A",
    bg: "#FFF0F3",
    color: "#D94A68",
  },
  "general-test": {
    icon: "▥",
    bg: "#EEF4FF",
    color: "#3867C7",
  },
};

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
          width: `${Math.min(100, Math.max(0, value))}%`,
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
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD ANALYTICS
  // IMPORTANT:
  // Do NOT use profile.exams[0] here.
  // The first profile exam may be CUET while the latest test
  // may be NEET/Biology. We fetch all results for this user.
  // ============================================================

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams();

        const mobile =
          profile?.mobile || "";

        const email =
          profile?.email || "";

        const googleId =
          profile?.googleId || "";

        if (mobile) {
          params.set("mobile", mobile);
        }

        if (email) {
          params.set("email", email);
        }

        if (googleId) {
          params.set("googleId", googleId);
        }

        /*
         * IMPORTANT:
         *
         * We intentionally DO NOT send:
         *
         * params.set("exam", profile?.exams?.[0]);
         *
         * because that was causing:
         *
         * /api/analytics?mobile=...&exam=cuet
         *
         * even when the user had just completed a Biology test.
         *
         * Without exam filtering, the backend returns all saved
         * analytics for the logged-in user.
         */

        const url =
          `${API_URL}/api/analytics?${params.toString()}`;

        console.log(
          "Analytics request:",
          url
        );

        const response = await fetch(url);

        const data =
          await response
            .json()
            .catch(() => ({}));

        console.log(
          "Analytics response:",
          data
        );

        if (
          !response.ok ||
          !data?.success
        ) {
          throw new Error(
            data?.message ||
              "Unable to load analytics right now."
          );
        }

        setAnalytics(data);
      } catch (loadError) {
        console.error(
          "Analytics loading error:",
          loadError
        );

        setError(
          "Unable to load analytics right now."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadAnalytics();
  }, [
    API_URL,
    profile?.mobile,
    profile?.email,
    profile?.googleId,
  ]);

  // ============================================================
  // DATA
  // ============================================================

  const subjects =
    analytics?.subjects || [];

  const overview =
    analytics?.overview || {};

  const tests =
    Array.isArray(analytics?.tests)
      ? analytics.tests
      : [];

  // ============================================================
  // SUBJECT PRESENTATION
  // ============================================================

  const visibleSubjects =
    useMemo(() => {
      return subjects.map((subject) => {
        const rawId =
          String(
            subject?.subjectId || ""
          ).toLowerCase();

        const rawName =
          String(
            subject?.subjectName || ""
          ).toLowerCase();

        const presentation =
          subjectPresentation[rawId] ||
          subjectPresentation[rawName] ||
          {
            icon: "•",
            bg: "#EEF4FF",
            color: "#3867C7",
          };

        return {
          ...subject,
          id:
            subject.subjectId ||
            subject.subjectName,

          name:
            subject.subjectName ||
            subject.subjectId ||
            "Subject",

          value:
            Math.round(
              Number(
                subject.accuracy || 0
              )
            ),

          ...presentation,
        };
      });
    }, [subjects]);

  // ============================================================
  // OVERALL ACCURACY
  // ============================================================

  const overall =
    Math.round(
      Number(
        overview.averageAccuracy || 0
      )
    );

  // ============================================================
  // STYLES
  // ============================================================

  const styles = {
    screen: {
      width: "100%",
      minHeight: "100dvh",
      background: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      boxSizing: "border-box",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#FFFFFF",
    },

    phone: {
      width: "100%",
      maxWidth: "430px",
      minHeight: "100dvh",
      background: "transparent",
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
      background: "rgba(6, 49, 43, 0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      flexShrink: 0,
      boxSizing: "border-box",
    },

    headerButton: {
      width: "40px",
      height: "40px",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.08)",
      color: "#10E79D",
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
      color: "#FFFFFF",
      letterSpacing: "-0.4px",
    },

    brandSub: {
      marginTop: "4px",
      fontSize: "8px",
      fontWeight: 800,
      letterSpacing: "1.7px",
      color: "#10E79D",
    },

    headerIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "rgba(16, 231, 157, 0.15)",
      color: "#10E79D",
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
      color: "#10E79D",
      marginBottom: "6px",
    },

    title: {
      margin: 0,
      fontSize: "25px",
      lineHeight: 1.15,
      fontWeight: 850,
      color: "#FFFFFF",
      letterSpacing: "-0.6px",
    },

    description: {
      margin: "8px 0 0",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "rgba(226, 232, 240, 0.7)",
    },

    emptyState: {
      marginTop: "18px",
      padding: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      color: "rgba(226, 232, 240, 0.7)",
      fontSize: "11px",
      lineHeight: 1.5,
      textAlign: "center",
    },

    analyticsStats: {
      marginTop: "10px",
      display: "flex",
      flexWrap: "wrap",
      gap: "6px 10px",
      color: "rgba(226, 232, 240, 0.65)",
      fontSize: "8px",
      fontWeight: 800,
    },

    trendList: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },

    trendRow: {
      padding: "10px 11px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "14px",
      background: "rgba(255, 255, 255, 0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
    },

    trendLabel: {
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      color: "#FFFFFF",
      fontSize: "10px",
    },

    trendValue: {
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "3px",
      color: "#10E79D",
      fontSize: "10px",
    },

    performanceCard: {
      marginTop: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "19px",
      background: "rgba(255, 255, 255, 0.05)",
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
        #10E79D 0deg ${overall * 3.6}deg,
        rgba(255, 255, 255, 0.1) ${overall * 3.6}deg 360deg
      )`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    donutInner: {
      width: "84px",
      height: "84px",
      borderRadius: "50%",
      background: "#031D1B",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    overallNumber: {
      fontSize: "25px",
      lineHeight: 1,
      fontWeight: 900,
      color: "#FFFFFF",
    },

    overallPercent: {
      marginTop: "3px",
      fontSize: "9px",
      fontWeight: 800,
      color: "rgba(226, 232, 240, 0.7)",
    },

    performanceText: {
      flex: 1,
      minWidth: 0,
    },

    good: {
      fontSize: "18px",
      fontWeight: 850,
      color: "#10E79D",
      marginBottom: "6px",
    },

    keepText: {
      margin: 0,
      fontSize: "11px",
      lineHeight: 1.5,
      color: "rgba(226, 232, 240, 0.7)",
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
      color: "#FFFFFF",
    },

    sectionDescription: {
      margin: "5px 0 0",
      fontSize: "10px",
      color: "rgba(226, 232, 240, 0.65)",
    },

    subjectList: {
      display: "flex",
      flexDirection: "column",
      gap: "9px",
    },

    subjectCard: {
      width: "100%",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
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
      color: "#FFFFFF",
    },

    value: {
      fontSize: "12px",
      fontWeight: 900,
      color: "#10E79D",
    },

    statusRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "6px",
    },

    preparation: {
      fontSize: "9px",
      color: "rgba(226, 232, 240, 0.65)",
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
      background: "rgba(16, 231, 157, 0.08)",
      border: "1px solid rgba(16, 231, 157, 0.2)",
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
      background: "rgba(16, 231, 157, 0.2)",
      color: "#10E79D",
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
      color: "#FFFFFF",
    },

    practiceDescription: {
      margin: "4px 0 0",
      fontSize: "9px",
      lineHeight: 1.45,
      color: "rgba(226, 232, 240, 0.7)",
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
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "13px",
      background: "rgba(255, 255, 255, 0.08)",
      color: "#10E79D",
      fontSize: "11px",
      fontWeight: 800,
      cursor: "pointer",
    },
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>
        {/* HEADER */}
        <header style={styles.header}>
          <button
            type="button"
            style={styles.headerButton}
            onClick={onBack}
            aria-label="Go back"
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
            %
          </div>
        </header>

        <main style={styles.content}>
          {/* LOADING */}
          {loading && (
            <div style={styles.emptyState}>
              Loading your analytics…
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div style={styles.emptyState}>
              {error}
            </div>
          )}

          {/* NO TESTS */}
          {!loading &&
            !error &&
            !tests.length && (
              <div style={styles.emptyState}>
                Take your first test to unlock
                performance analytics.
              </div>
            )}

          {/* INTRO */}
          <section>
            <span style={styles.kicker}>
              YOUR PERFORMANCE
            </span>

            <h1 style={styles.title}>
              Subject Analysis
            </h1>

            <p style={styles.description}>
              Understand your strengths and
              identify subjects that need more
              attention.
            </p>
          </section>

          {/* OVERALL */}
          {!loading &&
            !error &&
            tests.length > 0 && (
              <section
                style={styles.performanceCard}
              >
                <div style={styles.donutWrap}>
                  <div style={styles.donut}>
                    <div
                      style={styles.donutInner}
                    >
                      <span
                        style={styles.overallNumber}
                      >
                        {overall}%
                      </span>

                      <span
                        style={styles.overallPercent}
                      >
                        OVERALL
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={styles.performanceText}
                >
                  <div style={styles.good}>
                    {overall >= 75
                      ? "Excellent Progress!"
                      : overall >= 60
                      ? "Good Progress!"
                      : "Keep Improving!"}
                  </div>

                  <p style={styles.keepText}>
                    Keep solving questions to
                    improve your score and
                    strengthen weaker subjects.
                  </p>

                  <div
                    style={styles.analyticsStats}
                  >
                    <span>
                      Tests:{" "}
                      {overview.totalTests || 0}
                    </span>

                    <span>
                      Best:{" "}
                      {overview.bestScore || 0}
                    </span>

                    <span>
                      Avg:{" "}
                      {overview.averageScore || 0}
                    </span>
                  </div>
                </div>
              </section>
            )}

          {/* SUBJECT ANALYSIS */}
          {!loading &&
            !error &&
            tests.length > 0 && (
              <section style={styles.section}>
                <div
                  style={styles.sectionHeader}
                >
                  <h2
                    style={styles.sectionTitle}
                  >
                    Subject-wise Analysis
                  </h2>

                  <p
                    style={
                      styles.sectionDescription
                    }
                  >
                    Track your preparation
                    subject by subject.
                  </p>
                </div>

                <div
                  style={styles.subjectList}
                >
                  {visibleSubjects.map(
                    (subject) => {
                      const status =
                        getStatus(
                          subject.value
                        );

                      return (
                        <button
                          key={subject.id}
                          type="button"
                          style={
                            styles.subjectCard
                          }
                          onClick={() =>
                            onOpenSection?.(
                              "chapter-analysis"
                            )
                          }
                        >
                          <div
                            style={{
                              ...styles.subjectIcon,
                              background:
                                subject.bg,
                              color:
                                subject.color,
                            }}
                          >
                            {subject.icon}
                          </div>

                          <div
                            style={
                              styles.subjectMain
                            }
                          >
                            <div
                              style={
                                styles.subjectTop
                              }
                            >
                              <span
                                style={
                                  styles.subjectName
                                }
                              >
                                {subject.name}
                              </span>

                              <span
                                style={
                                  styles.value
                                }
                              >
                                {subject.value}%
                              </span>
                            </div>

                            <Bar
                              value={
                                subject.value
                              }
                              color={
                                subject.color
                              }
                            />

                            <div
                              style={
                                styles.statusRow
                              }
                            >
                              <span
                                style={
                                  styles.preparation
                                }
                              >
                                Preparation
                                level
                              </span>

                              <span
                                style={{
                                  ...styles.status,
                                  color:
                                    status.color,
                                  background:
                                    status.bg,
                                }}
                              >
                                {status.text}
                              </span>
                            </div>
                          </div>

                          <span
                            style={{
                              color:
                                "#8A9795",
                              fontSize:
                                "17px",
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                        </button>
                      );
                    }
                  )}

                  {!visibleSubjects.length && (
                    <div
                      style={
                        styles.emptyState
                      }
                    >
                      Subject performance is
                      not available yet.
                    </div>
                  )}
                </div>
              </section>
            )}

          {/* RECENT PERFORMANCE */}
          {!loading &&
            !error &&
            tests.length > 0 && (
              <section style={styles.section}>
                <div
                  style={styles.sectionHeader}
                >
                  <h2
                    style={styles.sectionTitle}
                  >
                    Recent Performance
                  </h2>

                  <p
                    style={
                      styles.sectionDescription
                    }
                  >
                    Your latest completed
                    tests.
                  </p>
                </div>

                <div
                  style={styles.subjectList}
                >
                  {[...tests]
                    .reverse()
                    .map((test) => (
                      <div
                        key={test.id}
                        style={
                          styles.subjectCard
                        }
                      >
                        <div
                          style={
                            styles.subjectMain
                          }
                        >
                          <div
                            style={
                              styles.subjectTop
                            }
                          >
                            <span
                              style={
                                styles.subjectName
                              }
                            >
                              {test.testTitle ||
                                "Test"}
                            </span>

                            <span
                              style={
                                styles.value
                              }
                            >
                              {test.score}{" "}
                              score
                            </span>
                          </div>

                          <Bar
                            value={
                              Number(
                                test.accuracy ||
                                  0
                              )
                            }
                            color="#007050"
                          />

                          <div
                            style={
                              styles.statusRow
                            }
                          >
                            <span
                              style={
                                styles.preparation
                              }
                            >
                              {test.createdAt
                                ? new Date(
                                    test.createdAt
                                  ).toLocaleDateString()
                                : "Date unavailable"}
                            </span>

                            <span
                              style={
                                styles.preparation
                              }
                            >
                              {test.accuracy ||
                                0}
                              % accuracy
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

          {/* SCORE TREND */}
          {!loading &&
            !error &&
            tests.length > 0 && (
              <section style={styles.section}>
                <div
                  style={styles.sectionHeader}
                >
                  <h2
                    style={styles.sectionTitle}
                  >
                    Score Trend
                  </h2>

                  <p
                    style={
                      styles.sectionDescription
                    }
                  >
                    Your actual test performance
                    over time.
                  </p>
                </div>

                <div
                  style={styles.trendList}
                >
                  {tests.map((test) => (
                    <div
                      key={`trend-${test.id}`}
                      style={styles.trendRow}
                    >
                      <div
                        style={
                          styles.trendLabel
                        }
                      >
                        <strong>
                          {test.testTitle ||
                            "Test"}
                        </strong>

                        <span
                          style={{
                            color:
                              "#68777B",
                            fontSize:
                              "8px",
                          }}
                        >
                          {test.createdAt
                            ? new Date(
                                test.createdAt
                              ).toLocaleDateString()
                            : "Date unavailable"}
                        </span>
                      </div>

                      <div
                        style={
                          styles.trendValue
                        }
                      >
                        <strong>
                          {test.score}
                        </strong>

                        <span>
                          {test.accuracy ||
                            0}
                          %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* PRACTICE */}
          <section
            style={styles.practiceCard}
          >
            <div style={styles.bulb}>
              💡
            </div>

            <div
              style={styles.practiceText}
            >
              <p
                style={styles.practiceTitle}
              >
                Keep Practicing
              </p>

              <p
                style={
                  styles.practiceDescription
                }
              >
                Focus on weaker subjects to
                improve your overall score.
              </p>

              <button
                type="button"
                style={styles.practiceButton}
                onClick={() =>
                  onOpenSection?.(
                    "practice"
                  )
                }
              >
                Practice Weak Areas →
              </button>
            </div>
          </section>

          {/* BACK */}
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