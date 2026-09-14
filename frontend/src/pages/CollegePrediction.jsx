import React, { useMemo, useState } from "react";

const C = {
  green: "#007050",
  navy: "#082F3C",
  mint: "#F4FBF7",
  softMint: "#EAF5F1",
  white: "#FFFFFF",
  muted: "#68777B",
  border: "#E4EFEB",
  blue: "#3679C9",
  purple: "#7652C8",
  yellow: "#C78A13",
};

const exams = [
  { id: "neet", label: "NEET UG", sub: "Medical" },
  { id: "jee", label: "JEE Main", sub: "Engineering" },
  { id: "cuet", label: "CUET UG", sub: "Universities" },
];

const colleges = {
  neet: [
    {
      name: "Government Medical College",
      location: "Srinagar, Jammu & Kashmir",
      type: "Government",
      match: "High Match",
      cutoff: "620+",
      rank: "1,250 – 4,800",
      icon: "M",
    },
    {
      name: "Government Medical College",
      location: "Jammu, Jammu & Kashmir",
      type: "Government",
      match: "High Match",
      cutoff: "615+",
      rank: "2,100 – 6,200",
      icon: "M",
    },
    {
      name: "SKIMS Medical College",
      location: "Srinagar, Jammu & Kashmir",
      type: "Government",
      match: "Good Match",
      cutoff: "600+",
      rank: "4,200 – 9,500",
      icon: "S",
    },
    {
      name: "AIIMS Jammu",
      location: "Jammu, Jammu & Kashmir",
      type: "Central",
      match: "Good Match",
      cutoff: "590+",
      rank: "5,500 – 12,000",
      icon: "A",
    },
  ],

  jee: [
    {
      name: "National Institute of Technology",
      location: "Srinagar, Jammu & Kashmir",
      type: "NIT",
      match: "High Match",
      cutoff: "95+ Percentile",
      rank: "12,000 – 32,000",
      icon: "N",
    },
    {
      name: "IIT Jammu",
      location: "Jammu, Jammu & Kashmir",
      type: "IIT",
      match: "Good Match",
      cutoff: "98+ Percentile",
      rank: "5,000 – 18,000",
      icon: "I",
    },
    {
      name: "IIIT Delhi",
      location: "Delhi",
      type: "IIIT",
      match: "Good Match",
      cutoff: "97+ Percentile",
      rank: "7,000 – 20,000",
      icon: "D",
    },
  ],

  cuet: [
    {
      name: "University of Delhi",
      location: "Delhi",
      type: "Central University",
      match: "High Match",
      cutoff: "780+",
      rank: "1,000 – 8,000",
      icon: "D",
    },
    {
      name: "Jawaharlal Nehru University",
      location: "New Delhi",
      type: "Central University",
      match: "Good Match",
      cutoff: "750+",
      rank: "3,000 – 12,000",
      icon: "J",
    },
    {
      name: "Banaras Hindu University",
      location: "Varanasi",
      type: "Central University",
      match: "Good Match",
      cutoff: "730+",
      rank: "5,000 – 18,000",
      icon: "B",
    },
  ],
};

