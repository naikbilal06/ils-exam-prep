import React from "react";

export default function NameSetup({
  name,
  setName,
  onCreateAccount,
  onBack,
}) {
  const styles = {
    screen: {
      minHeight: "100vh",
      background: "#F4FBF7",
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },

    phone: {
      width: "100%",
      maxWidth: "390px",
      minHeight: "720px",
      background: "#FFFFFF",
      borderRadius: "32px",
      border: "1px solid #E2ECE8",
      boxShadow: "0 16px 40px rgba(8, 47, 60, 0.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },

    top: {
      padding: "26px 20px 8px",
      background: "#F4FBF7",
    },

    back: {
      border: 0,
      background: "transparent",
      color: "#007050",
      fontSize: "14px",
      fontWeight: 700,
      cursor: "pointer",
      padding: 0,
    },

    content: {
      padding: "28px 22px 22px",
      flex: 1,
    },

    icon: {
      width: "50px",
      height: "50px",
      borderRadius: "15px",
      background: "#EAF5F1",
      color: "#007050",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "21px",
      marginBottom: "20px",
    },

    title: {
      margin: 0,
      fontSize: "28px",
      lineHeight: 1.18,
      fontWeight: 800,
      color: "#082F3C",
    },

    description: {
      margin: "11px 0 28px",
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#68777B",
    },

    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "13px",
      fontWeight: 800,
      color: "#082F3C",
    },

    input: {
      width: "100%",
      height: "55px",
      border: "1px solid #DCE5E2",
      borderRadius: "15px",
      background: "#FFFFFF",
      padding: "0 14px",
      fontSize: "15px",
      color: "#082F3C",
      outline: "none",
      boxSizing: "border-box",
    },

    button: {
      width: "100%",
      height: "54px",
      marginTop: "22px",
      border: 0,
      borderRadius: "15px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 800,
      cursor: name.trim() ? "pointer" : "not-allowed",
    },

    note: {
      margin: "18px 0 0",
      fontSize: "11px",
      lineHeight: 1.45,
      color: "#899694",
      textAlign: "center",
    },

    footer: {
      padding: "18px 22px 22px",
      borderTop: "1px solid #E7EEEB",
      background: "#FFFFFF",
    },

    footerText: {
      margin: 0,
      textAlign: "center",
      fontSize: "10px",
      color: "#A0AAA7",
    },
  };

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>
        <div style={styles.top}>
          <button
            type="button"
            onClick={onBack}
            style={styles.back}
          >
            ← Back
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.icon}>👋</div>

          <h1 style={styles.title}>
            Let’s get to know you
          </h1>

          <p style={styles.description}>
            Enter your name to personalise your ILS Exam Prep experience.
          </p>

          <label
            htmlFor="student-name"
            style={styles.label}
          >
            Your Name
          </label>

          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            autoFocus
            maxLength={60}
            style={styles.input}
          />

          <button
            type="button"
            onClick={onCreateAccount}
            disabled={!name.trim()}
            style={{
              ...styles.button,
              opacity: name.trim() ? 1 : 0.55,
            }}
          >
            Continue
          </button>

          <p style={styles.note}>
            Your profile helps us personalise your preparation.
          </p>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Personalised exam preparation
          </p>
        </div>
      </div>
    </div>
  );
}