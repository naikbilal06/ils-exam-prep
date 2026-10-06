import React, { useEffect, useState } from "react";
import { Capacitor, CapacitorHttp } from "@capacitor/core";
import { realColleges } from "../data/colleges";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "rgba(16, 185, 129, 0.12)",
  softMint: "rgba(255, 255, 255, 0.05)",
  white: "rgba(255, 255, 255, 0.06)",
  muted: "rgba(226, 232, 240, 0.7)",
  border: "rgba(255, 255, 255, 0.1)",
  blue: "#38BDF8",
  purple: "#A855F7",
  yellow: "#F59E0B",
};

const exams = [
  {
    id: "neet",
    label: "NEET UG",
    sub: "Medical",
  },
  {
    id: "jee",
    label: "JEE Main",
    sub: "Engineering",
  },
  {
    id: "cuet",
    label: "CUET UG",
    sub: "Universities",
  },
];

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
  profile,
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

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [saved, setSaved] =
    useState([]);

  const [saveLoading, setSaveLoading] =
    useState(false);

  const selectedExamData =
    exams.find(
      (exam) =>
        exam.id === selectedExam
    );

  const userId = String(
    profile?.id ||
      profile?._id ||
      profile?.userId ||
      ""
  ).trim();

  const getCollegeId = (
    college
  ) => {
    return String(
      college?.id ||
        college?._id ||
        ""
    ).trim();
  };

  const formatRange = (
    min,
    max,
    fallback = "—"
  ) => {
    const minValue = Number(min);
    const maxValue = Number(max);

    if (
      Number.isFinite(minValue) &&
      Number.isFinite(maxValue)
    ) {
      return `${minValue.toLocaleString(
        "en-IN"
      )} – ${maxValue.toLocaleString(
        "en-IN"
      )}`;
    }

    if (
      Number.isFinite(minValue)
    ) {
      return `${minValue.toLocaleString(
        "en-IN"
      )}+`;
    }

    return fallback;
  };

  const getCutoffDisplay = (
    college
  ) => {
    return (
      college?.cutoff ||
      college?.expectedCutoff ||
      formatRange(
        college?.cutoffMin,
        college?.cutoffMax
      )
    );
  };

  const getRankDisplay = (
    college
  ) => {
    return (
      college?.rank ||
      college?.expectedRank ||
      formatRange(
        college?.rankMin,
        college?.rankMax
      )
    );
  };

  const getIconLetter = (
    college
  ) => {
    const icon = String(
      college?.icon || ""
    ).trim();

    if (!icon) {
      return String(
        college?.name || "C"
      )
        .charAt(0)
        .toUpperCase();
    }

    const iconMap = {
      medical: "M",
      engineering: "E",
      university: "U",
      college: "C",
    };

    return (
      iconMap[icon.toLowerCase()] ||
      icon
        .charAt(0)
        .toUpperCase()
    );
  };

  /* =========================================================
     LOAD SAVED COLLEGES
  ========================================================= */

  const loadSavedColleges =
    async () => {
      if (!userId) {
        setSaved([]);
        return;
      }

      try {
        const url =
          `${API_URL}/api/saved-colleges` +
          `?userId=${encodeURIComponent(
            userId
          )}`;

        let data = {};

        if (
          Capacitor.getPlatform() ===
          "web"
        ) {
          const response =
            await fetch(url);

          data =
            await response
              .json()
              .catch(() => ({}));

          if (
            !response.ok ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Unable to load saved colleges."
            );
          }
        } else {
          const response =
            await CapacitorHttp.get({
              url,
            });

          data =
            response?.data || {};

          if (
            response?.status <
              200 ||
            response?.status >=
              300 ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Unable to load saved colleges."
            );
          }
        }

        const savedIds =
          Array.isArray(
            data?.colleges
          )
            ? data.colleges
                .map(
                  (college) =>
                    getCollegeId(
                      college
                    )
                )
                .filter(Boolean)
            : [];

        setSaved(savedIds);
      } catch (
        loadError
      ) {
        console.error(
          "Load saved colleges error:",
          loadError
        );
      }
    };

  useEffect(() => {
    loadSavedColleges();
  }, [userId]);

  /* =========================================================
     PREDICT
  ========================================================= */

  const predict =
    async () => {
      const cleanScore =
        score.trim();

      const numericScore =
        Number(cleanScore);

      if (
        !cleanScore ||
        !Number.isFinite(
          numericScore
        ) ||
        numericScore < 0
      ) {
        setError(
          "Please enter a valid score."
        );
        return;
      }

      setLoading(true);
      setError("");
      setResults([]);
      setSelectedCollege(null);

      try {
        const params =
          new URLSearchParams({
            exam: selectedExam,
            score: String(
              numericScore
            ),
            category,
            state,
          });

        const url =
          `${API_URL}/api/colleges?` +
          params.toString();

        let data = {};

        if (
          Capacitor.getPlatform() ===
          "web"
        ) {
          const response =
            await fetch(url);

          data =
            await response
              .json()
              .catch(() => ({}));

          if (
            !response.ok ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Unable to calculate college predictions."
            );
          }
        } else {
          const response =
            await CapacitorHttp.get({
              url,
            });

          data =
            response?.data || {};

          if (
            response?.status <
              200 ||
            response?.status >=
              300 ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Unable to calculate college predictions."
            );
          }
        }

        const normalized =
          Array.isArray(
            data?.colleges
          )
            ? data.colleges.map(
                (college) => ({
                  ...college,
                  id: getCollegeId(
                    college
                  ),
                })
              )
            : [];

        if (normalized.length > 0) {
          setResults(normalized);
        } else {
          // Fallback to real verified dataset if backend returned empty
          const fallbackMatches = realColleges
            .filter((c) => c.exam === selectedExam || (selectedExam === "jee" && c.exam === "jee"))
            .map((c) => ({
              ...c,
              match: numericScore >= c.cutoffMax ? "High Match" : numericScore >= c.cutoffMin ? "Good Match" : "Below Current Range",
            }));
          setResults(fallbackMatches);
        }

        setStage(
          "results"
        );
      } catch (
        predictError
      ) {
        console.warn(
          "Using verified local real colleges dataset due to network/API error:",
          predictError
        );

        const fallbackMatches = realColleges
          .filter((c) => c.exam === selectedExam || (selectedExam === "jee" && c.exam === "jee"))
          .map((c) => ({
            ...c,
            match: numericScore >= c.cutoffMax ? "High Match" : numericScore >= c.cutoffMin ? "Good Match" : "Below Current Range",
          }));

        if (fallbackMatches.length > 0) {
          setResults(fallbackMatches);
          setStage("results");
          setError("");
        } else {
          setError(
            predictError?.message ||
              "Unable to load college predictions."
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* =========================================================
     SAVE / REMOVE COLLEGE
  ========================================================= */

  const saveCollege =
    async (
      college
    ) => {
      const collegeId =
        getCollegeId(
          college
        );

      if (!userId) {
        alert(
          "Please login first."
        );
        return;
      }

      if (!collegeId) {
        alert(
          "College ID is missing."
        );
        return;
      }

      const alreadySaved =
        saved.includes(
          collegeId
        );

      setSaveLoading(
        true
      );

      try {
        const url =
          `${API_URL}/api/saved-colleges`;

        let data = {};

        /* =========================
           REMOVE
        ========================= */

        if (alreadySaved) {
          const deleteUrl =
            `${url}?userId=${encodeURIComponent(
              userId
            )}` +
            `&collegeId=${encodeURIComponent(
              collegeId
            )}`;

          if (
            Capacitor.getPlatform() ===
            "web"
          ) {
            const response =
              await fetch(
                deleteUrl,
                {
                  method:
                    "DELETE",
                }
              );

            data =
              await response
                .json()
                .catch(
                  () => ({})
                );

            if (
              !response.ok ||
              !data?.success
            ) {
              throw new Error(
                data?.message ||
                  "Unable to remove college."
              );
            }
          } else {
            const response =
              await CapacitorHttp.delete(
                {
                  url:
                    deleteUrl,
                }
              );

            data =
              response?.data ||
              {};

            if (
              response?.status <
                200 ||
              response?.status >=
                300 ||
              !data?.success
            ) {
              throw new Error(
                data?.message ||
                  "Unable to remove college."
              );
            }
          }

          setSaved(
            (previous) =>
              previous.filter(
                (id) =>
                  id !==
                  collegeId
              )
          );

          return;
        }

        /* =========================
           SAVE
        ========================= */

        const payload = {
          userId,
          collegeId,
        };

        if (
          Capacitor.getPlatform() ===
          "web"
        ) {
          const response =
            await fetch(
              url,
              {
                method:
                  "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body:
                  JSON.stringify(
                    payload
                  ),
              }
            );

          data =
            await response
              .json()
              .catch(
                () => ({})
              );

          if (
            !response.ok ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Unable to save college."
            );
          }
        } else {
          const response =
            await CapacitorHttp.post(
              {
                url,
                headers: {
                  "Content-Type":
                    "application/json",
                },
                data: payload,
              }
            );

          data =
            response?.data ||
            {};

          if (
            response?.status <
              200 ||
            response?.status >=
              300 ||
            !data?.success
          ) {
            throw new Error(
              data?.message ||
                "Unable to save college."
            );
          }
        }

        setSaved(
          (previous) =>
            previous.includes(
              collegeId
            )
              ? previous
              : [
                  ...previous,
                  collegeId,
                ]
        );
      } catch (
        saveError
      ) {
        console.error(
          "Save college error:",
          saveError
        );

        alert(
          saveError?.message ||
            "Unable to update saved college."
        );
      } finally {
        setSaveLoading(
          false
        );
      }
    };

  /* =========================================================
     COLLEGE DETAILS
  ========================================================= */

  if (
    stage === "details" &&
    selectedCollege
  ) {
    const selectedCollegeId =
      getCollegeId(
        selectedCollege
      );

    const isSaved =
      saved.includes(
        selectedCollegeId
      );

    return (
      <Page>
        <Header
          onBack={() =>
            setStage(
              "results"
            )
          }
          right="College Details"
        />

        <main
          style={
            styles.container
          }
        >
          <div
            style={
              styles.breadcrumb
            }
          >
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
              {getIconLetter(
                selectedCollege
              )}
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
                {
                  selectedCollege.type
                }
              </div>

              <h1
                style={
                  styles.detailTitle
                }
              >
                {
                  selectedCollege.name
                }
              </h1>

              <div
                style={
                  styles.detailLocation
                }
              >
                <Icon
                  name="location"
                  size={14}
                  stroke={
                    C.green
                  }
                />

                {
                  selectedCollege.location
                }
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
                selectedCollege.match ||
                "—"
              }
              green
            />

            <DetailMetric
              label="Expected Cutoff"
              value={getCutoffDisplay(
                selectedCollege
              )}
            />

            <DetailMetric
              label="Expected Rank"
              value={getRankDisplay(
                selectedCollege
              )}
            />
          </div>

          <section
            style={
              styles.panel
            }
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
                  stroke={
                    C.green
                  }
                />
              </div>

              <div>
                <div
                  style={
                    styles.reasonTitle
                  }
                >
                  Strong admission
                  possibility
                </div>

                <div
                  style={
                    styles.reasonText
                  }
                >
                  Your predicted
                  performance falls
                  within the expected
                  range for this
                  college.
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
                  stroke={
                    C.green
                  }
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
                  This college matches
                  your selected
                  state/location
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
                  stroke={
                    C.green
                  }
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
                  Keep improving your
                  score to increase the
                  number of available
                  choices.
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
              stroke={
                C.muted
              }
            />

            <span>
              College predictions
              are estimates based on
              previous trends and may
              change with actual
              cutoffs, category and
              counselling rounds.
            </span>
          </div>

          <button
            type="button"
            style={{
              ...styles.primaryButton,
              opacity:
                saveLoading
                  ? 0.7
                  : 1,
            }}
            onClick={() =>
              saveCollege(
                selectedCollege
              )
            }
            disabled={
              saveLoading
            }
          >
            <Icon
              name="bookmark"
              size={17}
              stroke="#FFFFFF"
            />

            {isSaved
              ? "Saved to My Colleges"
              : saveLoading
              ? "Saving..."
              : "Save College"}
          </button>
        </main>
      </Page>
    );
  }

  /* =========================================================
     RESULTS
  ========================================================= */

  if (
    stage === "results"
  ) {
    return (
      <Page>
        <Header
          onBack={() =>
            setStage(
              "form"
            )
          }
          right="Predicted Colleges"
        />

        <main
          style={
            styles.container
          }
        >
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
                style={
                  styles.title
                }
              >
                Colleges You Can
                Target
              </h1>

              <p
                style={
                  styles.subtitle
                }
              >
                Based on your{" "}
                {
                  selectedExamData?.label
                }{" "}
                score, category
                and location
                preference.
              </p>
            </div>

            <button
              type="button"
              style={
                styles.editPrediction
              }
              onClick={() =>
                setStage(
                  "form"
                )
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
                stroke={
                  C.green
                }
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
                YOUR EXPECTED SCORE
              </div>

              <div
                style={
                  styles.summaryValue
                }
              >
                {Number(
                  score
                ).toLocaleString(
                  "en-IN"
                )}
              </div>

              <div
                style={
                  styles.summaryHint
                }
              >
                Current expected
                performance
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
              {
                selectedExamData?.label
              }
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
              {results.length}{" "}
              {
                results.length ===
                1
                  ? "match"
                  : "matches"
              }
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
                Based on your
                selected preferences
              </p>
            </div>

            <button
              type="button"
              style={
                styles.filterButton
              }
              onClick={() =>
                setStage(
                  "form"
                )
              }
            >
              <Icon
                name="filter"
                size={16}
                stroke={
                  C.navy
                }
              />

              Filter
            </button>
          </div>

          {loading && (
            <section
              style={
                styles.stateCard
              }
            >
              <div
                style={
                  styles.stateTitle
                }
              >
                Finding colleges...
              </div>

              <div
                style={
                  styles.stateText
                }
              >
                Comparing your
                score with the
                current published
                prediction data.
              </div>
            </section>
          )}

          {!loading &&
            error && (
              <section
                style={
                  styles.stateCard
                }
              >
                <div
                  style={
                    styles.stateTitle
                  }
                >
                  Unable to load
                  predictions
                </div>

                <div
                  style={
                    styles.stateText
                  }
                >
                  {error}
                </div>

                <button
                  type="button"
                  style={
                    styles.retryButton
                  }
                  onClick={() =>
                    setStage(
                      "form"
                    )
                  }
                >
                  Edit prediction
                </button>
              </section>
            )}

          {!loading &&
            !error &&
            results.length ===
              0 && (
              <section
                style={
                  styles.stateCard
                }
              >
                <div
                  style={
                    styles.stateTitle
                  }
                >
                  No matching
                  colleges found
                </div>

                <div
                  style={
                    styles.stateText
                  }
                >
                  Try adjusting your
                  score, category or
                  preferred state.
                </div>
              </section>
            )}

          {!loading &&
            !error &&
            results.map(
              (
                college
              ) => {
                const collegeId =
                  getCollegeId(
                    college
                  );

                const isCollegeSaved =
                  saved.includes(
                    collegeId
                  );

                const match =
                  String(
                    college.match ||
                      ""
                  );

                const isHighMatch =
                  match.toLowerCase() ===
                  "high match";

                return (
                  <button
                    type="button"
                    key={
                      collegeId ||
                      `${college.name}-${college.location}`
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
                      {getIconLetter(
                        college
                      )}
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
                          {
                            college.type
                          }
                        </span>

                        <span
                          style={{
                            ...styles.matchBadge,
                            color:
                              isHighMatch
                                ? C.green
                                : C.blue,
                            background:
                              isHighMatch
                                ? C.mint
                                : "#EEF5FC",
                          }}
                        >
                          {
                            college.match ||
                              "Available"
                          }
                        </span>
                      </div>

                      <div
                        style={
                          styles.collegeName
                        }
                      >
                        {
                          college.name
                        }
                      </div>

                      <div
                        style={
                          styles.collegeLocation
                        }
                      >
                        <Icon
                          name="location"
                          size={12}
                          stroke={
                            C.muted
                          }
                        />

                        {
                          college.location
                        }
                      </div>

                      <div
                        style={
                          styles.collegeMeta
                        }
                      >
                        <span>
                          Cutoff:{" "}
                          <strong>
                            {getCutoffDisplay(
                              college
                            )}
                          </strong>
                        </span>

                        <span>
                          Rank:{" "}
                          <strong>
                            {getRankDisplay(
                              college
                            )}
                          </strong>
                        </span>

                        {isCollegeSaved && (
                          <span
                            style={{
                              color:
                                C.green,
                              fontWeight: 900,
                            }}
                          >
                            Saved
                          </span>
                        )}
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
                        stroke={
                          C.green
                        }
                      />
                    </div>
                  </button>
                );
              }
            )}

          <div
            style={
              styles.tip
            }
          >
            <Icon
              name="info"
              size={17}
              stroke={
                C.green
              }
            />

            <span>
              Predictions are
              indicative. Actual
              admission depends on
              official counselling,
              cutoffs and seat
              availability.
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

      <main
        style={
          styles.container
        }
      >
        <div
          style={
            styles.kicker
          }
        >
          SMART ADMISSION GUIDE
        </div>

        <h1
          style={styles.title}
        >
          College Predictor
        </h1>

        <p
          style={
            styles.subtitle
          }
        >
          Enter your expected
          performance and
          discover colleges you
          can target for
          admission.
        </p>

        <section
          style={
            styles.heroCard
          }
        >
          <div
            style={
              styles.heroIcon
            }
          >
            <Icon
              name="target"
              size={25}
              stroke={
                C.green
              }
            />
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={
                styles.heroTitle
              }
            >
              Know your college
              options
            </div>

            <div
              style={
                styles.heroText
              }
            >
              Get a personalised
              list based on your
              exam, score and
              preferences.
            </div>
          </div>
        </section>

        <section
          style={
            styles.formCard
          }
        >
          <div
            style={
              styles.formSectionTitle
            }
          >
            01. Select Exam
          </div>

          <div
            style={
              styles.examGrid
            }
          >
            {exams.map(
              (exam) => {
                const active =
                  selectedExam ===
                  exam.id;

                return (
                  <button
                    type="button"
                    key={
                      exam.id
                    }
                    style={{
                      ...styles.examButton,
                      ...(active
                        ? styles.activeExamButton
                        : {}),
                    }}
                    onClick={() => {
                      setSelectedExam(
                        exam.id
                      );

                      setScore(
                        ""
                      );

                      setError(
                        ""
                      );

                      setResults(
                        []
                      );

                      setStage(
                        "form"
                      );
                    }}
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
                          stroke="#010F0E"
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
                        {
                          exam.label
                        }
                      </div>

                      <div
                        style={
                          styles.examSub
                        }
                      >
                        {
                          exam.sub
                        }
                      </div>
                    </div>
                  </button>
                );
              }
            )}
          </div>

          <div
            style={
              styles.formSectionTitle
            }
          >
            02. Enter Expected Score
          </div>

          <div
            style={
              styles.inputWrap
            }
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <input
                value={score}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, "");
                  setScore(val);
                  if (error) setError("");
                }}
                type="text"
                inputMode="decimal"
                placeholder={
                  selectedExam === "neet"
                    ? "e.g. 620"
                    : selectedExam === "jee"
                    ? "e.g. 98.5"
                    : "e.g. 650"
                }
                aria-label="Expected score"
                style={
                  styles.scoreInput
                }
              />
            </div>

            <div
              style={
                styles.scoreSuffixBadge
              }
            >
              {selectedExam === "jee"
                ? "Percentile"
                : selectedExam === "neet"
                ? "Max 720"
                : "Max 800"}
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
                style={
                  styles.label
                }
              >
                Category
              </label>

              <select
                value={
                  category
                }
                onChange={(e) =>
                  setCategory(
                    e.target
                      .value
                  )
                }
                style={
                  styles.select
                }
              >
                <option style={styles.option}>
                  General
                </option>

                <option style={styles.option}>
                  OBC
                </option>

                <option style={styles.option}>
                  SC
                </option>

                <option style={styles.option}>
                  ST
                </option>

                <option style={styles.option}>
                  EWS
                </option>
              </select>
            </div>

            <div>
              <label
                style={
                  styles.label
                }
              >
                Preferred State
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target
                      .value
                  )
                }
                style={
                  styles.select
                }
              >
                <option style={styles.option}>
                  Jammu & Kashmir
                </option>

                <option style={styles.option}>
                  Delhi
                </option>

                <option style={styles.option}>
                  Uttar Pradesh
                </option>

                <option style={styles.option}>
                  Maharashtra
                </option>

                <option style={styles.option}>
                  All India
                </option>
              </select>
            </div>
          </div>

          {error &&
            stage ===
              "form" && (
              <div
                style={
                  styles.formError
                }
              >
                {error}
              </div>
            )}

          <button
            type="button"
            style={{
              ...styles.primaryButton,
              opacity:
                loading
                  ? 0.7
                  : score.trim()
                  ? 1
                  : 0.55,
              cursor:
                loading
                  ? "wait"
                  : score.trim()
                  ? "pointer"
                  : "not-allowed",
            }}
            onClick={
              predict
            }
            disabled={
              loading ||
              !score.trim()
            }
          >
            <Icon
              name="search"
              size={18}
              stroke="#010F0E"
            />

            <span>
              {loading
                ? "Finding Colleges..."
                : "Predict My Colleges"}
            </span>

            {!loading && (
              <Icon
                name="arrow"
                size={17}
                stroke="#010F0E"
              />
            )}
          </button>
        </section>

        <section
          style={
            styles.howCard
          }
        >
          <div
            style={
              styles.howIcon
            }
          >
            <Icon
              name="trend"
              size={18}
              stroke={
                C.green
              }
            />
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={
                styles.howTitle
              }
            >
              How prediction works
            </div>

            <div
              style={
                styles.howText
              }
            >
              We compare your
              expected performance
              with published
              prediction data and
              present colleges that
              match your selected
              preferences.
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

