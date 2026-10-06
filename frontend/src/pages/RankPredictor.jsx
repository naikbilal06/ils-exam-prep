import React, { useEffect, useMemo, useState } from "react";
import { Capacitor, CapacitorHttp } from "@capacitor/core";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

/* =========================================================
   EXAM DISPLAY DATA
   Active exam still comes from App.jsx.
========================================================= */

const examConfig = {
  neet: {
    id: "neet",
    name: "NEET UG",
    type: "Medical",
    description: "Medical & Dental (MBBS / BDS)",
    aspirants: "2.4M+ Aspirants",
    accent: "#10E79D",
  },
  "jee-main": {
    id: "jee-main",
    name: "JEE Main",
    type: "Engineering",
    description: "NITs, IIITs & State Engineering",
    aspirants: "1.4M+ Aspirants",
    accent: "#22D3EE",
  },
  "jee-advanced": {
    id: "jee-advanced",
    name: "JEE Advanced",
    type: "Engineering",
    description: "Premier IIT Admissions",
    aspirants: "250K+ Qualified",
    accent: "#F59E0B",
  },
  cuet: {
    id: "cuet",
    name: "CUET UG",
    type: "University",
    description: "Central Universities (DU, BHU, JNU)",
    aspirants: "1.9M+ Aspirants",
    accent: "#818CF8",
  },
  "neet-pg": {
    id: "neet-pg",
    name: "NEET PG",
    type: "Medical",
    description: "Post-Graduate MD / MS Admissions",
    aspirants: "200K+ Doctors",
    accent: "#EC4899",
  },
  aiims: {
    id: "aiims",
    name: "AIIMS / INI-CET",
    type: "Medical",
    description: "Premier Medical Institutes",
    aspirants: "Top 1% Percentile",
    accent: "#10E79D",
  },
  nursing: {
    id: "nursing",
    name: "B.Sc Nursing & CET",
    type: "Nursing",
    description: "State & Central Nursing Entrance",
    aspirants: "500K+ Aspirants",
    accent: "#A855F7",
  },
  paramedical: {
    id: "paramedical",
    name: "Paramedical & Allied",
    type: "Paramedical",
    description: "Lab Tech, Radiology & Pharmacy",
    aspirants: "State Level Entrance",
    accent: "#38BDF8",
  },
};

const EXAMS_LIST = Object.values(examConfig);

function ExamIcon({ id, color = "#10E79D" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (id) {
    case "neet":
      return (
        <svg {...common}>
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
          <path d="M12 9v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
        </svg>
      );
    case "jee-main":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case "jee-advanced":
      return (
        <svg {...common}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "cuet":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 10h6" />
          <path d="M9 14h6" />
          <path d="M9 18h6" />
        </svg>
      );
    case "neet-pg":
      return (
        <svg {...common}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
    case "aiims":
      return (
        <svg {...common}>
          <path d="M12 2v20M2 12h20" />
        </svg>
      );
    case "nursing":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "paramedical":
      return (
        <svg {...common}>
          <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
          <path d="m8.5 8.5 7 7" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      );
  }
}

/* =========================================================
   HELPERS
========================================================= */

const formatNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-IN").format(number);
};

const formatPercent = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0%";
  }

  return `${Math.round(number)}%`;
};

const normalizeQuestions = (items) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      let rawOptions = [];
      if (Array.isArray(item?.options)) {
        rawOptions = item.options;
      } else if (item?.options && typeof item.options === "object") {
        rawOptions = Object.entries(item.options).map(([key, text]) => ({
          key: String(key).toUpperCase(),
          text: String(text ?? ""),
        }));
      }

      const options = rawOptions.map(
        (option, index) => {
          if (
            option &&
            typeof option === "object"
          ) {
            return {
              key: String(
                option.key ||
                  String.fromCharCode(65 + index)
              ).toUpperCase(),
              text: String(
                option.text ??
                  option.value ??
                  ""
              ),
            };
          }

          return {
            key: String.fromCharCode(65 + index),
            text: String(option ?? ""),
          };
        }
      );

      return {
        ...item,
        id: String(
          item?.id ??
            item?._id ??
            item?.questionId ??
            ""
        ),
        question: String(
          item?.question ??
            item?.questionText ??
            item?.text ??
            ""
        ),
        options,
      };
    })
    .filter(
      (item) =>
        item.id &&
        item.question &&
        item.options.length > 0
    );
};

/* =========================================================
   COMPONENT
========================================================= */

