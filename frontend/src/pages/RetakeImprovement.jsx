import React, { useState } from "react";
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
    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
          <path d="M3 5v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
          <path d="M21 19v-5h-5" />
        </svg>
      );

    case "trend":
      return (
        <svg {...common}>
          <path d="M4 17 10 11l4 4 6-8" />
          <path d="M15 7h5v5" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="m7 15 3-4 3 2 5-7" />
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

    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
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

const comparison = [
  {
    label: "Score",
    oldValue: "395",
    newValue: "412",
    change: "+17",
    positive: true,
  },
  {
    label: "Accuracy",
    oldValue: "58%",
    newValue: "61%",
    change: "+3%",
    positive: true,
  },
  {
    label: "Correct",
    oldValue: "87",
    newValue: "92",
    change: "+5",
    positive: true,
  },
  {
    label: "Rank",
    oldValue: "55,410",
    newValue: "48,620",
    change: "↓ 6,790",
    positive: true,
  },
];

const chapterComparison = [
  {
    chapter: "Current Electricity",
    subject: "Physics",
    oldAccuracy: 72,
    newAccuracy: 82,
    change: "+10%",
  },
  {
    chapter: "Electrostatics",
    subject: "Physics",
    oldAccuracy: 35,
    newAccuracy: 42,
    change: "+7%",
  },
  {
    chapter: "Atomic Structure",
    subject: "Chemistry",
    oldAccuracy: 74,
    newAccuracy: 80,
    change: "+6%",
  },
  {
    chapter: "Genetics",
    subject: "Biology",
    oldAccuracy: 48,
    newAccuracy: 54,
    change: "+6%",
  },
];

export default function RetakeImprovement({
  profile,
  onBack,
  onOpenSection,
}) {
  const [showDetails, setShowDetails] = useState(false);

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
          title="Retake & Improve"
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
        {/* HEADER */}
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
                width: "46px",
                height: "46px",
                flex: "0 0 46px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, #10E79D, #007050)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="refresh"
                size={24}
                color="#010F0E"
              />
            </div>

            <div>
              <span
                style={{
                  color: "#10E79D",
                  fontSize: "8px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                RETEST PERFORMANCE
              </span>

              <h1
                style={{
                  margin: "4px 0 3px",
                  color: "#FFFFFF",
                  fontSize: "22px",
                }}
              >
                Retake & See Improvement
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#748381",
                  fontSize: "9px",
                  lineHeight: 1.5,
                }}
              >
                Compare your latest attempt with your
                previous performance and measure real
                improvement.
              </p>
            </div>
          </div>
        </section>

        {/* TEST TO RETAKE */}
        <section
          style={{
            marginTop: "11px",
            padding: "15px",
            borderRadius: "19px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            style={{
              color: "#10E79D",
              fontSize: "7px",
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            READY TO RETAKE
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "9px",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "11px",
                background: "rgba(16, 231, 157, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="refresh"
                size={18}
                color="#10E79D"
              />
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#FFFFFF",
                  fontSize: "10px",
                }}
              >
                NEET Full Mock Test 02
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: "rgba(226, 232, 240, 0.7)",
                  fontSize: "7px",
                }}
              >
                Previous score: 395 / 720 • Accuracy: 58%
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenSection("mock-tests")
            }
            style={{
              width: "100%",
              marginTop: "12px",
              padding: "11px",
              border: "none",
              borderRadius: "11px",
              background: "linear-gradient(135deg, #10E79D, #007050)",
              color: "#010F0E",
              fontSize: "9px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(16, 231, 157, 0.25)",
            }}
          >
            Retake This Test →
          </button>
        </section>

        {/* RESULT COMPARISON */}
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
                color: "#10E79D",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              YOUR IMPROVEMENT
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#FFFFFF",
                fontSize: "17px",
              }}
            >
              Previous vs Latest
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: "7px",
            }}
          >
            {comparison.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "12px",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                  }}
                >
                  <strong
                    style={{
                      color: "rgba(226, 232, 240, 0.9)",
                      fontSize: "8px",
                    }}
                  >
                    {item.label}
                  </strong>

                  <span
                    style={{
                      padding: "5px 7px",
                      borderRadius: "8px",
                      background: "rgba(16, 231, 157, 0.15)",
                      color: "#10E79D",
                      fontSize: "7px",
                      fontWeight: 800,
                      border: "1px solid rgba(16, 231, 157, 0.25)",
                    }}
                  >
                    {item.change}
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 20px 1fr",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "9px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "rgba(226, 232, 240, 0.5)",
                        fontSize: "6px",
                      }}
                    >
                      PREVIOUS
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "2px",
                        color: "rgba(226, 232, 240, 0.8)",
                        fontSize: "12px",
                      }}
                    >
                      {item.oldValue}
                    </strong>
                  </div>

                  <Icon
                    name="arrow"
                    size={12}
                    color="#10E79D"
                  />

                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "9px",
                      background: "rgba(16, 231, 157, 0.08)",
                      border: "1px solid rgba(16, 231, 157, 0.2)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#10E79D",
                        fontSize: "6px",
                      }}
                    >
                      LATEST
                    </span>

                    <strong
                      style={{
                        display: "block",
                        marginTop: "2px",
                        color: "#10E79D",
                        fontSize: "12px",
                      }}
                    >
                      {item.newValue}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* OVERALL GAIN */}
        <section
          style={{
            marginTop: "14px",
            padding: "16px",
            borderRadius: "19px",
            background: "linear-gradient(135deg, rgba(16, 231, 157, 0.15), rgba(0, 112, 80, 0.25))",
            border: "1px solid rgba(16, 231, 157, 0.3)",
            color: "#FFFFFF",
            backdropFilter: "blur(10px)",
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
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "rgba(16, 231, 157, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="trend"
                size={21}
                color="#10E79D"
              />
            </div>

            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "7px",
                  color: "rgba(226, 232, 240, 0.75)",
                  letterSpacing: "0.5px",
                }}
              >
                OVERALL IMPROVEMENT
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "2px",
                  fontSize: "22px",
                  color: "#10E79D",
                }}
              >
                +17 Marks
              </strong>
            </div>
          </div>

          <p
            style={{
              margin: "9px 0 0",
              fontSize: "8px",
              lineHeight: 1.5,
              color: "rgba(226, 232, 240, 0.85)",
            }}
          >
            Your latest attempt shows measurable
            improvement. Keep working on your weak
            chapters to push the score further.
          </p>
        </section>

        {/* CHAPTER COMPARISON */}
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
                color: "#10E79D",
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "1px",
              }}
            >
              CHAPTER PROGRESS
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#FFFFFF",
                fontSize: "17px",
              }}
            >
              Where You Improved
            </h2>
          </div>

          <div
            style={{
              padding: "14px",
              borderRadius: "18px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            {chapterComparison.map(
              (item, index) => (
                <div
                  key={item.chapter}
                  style={{
                    paddingBottom:
                      index ===
                      chapterComparison.length - 1
                        ? 0
                        : "13px",
                    marginBottom:
                      index ===
                      chapterComparison.length - 1
                        ? 0
                        : "13px",
                    borderBottom:
                      index ===
                      chapterComparison.length - 1
                        ? "none"
                        : "1px solid rgba(255, 255, 255, 0.08)",
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
                          fontSize: "8px",
                        }}
                      >
                        {item.chapter}
                      </strong>

                      <span
                        style={{
                          display: "block",
                          marginTop: "2px",
                          color: "rgba(226, 232, 240, 0.65)",
                          fontSize: "6px",
                        }}
                      >
                        {item.subject}
                      </span>
                    </div>

                    <strong
                      style={{
                        color: "#10E79D",
                        fontSize: "8px",
                      }}
                    >
                      {item.change}
                    </strong>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "7px",
                      marginTop: "7px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "3px",
                        }}
                      >
                        <span
                          style={{
                            color: "rgba(226, 232, 240, 0.6)",
                            fontSize: "6px",
                          }}
                        >
                          Previous
                        </span>

                        <span
                          style={{
                            color: "rgba(226, 232, 240, 0.8)",
                            fontSize: "6px",
                          }}
                        >
                          {item.oldAccuracy}%
                        </span>
                      </div>

                      <div
                        style={{
                          height: "5px",
                          borderRadius: "20px",
                          background: "rgba(255, 255, 255, 0.1)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${item.oldAccuracy}%`,
                            height: "100%",
                            background: "rgba(226, 232, 240, 0.4)",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "3px",
                        }}
                      >
                        <span
                          style={{
                            color: "#10E79D",
                            fontSize: "6px",
                          }}
                        >
                          Latest
                        </span>

                        <span
                          style={{
                            color: "#10E79D",
                            fontSize: "6px",
                            fontWeight: 700,
                          }}
                        >
                          {item.newAccuracy}%
                        </span>
                      </div>

                      <div
                        style={{
                          height: "5px",
                          borderRadius: "20px",
                          background: "rgba(255, 255, 255, 0.1)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${item.newAccuracy}%`,
                            height: "100%",
                            background: "#10E79D",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* INSIGHT */}
        <section
          style={{
            marginTop: "14px",
            padding: "15px",
            borderRadius: "18px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Icon
              name="target"
              size={17}
              color="#10E79D"
            />

            <strong
              style={{
                color: "#FFFFFF",
                fontSize: "10px",
              }}
            >
              Your improvement insight
            </strong>
          </div>

          <p
            style={{
              margin: "8px 0 0",
              color: "rgba(226, 232, 240, 0.75)",
              fontSize: "8px",
              lineHeight: 1.55,
            }}
          >
            Your strongest improvement came from
            Current Electricity and Atomic Structure.
            Electrostatics and Genetics are still below
            your target accuracy and should remain a
            priority.
          </p>

          <button
            type="button"
            onClick={() =>
              setShowDetails(!showDetails)
            }
            style={{
              marginTop: "9px",
              border: "none",
              background: "transparent",
              padding: 0,
              color: "#10E79D",
              fontSize: "7px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            {showDetails
              ? "Hide comparison details ↑"
              : "View detailed comparison ↓"}
          </button>

          {showDetails && (
            <div
              style={{
                marginTop: "9px",
                padding: "9px",
                borderRadius: "10px",
                background: "rgba(16, 231, 157, 0.08)",
                border: "1px solid rgba(16, 231, 157, 0.2)",
                color: "rgba(226, 232, 240, 0.9)",
                fontSize: "7px",
                lineHeight: 1.5,
              }}
            >
              Keep your current revision strategy for
              strong chapters and dedicate additional
              practice sessions to questions where your
              accuracy is below 60%.
            </div>
          )}
        </section>

        {/* NEXT STEP */}
        <section
          style={{
            marginTop: "14px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "7px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              onOpenSection("question-analysis")
            }
            style={{
              padding: "12px 8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#10E79D",
              fontSize: "8px",
              fontWeight: 800,
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
          >
            <Icon
              name="chart"
              size={15}
              color="#10E79D"
            />
            <span
              style={{
                display: "block",
                marginTop: "4px",
                color: "#FFFFFF",
              }}
            >
              Review Questions
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              onOpenSection("mock-tests")
            }
            style={{
              padding: "12px 8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#10E79D",
              fontSize: "8px",
              fontWeight: 800,
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
          >
            <Icon
              name="refresh"
              size={15}
              color="#10E79D"
            />
            <span
              style={{
                display: "block",
                marginTop: "4px",
                color: "#FFFFFF",
              }}
            >
              Take Another Test
            </span>
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
          ← Back to Test History
        </button>
      </main>
      </div>
    </div>
  );
}