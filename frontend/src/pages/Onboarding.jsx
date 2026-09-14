import React from "react";

export default function Onboarding({ onContinue }) {
  const styles = {
    screen: {
      minHeight: "100dvh",
      height: "100dvh",
      boxSizing: "border-box",
      background: "#F4FBF7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      overflow: "hidden",
    },

    phone: {
      width: "100%",
      maxWidth: "390px",
      height: "100dvh",
      minHeight: 0,
      background: "#FFFFFF",
      borderRadius: "0",
      border: "0",
      boxShadow: "none",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },

    topSpace: {
      height: "58px",
      flexShrink: 0,
      background: "#F4FBF7",
    },

    hero: {
      padding: "36px 28px 18px",
      textAlign: "center",
      background:
        "linear-gradient(180deg, #F4FBF7 0%, #FFFFFF 100%)",
      flexShrink: 0,
    },

    logoBox: {
      width: "78px",
      height: "78px",
      margin: "0 auto 24px",
      borderRadius: "24px",
      background: "#007050",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      fontSize: "27px",
      fontWeight: 800,
      boxShadow:
        "0 10px 24px rgba(0, 112, 80, 0.18)",
    },

    title: {
      margin: 0,
      fontSize: "30px",
      lineHeight: 1.15,
      fontWeight: 800,
      color: "#082F3C",
    },

    subtitle: {
      margin: "14px 0 0",
      fontSize: "15px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    features: {
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "11px",
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    },

    feature: {
      display: "flex",
      alignItems: "center",
      gap: "13px",
      padding: "14px",
      borderRadius: "16px",
      background: "#F8FCFA",
      border: "1px solid #E2ECE8",
      flexShrink: 0,
    },

    featureIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      background: "#EAF5F1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#007050",
      fontSize: "19px",
      fontWeight: 800,
      flexShrink: 0,
    },

    featureText: {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      minWidth: 0,
    },

    featureTitle: {
      fontSize: "14px",
      fontWeight: 800,
      color: "#082F3C",
    },

    featureDescription: {
      fontSize: "12px",
      lineHeight: 1.35,
      color: "#718083",
    },

    bottom: {
      padding: "16px 20px 22px",
      borderTop: "1px solid #E7EEEB",
      background: "#FFFFFF",
      flexShrink: 0,
    },

    button: {
      width: "100%",
      height: "54px",
      border: 0,
      borderRadius: "15px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "16px",
      fontWeight: 800,
      cursor: "pointer",
      boxShadow:
        "0 8px 18px rgba(0, 112, 80, 0.18)",
    },

    note: {
      margin: "11px 0 0",
      textAlign: "center",
      fontSize: "11px",
      color: "#8A9698",
    },
  };

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>
        <div style={styles.topSpace} />

        <div style={styles.hero}>
          <div style={styles.logoBox}>ILS</div>

          <h1 style={styles.title}>
            Prepare Smarter.
          </h1>

          <p style={styles.subtitle}>
            Everything you need to prepare for NEET, JEE and CUET in one
            place.
          </p>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>✓</div>

            <div style={styles.featureText}>
              <span style={styles.featureTitle}>
                Practice Questions
              </span>

              <span style={styles.featureDescription}>
                Strengthen concepts with focused practice.
              </span>
            </div>
          </div>

          <div style={styles.feature}>
            <div style={styles.featureIcon}>▣</div>

            <div style={styles.featureText}>
              <span style={styles.featureTitle}>
                Mock Tests
              </span>

              <span style={styles.featureDescription}>
                Build speed and accuracy with exam-style tests.
              </span>
            </div>
          </div>

          <div style={styles.feature}>
            <div style={styles.featureIcon}>◫</div>

            <div style={styles.featureText}>
              <span style={styles.featureTitle}>
                Smart Analysis
              </span>

              <span style={styles.featureDescription}>
                Track your performance and improve weak subjects.
              </span>
            </div>
          </div>

          <div style={styles.feature}>
            <div style={styles.featureIcon}>AI</div>

            <div style={styles.featureText}>
              <span style={styles.featureTitle}>
                AI Counsellor
              </span>

              <span style={styles.featureDescription}>
                Get personalised guidance for your preparation.
              </span>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <button
            type="button"
            onClick={onContinue}
            style={styles.button}
          >
            Get Started
          </button>

          <p style={styles.note}>
            Personalised preparation starts with a few simple steps.
          </p>
        </div>
      </div>
    </div>
  );
}