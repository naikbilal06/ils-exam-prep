import React, { useState } from "react";

const C = {
  green: "#007050",
  navy: "#082F3C",
  mint: "#F4FBF7",
  softMint: "#EAF5F1",
  white: "#FFFFFF",
  muted: "#68777B",
  border: "#E4EFEB",
  purple: "#7652C8",
  red: "#D94B55",
  blue: "#3679C9",
};

function Icon({ name, size = 20, stroke = C.navy }) {
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
    spark: (
      <>
        <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
        <path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4.2L19 7" />,
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
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    trend: (
      <>
        <path d="M4 17l6-6 4 4 6-7" />
        <path d="M16 8h4v4" />
      </>
    ),
    chat: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.7-.8L4 20l1.7-3.5A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
      </>
    ),
    send: (
      <>
        <path d="M21 3L10 14" />
        <path d="M21 3l-7 18-4-7-7-4 18-7Z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
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

export default function AICounsellor({ onBack }) {
  const [activeTab, setActiveTab] = useState("weak");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button
            onClick={onBack}
            style={styles.backButton}
            aria-label="Back"
          >
            <Icon name="back" size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <div style={styles.brand}>ILS RANKER</div>
            <div style={styles.tagline}>KNOW YOUR POTENTIAL</div>
          </div>

          <div style={styles.aiHeaderIcon}>
            <Icon
              name="spark"
              size={20}
              stroke={C.purple}
            />
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.robot}>
            <Icon
              name="spark"
              size={28}
              stroke="#FFFFFF"
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={styles.kicker}>AI-POWERED GUIDANCE</div>

            <h1 style={styles.title}>
              Personalised Study Plan
            </h1>

            <p style={styles.subtitle}>
              Smart recommendations based on your test
              performance and preparation level.
            </p>
          </div>
        </div>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "weak" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("weak")}
          >
            Weak Areas
          </button>

          <button
            style={{
              ...styles.tab,
              ...(activeTab === "plan" ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab("plan")}
          >
            Practice Plan
          </button>

          <button
            style={{
              ...styles.tab,
              ...(activeTab === "resources"
                ? styles.activeTab
                : {}),
            }}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
        </div>

        {activeTab === "weak" && (
          <>
            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>
                    Your Weak Areas
                  </h2>

                  <p style={styles.sectionSubtitle}>
                    Priority topics detected from your performance
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

                  <div style={{ flex: 1 }}>
                    <div style={styles.areaTop}>
                      <div style={styles.areaTitle}>
                        {area.title}
                      </div>

                      <span
                        style={{
                          ...styles.priority,
                          color:
                            area.priority === "High Priority"
                              ? C.red
                              : C.yellow,
                          background:
                            area.priority === "High Priority"
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
                      {area.actions.map((action, index) => (
                        <div
                          key={action}
                          style={styles.action}
                        >
                          <span style={styles.actionNumber}>
                            {index + 1}
                          </span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      style={styles.startNow}
                      onClick={() => {}}
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
          </>
        )}

        {activeTab === "plan" && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Today's Practice Plan
                </h2>

                <p style={styles.sectionSubtitle}>
                  A focused plan to improve your weak areas
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

              <div style={styles.planTime}>2h 15m</div>

              <div style={styles.planHint}>
                Consistent focused practice will improve your
                performance faster.
              </div>
            </div>
          </section>
        )}

        {activeTab === "resources" && (
          <section style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>
                  Recommended Resources
                </h2>

                <p style={styles.sectionSubtitle}>
                  Resources selected for your current needs
                </p>
              </div>
            </div>

            {[
              {
                title: "NCERT Revision",
                text: "Revise important concepts and definitions.",
              },
              {
                title: "Previous Year Questions",
                text: "Practice exam-relevant questions.",
              },
              {
                title: "Formula Revision",
                text: "Quick revision for important Physics formulas.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={styles.resourceCard}
              >
                <div style={styles.resourceIcon}>
                  <Icon
                    name="book"
                    size={19}
                    stroke={C.green}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={styles.resourceTitle}>
                    {item.title}
                  </div>

                  <div style={styles.resourceText}>
                    {item.text}
                  </div>
                </div>

                <Icon
                  name="arrow"
                  size={17}
                  stroke={C.green}
                />
              </div>
            ))}
          </section>
        )}

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
              size={19}
              stroke={C.purple}
            />
          </div>

          <div style={styles.suggestionGrid}>
            {suggestions.map((item) => (
              <button
                key={item.title}
                style={styles.suggestionCard}
                onClick={() => {}}
              >
                <div style={styles.suggestionIcon}>
                  <Icon
                    name={item.icon}
                    size={19}
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
                    size={14}
                    stroke={C.green}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={styles.chatCard}>
          <div style={styles.chatHeader}>
            <div style={styles.chatAvatar}>
              <Icon
                name="spark"
                size={19}
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
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask anything about your preparation..."
              style={styles.input}
            />

            <button
              style={styles.sendButton}
              onClick={sendMessage}
              aria-label="Send"
            >
              <Icon
                name="send"
                size={18}
                stroke="#FFFFFF"
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function PlanRow({ time, title, text, icon, last }) {
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
          size={18}
          stroke={C.green}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div style={styles.planTitle}>{title}</div>

        <div style={styles.planText}>{text}</div>
      </div>

      <div style={styles.planTimeSmall}>{time}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: C.mint,
    color: C.navy,
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  header: {
    background: C.white,
    borderBottom: `1px solid ${C.border}`,
    position: "sticky",
    top: 0,
    zIndex: 20,
  },

  headerInner: {
    maxWidth: 920,
    margin: "0 auto",
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
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
  },

  brand: {
    fontSize: 17,
    fontWeight: 900,
    letterSpacing: 1,
    lineHeight: 1,
  },

  tagline: {
    marginTop: 5,
    fontSize: 9,
    color: C.muted,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  aiHeaderIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: "#F1EBFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: 920,
    margin: "0 auto",
    padding: "28px 20px 44px",
    boxSizing: "border-box",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  robot: {
    width: 58,
    height: 58,
    borderRadius: 18,
    background: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 10px 22px rgba(0,112,80,0.17)",
  },

  kicker: {
    color: C.purple,
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1,
    marginBottom: 5,
  },

  title: {
    margin: 0,
    fontSize: 27,
    lineHeight: 1.2,
    fontWeight: 900,
    letterSpacing: -0.6,
  },

  subtitle: {
    margin: "7px 0 0",
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 1.5,
    maxWidth: 650,
  },

  tabs: {
    display: "flex",
    gap: 4,
    padding: 4,
    marginTop: 22,
    borderRadius: 13,
    background: C.softMint,
  },

  tab: {
    flex: 1,
    border: "none",
    background: "transparent",
    borderRadius: 9,
    padding: "10px 8px",
    color: C.muted,
    fontSize: 11,
    fontWeight: 800,
    cursor: "pointer",
  },

  activeTab: {
    background: C.white,
    color: C.green,
    boxShadow: "0 2px 8px rgba(8,47,60,0.06)",
  },

  section: {
    marginTop: 13,
    padding: 17,
    borderRadius: 19,
    background: C.white,
    border: `1px solid ${C.border}`,
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },

  sectionTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 900,
  },

  sectionSubtitle: {
    margin: "4px 0 0",
    fontSize: 10.5,
    color: C.muted,
  },

  detectedBadge: {
    padding: "6px 8px",
    borderRadius: 8,
    background: "#F1EBFF",
    color: C.purple,
    fontSize: 8.5,
    fontWeight: 900,
    textTransform: "uppercase",
  },

  weakCard: {
    display: "flex",
    gap: 12,
    padding: "16px 0",
    borderTop: `1px solid ${C.border}`,
  },

  areaIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "#F8FAF9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },

  areaTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  areaTitle: {
    fontSize: 13,
    fontWeight: 900,
  },

  priority: {
    fontSize: 8,
    fontWeight: 900,
    padding: "5px 7px",
    borderRadius: 7,
    whiteSpace: "nowrap",
  },

  accuracyRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 7,
    color: C.muted,
    fontSize: 9.5,
    fontWeight: 700,
  },

  barTrack: {
    height: 6,
    background: C.softMint,
    borderRadius: 20,
    marginTop: 6,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    borderRadius: 20,
  },

  actionList: {
    marginTop: 10,
  },

  action: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    marginTop: 6,
    fontSize: 10.5,
    color: C.muted,
  },

  actionNumber: {
    width: 17,
    height: 17,
    borderRadius: 6,
    background: C.mint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8,
    fontWeight: 900,
  },

  startNow: {
    marginTop: 11,
    border: "none",
    borderRadius: 9,
    padding: "8px 10px",
    background: C.mint,
    color: C.green,
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: 10,
    fontWeight: 900,
    cursor: "pointer",
  },

  planRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 0",
  },

  planIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  planTitle: {
    fontSize: 12.5,
    fontWeight: 850,
  },

  planText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 10.5,
  },

  planTimeSmall: {
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  planSummary: {
    marginTop: 14,
    padding: 15,
    borderRadius: 14,
    background: C.mint,
  },

  planSummaryTitle: {
    color: C.muted,
    fontSize: 9,
    fontWeight: 800,
  },

  planTime: {
    marginTop: 3,
    color: C.green,
    fontSize: 24,
    fontWeight: 900,
  },

  planHint: {
    marginTop: 4,
    color: C.muted,
    fontSize: 10.5,
    lineHeight: 1.45,
  },

  resourceCard: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "13px 0",
    borderTop: `1px solid ${C.border}`,
  },

  resourceIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  resourceTitle: {
    fontSize: 12.5,
    fontWeight: 850,
  },

  resourceText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 10.5,
  },

  suggestionSection: {
    marginTop: 22,
  },

  suggestionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 10,
  },

  suggestionCard: {
    border: `1px solid ${C.border}`,
    background: C.white,
    borderRadius: 16,
    padding: 14,
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(8,47,60,0.035)",
  },

  suggestionIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  suggestionTitle: {
    marginTop: 11,
    fontSize: 12,
    fontWeight: 900,
  },

  suggestionText: {
    marginTop: 5,
    color: C.muted,
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  suggestionLink: {
    marginTop: 12,
    color: C.green,
    fontSize: 9.5,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },

  chatCard: {
    marginTop: 20,
    borderRadius: 20,
    background: C.white,
    border: `1px solid ${C.border}`,
    padding: 17,
    boxShadow: "0 7px 20px rgba(8,47,60,0.045)",
  },

  chatHeader: {
    display: "flex",
    alignItems: "center",
    gap: 11,
  },

  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  chatTitle: {
    fontSize: 13,
    fontWeight: 900,
  },

  chatSubtitle: {
    marginTop: 3,
    color: C.muted,
    fontSize: 10,
  },

  messages: {
    marginTop: 15,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  message: {
    maxWidth: "88%",
    padding: "9px 11px",
    borderRadius: 11,
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  userMessage: {
    alignSelf: "flex-end",
    background: C.green,
    color: C.white,
  },

  aiMessage: {
    alignSelf: "flex-start",
    background: C.mint,
    color: C.navy,
  },

  chatInputRow: {
    marginTop: 15,
    display: "flex",
    gap: 8,
  },

  input: {
    flex: 1,
    minWidth: 0,
    border: `1px solid ${C.border}`,
    background: "#FBFCFC",
    borderRadius: 12,
    padding: "12px 13px",
    outline: "none",
    color: C.navy,
    fontSize: 11,
  },

  sendButton: {
    width: 43,
    height: 43,
    borderRadius: 12,
    border: "none",
    background: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
};