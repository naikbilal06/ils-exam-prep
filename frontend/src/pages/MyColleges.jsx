import React, { useEffect, useState } from "react";
import { Capacitor, CapacitorHttp } from "@capacitor/core";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
  softMint: "rgba(16, 231, 157, 0.12)",
  white: "rgba(255, 255, 255, 0.05)",
  muted: "rgba(226, 232, 240, 0.65)",
  border: "rgba(255, 255, 255, 0.12)",
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

    bookmark: (
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />
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

    trash: (
      <>
        <path d="M4 7h16" />
        <path d="M9 7V4h6v3" />
        <path d="M7 7l1 13h8l1-13" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
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
  };

  return (
    <svg {...common}>
      {paths[name]}
    </svg>
  );
}

export default function MyColleges({
  profile,
  onBack,
  onOpenSection,
}) {
  const [colleges, setColleges] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [removingId, setRemovingId] =
    useState("");

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
    max
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

    return "—";
  };

  const getCutoff = (
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

  const getRank = (
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

    const map = {
      medical: "M",
      engineering: "E",
      university: "U",
      college: "C",
    };

    return (
      map[icon.toLowerCase()] ||
      String(
        college?.name || "C"
      )
        .charAt(0)
        .toUpperCase()
    );
  };

  const loadColleges =
    async () => {
      if (!userId) {
        setColleges([]);
        setLoading(false);
        setError(
          "Please login to view My Colleges."
        );
        return;
      }

      setLoading(true);
      setError("");

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
                "Unable to load My Colleges."
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
                "Unable to load My Colleges."
            );
          }
        }

        setColleges(
          Array.isArray(
            data?.colleges
          )
            ? data.colleges
            : []
        );
      } catch (
        loadError
      ) {
        console.error(
          "My Colleges load error:",
          loadError
        );

        setError(
          loadError?.message ||
            "Unable to load saved colleges."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadColleges();
  }, [userId]);

  const removeCollege =
    async (
      college
    ) => {
      const collegeId =
        getCollegeId(
          college
        );

      if (
        !userId ||
        !collegeId
      ) {
        return;
      }

      setRemovingId(
        collegeId
      );

      try {
        const url =
          `${API_URL}/api/saved-colleges` +
          `?userId=${encodeURIComponent(
            userId
          )}` +
          `&collegeId=${encodeURIComponent(
            collegeId
          )}`;

        let data = {};

        if (
          Capacitor.getPlatform() ===
          "web"
        ) {
          const response =
            await fetch(
              url,
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
                url,
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

        setColleges(
          (previous) =>
            previous.filter(
              (item) =>
                getCollegeId(
                  item
                ) !== collegeId
            )
        );
      } catch (
        removeError
      ) {
        console.error(
          "Remove college error:",
          removeError
        );

        alert(
          removeError?.message ||
            "Unable to remove college."
        );
      } finally {
        setRemovingId("");
      }
    };

  return (
    <Page>
      <Header
        onBack={onBack}
        right="My Colleges"
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
          SAVED OPTIONS
        </div>

        <div
          style={
            styles.titleRow
          }
        >
          <div
            style={{
              minWidth: 0,
            }}
          >
            <h1
              style={
                styles.title
              }
            >
              My Colleges
            </h1>

            <p
              style={
                styles.subtitle
              }
            >
              Keep your preferred
              colleges in one place
              for quick access.
            </p>
          </div>

          <div
            style={
              styles.countBadge
            }
          >
            {colleges.length}
          </div>
        </div>

        <section
          style={
            styles.infoCard
          }
        >
          <div
            style={
              styles.infoIcon
            }
          >
            <Icon
              name="bookmark"
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
                styles.infoTitle
              }
            >
              Your saved choices
            </div>

            <div
              style={
                styles.infoText
              }
            >
              Saved colleges are
              linked to your account
              and remain available
              when you return.
            </div>
          </div>
        </section>

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
              Loading My Colleges...
            </div>

            <div
              style={
                styles.stateText
              }
            >
              Fetching your saved
              colleges from the
              server.
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
                colleges
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
                  styles.secondaryButton
                }
                onClick={
                  loadColleges
                }
              >
                Try Again
              </button>
            </section>
          )}

        {!loading &&
          !error &&
          colleges.length ===
            0 && (
            <section
              style={
                styles.emptyCard
              }
            >
              <div
                style={
                  styles.emptyIcon
                }
              >
                <Icon
                  name="bookmark"
                  size={25}
                  stroke={
                    C.green
                  }
                />
              </div>

              <div
                style={
                  styles.emptyTitle
                }
              >
                No colleges saved yet
              </div>

              <div
                style={
                  styles.emptyText
                }
              >
                Explore college
                predictions and save
                the colleges you want
                to compare later.
              </div>

              <button
                type="button"
                style={
                  styles.primaryButton
                }
                onClick={() =>
                  onOpenSection &&
                  onOpenSection(
                    "college-prediction"
                  )
                }
              >
                <Icon
                  name="search"
                  size={17}
                  stroke="#FFFFFF"
                />

                Find Colleges
              </button>
            </section>
          )}

        {!loading &&
          !error &&
          colleges.length >
            0 &&
          colleges.map(
            (
              college
            ) => {
              const collegeId =
                getCollegeId(
                  college
                );

              const removing =
                removingId ===
                collegeId;

              return (
                <article
                  key={
                    collegeId
                  }
                  style={
                    styles.collegeCard
                  }
                >
                  <div
                    style={
                      styles.logo
                    }
                  >
                    {getIconLetter(
                      college
                    )}
                  </div>

                  <div
                    style={
                      styles.cardBody
                    }
                  >
                    <div
                      style={
                        styles.cardTop
                      }
                    >
                      <span
                        style={
                          styles.type
                        }
                      >
                        {
                          college.type
                        }
                      </span>

                      <span
                        style={
                          styles.exam
                        }
                      >
                        {String(
                          college.exam ||
                            ""
                        ).toUpperCase()}
                      </span>
                    </div>

                    <h2
                      style={
                        styles.collegeName
                      }
                    >
                      {
                        college.name
                      }
                    </h2>

                    <div
                      style={
                        styles.location
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
                        college.location ||
                          `${college.city || ""}, ${college.state || ""}`
                      }
                    </div>

                    <div
                      style={
                        styles.metrics
                      }
                    >
                      <div
                        style={
                          styles.metric
                        }
                      >
                        <span>
                          Cutoff
                        </span>

                        <strong>
                          {getCutoff(
                            college
                          )}
                        </strong>
                      </div>

                      <div
                        style={
                          styles.metric
                        }
                      >
                        <span>
                          Rank
                        </span>

                        <strong>
                          {getRank(
                            college
                          )}
                        </strong>
                      </div>
                    </div>

                    {Array.isArray(
                      college.courses
                    ) &&
                      college.courses
                        .length >
                        0 && (
                        <div
                          style={
                            styles.courseRow
                          }
                        >
                          {college.courses
                            .slice(
                              0,
                              3
                            )
                            .map(
                              (
                                course
                              ) => (
                                <span
                                  key={
                                    course
                                  }
                                  style={
                                    styles.coursePill
                                  }
                                >
                                  {
                                    course
                                  }
                                </span>
                              )
                            )}
                        </div>
                      )}

                    <div
                      style={
                        styles.actions
                      }
                    >
                      <button
                        type="button"
                        style={
                          styles.removeButton
                        }
                        onClick={() =>
                          removeCollege(
                            college
                          )
                        }
                        disabled={
                          removing
                        }
                      >
                        <Icon
                          name="trash"
                          size={15}
                          stroke="#A44242"
                        />

                        {removing
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </div>
                  </div>

                  <div
                    style={
                      styles.savedIcon
                    }
                  >
                    <Icon
                      name="bookmark"
                      size={17}
                      stroke={
                        C.green
                      }
                    />
                  </div>
                </article>
              );
            }
          )}

        {!loading &&
          !error &&
          colleges.length >
            0 && (
            <section
              style={
                styles.bottomCard
              }
            >
              <div
                style={
                  styles.bottomTitle
                }
              >
                Want to add more?
              </div>

              <div
                style={
                  styles.bottomText
                }
              >
                Run another prediction
                and save additional
                colleges.
              </div>

              <button
                type="button"
                style={
                  styles.secondaryAction
                }
                onClick={() =>
                  onOpenSection &&
                  onOpenSection(
                    "college-prediction"
                  )
                }
              >
                Find More Colleges
                <Icon
                  name="arrow"
                  size={15}
                  stroke={
                    C.green
                  }
                />
              </button>
            </section>
          )}

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
            Saved colleges are only
            your selected options.
            Admission decisions
            depend on official
            counselling,
            cutoffs and seat
            availability.
          </span>
        </div>
      </main>
    </Page>
  );
}

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
          styles.shell
        }
      >
        {children}
      </div>
    </div>
  );
}

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
              styles.tagline
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

