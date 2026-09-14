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

    edit: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z" />
      </>
    ),

    user: (
      <>
        <circle
          cx="12"
          cy="8"
          r="3.5"
        />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </>
    ),

    phone: (
      <path d="M6.5 3.5h3l1.5 4-2 1.5a14 14 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2C10.2 18.7 5.3 13.8 4.5 5.7A2 2 0 0 1 6.5 3.5Z" />
    ),

    exam: (
      <>
        <path d="M5 4h14a1 1 0 0 1 1 1v14H4V5a1 1 0 0 1 1-1Z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
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

    check: (
      <path d="M5 12.5l4.2 4.2L19 7" />
    ),

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    settings: (
      <>
        <circle
          cx="12"
          cy="12"
          r="3"
        />
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

    calendar: (
      <>
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
        />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),

    shield: (
      <>
        <path d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6l7-3Z" />
        <path d="M8.5 12l2.2 2.2 4.8-5" />
      </>
    ),
  };

  return (
    <svg {...common}>
      {paths[name]}
    </svg>
  );
}

export default function Profile({
  profile = {},
  onBack,
  onLogout,
}) {
  const firstName =
    profile?.name?.split(" ")[0] ||
    profile?.fullName?.split(" ")[0] ||
    "User";

  const fullName =
    profile?.name ||
    profile?.fullName ||
    "User";

  const mobile =
    profile?.mobile ||
    profile?.phone ||
    "Not available";

  const exam =
    Array.isArray(profile?.exams) &&
    profile.exams.length
      ? profile.exams[0]
      : profile?.selectedExam ||
        "NEET UG";

  const subjects =
    Array.isArray(profile?.subjects)
      ? profile.subjects
      : [];

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const subjectList = subjects.length
    ? subjects
    : [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "English",
        "General Test",
      ];

  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        <header style={styles.header}>
          <div
            style={styles.headerInner}
          >
            <button
              type="button"
              style={
                styles.backButton
              }
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
              <div
                style={styles.brand}
              >
                ILS RANKER
              </div>

              <div
                style={styles.tagline}
              >
                KNOW YOUR POTENTIAL
              </div>
            </div>

            <div
              style={
                styles.headerTitle
              }
            >
              Profile
            </div>
          </div>
        </header>

        <main style={styles.container}>
          <section
            style={
              styles.profileHero
            }
          >
            <div
              style={styles.avatar}
            >
              {initials || "U"}
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={styles.welcome}
              >
                Welcome back
              </div>

              <h1
                style={styles.name}
              >
                {firstName}
              </h1>

              <div
                style={
                  styles.profileStatus
                }
              >
                <span
                  style={
                    styles.statusDot
                  }
                />

                Active Learner
              </div>
            </div>

            <button
              type="button"
              style={
                styles.editButton
              }
              onClick={() => {}}
              aria-label="Edit profile"
            >
              <Icon
                name="edit"
                size={17}
                stroke={C.green}
              />
            </button>
          </section>

          <section
            style={styles.statsCard}
          >
            <Stat
              value="12"
              label="Tests Taken"
            />

            <div
              style={
                styles.statDivider
              }
            />

            <Stat
              value="680"
              label="Best Score"
            />

            <div
              style={
                styles.statDivider
              }
            />

            <Stat
              value="72%"
              label="Avg. Accuracy"
            />
          </section>

          <SectionTitle
            text="Personal Information"
          />

          <section
            style={styles.infoCard}
          >
            <InfoRow
              icon="user"
              label="Full Name"
              value={fullName}
            />

            <InfoRow
              icon="phone"
              label="Mobile Number"
              value={mobile}
              last
            />
          </section>

          <SectionTitle
            text="Preparation"
          />

          <section
            style={styles.infoCard}
          >
            <InfoRow
              icon="exam"
              label="Primary Exam"
              value={exam}
            />

            <InfoRow
              icon="calendar"
              label="Target Year"
              value="2026"
            />

            <InfoRow
              icon="target"
              label="Preparation Status"
              value="In Progress"
              valueColor={C.green}
              last
            />
          </section>

          <SectionTitle
            text="Selected Subjects"
          />

          <section
            style={styles.subjectCard}
          >
            <div
              style={
                styles.subjectHeader
              }
            >
              <div
                style={{
                  minWidth: 0,
                }}
              >
                <div
                  style={
                    styles.subjectTitle
                  }
                >
                  Your Preparation Subjects
                </div>

                <div
                  style={
                    styles.subjectSubtitle
                  }
                >
                  Subjects selected for your study
                  plan
                </div>
              </div>

              <div
                style={
                  styles.subjectCount
                }
              >
                {subjects.length ||
                  6}
              </div>
            </div>

            <div
              style={
                styles.subjectGrid
              }
            >
              {subjectList.map(
                (subject) => (
                  <div
                    key={subject}
                    style={
                      styles.subjectPill
                    }
                  >
                    <span
                      style={
                        styles.subjectCheck
                      }
                    >
                      <Icon
                        name="check"
                        size={11}
                        stroke="#FFFFFF"
                      />
                    </span>

                    {subject}
                  </div>
                )
              )}
            </div>
          </section>

          <SectionTitle text="Account" />

          <section
            style={styles.accountCard}
          >
            <AccountRow
              icon="settings"
              title="Settings"
              subtitle="Manage your app preferences"
            />

            <AccountRow
              icon="target"
              title="My Goals"
              subtitle="Update your preparation goals"
            />

            <AccountRow
              icon="shield"
              title="Privacy & Security"
              subtitle="Manage account privacy"
              last
            />
          </section>

          <button
            type="button"
            style={
              styles.logoutButton
            }
            onClick={onLogout}
          >
            <Icon
              name="logout"
              size={18}
              stroke={C.red}
            />

            <span>Log Out</span>
          </button>

          <div
            style={styles.version}
          >
            ILS Ranker • Version 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
}) {
  return (
    <div style={styles.stat}>
      <div
        style={styles.statValue}
      >
        {value}
      </div>

      <div
        style={styles.statLabel}
      >
        {label}
      </div>
    </div>
  );
}

