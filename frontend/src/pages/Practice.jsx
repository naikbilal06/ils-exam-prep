import React, { useState } from "react";

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
    moon: (
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6l7-3Z" />
        <path d="M8.5 12l2.2 2.2 4.8-5" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.4 2.4 0 1 1 4.2 1.6c-.9.9-2 1.3-2 2.7" />
        <path d="M12 16h.01" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4.2L19 7" />,
    logout: (
      <>
        <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
        <path d="M14 8l4 4-4 4" />
        <path d="M9 12h9" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Settings({ onBack, onLogout }) {
  const [notifications, setNotifications] = useState(true);
  const [studyReminder, setStudyReminder] = useState(true);
  const [resultAlerts, setResultAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

          <div style={styles.headerTitle}>Settings</div>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.kicker}>APP PREFERENCES</div>

        <h1 style={styles.title}>Settings</h1>

        <p style={styles.subtitle}>
          Personalise your ILS Ranker experience and manage your
          study preferences.
        </p>

        <SectionTitle text="Notifications" />

        <section style={styles.card}>
          <SettingRow
            icon="bell"
            title="Push Notifications"
            subtitle="Receive important app updates and reminders"
            value={notifications}
            onChange={setNotifications}
          />

          <SettingRow
            icon="bell"
            title="Study Reminders"
            subtitle="Get reminders to stay consistent with preparation"
            value={studyReminder}
            onChange={setStudyReminder}
          />

          <SettingRow
            icon="bell"
            title="Test & Result Alerts"
            subtitle="Get notified when tests and results are ready"
            value={resultAlerts}
            onChange={setResultAlerts}
            last
          />
        </section>

        <SectionTitle text="Study Preferences" />

        <section style={styles.card}>
          <ActionRow
            icon="moon"
            title="Daily Study Goal"
            subtitle="2 hours 15 minutes"
            right="Edit"
          />

          <ActionRow
            icon="info"
            title="Preferred Difficulty"
            subtitle="Mixed"
            right="Edit"
          />

          <ActionRow
            icon="help"
            title="Question Preferences"
            subtitle="Practice + Previous Year Questions"
            right="Edit"
            last
          />
        </section>

        <SectionTitle text="Appearance" />

        <section style={styles.card}>
          <SettingRow
            icon="moon"
            title="Dark Mode"
            subtitle="Use a darker interface for comfortable viewing"
            value={darkMode}
            onChange={setDarkMode}
            last
          />
        </section>

        <SectionTitle text="Privacy & Security" />

        <section style={styles.card}>
          <ActionRow
            icon="lock"
            title="Password & Security"
            subtitle="Manage your account security"
          />

          <ActionRow
            icon="shield"
            title="Privacy Settings"
            subtitle="Control your data and privacy preferences"
          />

          <ActionRow
            icon="info"
            title="Data & Permissions"
            subtitle="Review app permissions"
            last
          />
        </section>

        <SectionTitle text="Help & Information" />

        <section style={styles.card}>
          <ActionRow
            icon="help"
            title="Help Center"
            subtitle="Find answers and guides"
          />

          <ActionRow
            icon="info"
            title="About ILS Ranker"
            subtitle="Version 1.0.0"
          />

          <ActionRow
            icon="shield"
            title="Terms & Privacy Policy"
            subtitle="Read our policies"
            last
          />
        </section>

        <button
          style={styles.logoutButton}
          onClick={onLogout}
        >
          <Icon
            name="logout"
            size={18}
            stroke={C.red}
          />
          Log Out
        </button>

        <div style={styles.footer}>
          ILS RANKER
          <div style={styles.footerSub}>
            Better Preparation • Brighter Future
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ text }) {
  return <div style={styles.sectionTitle}>{text}</div>;
}

function SettingRow({
  icon,
  title,
  subtitle,
  value,
  onChange,
  last,
}) {
  return (
    <div
      style={{
        ...styles.row,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
    >
      <div style={styles.iconBox}>
        <Icon
          name={icon}
          size={18}
          stroke={C.green}
        />
      </div>

      <div style={styles.rowContent}>
        <div style={styles.rowTitle}>{title}</div>
        <div style={styles.rowSubtitle}>{subtitle}</div>
      </div>

      <button
        onClick={() => onChange(!value)}
        style={{
          ...styles.switch,
          background: value ? C.green : "#D8E2DE",
        }}
        aria-label={`Toggle ${title}`}
      >
        <span
          style={{
            ...styles.switchKnob,
            transform: value
              ? "translateX(19px)"
              : "translateX(0)",
          }}
        />
      </button>
    </div>
  );
}

function ActionRow({
  icon,
  title,
  subtitle,
  right,
  last,
}) {
  return (
    <button
      onClick={() => {}}
      style={{
        ...styles.row,
        ...styles.actionRow,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
    >
      <div style={styles.iconBox}>
        <Icon
          name={icon}
          size={18}
          stroke={C.green}
        />
      </div>

      <div style={styles.rowContent}>
        <div style={styles.rowTitle}>{title}</div>
        <div style={styles.rowSubtitle}>{subtitle}</div>
      </div>

      {right ? (
        <span style={styles.editText}>{right}</span>
      ) : (
        <Icon
          name="arrow"
          size={16}
          stroke={C.muted}
        />
      )}
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

  headerTitle: {
    color: C.green,
    fontSize: 11,
    fontWeight: 900,
  },

  container: {
    width: "100%",
    maxWidth: 920,
    margin: "0 auto",
    padding: "28px 20px 44px",
    boxSizing: "border-box",
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
    color: C.muted,
    fontSize: 12.5,
    lineHeight: 1.55,
    maxWidth: 650,
  },

  sectionTitle: {
    margin: "24px 2px 9px",
    fontSize: 13,
    fontWeight: 900,
  },

  card: {
    background: C.white,
    borderRadius: 18,
    border: `1px solid ${C.border}`,
    padding: "0 16px",
    boxShadow: "0 5px 18px rgba(8,47,60,0.035)",
  },

  row: {
    width: "100%",
    minHeight: 70,
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: "13px 0",
    boxSizing: "border-box",
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  rowContent: {
    flex: 1,
    minWidth: 0,
    textAlign: "left",
  },

  rowTitle: {
    fontSize: 12.5,
    fontWeight: 850,
  },

  rowSubtitle: {
    marginTop: 4,
    color: C.muted,
    fontSize: 10,
    lineHeight: 1.4,
  },

  switch: {
    width: 42,
    height: 24,
    border: "none",
    borderRadius: 20,
    padding: 2.5,
    cursor: "pointer",
    flexShrink: 0,
    transition: "background 180ms ease",
  },

  switchKnob: {
    display: "block",
    width: 19,
    height: 19,
    borderRadius: "50%",
    background: C.white,
    boxShadow: "0 1px 4px rgba(0,0,0,0.16)",
    transition: "transform 180ms ease",
  },

  actionRow: {
    background: C.white,
    borderLeft: "none",
    borderRight: "none",
    borderTop: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  editText: {
    color: C.green,
    fontSize: 9.5,
    fontWeight: 850,
  },

  logoutButton: {
    marginTop: 21,
    width: "100%",
    borderRadius: 14,
    border: `1px solid #F1D9DC`,
    background: "#FFF8F9",
    color: C.red,
    padding: "13px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 850,
    cursor: "pointer",
  },

  footer: {
    marginTop: 22,
    textAlign: "center",
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  footerSub: {
    marginTop: 5,
    color: C.muted,
    fontSize: 9,
    fontWeight: 650,
    letterSpacing: 0,
  },
};