function Icon({
  name,
  size = 20,
  stroke = C.navy,
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const paths = {
    back: (
      <>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </>
    ),

    search: (
      <>
        <circle
          cx="11"
          cy="11"
          r="6.5"
        />
        <path d="M16 16l4 4" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    check: (
      <path d="M5 12.5l4.2 4.2L19 7" />
    ),

    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle
          cx="12"
          cy="10"
          r="2.5"
        />
      </>
    ),

    target: (
      <>
        <circle
          cx="12"
          cy="12"
          r="8.5"
        />
        <circle
          cx="12"
          cy="12"
          r="4.5"
        />
        <circle
          cx="12"
          cy="12"
          r="1.5"
          fill={stroke}
        />
      </>
    ),

    trophy: (
      <>
        <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
        <path d="M8 6H4v2a4 4 0 0 0 4 4" />
        <path d="M16 6h4v2a4 4 0 0 1-4 4" />
        <path d="M12 12v5" />
        <path d="M8 20h8" />
      </>
    ),

    filter: (
      <>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </>
    ),

    bookmark: (
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />
    ),

    info: (
      <>
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </>
    ),

    trend: (
      <>
        <path d="M4 18V9" />
        <path d="M10 18V6" />
        <path d="M16 18v-4" />
        <path d="M3 21h18" />
        <path d="M5 7l5-3 4 3 6-5" />
      </>
    ),
  };

  return (
    <svg {...common}>
      {paths[name]}
    </svg>
  );
}

export default function CollegePredictor({
  onBack,
}) {
  const [selectedExam, setSelectedExam] =
    useState("neet");

  const [score, setScore] =
    useState("");

  const [category, setCategory] =
    useState("General");

  const [state, setState] =
    useState("Jammu & Kashmir");

  const [stage, setStage] =
    useState("form");

  const [selectedCollege, setSelectedCollege] =
    useState(null);

  const [saved, setSaved] =
    useState([]);

  const results = useMemo(() => {
    return colleges[selectedExam] || [];
  }, [selectedExam]);

  const selectedExamData =
    exams.find(
      (exam) =>
        exam.id === selectedExam
    );

  const predict = () => {
    const cleanScore = score.trim();

    if (!cleanScore) {
      return;
    }

    setStage("results");
  };

  const saveCollege = (
    collegeName
  ) => {
    setSaved((prev) =>
      prev.includes(collegeName)
        ? prev.filter(
            (name) =>
              name !== collegeName
          )
        : [
            ...prev,
            collegeName,
          ]
    );
  };

  /* =========================================================
     COLLEGE DETAILS
  ========================================================= */

  if (
    stage === "details" &&
    selectedCollege
  ) {
    return (
      <Page>
        <Header
          onBack={() =>
            setStage("results")
          }
          right="College Details"
        />

        <main style={styles.container}>
          <div style={styles.breadcrumb}>
            <span>
              College Predictor
            </span>

            <span>›</span>

            <strong>
              College Details
            </strong>
          </div>

          <section
            style={
              styles.detailHero
            }
          >
            <div
              style={
                styles.detailIcon
              }
            >
              {selectedCollege.icon}
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={
                  styles.detailType
                }
              >
                {selectedCollege.type}
              </div>

              <h1
                style={
                  styles.detailTitle
                }
              >
                {selectedCollege.name}
              </h1>

              <div
                style={
                  styles.detailLocation
                }
              >
                <Icon
                  name="location"
                  size={14}
                  stroke={C.green}
                />

                {selectedCollege.location}
              </div>
            </div>
          </section>

          <div
            style={
              styles.detailGrid
            }
          >
            <DetailMetric
              label="Your Match"
              value={
                selectedCollege.match
              }
              green
            />

            <DetailMetric
              label="Expected Cutoff"
              value={
                selectedCollege.cutoff
              }
            />

            <DetailMetric
              label="Expected Rank"
              value={
                selectedCollege.rank
              }
            />
          </div>

          <section
            style={styles.panel}
          >
            <div
              style={
                styles.panelTitle
              }
            >
              Why this college?
            </div>

            <div
              style={
                styles.reasonRow
              }
            >
              <div
                style={
                  styles.reasonIcon
                }
              >
                <Icon
                  name="target"
                  size={17}
                  stroke={C.green}
                />
              </div>

              <div>
                <div
                  style={
                    styles.reasonTitle
                  }
                >
                  Strong admission possibility
                </div>

                <div
                  style={
                    styles.reasonText
                  }
                >
                  Your predicted performance
                  falls within the expected
                  range for this college.
                </div>
              </div>
            </div>

            <div
              style={
                styles.reasonRow
              }
            >
              <div
                style={
                  styles.reasonIcon
                }
              >
                <Icon
                  name="location"
                  size={17}
                  stroke={C.green}
                />
              </div>

              <div>
                <div
                  style={
                    styles.reasonTitle
                  }
                >
                  Preferred location
                </div>

                <div
                  style={
                    styles.reasonText
                  }
                >
                  This college matches your
                  selected state/location
                  preference.
                </div>
              </div>
            </div>

            <div
              style={{
                ...styles.reasonRow,
                borderBottom:
                  "none",
              }}
            >
              <div
                style={
                  styles.reasonIcon
                }
              >
                <Icon
                  name="trophy"
                  size={17}
                  stroke={C.green}
                />
              </div>

              <div>
                <div
                  style={
                    styles.reasonTitle
                  }
                >
                  Competitive option
                </div>

                <div
                  style={
                    styles.reasonText
                  }
                >
                  Keep improving your score
                  to increase the number of
                  available choices.
                </div>
              </div>
            </div>
          </section>

          <div
            style={
              styles.disclaimer
            }
          >
            <Icon
              name="info"
              size={16}
              stroke={C.muted}
            />

            <span>
              College predictions are estimates
              based on previous trends and may
              change with actual cutoffs,
              category and counselling rounds.
            </span>
          </div>

          <button
            type="button"
            style={
              styles.primaryButton
            }
            onClick={() =>
              saveCollege(
                selectedCollege.name
              )
            }
          >
            <Icon
              name="bookmark"
              size={17}
              stroke="#FFFFFF"
            />

            {saved.includes(
              selectedCollege.name
            )
              ? "Saved to My Colleges"
              : "Save College"}
          </button>
        </main>
      </Page>
    );
  }

  /* =========================================================
     RESULTS
  ========================================================= */

  if (stage === "results") {
    return (
      <Page>
        <Header
          onBack={() =>
            setStage("form")
          }
          right="Predicted Colleges"
        />

        <main style={styles.container}>
          <div
            style={
              styles.resultTop
            }
          >
            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={
                  styles.kicker
                }
              >
                PREDICTION RESULT
              </div>

              <h1
                style={styles.title}
              >
                Colleges You Can Target
              </h1>

              <p
                style={
                  styles.subtitle
                }
              >
                Based on your{" "}
                {selectedExamData?.label}{" "}
                score, category and location
                preference.
              </p>
            </div>

            <button
              type="button"
              style={
                styles.editPrediction
              }
              onClick={() =>
                setStage("form")
              }
            >
              Edit
            </button>
          </div>

          <section
            style={
              styles.predictionSummary
            }
          >
            <div
              style={
                styles.summaryIcon
              }
            >
              <Icon
                name="target"
                size={21}
                stroke={C.green}
              />
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={
                  styles.summaryLabel
                }
              >
                YOUR PREDICTED RANGE
              </div>

              <div
                style={
                  styles.summaryValue
                }
              >
                1,250 – 8,500
              </div>

              <div
                style={
                  styles.summaryHint
                }
              >
                Estimated based on your
                current score
              </div>
            </div>

            <div
              style={
                styles.summaryCheck
              }
            >
              <Icon
                name="check"
                size={15}
                stroke="#FFFFFF"
              />
            </div>
          </section>

          <div
            style={
              styles.resultFilters
            }
          >
            <span
              style={
                styles.resultFilterPill
              }
            >
              {selectedExamData?.label}
            </span>

            <span
              style={
                styles.resultFilterPill
              }
            >
              {category}
            </span>

            <span
              style={
                styles.resultFilterPill
              }
            >
              {state}
            </span>

            <span
              style={
                styles.resultCount
              }
            >
              {results.length} matches
            </span>
          </div>

          <div
            style={
              styles.sectionHeader
            }
          >
            <div>
              <h2
                style={
                  styles.sectionTitle
                }
              >
                Recommended Colleges
              </h2>

              <p
                style={
                  styles.sectionSubtitle
                }
              >
                Ranked by your admission
                probability
              </p>
            </div>

            <button
              type="button"
              style={
                styles.filterButton
              }
              onClick={() => {}}
            >
              <Icon
                name="filter"
                size={16}
                stroke={C.navy}
              />

              Filter
            </button>
          </div>

          {results.map(
            (college) => (
              <button
                type="button"
                key={
                  college.name +
                  college.location
                }
                style={
                  styles.collegeCard
                }
                onClick={() => {
                  setSelectedCollege(
                    college
                  );
                  setStage(
                    "details"
                  );
                }}
              >
                <div
                  style={
                    styles.collegeLogo
                  }
                >
                  {college.icon}
                </div>

                <div
                  style={
                    styles.collegeBody
                  }
                >
                  <div
                    style={
                      styles.collegeTop
                    }
                  >
                    <span
                      style={
                        styles.collegeType
                      }
                    >
                      {college.type}
                    </span>

                    <span
                      style={{
                        ...styles.matchBadge,
                        color:
                          college.match ===
                          "High Match"
                            ? C.green
                            : C.blue,
                        background:
                          college.match ===
                          "High Match"
                            ? C.mint
                            : "#EEF5FC",
                      }}
                    >
                      {college.match}
                    </span>
                  </div>

                  <div
                    style={
                      styles.collegeName
                    }
                  >
                    {college.name}
                  </div>

                  <div
                    style={
                      styles.collegeLocation
                    }
                  >
                    <Icon
                      name="location"
                      size={12}
                      stroke={C.muted}
                    />

                    {college.location}
                  </div>

                  <div
                    style={
                      styles.collegeMeta
                    }
                  >
                    <span>
                      Cutoff:{" "}
                      <strong>
                        {college.cutoff}
                      </strong>
                    </span>

                    <span>
                      Rank:{" "}
                      <strong>
                        {college.rank}
                      </strong>
                    </span>
                  </div>
                </div>

                <div
                  style={
                    styles.collegeArrow
                  }
                >
                  <Icon
                    name="arrow"
                    size={16}
                    stroke={C.green}
                  />
                </div>
              </button>
            )
          )}

          <div
            style={styles.tip}
          >
            <Icon
              name="info"
              size={17}
              stroke={C.green}
            />

            <span>
              Predictions are indicative.
              Actual admission depends on
              official counselling, cutoffs and
              seat availability.
            </span>
          </div>
        </main>
      </Page>
    );
  }

  /* =========================================================
     FORM
  ========================================================= */

  return (
    <Page>
      <Header
        onBack={onBack}
        right="College Predictor"
      />

      <main style={styles.container}>
        <div style={styles.kicker}>
          SMART ADMISSION GUIDE
        </div>

        <h1 style={styles.title}>
          College Predictor
        </h1>

        <p style={styles.subtitle}>
          Enter your expected performance and
          discover colleges you can target for
          admission.
        </p>

        <section
          style={styles.heroCard}
        >
          <div
            style={styles.heroIcon}
          >
            <Icon
              name="target"
              size={25}
              stroke={C.green}
            />
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={styles.heroTitle}
            >
              Know your college options
            </div>

            <div
              style={styles.heroText}
            >
              Get a personalised list based on
              your exam, score and preferences.
            </div>
          </div>
        </section>

        <section
          style={styles.formCard}
        >
          <div
            style={
              styles.formSectionTitle
            }
          >
            01. Select Exam
          </div>

          <div
            style={styles.examGrid}
          >
            {exams.map((exam) => {
              const active =
                selectedExam ===
                exam.id;

              return (
                <button
                  type="button"
                  key={exam.id}
                  style={{
                    ...styles.examButton,
                    ...(active
                      ? styles.activeExamButton
                      : {}),
                  }}
                  onClick={() =>
                    setSelectedExam(
                      exam.id
                    )
                  }
                >
                  <div
                    style={{
                      ...styles.examRadio,
                      ...(active
                        ? styles.activeRadio
                        : {}),
                    }}
                  >
                    {active && (
                      <Icon
                        name="check"
                        size={13}
                        stroke="#FFFFFF"
                      />
                    )}
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={
                        styles.examName
                      }
                    >
                      {exam.label}
                    </div>

                    <div
                      style={
                        styles.examSub
                      }
                    >
                      {exam.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            style={
              styles.formSectionTitle
            }
          >
            02. Enter Expected Score
          </div>

          <div
            style={styles.inputWrap}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <input
                value={score}
                onChange={(e) =>
                  setScore(
                    e.target.value
                  )
                }
                type="number"
                inputMode="decimal"
                placeholder={
                  selectedExam ===
                  "neet"
                    ? "e.g. 620"
                    : selectedExam ===
                      "jee"
                    ? "e.g. 97"
                    : "e.g. 780"
                }
                aria-label="Expected score"
                style={
                  styles.scoreInput
                }
              />

              <div
                style={
                  styles.inputHint
                }
              >
                {selectedExam ===
                "jee"
                  ? "Enter expected percentile"
                  : "Enter your expected score"}
              </div>
            </div>

            <div
              style={
                styles.scoreSuffix
              }
            >
              {selectedExam ===
              "jee"
                ? "Percentile"
                : "Marks"}
            </div>
          </div>

          <div
            style={
              styles.formSectionTitle
            }
          >
            03. Your Preferences
          </div>

          <div
            style={
              styles.preferenceGrid
            }
          >
            <div>
              <label
                style={styles.label}
              >
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                style={styles.select}
              >
                <option>
                  General
                </option>

                <option>
                  OBC
                </option>

                <option>
                  SC
                </option>

                <option>
                  ST
                </option>

                <option>
                  EWS
                </option>
              </select>
            </div>

            <div>
              <label
                style={styles.label}
              >
                Preferred State
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target.value
                  )
                }
                style={styles.select}
              >
                <option>
                  Jammu & Kashmir
                </option>

                <option>
                  Delhi
                </option>

                <option>
                  Uttar Pradesh
                </option>

                <option>
                  Maharashtra
                </option>

                <option>
                  All India
                </option>
              </select>
            </div>
          </div>

          <button
            type="button"
            style={{
              ...styles.primaryButton,
              opacity: score.trim()
                ? 1
                : 0.55,
              cursor: score.trim()
                ? "pointer"
                : "not-allowed",
            }}
            onClick={predict}
            disabled={!score.trim()}
          >
            <Icon
              name="search"
              size={18}
              stroke="#FFFFFF"
            />

            Predict My Colleges

            <Icon
              name="arrow"
              size={17}
              stroke="#FFFFFF"
            />
          </button>
        </section>

        <section
          style={styles.howCard}
        >
          <div
            style={styles.howIcon}
          >
            <Icon
              name="trend"
              size={18}
              stroke={C.green}
            />
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={styles.howTitle}
            >
              How prediction works
            </div>

            <div
              style={styles.howText}
            >
              We compare your expected
              performance with previous admission
              trends and present colleges across
              different probability levels.
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

/* =========================================================
   PAGE
========================================================= */

function Page({ children }) {
  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function Header({
  onBack,
  right,
}) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <button
          type="button"
          style={styles.backButton}
          onClick={onBack}
          aria-label="Go back"
        >
          <Icon
            name="back"
            size={20}
          />
        </button>

        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <div style={styles.brand}>
            ILS RANKER
          </div>

          <div
            style={styles.headerTagline}
          >
            KNOW YOUR POTENTIAL
          </div>
        </div>

        <div
          style={styles.headerRight}
        >
          {right}
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DETAIL METRIC
========================================================= */

function DetailMetric({
  label,
  value,
  green,
}) {
  return (
    <div
      style={styles.detailMetric}
    >
      <div
        style={
          styles.detailMetricLabel
        }
      >
        {label}
      </div>

      <div
        style={{
          ...styles.detailMetricValue,
          color: green
            ? C.green
            : C.navy,
        }}
      >
        {value}
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
    background: C.mint,
    color: C.navy,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  mobileShell: {
    width: "100%",
    maxWidth: "390px",
    minHeight: "100dvh",
    background: C.mint,
    overflow: "visible",
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: C.white,
    borderBottom: `1px solid ${C.border}`,
  },

  headerInner: {
    width: "100%",
    minHeight: 78,
    padding: "14px 15px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxSizing: "border-box",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brand: {
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: 1,
    lineHeight: 1,
  },

  headerTagline: {
    marginTop: 5,
    color: C.muted,
    fontSize: 7.5,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  headerRight: {
    color: C.green,
    fontSize: 9,
    fontWeight: 900,
    textAlign: "right",
    lineHeight: 1.2,
    flexShrink: 0,
    maxWidth: 82,
  },

  container: {
    width: "100%",
    maxWidth: "390px",
    margin: "0 auto",
    padding: "25px 15px 100px",
    boxSizing: "border-box",
  },

  kicker: {
    fontSize: 9,
    letterSpacing: 1.1,
    color: C.green,
    fontWeight: 900,
    marginBottom: 6,
  },

  title: {
    margin: 0,
    fontSize: 29,
    lineHeight: 1.18,
    fontWeight: 900,
    letterSpacing: -0.7,
  },

  subtitle: {
    margin: "8px 0 0",
    color: C.muted,
    fontSize: 12,
    lineHeight: 1.55,
  },

  heroCard: {
    marginTop: 20,
    padding: 16,
    background: C.softMint,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    gap: 11,
    boxSizing: "border-box",
  },

  heroIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  heroTitle: {
    fontSize: 12.5,
    fontWeight: 900,
  },

  heroText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.45,
  },

  formCard: {
    marginTop: 12,
    padding: 16,
    background: C.white,
    borderRadius: 20,
    border: `1px solid ${C.border}`,
    boxShadow:
      "0 7px 21px rgba(8,47,60,0.045)",
    boxSizing: "border-box",
  },

  formSectionTitle: {
    fontSize: 11.5,
    fontWeight: 900,
    marginTop: 4,
    marginBottom: 10,
  },

  examGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 7,
  },

  examButton: {
    minWidth: 0,
    minHeight: 68,
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: 9,
    border: `1px solid ${C.border}`,
    background: C.white,
    borderRadius: 12,
    textAlign: "left",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  activeExamButton: {
    borderColor: C.green,
    background: C.mint,
  },

  examRadio: {
    width: 24,
    height: 24,
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  activeRadio: {
    background: C.green,
    borderColor: C.green,
  },

  examName: {
    fontSize: 10,
    lineHeight: 1.15,
    fontWeight: 850,
  },

  examSub: {
    marginTop: 3,
    fontSize: 8.5,
    lineHeight: 1.15,
    color: C.muted,
  },

  inputWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    border: `1px solid ${C.border}`,
    borderRadius: 13,
    padding: "5px 11px",
    boxSizing: "border-box",
  },

  scoreInput: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding:
      "7px 0 0",
    fontSize: 17,
    fontWeight: 850,
    color: C.navy,
    boxSizing: "border-box",
  },

  inputHint: {
    color: C.muted,
    fontSize: 8.5,
    paddingBottom: 6,
  },

  scoreSuffix: {
    color: C.green,
    fontSize: 9,
    fontWeight: 850,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  preferenceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 8,
  },

  label: {
    display: "block",
    marginBottom: 5,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 750,
  },

  select: {
    width: "100%",
    padding:
      "10px 8px",
    borderRadius: 11,
    border: `1px solid ${C.border}`,
    background: C.white,
    color: C.navy,
    fontSize: 9.5,
    fontWeight: 750,
    outline: "none",
    boxSizing: "border-box",
  },

  primaryButton: {
    width: "100%",
    marginTop: 16,
    minHeight: 52,
    padding:
      "13px 12px",
    borderRadius: 13,
    border: "none",
    background: C.green,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 11.5,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow:
      "0 8px 18px rgba(0,112,80,0.15)",
    boxSizing: "border-box",
  },

  howCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 17,
    background: C.white,
    border: `1px solid ${C.border}`,
    display: "flex",
    gap: 10,
    boxSizing: "border-box",
  },

  howIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  howTitle: {
    fontSize: 11,
    fontWeight: 900,
  },

  howText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9,
    lineHeight: 1.5,
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    color: C.muted,
    fontSize: 9,
    marginBottom: 13,
  },

  resultTop: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },

  editPrediction: {
    border: `1px solid ${C.green}`,
    borderRadius: 9,
    background: C.white,
    color: C.green,
    padding:
      "7px 10px",
    fontSize: 9,
    fontWeight: 850,
    cursor: "pointer",
    flexShrink: 0,
  },

  predictionSummary: {
    marginTop: 17,
    padding: 15,
    background: C.white,
    borderRadius: 18,
    border: `1px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxSizing: "border-box",
  },

  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  summaryLabel: {
    color: C.green,
    fontSize: 8,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  summaryValue: {
    marginTop: 3,
    fontSize: 19,
    fontWeight: 900,
  },

  summaryHint: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8.5,
  },

  summaryCheck: {
    width: 27,
    height: 27,
    borderRadius: "50%",
    background: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  resultFilters: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 11,
  },

  resultFilterPill: {
    padding:
      "5px 7px",
    borderRadius: 8,
    background: C.softMint,
    color: C.green,
    fontSize: 7.5,
    fontWeight: 850,
  },

  resultCount: {
    marginLeft: "auto",
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 14,
    fontWeight: 900,
  },

  sectionSubtitle: {
    margin: "4px 0 0",
    color: C.muted,
    fontSize: 8.5,
  },

  filterButton: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding:
      "7px 9px",
    borderRadius: 9,
    border: `1px solid ${C.border}`,
    background: C.white,
    color: C.navy,
    fontSize: 8.5,
    fontWeight: 800,
    cursor: "pointer",
    flexShrink: 0,
  },

  collegeCard: {
    width: "100%",
    border: `1px solid ${C.border}`,
    background: C.white,
    borderRadius: 17,
    padding: 12,
    marginBottom: 9,
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    textAlign: "left",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  collegeLogo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    background: C.mint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: 900,
    flexShrink: 0,
  },

  collegeBody: {
    flex: 1,
    minWidth: 0,
  },

  collegeTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },

  collegeType: {
    color: C.muted,
    fontSize: 7,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  matchBadge: {
    padding:
      "4px 6px",
    borderRadius: 7,
    fontSize: 6.8,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  collegeName: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 1.2,
    fontWeight: 900,
  },

  collegeLocation: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: C.muted,
    fontSize: 8,
    lineHeight: 1.3,
  },

  collegeMeta: {
    marginTop: 8,
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    color: C.muted,
    fontSize: 8,
  },

  collegeArrow: {
    width: 27,
    height: 27,
    borderRadius: 9,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  tip: {
    marginTop: 13,
    padding: 11,
    borderRadius: 12,
    background: C.softMint,
    display: "flex",
    gap: 7,
    alignItems: "flex-start",
    color: C.muted,
    fontSize: 8.5,
    lineHeight: 1.45,
  },

  detailHero: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    background: C.white,
    borderRadius: 20,
    border: `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  detailIcon: {
    width: 55,
    height: 55,
    borderRadius: 17,
    background: C.mint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 21,
    fontWeight: 900,
    flexShrink: 0,
  },

  detailType: {
    color: C.green,
    fontSize: 8,
    fontWeight: 900,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  detailTitle: {
    margin: "5px 0 0",
    fontSize: 19,
    lineHeight: 1.25,
    fontWeight: 900,
  },

  detailLocation: {
    marginTop: 7,
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: C.muted,
    fontSize: 8.5,
    lineHeight: 1.35,
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 7,
    marginTop: 10,
  },

  detailMetric: {
    padding: 11,
    borderRadius: 15,
    background: C.white,
    border: `1px solid ${C.border}`,
    minWidth: 0,
    boxSizing: "border-box",
  },

  detailMetricLabel: {
    color: C.muted,
    fontSize: 7.5,
    fontWeight: 750,
  },

  detailMetricValue: {
    marginTop: 5,
    fontSize: 10,
    lineHeight: 1.3,
    fontWeight: 900,
  },

  panel: {
    marginTop: 11,
    padding: 15,
    background: C.white,
    borderRadius: 18,
    border: `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  panelTitle: {
    fontSize: 13,
    fontWeight: 900,
    marginBottom: 4,
  },

  reasonRow: {
    display: "flex",
    gap: 9,
    padding: "12px 0",
    borderBottom: `1px solid ${C.border}`,
  },

  reasonIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  reasonTitle: {
    fontSize: 10.5,
    fontWeight: 850,
  },

  reasonText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 8.5,
    lineHeight: 1.5,
  },

  disclaimer: {
    marginTop: 11,
    padding: 11,
    borderRadius: 12,
    background: "#F8FAF9",
    display: "flex",
    alignItems: "flex-start",
    gap: 7,
    color: C.muted,
    fontSize: 8,
    lineHeight: 1.45,
  },
};