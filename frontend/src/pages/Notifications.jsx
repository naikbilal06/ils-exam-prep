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
  red: "#D94B55",
  yellow: "#C78A13",
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
  },
];

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
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l3-4 3 2 5-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    questions: (
      <>
        <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4.2L19 7" />,
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L7.3 8.6 9 6.9l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.8 1Z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Notifications({ onBack }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length;

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications;
    }

    if (activeFilter === "tests") {
      return notifications.filter(
        (item) => item.type === "test" || item.type === "result"
      );
    }

    return notifications.filter(
      (item) => item.type === "study"
    );
  }, [activeFilter, notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, unread: false }
          : item
      )
    );
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <button
            style={styles.backButton}
            onClick={onBack}
          >
            <Icon name="back" size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <div style={styles.brand}>ILS RANKER</div>
            <div style={styles.tagline}>
              KNOW YOUR POTENTIAL
            </div>
          </div>

          <div style={styles.bellButton}>
            <Icon
              name="bell"
              size={18}
              stroke={C.green}
            />

            {unreadCount > 0 && (
              <span style={styles.notificationBadge}>
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.topRow}>
          <div>
            <div style={styles.kicker}>UPDATES</div>

            <h1 style={styles.title}>Notifications</h1>

            <p style={styles.subtitle}>
              Stay updated with your tests, results and study
              reminders.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              style={styles.markAllButton}
              onClick={markAllRead}
            >
              Mark all read
            </button>
          )}
        </div>

        <div style={styles.filterBar}>
          <FilterButton
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          >
            All
          </FilterButton>

          <FilterButton
            active={activeFilter === "tests"}
            onClick={() => setActiveFilter("tests")}
          >
            Tests & Results
          </FilterButton>

          <FilterButton
            active={activeFilter === "study"}
            onClick={() => setActiveFilter("study")}
          >
            Study
          </FilterButton>
        </div>

        <section style={styles.summaryCard}>
          <div style={styles.summaryIcon}>
            <Icon
              name="bell"
              size={19}
              stroke={C.green}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={styles.summaryTitle}>
              {unreadCount === 0
                ? "You're all caught up"
                : `${unreadCount} unread notification${
                    unreadCount === 1 ? "" : "s"
                  }`}
            </div>

            <div style={styles.summaryText}>
              We'll keep you informed about important
              preparation updates.
            </div>
          </div>

          <div
            style={{
              ...styles.summaryStatus,
              background:
                unreadCount === 0
                  ? C.mint
                  : "#FFF8E8",
              color:
                unreadCount === 0
                  ? C.green
                  : C.yellow,
            }}
          >
            {unreadCount === 0 ? "Clear" : "New"}
          </div>
        </section>

        <div style={styles.sectionHeading}>
          <div style={styles.sectionTitle}>
            Recent Activity
          </div>

          <div style={styles.countText}>
            {filteredNotifications.length} updates
          </div>
        </div>

        {filteredNotifications.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>
              <Icon
                name="bell"
                size={25}
                stroke={C.muted}
              />
            </div>

            <div style={styles.emptyTitle}>
              No notifications here
            </div>

            <div style={styles.emptyText}>
              New updates will appear in this section.
            </div>
          </div>
        ) : (
          <div style={styles.notificationList}>
            {filteredNotifications.map((item) => (
              <button
                key={item.id}
                onClick={() => markAsRead(item.id)}
                style={{
                  ...styles.notificationCard,
                  ...(item.unread
                    ? styles.unreadCard
                    : {}),
                }}
              >
                <div
                  style={{
                    ...styles.notificationIcon,
                    color: item.color,
                  }}
                >
                  <Icon
                    name={item.icon}
                    size={19}
                    stroke={item.color}
                  />
                </div>

                <div style={styles.notificationBody}>
                  <div style={styles.notificationHeader}>
                    <div style={styles.notificationTitle}>
                      {item.title}
                    </div>

                    {item.unread && (
                      <span style={styles.unreadDot} />
                    )}
                  </div>

                  <div style={styles.notificationText}>
                    {item.text}
                  </div>

                  <div style={styles.notificationFooter}>
                    <span>{item.time}</span>

                    {item.unread && (
                      <span style={styles.unreadLabel}>
                        Unread
                      </span>
                    )}
                  </div>
                </div>

                <div style={styles.notificationArrow}>
                  <Icon
                    name="arrow"
                    size={15}
                    stroke={C.muted}
                  />
                </div>
              </button>
            ))}
          </div>
        )}

        <section style={styles.preferenceCard}>
          <div style={styles.preferenceIcon}>
            <Icon
              name="settings"
              size={19}
              stroke={C.green}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div style={styles.preferenceTitle}>
              Notification Preferences
            </div>

            <div style={styles.preferenceText}>
              Manage study reminders, test alerts and other
              notifications from Settings.
            </div>
          </div>

          <Icon
            name="arrow"
            size={16}
            stroke={C.green}
          />
        </section>
      </main>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.filterButton,
        ...(active ? styles.activeFilter : {}),
      }}
    >
      {children}
    </button>
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
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: C.white,
    borderBottom: `1px solid ${C.border}`,
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
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  bellButton: {
    position: "relative",
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationBadge: {
    position: "absolute",
    top: -3,
    right: -3,
    minWidth: 17,
    height: 17,
    padding: "0 4px",
    borderRadius: 20,
    background: C.red,
    color: C.white,
    fontSize: 8,
    fontWeight: 900,
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

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 15,
  },

  kicker: {
    fontSize: 10,
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
    maxWidth: 650,
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 1.55,
  },

  markAllButton: {
    border: `1px solid ${C.green}`,
    background: C.white,
    color: C.green,
    borderRadius: 10,
    padding: "8px 10px",
    fontSize: 9.5,
    fontWeight: 850,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  filterBar: {
    marginTop: 20,
    padding: 4,
    display: "flex",
    gap: 4,
    borderRadius: 13,
    background: C.softMint,
    overflowX: "auto",
  },

  filterButton: {
    border: "none",
    background: "transparent",
    borderRadius: 9,
    padding: "10px 12px",
    color: C.muted,
    fontSize: 10.5,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  activeFilter: {
    background: C.white,
    color: C.green,
    boxShadow: "0 2px 8px rgba(8,47,60,0.05)",
  },

  summaryCard: {
    marginTop: 12,
    padding: 15,
    borderRadius: 17,
    background: C.white,
    border: `1px solid ${C.border}`,
    display: "flex",
    alignItems: "center",
    gap: 11,
  },

  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  summaryTitle: {
    fontSize: 12,
    fontWeight: 900,
  },

  summaryText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.45,
  },

  summaryStatus: {
    padding: "6px 8px",
    borderRadius: 7,
    fontSize: 8,
    fontWeight: 900,
  },

  sectionHeading: {
    marginTop: 23,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 900,
  },

  countText: {
    color: C.muted,
    fontSize: 9,
    fontWeight: 700,
  },

  notificationList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  notificationCard: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: 11,
    padding: 14,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    background: C.white,
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(8,47,60,0.03)",
  },

  unreadCard: {
    borderColor: "#CFE4DA",
    background: "#FCFEFD",
  },

  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    background: C.mint,
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
    gap: 7,
  },

  notificationTitle: {
    fontSize: 12,
    fontWeight: 900,
  },

  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: C.green,
    flexShrink: 0,
  },

  notificationText: {
    marginTop: 5,
    color: C.muted,
    fontSize: 10,
    lineHeight: 1.5,
  },

  notificationFooter: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  unreadLabel: {
    color: C.green,
    fontWeight: 900,
  },

  notificationArrow: {
    width: 27,
    height: 27,
    borderRadius: 8,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  emptyCard: {
    padding: "38px 20px",
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 18,
    textAlign: "center",
  },

  emptyIcon: {
    width: 52,
    height: 52,
    margin: "0 auto",
    borderRadius: 15,
    background: "#F7F9F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: 900,
  },

  emptyText: {
    marginTop: 5,
    color: C.muted,
    fontSize: 10,
  },

  preferenceCard: {
    marginTop: 18,
    padding: 15,
    borderRadius: 17,
    background: C.softMint,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  preferenceIcon: {
    width: 37,
    height: 37,
    borderRadius: 10,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  preferenceTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  preferenceText: {
    marginTop: 3,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.45,
  },
};