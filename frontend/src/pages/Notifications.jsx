import React, { useMemo, useState } from "react";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
  softMint: "rgba(16, 231, 157, 0.12)",
  cardBg: "rgba(6, 35, 30, 0.72)",
  cardBgHover: "rgba(8, 45, 38, 0.85)",
  border: "rgba(255, 255, 255, 0.1)",
  borderHighlight: "rgba(16, 231, 157, 0.35)",
  muted: "rgba(226, 232, 240, 0.65)",
  textMain: "#FFFFFF",
  textSub: "rgba(226, 232, 240, 0.82)",
  blue: "#38BDF8",
  purple: "#A855F7",
  red: "#FF5E62",
  yellow: "#FBBF24",
};

const initialNotifications = [
  {
    id: 1,
    type: "test",
    title: "Mock Test is ready",
    text: "NEET UG Full Mock Test 05 is available. Test yourself under real exam conditions.",
    time: "10 min ago",
    unread: true,
    icon: "target",
    color: C.green,
    targetSection: "mock-tests",
  },
  {
    id: 2,
    type: "study",
    title: "Time to practice Physics",
    text: "You have weak performance in Current Electricity. A focused practice session is recommended.",
    time: "1 hour ago",
    unread: true,
    icon: "book",
    color: C.blue,
    targetSection: "practice",
  },
  {
    id: 3,
    type: "result",
    title: "Your test analysis is ready",
    text: "Your latest mock test performance and chapter-wise analysis are now available.",
    time: "3 hours ago",
    unread: true,
    icon: "chart",
    color: C.purple,
    targetSection: "analysis",
  },
  {
    id: 4,
    type: "study",
    title: "Daily study reminder",
    text: "Complete today's 2 hour 15 minute recommended study plan.",
    time: "Yesterday",
    unread: false,
    icon: "clock",
    color: C.yellow,
    targetSection: "ai-suggestions",
  },
  {
    id: 5,
    type: "test",
    title: "Previous Year Questions",
    text: "A new NEET PYQ practice set is available for you.",
    time: "Yesterday",
    unread: false,
    icon: "questions",
    color: C.green,
    targetSection: "practice",
  },
];

