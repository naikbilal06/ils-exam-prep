import React, { useState } from "react";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "rgba(16, 231, 157, 0.12)",
  softMint: "rgba(255, 255, 255, 0.05)",
  white: "rgba(255, 255, 255, 0.05)",
  muted: "rgba(226, 232, 240, 0.65)",
  border: "rgba(255, 255, 255, 0.12)",
  purple: "#A855F7",
  red: "#FF5E62",
  blue: "#38BDF8",
  yellow: "#FBBF24",
};

function Icon({ name, size = 20, stroke = C.navy }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    back: (
      <>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </>
    ),

    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),

    spark: (
      <>
        <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20" />
      </>
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),

    trend: (
      <>
        <path d="M4 17l6-6 4 4 6-7" />
        <path d="M16 8h4v4" />
      </>
    ),

    home: (
      <>
        <path d="M3.5 10.5 12 3l8.5 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),

    tests: (
      <>
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
        <path d="M9 16h4" />
      </>
    ),

    analysis: (
      <>
        <path d="M5 19V10" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
        <path d="M3.5 21h17" />
      </>
    ),

    college: (
      <>
        <path d="M3 9.5 12 5l9 4.5L12 14 3 9.5Z" />
        <path d="M6 12v4.5c3.5 2 8.5 2 12 0V12" />
        <path d="M21 10v5" />
      </>
    ),

    profile: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
      </>
    ),

    send: (
      <>
        <path d="M21 3L10 14" />
        <path d="M21 3l-7 18-4-7-7-4 18-7Z" />
      </>
    ),
  };

  return <svg {...common}>{icons[name]}</svg>;
}

const weakAreas = [
  {
    title: "Current Electricity",
    accuracy: "28%",
    priority: "High Priority",
    icon: "⚡",
    color: C.red,
    actions: [
      "Revise NCERT concepts",
      "Practice 100+ questions",
      "Take a topic test",
    ],
  },
  {
    title: "Modern Physics",
    accuracy: "34%",
    priority: "High Priority",
    icon: "◉",
    color: C.blue,
    actions: [
      "Review important formulas",
      "Solve previous year questions",
      "Take a revision test",
    ],
  },
  {
    title: "Electrostatics",
    accuracy: "42%",
    priority: "Needs Practice",
    icon: "◎",
    color: C.purple,
    actions: [
      "Revise core concepts",
      "Practice numericals",
      "Attempt chapter quiz",
    ],
  },
];

const suggestions = [
  {
    title: "Improve Physics Accuracy",
    text: "Focus on weak Physics chapters before your next full mock.",
    icon: "target",
  },
  {
    title: "Practice Previous Year Questions",
    text: "PYQs can help you identify recurring concepts and question patterns.",
    icon: "book",
  },
  {
    title: "Take a Mock Test",
    text: "Your next mock will help measure the impact of your revision.",
    icon: "trend",
  },
];