function SectionTitle({
  text,
}) {
  return (
    <div
      style={
        styles.sectionHeading
      }
    >
      {text}
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueColor = C.navy,
  last,
}) {
  return (
    <div
      style={{
        ...styles.infoRow,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
    >
      <div
        style={styles.infoIcon}
      >
        <Icon
          name={icon}
          size={18}
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
          style={styles.infoLabel}
        >
          {label}
        </div>

        <div
          style={{
            ...styles.infoValue,
            color: valueColor,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function AccountRow({
  icon,
  title,
  subtitle,
  last,
}) {
  return (
    <button
      type="button"
      style={{
        ...styles.accountRow,
        borderBottom: last
          ? "none"
          : `1px solid ${C.border}`,
      }}
      onClick={() => {}}
    >
      <div
        style={styles.accountIcon}
      >
        <Icon
          name={icon}
          size={18}
          stroke={C.green}
        />
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          textAlign: "left",
        }}
      >
        <div
          style={styles.accountTitle}
        >
          {title}
        </div>

        <div
          style={styles.accountSubtitle}
        >
          {subtitle}
        </div>
      </div>

      <Icon
        name="arrow"
        size={16}
        stroke={C.muted}
      />
    </button>
  );
}

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
    maxWidth: 390,
    minHeight: "100dvh",
    background: C.mint,
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: C.white,
    borderBottom:
      `1px solid ${C.border}`,
  },

  headerInner: {
    width: "100%",
    minHeight: 64,
    padding: "12px 15px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxSizing: "border-box",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border:
      `1px solid ${C.border}`,
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
    fontSize: 7.5,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  headerTitle: {
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
    flexShrink: 0,
  },

  container: {
    width: "100%",
    maxWidth: 390,
    margin: "0 auto",
    padding:
      "20px 15px 105px",
    boxSizing: "border-box",
  },

  profileHero: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    padding: 16,
    borderRadius: 19,
    background: C.white,
    border:
      `1px solid ${C.border}`,
    boxShadow:
      "0 7px 20px rgba(8,47,60,0.045)",
    boxSizing: "border-box",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    background: C.green,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 19,
    fontWeight: 900,
    letterSpacing: 0.5,
    flexShrink: 0,
  },

  welcome: {
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  name: {
    margin: "3px 0 0",
    fontSize: 21,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: -0.5,
  },

  profileStatus: {
    marginTop: 6,
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

  editButton: {
    width: 35,
    height: 35,
    borderRadius: 10,
    border:
      `1px solid ${C.border}`,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  statsCard: {
    marginTop: 10,
    padding: "14px 8px",
    display: "grid",
    gridTemplateColumns:
      "1fr auto 1fr auto 1fr",
    alignItems: "center",
    background: C.white,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    boxSizing: "border-box",
  },

  stat: {
    textAlign: "center",
    minWidth: 0,
  },

  statValue: {
    color: C.green,
    fontSize: 18,
    fontWeight: 900,
  },

  statLabel: {
    marginTop: 3,
    color: C.muted,
    fontSize: 7.5,
    fontWeight: 700,
    lineHeight: 1.2,
  },

  statDivider: {
    width: 1,
    height: 28,
    background: C.border,
  },

  sectionHeading: {
    margin:
      "21px 2px 9px",
    color: C.navy,
    fontSize: 11.5,
    fontWeight: 900,
  },

  infoCard: {
    background: C.white,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    padding: "0 14px",
    boxSizing: "border-box",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 0",
  },

  infoIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  infoLabel: {
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 700,
  },

  infoValue: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: 850,
    lineHeight: 1.25,
  },

  subjectCard: {
    background: C.white,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    padding: 14,
    boxSizing: "border-box",
  },

  subjectHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 9,
  },

  subjectTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  subjectSubtitle: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8.5,
    lineHeight: 1.35,
  },

  subjectCount: {
    minWidth: 28,
    height: 28,
    padding: "0 7px",
    borderRadius: 8,
    background: C.mint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 900,
    flexShrink: 0,
  },

  subjectGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, minmax(0, 1fr))",
    gap: 7,
    marginTop: 12,
  },

  subjectPill: {
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: 5,
    padding: "8px 8px",
    borderRadius: 9,
    background: C.mint,
    color: C.navy,
    fontSize: 8.5,
    fontWeight: 750,
  },

  subjectCheck: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  accountCard: {
    background: C.white,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    padding: "0 14px",
    boxSizing: "border-box",
  },

  accountRow: {
    width: "100%",
    border: "none",
    background: C.white,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "13px 0",
    cursor: "pointer",
  },

  accountIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    background: C.mint,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  accountTitle: {
    fontSize: 10.5,
    fontWeight: 850,
  },

  accountSubtitle: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8.5,
    lineHeight: 1.3,
  },

  logoutButton: {
    marginTop: 17,
    width: "100%",
    borderRadius: 13,
    border:
      "1px solid #F1D9DC",
    background: "#FFF8F9",
    color: C.red,
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontSize: 11.5,
    fontWeight: 850,
    cursor: "pointer",
  },

  version: {
    marginTop: 13,
    paddingBottom: 3,
    textAlign: "center",
    color: C.muted,
    fontSize: 8,
    fontWeight: 650,
  },
};