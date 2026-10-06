import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Capacitor,
  CapacitorHttp,
} from "@capacitor/core";

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
        <rect
          x="5"
          y="3.5"
          width="14"
          height="17"
          rx="2"
        />
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

  if (type === "back") {
    return (
      <svg {...common}>
        <path d="M19 12H5" />
        <path d="M11 6l-6 6 6 6" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h13" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "close") {
    return (
      <svg {...common}>
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
      </svg>
    );
  }

  if (type === "refresh") {
    return (
      <svg {...common}>
        <path d="M20 11a8 8 0 0 0-14.9-4" />
        <path d="M4 4v5h5" />
        <path d="M4 13a8 8 0 0 0 14.9 4" />
        <path d="M20 20v-5h-5" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return null;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Date unavailable";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function normalizeResult(result, index) {
  const score = Number(
    result?.score ?? 0
  );

  const totalMarks = Number(
    result?.totalMarks ??
      result?.maxScore ??
      0
  );

  const totalQuestions = Number(
    result?.totalQuestions ??
      result?.questions ??
      0
  );

  const attempted = Number(
    result?.attempted ?? 0
  );

  const correct = Number(
    result?.correct ?? 0
  );

  const incorrect = Number(
    result?.incorrect ??
      result?.wrong ??
      0
  );

  const skipped = Number(
    result?.skipped ?? 0
  );

  const accuracy =
    Number(
      result?.accuracy ?? 0
    ) || 0;

  return {
    ...result,

    id:
      String(
        result?._id ??
          result?.id ??
          `result-${index}`
      ),

    testTitle:
      result?.testTitle ||
      result?.title ||
      "Mock Test",

    exam:
      result?.exam ||
      "NEET",

    score,

    totalMarks,

    totalQuestions,

    attempted,

    correct,

    incorrect,

    skipped,

    accuracy,

    createdAt:
      result?.createdAt ||
      result?.created_at ||
      result?.date ||
      null,

    subjectResults:
      Array.isArray(
        result?.subjectResults
      )
        ? result.subjectResults
        : [],

    chapterResults:
      Array.isArray(
        result?.chapterResults
      )
        ? result.chapterResults
        : [],
  };
}

export default function TestHistory({
  profile,
  onBack,
}) {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000";

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedResult, setSelectedResult] =
    useState(null);

  /* =====================================================
     LOAD REAL TEST HISTORY
  ===================================================== */

  const loadHistory =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const mobile =
          profile?.mobile?.trim() || "";

        const email =
          profile?.email?.trim() || "";

        const googleId =
          profile?.googleId?.trim() || "";

        if (
          !mobile &&
          !email &&
          !googleId
        ) {
          setResults([]);

          throw new Error(
            "No account identity is available. Please log in again."
          );
        }

        const params =
          new URLSearchParams();

        if (mobile) {
          params.set(
            "mobile",
            mobile
          );
        }

        if (email) {
          params.set(
            "email",
            email
          );
        }

        if (googleId) {
          params.set(
            "googleId",
            googleId
          );
        }

        const url =
          `${API_URL}/api/test-results?${params.toString()}`;

        const platform =
          Capacitor.getPlatform();

        let data = {};
        let status = 200;

        if (
          platform === "web"
        ) {
          const response =
            await fetch(url, {
              method: "GET",
            });

          status =
            response.status;

          data =
            await response
              .json()
              .catch(
                () => ({})
              );
        } else {
          const response =
            await CapacitorHttp.get(
              {
                url,
              }
            );

          status =
            response?.status || 0;

          data =
            response?.data || {};
        }

        if (
          status < 200 ||
          status >= 300 ||
          data?.success !== true
        ) {
          throw new Error(
            data?.message ||
              "Unable to load your test history."
          );
        }

        const serverResults =
          Array.isArray(
            data?.results
          )
            ? data.results
            : Array.isArray(
                data?.data
              )
            ? data.data
            : [];

        const normalized =
          serverResults
            .map(
              normalizeResult
            )
            .sort(
              (a, b) =>
                new Date(
                  b.createdAt || 0
                ) -
                new Date(
                  a.createdAt || 0
                )
            );

        setResults(
          normalized
        );
      } catch (err) {
        console.error(
          "Test history load error:",
          err
        );

        setResults([]);

        setError(
          err?.message ||
            "Unable to load your test history."
        );
      } finally {
        setLoading(false);
      }
    }, [
      API_URL,
      profile?.mobile,
      profile?.email,
      profile?.googleId,
    ]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  /* =====================================================
     REAL STATS
  ===================================================== */

  const stats = useMemo(() => {
    if (
      results.length === 0
    ) {
      return {
        totalTests: 0,
        bestScore: 0,
        averageScore: 0,
      };
    }

    const scores =
      results.map(
        (result) =>
          Number(
            result.score
          ) || 0
      );

    const total =
      scores.reduce(
        (sum, value) =>
          sum + value,
        0
      );

    return {
      totalTests:
        results.length,

      bestScore:
        Math.max(
          ...scores
        ),

      averageScore:
        Math.round(
          total /
            results.length
        ),
    };
  }, [results]);

  const closeDetails =
    () => {
      setSelectedResult(
        null
      );
    };

  const styles = {
    screen: {
      minHeight:
        "100dvh",
      background:
        "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
      display:
        "flex",
      justifyContent:
        "center",
      alignItems:
        "flex-start",
      padding: 0,
      boxSizing:
        "border-box",
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
      position: "relative",
    },

    header: {
      height: "62px",
      padding: "0 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(6, 49, 43, 0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom:
        "1px solid rgba(255, 255, 255, 0.12)",
      flexShrink: 0,
    },

    back: {
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
    },

    content: {
      flex: 1,
      overflowY: "auto",
      padding:
        "18px 16px 105px",
      boxSizing: "border-box",
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
      margin:
        "8px 0 17px",
      fontSize: "12px",
      lineHeight: 1.5,
      color: "rgba(226, 232, 240, 0.7)",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(3, 1fr)",
      gap: "8px",
      marginBottom: "19px",
    },

    statCard: {
      minHeight: "106px",
      border:
        "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      padding:
        "12px 7px",
      display: "flex",
      flexDirection:
        "column",
      alignItems: "center",
      justifyContent:
        "center",
      boxSizing:
        "border-box",
      textAlign:
        "center",
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
      color: "#FFFFFF",
    },

    statLabel: {
      display: "block",
      marginTop: "5px",
      fontSize: "8px",
      fontWeight: 700,
      color: "rgba(226, 232, 240, 0.65)",
      lineHeight: 1.2,
    },

    sectionTitle: {
      margin:
        "0 0 10px",
      fontSize: "19px",
      lineHeight: 1.2,
      fontWeight: 850,
      color: "#FFFFFF",
    },

    list: {
      display: "flex",
      flexDirection:
        "column",
      gap: "8px",
    },

    testCard: {
      width: "100%",
      minHeight: "71px",
      border:
        "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      padding:
        "10px 11px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxSizing:
        "border-box",
      cursor: "pointer",
      textAlign: "left",
    },

    testIcon: {
      width: "41px",
      height: "41px",
      borderRadius: "12px",
      background: "rgba(16, 231, 157, 0.15)",
      color: "#10E79D",
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
      color: "#FFFFFF",
      whiteSpace:
        "nowrap",
      overflow:
        "hidden",
      textOverflow:
        "ellipsis",
    },

    testDate: {
      display: "block",
      marginTop: "4px",
      fontSize: "9px",
      color: "rgba(226, 232, 240, 0.65)",
    },

    testScore: {
      display: "block",
      fontSize: "12px",
      fontWeight: 900,
      color: "#10E79D",
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
      color: "rgba(226, 232, 240, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent:
        "center",
      marginLeft: "2px",
      flexShrink: 0,
    },

    keepCard: {
      marginTop: "16px",
      borderRadius: "17px",
      background: "rgba(16, 231, 157, 0.08)",
      border:
        "1px solid rgba(16, 231, 157, 0.2)",
      padding: "13px",
      display: "flex",
      gap: "10px",
      alignItems:
        "flex-start",
    },

    keepIcon: {
      width: "38px",
      height: "38px",
      borderRadius: "12px",
      background: "rgba(16, 231, 157, 0.2)",
      color: "#10E79D",
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
      color: "#FFFFFF",
    },

    keepText: {
      margin:
        "4px 0 0",
      fontSize: "9px",
      lineHeight: 1.45,
      color: "rgba(226, 232, 240, 0.75)",
    },

    backButton: {
      width: "100%",
      height: "45px",
      marginTop: "16px",
      border:
        "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "13px",
      background: "rgba(255, 255, 255, 0.06)",
      color: "#10E79D",
      fontSize: "11px",
      fontWeight: 800,
      cursor: "pointer",
      backdropFilter: "blur(10px)",
      transition: "background 0.2s ease, transform 0.2s ease",
    },

    stateCard: {
      border:
        "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "17px",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(12px)",
      padding: "18px 14px",
      textAlign: "center",
    },

    stateIcon: {
      width: "42px",
      height: "42px",
      borderRadius: "13px",
      background: "rgba(16, 231, 157, 0.15)",
      color: "#10E79D",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    stateTitle: {
      marginTop: "10px",
      fontSize: "12px",
      fontWeight: 900,
      color: "#FFFFFF",
    },

    stateText: {
      margin:
        "5px 0 0",
      fontSize: "9px",
      lineHeight: 1.5,
      color: "rgba(226, 232, 240, 0.7)",
    },

    retryButton: {
      marginTop: "11px",
      minHeight: "38px",
      padding:
        "0 14px",
      border: "none",
      borderRadius: "11px",
      background: "linear-gradient(135deg, #10E79D, #007050)",
      color: "#010F0E",
      fontSize: "10px",
      fontWeight: 850,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      boxShadow: "0 4px 14px rgba(16, 231, 157, 0.25)",
    },

    loadingDots: {
      display: "flex",
      justifyContent:
        "center",
      alignItems: "center",
      gap: "5px",
      marginTop: "10px",
    },

    loadingDot: {
      width: "6px",
      height: "6px",
      borderRadius:
        "50%",
      background: "#10E79D",
      animation:
        "ils-history-pulse 1s infinite ease-in-out",
    },

    detailOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "rgba(1, 15, 14, 0.75)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent:
        "center",
      zIndex: 50,
    },

    detailSheet: {
      width: "100%",
      maxHeight: "78%",
      overflowY: "auto",
      background: "#031D1B",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius:
        "24px 24px 0 0",
      padding:
        "17px 16px 24px",
      boxSizing:
        "border-box",
      boxShadow:
        "0 -12px 35px rgba(0, 0, 0, 0.5)",
    },

    detailTop: {
      display: "flex",
      alignItems: "center",
      justifyContent:
        "space-between",
      gap: "10px",
    },

    detailTitleWrap: {
      minWidth: 0,
      flex: 1,
    },

    detailTitle: {
      margin: 0,
      fontSize: "16px",
      fontWeight: 900,
      color: "#FFFFFF",
      lineHeight: 1.3,
    },

    detailSub: {
      marginTop: "4px",
      fontSize: "9px",
      color: "rgba(226, 232, 240, 0.7)",
    },

    closeButton: {
      width: "34px",
      height: "34px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      background: "rgba(255, 255, 255, 0.08)",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
    },

    detailScore: {
      marginTop: "14px",
      padding: "14px",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      border:
        "1px solid rgba(255, 255, 255, 0.1)",
    },

    detailScoreTop: {
      display: "flex",
      alignItems:
        "center",
      justifyContent:
        "space-between",
      gap: "10px",
    },

    detailScoreValue: {
      fontSize: "24px",
      fontWeight: 900,
      color: "#10E79D",
    },

    detailScoreLabel: {
      fontSize: "9px",
      color: "rgba(226, 232, 240, 0.7)",
      fontWeight: 700,
    },

    detailMetrics: {
      marginTop: "12px",
      display: "grid",
      gridTemplateColumns:
        "repeat(4, minmax(0, 1fr))",
      gap: "6px",
    },

    detailMetric: {
      padding: "9px 5px",
      borderRadius: "11px",
      background: "rgba(255, 255, 255, 0.05)",
      border:
        "1px solid rgba(255, 255, 255, 0.08)",
      textAlign: "center",
    },

    detailMetricValue: {
      fontSize: "13px",
      fontWeight: 900,
      color: "#FFFFFF",
    },

    detailMetricLabel: {
      marginTop: "3px",
      fontSize: "7px",
      color: "rgba(226, 232, 240, 0.65)",
      fontWeight: 700,
    },

    detailSection: {
      marginTop: "14px",
    },

    detailSectionTitle: {
      margin: 0,
      fontSize: "12px",
      fontWeight: 900,
      color: "#FFFFFF",
    },

    detailSubject: {
      marginTop: "7px",
      padding:
        "9px 10px",
      borderRadius: "11px",
      background: "rgba(255, 255, 255, 0.04)",
      border:
        "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems:
        "center",
      justifyContent:
        "space-between",
      gap: "8px",
    },

    detailSubjectName: {
      fontSize: "9.5px",
      fontWeight: 850,
      color: "#FFFFFF",
    },

    detailSubjectMeta: {
      fontSize: "8px",
      color: "rgba(226, 232, 240, 0.7)",
      textAlign: "right",
    },

    detailCloseButton: {
      marginTop: "15px",
      width: "100%",
      height: "43px",
      border: 0,
      borderRadius: "12px",
      background: "linear-gradient(135deg, #10E79D, #007050)",
      color: "#010F0E",
      fontSize: "11px",
      fontWeight: 900,
      cursor: "pointer",
      boxShadow: "0 4px 15px rgba(16, 231, 157, 0.25)",
    },
  };

  return (
    <div style={styles.screen}>
      <style>
        {`
          @keyframes ils-history-pulse {
            0%, 80%, 100% {
              opacity: 0.35;
              transform: scale(0.85);
            }
            40% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

      <div style={styles.phone}>
        {/* =================================================
            HEADER
        ================================================= */}

        <header style={styles.header}>
          <button
            type="button"
            onClick={onBack}
            style={styles.back}
            aria-label="Back"
          >
            <Icon
              type="back"
              size={19}
            />
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
            <Icon
              type="document"
              size={19}
            />
          </div>
        </header>

        <main style={styles.content}>
          {/* =================================================
              INTRO
          ================================================= */}

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

          {/* =================================================
              STATS
          ================================================= */}

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background:
                    "#EAF4FF",
                  color:
                    "#1769D1",
                }}
              >
                <Icon
                  type="document"
                  size={19}
                />
              </div>

              <span style={styles.statValue}>
                {stats.totalTests}
              </span>

              <span style={styles.statLabel}>
                Total Tests
              </span>
            </div>

            <div style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background:
                    "#FFF4CB",
                  color:
                    "#A66A22",
                }}
              >
                <Icon
                  type="trophy"
                  size={19}
                />
              </div>

              <span style={styles.statValue}>
                {stats.bestScore}
              </span>

              <span style={styles.statLabel}>
                Best Score
              </span>
            </div>

            <div style={styles.statCard}>
              <div
                style={{
                  ...styles.statIcon,
                  background:
                    "#EAF8F3",
                  color:
                    "#007050",
                }}
              >
                <Icon
                  type="chart"
                  size={19}
                />
              </div>

              <span style={styles.statValue}>
                {stats.averageScore}
              </span>

              <span style={styles.statLabel}>
                Average Score
              </span>
            </div>
          </div>

          {/* =================================================
              HISTORY HEADER
          ================================================= */}

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap: "8px",
              marginBottom:
                "10px",
            }}
          >
            <h2
              style={{
                ...styles.sectionTitle,
                marginBottom: 0,
              }}
            >
              Your Tests
            </h2>

            <button
              type="button"
              onClick={loadHistory}
              disabled={loading}
              style={{
                width: "34px",
                height: "34px",
                border:
                  "1px solid #DCE7E2",
                borderRadius: "10px",
                background:
                  "#FFFFFF",
                color:
                  "#007050",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                cursor:
                  loading
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  loading ? 0.5 : 1,
              }}
              aria-label="Refresh history"
            >
              <Icon
                type="refresh"
                size={16}
              />
            </button>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div
              style={
                styles.stateCard
              }
            >
              <div
                style={{
                  ...styles.stateIcon,
                  background:
                    "#EAF8F3",
                }}
              >
                <Icon
                  type="refresh"
                  size={19}
                />
              </div>

              <div
                style={
                  styles.stateTitle
                }
              >
                Loading your tests
              </div>

              <div
                style={
                  styles.stateText
                }
              >
                Fetching your latest test attempts.
              </div>

              <div
                style={
                  styles.loadingDots
                }
              >
                <span
                  style={{
                    ...styles.loadingDot,
                    animationDelay:
                      "0ms",
                  }}
                />
                <span
                  style={{
                    ...styles.loadingDot,
                    animationDelay:
                      "150ms",
                  }}
                />
                <span
                  style={{
                    ...styles.loadingDot,
                    animationDelay:
                      "300ms",
                  }}
                />
              </div>
            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!loading &&
            error && (
              <div
                style={{
                  ...styles.stateCard,
                  background:
                    "#FFF8F8",
                  border:
                    "1px solid #F1D8D8",
                }}
              >
                <div
                  style={{
                    ...styles.stateIcon,
                    background:
                      "#FFF0F0",
                    color:
                      "#D94A68",
                  }}
                >
                  <Icon
                    type="close"
                    size={19}
                  />
                </div>

                <div
                  style={{
                    ...styles.stateTitle,
                    color:
                      "#8E3145",
                  }}
                >
                  Unable to load history
                </div>

                <div
                  style={
                    styles.stateText
                  }
                >
                  {error}
                </div>

                <button
                  type="button"
                  onClick={
                    loadHistory
                  }
                  style={
                    styles.retryButton
                  }
                >
                  <Icon
                    type="refresh"
                    size={14}
                  />
                  Try Again
                </button>
              </div>
            )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            results.length ===
              0 && (
              <div
                style={
                  styles.stateCard
                }
              >
                <div
                  style={
                    styles.stateIcon
                  }
                >
                  <Icon
                    type="document"
                    size={19}
                  />
                </div>

                <div
                  style={
                    styles.stateTitle
                  }
                >
                  No tests yet
                </div>

                <div
                  style={
                    styles.stateText
                  }
                >
                  Complete your first mock or practice
                  test and your result will appear here.
                </div>
              </div>
            )}

          {/* =================================================
              REAL HISTORY
          ================================================= */}

          {!loading &&
            !error &&
            results.length >
              0 && (
              <div
                style={
                  styles.list
                }
              >
                {results.map(
                  (test) => {
                    const percentage =
                      test.totalMarks >
                      0
                        ? Math.round(
                            (test.score /
                              test.totalMarks) *
                              100
                          )
                        : Math.round(
                            test.accuracy || 0
                          );

                    return (
                      <button
                        key={
                          test.id
                        }
                        type="button"
                        onClick={() =>
                          setSelectedResult(
                            test
                          )
                        }
                        style={
                          styles.testCard
                        }
                      >
                        <div
                          style={
                            styles.testIcon
                          }
                        >
                          <Icon
                            type="document"
                            size={19}
                          />
                        </div>

                        <div
                          style={
                            styles.testMain
                          }
                        >
                          <span
                            style={
                              styles.testName
                            }
                          >
                            {
                              test.testTitle
                            }
                          </span>

                          <span
                            style={
                              styles.testDate
                            }
                          >
                            {test.exam}
                            {" • "}
                            {formatDate(
                              test.createdAt
                            )}
                          </span>
                        </div>

                        <div>
                          <span
                            style={
                              styles.testScore
                            }
                          >
                            {
                              test.score
                            }{" "}
                            /
                            {" "}
                            {
                              test.totalMarks
                            }
                          </span>

                          <span
                            style={{
                              ...styles.testPercentage,
                              color:
                                percentage >=
                                80
                                  ? "#007050"
                                  : percentage >=
                                    60
                                  ? "#A66A22"
                                  : "#D94A68",
                            }}
                          >
                            {
                              percentage
                            }%
                          </span>
                        </div>

                        <span
                          style={
                            styles.arrow
                          }
                        >
                          <Icon
                            type="arrow"
                            size={15}
                          />
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            )}

          {/* =================================================
              KEEP GOING
          ================================================= */}

          {!loading &&
            !error &&
            results.length >
              0 && (
              <div
                style={
                  styles.keepCard
                }
              >
                <div
                  style={
                    styles.keepIcon
                  }
                >
                  <Icon
                    type="chart"
                    size={18}
                  />
                </div>

                <div>
                  <p
                    style={
                      styles.keepTitle
                    }
                  >
                    Keep going!
                  </p>

                  <p
                    style={
                      styles.keepText
                    }
                  >
                    Your real test history is now being
                    tracked. Attempt more tests to improve
                    your preparation.
                  </p>
                </div>
              </div>
            )}

          <button
            type="button"
            onClick={onBack}
            style={
              styles.backButton
            }
          >
            ← Back to Dashboard
          </button>
        </main>

        {/* =================================================
            RESULT DETAILS
        ================================================= */}

        {selectedResult && (
          <div
            style={
              styles.detailOverlay
            }
            onClick={
              closeDetails
            }
          >
            <div
              style={
                styles.detailSheet
              }
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div
                style={
                  styles.detailTop
                }
              >
                <div
                  style={
                    styles.detailTitleWrap
                  }
                >
                  <h3
                    style={
                      styles.detailTitle
                    }
                  >
                    {
                      selectedResult.testTitle
                    }
                  </h3>

                  <div
                    style={
                      styles.detailSub
                    }
                  >
                    {
                      selectedResult.exam
                    }
                    {" • "}
                    {formatDate(
                      selectedResult.createdAt
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    closeDetails
                  }
                  style={
                    styles.closeButton
                  }
                  aria-label="Close"
                >
                  <Icon
                    type="close"
                    size={17}
                  />
                </button>
              </div>

              <div
                style={
                  styles.detailScore
                }
              >
                <div
                  style={
                    styles.detailScoreTop
                  }
                >
                  <div>
                    <div
                      style={
                        styles.detailScoreValue
                      }
                    >
                      {
                        selectedResult.score
                      }
                      {" / "}
                      {
                        selectedResult.totalMarks
                      }
                    </div>

                    <div
                      style={
                        styles.detailScoreLabel
                      }
                    >
                      Final Score
                    </div>
                  </div>

                  <div
                    style={{
                      padding:
                        "7px 9px",
                      borderRadius:
                        "9px",
                      background:
                        "#FFFFFF",
                      color:
                        "#007050",
                      fontSize:
                        "10px",
                      fontWeight:
                        900,
                    }}
                  >
                    {
                      Math.round(
                        selectedResult.accuracy ||
                          0
                      )
                    }
                    % accuracy
                  </div>
                </div>

                <div
                  style={
                    styles.detailMetrics
                  }
                >
                  <div
                    style={
                      styles.detailMetric
                    }
                  >
                    <div
                      style={{
                        ...styles.detailMetricValue,
                        color:
                          "#007050",
                      }}
                    >
                      {
                        selectedResult.correct
                      }
                    </div>

                    <div
                      style={
                        styles.detailMetricLabel
                      }
                    >
                      Correct
                    </div>
                  </div>

                  <div
                    style={
                      styles.detailMetric
                    }
                  >
                    <div
                      style={{
                        ...styles.detailMetricValue,
                        color:
                          "#D94A68",
                      }}
                    >
                      {
                        selectedResult.incorrect
                      }
                    </div>

                    <div
                      style={
                        styles.detailMetricLabel
                      }
                    >
                      Incorrect
                    </div>
                  </div>

                  <div
                    style={
                      styles.detailMetric
                    }
                  >
                    <div
                      style={
                        styles.detailMetricValue
                      }
                    >
                      {
                        selectedResult.skipped
                      }
                    </div>

                    <div
                      style={
                        styles.detailMetricLabel
                      }
                    >
                      Skipped
                    </div>
                  </div>

                  <div
                    style={
                      styles.detailMetric
                    }
                  >
                    <div
                      style={
                        styles.detailMetricValue
                      }
                    >
                      {
                        selectedResult.attempted
                      }
                    </div>

                    <div
                      style={
                        styles.detailMetricLabel
                      }
                    >
                      Attempted
                    </div>
                  </div>
                </div>
              </div>

              {/* SUBJECT RESULTS */}

              {selectedResult
                .subjectResults
                .length >
                0 && (
                <div
                  style={
                    styles.detailSection
                  }
                >
                  <h4
                    style={
                      styles.detailSectionTitle
                    }
                  >
                    Subject Performance
                  </h4>

                  {selectedResult.subjectResults.map(
                    (
                      subject,
                      index
                    ) => (
                      <div
                        key={
                          `${subject.subject || subject.name || "subject"}-${index}`
                        }
                        style={
                          styles.detailSubject
                        }
                      >
                        <div>
                          <div
                            style={
                              styles.detailSubjectName
                            }
                          >
                            {
                              subject.subject ||
                                subject.name ||
                                "Subject"
                            }
                          </div>
                        </div>

                        <div
                          style={
                            styles.detailSubjectMeta
                          }
                        >
                          {
                            subject.correct ??
                              0
                          }
                          {" correct • "}
                          {
                            subject.score ??
                              0
                          }
                          {" marks"}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* CHAPTER RESULTS */}

              {selectedResult
                .chapterResults
                .length >
                0 && (
                <div
                  style={
                    styles.detailSection
                  }
                >
                  <h4
                    style={
                      styles.detailSectionTitle
                    }
                  >
                    Chapter Performance
                  </h4>

                  {selectedResult.chapterResults
                    .slice(0, 8)
                    .map(
                      (
                        chapter,
                        index
                      ) => (
                        <div
                          key={
                            `${chapter.chapter || chapter.chapterName || "chapter"}-${index}`
                          }
                          style={
                            styles.detailSubject
                          }
                        >
                          <div>
                            <div
                              style={
                                styles.detailSubjectName
                              }
                            >
                              {
                                chapter.chapter ||
                                  chapter.chapterName ||
                                  "Chapter"
                              }
                            </div>
                          </div>

                          <div
                            style={
                              styles.detailSubjectMeta
                            }
                          >
                            {
                              chapter.correct ??
                                0
                            }
                            {" correct • "}
                            {
                              chapter.score ??
                                0
                            }
                            {" marks"}
                          </div>
                        </div>
                      )
                    )}
                </div>
              )}

              <button
                type="button"
                onClick={
                  closeDetails
                }
                style={
                  styles.detailCloseButton
                }
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}