const styles = {
  page: {
    width: "100%",
    minHeight: "100dvh",
    background:
      C.mint,
    color: C.navy,
    display: "flex",
    justifyContent:
      "center",
    boxSizing:
      "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  shell: {
    width: "100%",
    maxWidth: 430,
    minHeight: "100dvh",
    background: "transparent",
    boxSizing: "border-box",
  },

  header: {
    position:
      "sticky",
    top: 0,
    zIndex: 20,
    background:
      "rgba(6, 49, 43, 0.85)",
    backdropFilter:
      "blur(16px)",
    WebkitBackdropFilter:
      "blur(16px)",
    borderBottom:
      `1px solid ${C.border}`,
  },

  headerInner: {
    minHeight: 78,
    padding:
      "14px 15px",
    display: "flex",
    alignItems:
      "center",
    gap: 10,
    boxSizing:
      "border-box",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border:
      `1px solid ${C.border}`,
    background:
      "rgba(255, 255, 255, 0.08)",
    color:
      "#10E79D",
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    cursor:
      "pointer",
    flexShrink: 0,
  },

  brand: {
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: 1,
    lineHeight: 1,
  },

  tagline: {
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
    textAlign:
      "right",
    maxWidth: 80,
    flexShrink: 0,
  },

  container: {
    width: "100%",
    padding:
      "25px 15px 100px",
    boxSizing:
      "border-box",
  },

  kicker: {
    color: C.green,
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 1.1,
  },

  titleRow: {
    marginTop: 5,
    display: "flex",
    alignItems:
      "flex-start",
    justifyContent:
      "space-between",
    gap: 10,
  },

  title: {
    margin: 0,
    fontSize: 29,
    lineHeight: 1.18,
    fontWeight: 900,
    letterSpacing: -0.7,
  },

  subtitle: {
    margin:
      "8px 0 0",
    color: C.muted,
    fontSize: 11.5,
    lineHeight: 1.5,
  },

  countBadge: {
    minWidth: 34,
    height: 34,
    borderRadius: 11,
    background:
      C.softMint,
    color: C.green,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    fontSize: 13,
    fontWeight: 900,
    flexShrink: 0,
  },

  infoCard: {
    marginTop: 18,
    padding: 14,
    background:
      C.white,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    display: "flex",
    gap: 10,
    boxSizing:
      "border-box",
  },

  infoIcon: {
    width: 37,
    height: 37,
    borderRadius: 10,
    background:
      C.mint,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    flexShrink: 0,
  },

  infoTitle: {
    fontSize: 11,
    fontWeight: 900,
  },

  infoText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 8.5,
    lineHeight: 1.5,
  },

  stateCard: {
    marginTop: 12,
    padding: 15,
    borderRadius: 16,
    background:
      C.white,
    border:
      `1px solid ${C.border}`,
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

  secondaryButton: {
    marginTop: 11,
    padding:
      "8px 11px",
    borderRadius: 9,
    border:
      `1px solid ${C.green}`,
    color: C.green,
    background:
      C.white,
    fontSize: 8.5,
    fontWeight: 850,
    cursor:
      "pointer",
  },

  emptyCard: {
    marginTop: 12,
    padding: 25,
    borderRadius: 19,
    background:
      C.white,
    border:
      `1px solid ${C.border}`,
    textAlign:
      "center",
  },

  emptyIcon: {
    width: 52,
    height: 52,
    margin: "0 auto",
    borderRadius: 16,
    background:
      C.mint,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: 900,
  },

  emptyText: {
    marginTop: 6,
    color: C.muted,
    fontSize: 9,
    lineHeight: 1.5,
  },

  primaryButton: {
    width: "100%",
    marginTop: 15,
    minHeight: 46,
    padding:
      "11px 12px",
    borderRadius: 12,
    border: "none",
    background:
      C.green,
    color:
      C.white,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    gap: 7,
    fontSize: 10.5,
    fontWeight: 900,
    cursor:
      "pointer",
  },

  collegeCard: {
    position:
      "relative",
    marginTop: 10,
    padding: 13,
    background:
      C.white,
    borderRadius: 18,
    border:
      `1px solid ${C.border}`,
    display: "flex",
    alignItems:
      "flex-start",
    gap: 10,
    boxSizing:
      "border-box",
  },

  logo: {
    width: 43,
    height: 43,
    borderRadius: 13,
    background:
      C.mint,
    color: C.green,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    fontSize: 16,
    fontWeight: 900,
    flexShrink: 0,
  },

  cardBody: {
    flex: 1,
    minWidth: 0,
    paddingRight: 18,
  },

  cardTop: {
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "space-between",
    gap: 6,
  },

  type: {
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.5,
    textTransform:
      "uppercase",
  },

  exam: {
    color: C.green,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 0.4,
  },

  collegeName: {
    margin:
      "5px 0 0",
    fontSize: 15,
    lineHeight: 1.25,
    fontWeight: 850,
    color: "#FFFFFF",
  },

  location: {
    marginTop: 5,
    display: "flex",
    alignItems:
      "center",
    gap: 5,
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
    lineHeight: 1.3,
  },

  metrics: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 8,
    marginTop: 10,
  },

  metric: {
    padding:
      "8px 10px",
    borderRadius: 10,
    background:
      "rgba(255, 255, 255, 0.04)",
    border:
      `1px solid ${C.border}`,
    color: "rgba(226, 232, 240, 0.85)",
    fontSize: 12,
    fontWeight: 650,
  },

  courseRow: {
    marginTop: 8,
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },

  coursePill: {
    padding:
      "5px 9px",
    borderRadius: 8,
    background:
      C.softMint,
    color: C.green,
    fontSize: 11.5,
    fontWeight: 800,
  },

  actions: {
    marginTop: 10,
  },

  removeButton: {
    border: "none",
    background:
      "transparent",
    padding: 0,
    display: "flex",
    alignItems:
      "center",
    gap: 6,
    color: "#FF6B6B",
    fontSize: 12,
    fontWeight: 750,
    cursor:
      "pointer",
  },

  savedIcon: {
    position:
      "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 10,
    background:
      "rgba(16, 231, 157, 0.12)",
    border:
      "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
  },

  bottomCard: {
    marginTop: 14,
    padding: 16,
    borderRadius: 18,
    background:
      "rgba(16, 231, 157, 0.08)",
    border:
      "1px solid rgba(16, 231, 157, 0.2)",
  },

  bottomTitle: {
    fontSize: 14,
    fontWeight: 850,
    color: "#FFFFFF",
  },

  bottomText: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.75)",
    fontSize: 12.5,
    lineHeight: 1.5,
  },

  secondaryAction: {
    marginTop: 10,
    border: "none",
    background:
      "transparent",
    color: C.green,
    padding: 0,
    display: "flex",
    alignItems:
      "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 800,
    cursor:
      "pointer",
  },

  disclaimer: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    background:
      "rgba(255, 255, 255, 0.04)",
    border:
      "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems:
      "flex-start",
    gap: 7,
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: 11.5,
    lineHeight: 1.45,
  },
};