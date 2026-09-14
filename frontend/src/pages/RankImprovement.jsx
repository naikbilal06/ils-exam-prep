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
    case "trend":
      return (
        <svg {...common}>
          <path d="M4 17 10 11l4 4 6-8" />
          <path d="M15 7h5v5" />
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

    case "trophy":
      return (
        <svg {...common}>
          <path d="M8 4h8v4a4 4 0 0 1-8 0Z" />
          <path d="M8 6H5v1a3 3 0 0 0 3 3" />
          <path d="M16 6h3v1a3 3 0 0 1-3 3" />
          <path d="M12 12v5" />
          <path d="M8 21h8" />
          <path d="M9 17h6" />
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

    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M4 9h16" />
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

const milestones = [
  {
    label: "Current",
    score: "412",
    rank: "48,620",
    completed: true,
  },
  {
    label: "Target 1",
    score: "455",
    rank: "32,000",
    completed: true,
  },
  {
    label: "Target 2",
    score: "490",
    rank: "18,500",
    completed: false,
  },
  {
    label: "Goal",
    score: "525+",
    rank: "10,000",
    completed: false,
  },
];

const weeklyProjection = [
  {
    week: "Week 1",
    score: 420,
    rank: "45K",
  },
  {
    week: "Week 2",
    score: 438,
    rank: "39K",
  },
  {
    week: "Week 3",
    score: 455,
    rank: "32K",
  },
  {
    week: "Week 4",
    score: 472,
    rank: "25K",
  },
];

export default function RankImprovement({
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
        title="Rank Improvement"
        onOpenMenu={onOpenSection}
      />

      <main
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          padding: "13px 16px 30px",
        }}
      >
        {/* HEADER */}
        <section
          style={{
            padding: "18px",
            borderRadius: "22px",
            background:
              "linear-gradient(135deg, #E5F8EF, #FFFFFF)",
            border: "1px solid #D4EADF",
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
                name="trend"
                size={24}
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
                PERFORMANCE PROJECTION
              </span>

              <h1
                style={{
                  margin: "4px 0 3px",
                  color: "#183238",
                  fontSize: "22px",
                }}
              >
                Rank Improvement
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#748381",
                  fontSize: "9px",
                  lineHeight: 1.5,
                }}
              >
                See how consistent preparation can improve
                your expected score and rank.
              </p>
            </div>
          </div>
        </section>

        {/* CURRENT VS PROJECTED */}
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
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            <div
              style={{
                padding: "13px 10px",
                borderRadius: "14px",
                background: "#F5F7F6",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#86918F",
                  fontSize: "7px",
                  fontWeight: 700,
                }}
              >
                CURRENT SCORE
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: "#183238",
                  fontSize: "24px",
                }}
              >
                412
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "2px",
                  color: "#7A8785",
                  fontSize: "7px",
                }}
              >
                Estimated Rank: 48,620
              </span>
            </div>

            <div
              style={{
                padding: "13px 10px",
                borderRadius: "14px",
                background: "#EAF8F1",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#159B72",
                  fontSize: "7px",
                  fontWeight: 700,
                }}
              >
                PROJECTED SCORE
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: "#159B72",
                  fontSize: "24px",
                }}
              >
                525+
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "2px",
                  color: "#668079",
                  fontSize: "7px",
                }}
              >
                Target Rank: 10,000
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              marginTop: "11px",
              color: "#159B72",
              fontSize: "8px",
              fontWeight: 800,
            }}
          >
            <Icon
              name="trend"
              size={12}
              color="#159B72"
            />
            Potential improvement: +113 marks
          </div>
        </section>

        {/* PROJECTION */}
        <section
          style={{
            marginTop: "13px",
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
              EXPECTED TRAJECTORY
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#183238",
                fontSize: "17px",
              }}
            >
              4-Week Projection
            </h2>
          </div>

          <section
            style={{
              padding: "15px",
              borderRadius: "19px",
              background: "#FFFFFF",
              border: "1px solid #DDE9E3",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "155px",
                marginTop: "4px",
                padding:
                  "10px 5px 25px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "32px",
                  right: "7px",
                  top: "15px",
                  bottom: "27px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {[525, 490, 455, 420].map(
                  (score) => (
                    <div
                      key={score}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "-31px",
                          width: "26px",
                          color: "#8A9593",
                          fontSize: "6px",
                          textAlign: "right",
                        }}
                      >
                        {score}
                      </span>

                      <div
                        style={{
                          width: "100%",
                          borderTop:
                            "1px dashed #E3EBE7",
                        }}
                      />
                    </div>
                  )
                )}
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "38px",
                  right: "10px",
                  top: "18px",
                  bottom: "29px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  padding: "0 6px",
                }}
              >
                {weeklyProjection.map(
                  (item, index) => {
                    const height =
                      35 +
                      index * 22;

                    return (
                      <div
                        key={item.week}
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <span
                          style={{
                            color: "#159B72",
                            fontSize: "6px",
                            fontWeight: 800,
                          }}
                        >
                          {item.score}
                        </span>

                        <div
                          style={{
                            width: "25px",
                            height: `${height}px`,
                            borderRadius:
                              "7px 7px 3px 3px",
                            background:
                              index ===
                              weeklyProjection.length -
                                1
                                ? "#159B72"
                                : "#A9DCC9",
                          }}
                        />

                        <span
                          style={{
                            color: "#899492",
                            fontSize: "6px",
                          }}
                        >
                          {item.week}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <div
              style={{
                marginTop: "3px",
                padding: "9px",
                borderRadius: "10px",
                background: "#F4FBF7",
                color: "#6F7E7B",
                fontSize: "7px",
                lineHeight: 1.5,
              }}
            >
              Projection is based on your recent accuracy,
              test performance and expected improvement
              from targeted practice.
            </div>
          </section>
        </section>

        {/* MILESTONES */}
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
              MILESTONES
            </span>

            <h2
              style={{
                margin: "4px 0 0",
                color: "#183238",
                fontSize: "17px",
              }}
            >
              Your Rank Journey
            </h2>
          </div>

          <div
            style={{
              padding: "15px",
              borderRadius: "19px",
              background: "#FFFFFF",
              border: "1px solid #DDE9E3",
            }}
          >
            {milestones.map(
              (item, index) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "9px",
                    position: "relative",
                    paddingBottom:
                      index ===
                      milestones.length - 1
                        ? 0
                        : "15px",
                  }}
                >
                  {index !==
                    milestones.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "31px",
                        bottom: 0,
                        width: "2px",
                        background:
                          index <
                          2
                            ? "#BDE4D5"
                            : "#E4EBE8",
                      }}
                    />
                  )}

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      width: "31px",
                      height: "31px",
                      flex: "0 0 31px",
                      borderRadius: "50%",
                      background:
                        item.completed
                          ? "#159B72"
                          : "#EAF1ED",
                      color:
                        item.completed
                          ? "#FFFFFF"
                          : "#8A9693",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.completed ? (
                      <Icon
                        name="check"
                        size={14}
                        color="#FFFFFF"
                      />
                    ) : (
                      <Icon
                        name="target"
                        size={14}
                        color="#8A9693"
                      />
                    )}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      paddingTop: "1px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        gap: "6px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#30413F",
                          fontSize: "9px",
                        }}
                      >
                        {item.label}
                      </strong>

                      <span
                        style={{
                          color: item.completed
                            ? "#159B72"
                            : "#84908E",
                          fontSize: "7px",
                          fontWeight: 700,
                        }}
                      >
                        {item.score} marks
                      </span>
                    </div>

                    <span
                      style={{
                        display: "block",
                        marginTop: "3px",
                        color: "#7E8B89",
                        fontSize: "7px",
                      }}
                    >
                      Estimated rank: {item.rank}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* GOAL */}
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
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background:
                  "rgba(255,255,255,.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name="trophy"
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
                YOUR TARGET
              </span>

              <strong
                style={{
                  display: "block",
                  marginTop: "2px",
                  fontSize: "17px",
                }}
              >
                Top 10,000 Rank
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
            Your immediate target is to cross 490 marks.
            Focus on weak chapters first and retake tests
            regularly to track improvement.
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
            Continue Preparation →
          </button>
        </section>

        {/* NEXT REVIEW */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            marginTop: "12px",
            color: "#7B8886",
            fontSize: "7px",
          }}
        >
          <Icon
            name="calendar"
            size={11}
            color="#159B72"
          />
          Recalculate projection after your next mock test
        </div>

        <button
          type="button"
          className="back-button"
          onClick={onBack}
          style={{
            width: "100%",
            marginTop: "12px",
          }}
        >
          ← Back to AI Suggestions
        </button>
      </main>
    </div>
  );
}