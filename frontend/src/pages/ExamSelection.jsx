import React, { useState } from "react";

const exams = [
  {
    id: "neet",
    name: "NEET UG",
    description: "Medical",
    icon: "⚕",
    bg: "#EAF8F3",
    color: "#007050",
  },
  {
    id: "jee-main",
    name: "JEE Main",
    description: "Engineering",
    icon: "⚙",
    bg: "#F2EAFE",
    color: "#7B35C8",
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    description: "IIT Admission",
    icon: "🎓",
    bg: "#FFF1DF",
    color: "#A66A22",
  },
  {
    id: "cuet",
    name: "CUET UG",
    description: "Central Universities",
    icon: "▣",
    bg: "#EAF4FF",
    color: "#1769D1",
  },
  {
    id: "neet-pg",
    name: "NEET PG",
    description: "PG Medical",
    icon: "♥",
    bg: "#EAF5FF",
    color: "#1769D1",
  },
  {
    id: "aiims",
    name: "AIIMS",
    description: "Medical",
    icon: "◎",
    bg: "#EAF8F3",
    color: "#08795D",
  },
  {
    id: "nursing",
    name: "Nursing",
    description: "Nursing",
    icon: "▣",
    bg: "#F0EAFE",
    color: "#673AB7",
  },
  {
    id: "paramedical",
    name: "Paramedical",
    description: "Paramedical",
    icon: "♟",
    bg: "#EAF4FF",
    color: "#1976D2",
  },
];

export default function ExamSelection({
  selectedExams,
  onToggleExam,
  onContinue,
  onBack,
}) {
  const [pressedExam, setPressedExam] = useState(null);

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
      background: "#FFFFFF",
      borderRadius: "30px",
      border: "1px solid #DDE7E3",
      boxShadow: "0 16px 40px rgba(8, 47, 60, 0.10)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },

    top: {
      padding: "28px 25px 16px",
      background: "#FFFFFF",
    },

    back: {
      border: 0,
      background: "transparent",
      color: "#4B666D",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
      padding: 0,
      marginBottom: "22px",
    },

    title: {
      margin: 0,
      fontSize: "31px",
      lineHeight: 1.12,
      fontWeight: 850,
      color: "#082F3C",
      letterSpacing: "-0.8px",
      maxWidth: "330px",
    },

    subtitle: {
      margin: "12px 0 0",
      fontSize: "14px",
      lineHeight: 1.55,
      color: "#68777B",
      maxWidth: "310px",
    },

    list: {
      padding: "4px 20px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "9px",
      overflowY: "auto",
      flex: 1,
    },

    card: {
      width: "100%",
      minHeight: "70px",
      padding: "10px 13px",
      borderRadius: "17px",
      border: "1px solid #E1EAE6",
      background: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      textAlign: "left",
      cursor: "pointer",
      boxSizing: "border-box",
      transition: "all 0.15s ease",
    },

    selectedCard: {
      border: "1.5px solid #007050",
      background: "#F4FBF7",
    },

    pressedCard: {
      transform: "scale(0.985)",
    },

    icon: {
      width: "45px",
      height: "45px",
      borderRadius: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "20px",
      fontWeight: 800,
    },

    text: {
      flex: 1,
      minWidth: 0,
      paddingLeft: "13px",
      paddingRight: "8px",
    },

    name: {
      display: "block",
      fontSize: "14px",
      lineHeight: 1.2,
      fontWeight: 800,
      color: "#173747",
      marginBottom: "4px",
    },

    description: {
      display: "block",
      fontSize: "11px",
      lineHeight: 1.25,
      color: "#7B888C",
    },

    arrow: {
      fontSize: "24px",
      color: "#849195",
      lineHeight: 1,
      flexShrink: 0,
    },

    tick: {
      width: "21px",
      height: "21px",
      borderRadius: "50%",
      background: "#007050",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: 800,
      flexShrink: 0,
    },

    footer: {
      padding: "12px 20px 17px",
      borderTop: "1px solid #ECF1EF",
      background: "#FFFFFF",
    },

    step: {
      margin: "0 0 9px",
      textAlign: "center",
      fontSize: "11px",
      color: "#8A9795",
      fontWeight: 700,
    },

    button: {
      width: "100%",
      height: "54px",
      border: 0,
      borderRadius: "16px",
      background: "#007050",
      color: "#FFFFFF",
      fontSize: "15px",
      fontWeight: 800,
      cursor: selectedExams.length ? "pointer" : "not-allowed",
      opacity: selectedExams.length ? 1 : 0.48,
      boxShadow: "0 7px 16px rgba(0, 112, 80, 0.18)",
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

          <h1 style={styles.title}>
            Which exam are you
            <br />
            preparing for?
          </h1>

          <p style={styles.subtitle}>
            Choose your exam to get a personalised experience.
          </p>
        </div>

        <div style={styles.list}>
          {exams.map((exam) => {
            const selected = selectedExams.includes(exam.id);

            return (
              <button
                key={exam.id}
                type="button"
                onMouseDown={() => setPressedExam(exam.id)}
                onMouseUp={() => setPressedExam(null)}
                onMouseLeave={() => setPressedExam(null)}
                onTouchStart={() => setPressedExam(exam.id)}
                onTouchEnd={() => setPressedExam(null)}
                onClick={() => onToggleExam(exam.id)}
                style={{
                  ...styles.card,
                  ...(selected ? styles.selectedCard : {}),
                  ...(pressedExam === exam.id
                    ? styles.pressedCard
                    : {}),
                }}
              >
                <div
                  style={{
                    ...styles.icon,
                    background: exam.bg,
                    color: exam.color,
                  }}
                >
                  {exam.icon}
                </div>

                <div style={styles.text}>
                  <span style={styles.name}>
                    {exam.name}
                  </span>

                  <span style={styles.description}>
                    {exam.description}
                  </span>
                </div>

                {selected ? (
                  <div style={styles.tick}>✓</div>
                ) : (
                  <div style={styles.arrow}>›</div>
                )}
              </button>
            );
          })}
        </div>

        <div style={styles.footer}>
          <p style={styles.step}>Step 1 of 3</p>

          <button
            type="button"
            onClick={onContinue}
            disabled={!selectedExams.length}
            style={styles.button}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}