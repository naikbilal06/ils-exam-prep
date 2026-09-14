import React from "react";

const C = {
  green: "#007050",
  navy: "#082F3C",
  mint: "#F4FBF7",
  softMint: "#EAF5F1",
  white: "#FFFFFF",
  muted: "#68777B",
  border: "#E4EFEB",
  red: "#D94B55",
};

function Icon({ name, size = 19, stroke = C.navy }) {
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
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-7h6v7" />
      </>
    ),

    analysis: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l3-4 3 2 5-6" />
      </>
    ),

    practice: (
      <>
        <path d="M5 4h14a1 1 0 0 1 1 1v14H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M7 8h9M7 12h9M7 16h5" />
      </>
    ),

    tests: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h5M8 16h3" />
      </>
    ),

    rank: (
      <>
        <path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" />
        <path d="M8 6H4v2a4 4 0 0 0 4 4" />
        <path d="M16 6h4v2a4 4 0 0 1-4 4" />
        <path d="M12 12v5" />
        <path d="M8 20h8" />
      </>
    ),

    college: (
      <>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M6 11v5M9 13v5M15 13v5M18 11v5" />
        <path d="M4 20h16" />
      </>
    ),

    ai: (
      <>
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
        <path d="M19 16l.6 2.1L22 19l-2.4.9L19 22l-.6-2.1L16 19l2.4-.9L19 16Z" />
      </>
    ),

    goal: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.5" fill={stroke} />
      </>
    ),

    history: (
      <>
        <path d="M4 12a8 8 0 1 0 3-6.2" />
        <path d="M4 5v5h5" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),

    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    ),

    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V20h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L7.3 8.6 9 6.9l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.8 1Z" />
      </>
    ),

    logout: (
      <>
        <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
        <path d="M14 8l4 4-4 4" />
        <path d="M9 12h9" />
      </>
    ),

    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const mainItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "home",
  },
  {
    id: "practice",
    label: "Practice",
    icon: "practice",
  },
  {
    id: "mock-tests",
    label: "Mock Tests",
    icon: "tests",
  },
  {
    id: "analysis",
    label: "Performance Analysis",
    icon: "analysis",
  },
];

const predictionItems = [
  {
    id: "rank-predictor",
    label: "Rank Predictor",
    icon: "rank",
  },
  {
    id: "college-prediction",
    label: "College Predictor",
    icon: "college",
  },
  {
    id: "goal-tracker",
    label: "Goal Tracker",
    icon: "goal",
  },
];

const supportItems = [
  {
    id: "ai-counsellor",
    label: "AI Counsellor",
    icon: "ai",
  },
  {
    id: "history",
    label: "Test History",
    icon: "history",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "bell",
  },
];

