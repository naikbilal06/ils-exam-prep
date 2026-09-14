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
        minHeight: "100vh",
        background: "#F4FBF7",
      }}
    >
      <PageHeader
        title="Weakness Insights"
        onOpenMenu={onOpenSection}
      />

      <main
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          padding: "13px 16px 30px",
        }}
      >
        {/* HEADER CARD */}
        <section
          style={{
            padding: "18px",
            borderRadius: "22px",
            background:
              "linear-gradient(135deg, #E8F8F0, #FFFFFF)",
            border: "1px solid #D5EADF",
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
                background: "#FFF2E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 45px",
              }}
            >
              <Icon
                name="warning"
                size={23}
                color="#C78927"
              />
            </div>

            <div>
              <span
                style={{
                  color: "#159B72",
                  fontSize: "8px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                PERSONALIZED ANALYSIS
              </span>

              <h1
                style={{
                  margin: "4px 0 3px",
                  color: "#183238",
                  fontSize: "22px",
                }}
              >
                Weakness Insights
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#748381",
                  fontSize: "9px",
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
            marginTop: "11px",
            padding: "15px",
            borderRadius: "19px",
            background: "#FFFFFF",
            border: "1px solid #DDE9E3",
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
                  color: "#84918F",
                  fontSize: "7px",
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
                  gap: "5px",
                  marginTop: "3px",
                }}
              >
                <strong
                  style={{
                    color: "#183238",
                    fontSize: "27px",
                  }}
                >
                  {overallAccuracy}%
                </strong>

                <span
                  style={{
                    color: "#D85B65",
                    fontSize: "8px",
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
                  `conic-gradient(#159B72 ${
                    overallAccuracy * 3.6
                  }deg, #E3ECE7 ${
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
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#159B72",
                  fontWeight: 800,
                  fontSize: "9px",
                }}
              >
                {overallAccuracy}%
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "12px",
              height: "7px",
              borderRadius: "20px",
              background: "#E7EEE9",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${overallAccuracy}%`,
                height: "100%",
                borderRadius: "20px",
                background: "#159B72",
              }}
            />
          </div>

          <p
            style={{
              margin: "8px 0 0",
              color: "#798684",
              fontSize: "8px",
              lineHeight: 1.5,
            }}
          >
            Your biggest score improvement opportunity is
            currently in Physics and Chemistry.
          </p>
        </section>

        {/* WEAK AREAS */}
        <section style={{ marginTop: "14px" }}>
          <div style={{ marginBottom: "8px" }}>
            <span
              style={{
                color: "#159B72",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              PRIORITY AREAS
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#183238",
                fontSize: "17px",
              }}
            >
              Chapters to Improve
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "9px",
            }}
          >
            {weakAreas.map((area, index) => (
              <div
                key={area.chapter}
                style={{
                  padding: "14px",
                  borderRadius: "18px",
                  background: "#FFFFFF",
                  border: "1px solid #DDE9E3",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "10px",
                      background: "#FFF1F2",
                      color: "#D85B65",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "10px",
                      flex: "0 0 32px",
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
                        gap: "7px",
                      }}
                    >
                      <div>
                        <strong
                          style={{
                            display: "block",
                            color: "#28393D",
                            fontSize: "10px",
                          }}
                        >
                          {area.chapter}
                        </strong>

                        <span
                          style={{
                            color: "#84908E",
                            fontSize: "7px",
                          }}
                        >
                          {area.subject}
                        </span>
                      </div>

                      <span
                        style={{
                          padding: "5px 7px",
                          borderRadius: "8px",
                          background: "#FFF1F2",
                          color: "#D85B65",
                          fontSize: "6px",
                          fontWeight: 800,
                        }}
                      >
                        {area.level}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "9px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "#74817F",
                          fontSize: "7px",
                        }}
                      >
                        Accuracy
                      </span>

                      <strong
                        style={{
                          color: "#D85B65",
                          fontSize: "8px",
                        }}
                      >
                        {area.accuracy}%
                      </strong>
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        height: "6px",
                        borderRadius: "20px",
                        background: "#EDF1EF",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${area.accuracy}%`,
                          height: "100%",
                          borderRadius: "20px",
                          background: "#D85B65",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "7px",
                      }}
                    >
                      <span
                        style={{
                          color: "#7D8A88",
                          fontSize: "7px",
                        }}
                      >
                        Attempted: {area.attempted}
                      </span>

                      <span
                        style={{
                          color: "#D85B65",
                          fontSize: "7px",
                        }}
                      >
                        Wrong: {area.wrong}
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "9px",
                        padding: "8px",
                        borderRadius: "10px",
                        background: "#FFF8F8",
                      }}
                    >
                      <span
                        style={{
                          color: "#687674",
                          fontSize: "7px",
                          lineHeight: 1.45,
                        }}
                      >
                        <strong>Focus:</strong>{" "}
                        {area.recommendation}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenSection("practice")
                      }
                      style={{
                        marginTop: "9px",
                        border: "none",
                        background: "transparent",
                        color: "#159B72",
                        padding: 0,
                        fontSize: "7px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      Practice this chapter
                      <Icon
                        name="arrow"
                        size={11}
                        color="#159B72"
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
            marginTop: "14px",
          }}
        >
          <div style={{ marginBottom: "8px" }}>
            <span
              style={{
                color: "#159B72",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              KEEP IT UP
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#183238",
                fontSize: "17px",
              }}
            >
              Your Strong Areas
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "7px",
            }}
          >
            {strengths.map((item) => (
              <div
                key={item.chapter}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "11px",
                  borderRadius: "14px",
                  background: "#EAF8F1",
                  border: "1px solid #D5EADF",
                }}
              >
                <div
                  style={{
                    width: "29px",
                    height: "29px",
                    borderRadius: "9px",
                    background: "#FFFFFF",
                    color: "#159B72",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 29px",
                  }}
                >
                  <Icon
                    name="check"
                    size={15}
                    color="#159B72"
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <strong
                    style={{
                      display: "block",
                      color: "#30423F",
                      fontSize: "8px",
                    }}
                  >
                    {item.chapter}
                  </strong>

                  <span
                    style={{
                      color: "#82908D",
                      fontSize: "7px",
                    }}
                  >
                    {item.subject}
                  </span>
                </div>

                <strong
                  style={{
                    color: "#159B72",
                    fontSize: "12px",
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
            marginTop: "14px",
            padding: "16px",
            borderRadius: "19px",
            background: "#159B72",
            color: "#FFFFFF",
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
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(255,255,255,.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 40px",
              }}
            >
              <Icon
                name="target"
                size={21}
                color="#FFFFFF"
              />
            </div>

            <div style={{ flex: 1 }}>
              <strong
                style={{
                  display: "block",
                  fontSize: "12px",
                  marginBottom: "3px",
                }}
              >
                Turn weaknesses into strengths
              </strong>

              <span
                style={{
                  display: "block",
                  fontSize: "7px",
                  lineHeight: 1.5,
                  opacity: 0.9,
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
              marginTop: "12px",
              padding: "10px",
              border: "none",
              borderRadius: "11px",
              background: "#FFFFFF",
              color: "#159B72",
              fontSize: "8px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Start Targeted Practice →
          </button>
        </section>

        <button
          type="button"
          className="back-button"
          onClick={onBack}
          style={{
            width: "100%",
            marginTop: "12px",
          }}
        >
          ← Back to Analysis
        </button>
      </main>
    </div>
  );
}