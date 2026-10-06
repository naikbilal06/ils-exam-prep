import React, { useState } from "react";
import { Capacitor, CapacitorHttp } from "@capacitor/core";

import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import MobileVerification from "./pages/MobileVerification";
import ExamSelection from "./pages/ExamSelection";
import SubjectSelection from "./pages/SubjectSelection";
import NameSetup from "./pages/NameSetup";
import MyColleges from "./pages/MyColleges";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Analysis from "./pages/Analysis";
import ChapterAnalysis from "./pages/ChapterAnalysis";
import QuestionAnalysis from "./pages/QuestionAnalysis";
import WeaknessInsights from "./pages/WeaknessInsights";
import AISuggestions from "./pages/AISuggestions";
import RankImprovement from "./pages/RankImprovement";
import CollegePrediction from "./pages/CollegePrediction";
import GoalTracker from "./pages/GoalTracker";
import TestHistory from "./pages/TestHistory";
import RetakeImprovement from "./pages/RetakeImprovement";
import RankPredictor from "./pages/RankPredictor";
import Practice from "./pages/Practice";
import MockTests from "./pages/MockTests";
import AICounsellor from "./pages/AICounsellor";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import SideMenu from "./components/SideMenu";

/* =========================================================
   API
========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

/* =========================================================
   COMMON BOTTOM NAVIGATION
========================================================= */

