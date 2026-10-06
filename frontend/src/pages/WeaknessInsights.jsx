import React from "react";
import PageHeader from "../components/PageHeader";

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
    case "warning":
      return (
        <svg {...common}>
          <path d="M10.3 4.7 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );

    case "book":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
          <path d="M4 5.5v16" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
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

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
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

const weakAreas = [
  {
    subject: "Physics",
    chapter: "Electrostatics",
    accuracy: 42,
    attempted: 12,
    wrong: 7,
    level: "Needs Attention",
    recommendation:
      "Revise electric field, potential and capacitor concepts.",
  },
  {
    subject: "Chemistry",
    chapter: "Equilibrium",
    accuracy: 48,
    attempted: 10,
    wrong: 5,
    level: "Needs Attention",
    recommendation:
      "Focus on equilibrium constant and Le Chatelier principle.",
  },
  {
    subject: "Biology",
    chapter: "Genetics",
    accuracy: 54,
    attempted: 11,
    wrong: 5,
    level: "Improve",
    recommendation:
      "Practice Mendelian inheritance and pedigree-based questions.",
  },
];

const strengths = [
  {
    subject: "Biology",
    chapter: "Cell Biology",
    accuracy: 88,
  },
  {
    subject: "Physics",
    chapter: "Current Electricity",
    accuracy: 82,
  },
  {
    subject: "Chemistry",
    chapter: "Atomic Structure",
    accuracy: 80,
  },
];

export default function WeaknessInsights({
  profile,
  onBack,
  onOpenSection,
}) {
  const overallAccuracy = 61;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        background:
          "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "100dvh",
          boxSizing: "border-box",
        }}
      >
        <PageHeader
          title="Weakness Insights"
          onBack={onBack}
          onOpenMenu={onOpenSection}
        />

        <main
          style={{
            width: "100%",
            maxWidth: "430px",
            margin: "0 auto",
            padding: "14px 16px 115px",
            boxSizing: "border-box",
          }}
        >
        {/* HEADER CARD */}
        <section
          style={{
            padding: "18px",
            borderRadius: "22px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "11px",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "14px",
                background: "rgba(245, 158, 11, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 45px",
              }}
            >
              <Icon
                name="warning"
                size={23}
                color="#FBBF24"
              />
            </div>

            <div>
              <span
                style={{
                  color: "#10E79D",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                PERSONALIZED ANALYSIS
              </span>

              <h1
                style={{
                  margin: "4px 0 3px",
                  color: "#FFFFFF",
                  fontSize: "20px",
                  fontWeight: 900,
                }}
              >
                Weakness Insights
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "rgba(226, 232, 240, 0.75)",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                Identify the topics costing you marks
                and focus your revision where it
                matters most.
              </p>
            </div>
          </div>
        </section>

        {/* OVERALL STATUS */}
        <section
          style={{
            marginTop: "12px",
            padding: "16px",
            borderRadius: "18px",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  color: "rgba(226, 232, 240, 0.65)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: ".8px",
                }}
              >
                CURRENT ACCURACY
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
                  marginTop: "3px",
                }}
              >
                <strong
                  style={{
                    color: "#FFFFFF",
                    fontSize: "26px",
                    fontWeight: 900,
                  }}
                >
                  {overallAccuracy}%
                </strong>

                <span
                  style={{
                    color: "#FB7185",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Needs improvement
                </span>
              </div>
            </div>

            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                background:
                  `conic-gradient(#10E79D ${
                    overallAccuracy * 3.6
                  }deg, rgba(255, 255, 255, 0.1) ${
                    overallAccuracy * 3.6
                  }deg 360deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#031D1B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10E79D",
                  fontWeight: 900,
                  fontSize: "13px",
                }}
              >
                {overallAccuracy}%
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "12px",
              height: "8px",
              borderRadius: "20px",
              background: "rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${overallAccuracy}%`,
                height: "100%",
                borderRadius: "20px",
                background: "#10E79D",
              }}
            />
          </div>

          <p
            style={{
              margin: "10px 0 0",
              color: "rgba(226, 232, 240, 0.75)",
              fontSize: "12.5px",
              lineHeight: 1.5,
            }}
          >
            Your biggest score improvement opportunity is
            currently in Physics and Chemistry.
          </p>
        </section>

        {/* WEAK AREAS */}
        <section style={{ marginTop: "16px" }}>
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{
                color: "#10E79D",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              PRIORITY AREAS
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#FFFFFF",
                fontSize: "17px",
                fontWeight: 800,
              }}
            >
              Chapters to Improve
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "10px",
            }}
          >
            {weakAreas.map((area, index) => (
              <div
                key={area.chapter}
                style={{
                  padding: "15px",
                  borderRadius: "16px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: "rgba(239, 68, 68, 0.15)",
                      color: "#EF4444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "13px",
                      flex: "0 0 34px",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            display: "block",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: 800,
                          }}
                        >
                          {area.chapter}
                        </strong>

                        <span
                          style={{
                            color: "rgba(226, 232, 240, 0.65)",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {area.subject}
                        </span>
                      </div>

                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "8px",
                          background: "rgba(239, 68, 68, 0.15)",
                          color: "#EF4444",
                          fontSize: "11px",
                          fontWeight: 800,
                          border: "1px solid rgba(239, 68, 68, 0.25)",
                        }}
                      >
                        {area.level}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(226, 232, 240, 0.65)",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        Accuracy
                      </span>

                      <strong
                        style={{
                          color: "#EF4444",
                          fontSize: "13px",
                          fontWeight: 800,
                        }}
                      >
                        {area.accuracy}%
                      </strong>
                    </div>

                    <div
                      style={{
                        marginTop: "5px",
                        height: "7px",
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${area.accuracy}%`,
                          height: "100%",
                          borderRadius: "20px",
                          background: "#EF4444",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(226, 232, 240, 0.65)",
                          fontSize: "11.5px",
                        }}
                      >
                        Attempted: {area.attempted}
                      </span>

                      <span
                        style={{
                          color: "#EF4444",
                          fontSize: "11.5px",
                          fontWeight: 700,
                        }}
                      >
                        Wrong: {area.wrong}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        borderRadius: "10px",
                        background: "rgba(239, 68, 68, 0.08)",
                        border: "1px solid rgba(239, 68, 68, 0.18)",
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(226, 232, 240, 0.85)",
                          fontSize: "12px",
                          lineHeight: 1.5,
                        }}
                      >
                        <strong style={{ color: "#EF4444" }}>Focus:</strong>{" "}
                        {area.recommendation}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenSection("practice")
                      }
                      style={{
                        marginTop: "10px",
                        border: "none",
                        background: "transparent",
                        color: "#10E79D",
                        padding: 0,
                        fontSize: "13px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      Practice this chapter
                      <Icon
                        name="arrow"
                        size={14}
                        color="#10E79D"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STRENGTHS */}
        <section
          style={{
            marginTop: "16px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <span
              style={{
                color: "#10E79D",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              KEEP IT UP
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#FFFFFF",
                fontSize: "17px",
                fontWeight: 800,
              }}
            >
              Your Strong Areas
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "8px",
            }}
          >
            {strengths.map((item) => (
              <div
                key={item.chapter}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    background: "rgba(16, 231, 157, 0.15)",
                    color: "#10E79D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 32px",
                  }}
                >
                  <Icon
                    name="check"
                    size={16}
                    color="#10E79D"
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <strong
                    style={{
                      display: "block",
                      color: "#FFFFFF",
                      fontSize: "13.5px",
                      fontWeight: 800,
                    }}
                  >
                    {item.chapter}
                  </strong>

                  <span
                    style={{
                      color: "rgba(226, 232, 240, 0.65)",
                      fontSize: "11.5px",
                    }}
                  >
                    {item.subject}
                  </span>
                </div>

                <strong
                  style={{
                    color: "#10E79D",
                    fontSize: "14px",
                    fontWeight: 900,
                  }}
                >
                  {item.accuracy}%
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* ACTION CARD */}
        <section
          style={{
            marginTop: "16px",
            padding: "18px",
            borderRadius: "19px",
            background: "linear-gradient(135deg, #06312B, #031D1B)",
            border: "1px solid rgba(16, 231, 157, 0.3)",
            color: "#FFFFFF",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "rgba(16, 231, 157, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 42px",
              }}
            >
              <Icon
                name="target"
                size={22}
                color="#10E79D"
              />
            </div>

            <div style={{ flex: 1 }}>
              <strong
                style={{
                  display: "block",
                  fontSize: "15px",
                  fontWeight: 800,
                  marginBottom: "4px",
                  color: "#FFFFFF",
                }}
              >
                Turn weaknesses into strengths
              </strong>

              <span
                style={{
                  display: "block",
                  fontSize: "12.5px",
                  lineHeight: 1.5,
                  color: "rgba(226, 232, 240, 0.75)",
                }}
              >
                Start targeted practice based on your
                weakest chapters.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenSection("practice")
            }
            style={{
              width: "100%",
              marginTop: "14px",
              padding: "13px",
              border: "none",
              borderRadius: "13px",
              background: "linear-gradient(135deg, #10E79D, #007050)",
              color: "#010F0E",
              fontSize: "14px",
              fontWeight: 900,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(16, 231, 157, 0.35)",
            }}
          >
            Start Targeted Practice →
          </button>

          <button
            type="button"
            onClick={() =>
              onOpenSection("ai-suggestions")
            }
            style={{
              width: "100%",
              marginTop: "9px",
              padding: "12px",
              border: "1px solid rgba(16, 231, 157, 0.35)",
              borderRadius: "12px",
              background: "rgba(16, 231, 157, 0.12)",
              color: "#10E79D",
              fontSize: "13px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            View AI Suggestions & Recommendations →
          </button>
        </section>

        <button
          type="button"
          onClick={onBack}
          style={{
            width: "100%",
            marginTop: "14px",
            padding: "13px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "13px",
            background: "rgba(255, 255, 255, 0.06)",
            color: "#10E79D",
            fontSize: "13px",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          ← Back to Analysis
        </button>
      </main>
      </div>
    </div>
  );
}