function Page({
  children,
}) {
  return (
    <div
      style={
        styles.page
      }
    >
      <div
        style={
          styles.mobileShell
        }
      >
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
    <header
      style={
        styles.header
      }
    >
      <div
        style={
          styles.headerInner
        }
      >
        <button
          type="button"
          style={
            styles.backButton
          }
          onClick={
            onBack
          }
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
          <div
            style={
              styles.brand
            }
          >
            ILS RANKER
          </div>

          <div
            style={
              styles.headerTagline
            }
          >
            KNOW YOUR POTENTIAL
          </div>
        </div>

        <div
          style={
            styles.headerRight
          }
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
      style={
        styles.detailMetric
      }
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
          color:
            green
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
    background: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    boxSizing: "border-box",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  mobileShell: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "100dvh",
    background: "transparent",
    overflow: "visible",
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(6, 49, 43, 0.85)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(16px)",
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
    fontSize: 15,
    fontWeight: 850,
    color: "#FFFFFF",
  },

  heroText: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: 12.5,
    lineHeight: 1.45,
  },

  formCard: {
    marginTop: 14,
    padding: 18,
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: 20,
    border: `1px solid ${C.border}`,
    boxShadow:
      "0 10px 25px rgba(0, 0, 0, 0.25)",
    boxSizing: "border-box",
  },

  formSectionTitle: {
    fontSize: 13.5,
    fontWeight: 800,
    color: "#FFFFFF",
    marginTop: 6,
    marginBottom: 11,
    letterSpacing: "0.02em",
  },

  examGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 8,
  },

  examButton: {
    minWidth: 0,
    minHeight: 70,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 10px",
    border: `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: 13,
    textAlign: "left",
    cursor: "pointer",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },

  activeExamButton: {
    borderColor: "#10E79D",
    background: "rgba(16, 231, 157, 0.12)",
    boxShadow: "0 0 14px rgba(16, 231, 157, 0.18)",
  },

  examRadio: {
    width: 24,
    height: 24,
    borderRadius: 8,
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    background: "rgba(255, 255, 255, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  activeRadio: {
    background: "#10E79D",
    borderColor: "#10E79D",
  },

  examName: {
    fontSize: 12.5,
    lineHeight: 1.2,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  examSub: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 1.2,
    color: "rgba(226, 232, 240, 0.65)",
  },

  inputWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    border: `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: 14,
    padding: "0 14px",
    minHeight: 52,
    boxSizing: "border-box",
  },

  scoreInput: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "13px 0",
    fontSize: 16,
    fontWeight: 700,
    color: "#FFFFFF",
    boxSizing: "border-box",
  },

  scoreSuffixBadge: {
    color: "#10E79D",
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 800,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  preferenceGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 10,
  },

  label: {
    display: "block",
    marginBottom: 6,
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: 12,
    fontWeight: 750,
  },

  select: {
    width: "100%",
    padding:
      "11px 10px",
    borderRadius: 12,
    border: `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.06)",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: 700,
    outline: "none",
    boxSizing: "border-box",
    colorScheme: "dark",
    cursor: "pointer",
  },

  option: {
    background: "#04241F",
    color: "#FFFFFF",
    padding: "8px 10px",
  },

  formError: {
    marginTop: 10,
    padding: "10px 12px",
    borderRadius: 11,
    background: "rgba(255, 94, 98, 0.12)",
    border: "1px solid rgba(255, 94, 98, 0.3)",
    color: "#FF6B6B",
    fontSize: 12,
    lineHeight: 1.4,
  },

  primaryButton: {
    width: "100%",
    marginTop: 18,
    minHeight: 52,
    padding:
      "14px 16px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #10E79D 0%, #00C882 100%)",
    color: "#010F0E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    boxShadow:
      "0 8px 24px rgba(16, 231, 157, 0.28)",
    boxSizing: "border-box",
  },

  howCard: {
    marginTop: 14,
    padding: 16,
    borderRadius: 18,
    background: "rgba(255, 255, 255, 0.04)",
    border: `1px solid ${C.border}`,
    display: "flex",
    gap: 12,
    boxSizing: "border-box",
  },

  howIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  howTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  howText: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: 12.5,
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

  stateCard: {
    marginTop: 11,
    padding: 15,
    borderRadius: 16,
    background: C.white,
    border: `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  stateTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  stateText: {
    marginTop: 5,
    color: C.muted,
    fontSize: 8.8,
    lineHeight: 1.5,
  },

  retryButton: {
    marginTop: 10,
    border: `1px solid ${C.green}`,
    borderRadius: 9,
    background: C.white,
    color: C.green,
    padding: "7px 10px",
    fontSize: 8.5,
    fontWeight: 850,
    cursor: "pointer",
  },

  collegeCard: {
    width: "100%",
    border: `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    textAlign: "left",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  collegeLogo: {
    width: 44,
    height: 44,
    borderRadius: 13,
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.2)",
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
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
    gap: 8,
  },

  collegeType: {
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  matchBadge: {
    padding:
      "4px 8px",
    borderRadius: 8,
    fontSize: 11,
    fontWeight: 850,
    whiteSpace: "nowrap",
  },

  collegeName: {
    marginTop: 5,
    fontSize: 15,
    lineHeight: 1.25,
    fontWeight: 850,
    color: "#FFFFFF",
  },

  collegeLocation: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
    lineHeight: 1.3,
  },

  collegeMeta: {
    marginTop: 8,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
  },

  collegeArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  tip: {
    marginTop: 14,
    padding: 12,
    borderRadius: 13,
    background: C.softMint,
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
    color: "rgba(226, 232, 240, 0.8)",
    fontSize: 12,
    lineHeight: 1.45,
  },

  detailHero: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    padding: 18,
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: 20,
    border: `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  detailIcon: {
    width: 55,
    height: 55,
    borderRadius: 17,
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 900,
    flexShrink: 0,
  },

  detailType: {
    color: C.green,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  detailTitle: {
    margin: "5px 0 0",
    fontSize: 20,
    lineHeight: 1.25,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  detailLocation: {
    marginTop: 7,
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
    lineHeight: 1.35,
  },

  detailGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: 8,
    marginTop: 12,
  },

  detailMetric: {
    padding: 12,
    borderRadius: 15,
    background: "rgba(255, 255, 255, 0.04)",
    border: `1px solid ${C.border}`,
    minWidth: 0,
    boxSizing: "border-box",
  },

  detailMetricLabel: {
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 11,
    fontWeight: 750,
  },

  detailMetricValue: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 1.3,
    fontWeight: 850,
    color: "#FFFFFF",
  },

  panel: {
    marginTop: 12,
    padding: 16,
    background: "rgba(255, 255, 255, 0.04)",
    borderRadius: 18,
    border: `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  panelTitle: {
    fontSize: 14.5,
    fontWeight: 900,
    marginBottom: 6,
    color: "#FFFFFF",
  },

  reasonRow: {
    display: "flex",
    gap: 10,
    padding: "13px 0",
    borderBottom: `1px solid ${C.border}`,
  },

  reasonIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    background: "rgba(16, 231, 157, 0.12)",
    border: "1px solid rgba(16, 231, 157, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  reasonTitle: {
    fontSize: 13.5,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  reasonText: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
    lineHeight: 1.5,
  },

  disclaimer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 13,
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: 11.5,
    lineHeight: 1.45,
  },
};