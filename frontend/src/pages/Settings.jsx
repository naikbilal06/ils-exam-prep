import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bell,
  BellRing,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  HelpCircle,
  Lock,
  Moon,
  RotateCcw,
  ShieldCheck,
  Sun,
  Target,
  User,
  Volume2,
  LogOut,
  Save,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  notifications: true,
  studyReminders: true,
  resultAlerts: true,

  reminderTime: "19:00",
  dailyStudyGoal: "6",
  preferredDifficulty: "Medium",

  questionMode: "All Questions",
  showExplanations: true,
  soundEffects: true,

  darkMode: false,
};

const STORAGE_PREFIX = "ils-ranker-settings";

function getStorageKey(profile) {
  const mobile =
    profile?.mobile ||
    profile?.phone ||
    profile?.mobileNumber ||
    "guest";

  return `${STORAGE_PREFIX}-${String(mobile)}`;
}

function loadSettings(profile) {
  try {
    const saved = localStorage.getItem(getStorageKey(profile));

    if (!saved) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(saved),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function formatTime(time) {
  if (!time) return "Not set";

  const [hour, minute] = time.split(":");
  const h = Number(hour);

  const suffix = h >= 12 ? "PM" : "AM";
  const displayHour = h % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

export default function Settings({
  profile,
  onBack,
  onLogout,
}) {
  const storageKey = useMemo(
    () => getStorageKey(profile),
    [profile]
  );

  const [settings, setSettings] = useState(() =>
    loadSettings(profile)
  );

  const [saved, setSaved] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] =
    useState(false);

  useEffect(() => {
    const loaded = loadSettings(profile);
    setSettings(loaded);

    document.body.dataset.theme = loaded.darkMode
      ? "dark"
      : "light";
  }, [profile]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);

    if (key === "darkMode") {
      document.body.dataset.theme = value
        ? "dark"
        : "light";
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(settings)
      );

      window.dispatchEvent(
        new CustomEvent("ils-settings-updated", {
          detail: settings,
        })
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2200);
    } catch {
      alert("Unable to save settings.");
    }
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all settings to default values?"
    );

    if (!confirmed) return;

    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      storageKey,
      JSON.stringify(DEFAULT_SETTINGS)
    );

    document.body.dataset.theme = "light";

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  const toggleSection = section => {
    setOpenSection(prev =>
      prev === section ? null : section
    );
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);

    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  const cardStyle = {
    background: settings.darkMode
      ? "#102F38"
      : "#FFFFFF",
    border: settings.darkMode
      ? "1px solid #1D4A55"
      : "1px solid #E7ECEA",
    borderRadius: 18,
    overflow: "hidden",
  };

  const textPrimary = settings.darkMode
    ? "#F5FAFA"
    : "#082F3C";

  const textSecondary = settings.darkMode
    ? "#A8BCBF"
    : "#68777B";

  const mutedBg = settings.darkMode
    ? "#123840"
    : "#F7FAF8";

  const border = settings.darkMode
    ? "#1D4A55"
    : "#E7ECEA";

  const rowButton = {
    width: "100%",
    border: 0,
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px",
    cursor: "pointer",
    textAlign: "left",
  };

  const iconBox = {
    width: 40,
    height: 40,
    minWidth: 40,
    borderRadius: 12,
    background: settings.darkMode
      ? "#153F48"
      : "#EAF5F1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#007050",
  };

  const toggleStyle = enabled => ({
    width: 48,
    height: 28,
    borderRadius: 999,
    border: "none",
    background: enabled
      ? "#007050"
      : settings.darkMode
      ? "#476169"
      : "#CCD7D4",
    padding: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: enabled
      ? "flex-end"
      : "flex-start",
    cursor: "pointer",
    transition: "all .2s ease",
  });

  const toggleKnob = {
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#FFFFFF",
    boxShadow:
      "0 2px 6px rgba(0,0,0,.18)",
  };

  const selectStyle = {
    width: "100%",
    height: 46,
    border: `1px solid ${border}`,
    borderRadius: 12,
    background: mutedBg,
    color: textPrimary,
    padding: "0 14px",
    fontSize: 14,
    outline: "none",
  };

  const inputStyle = {
    width: "100%",
    height: 46,
    border: `1px solid ${border}`,
    borderRadius: 12,
    background: mutedBg,
    color: textPrimary,
    padding: "0 14px",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minHeight: "100dvh",
        background: settings.darkMode
          ? "#071F28"
          : "#F4FBF7",
        color: textPrimary,
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 780,
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              width: 42,
              height: 42,
              borderRadius: 13,
              border: `1px solid ${border}`,
              background: cardStyle.background,
              color: textPrimary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={20} />
          </button>

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.2,
                color: "#007050",
                marginBottom: 4,
              }}
            >
              ILS RANKER
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: 25,
                lineHeight: 1.1,
                fontWeight: 800,
                color: textPrimary,
              }}
            >
              Settings
            </h1>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            style={{
              height: 42,
              padding: "0 14px",
              borderRadius: 13,
              border: 0,
              background: "#007050",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 7,
              cursor: "pointer",
            }}
          >
            {saved ? (
              <Check size={17} />
            ) : (
              <Save size={17} />
            )}

            {saved ? "Saved" : "Save"}
          </button>
        </header>

        {/* PROFILE PREVIEW */}
        <div
          style={{
            ...cardStyle,
            padding: 16,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 13,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#007050,#0B4654)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              fontWeight: 800,
            }}
          >
            {(profile?.name ||
              profile?.fullName ||
              "U")
              .trim()
              .charAt(0)
              .toUpperCase()}
          </div>

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: textPrimary,
                marginBottom: 3,
              }}
            >
              {profile?.name ||
                profile?.fullName ||
                "Active Learner"}
            </div>

            <div
              style={{
                fontSize: 13,
                color: textSecondary,
              }}
            >
              {profile?.mobile ||
                profile?.phone ||
                "Account settings"}
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <SectionCard
          title="Notifications"
          subtitle="Control alerts and study reminders"
          icon={<BellRing size={19} />}
          cardStyle={cardStyle}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
        >
          <SettingToggleRow
            icon={<Bell size={18} />}
            title="Push Notifications"
            description="Receive app notifications"
            enabled={settings.notifications}
            onToggle={() =>
              updateSetting(
                "notifications",
                !settings.notifications
              )
            }
            rowButton={rowButton}
            iconBox={iconBox}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleStyle={toggleStyle}
            toggleKnob={toggleKnob}
          />

          <Divider color={border} />

          <SettingToggleRow
            icon={<Clock3 size={18} />}
            title="Study Reminders"
            description={`Daily reminder at ${formatTime(
              settings.reminderTime
            )}`}
            enabled={settings.studyReminders}
            onToggle={() =>
              updateSetting(
                "studyReminders",
                !settings.studyReminders
              )
            }
            rowButton={rowButton}
            iconBox={iconBox}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleStyle={toggleStyle}
            toggleKnob={toggleKnob}
          />

          {settings.studyReminders && (
            <>
              <div
                style={{
                  padding: "0 16px 16px 70px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 700,
                    color: textSecondary,
                    marginBottom: 7,
                  }}
                >
                  Reminder Time
                </label>

                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={e =>
                    updateSetting(
                      "reminderTime",
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>
            </>
          )}

          <Divider color={border} />

          <SettingToggleRow
            icon={<Target size={18} />}
            title="Result Alerts"
            description="Get notified when test results are ready"
            enabled={settings.resultAlerts}
            onToggle={() =>
              updateSetting(
                "resultAlerts",
                !settings.resultAlerts
              )
            }
            rowButton={rowButton}
            iconBox={iconBox}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleStyle={toggleStyle}
            toggleKnob={toggleKnob}
          />
        </SectionCard>

        <div style={{ height: 14 }} />

        {/* STUDY PREFERENCES */}
        <SectionCard
          title="Study Preferences"
          subtitle="Personalize your preparation"
          icon={<BookOpen size={19} />}
          cardStyle={cardStyle}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
        >
          <div style={{ padding: 16 }}>
            <PreferenceField
              label="Daily Study Goal"
              hint="Hours per day"
              value={settings.dailyStudyGoal}
              onChange={value =>
                updateSetting(
                  "dailyStudyGoal",
                  value
                )
              }
              type="number"
              min="1"
              max="24"
              step="0.5"
              inputStyle={inputStyle}
              textSecondary={textSecondary}
              textPrimary={textPrimary}
            />

            <div style={{ height: 14 }} />

            <PreferenceField
              label="Preferred Difficulty"
              hint="Difficulty of practice questions"
              value={settings.preferredDifficulty}
              onChange={value =>
                updateSetting(
                  "preferredDifficulty",
                  value
                )
              }
              options={[
                "Easy",
                "Medium",
                "Hard",
                "Mixed",
              ]}
              inputStyle={selectStyle}
              textSecondary={textSecondary}
              textPrimary={textPrimary}
            />

            <div style={{ height: 14 }} />

            <PreferenceField
              label="Question Mode"
              hint="Questions shown during practice"
              value={settings.questionMode}
              onChange={value =>
                updateSetting(
                  "questionMode",
                  value
                )
              }
              options={[
                "All Questions",
                "New Questions",
                "Previous Year Questions",
                "Weak Areas",
              ]}
              inputStyle={selectStyle}
              textSecondary={textSecondary}
              textPrimary={textPrimary}
            />
          </div>

          <Divider color={border} />

          <SettingToggleRow
            icon={<HelpCircle size={18} />}
            title="Show Explanations"
            description="Show explanation after answering"
            enabled={settings.showExplanations}
            onToggle={() =>
              updateSetting(
                "showExplanations",
                !settings.showExplanations
              )
            }
            rowButton={rowButton}
            iconBox={iconBox}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleStyle={toggleStyle}
            toggleKnob={toggleKnob}
          />

          <Divider color={border} />

          <SettingToggleRow
            icon={<Volume2 size={18} />}
            title="Sound Effects"
            description="Play sound feedback during tests"
            enabled={settings.soundEffects}
            onToggle={() =>
              updateSetting(
                "soundEffects",
                !settings.soundEffects
              )
            }
            rowButton={rowButton}
            iconBox={iconBox}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleStyle={toggleStyle}
            toggleKnob={toggleKnob}
          />
        </SectionCard>

        <div style={{ height: 14 }} />

        {/* APPEARANCE */}
        <SectionCard
          title="Appearance"
          subtitle="Choose how ILS RANKER looks"
          icon={
            settings.darkMode ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )
          }
          cardStyle={cardStyle}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
        >
          <SettingToggleRow
            icon={
              settings.darkMode ? (
                <Moon size={18} />
              ) : (
                <Sun size={18} />
              )
            }
            title="Dark Mode"
            description={
              settings.darkMode
                ? "Dark appearance enabled"
                : "Light appearance enabled"
            }
            enabled={settings.darkMode}
            onToggle={() =>
              updateSetting(
                "darkMode",
                !settings.darkMode
              )
            }
            rowButton={rowButton}
            iconBox={iconBox}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            toggleStyle={toggleStyle}
            toggleKnob={toggleKnob}
          />
        </SectionCard>

        <div style={{ height: 14 }} />

        {/* PRIVACY & SECURITY */}
        <div style={cardStyle}>
          <button
            type="button"
            onClick={() =>
              toggleSection("privacy")
            }
            style={rowButton}
          >
            <div style={iconBox}>
              <ShieldCheck size={19} />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: textPrimary,
                }}
              >
                Privacy & Security
              </div>

              <div
                style={{
                  marginTop: 3,
                  fontSize: 12.5,
                  color: textSecondary,
                }}
              >
                Account and data controls
              </div>
            </div>

            <ChevronDown
              size={18}
              color={textSecondary}
              style={{
                transform:
                  openSection === "privacy"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                transition: "transform .2s ease",
              }}
            />
          </button>

          {openSection === "privacy" && (
            <>
              <Divider color={border} />

              <div style={{ padding: 16 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 13,
                    borderRadius: 13,
                    background: mutedBg,
                    marginBottom: 10,
                  }}
                >
                  <Lock
                    size={19}
                    color="#007050"
                  />

                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: textPrimary,
                      }}
                    >
                      Account Security
                    </div>

                    <div
                      style={{
                        marginTop: 2,
                        fontSize: 12,
                        color: textSecondary,
                      }}
                    >
                      Your account is protected by OTP
                      based login.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 13,
                    borderRadius: 13,
                    background: mutedBg,
                  }}
                >
                  <User
                    size={19}
                    color="#007050"
                  />

                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: textPrimary,
                      }}
                    >
                      Personal Data
                    </div>

                    <div
                      style={{
                        marginTop: 2,
                        fontSize: 12,
                        color: textSecondary,
                      }}
                    >
                      Profile information can be
                      managed from Profile.
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ height: 14 }} />

        {/* HELP & ABOUT */}
        <div style={cardStyle}>
          <button
            type="button"
            onClick={() =>
              toggleSection("help")
            }
            style={rowButton}
          >
            <div style={iconBox}>
              <HelpCircle size={19} />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: textPrimary,
                }}
              >
                Help & About
              </div>

              <div
                style={{
                  marginTop: 3,
                  fontSize: 12.5,
                  color: textSecondary,
                }}
              >
                App information and support
              </div>
            </div>

            <ChevronDown
              size={18}
              color={textSecondary}
              style={{
                transform:
                  openSection === "help"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                transition: "transform .2s ease",
              }}
            />
          </button>

          {openSection === "help" && (
            <>
              <Divider color={border} />

              <div style={{ padding: 16 }}>
                <InfoRow
                  label="App"
                  value="ILS RANKER"
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                />

                <InfoRow
                  label="Version"
                  value="1.0.0"
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                />

                <InfoRow
                  label="Purpose"
                  value="NEET • JEE • CUET Exam Preparation"
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                />

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "For support, please use the support/contact option provided by your ILS RANKER administrator."
                    )
                  }
                  style={{
                    width: "100%",
                    height: 44,
                    marginTop: 10,
                    borderRadius: 12,
                    border: `1px solid ${border}`,
                    background: mutedBg,
                    color: textPrimary,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Contact Support
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{ height: 14 }} />

        {/* RESET */}
        <button
          type="button"
          onClick={resetSettings}
          style={{
            width: "100%",
            minHeight: 50,
            borderRadius: 14,
            border: `1px solid ${border}`,
            background: cardStyle.background,
            color: textPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          <RotateCcw size={17} />
          Reset Settings
        </button>

        <div style={{ height: 12 }} />

        {/* LOGOUT */}
        <button
          type="button"
          onClick={() =>
            setShowLogoutConfirm(true)
          }
          style={{
            width: "100%",
            minHeight: 50,
            borderRadius: 14,
            border: "1px solid #E3B7B7",
            background: settings.darkMode
              ? "#351D22"
              : "#FFF7F7",
            color: "#B42318",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          <LogOut size={17} />
          Log Out
        </button>

        <div
          style={{
            textAlign: "center",
            fontSize: 11.5,
            color: textSecondary,
            padding: "18px 0 8px",
          }}
        >
          ILS RANKER • KNOW YOUR POTENTIAL
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 380,
              borderRadius: 20,
              background: settings.darkMode
                ? "#102F38"
                : "#FFFFFF",
              padding: 22,
              boxSizing: "border-box",
              boxShadow:
                "0 20px 60px rgba(0,0,0,.2)",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px",
                color: textPrimary,
                fontSize: 19,
              }}
            >
              Log out?
            </h3>

            <p
              style={{
                margin: "0 0 20px",
                color: textSecondary,
                fontSize: 13.5,
                lineHeight: 1.5,
              }}
            >
              You will return to the login screen.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 10,
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setShowLogoutConfirm(false)
                }
                style={{
                  height: 45,
                  borderRadius: 12,
                  border: `1px solid ${border}`,
                  background: mutedBg,
                  color: textPrimary,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  height: 45,
                  borderRadius: 12,
                  border: 0,
                  background: "#B42318",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DARK MODE GLOBAL BASE */}
      <style>{`
        html, body {
          margin: 0;
          min-height: 100%;
        }

        body[data-theme="dark"] {
          background: #071F28;
          color: #F5FAFA;
        }

        body[data-theme="light"] {
          background: #F4FBF7;
          color: #082F3C;
        }

        * {
          box-sizing: border-box;
        }

        button,
        input,
        select {
          font-family: inherit;
        }

        button:focus-visible,
        input:focus-visible,
        select:focus-visible {
          outline: 2px solid #007050;
          outline-offset: 2px;
        }

        @media (max-width: 520px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionCard({
  title,
  subtitle,
  icon,
  cardStyle,
  textPrimary,
  textSecondary,
  children,
}) {
  return (
    <section style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 16,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            minWidth: 40,
            borderRadius: 12,
            background: "#EAF5F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#007050",
          }}
        >
          {icon}
        </div>

        <div>
          <div
            style={{
              fontSize: 15.5,
              fontWeight: 800,
              color: textPrimary,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 3,
              fontSize: 12.5,
              color: textSecondary,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      <div>{children}</div>
    </section>
  );
}

function SettingToggleRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
  rowButton,
  iconBox,
  textPrimary,
  textSecondary,
  toggleStyle,
  toggleKnob,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={rowButton}
      aria-pressed={enabled}
    >
      <div style={iconBox}>{icon}</div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: textPrimary,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 3,
            fontSize: 12,
            color: textSecondary,
            lineHeight: 1.35,
          }}
        >
          {description}
        </div>
      </div>

      <span style={toggleStyle(enabled)}>
        <span style={toggleKnob} />
      </span>
    </button>
  );
}

function Divider({ color }) {
  return (
    <div
      style={{
        height: 1,
        background: color,
      }}
    />
  );
}

function PreferenceField({
  label,
  hint,
  value,
  onChange,
  options,
  type = "text",
  min,
  max,
  step,
  inputStyle,
  textSecondary,
  textPrimary,
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: 7,
        }}
      >
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 800,
            color: textPrimary,
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: 2,
            fontSize: 11.5,
            color: textSecondary,
          }}
        >
          {hint}
        </div>
      </label>

      {options ? (
        <select
          value={value}
          onChange={e =>
            onChange(e.target.value)
          }
          style={inputStyle}
        >
          {options.map(option => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e =>
            onChange(e.target.value)
          }
          style={inputStyle}
        />
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  textPrimary,
  textSecondary,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        padding: "8px 0",
      }}
    >
      <span
        style={{
          fontSize: 12,
          color: textSecondary,
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontSize: 12,
          color: textPrimary,
          fontWeight: 700,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}