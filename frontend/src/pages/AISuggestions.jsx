import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

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
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3-1.3 5.1L6 10l4.7 1.9L12 17l1.3-5.1L18 10l-4.7-1.9L12 3Z" />
          <path d="m19 15-.6 2.4L16 18l2.4.6L19 21l.6-2.4L22 18l-2.4-.6L19 15Z" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
          <path d="M4 5.5v16" />
          <path d="M8 7h8" />
          <path d="M8 11h7" />
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

    case "trend":
      return (
        <svg {...common}>
          <path d="M4 17 10 11l4 4 6-8" />
          <path d="M15 7h5v5" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "brain":
      return (
        <svg {...common}>
          <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.5A3 3 0 0 0 4 11.3a3 3 0 0 0 2.2 2.9A3.5 3.5 0 0 0 9.5 18H10v2h4v-2h.5a3.5 3.5 0 0 0 3.3-3.8 3 3 0 0 0 2.2-2.9A3 3 0 0 0 18 8.5V8a3.5 3.5 0 0 0-3.5-3.5" />
          <path d="M10 8v10" />
          <path d="M14 8v10" />
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

const defaultRecommendations = [
  {
    priority: "HIGH PRIORITY",
    title: "Strengthen Electrostatics",
    chapter: "Physics • Electrostatics",
    icon: "target",
    description:
      "Revise core charge distribution concepts first, then attempt 15–20 targeted numerical questions.",
    action: "Practice Electrostatics",
  },
  {
    priority: "HIGH PRIORITY",
    title: "Revise Chemical Equilibrium",
    chapter: "Chemistry • Equilibrium",
    icon: "book",
    description:
      "Strengthen Le Chatelier's principle and equilibrium constant calculations with formula drills.",
    action: "Practice Equilibrium",
  },
  {
    priority: "MEDIUM PRIORITY",
    title: "Improve Genetics Accuracy",
    chapter: "Biology • Genetics",
    icon: "brain",
    description:
      "Dihybrid crosses and pedigree analysis require methodical diagram-based elimination practice.",
    action: "Practice Genetics",
  },
];

const studyPlan = [
  {
    day: "DAY 1",
    title: "Concept Revision",
    text: "Revise your weakest chapter and prepare a 1-page formula & key theorem summary.",
    time: "45 min",
  },
  {
    day: "DAY 2",
    title: "Targeted Practice",
    text: "Attempt 20–25 chapter-specific questions with a strict time limit of 40 minutes.",
    time: "40 min",
  },
  {
    day: "DAY 3",
    title: "Error Review",
    text: "Re-attempt all previously incorrect questions without checking solutions first.",
    time: "30 min",
  },
  {
    day: "DAY 4",
    title: "Mini Test",
    text: "Take a timed mixed-subject quiz and compare accuracy against your last attempt.",
    time: "45 min",
  },
];

export default function AISuggestions({
  profile,
  onBack,
  onOpenSection,
}) {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const userMobile =
          profile?.mobile ||
          (typeof localStorage !== "undefined"
            ? localStorage.getItem("ils_user_mobile")
            : "") ||
          "";
        if (!userMobile) return;

        const params = new URLSearchParams({ mobile: userMobile });
        const res = await fetch(`${API_URL}/api/analytics?${params.toString()}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data?.success && !cancelled) {
          setAnalytics(data);
        }
      } catch (err) {
        console.warn("AI suggestions analytics notice:", err);
      }
    }

    loadStats();
    return () => {
      cancelled = true;
    };
  }, [profile]);

  const avgAccuracy =
    analytics?.summary?.avgAccuracy != null
      ? Math.round(analytics.summary.avgAccuracy)
      : 61;

  const focusCount =
    analytics?.subjects?.filter((s) => s.accuracy < 60)?.length || 3;

  const targetGain = Math.max(10, Math.min(25, Math.round(100 - avgAccuracy) / 2));

  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        <PageHeader
          title="AI Suggestions"
          onBack={onBack}
          onOpenMenu={onOpenSection}
        />

        <main style={styles.container}>
          {/* AI HEADER */}
          <section style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={styles.heroIconWrap}>
                <Icon name="spark" size={24} color="#010F0E" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={styles.kicker}>PERSONALIZED AI ANALYSIS</span>
                <h1 style={styles.heroHeading}>AI-Powered Suggestions</h1>
                <p style={styles.heroText}>
                  Smart recommendations based on your recent test performance.
                </p>
              </div>
            </div>
          </section>

          {/* AI SUMMARY CARD */}
          <section style={{ ...styles.card, marginTop: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <Icon name="brain" size={20} color="#10E79D" />
              <strong style={styles.sectionSubTitle}>
                What your performance indicates
              </strong>
            </div>

            <p style={styles.bodyText}>
              You are performing well in foundational topics, but accuracy drops
              when questions require multi-step reasoning. Your fastest
              improvement will come from targeted practice in identified focus areas.
            </p>

            <div style={styles.threeColumnGrid}>
              <div style={styles.statBoxGreen}>
                <strong style={styles.statBoxValueGreen}>
                  {focusCount}
                </strong>
                <span style={styles.statBoxLabel}>Focus Areas</span>
              </div>

              <div style={styles.statBoxAmber}>
                <strong style={styles.statBoxValueAmber}>
                  {avgAccuracy}%
                </strong>
                <span style={styles.statBoxLabel}>Accuracy</span>
              </div>

              <div style={styles.statBoxBlue}>
                <strong style={styles.statBoxValueBlue}>
                  +{Math.round(targetGain)}%
                </strong>
                <span style={styles.statBoxLabel}>Target Gain</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenSection("rank-improvement")}
              style={styles.trajectoryButton}
            >
              <Icon name="trend" size={16} color="#10E79D" />
              <span>Check Live Rank Improvement & Projection →</span>
            </button>
          </section>

          {/* RECOMMENDATIONS */}
          <section style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={styles.kicker}>SMART RECOMMENDATIONS</span>
              <h2 style={styles.sectionHeading}>What to do next</h2>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {defaultRecommendations.map((item) => (
                <div key={item.title} style={styles.card}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={styles.recommendationIconWrap}>
                      <Icon name={item.icon} size={20} color="#10E79D" />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          ...styles.priorityBadge,
                          background:
                            item.priority === "HIGH PRIORITY"
                              ? "rgba(244, 63, 94, 0.15)"
                              : "rgba(245, 158, 11, 0.15)",
                          color:
                            item.priority === "HIGH PRIORITY"
                              ? "#FB7185"
                              : "#FBBF24",
                        }}
                      >
                        {item.priority}
                      </span>

                      <h3 style={styles.itemTitle}>{item.title}</h3>
                      <span style={styles.itemChapter}>{item.chapter}</span>
                      <p style={styles.itemDescription}>{item.description}</p>

                      <button
                        type="button"
                        onClick={() => onOpenSection("practice")}
                        style={styles.practiceButton}
                      >
                        <span>{item.action}</span>
                        <Icon name="arrow" size={14} color="#10E79D" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4-DAY STUDY PLAN */}
          <section style={{ marginTop: "16px" }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={styles.kicker}>RECOMMENDED ROUTINE</span>
              <h2 style={styles.sectionHeading}>4-Day Improvement Plan</h2>
            </div>

            <div style={styles.card}>
              {studyPlan.map((item, index) => (
                <div
                  key={item.day}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding:
                      index === studyPlan.length - 1 ? "0" : "0 0 14px",
                    marginTop: index === 0 ? 0 : "14px",
                    borderBottom:
                      index === studyPlan.length - 1
                        ? "none"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    style={{
                      ...styles.dayBadge,
                      background:
                        index === 0
                          ? "linear-gradient(135deg, #10E79D 0%, #007050 100%)"
                          : "rgba(255, 255, 255, 0.08)",
                      color: index === 0 ? "#010F0E" : "#10E79D",
                    }}
                  >
                    {item.day.replace("DAY ", "D")}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <strong style={styles.planTitle}>{item.title}</strong>

                      <span style={styles.planTimeBadge}>
                        <Icon name="clock" size={13} color="#10E79D" />
                        <span>{item.time}</span>
                      </span>
                    </div>

                    <p style={styles.planText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EXPECTED IMPROVEMENT CALLOUT */}
          <section style={{ ...styles.card, marginTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={styles.calloutIconWrap}>
                <Icon name="trend" size={22} color="#10E79D" />
              </div>

              <div>
                <span style={styles.kicker}>POTENTIAL IMPROVEMENT</span>
                <strong style={styles.calloutScore}>
                  +{Math.round(targetGain)}%
                </strong>
              </div>
            </div>

            <p style={styles.calloutText}>
              Following this targeted revision routine consistently will help convert
              weak areas into scoring chapters on your actual exam day.
            </p>

            <button
              type="button"
              onClick={() => onOpenSection("practice")}
              style={styles.primaryButton}
            >
              Start My Improvement Plan →
            </button>
          </section>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={onBack}
            style={styles.backOutlineButton}
          >
            ← Back to Weakness Insights
          </button>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   STYLES
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

  heroIconWrap: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #10E79D 0%, #007050 100%)",
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

  sectionSubTitle: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 800,
  },

  bodyText: {
    margin: "10px 0 0",
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: "12.5px",
    lineHeight: 1.55,
  },

  threeColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginTop: "14px",
  },

  statBoxGreen: {
    padding: "12px 6px",
    borderRadius: "14px",
    background: "rgba(16, 231, 157, 0.1)",
    border: "1px solid rgba(16, 231, 157, 0.2)",
    textAlign: "center",
  },

  statBoxValueGreen: {
    display: "block",
    color: "#10E79D",
    fontSize: "18px",
    fontWeight: 900,
  },

  statBoxAmber: {
    padding: "12px 6px",
    borderRadius: "14px",
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.2)",
    textAlign: "center",
  },

  statBoxValueAmber: {
    display: "block",
    color: "#F59E0B",
    fontSize: "18px",
    fontWeight: 900,
  },

  statBoxBlue: {
    padding: "12px 6px",
    borderRadius: "14px",
    background: "rgba(56, 189, 248, 0.1)",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    textAlign: "center",
  },

  statBoxValueBlue: {
    display: "block",
    color: "#38BDF8",
    fontSize: "18px",
    fontWeight: 900,
  },

  statBoxLabel: {
    display: "block",
    marginTop: "4px",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: "11px",
    fontWeight: 700,
  },

  trajectoryButton: {
    width: "100%",
    marginTop: "14px",
    padding: "13px 14px",
    border: "1px solid rgba(16, 231, 157, 0.3)",
    borderRadius: "14px",
    background: "rgba(16, 231, 157, 0.12)",
    color: "#10E79D",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  sectionHeading: {
    margin: "4px 0 0",
    color: "#FFFFFF",
    fontSize: "17px",
    fontWeight: 800,
  },

  recommendationIconWrap: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  priorityBadge: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "7px",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.04em",
  },

  itemTitle: {
    margin: "6px 0 3px",
    color: "#FFFFFF",
    fontSize: "15px",
    fontWeight: 800,
  },

  itemChapter: {
    display: "block",
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: "12px",
    fontWeight: 600,
  },

  itemDescription: {
    margin: "8px 0 0",
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: "12.5px",
    lineHeight: 1.5,
  },

  practiceButton: {
    marginTop: "10px",
    border: "none",
    padding: 0,
    background: "transparent",
    color: "#10E79D",
    fontSize: "13px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
  },

  dayBadge: {
    width: "36px",
    height: "36px",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 900,
    flexShrink: 0,
  },

  planTitle: {
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 800,
  },

  planTimeBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: "#10E79D",
    fontSize: "12px",
    fontWeight: 750,
  },

  planText: {
    margin: "5px 0 0",
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: "12.5px",
    lineHeight: 1.5,
  },

  calloutIconWrap: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "rgba(16, 231, 157, 0.15)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  calloutScore: {
    display: "block",
    marginTop: "2px",
    fontSize: "20px",
    color: "#10E79D",
    fontWeight: 900,
  },

  calloutText: {
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
};