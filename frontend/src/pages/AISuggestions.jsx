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

const recommendations = [
  {
    priority: "HIGH PRIORITY",
    title: "Strengthen Electrostatics",
    chapter: "Physics • Electrostatics",
    icon: "target",
    description:
      "Your accuracy is 42%. Revise core concepts first, then attempt targeted numerical questions.",
    action: "Practice Electrostatics",
  },
  {
    priority: "HIGH PRIORITY",
    title: "Revise Chemical Equilibrium",
    chapter: "Chemistry • Equilibrium",
    icon: "book",
    description:
      "You are losing marks in equilibrium-based questions. Focus on concepts, formulas and application.",
    action: "Practice Equilibrium",
  },
  {
    priority: "MEDIUM PRIORITY",
    title: "Improve Genetics Accuracy",
    chapter: "Biology • Genetics",
    icon: "brain",
    description:
      "Your conceptual understanding is improving, but question accuracy needs more practice.",
    action: "Practice Genetics",
  },
];

const studyPlan = [
  {
    day: "DAY 1",
    title: "Concept Revision",
    text: "Revise your weakest chapter and make a short formula/concept sheet.",
    time: "45 min",
  },
  {
    day: "DAY 2",
    title: "Targeted Practice",
    text: "Attempt 20–25 questions only from your weakest topic.",
    time: "40 min",
  },
  {
    day: "DAY 3",
    title: "Error Review",
    text: "Re-attempt incorrect questions without seeing the previous solution.",
    time: "30 min",
  },
  {
    day: "DAY 4",
    title: "Mini Test",
    text: "Take a timed mixed test and compare your accuracy with the previous attempt.",
    time: "45 min",
  },
];