export default function AICounsellor({
  onBack,
  onOpenSection,
  profile,
}) {
  const [activeTab, setActiveTab] = useState("weak");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const name =
    profile?.name?.trim() || "Student";

  const open = (section) => {
    if (onOpenSection) {
      onOpenSection(section);
    }
  };

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: trimmed,
      },
      {
        from: "ai",
        text:
          "Based on your preparation, I recommend focusing on your weak areas first and then taking a targeted practice test.",
      },
    ]);

    setMessage("");
  };

  return (
    <div style={styles.screen}>
      <div style={styles.phone}>

        {/* HEADER */}
        <header style={styles.header}>
          <button
            type="button"
            style={styles.backButton}
            onClick={onBack}
            aria-label="Back"
          >
            <Icon
              name="back"
              size={21}
            />
          </button>

          <div style={styles.brand}>
            <span style={styles.brandTop}>
              ILS RANKER
            </span>

            <span style={styles.brandBottom}>
              KNOW YOUR POTENTIAL
            </span>
          </div>

          <div style={styles.aiHeaderIcon}>
            <Icon
              name="spark"
              size={20}
              stroke={C.purple}
            />
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <main style={styles.content}>

          {/* HERO */}
          <section style={styles.hero}>
            <div style={styles.robot}>
              <Icon
                name="spark"
                size={27}
                stroke="#FFFFFF"
              />
            </div>

            <div style={styles.heroText}>
              <div style={styles.kicker}>
                AI-POWERED GUIDANCE
              </div>

              <h1 style={styles.title}>
                Personalised Study Plan
              </h1>

              <p style={styles.subtitle}>
                Smart recommendations based on your
                test performance and preparation level.
              </p>
            </div>
          </section>

          {/* TABS */}
          <div style={styles.tabs}>
            <button
              type="button"
              style={{
                ...styles.tab,
                ...(activeTab === "weak"
                  ? styles.activeTab
                  : {}),
              }}
              onClick={() =>
                setActiveTab("weak")
              }
            >
              Weak Areas
            </button>

            <button
              type="button"
              style={{
                ...styles.tab,
                ...(activeTab === "plan"
                  ? styles.activeTab
                  : {}),
              }}
              onClick={() =>
                setActiveTab("plan")
              }
            >
              Practice Plan
            </button>

            <button
              type="button"
              style={{
                ...styles.tab,
                ...(activeTab === "resources"
                  ? styles.activeTab
                  : {}),
              }}
              onClick={() =>
                setActiveTab("resources")
              }
            >
              Resources
            </button>
          </div>

          {/* WEAK AREAS */}
          {activeTab === "weak" && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>
                    Your Weak Areas
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    Priority topics detected from your
                    performance
                  </p>
                </div>

                <div style={styles.detectedBadge}>
                  AI Detected
                </div>
              </div>

              {weakAreas.map((area) => (
                <div
                  key={area.title}
                  style={styles.weakCard}
                >
                  <div
                    style={{
                      ...styles.areaIcon,
                      color: area.color,
                    }}
                  >
                    {area.icon}
                  </div>

                  <div style={styles.areaContent}>
                    <div style={styles.areaTop}>
                      <div style={styles.areaTitle}>
                        {area.title}
                      </div>

                      <span
                        style={{
                          ...styles.priority,
                          color:
                            area.priority ===
                            "High Priority"
                              ? C.red
                              : C.yellow,
                          background:
                            area.priority ===
                            "High Priority"
                              ? "#FFF0F1"
                              : "#FFF8E8",
                        }}
                      >
                        {area.priority}
                      </span>
                    </div>

                    <div style={styles.accuracyRow}>
                      <span>Accuracy</span>

                      <strong
                        style={{
                          color: area.color,
                        }}
                      >
                        {area.accuracy}
                      </strong>
                    </div>

                    <div style={styles.barTrack}>
                      <div
                        style={{
                          ...styles.barFill,
                          width: area.accuracy,
                          background: area.color,
                        }}
                      />
                    </div>

                    <div style={styles.actionList}>
                      {area.actions.map(
                        (action, index) => (
                          <div
                            key={action}
                            style={styles.action}
                          >
                            <span
                              style={
                                styles.actionNumber
                              }
                            >
                              {index + 1}
                            </span>

                            <span>{action}</span>
                          </div>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      style={styles.startNow}
                      onClick={() => {
                        open("practice");
                      }}
                    >
                      Start Now

                      <Icon
                        name="arrow"
                        size={15}
                        stroke={C.green}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* PRACTICE PLAN */}
          {activeTab === "plan" && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>
                    Today's Practice Plan
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    A focused plan to improve your weak
                    areas
                  </p>
                </div>
              </div>

              <PlanRow
                time="45 min"
                title="Revise Current Electricity"
                text="Core concepts + important formulas"
                icon="book"
              />

              <PlanRow
                time="60 min"
                title="Practice Physics Questions"
                text="Target 30–40 mixed questions"
                icon="target"
              />

              <PlanRow
                time="30 min"
                title="Attempt a Topic Test"
                text="Check accuracy after revision"
                icon="trend"
                last
              />

              <div style={styles.planSummary}>
                <div style={styles.planSummaryTitle}>
                  Recommended Study Time
                </div>

                <div style={styles.planTime}>
                  2h 15m
                </div>

                <div style={styles.planHint}>
                  Consistent focused practice will
                  improve your performance faster.
                </div>
              </div>
            </section>
          )}

          {/* RESOURCES */}
          {activeTab === "resources" && (
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>
                    Recommended Resources
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    Resources selected for your current
                    needs
                  </p>
                </div>
              </div>

              {[
                {
                  title: "NCERT Revision",
                  text:
                    "Revise important concepts and definitions.",
                },
                {
                  title:
                    "Previous Year Questions",
                  text:
                    "Practice exam-relevant questions.",
                },
                {
                  title: "Formula Revision",
                  text:
                    "Quick revision for important Physics formulas.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={styles.resourceCard}
                >
                  <div style={styles.resourceIcon}>
                    <Icon
                      name="book"
                      size={18}
                      stroke={C.green}
                    />
                  </div>

                  <div style={styles.resourceTextWrap}>
                    <div style={styles.resourceTitle}>
                      {item.title}
                    </div>

                    <div style={styles.resourceText}>
                      {item.text}
                    </div>
                  </div>

                  <Icon
                    name="arrow"
                    size={16}
                    stroke={C.green}
                  />
                </div>
              ))}
            </section>
          )}

          {/* AI SUGGESTIONS */}
          <section style={styles.suggestionSection}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  AI Suggestions
                </h2>

                <p style={styles.sectionSubtitle}>
                  What you should focus on next
                </p>
              </div>

              <Icon
                name="spark"
                size={18}
                stroke={C.purple}
              />
            </div>

            <div style={styles.suggestionGrid}>
              {suggestions.map((item) => (
                <button
                  type="button"
                  key={item.title}
                  style={styles.suggestionCard}
                >
                  <div style={styles.suggestionIcon}>
                    <Icon
                      name={item.icon}
                      size={18}
                      stroke={C.green}
                    />
                  </div>

                  <div style={styles.suggestionTitle}>
                    {item.title}
                  </div>

                  <div style={styles.suggestionText}>
                    {item.text}
                  </div>

                  <div style={styles.suggestionLink}>
                    View suggestion

                    <Icon
                      name="arrow"
                      size={13}
                      stroke={C.green}
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* AI CHAT */}
          <section style={styles.chatCard}>
            <div style={styles.chatHeader}>
              <div style={styles.chatAvatar}>
                <Icon
                  name="spark"
                  size={18}
                  stroke="#FFFFFF"
                />
              </div>

              <div>
                <div style={styles.chatTitle}>
                  Ask your AI Counsellor
                </div>

                <div style={styles.chatSubtitle}>
                  Get guidance about your preparation
                </div>
              </div>
            </div>

            {messages.length > 0 && (
              <div style={styles.messages}>
                {messages.map((item, index) => (
                  <div
                    key={`${item.from}-${index}`}
                    style={{
                      ...styles.message,
                      ...(item.from === "user"
                        ? styles.userMessage
                        : styles.aiMessage),
                    }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            )}

            <div style={styles.chatInputRow}>
              <input
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask anything about your preparation..."
                style={styles.input}
              />

              <button
                type="button"
                style={styles.sendButton}
                onClick={sendMessage}
                aria-label="Send"
              >
                <Icon
                  name="send"
                  size={17}
                  stroke="#FFFFFF"
                />
              </button>
            </div>
          </section>

          <div style={styles.bottomSpace} />
        </main>

        {/* SAME BOTTOM NAV AS DASHBOARD */}
        <nav style={styles.bottomNav}>
          <button
            type="button"
            style={{
              ...styles.navButton,
              ...styles.navActive,
            }}
            onClick={() =>
              open("dashboard")
            }
          >
            <span style={styles.navIcon}>
              <Icon name="home" size={20} />
            </span>

            <span>Home</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("mock-tests")
            }
          >
            <span style={styles.navIcon}>
              <Icon name="tests" size={19} />
            </span>

            <span>Tests</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("analysis")
            }
          >
            <span style={styles.navIcon}>
              <Icon name="analysis" size={20} />
            </span>

            <span>Analysis</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("college-prediction")
            }
          >
            <span style={styles.navIcon}>
              <Icon name="college" size={19} />
            </span>

            <span>Colleges</span>
          </button>

          <button
            type="button"
            style={styles.navButton}
            onClick={() =>
              open("profile")
            }
          >
            <span style={styles.navIcon}>
              <Icon name="profile" size={20} />
            </span>

            <span>Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

function PlanRow({
  time,
  title,
  text,
  icon,
  last,
}) {
  return (
    <div
      style={{
        ...styles.planRow,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
    >
      <div style={styles.planIcon}>
        <Icon
          name={icon}
          size={17}
          stroke={C.green}
        />
      </div>

      <div style={styles.planMiddle}>
        <div style={styles.planTitle}>
          {title}
        </div>

        <div style={styles.planText}>
          {text}
        </div>
      </div>

      <div style={styles.planTimeSmall}>
        {time}
      </div>
    </div>
  );
}

const styles = {
  /* SAME DASHBOARD OUTER SHELL */
  screen: {
    width: "100%",
    minHeight: "100vh",
    minHeight: "100dvh",
    background: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
    boxSizing: "border-box",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#FFFFFF",
  },

  /* SAME 390px PHONE */
  phone: {
    width: "100%",
    maxWidth: "430px",
    height: "100vh",
    height: "100dvh",
    minHeight: 0,
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  /* SAME DASHBOARD HEADER HEIGHT */
  header: {
    height: "64px",
    minHeight: "64px",
    padding: "0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(6, 49, 43, 0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    flexShrink: 0,
  },

  backButton: {
    width: 40,
    height: 40,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.08)",
    color: "#10E79D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brand: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: 1,
  },

  brandTop: {
    fontSize: "16px",
    fontWeight: 900,
    color: "#FFFFFF",
    letterSpacing: "-0.4px",
  },

  brandBottom: {
    marginTop: "4px",
    fontSize: "7.5px",
    fontWeight: 900,
    letterSpacing: "1.7px",
    color: "#10E79D",
  },

  aiHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(168, 85, 247, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* SAME SCROLL AREA */
  content: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    overflowX: "hidden",
    padding: "18px 15px 12px",
    boxSizing: "border-box",
    WebkitOverflowScrolling: "touch",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  robot: {
    width: 50,
    height: 50,
    borderRadius: 15,
    background: "#007050",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow:
      "0 8px 18px rgba(0,112,80,0.16)",
  },

  heroText: {
    minWidth: 0,
    flex: 1,
  },

  kicker: {
    color: C.purple,
    fontSize: "7.5px",
    fontWeight: 900,
    letterSpacing: "1px",
    marginBottom: 4,
  },

  title: {
    margin: 0,
    fontSize: "21px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: C.navy,
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: C.muted,
    fontSize: "9.5px",
    lineHeight: 1.45,
  },

  tabs: {
    display: "flex",
    gap: 4,
    padding: 4,
    borderRadius: 13,
    background: C.softMint,
    marginBottom: 12,
  },

  tab: {
    flex: 1,
    minWidth: 0,
    border: 0,
    background: "transparent",
    borderRadius: 9,
    padding: "9px 4px",
    color: C.muted,
    fontSize: "9px",
    fontWeight: 850,
    cursor: "pointer",
  },

  activeTab: {
    background: C.white,
    color: C.green,
    boxShadow:
      "0 2px 8px rgba(8,47,60,0.06)",
  },

  section: {
    borderRadius: 17,
    background: C.white,
    border: `1px solid ${C.border}`,
    padding: 14,
    boxSizing: "border-box",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 10,
  },

  sectionTitle: {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: C.navy,
  },

  sectionSubtitle: {
    margin: "4px 0 0",
    fontSize: "8.5px",
    lineHeight: 1.4,
    color: C.muted,
  },

  detectedBadge: {
    padding: "5px 7px",
    borderRadius: 8,
    background: "#F2EAFE",
    color: C.purple,
    fontSize: "7px",
    fontWeight: 900,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },

  weakCard: {
    display: "flex",
    gap: 10,
    padding: "14px 0",
    borderTop: `1px solid ${C.border}`,
  },

  areaIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    background: "#F8FAF9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },

  areaContent: {
    flex: 1,
    minWidth: 0,
  },

  areaTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
  },

  areaTitle: {
    minWidth: 0,
    fontSize: "11px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: C.navy,
  },

  priority: {
    padding: "4px 6px",
    borderRadius: 7,
    fontSize: "6.5px",
    fontWeight: 900,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  accuracyRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    color: C.muted,
    fontSize: "8px",
    fontWeight: 700,
  },

  barTrack: {
    width: "100%",
    height: 5,
    marginTop: 5,
    background: C.softMint,
    borderRadius: 20,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 20,
  },

  actionList: {
    marginTop: 8,
  },

  action: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 5,
    fontSize: "8.5px",
    lineHeight: 1.25,
    color: C.muted,
  },

  actionNumber: {
    width: 16,
    height: 16,
    borderRadius: 5,
    background: C.mint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "7px",
    fontWeight: 900,
    flexShrink: 0,
  },

  startNow: {
    marginTop: 9,
    border: 0,
    borderRadius: 9,
    padding: "7px 9px",
    background: C.mint,
    color: C.green,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: "8px",
    fontWeight: 900,
    cursor: "pointer",
  },

  planRow: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "12px 0",
  },

  planIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  planMiddle: {
    flex: 1,
    minWidth: 0,
  },

  planTitle: {
    fontSize: "10.5px",
    lineHeight: 1.2,
    fontWeight: 900,
    color: C.navy,
  },

  planText: {
    marginTop: 3,
    color: C.muted,
    fontSize: "8.5px",
    lineHeight: 1.35,
  },

  planTimeSmall: {
    color: C.green,
    fontSize: "8px",
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  planSummary: {
    marginTop: 11,
    padding: 12,
    borderRadius: 12,
    background: C.mint,
  },

  planSummaryTitle: {
    color: C.muted,
    fontSize: "7.5px",
    fontWeight: 800,
  },

  planTime: {
    marginTop: 2,
    color: C.green,
    fontSize: "21px",
    fontWeight: 900,
  },

  planHint: {
    marginTop: 3,
    color: C.muted,
    fontSize: "8.5px",
    lineHeight: 1.4,
  },

  resourceCard: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "11px 0",
    borderTop: `1px solid ${C.border}`,
  },

  resourceIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  resourceTextWrap: {
    flex: 1,
    minWidth: 0,
  },

  resourceTitle: {
    fontSize: "10.5px",
    fontWeight: 900,
    color: C.navy,
  },

  resourceText: {
    marginTop: 3,
    fontSize: "8.5px",
    lineHeight: 1.35,
    color: C.muted,
  },

  suggestionSection: {
    marginTop: 18,
  },

  suggestionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 8,
  },

  suggestionCard: {
    minWidth: 0,
    border: `1px solid ${C.border}`,
    background: C.white,
    borderRadius: 13,
    padding: 11,
    textAlign: "left",
    cursor: "pointer",
  },

  suggestionIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  suggestionTitle: {
    marginTop: 8,
    fontSize: "9.5px",
    lineHeight: 1.25,
    fontWeight: 900,
    color: C.navy,
  },

  suggestionText: {
    marginTop: 4,
    color: C.muted,
    fontSize: "8px",
    lineHeight: 1.4,
  },

  suggestionLink: {
    marginTop: 8,
    color: C.green,
    fontSize: "7.5px",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  chatCard: {
    marginTop: 16,
    borderRadius: 16,
    background: C.white,
    border: `1px solid ${C.border}`,
    padding: 13,
    boxShadow:
      "0 5px 16px rgba(8,47,60,0.04)",
  },

  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 9,
  },

  chatAvatar: {
    width: 37,
    height: 37,
    borderRadius: 11,
    background: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  chatTitle: {
    fontSize: "10.5px",
    fontWeight: 900,
    color: C.navy,
  },

  chatSubtitle: {
    marginTop: 3,
    color: C.muted,
    fontSize: "8px",
  },

  messages: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 7,
  },

  message: {
    maxWidth: "88%",
    padding: "8px 9px",
    borderRadius: 10,
    fontSize: "8.5px",
    lineHeight: 1.4,
  },

  userMessage: {
    alignSelf: "flex-end",
    background: C.green,
    color: C.white,
  },

  aiMessage: {
    alignSelf: "flex-start",
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#FFFFFF",
  },

  chatInputRow: {
    marginTop: 12,
    display: "flex",
    gap: 7,
  },

  input: {
    flex: 1,
    minWidth: 0,
    border: `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.06)",
    borderRadius: 10,
    padding: "10px 10px",
    outline: "none",
    color: "#FFFFFF",
    fontSize: "9px",
    boxSizing: "border-box",
  },

  sendButton: {
    width: 39,
    height: 39,
    borderRadius: 10,
    border: 0,
    background: "linear-gradient(135deg, #10E79D, #007050)",
    color: "#010F0E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  bottomSpace: {
    height: 10,
    flexShrink: 0,
  },

  /* SAME DASHBOARD BOTTOM NAV */
  bottomNav: {
    height: "68px",
    minHeight: "68px",
    borderTop: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(4, 25, 23, 0.94)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    display: "grid",
    gridTemplateColumns:
      "repeat(5, minmax(0, 1fr))",
    padding: "4px 3px 5px",
    boxSizing: "border-box",
    flexShrink: 0,
    zIndex: 10,
  },

  navButton: {
    minWidth: 0,
    border: 0,
    background: "transparent",
    color: "rgba(226, 232, 240, 0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    cursor: "pointer",
    fontSize: "8px",
    fontWeight: 750,
    padding: "3px 0",
  },

  navActive: {
    color: "#10E79D",
    fontWeight: 900,
  },

  navIcon: {
    width: 25,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};