function BottomNavigation({
  activeSection,
  onNavigate,
}) {
  const getActiveTab = () => {
    if (
      [
        "analysis",
        "chapter-analysis",
        "question-analysis",
        "weakness-insights",
        "ai-suggestions",
        "rank-improvement",
      ].includes(activeSection)
    ) {
      return "analysis";
    }

    if (
      [
        "mock-tests",
        "practice",
        "history",
        "retake-improvement",
      ].includes(activeSection)
    ) {
      return "tests";
    }

    if (
      [
        "college-prediction",
        "my-colleges",
        "rank-predictor",
      ].includes(activeSection)
    ) {
      return "colleges";
    }

    if (
      [
        "profile",
        "settings",
      ].includes(activeSection)
    ) {
      return "profile";
    }

    return "home";
  };

  const activeTab = getActiveTab();

  const navButtonStyle = (tab) => ({
    minWidth: 0,
    border: 0,
    background: "transparent",
    color:
      activeTab === tab
        ? "#10E79D"
        : "rgba(226, 232, 240, 0.6)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    cursor: "pointer",
    fontSize: "9px",
    fontWeight:
      activeTab === tab
        ? 900
        : 600,
    padding: "3px 0",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    transition: "color 0.2s ease",
  });

  const iconStyle = {
    width: 25,
    height: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const icon = (type) => {
    const common = {
      width: 21,
      height: 21,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    if (type === "home") {
      return (
        <svg {...common}>
          <path d="M3.5 10.5 12 3l8.5 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );
    }

    if (type === "tests") {
      return (
        <svg {...common}>
          <rect
            x="5"
            y="3.5"
            width="14"
            height="17"
            rx="2"
          />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h4" />
        </svg>
      );
    }

    if (type === "analysis") {
      return (
        <svg {...common}>
          <path d="M5 19V10" />
          <path d="M12 19V5" />
          <path d="M19 19v-7" />
          <path d="M3.5 21h17" />
        </svg>
      );
    }

    if (type === "colleges") {
      return (
        <svg {...common}>
          <path d="M3 9.5 12 5l9 4.5L12 14 3 9.5Z" />
          <path d="M6 12v4.5c3.5 2 8.5 2 12 0V12" />
          <path d="M21 10v5" />
        </svg>
      );
    }

    if (type === "profile") {
      return (
        <svg {...common}>
          <circle
            cx="12"
            cy="8"
            r="3.5"
          />
          <path d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5" />
        </svg>
      );
    }

    return null;
  };

  return (
    <nav
      style={{
        position: "fixed",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        height: 68,
        minHeight: 68,
        borderTop:
          "1px solid rgba(255, 255, 255, 0.12)",
        background: "rgba(4, 25, 23, 0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 -8px 30px rgba(0,0,0,0.5)",
        display: "grid",
        gridTemplateColumns:
          "repeat(5, minmax(0, 1fr))",
        padding: "4px 3px 5px",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <button
        type="button"
        style={navButtonStyle("home")}
        onClick={() =>
          onNavigate("dashboard")
        }
      >
        <span style={iconStyle}>
          {icon("home")}
        </span>
        <span>Home</span>
      </button>

      <button
        type="button"
        style={navButtonStyle("tests")}
        onClick={() =>
          onNavigate("mock-tests")
        }
      >
        <span style={iconStyle}>
          {icon("tests")}
        </span>
        <span>Tests</span>
      </button>

      <button
        type="button"
        style={navButtonStyle("analysis")}
        onClick={() =>
          onNavigate("analysis")
        }
      >
        <span style={iconStyle}>
          {icon("analysis")}
        </span>
        <span>Analysis</span>
      </button>

      <button
        type="button"
        style={navButtonStyle("colleges")}
        onClick={() =>
          onNavigate(
            "college-prediction"
          )
        }
      >
        <span style={iconStyle}>
          {icon("colleges")}
        </span>
        <span>Colleges</span>
      </button>

      <button
        type="button"
        style={navButtonStyle("profile")}
        onClick={() =>
          onNavigate("profile")
        }
      >
        <span style={iconStyle}>
          {icon("profile")}
        </span>
        <span>Profile</span>
      </button>
    </nav>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const [screen, setScreen] =
    useState("splash");

  const [mobile, setMobile] =
    useState("");

  const [verifying, setVerifying] =
    useState(false);

  const [selectedExams, setSelectedExams] =
    useState([]);

  /* =======================================================
     ACTIVE EXAM
     Saved exams = all selected exams
     Active exam = currently selected exam
  ======================================================= */

  const [activeExam, setActiveExam] =
    useState(() => {
      try {
        return localStorage.getItem("ils_active_exam") || "";
      } catch (e) {
        return "";
      }
    });

  const [
    selectedSubjects,
    setSelectedSubjects,
  ] = useState([]);

  const [name, setName] =
    useState("");

  const [profile, setProfile] =
    useState(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [examModeActive, setExamModeActive] =
    useState(false);

  const [
    dashboardSection,
    setDashboardSection,
  ] = useState("dashboard");

  const [
    rankPredictorExam,
    setRankPredictorExam,
  ] = useState("");

  const [
    previousDashboardSection,
    setPreviousDashboardSection,
  ] = useState("dashboard");

  /* =======================================================
     SPLASH
  ======================================================= */

  const handleSplashComplete = () => {
    setScreen("onboarding");
  };

  /* =======================================================
     ONBOARDING
  ======================================================= */

  const handleOnboardingContinue = () => {
    setScreen("mobile");
  };

  /* =======================================================
     OTP VERIFIED
  ======================================================= */

  const handleVerified = (data) => {
    if (
      !data?.success ||
      !data?.user
    ) {
      return;
    }

    const user = data.user;

    const userExams =
      Array.isArray(user.exams)
        ? user.exams
        : [];

    const userSubjects =
      Array.isArray(user.subjects)
        ? user.subjects
        : [];

    const nextActiveExam =
      userExams[0] || "";

    setProfile(user);

    setMobile(
      user.mobile || ""
    );

    setName(
      user.name || ""
    );

    setSelectedExams(userExams);

    setActiveExam(
      nextActiveExam
    );

    setSelectedSubjects(
      userSubjects
    );

    setVerifying(false);
    setMenuOpen(false);

    setDashboardSection(
      "dashboard"
    );

    setRankPredictorExam(
      nextActiveExam
    );

    if (user.profileComplete) {
      setScreen("dashboard");
    } else {
      setScreen("exam");
    }
  };

  /* =======================================================
     EXAMS
  ======================================================= */

  const toggleExam = (examId) => {
    setSelectedExams((current) => {
      const next = current.includes(examId)
        ? current.filter(
            (id) => id !== examId
          )
        : [...current, examId];

      setActiveExam((currentActive) => {
        if (
          currentActive &&
          next.includes(currentActive)
        ) {
          return currentActive;
        }

        return next[0] || "";
      });

      return next;
    });
  };

  const handleExamContinue = () => {
    if (
      selectedExams.length === 0
    ) {
      return;
    }

    if (
      !activeExam ||
      !selectedExams.includes(activeExam)
    ) {
      setActiveExam(
        selectedExams[0]
      );
    }

    setScreen("subjects");
  };

  /* =======================================================
     ACTIVE EXAM CHANGE
  ======================================================= */

  const handleActiveExamChange = (
    examId
  ) => {
    if (!examId) {
      return;
    }

    setActiveExam(examId);
    setRankPredictorExam(examId);

    try {
      localStorage.setItem("ils_active_exam", examId);
    } catch (e) {
      // ignore
    }

    setSelectedExams((prev) =>
      prev.includes(examId) ? prev : [...prev, examId]
    );

    setProfile((prev) => {
      if (!prev) return prev;
      const currentExams = Array.isArray(prev.exams) ? prev.exams : [];
      return {
        ...prev,
        exams: currentExams.includes(examId)
          ? currentExams
          : [...currentExams, examId],
      };
    });
  };

  /* =======================================================
     SUBJECTS
  ======================================================= */

  const toggleSubject = (
    subjectId
  ) => {
    setSelectedSubjects(
      (current) =>
        current.includes(subjectId)
          ? current.filter(
              (id) =>
                id !== subjectId
            )
          : [
              ...current,
              subjectId,
            ]
    );
  };

  const handleSubjectContinue = () => {
    if (
      selectedSubjects.length === 0
    ) {
      return;
    }

    setScreen("name");
  };

  /* =======================================================
     CREATE ACCOUNT
  ======================================================= */

  const createAccount = async () => {
    const cleanName =
      name.trim();

    if (
      !cleanName ||
      selectedExams.length === 0 ||
      selectedSubjects.length === 0
    ) {
      return;
    }

    try {
      setVerifying(true);

      const payload = {
        mobile:
          profile?.mobile ||
          mobile ||
          "",
        email:
          profile?.email ||
          "",
        googleId:
          profile?.googleId ||
          "",
        name: cleanName,
        exams: selectedExams,
        subjects:
          selectedSubjects,
      };

      console.log(
        "Profile save payload:",
        payload
      );

      let data;

      if (
        Capacitor.getPlatform() !==
        "web"
      ) {
        const response =
          await CapacitorHttp.put({
            url: `${API_URL}/api/profile`,
            headers: {
              "Content-Type":
                "application/json",
            },
            data: payload,
          });

        console.log(
          "Profile save response:",
          response
        );

        data =
          typeof response.data ===
          "string"
            ? JSON.parse(
                response.data
              )
            : response.data;

        if (
          response.status < 200 ||
          response.status >= 300 ||
          !data?.success
        ) {
          throw new Error(
            data?.message ||
              `Unable to save profile (${response.status}).`
          );
        }
      } else {
        const response =
          await fetch(
            `${API_URL}/api/profile`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                payload
              ),
            }
          );

        data =
          await response.json();

        if (
          !response.ok ||
          !data?.success
        ) {
          throw new Error(
            data?.message ||
              "Unable to save profile."
          );
        }
      }

      const savedUser =
        data.user;

      const savedExams =
        Array.isArray(
          savedUser?.exams
        )
          ? savedUser.exams
          : selectedExams;

      const savedSubjects =
        Array.isArray(
          savedUser?.subjects
        )
          ? savedUser.subjects
          : selectedSubjects;

      const nextActiveExam =
        activeExam &&
        savedExams.includes(
          activeExam
        )
          ? activeExam
          : savedExams[0] || "";

      setProfile(savedUser);

      setMobile(
        savedUser?.mobile ||
          mobile
      );

      setName(
        savedUser?.name ||
          cleanName
      );

      setSelectedExams(
        savedExams
      );

      setActiveExam(
        nextActiveExam
      );

      setSelectedSubjects(
        savedSubjects
      );

      setDashboardSection(
        "dashboard"
      );

      setMenuOpen(false);

      setRankPredictorExam(
        nextActiveExam
      );

      setScreen("dashboard");
    } catch (error) {
      console.error(
        "Profile save error:",
        error
      );

      alert(
        error?.message ||
          "Unable to save profile. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  const saveProfile = async () => {
    const cleanName =
      name.trim();

    if (
      !cleanName ||
      selectedExams.length === 0 ||
      selectedSubjects.length === 0
    ) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/api/profile`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              mobile:
                profile?.mobile ||
                mobile,
              email:
                profile?.email ||
                "",
              googleId:
                profile?.googleId ||
                "",
              name: cleanName,
              exams:
                selectedExams,
              subjects:
                selectedSubjects,
            }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to save profile."
        );
      }

      const savedUser =
        data.user;

      const savedExams =
        Array.isArray(
          savedUser?.exams
        )
          ? savedUser.exams
          : selectedExams;

      const savedSubjects =
        Array.isArray(
          savedUser?.subjects
        )
          ? savedUser.subjects
          : selectedSubjects;

      const nextActiveExam =
        activeExam &&
        savedExams.includes(
          activeExam
        )
          ? activeExam
          : savedExams[0] || "";

      setProfile(
        savedUser
      );

      setName(
        savedUser.name ||
          cleanName
      );

      setSelectedExams(
        savedExams
      );

      setActiveExam(
        nextActiveExam
      );

      setSelectedSubjects(
        savedSubjects
      );

      setRankPredictorExam(
        nextActiveExam
      );

      setDashboardSection(
        "profile"
      );

      setMenuOpen(false);
    } catch (error) {
      console.error(
        "Profile save error:",
        error
      );

      alert(
        error.message ||
          "Unable to save profile. Please try again."
      );
    }
  };

  /* =======================================================
     SECTION NAVIGATION
  ======================================================= */

  const openDashboardSection = (
    section,
    examId = ""
  ) => {
    if (examModeActive) {
      return;
    }

    if (section === "menu") {
      setMenuOpen(true);
      return;
    }

    setMenuOpen(false);

    if (dashboardSection && dashboardSection !== section) {
      setPreviousDashboardSection(dashboardSection);
    }

    if (
      section ===
      "rank-predictor"
    ) {
      /*
       * Rank Predictor always starts
       * with the active exam.
       *
       * Only use examId when explicitly
       * provided by another screen.
       */
      const selectedRankExam =
        examId ||
        activeExam ||
        selectedExams[0] ||
        "";

      setRankPredictorExam(
        selectedRankExam
      );
    }

    const validSections = [
      "dashboard",
      "analysis",
      "chapter-analysis",
      "question-analysis",
      "weakness-insights",
      "ai-suggestions",
      "rank-improvement",
      "college-prediction",
      "my-colleges",
      "goal-tracker",
      "history",
      "retake-improvement",
      "rank-predictor",
      "practice",
      "mock-tests",
      "ai-counsellor",
      "notifications",
      "profile",
      "settings",
    ];

    if (
      !validSections.includes(
        section
      )
    ) {
      setDashboardSection(
        "dashboard"
      );

      return;
    }

    setDashboardSection(
      section
    );

    setScreen("dashboard");
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    setMenuOpen(false);

    setProfile(null);
    setName("");
    setSelectedExams([]);
    setActiveExam("");
    setSelectedSubjects([]);
    setMobile("");
    setVerifying(false);
    setRankPredictorExam("");

    setDashboardSection(
      "dashboard"
    );

    setScreen("mobile");
  };

  /* =======================================================
     CURRENT PROFILE
  ======================================================= */

  const currentProfile = {
    ...(profile || {}),

    mobile:
      profile?.mobile ||
      mobile,

    name:
      profile?.name ||
      name ||
      "Student",

    exams:
      Array.isArray(
        profile?.exams
      )
        ? profile.exams
        : selectedExams,

    subjects:
      Array.isArray(
        profile?.subjects
      )
        ? profile.subjects
        : selectedSubjects,

    profileComplete:
      profile?.profileComplete ??
      (
        selectedExams.length > 0 &&
        selectedSubjects.length > 0 &&
        Boolean(
          name.trim()
        )
      ),
  };

  /* =======================================================
     AUTH / ONBOARDING
  ======================================================= */

  if (
    screen === "splash"
  ) {
    return (
      <Splash
        onComplete={
          handleSplashComplete
        }
      />
    );
  }

  if (
    screen === "onboarding"
  ) {
    return (
      <Onboarding
        onContinue={
          handleOnboardingContinue
        }
      />
    );
  }

  if (
    screen === "mobile"
  ) {
    return (
      <MobileVerification
        mobile={mobile}
        setMobile={setMobile}
        verifying={verifying}
        onBack={() =>
          setScreen(
            "onboarding"
          )
        }
        onVerified={
          handleVerified
        }
      />
    );
  }

  if (
    screen === "exam"
  ) {
    return (
      <ExamSelection
        selectedExams={
          selectedExams
        }
        onToggleExam={
          toggleExam
        }
        onContinue={
          handleExamContinue
        }
        onBack={() =>
          setScreen("mobile")
        }
      />
    );
  }

  if (
    screen === "subjects"
  ) {
    return (
      <SubjectSelection
        selectedSubjects={
          selectedSubjects
        }
        onToggleSubject={
          toggleSubject
        }
        onContinue={
          handleSubjectContinue
        }
        onBack={() =>
          setScreen("exam")
        }
      />
    );
  }

  if (
    screen === "name"
  ) {
    return (
      <NameSetup
        name={name}
        setName={setName}
        onCreateAccount={
          createAccount
        }
        onBack={() =>
          setScreen(
            "subjects"
          )
        }
      />
    );
  }

  /* =======================================================
     DASHBOARD + ALL APP SCREENS
  ======================================================= */

  if (
    screen === "dashboard"
  ) {
    return (
      <>
        {/* SIDE MENU */}

        <SideMenu
          open={
            menuOpen &&
            !examModeActive
          }
          activeSection={
            dashboardSection
          }
          profile={
            currentProfile
          }
          onClose={() =>
            setMenuOpen(false)
          }
          onNavigate={
            openDashboardSection
          }
          onLogout={
            handleLogout
          }
        />

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {dashboardSection ===
          "dashboard" && (
          <div className="app-shell">
            <Dashboard
              profile={
                currentProfile
              }
              activeExam={
                activeExam
              }
              onActiveExamChange={
                handleActiveExamChange
              }
              onOpenSection={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            PROFILE
        ================================================= */}

        {dashboardSection ===
          "profile" && (
          <div className="app-shell">
            <Profile
              profile={
                currentProfile
              }
              name={name}
              setName={setName}
              selectedExams={
                selectedExams
              }
              selectedSubjects={
                selectedSubjects
              }
              onToggleExam={
                toggleExam
              }
              onToggleSubject={
                toggleSubject
              }
              onSave={
                saveProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
              onLogout={
                handleLogout
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            ANALYSIS
        ================================================= */}

        {dashboardSection ===
          "analysis" && (
          <div className="app-shell">
            <Analysis
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            CHAPTER ANALYSIS
        ================================================= */}

        {dashboardSection ===
          "chapter-analysis" && (
          <div className="app-shell">
            <ChapterAnalysis
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "analysis"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            QUESTION ANALYSIS
        ================================================= */}

        {dashboardSection ===
          "question-analysis" && (
          <div className="app-shell">
            <QuestionAnalysis
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "analysis"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            WEAKNESS INSIGHTS
        ================================================= */}

        {dashboardSection ===
          "weakness-insights" && (
          <div className="app-shell">
            <WeaknessInsights
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "analysis"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            AI SUGGESTIONS
        ================================================= */}

        {dashboardSection ===
          "ai-suggestions" && (
          <div className="app-shell">
            <AISuggestions
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "analysis"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            RANK IMPROVEMENT
        ================================================= */}

        {dashboardSection ===
          "rank-improvement" && (
          <div className="app-shell">
            <RankImprovement
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "analysis"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            COLLEGE PREDICTION
        ================================================= */}

        {dashboardSection ===
          "college-prediction" && (
          <div className="app-shell">
            <CollegePrediction
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            MY COLLEGES
        ================================================= */}

        {dashboardSection ===
          "my-colleges" && (
          <div className="app-shell">
            <MyColleges
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            GOAL TRACKER
        ================================================= */}

        {dashboardSection ===
          "goal-tracker" && (
          <div className="app-shell">
            <GoalTracker
              profile={
                currentProfile
              }
              activeExam={
                activeExam
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            TEST HISTORY
        ================================================= */}

        {dashboardSection ===
          "history" && (
          <div className="app-shell">
            <TestHistory
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            RETAKE IMPROVEMENT
        ================================================= */}

        {dashboardSection ===
          "retake-improvement" && (
          <div className="app-shell">
            <RetakeImprovement
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "history"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            RANK PREDICTOR
        ================================================= */}

        {dashboardSection ===
          "rank-predictor" && (
          <div className="app-shell">
            <RankPredictor
              profile={
                currentProfile
              }
              activeExam={
                activeExam
              }
              initialExam={
                activeExam
              }
              onSelectExam={
                handleActiveExamChange
              }
              onBack={() =>
                openDashboardSection(
                  previousDashboardSection &&
                    previousDashboardSection !== "rank-predictor"
                    ? previousDashboardSection
                    : "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            PRACTICE
        ================================================= */}

        {dashboardSection ===
          "practice" && (
          <div className="app-shell">
            <Practice
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            MOCK TESTS
        ================================================= */}

        {dashboardSection ===
          "mock-tests" && (
          <div className="app-shell">
            <MockTests
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
              onExamModeChange={
                setExamModeActive
              }
            />

            {!examModeActive && (
              <BottomNavigation
                activeSection={
                  dashboardSection
                }
                onNavigate={
                  openDashboardSection
                }
              />
            )}
          </div>
        )}

        {/* =================================================
            AI COUNSELLOR
        ================================================= */}

        {dashboardSection ===
          "ai-counsellor" && (
          <div className="app-shell">
            <AICounsellor
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        {dashboardSection ===
          "notifications" && (
          <div className="app-shell">
            <Notifications
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}

        {/* =================================================
            SETTINGS
        ================================================= */}

        {dashboardSection ===
          "settings" && (
          <div className="app-shell">
            <Settings
              profile={
                currentProfile
              }
              onBack={() =>
                openDashboardSection(
                  "dashboard"
                )
              }
              onOpenSection={
                openDashboardSection
              }
              onLogout={
                handleLogout
              }
            />

            <BottomNavigation
              activeSection={
                dashboardSection
              }
              onNavigate={
                openDashboardSection
              }
            />
          </div>
        )}
      </>
    );
  }

  return null;
}