function Icon({ name, size = 20, stroke = "currentColor" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
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
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 16l4-5 4 3 6-7" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </>
    ),
    questions: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    arrow: (
      <>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

export default function Notifications({ onBack, onOpenSection }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") return notifications;
    if (activeFilter === "tests") {
      return notifications.filter(
        (item) => item.type === "test" || item.type === "result"
      );
    }
    return notifications.filter((item) => item.type === "study");
  }, [activeFilter, notifications]);

  const markAsRead = (id, targetSection) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
    if (targetSection && onOpenSection) {
      onOpenSection(targetSection);
    }
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, unread: false }))
    );
  };

  return (
    <div style={styles.root}>
      <div style={styles.phone}>
        {/* Sticky Header */}
        <header style={styles.header}>
          <button
            type="button"
            style={styles.backButton}
            onClick={onBack}
            aria-label="Go back"
          >
            <Icon name="back" size={20} stroke="#10E79D" />
          </button>

          <div style={styles.headerCenter}>
            <div style={styles.brand}>ILS RANKER</div>
            <div style={styles.tagline}>KNOW YOUR POTENTIAL</div>
          </div>

          <div style={styles.bellButton}>
            <Icon name="bell" size={19} stroke={C.green} />
            {unreadCount > 0 && (
              <span style={styles.notificationBadge}>{unreadCount}</span>
            )}
          </div>
        </header>

        {/* Scrollable Container */}
        <main style={styles.container}>
          {/* Top Title & Mark All Row */}
          <div style={styles.topRow}>
            <div>
              <div style={styles.kicker}>UPDATES</div>
              <h1 style={styles.title}>Notifications</h1>
              <p style={styles.subtitle}>
                Stay updated with your tests, results and study reminders.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                style={styles.markAllButton}
                onClick={markAllRead}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div style={styles.filterBar}>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              style={{
                ...styles.filterButton,
                ...(activeFilter === "all" ? styles.activeFilter : {}),
              }}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("tests")}
              style={{
                ...styles.filterButton,
                ...(activeFilter === "tests" ? styles.activeFilter : {}),
              }}
            >
              Tests & Results
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("study")}
              style={{
                ...styles.filterButton,
                ...(activeFilter === "study" ? styles.activeFilter : {}),
              }}
            >
              Study
            </button>
          </div>

          {/* Summary Card */}
          <section style={styles.summaryCard}>
            <div style={styles.summaryIcon}>
              <Icon name="bell" size={18} stroke={C.green} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={styles.summaryTitle}>
                {unreadCount === 0
                  ? "You're all caught up"
                  : `${unreadCount} unread notification${
                      unreadCount === 1 ? "" : "s"
                    }`}
              </div>
              <div style={styles.summaryText}>
                We'll keep you informed about important preparation updates.
              </div>
            </div>

            <div
              style={{
                ...styles.summaryStatus,
                background:
                  unreadCount === 0
                    ? "rgba(16, 231, 157, 0.15)"
                    : "rgba(251, 191, 36, 0.18)",
                color: unreadCount === 0 ? C.green : C.yellow,
                border:
                  unreadCount === 0
                    ? "1px solid rgba(16, 231, 157, 0.3)"
                    : "1px solid rgba(251, 191, 36, 0.3)",
              }}
            >
              {unreadCount === 0 ? "Clear" : "New"}
            </div>
          </section>

          {/* Activity Section Header */}
          <div style={styles.sectionHeading}>
            <span style={styles.sectionTitle}>Recent Activity</span>
            <span style={styles.countText}>
              {filteredNotifications.length} updates
            </span>
          </div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div style={styles.emptyCard}>
              <div style={styles.emptyIcon}>
                <Icon name="bell" size={26} stroke={C.muted} />
              </div>
              <div style={styles.emptyTitle}>No notifications here</div>
              <div style={styles.emptyText}>
                New updates will appear in this section.
              </div>
            </div>
          ) : (
            <div style={styles.notificationList}>
              {filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id, item.targetSection)}
                  style={{
                    ...styles.notificationCard,
                    ...(item.unread ? styles.unreadCard : styles.readCard),
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      markAsRead(item.id, item.targetSection);
                    }
                  }}
                >
                  <div
                    style={{
                      ...styles.notificationIcon,
                      background: `rgba(${
                        item.color === C.green
                          ? "16, 231, 157"
                          : item.color === C.blue
                          ? "56, 189, 248"
                          : item.color === C.purple
                          ? "168, 85, 247"
                          : "251, 191, 36"
                      }, 0.12)`,
                      borderColor: `rgba(${
                        item.color === C.green
                          ? "16, 231, 157"
                          : item.color === C.blue
                          ? "56, 189, 248"
                          : item.color === C.purple
                          ? "168, 85, 247"
                          : "251, 191, 36"
                      }, 0.28)`,
                    }}
                  >
                    <Icon name={item.icon} size={20} stroke={item.color} />
                  </div>

                  <div style={styles.notificationBody}>
                    <div style={styles.notificationHeader}>
                      <span style={styles.notificationTitle}>{item.title}</span>
                      {item.unread && <span style={styles.unreadDot} />}
                    </div>

                    <p style={styles.notificationText}>{item.text}</p>

                    <div style={styles.notificationFooter}>
                      <span>{item.time}</span>
                      {item.unread && (
                        <span style={styles.unreadBadge}>Unread</span>
                      )}
                    </div>
                  </div>

                  <div style={styles.notificationArrow}>
                    <Icon name="arrow" size={15} stroke={C.muted} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preferences Card */}
          <div
            style={styles.preferenceCard}
            onClick={() => onOpenSection && onOpenSection("settings")}
            role="button"
            tabIndex={0}
          >
            <div style={styles.preferenceIcon}>
              <Icon name="settings" size={18} stroke={C.green} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={styles.preferenceTitle}>Notification Preferences</div>
              <div style={styles.preferenceText}>
                Manage study reminders, test alerts and other notifications in
                Settings.
              </div>
            </div>

            <Icon name="arrow" size={16} stroke={C.green} />
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
    minHeight: "100vh",
    minHeight: "100dvh",
    background:
      "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
    boxSizing: "border-box",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#FFFFFF",
  },

  phone: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "100vh",
    minHeight: "100dvh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    background: "transparent",
  },

  header: {
    height: "64px",
    minHeight: "64px",
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(6, 49, 43, 0.88)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    position: "sticky",
    top: 0,
    zIndex: 20,
    flexShrink: 0,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    color: "#10E79D",
    flexShrink: 0,
    transition: "transform 0.15s ease, background 0.15s ease",
  },

  headerCenter: {
    flex: 1,
    minWidth: 0,
    marginLeft: 14,
  },

  brand: {
    fontSize: 16,
    fontWeight: 950,
    letterSpacing: 1.2,
    lineHeight: 1,
    color: "#FFFFFF",
  },

  tagline: {
    marginTop: 4,
    color: "rgba(226, 232, 240, 0.65)",
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: 0.8,
  },

  bellButton: {
    position: "relative",
    width: 38,
    height: 38,
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  notificationBadge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 17,
    height: 17,
    padding: "0 4px",
    borderRadius: 20,
    background: "#FF5E62",
    color: "#FFFFFF",
    fontSize: 8.5,
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1.5px solid #06312B",
  },

  container: {
    flex: 1,
    width: "100%",
    padding: "20px 18px 145px",
    boxSizing: "border-box",
    overflowY: "auto",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 12,
  },

  kicker: {
    fontSize: 11,
    letterSpacing: 1.2,
    color: C.green,
    fontWeight: 900,
    marginBottom: 5,
  },

  title: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: -0.6,
    color: "#FFFFFF",
  },

  subtitle: {
    margin: "8px 0 0",
    color: C.muted,
    fontSize: 13,
    lineHeight: 1.45,
  },

  markAllButton: {
    border: "1px solid rgba(16, 231, 157, 0.35)",
    background: "rgba(16, 231, 157, 0.12)",
    color: "#10E79D",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 11,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  filterBar: {
    marginTop: 18,
    padding: 4,
    display: "flex",
    gap: 6,
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },

  filterButton: {
    flex: 1,
    border: "none",
    background: "transparent",
    borderRadius: 10,
    padding: "8px 10px",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.15s ease",
  },

  activeFilter: {
    background: "rgba(16, 231, 157, 0.22)",
    color: "#10E79D",
    border: "1px solid rgba(16, 231, 157, 0.4)",
    fontWeight: 800,
  },

  summaryCard: {
    marginTop: 16,
    padding: "13px 15px",
    borderRadius: 16,
    background: "rgba(6, 35, 30, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: "rgba(16, 231, 157, 0.15)",
    border: "1px solid rgba(16, 231, 157, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  summaryTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  summaryText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 11,
    lineHeight: 1.4,
  },

  summaryStatus: {
    padding: "5px 9px",
    borderRadius: 8,
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 0.5,
    flexShrink: 0,
  },

  sectionHeading: {
    marginTop: 22,
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 900,
    color: "#FFFFFF",
  },

  countText: {
    color: C.muted,
    fontSize: 11,
    fontWeight: 700,
  },

  notificationList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  notificationCard: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 15px",
    borderRadius: 16,
    boxSizing: "border-box",
    cursor: "pointer",
    textAlign: "left",
    transition: "transform 0.15s ease, background 0.15s ease, border-color 0.15s ease",
  },

  unreadCard: {
    background:
      "linear-gradient(135deg, rgba(16, 231, 157, 0.12) 0%, rgba(6, 42, 36, 0.75) 100%)",
    border: "1px solid rgba(16, 231, 157, 0.35)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
  },

  readCard: {
    background: "rgba(6, 35, 30, 0.55)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },

  notificationIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  notificationBody: {
    flex: 1,
    minWidth: 0,
  },

  notificationHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  notificationTitle: {
    fontSize: 14,
    fontWeight: 800,
    color: "#FFFFFF",
    lineHeight: 1.3,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: C.green,
    boxShadow: "0 0 8px #10E79D",
    flexShrink: 0,
  },

  notificationText: {
    margin: "5px 0 0",
    color: "rgba(226, 232, 240, 0.82)",
    fontSize: 12,
    lineHeight: 1.48,
    wordBreak: "break-word",
  },

  notificationFooter: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "rgba(226, 232, 240, 0.5)",
    fontSize: 10.5,
    fontWeight: 700,
  },

  unreadBadge: {
    color: C.green,
    fontWeight: 900,
    fontSize: 10,
    background: "rgba(16, 231, 157, 0.15)",
    padding: "2px 7px",
    borderRadius: 6,
    border: "1px solid rgba(16, 231, 157, 0.3)",
  },

  notificationArrow: {
    width: 30,
    height: 30,
    borderRadius: 10,
    background: "rgba(255, 255, 255, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    alignSelf: "center",
  },

  emptyCard: {
    padding: "40px 20px",
    background: "rgba(6, 35, 30, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 18,
    textAlign: "center",
  },

  emptyIcon: {
    width: 54,
    height: 54,
    margin: "0 auto",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  emptyText: {
    marginTop: 5,
    color: C.muted,
    fontSize: 12,
  },

  preferenceCard: {
    marginTop: 22,
    padding: "14px 16px",
    borderRadius: 16,
    background: "rgba(16, 231, 157, 0.08)",
    border: "1px solid rgba(16, 231, 157, 0.25)",
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
  },

  preferenceIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: "rgba(16, 231, 157, 0.16)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  preferenceTitle: {
    fontSize: 13,
    fontWeight: 800,
    color: "#FFFFFF",
  },

  preferenceText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 11,
    lineHeight: 1.4,
  },
};