export default function RankPredictor({
  profile,
  activeExam = "",
  initialExam = "",
  onSelectExam,
  onBack,
  onOpenSection,
}) {
  const [selectedExam, setSelectedExam] = useState(
    activeExam ||
    initialExam ||
    profile?.exams?.[0] ||
    "neet"
  );

  useEffect(() => {
    if (activeExam && activeExam !== selectedExam) {
      setSelectedExam(activeExam);
    }
  }, [activeExam]);

  const handleSelectExam = (examId) => {
    setSelectedExam(examId);
    onSelectExam?.(examId);
  };

  const selectedExamData = useMemo(() => {
    return (
      examConfig[selectedExam] || {
        id: selectedExam,
        name: selectedExam ? selectedExam.toUpperCase() : "Selected Exam",
        type: "Exam",
        description: "Standard Competitive Examination",
        aspirants: "Aspirants Nationwide",
        accent: "#10E79D",
      }
    );
  }, [selectedExam]);

  /*
   * intro
   * test-ready
   * test
   * submitting
   * result
   * error
   */
  const [stage, setStage] = useState(
    "intro"
  );

  const [questions, setQuestions] =
    useState([]);

  const [questionsLoading, setQuestionsLoading] =
    useState(false);

  const [questionsError, setQuestionsError] =
    useState("");

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submissionError, setSubmissionError] =
    useState("");

  const [resultData, setResultData] =
    useState(null);

  const [submitProgress, setSubmitProgress] =
    useState(0);

  /* =========================================================
     KEEP ACTIVE EXAM SYNCHRONIZED
  ========================================================= */

  useEffect(() => {
    /*
     * If user changes active exam somewhere else
     * while Rank Predictor is open, reset the predictor.
     */
    setQuestions([]);
    setAnswers({});
    setCurrentQuestion(0);
    setResultData(null);
    setQuestionsError("");
    setSubmissionError("");
    setSubmitProgress(0);

    if (!selectedExam) {
      setStage("intro");
    }
  }, [selectedExam]);

  /* =========================================================
     COUNTERS
  ========================================================= */

  const answeredCount =
    Object.keys(answers).length;

  const currentQuestionData =
    questions[currentQuestion];

  const questionProgress =
    questions.length > 0
      ? Math.round(
          ((currentQuestion + 1) /
            questions.length) *
            100
        )
      : 0;

  /* =========================================================
     LOAD REAL QUESTIONS
  ========================================================= */

  const requestQuestions = async () => {
    if (!selectedExam) {
      throw new Error(
        "No active exam is selected."
      );
    }

    const params = new URLSearchParams();

    /*
     * This is the important part:
     *
     * The active exam selected in Dashboard
     * is sent directly to the backend.
     */
    params.set(
      "exam",
      selectedExam
    );

    params.set(
      "limit",
      "50"
    );

    params.set(
      "allowPartial",
      "true"
    );

    const url =
      `${API_URL}/api/practice/questions?${params.toString()}`;

    const platform =
      Capacitor.getPlatform();

    if (platform === "web") {
      const response = await fetch(url, {
        method: "GET",
      });

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.message ||
            "Unable to load questions."
        );
      }

      return normalizeQuestions(
        data.questions || []
      );
    }

    const response =
      await CapacitorHttp.get({
        url,
      });

    const data =
      response?.data || {};

    if (
      response?.status < 200 ||
      response?.status >= 300 ||
      !data?.success
    ) {
      throw new Error(
        data?.message ||
          "Unable to load questions."
      );
    }

    return normalizeQuestions(
      data.questions || []
    );
  };

  /* =========================================================
     CONTINUE FROM INTRO
     
     IMPORTANT:
     Continue does NOT start questions.
     
     It takes user to the active-exam test screen.
  ========================================================= */

  const handleContinue = () => {
    if (!selectedExam) {
      setQuestionsError(
        "Please select an active exam first."
      );
      return;
    }

    setQuestionsError("");
    setStage("test-ready");
  };

  /* =========================================================
     START TEST
  ========================================================= */

  const handleStartTest = async () => {
    if (
      !selectedExam ||
      questionsLoading
    ) {
      return;
    }

    setQuestionsLoading(true);
    setQuestionsError("");
    setSubmissionError("");
    setResultData(null);
    setAnswers({});
    setCurrentQuestion(0);

    try {
      const loadedQuestions =
        await requestQuestions();

      if (
        loadedQuestions.length === 0
      ) {
        throw new Error(
          `No questions are currently available for ${selectedExamData.name}.`
        );
      }

      setQuestions(
        loadedQuestions
      );

      setStage("test");
    } catch (error) {
      console.error(
        "Rank Predictor question loading error:",
        error
      );

      setQuestionsError(
        error?.message ||
          "Unable to load questions."
      );
    } finally {
      setQuestionsLoading(false);
    }
  };

  /* =========================================================
     SELECT ANSWER
  ========================================================= */

  const handleAnswer = (
    optionKey
  ) => {
    if (
      !currentQuestionData ||
      isSubmitting
    ) {
      return;
    }

    setAnswers(
      (previous) => ({
        ...previous,
        [currentQuestion]:
          optionKey,
      })
    );
  };

  /* =========================================================
     SUBMIT TO BACKEND
  ========================================================= */

  const submitToBackend =
    async () => {
      const payload = {
        mobile:
          profile?.mobile || "",

        email:
          profile?.email || "",

        googleId:
          profile?.googleId || "",

        /*
         * Rank Predictor is identified separately
         * from normal mock tests.
         */
        testId:
          `rank-predictor-${selectedExam}`,

        testTitle:
          `${selectedExamData.name} Rank Predictor`,

        exam: selectedExam,

        answers:
          questions.map(
            (
              question,
              index
            ) => ({
              questionId:
                String(
                  question.id
                ),
              selectedAnswer:
                answers[
                  index
                ] ?? null,
            })
          ),
      };

      const url =
        `${API_URL}/api/test-results`;

      const platform =
        Capacitor.getPlatform();

      let responseStatus = 200;
      let data = {};

      if (
        platform === "web"
      ) {
        const response =
          await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify(
                payload
              ),
          });

        responseStatus =
          response.status;

        data =
          await response
            .json()
            .catch(() => ({}));
      } else {
        const response =
          await CapacitorHttp.post({
            url,
            headers: {
              "Content-Type":
                "application/json",
            },
            data: payload,
          });

        responseStatus =
          response?.status || 0;

        data =
          response?.data || {};
      }

      if (
        responseStatus < 200 ||
        responseStatus >= 300 ||
        data?.success !== true
      ) {
        throw new Error(
          data?.message ||
            "The server could not calculate the result."
        );
      }

      return (
        data?.result ||
        data?.data ||
        data
      );
    };

  /* =========================================================
     SUBMIT EXAM
  ========================================================= */

  const handleSubmit = async () => {
    if (
      isSubmitting ||
      questions.length === 0
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");
    setSubmitProgress(10);
    setStage("submitting");

    try {
      setSubmitProgress(35);

      const result =
        await submitToBackend();

      setSubmitProgress(75);

      setResultData(
        result
      );

      setSubmitProgress(100);

      window.setTimeout(() => {
        setIsSubmitting(false);
        setStage("result");
      }, 350);
    } catch (error) {
      console.error(
        "Rank Predictor submission error:",
        error
      );

      setSubmissionError(
        error?.message ||
          "Unable to submit the exam."
      );

      setIsSubmitting(false);
      setSubmitProgress(100);
      setStage("error");
    }
  };

  /* =========================================================
     NEXT QUESTION
  ========================================================= */

  const handleNext = () => {
    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) =>
          previous + 1
      );

      return;
    }

    handleSubmit();
  };

  /* =========================================================
     PREVIOUS QUESTION
  ========================================================= */

  const handlePrevious = () => {
    if (
      currentQuestion > 0 &&
      !isSubmitting
    ) {
      setCurrentQuestion(
        (previous) =>
          previous - 1
      );
    }
  };

  /* =========================================================
     RESTART
  ========================================================= */

  const restartPredictor = () => {
    setQuestions([]);
    setAnswers({});
    setCurrentQuestion(0);
    setResultData(null);
    setQuestionsError("");
    setSubmissionError("");
    setSubmitProgress(0);
    setIsSubmitting(false);
    setStage("test-ready");
  };

  /* =========================================================
     RESULT DATA
  ========================================================= */

  const resultScore =
    Number(
      resultData?.score ??
        resultData?.result?.score ??
        0
    );

  const resultCorrect =
    Number(
      resultData?.correct ??
        resultData?.result?.correct ??
        0
    );

  const resultIncorrect =
    Number(
      resultData?.incorrect ??
        resultData?.result?.incorrect ??
        0
    );

  const resultSkipped =
    Number(
      resultData?.skipped ??
        resultData?.result?.skipped ??
        Math.max(
          questions.length -
            answeredCount,
          0
        )
    );

  const resultAccuracy =
    Number(
      resultData?.accuracy ??
        resultData?.result?.accuracy ??
        0
    );

  const resultTotalQuestions =
    Number(
      resultData?.totalQuestions ??
        resultData?.result?.totalQuestions ??
        questions.length
    );

  const estimatedRank =
    resultData?.estimatedRank ??
    resultData?.result?.estimatedRank ??
    null;

  /* =========================================================
     STYLES
  ========================================================= */

  const styles = {
    page: {
      minHeight: "100vh",
      background: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
      fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#FFFFFF",
    },

    shell: {
      width: "100%",
      maxWidth: "430px",
      minHeight: "100vh",
      margin: "0 auto",
      background: "transparent",
      position: "relative",
    },

    header: {
      height: 68,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "0 18px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      background: "rgba(6, 49, 43, 0.85)",
      backdropFilter: "blur(16px)",
      position: "sticky",
      top: 0,
      zIndex: 20,
    },

    backButton: {
      width: 38,
      height: 38,
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.08)",
      color: "#10E79D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: 0,
      flexShrink: 0,
      backdropFilter: "blur(10px)",
      transition: "all 0.15s ease",
    },

    headerTitle: {
      margin: 0,
      fontSize: 18,
      fontWeight: 900,
      color: "#FFFFFF",
    },

    headerExam: {
      marginTop: 2,
      fontSize: 11,
      color: "rgba(226, 232, 240, 0.7)",
      fontWeight: 700,
    },

    content: {
      flex: 1,
      overflowY: "auto",
      padding:
        "18px 16px 150px",
      boxSizing: "border-box",
      scrollPaddingBottom:
        "150px",
    },

    kicker: {
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: "1.2px",
      color: "#10E79D",
      marginBottom: 6,
    },

    title: {
      margin: 0,
      fontSize: 25,
      lineHeight: 1.15,
      fontWeight: 950,
      color: "#FFFFFF",
    },

    subtitle: {
      margin: "8px 0 0",
      fontSize: 13,
      lineHeight: 1.55,
      color: "rgba(226, 232, 240, 0.7)",
    },

    card: {
      marginTop: 18,
      padding: 18,
      borderRadius: 20,
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
      backdropFilter: "blur(14px)",
    },

    badge: {
      display: "inline-flex",
      padding: "6px 9px",
      borderRadius: 9,
      background: "rgba(16, 185, 129, 0.15)",
      color: "#6EE7B7",
      fontSize: 10,
      fontWeight: 900,
      border: "1px solid rgba(52, 211, 153, 0.3)",
    },

    examName: {
      marginTop: 12,
      fontSize: 22,
      fontWeight: 950,
      color: "#FFFFFF",
    },

    examType: {
      marginTop: 4,
      color: "rgba(226, 232, 240, 0.65)",
      fontSize: 12,
      fontWeight: 700,
    },

    infoGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(3, minmax(0, 1fr))",
      gap: 9,
      marginTop: 18,
    },

    infoBox: {
      padding: 12,
      borderRadius: 14,
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(8px)",
    },

    infoValue: {
      fontSize: 15,
      fontWeight: 900,
      color: "#10E79D",
    },

    infoLabel: {
      fontSize: 10.5,
      fontWeight: 700,
      color: "rgba(226, 232, 240, 0.6)",
      marginTop: 3,
    },

    primaryButton: {
      width: "100%",
      minHeight: 52,
      marginTop: 18,
      border: 0,
      borderRadius: 15,
      background: "linear-gradient(135deg, #10E79D, #007050)",
      color: "#010F0E",
      fontSize: 14,
      fontWeight: 900,
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(16, 231, 157, 0.35)",
    },

    secondaryButton: {
      width: "100%",
      minHeight: 48,
      marginTop: 10,
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: 14,
      background: "rgba(255, 255, 255, 0.06)",
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: 850,
      cursor: "pointer",
    },

    error: {
      marginTop: 14,
      padding: "12px 14px",
      borderRadius: 13,
      background: "rgba(255, 94, 98, 0.1)",
      border: "1px solid rgba(255, 94, 98, 0.25)",
      color: "#FF5E62",
      fontSize: 12,
      lineHeight: 1.5,
      fontWeight: 650,
    },

    progressTrack: {
      height: 7,
      borderRadius: 99,
      background: "rgba(255, 255, 255, 0.1)",
      overflow: "hidden",
      marginTop: 15,
    },

    progressBar: {
      height: "100%",
      background: "linear-gradient(90deg, #10E79D, #059669)",
      borderRadius: 99,
      transition: "width 0.2s ease",
    },

    questionNumber: {
      marginTop: 18,
      fontSize: 11,
      fontWeight: 900,
      color: "#10E79D",
      textTransform: "uppercase",
      letterSpacing: "0.7px",
    },

    question: {
      margin: "8px 0 18px",
      fontSize: 19,
      lineHeight: 1.4,
      fontWeight: 850,
      color: "#FFFFFF",
    },

    option: {
      width: "100%",
      textAlign: "left",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: 14,
      padding: "13px 14px",
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 11,
      cursor: "pointer",
      fontSize: 13,
      lineHeight: 1.45,
      color: "#FFFFFF",
      transition: "all 0.2s ease",
    },

    optionSelected: {
      border: "1.5px solid #10E79D",
      background: "rgba(16, 231, 157, 0.12)",
      color: "#10E79D",
    },

    optionKey: {
      width: 30,
      height: 30,
      borderRadius: 10,
      background: "rgba(255, 255, 255, 0.08)",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 11,
      fontWeight: 900,
      flexShrink: 0,
    },

    optionKeySelected: {
      background: "#10E79D",
      color: "#010F0E",
    },

    footerButtons: {
      display: "flex",
      gap: 9,
      marginTop: 18,
    },

    previousButton: {
      flex: 1,
      minHeight: 48,
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: 14,
      background: "rgba(255, 255, 255, 0.06)",
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: 850,
      cursor: "pointer",
    },

    nextButton: {
      flex: 1.3,
      minHeight: 48,
      border: 0,
      borderRadius: 14,
      background: "linear-gradient(135deg, #10E79D, #007050)",
      color: "#010F0E",
      fontSize: 13,
      fontWeight: 900,
      cursor: "pointer",
    },

    center: {
      minHeight: "55vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 20,
    },

    resultHero: {
      marginTop: 16,
      padding: 22,
      borderRadius: 22,
      background: "linear-gradient(135deg, #06312B, #031D1B)",
      border: "1px solid rgba(16, 231, 157, 0.3)",
      color: "#FFFFFF",
      textAlign: "center",
      boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
    },

    resultLabel: {
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: "1px",
      color: "#10E79D",
    },

    resultRank: {
      marginTop: 7,
      fontSize: 34,
      fontWeight: 950,
      color: "#FFFFFF",
    },

    resultNote: {
      marginTop: 7,
      fontSize: 11,
      lineHeight: 1.45,
      color: "rgba(226, 232, 240, 0.8)",
    },

    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: 10,
      marginTop: 14,
    },

    statCard: {
      padding: 15,
      borderRadius: 15,
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },

    statValue: {
      fontSize: 20,
      fontWeight: 950,
      color: "#10E79D",
    },

    statLabel: {
      marginTop: 4,
      fontSize: 10,
      color: "rgba(226, 232, 240, 0.65)",
      fontWeight: 700,
    },
  };

  /* =========================================================
     HEADER
  ========================================================= */

  const handleHeaderBack = () => {
    if (stage === "test-ready") {
      setStage("intro");
      setQuestionsError("");
      return;
    }

    if (stage === "test") {
      if (
        window.confirm(
          "Are you sure you want to exit the test? Your current progress will not be saved."
        )
      ) {
        setStage("intro");
      }
      return;
    }

    if (stage === "result") {
      setStage("intro");
      return;
    }

    onBack?.();
  };

  const Header = () => (
    <header
      style={styles.header}
    >
      <button
        type="button"
        style={styles.backButton}
        onClick={handleHeaderBack}
        aria-label="Back"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10E79D"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </button>

      <div>
        <h1
          style={styles.headerTitle}
        >
          Rank Predictor
        </h1>

        {selectedExam && (
          <div
            style={
              styles.headerExam
            }
          >
            {selectedExamData.name}
          </div>
        )}
      </div>
    </header>
  );

  /* =========================================================
     SCREEN 1
     RANK PREDICTOR INTRO
  ========================================================= */

  if (stage === "intro") {
    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.shell}
        >
          <Header />

          <main
            style={styles.content}
          >
            <div
              style={styles.kicker}
            >
              RANK PREDICTOR
            </div>

            <h2
              style={styles.title}
            >
              Predict your rank
            </h2>

            <p
              style={styles.subtitle}
            >
              Select your exam to take a diagnostic test and calculate your real-time estimated rank and percentile.
            </p>

            {/* All Exams List from Exam Selection */}
            <div style={{ marginTop: 22 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: "1px",
                    color: "#10E79D",
                    textTransform: "uppercase",
                  }}
                >
                  Choose Exam ({EXAMS_LIST.length})
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    color: "rgba(226, 232, 240, 0.6)",
                    fontWeight: 600,
                  }}
                >
                  Tap to switch
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {EXAMS_LIST.map((item) => {
                  const isSelected = selectedExam === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectExam(item.id)}
                      style={{
                        width: "100%",
                        padding: "13px 14px",
                        borderRadius: 18,
                        background: isSelected
                          ? "linear-gradient(135deg, rgba(16, 231, 157, 0.16) 0%, rgba(6, 49, 43, 0.5) 100%)"
                          : "rgba(255, 255, 255, 0.04)",
                        border: isSelected
                          ? "1.5px solid #10E79D"
                          : "1px solid rgba(255, 255, 255, 0.09)",
                        boxShadow: isSelected
                          ? "0 8px 24px rgba(16, 231, 157, 0.2)"
                          : "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxSizing: "border-box",
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 13,
                          background: isSelected
                            ? "rgba(16, 231, 157, 0.2)"
                            : "rgba(255, 255, 255, 0.06)",
                          border: `1px solid ${isSelected ? "rgba(16, 231, 157, 0.35)" : "rgba(255, 255, 255, 0.1)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: isSelected ? "#10E79D" : item.accent,
                        }}
                      >
                        <ExamIcon id={item.id} color={isSelected ? "#10E79D" : item.accent} />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14.5,
                              fontWeight: 900,
                              color: "#FFFFFF",
                            }}
                          >
                            {item.name}
                          </span>
                          {isSelected && (
                            <span
                              style={{
                                padding: "2px 7px",
                                borderRadius: 6,
                                background: "#10E79D",
                                color: "#010F0E",
                                fontSize: 8.5,
                                fontWeight: 900,
                                letterSpacing: "0.5px",
                              }}
                            >
                              ACTIVE
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            marginTop: 3,
                            fontSize: 11,
                            color: "rgba(226, 232, 240, 0.65)",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.description}
                        </div>

                        <div
                          style={{
                            marginTop: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 10,
                            color: item.accent,
                            fontWeight: 700,
                          }}
                        >
                          <span>{item.aspirants}</span>
                          <span style={{ opacity: 0.35 }}>•</span>
                          <span style={{ color: "rgba(226, 232, 240, 0.55)" }}>{item.type}</span>
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          border: isSelected ? "2px solid #10E79D" : "2px solid rgba(255, 255, 255, 0.22)",
                          background: isSelected ? "#10E79D" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#010F0E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Exam Summary & Continue Action */}
            <div
              style={{
                marginTop: 22,
                borderRadius: 22,
                padding: 18,
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(16, 231, 157, 0.25)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={styles.badge}
                >
                  TARGET EXAM
                </span>

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#10E79D",
                  }}
                >
                  {selectedExamData.type}
                </span>
              </div>

              <div
                style={{
                  marginTop: 10,
                  fontSize: 22,
                  fontWeight: 950,
                  color: "#FFFFFF",
                }}
              >
                {selectedExamData.name}
              </div>

              <div
                style={styles.infoGrid}
              >
                <div
                  style={styles.infoBox}
                >
                  <div
                    style={styles.infoValue}
                  >
                    Real
                  </div>

                  <div
                    style={styles.infoLabel}
                  >
                    Questions
                  </div>
                </div>

                <div
                  style={styles.infoBox}
                >
                  <div
                    style={styles.infoValue}
                  >
                    Active
                  </div>

                  <div
                    style={styles.infoLabel}
                  >
                    Exam
                  </div>
                </div>

                <div
                  style={styles.infoBox}
                >
                  <div
                    style={styles.infoValue}
                  >
                    Dynamic
                  </div>

                  <div
                    style={styles.infoLabel}
                  >
                    Result
                  </div>
                </div>
              </div>

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onClick={
                  handleContinue
                }
              >
                <span>Continue with {selectedExamData.name}</span>
                <span style={{ fontSize: 16 }}>→</span>
              </button>
            </div>

            {questionsError && (
              <div
                style={styles.error}
              >
                {questionsError}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     SCREEN 2
     ACTIVE EXAM TEST READY
  ========================================================= */

  if (
    stage === "test-ready"
  ) {
    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.shell}
        >
          <Header />

          <main
            style={styles.content}
          >
            <div
              style={styles.kicker}
            >
              TEST READY
            </div>

            <h2
              style={styles.title}
            >
              {selectedExamData.name}
            </h2>

            <p
              style={styles.subtitle}
            >
              Your active exam has been
              selected automatically. The
              questions below will be loaded
              from the question bank for
              this exam.
            </p>

            <div
              style={styles.card}
            >
              <span
                style={styles.badge}
              >
                ACTIVE EXAM
              </span>

              <div
                style={styles.examName}
              >
                {selectedExamData.name}
              </div>

              <div
                style={styles.examType}
              >
                {selectedExamData.type}
              </div>

              <div
                style={{
                  marginTop: 16,
                  padding: "13px 15px",
                  borderRadius: 14,
                  background:
                    "rgba(255, 255, 255, 0.05)",
                  border:
                    "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: 12,
                  lineHeight: 1.55,
                  color:
                    "rgba(226, 232, 240, 0.75)",
                }}
              >
                <strong
                  style={{
                    color:
                      "#10E79D",
                  }}
                >
                  Important:
                </strong>{" "}
                Once you start the test,
                answer the questions and
                submit the exam to calculate
                your rank prediction.
              </div>

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  ...(questionsLoading
                    ? {
                        opacity: 0.55,
                        cursor:
                          "not-allowed",
                      }
                    : {}),
                }}
                disabled={
                  questionsLoading
                }
                onClick={
                  handleStartTest
                }
              >
                {questionsLoading
                  ? "Loading Questions..."
                  : "Start Test"}
              </button>

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={() =>
                  setStage("intro")
                }
              >
                Back
              </button>
            </div>

            {questionsError && (
              <div
                style={styles.error}
              >
                {questionsError}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     SCREEN 3
     QUESTIONS
  ========================================================= */

  if (stage === "test") {
    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.shell}
        >
          <Header />

          <main
            style={styles.content}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >
              <span
                style={
                  styles.questionNumber
                }
              >
                Question{" "}
                {currentQuestion +
                  1}{" "}
                /{" "}
                {questions.length}
              </span>

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color:
                    "#7A8782",
                }}
              >
                {answeredCount} answered
              </span>
            </div>

            <div
              style={
                styles.progressTrack
              }
            >
              <div
                style={{
                  ...styles.progressBar,
                  width: `${questionProgress}%`,
                }}
              />
            </div>

            {currentQuestionData && (
              <>
                <div
                  style={
                    styles.question
                  }
                >
                  {
                    currentQuestionData.question
                  }
                </div>

                {currentQuestionData.options.map(
                  (option) => {
                    const selected =
                      answers[
                        currentQuestion
                      ] ===
                      option.key;

                    return (
                      <button
                        key={
                          option.key
                        }
                        type="button"
                        onClick={() =>
                          handleAnswer(
                            option.key
                          )
                        }
                        style={{
                          ...styles.option,
                          ...(selected
                            ? styles.optionSelected
                            : {}),
                        }}
                      >
                        <span
                          style={{
                            ...styles.optionKey,
                            ...(selected
                              ? styles.optionKeySelected
                              : {}),
                          }}
                        >
                          {
                            option.key
                          }
                        </span>

                        <span>
                          {
                            option.text
                          }
                        </span>
                      </button>
                    );
                  }
                )}

                <div
                  style={
                    styles.footerButtons
                  }
                >
                  <button
                    type="button"
                    style={{
                      ...styles.previousButton,
                      opacity:
                        currentQuestion ===
                        0
                          ? 0.45
                          : 1,
                    }}
                    disabled={
                      currentQuestion ===
                      0
                    }
                    onClick={
                      handlePrevious
                    }
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    style={
                      styles.nextButton
                    }
                    disabled={
                      isSubmitting
                    }
                    onClick={
                      handleNext
                    }
                  >
                    {currentQuestion ===
                    questions.length -
                      1
                      ? "Submit Exam"
                      : "Next"}
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     SCREEN 4
     SUBMITTING
  ========================================================= */

  if (
    stage === "submitting"
  ) {
    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.shell}
        >
          <Header />

          <main
            style={styles.content}
          >
            <div
              style={styles.center}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius:
                      "50%",
                    border:
                      "4px solid #DCEBE4",
                    borderTopColor:
                      "#007050",
                    animation:
                      "rankPredictorSpin 0.8s linear infinite",
                    margin:
                      "0 auto 14px",
                  }}
                />

                <h2
                  style={{
                    margin:
                      "0 0 7px",
                    fontSize: 20,
                    fontWeight: 900,
                  }}
                >
                  Submitting exam
                </h2>

                <p
                  style={{
                    margin: 0,
                    color:
                      "#75817C",
                    fontSize: 12,
                  }}
                >
                  Evaluating your
                  performance...
                </p>

                <div
                  style={
                    styles.progressTrack
                  }
                >
                  <div
                    style={{
                      ...styles.progressBar,
                      width: `${submitProgress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     SCREEN 5
     ERROR
  ========================================================= */

  if (stage === "error") {
    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.shell}
        >
          <Header />

          <main
            style={styles.content}
          >
            <div
              style={styles.center}
            >
              <div>
                <div
                  style={{
                    fontSize: 40,
                    marginBottom: 10,
                  }}
                >
                  ⚠️
                </div>

                <h2
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 900,
                  }}
                >
                  Submission failed
                </h2>

                <div
                  style={styles.error}
                >
                  {submissionError}
                </div>

                <button
                  type="button"
                  style={
                    styles.primaryButton
                  }
                  onClick={
                    handleSubmit
                  }
                >
                  Try Again
                </button>

                <button
                  type="button"
                  style={
                    styles.secondaryButton
                  }
                  onClick={
                    restartPredictor
                  }
                >
                  Start Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* =========================================================
     SCREEN 6
     RESULT / RANK PREDICTION
  ========================================================= */

  if (stage === "result") {
    return (
      <div
        style={styles.page}
      >
        <div
          style={styles.shell}
        >
          <Header />

          <main
            style={styles.content}
          >
            <div
              style={styles.kicker}
            >
              RANK PREDICTION
            </div>

            <h2
              style={styles.title}
            >
              Your result
            </h2>

            <p
              style={styles.subtitle}
            >
              Your performance has been
              evaluated for{" "}
              <strong>
                {selectedExamData.name}
              </strong>
              .
            </p>

            <div
              style={
                styles.resultHero
              }
            >
              <div
                style={
                  styles.resultLabel
                }
              >
                ESTIMATED RANK
              </div>

              <div
                style={
                  styles.resultRank
                }
              >
                {estimatedRank !==
                null
                  ? `#${formatNumber(
                      estimatedRank
                    )}`
                  : "Not available"}
              </div>

              <div
                style={
                  styles.resultNote
                }
              >
                This is an estimated rank
                generated from your test
                performance. It is not an
                official examination rank.
              </div>
            </div>

            <div
              style={
                styles.statsGrid
              }
            >
              <div
                style={
                  styles.statCard
                }
              >
                <div
                  style={
                    styles.statValue
                  }
                >
                  {formatNumber(
                    resultScore
                  )}
                </div>

                <div
                  style={
                    styles.statLabel
                  }
                >
                  Score
                </div>
              </div>

              <div
                style={
                  styles.statCard
                }
              >
                <div
                  style={
                    styles.statValue
                  }
                >
                  {formatPercent(
                    resultAccuracy
                  )}
                </div>

                <div
                  style={
                    styles.statLabel
                  }
                >
                  Accuracy
                </div>
              </div>

              <div
                style={
                  styles.statCard
                }
              >
                <div
                  style={
                    styles.statValue
                  }
                >
                  {resultCorrect}
                </div>

                <div
                  style={
                    styles.statLabel
                  }
                >
                  Correct
                </div>
              </div>

              <div
                style={
                  styles.statCard
                }
              >
                <div
                  style={
                    styles.statValue
                  }
                >
                  {resultIncorrect}
                </div>

                <div
                  style={
                    styles.statLabel
                  }
                >
                  Incorrect
                </div>
              </div>

              <div
                style={
                  styles.statCard
                }
              >
                <div
                  style={
                    styles.statValue
                  }
                >
                  {resultSkipped}
                </div>

                <div
                  style={
                    styles.statLabel
                  }
                >
                  Skipped
                </div>
              </div>

              <div
                style={
                  styles.statCard
                }
              >
                <div
                  style={
                    styles.statValue
                  }
                >
                  {resultTotalQuestions}
                </div>

                <div
                  style={
                    styles.statLabel
                  }
                >
                  Questions
                </div>
              </div>
            </div>

            <button
              type="button"
              style={
                styles.primaryButton
              }
              onClick={
                restartPredictor
              }
            >
              Take Test Again
            </button>

            <button
              type="button"
              style={
                styles.secondaryButton
              }
              onClick={() =>
                onBack?.()
              }
            >
              Back to Dashboard
            </button>
          </main>
        </div>
      </div>
    );
  }

  return null;
}