export default function SideMenu({
  open,
  activeSection,
  profile = {},
  onClose,
  onNavigate,
  onLogout,
}) {
  if (!open) {
    return null;
  }

  const fullName =
    profile?.name ||
    profile?.fullName ||
    "Student";

  const mobile =
    profile?.mobile ||
    "Mobile number unavailable";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "S";

  const navigate = (section) => {
    onNavigate(section);
    onClose();
  };

  const renderItem = (item) => {
    const active =
      activeSection === item.id;

    return (
      <button
        key={item.id}
        onClick={() => navigate(item.id)}
        style={{
          ...styles.menuItem,
          ...(active
            ? styles.menuItemActive
            : {}),
        }}
      >
        <div
          style={{
            ...styles.menuIcon,
            ...(active
              ? styles.menuIconActive
              : {}),
          }}
        >
          <Icon
            name={item.icon}
            size={18}
            stroke={
              active
                ? C.green
                : C.muted
            }
          />
        </div>

        <span
          style={{
            ...styles.menuLabel,
            ...(active
              ? styles.menuLabelActive
              : {}),
          }}
        >
          {item.label}
        </span>

        {active && (
          <span style={styles.activeIndicator} />
        )}
      </button>
    );
  };

  return (
    <>
      <div
        style={styles.overlay}
        onClick={onClose}
      />

      <aside style={styles.drawer}>
        <div style={styles.drawerHeader}>
          <div>
            <div style={styles.brand}>
              ILS RANKER
            </div>

            <div style={styles.tagline}>
              KNOW YOUR POTENTIAL
            </div>
          </div>

          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            <Icon
              name="close"
              size={18}
            />
          </button>
        </div>

        <button
          style={styles.profileCard}
          onClick={() => navigate("profile")}
        >
          <div style={styles.avatar}>
            {initials}
          </div>

          <div style={styles.profileInfo}>
            <div style={styles.profileName}>
              {fullName}
            </div>

            <div style={styles.profileMobile}>
              {mobile}
            </div>

            <div style={styles.profileStatus}>
              <span style={styles.statusDot} />
              Active Learner
            </div>
          </div>

          <span style={styles.profileArrow}>
            ›
          </span>
        </button>

        <nav style={styles.navigation}>
          <div style={styles.groupTitle}>
            MAIN
          </div>

          {mainItems.map(renderItem)}

          <div style={styles.groupTitle}>
            PREDICT & PLAN
          </div>

          {predictionItems.map(renderItem)}

          <div style={styles.groupTitle}>
            MORE
          </div>

          {supportItems.map(renderItem)}
        </nav>

        <div style={styles.bottomArea}>
          <button
            onClick={() =>
              navigate("settings")
            }
            style={{
              ...styles.bottomItem,
              ...(activeSection ===
              "settings"
                ? styles.bottomItemActive
                : {}),
            }}
          >
            <div style={styles.bottomIcon}>
              <Icon
                name="settings"
                size={18}
                stroke={
                  activeSection ===
                  "settings"
                    ? C.green
                    : C.muted
                }
              />
            </div>

            <span>Settings</span>
          </button>

          <button
            onClick={onLogout}
            style={styles.logout}
          >
            <div style={styles.logoutIcon}>
              <Icon
                name="logout"
                size={18}
                stroke={C.red}
              />
            </div>

            <span>Log Out</span>
          </button>

          <div style={styles.version}>
            ILS Ranker • Version 1.0.0
          </div>
        </div>
      </aside>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(8,47,60,0.28)",
    zIndex: 998,
    backdropFilter: "blur(2px)",
  },

  drawer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "min(350px, 88vw)",
    height: "100vh",
    background: C.white,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "14px 0 40px rgba(8,47,60,0.14)",
    overflowY: "auto",
  },

  drawerHeader: {
    padding: "19px 17px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${C.border}`,
  },

  brand: {
    fontSize: 18,
    fontWeight: 900,
    letterSpacing: 1,
    color: C.navy,
  },

  tagline: {
    marginTop: 5,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  closeButton: {
    width: 37,
    height: 37,
    borderRadius: 11,
    border: `1px solid ${C.border}`,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  profileCard: {
    width: "calc(100% - 24px)",
    margin: "12px",
    padding: 13,
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    gap: 10,
    textAlign: "left",
    cursor: "pointer",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 14,
    background: C.green,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 900,
    flexShrink: 0,
  },

  profileInfo: {
    flex: 1,
    minWidth: 0,
  },

  profileName: {
    fontSize: 12.5,
    fontWeight: 900,
    color: C.navy,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  profileMobile: {
    marginTop: 3,
    color: C.muted,
    fontSize: 9,
  },

  profileStatus: {
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: C.green,
    fontSize: 8.5,
    fontWeight: 800,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: C.green,
  },

  profileArrow: {
    color: C.green,
    fontSize: 22,
    fontWeight: 500,
  },

  navigation: {
    padding: "0 10px",
    flex: 1,
    overflowY: "auto",
  },

  groupTitle: {
    margin: "14px 8px 6px",
    color: C.muted,
    fontSize: 8,
    letterSpacing: 1,
    fontWeight: 900,
  },

  menuItem: {
    position: "relative",
    width: "100%",
    minHeight: 45,
    border: "none",
    borderRadius: 12,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 11px",
    marginBottom: 3,
    textAlign: "left",
    color: C.muted,
    cursor: "pointer",
  },

  menuItemActive: {
    background: C.mint,
  },

  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#F7F9F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  menuIconActive: {
    background: C.white,
  },

  menuLabel: {
    fontSize: 11.5,
    fontWeight: 750,
  },

  menuLabelActive: {
    color: C.green,
    fontWeight: 900,
  },

  activeIndicator: {
    marginLeft: "auto",
    width: 4,
    height: 22,
    borderRadius: 5,
    background: C.green,
  },

  bottomArea: {
    padding: "10px 10px 16px",
    borderTop: `1px solid ${C.border}`,
    background: C.white,
  },

  bottomItem: {
    width: "100%",
    minHeight: 43,
    border: "none",
    borderRadius: 11,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 11px",
    color: C.muted,
    fontSize: 11.5,
    fontWeight: 750,
    cursor: "pointer",
  },

  bottomItemActive: {
    background: C.mint,
    color: C.green,
  },

  bottomIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#F7F9F8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  logout: {
    width: "100%",
    minHeight: 43,
    marginTop: 3,
    border: `1px solid #F1D9DC`,
    borderRadius: 11,
    background: "#FFF8F9",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 11px",
    color: C.red,
    fontSize: 11.5,
    fontWeight: 800,
    cursor: "pointer",
  },

  logoutIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  version: {
    marginTop: 11,
    textAlign: "center",
    color: C.muted,
    fontSize: 8,
    fontWeight: 650,
  },
};