export default function AISuggestions({
  profile,
  onBack,
  onOpenSection,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4FBF7",
      }}
    >
      <PageHeader
        title="AI Suggestions"
        onOpenMenu={onOpenSection}
      />

      <main
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          padding: "13px 16px 30px",
        }}
      >
        {/* AI HEADER */}
        <section
          style={{
            padding: "18px",
            borderRadius: "22px",
            background:
              "linear-gradient(135deg, #E4F8EF, #FFFFFF)",
            border: "1px solid #D3EADF",
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
                width: "46px",
                height: "46px",
                flex: "0 0 46px",
                borderRadius: "15px",
                background: "#159B72",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="spark"
                size={25}
                color="#FFFFFF"
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
                PERSONALIZED AI ANALYSIS
              </span>

              <h1
                style={{
                  margin: "4px 0 3px",
                  color: "#183238",
                  fontSize: "22px",
                }}
              >
                AI-Powered Suggestions
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#748381",
                  fontSize: "9px",
                  lineHeight: 1.5,
                }}
              >
                Smart recommendations based on your
                recent test performance.
              </p>
            </div>
          </div>
        </section>

        {/* AI SUMMARY */}
        <section
          style={{
            marginTop: "11px",
            padding: "15px",
            borderRadius: "18px",
            background: "#FFFFFF",
            border: "1px solid #DDE9E3",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            <Icon
              name="brain"
              size={18}
              color="#159B72"
            />

            <strong
              style={{
                color: "#293A3D",
                fontSize: "11px",
              }}
            >
              What your performance indicates
            </strong>
          </div>

          <p
            style={{
              margin: "9px 0 0",
              color: "#687674",
              fontSize: "8px",
              lineHeight: 1.6,
            }}
          >
            You are performing well in foundational
            topics, but accuracy drops when questions
            require multi-step reasoning. Your fastest
            improvement should come from targeted
            practice rather than increasing test volume.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px",
              marginTop: "12px",
            }}
          >
            <div
              style={{
                padding: "9px 5px",
                borderRadius: "12px",
                background: "#EAF8F1",
                textAlign: "center",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#159B72",
                  fontSize: "15px",
                }}
              >
                3
              </strong>

              <span
                style={{
                  color: "#768582",
                  fontSize: "6px",
                }}
              >
                Focus Areas
              </span>
            </div>

            <div
              style={{
                padding: "9px 5px",
                borderRadius: "12px",
                background: "#FFF7E3",
                textAlign: "center",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#A17B20",
                  fontSize: "15px",
                }}
              >
                61%
              </strong>

              <span
                style={{
                  color: "#817D70",
                  fontSize: "6px",
                }}
              >
                Accuracy
              </span>
            </div>

            <div
              style={{
                padding: "9px 5px",
                borderRadius: "12px",
                background: "#EEF5FF",
                textAlign: "center",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#4A76A8",
                  fontSize: "15px",
                }}
              >
                +18%
              </strong>

              <span
                style={{
                  color: "#74808B",
                  fontSize: "6px",
                }}
              >
                Target Gain
              </span>
            </div>
          </div>
        </section>

        {/* RECOMMENDATIONS */}
        <section
          style={{
            marginTop: "14px",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                color: "#159B72",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              SMART RECOMMENDATIONS
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#183238",
                fontSize: "17px",
              }}
            >
              What to do next
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "9px",
            }}
          >
            {recommendations.map((item) => (
              <div
                key={item.title}
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
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      flex: "0 0 36px",
                      borderRadius: "11px",
                      background: "#EAF8F1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      color="#159B72"
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 6px",
                        borderRadius: "7px",
                        background:
                          item.priority === "HIGH PRIORITY"
                            ? "#FFF1F2"
                            : "#FFF7E3",
                        color:
                          item.priority === "HIGH PRIORITY"
                            ? "#D85B65"
                            : "#A17B20",
                        fontSize: "6px",
                        fontWeight: 800,
                      }}
                    >
                      {item.priority}
                    </span>

                    <h3
                      style={{
                        margin: "5px 0 2px",
                        color: "#293A3E",
                        fontSize: "11px",
                      }}
                    >
                      {item.title}
                    </h3>

                    <span
                      style={{
                        display: "block",
                        color: "#84908E",
                        fontSize: "7px",
                      }}
                    >
                      {item.chapter}
                    </span>

                    <p
                      style={{
                        margin: "8px 0 0",
                        color: "#697775",
                        fontSize: "8px",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenSection("practice")
                      }
                      style={{
                        marginTop: "9px",
                        border: "none",
                        padding: 0,
                        background: "transparent",
                        color: "#159B72",
                        fontSize: "7px",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        cursor: "pointer",
                      }}
                    >
                      {item.action}
                      <Icon
                        name="arrow"
                        size={10}
                        color="#159B72"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STUDY PLAN */}
        <section
          style={{
            marginTop: "14px",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                color: "#159B72",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              RECOMMENDED ROUTINE
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#183238",
                fontSize: "17px",
              }}
            >
              4-Day Improvement Plan
            </h2>
          </div>

          <div
            style={{
              padding: "14px",
              borderRadius: "18px",
              background: "#FFFFFF",
              border: "1px solid #DDE9E3",
            }}
          >
            {studyPlan.map((item, index) => (
              <div
                key={item.day}
                style={{
                  display: "flex",
                  gap: "9px",
                  padding:
                    index === studyPlan.length - 1
                      ? "0"
                      : "0 0 13px",
                  marginTop:
                    index === 0 ? 0 : "13px",
                  borderBottom:
                    index === studyPlan.length - 1
                      ? "none"
                      : "1px solid #EDF2EF",
                }}
              >
                <div
                  style={{
                    width: "31px",
                    height: "31px",
                    flex: "0 0 31px",
                    borderRadius: "10px",
                    background:
                      index === 0
                        ? "#159B72"
                        : "#EAF8F1",
                    color:
                      index === 0
                        ? "#FFFFFF"
                        : "#159B72",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "6px",
                    fontWeight: 800,
                  }}
                >
                  {item.day.replace("DAY ", "D")}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "7px",
                    }}
                  >
                    <strong
                      style={{
                        color: "#30413F",
                        fontSize: "9px",
                      }}
                    >
                      {item.title}
                    </strong>

                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        color: "#159B72",
                        fontSize: "7px",
                        fontWeight: 700,
                      }}
                    >
                      <Icon
                        name="clock"
                        size={10}
                        color="#159B72"
                      />
                      {item.time}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#7B8886",
                      fontSize: "7px",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPECTED IMPROVEMENT */}
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
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "39px",
                height: "39px",
                borderRadius: "12px",
                background: "rgba(255,255,255,.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="trend"
                size={21}
                color="#FFFFFF"
              />
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "7px",
                  opacity: 0.85,
                }}
              >
                POTENTIAL IMPROVEMENT
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "2px",
                  fontSize: "17px",
                }}
              >
                +18%
              </strong>
            </div>
          </div>

          <p
            style={{
              margin: "9px 0 0",
              fontSize: "8px",
              lineHeight: 1.5,
              opacity: 0.9,
            }}
          >
            Following this targeted plan consistently
            could significantly improve your accuracy in
            the identified weak areas.
          </p>

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
            Start My Improvement Plan →
          </button>
        </section>

        {/* BACK */}
        <button
          type="button"
          className="back-button"
          onClick={onBack}
          style={{
            width: "100%",
            marginTop: "12px",
          }}
        >
          ← Back to Weakness Insights
        </button>
      </main>
    </div>
  );
}