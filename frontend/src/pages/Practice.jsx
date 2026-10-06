import React, { useState } from "react";
import { Capacitor, CapacitorHttp } from "@capacitor/core";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const C = {
  green: "#10E79D",
  navy: "#FFFFFF",
  mint: "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
  softMint: "rgba(16, 231, 157, 0.12)",
  white: "rgba(255, 255, 255, 0.05)",
  muted: "rgba(226, 232, 240, 0.65)",
  border: "rgba(255, 255, 255, 0.12)",
  red: "#FF5E62",
  blue: "#38BDF8",
};

const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚛",
    color: C.blue,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "⚗",
    color: "#7652C8",
  },
  {
    id: "biology",
    name: "Biology",
    icon: "✦",
    color: C.green,
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: "Σ",
    color: "#7652C8",
  },
  {
    id: "english",
    name: "English",
    icon: "A",
    color: "#C78A13",
  },
  {
    id: "general-test",
    name: "General Test",
    icon: "▦",
    color: "#3867C7",
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

    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),

    check: (
      <path d="M5 12.5l4.2 4.2L19 7" />
    ),

    target: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle
          cx="12"
          cy="12"
          r="1.5"
          fill={stroke}
        />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Practice({
  profile,
  onBack,
  onOpenSection,
}) {
  const [stage, setStage] = useState("subject");

  const [selectedSubject, setSelectedSubject] =
    useState(null);

  const [mode, setMode] = useState(null);

  const [selectedExam, setSelectedExam] =
    useState(profile?.exams?.[0] || "neet");

  const [selectedChapter, setSelectedChapter] =
    useState("");

  const [selectedDifficulty, setSelectedDifficulty] =
    useState("Mixed");

  const [questionLimit, setQuestionLimit] =
    useState("10");

  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState(null);

  const [answered, setAnswered] = useState(false);

  const [answers, setAnswers] = useState([]);

  const [loadingQuestions, setLoadingQuestions] =
    useState(false);

  const [loadingAnswer, setLoadingAnswer] =
    useState(false);

  const [questionError, setQuestionError] =
    useState("");

  const [answerError, setAnswerError] =
    useState("");

  const [currentAnswerResult, setCurrentAnswerResult] =
    useState(null);

  const [saving, setSaving] = useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [bookmarkIds, setBookmarkIds] =
    useState(() => new Set());

  const [savedLoading, setSavedLoading] =
    useState(false);

  const currentQuestion =
    questions[currentIndex];

  const selectedSubjectData = subjects.find(
    (item) => item.id === selectedSubject
  );

  const getIdentityParams = () => {
    const params = new URLSearchParams();
    if (profile?.mobile) params.set("mobile", profile.mobile);
    if (profile?.email) params.set("email", profile.email);
    if (profile?.googleId) params.set("googleId", profile.googleId);
    return params;
  };

  const loadBookmarkIds = async () => {
    const params = getIdentityParams();
    const response = await fetch(
      `${API_URL}/api/bookmarks?${params.toString()}`
    );
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success) {
      throw new Error(data?.message || "Unable to load bookmarks.");
    }
    setBookmarkIds(
      new Set(
        (data.bookmarks || []).map((item) =>
          String(item.questionId)
        )
      )
    );
  };

  const normalizeQuestion = (question, exam) => ({
    id: String(
      question.questionId ||
      question.id ||
      question._id ||
      ""
    ),
    questionId: String(
      question.questionId ||
      question.id ||
      question._id ||
      ""
    ),
    question:
      question.questionText ||
      question.question ||
      "",
    options: Array.isArray(question.options)
      ? question.options.map((option, index) =>
          option && typeof option === "object"
            ? {
                key: String(
                  option.key ||
                  String.fromCharCode(65 + index)
                ).toUpperCase(),
                text: String(
                  option.text ??
                  option.value ??
                  ""
                ),
              }
            : {
                key: String.fromCharCode(65 + index),
                text: String(option ?? ""),
              }
        )
      : question.options &&
          typeof question.options === "object"
        ? Object.entries(question.options).map(
            ([key, value]) => ({
              key: String(key).toUpperCase(),
              text: String(value ?? ""),
            })
          )
        : [],
    explanation: question.explanation || "",
    exam: question.exam || exam,
    testId: question.testId || "",
    subjectId: question.subjectId || selectedSubject || "",
    subjectName:
      question.subjectName ||
      selectedSubjectData?.name ||
      selectedSubject ||
      "",
    chapterId: question.chapterId || "",
    chapterName: question.chapterName || "",
    difficulty: question.difficulty || "Medium",
    marks: Number(question.marks) || 4,
    negativeMarks: Number(question.negativeMarks) || 1,
  });

  const loadSavedQuestions = async (type) => {
    try {
      setSavedLoading(true);
      setQuestionError("");
      const params = getIdentityParams();
      params.set("type", type);
      const response = await fetch(
        `${API_URL}/api/practice/saved?${params.toString()}`
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to load saved questions.");
      }
      const exam = profile?.exams?.[0] || "neet";
      const loaded = (data.questions || []).map((question) =>
        normalizeQuestion(question, exam)
      );
      setQuestions(loaded);
      setAnswers([]);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnswered(false);
      setCurrentAnswerResult(null);
      setSelectedSubject(null);
      setMode(type);
      setStage(loaded.length ? "questions" : "subject");
      if (!loaded.length) {
        setQuestionError(
          type === "wrong"
            ? "No wrong questions yet. Complete a test to build your revision list."
            : "No bookmarked questions yet."
        );
      }
    } catch (error) {
      console.error("Saved questions error:", error);
      setQuestionError("Unable to load your questions right now.");
    } finally {
      setSavedLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (!currentQuestion?.questionId) return;
    const questionId = currentQuestion.questionId;
    const isBookmarked = bookmarkIds.has(questionId);
    const params = getIdentityParams();

    try {
      const response = await fetch(
        `${API_URL}/api/bookmarks`,
        {
          method: isBookmarked ? "DELETE" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: profile?.mobile || "",
            email: profile?.email || "",
            googleId: profile?.googleId || "",
            questionId,
            exam: currentQuestion.exam,
          }),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to update bookmark.");
      }
      setBookmarkIds((previous) => {
        const next = new Set(previous);
        if (isBookmarked) next.delete(questionId);
        else next.add(questionId);
        return next;
      });
    } catch (error) {
      setAnswerError(error.message || "Unable to update bookmark.");
    }
  };

  const correctCount = answers.filter(
    (item) => item.correct === true
  ).length;

  const incorrectCount = answers.filter(
    (item) => item.correct === false
  ).length;

  const skippedCount = answers.filter(
    (item) => item.selected === null
  ).length;

  const score = answers.reduce(
    (total, item) => {
      if (item.correct === true) {
        return total + item.marks;
      }

      if (item.correct === false) {
        return (
          total - item.negativeMarks
        );
      }

      return total;
    },
    0
  );

  const chooseSubject = (subjectId) => {
    setSelectedSubject(subjectId);
    setMode(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswers([]);
    setQuestionError("");
    setAnswerError("");
    setCurrentAnswerResult(null);
    setSaveMessage("");
    setStage("mode");
  };

  const startPractice = async () => {
    if (!selectedSubject || !mode) {
      return;
    }

    try {
      setLoadingQuestions(true);
      setQuestionError("");
      setQuestions([]);
      setAnswers([]);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setAnswered(false);
      setCurrentAnswerResult(null);
      setSaveMessage("");

      const exam = selectedExam || "neet";
      const limit = Math.max(
        1,
        Number(questionLimit) || 10
      );

      const params = new URLSearchParams({
        exam: exam.toLowerCase(),
        subject: selectedSubject,
        difficulty: selectedDifficulty,
        limit: String(limit),
      });

      if (selectedChapter.trim()) {
        params.set("chapter", selectedChapter.trim());
      }

      if (import.meta.env.DEV) {
        params.set("allowPartial", "true");
      }

      const url =
        `${API_URL}/api/practice/questions?${params}`;

      let response;
      let data;

      if (Capacitor.getPlatform() === "web") {
        response = await fetch(url);
        data = await response.json().catch(() => ({}));
      } else {
        response = await CapacitorHttp.get({ url });
        data = response?.data || {};
      }

      const status = response?.status || 200;
      if (status < 200 || status >= 300 || !data.success) {
        throw new Error(
          data.message ||
            "Unable to load practice questions."
        );
      }

      if (
        !Array.isArray(data.questions) ||
        data.questions.length === 0
      ) {
        throw new Error(
          "No practice questions are available for this subject yet."
        );
      }

      const normalizedQuestions =
        data.questions.map((question) =>
          normalizeQuestion(question, exam)
        ).filter(
          (question) =>
            question.questionId &&
            question.question &&
            question.options.length >= 2
        );

      setQuestions(normalizedQuestions);
      if (normalizedQuestions.length < limit) {
        setQuestionError(
          `${normalizedQuestions.length} real questions are available for this selection.`
        );
      }
      await loadBookmarkIds().catch((error) => {
        console.warn("Bookmark loading error:", error);
      });
      setStage("questions");
    } catch (error) {
      console.error(
        "Practice questions error:",
        error
      );

      setQuestionError(
        error.message ||
          "Unable to load practice questions."
      );
    } finally {
      setLoadingQuestions(false);
    }
  };

  const checkAnswer = async () => {
    if (
      selectedAnswer === null ||
      answered ||
      !currentQuestion ||
      loadingAnswer
    ) {
      return;
    }

    try {
      setLoadingAnswer(true);
      setAnswerError("");

      const response = await fetch(
        `${API_URL}/api/practice/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            questionId:
              currentQuestion.questionId,
            selectedAnswer,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to verify answer."
        );
      }

      const result = {
        questionId:
          currentQuestion.questionId,
        selected: selectedAnswer,
        selectedIndex: selectedAnswer,
        selectedKey:
          data.selectedAnswer,
        correctKey:
          data.correctAnswer,
        explanation:
          data.explanation || "",
        correct:
          data.isCorrect === true,
        marks:
          Number(data.marks) ||
          currentQuestion.marks ||
          4,
        negativeMarks:
          Number(data.negativeMarks) ||
          currentQuestion.negativeMarks ||
          1,
      };

      setCurrentAnswerResult(data);
      setAnswered(true);

      setAnswers((current) => {
        const next = [...current];
        next[currentIndex] = result;
        return next;
      });
    } catch (error) {
      console.error(
        "Answer verification error:",
        error
      );

      setAnswerError(
        error.message ||
          "Unable to verify answer."
      );
    } finally {
      setLoadingAnswer(false);
    }
  };

  const nextQuestion = () => {
    if (!answered) {
      return;
    }

    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (current) => current + 1
      );

      const nextAnswer =
        answers[currentIndex + 1];
      setSelectedAnswer(
        nextAnswer?.selectedIndex ?? null
      );
      setAnswered(Boolean(nextAnswer));
      setAnswerError("");
      setCurrentAnswerResult(
        nextAnswer
          ? {
              isCorrect: nextAnswer.correct,
              selectedAnswer: nextAnswer.selectedKey,
              correctAnswer: nextAnswer.correctKey,
            }
          : null
      );

      return;
    }

    setStage("result");
  };

  const saveResult = async () => {
    if (saving) {
      return;
    }

    const mobile =
      profile?.mobile || "";

    if (!mobile) {
      setSaveMessage(
        "Student mobile number is missing."
      );
      return;
    }

    const totalQuestions =
      questions.length;

    const resultSubjectId =
      selectedSubject ||
      currentQuestion?.subjectId ||
      "saved";

    const resultSubjectName =
      selectedSubjectData?.name ||
      currentQuestion?.subjectName ||
      "Saved Questions";

    const attempted =
      answers.filter(
        (item) =>
          item.selected !== null
      ).length;

    const finalCorrect =
      answers.filter(
        (item) =>
          item.correct === true
      ).length;

    const finalIncorrect =
      answers.filter(
        (item) =>
          item.correct === false
      ).length;

    const finalSkipped =
      questions.length -
      answers.length;

    const totalMarks =
      questions.reduce(
        (total, question) =>
          total +
          (Number(question.marks) || 4),
        0
      );

    const finalScore =
      answers.reduce(
        (total, item) => {
          if (item.correct === true) {
            return (
              total +
              (Number(item.marks) || 4)
            );
          }

          if (item.correct === false) {
            return (
              total -
              (Number(item.negativeMarks) || 1)
            );
          }

          return total;
        },
        0
      );

    const accuracy =
      attempted > 0
        ? Number(
            (
              (finalCorrect /
                attempted) *
              100
            ).toFixed(2)
          )
        : 0;

    try {
      setSaving(true);
      setSaveMessage("");

      const response = await fetch(
        `${API_URL}/api/test-results`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            mobile,

            testId:
              `practice-${selectedSubject}-${Date.now()}`,

            testTitle:
              `${resultSubjectName} Practice`,

            exam:
              profile?.exams?.[0] ||
              "neet",

            totalQuestions,

            attempted,

            correct:
              finalCorrect,

            incorrect:
              finalIncorrect,

            skipped:
              finalSkipped,

            score:
              finalScore,

            totalMarks,

            accuracy,

            estimatedRank:
              null,

            answers: questions.map(
              (question, index) => {
                const item = answers[index];
                return {
                  questionId: question.questionId,
                  selectedAnswer: item
                    ? item.selectedKey || item.selected
                    : null,
                  correctAnswer: item?.correctKey || null,
                  isCorrect: item?.correct === true,
                  isSkipped: !item,
                };
              }
            ),

            subjectResults: [
              {
                subjectId:
                  resultSubjectId,

                totalQuestions,

                attempted,

                correct:
                  finalCorrect,

                incorrect:
                  finalIncorrect,

                skipped:
                  finalSkipped,

                score:
                  finalScore,

                accuracy,
              },
            ],

            chapterResults:
              questions.map(
                (question) => ({
                  chapterId:
                    question.chapterId,

                  chapterName:
                    question.chapterName ||
                    "Practice",

                  subjectId:
                    question.subjectId ||
                    resultSubjectId,

                  subjectName:
                    question.subjectName,

                  totalQuestions: 1,

                  attempted: 0,

                  correct: 0,

                  incorrect: 0,

                  skipped: 0,

                  score: 0,

                  accuracy: 0,
                })
              ),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to save result."
        );
      }

      setSaveMessage(
        "Practice result saved successfully."
      );
    } catch (error) {
      console.error(
        "Practice result save error:",
        error
      );

      setSaveMessage(
        error.message ||
          "Unable to save result."
      );
    } finally {
      setSaving(false);
    }
  };

  const resetPractice = () => {
    setStage("subject");
    setSelectedSubject(null);
    setMode(null);
    setSelectedChapter("");
    setSelectedDifficulty("Mixed");
    setQuestionLimit("10");
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswers([]);
    setLoadingQuestions(false);
    setLoadingAnswer(false);
    setQuestionError("");
    setAnswerError("");
    setCurrentAnswerResult(null);
    setSaving(false);
    setSaveMessage("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.mobileShell}>
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <button
              type="button"
              style={styles.backButton}
              onClick={onBack}
            >
              <Icon
                name="back"
                size={20}
              />
            </button>

            <div style={styles.brandWrap}>
              <div style={styles.brand}>
                ILS RANKER
              </div>

              <div style={styles.tagline}>
                KNOW YOUR POTENTIAL
              </div>
            </div>

            <div style={styles.headerLabel}>
              Practice
            </div>
          </div>
        </header>

        <main style={styles.container}>
          {stage === "subject" && (
            <>
              <div style={styles.kicker}>
                PRACTICE
              </div>

              <h1 style={styles.title}>
                Practice Weak Areas
              </h1>

              <p style={styles.subtitle}>
                Choose a subject and start
                solving focused practice
                questions.
              </p>

              <section
                style={styles.infoCard}
              >
                <div
                  style={styles.infoIcon}
                >
                  <Icon
                    name="target"
                    size={20}
                    stroke={C.green}
                  />
                </div>

                <div>
                  <div
                    style={styles.infoTitle}
                  >
                    Smart Practice
                  </div>

                  <div
                    style={styles.infoText}
                  >
                    Questions are loaded
                    directly from your
                    practice question database.
                  </div>
                </div>
              </section>

              <div style={styles.savedActions}>
                <button
                  type="button"
                  style={styles.savedButton}
                  disabled={savedLoading}
                  onClick={() =>
                    loadSavedQuestions("bookmarks")
                  }
                >
                  Bookmarked Questions
                </button>

                <button
                  type="button"
                  style={styles.savedButton}
                  disabled={savedLoading}
                  onClick={() =>
                    loadSavedQuestions("wrong")
                  }
                >
                  Wrong Questions
                </button>
              </div>

              {questionError && (
                <div style={styles.errorCard}>
                  {questionError}
                </div>
              )}

              <div
                style={styles.sectionTitle}
              >
                Select Subject
              </div>

              <div
                style={styles.subjectGrid}
              >
                {subjects.map(
                  (subject) => (
                    <button
                      type="button"
                      key={subject.id}
                      style={
                        styles.subjectCard
                      }
                      onClick={() =>
                        chooseSubject(
                          subject.id
                        )
                      }
                    >
                      <div
                        style={{
                          ...styles.subjectIcon,
                          color:
                            subject.color,
                        }}
                      >
                        {subject.icon}
                      </div>

                      <div
                        style={
                          styles.subjectName
                        }
                      >
                        {subject.name}
                      </div>

                      <div
                        style={
                          styles.subjectArrow
                        }
                      >
                        →
                      </div>
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {stage === "mode" && (
            <>
              <div style={styles.kicker}>
                PRACTICE MODE
              </div>

              <h1 style={styles.title}>
                Choose Practice Mode
              </h1>

              <p style={styles.subtitle}>
                Select how you want to
                practice{" "}
                <strong>
                  {selectedSubjectData?.name}
                </strong>
                .
              </p>

              <div style={styles.modeList}>
                <button
                  type="button"
                  style={{
                    ...styles.modeCard,
                    ...(mode === "weak"
                      ? styles.modeCardActive
                      : {}),
                  }}
                  onClick={() =>
                    setMode("weak")
                  }
                >
                  <div
                    style={
                      styles.modeNumber
                    }
                  >
                    01
                  </div>

                  <div
                    style={
                      styles.modeBody
                    }
                  >
                    <div
                      style={
                        styles.modeTitle
                      }
                    >
                      Weak Areas
                    </div>

                    <div
                      style={
                        styles.modeText
                      }
                    >
                      Practice questions
                      focused on
                      improvement areas.
                    </div>
                  </div>

                  <span
                    style={
                      styles.modeArrow
                    }
                  >
                    →
                  </span>
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.modeCard,
                    ...(mode === "mixed"
                      ? styles.modeCardActive
                      : {}),
                  }}
                  onClick={() =>
                    setMode("mixed")
                  }
                >
                  <div
                    style={
                      styles.modeNumber
                    }
                  >
                    02
                  </div>

                  <div
                    style={
                      styles.modeBody
                    }
                  >
                    <div
                      style={
                        styles.modeTitle
                      }
                    >
                      Mixed Practice
                    </div>

                    <div
                      style={
                        styles.modeText
                      }
                    >
                      Mix different
                      questions for
                      balanced preparation.
                    </div>
                  </div>

                  <span
                    style={
                      styles.modeArrow
                    }
                  >
                    →
                  </span>
                </button>
              </div>

              <div style={styles.practiceFilters}>
                <label style={styles.filterLabel}>
                  Exam
                  <select
                    value={selectedExam}
                    onChange={(event) =>
                      setSelectedExam(event.target.value)
                    }
                    style={styles.filterSelect}
                  >
                    {(profile?.exams?.length
                      ? profile.exams
                      : ["neet"]
                    ).map((exam) => (
                      <option key={exam} value={exam}>
                        {String(exam).toUpperCase()}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={styles.filterLabel}>
                  Difficulty
                  <select
                    value={selectedDifficulty}
                    onChange={(event) =>
                      setSelectedDifficulty(event.target.value)
                    }
                    style={styles.filterSelect}
                  >
                    <option value="Mixed">Mixed</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </label>

                <label style={styles.filterLabel}>
                  Chapter (optional)
                  <input
                    value={selectedChapter}
                    onChange={(event) =>
                      setSelectedChapter(event.target.value)
                    }
                    placeholder="Chapter ID"
                    style={styles.filterInput}
                  />
                </label>

                <label style={styles.filterLabel}>
                  Questions
                  <select
                    value={questionLimit}
                    onChange={(event) =>
                      setQuestionLimit(event.target.value)
                    }
                    style={styles.filterSelect}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </label>
              </div>

              {questionError && (
                <div
                  style={
                    styles.errorCard
                  }
                >
                  {questionError}
                </div>
              )}

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  opacity:
                    !mode ||
                    loadingQuestions
                      ? 0.55
                      : 1,
                }}
                disabled={
                  !mode ||
                  loadingQuestions
                }
                onClick={
                  startPractice
                }
              >
                {loadingQuestions
                  ? "Loading Questions..."
                  : "Start Practice"}

                {!loadingQuestions && (
                  <Icon
                    name="arrow"
                    size={17}
                    stroke="#FFFFFF"
                  />
                )}
              </button>

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={() =>
                  setStage("subject")
                }
              >
                ← Change Subject
              </button>
            </>
          )}

          {stage === "questions" &&
            currentQuestion && (
              <>
                {questionError && (
                  <div style={styles.errorCard}>
                    {questionError}
                  </div>
                )}

                <div
                  style={
                    styles.progressTop
                  }
                >
                  <div>
                    <div
                      style={
                        styles.kicker
                      }
                    >
                      {(
                        currentQuestion.subjectName ||
                        ""
                      ).toUpperCase()}
                    </div>

                    <div
                      style={
                        styles.questionCounter
                      }
                    >
                      Question{" "}
                      {currentIndex + 1} of{" "}
                      {questions.length}
                    </div>
                  </div>

                  <div
                    style={
                      styles.scorePill
                    }
                  >
                    {correctCount} Correct
                  </div>
                </div>

                <div
                  style={
                    styles.questionProgressTrack
                  }
                >
                  <div
                    style={{
                      ...styles.questionProgressFill,
                      width: `${
                        ((currentIndex + 1) /
                          questions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <section
                  style={
                    styles.questionCard
                  }
                >
                  <div
                    style={
                      styles.questionNumber
                    }
                  >
                    Q{currentIndex + 1}
                  </div>

                  <button
                    type="button"
                    style={styles.bookmarkButton}
                    onClick={toggleBookmark}
                    aria-label={
                      bookmarkIds.has(
                        currentQuestion.questionId
                      )
                        ? "Remove bookmark"
                        : "Bookmark question"
                    }
                  >
                    {bookmarkIds.has(
                      currentQuestion.questionId
                    )
                      ? "Bookmarked"
                      : "Bookmark"}
                  </button>

                  <div style={styles.optionsList}>
                    {currentQuestion.options.map(
                      (option, index) => {
                        const key =
                          option.key ||
                          String.fromCharCode(65 + index);
                        const text = option.text || option;
                        const isSelected =
                          selectedAnswer === index;
                        const isCorrect =
                          answered &&
                          currentAnswerResult?.correctAnswer === key;
                        const isWrong =
                          answered &&
                          isSelected &&
                          currentAnswerResult?.isCorrect === false;

                        return (
                          <button
                            type="button"
                            key={key}
                            disabled={answered || loadingAnswer}
                            onClick={() => setSelectedAnswer(index)}
                            style={{
                              ...styles.option,
                              ...(isSelected && !answered
                                ? styles.optionSelected
                                : {}),
                              ...(isCorrect ? styles.optionCorrect : {}),
                              ...(isWrong ? styles.optionWrong : {}),
                            }}
                          >
                            <span style={styles.optionLetter}>
                              {key}
                            </span>
                            <span style={styles.optionText}>
                              {text}
                            </span>
                            {isCorrect && (
                              <Icon
                                name="check"
                                size={17}
                                stroke={C.green}
                              />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {answerError && (
                    <div
                      style={
                        styles.errorCard
                      }
                    >
                      {answerError}
                    </div>
                  )}

                  {answered &&
                    currentAnswerResult && (
                      <div
                        style={{
                          ...styles.explanationCard,
                          background:
                            currentAnswerResult.isCorrect
                              ? "#EAF8F3"
                              : "#FFF1F3",
                        }}
                      >
                        <div
                          style={{
                            ...styles.explanationTitle,
                            color:
                              currentAnswerResult.isCorrect
                                ? C.green
                                : C.red,
                          }}
                        >
                          {currentAnswerResult.isCorrect
                            ? "Correct Answer"
                            : "Wrong Answer"}
                        </div>

                        <div
                          style={
                            styles.explanationText
                          }
                        >
                          {currentAnswerResult.explanation ||
                            "No explanation available."}
                        </div>

                        {!currentAnswerResult.isCorrect && (
                          <div
                            style={
                              styles.correctAnswerText
                            }
                          >
                            Correct Answer:{" "}
                            <strong>
                              {
                                currentAnswerResult.correctAnswer
                              }
                            </strong>
                          </div>
                        )}
                      </div>
                    )}

                  {!answered ? (
                    <button
                      type="button"
                      style={{
                        ...styles.primaryButton,
                        opacity:
                          selectedAnswer ===
                            null ||
                          loadingAnswer
                            ? 0.55
                            : 1,
                      }}
                      disabled={
                        selectedAnswer ===
                          null ||
                        loadingAnswer
                      }
                      onClick={
                        checkAnswer
                      }
                    >
                      {loadingAnswer
                        ? "Checking Answer..."
                        : "Check Answer"}
                    </button>
                  ) : (
                    <div style={styles.practiceActions}>
                      <button
                        type="button"
                        style={styles.secondaryButton}
                        disabled={currentIndex === 0}
                        onClick={() => {
                          const previousIndex = currentIndex - 1;
                          const previousAnswer = answers[previousIndex];
                          setCurrentIndex(previousIndex);
                          setSelectedAnswer(
                            previousAnswer?.selectedIndex ?? null
                          );
                          setAnswered(Boolean(previousAnswer));
                          setCurrentAnswerResult(
                            previousAnswer
                              ? {
                                  isCorrect: previousAnswer.correct,
                                  selectedAnswer: previousAnswer.selectedKey,
                                  correctAnswer: previousAnswer.correctKey,
                                  explanation: previousAnswer.explanation || "",
                                }
                              : null
                          );
                        }}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        style={styles.primaryButton}
                        onClick={nextQuestion}
                      >
                        {currentIndex < questions.length - 1
                          ? "Next Question"
                          : "Finish Practice"}
                        <Icon
                          name="arrow"
                          size={17}
                          stroke="#FFFFFF"
                        />
                      </button>
                    </div>
                  )}
                </section>
              </>
            )}

          {stage === "result" && (
            <>
              <div style={styles.kicker}>
                PRACTICE COMPLETE
              </div>

              <h1 style={styles.title}>
                Practice Result
              </h1>

              <p style={styles.subtitle}>
                Your verified performance for
                this practice session.
              </p>

              <section
                style={styles.resultCard}
              >
                <div
                  style={
                    styles.resultCircle
                  }
                >
                  <div
                    style={
                      styles.resultScore
                    }
                  >
                    {score}
                  </div>

                  <div
                    style={
                      styles.resultOutOf
                    }
                  >
                    /{" "}
                    {questions.reduce(
                      (total, question) =>
                        total +
                        (Number(
                          question.marks
                        ) || 4),
                      0
                    )}
                  </div>
                </div>

                <div
                  style={
                    styles.resultStatus
                  }
                >
                  {correctCount ===
                  questions.length
                    ? "Excellent!"
                    : correctCount >=
                      Math.ceil(
                        questions.length *
                          0.7
                      )
                    ? "Great Practice!"
                    : "Keep Practicing!"}
                </div>

                <div
                  style={
                    styles.resultSubtext
                  }
                >
                  {selectedSubjectData?.name}{" "}
                  •{" "}
                  {questions.length} Questions
                </div>
              </section>

              <div
                style={styles.resultGrid}
              >
                <ResultStat
                  label="Correct"
                  value={correctCount}
                  color={C.green}
                />

                <ResultStat
                  label="Incorrect"
                  value={incorrectCount}
                  color={C.red}
                />

                <ResultStat
                  label="Skipped"
                  value={skippedCount}
                  color={C.blue}
                />

                <ResultStat
                  label="Accuracy"
                  value={`${
                    answers.length
                      ? Math.round(
                          (correctCount /
                            answers.length) *
                            100
                        )
                      : 0
                  }%`}
                  color={C.green}
                />
              </div>

              <button
                type="button"
                style={{
                  ...styles.primaryButton,
                  opacity: saving
                    ? 0.65
                    : 1,
                }}
                disabled={saving}
                onClick={
                  saveResult
                }
              >
                {saving
                  ? "Saving Result..."
                  : "Save Result to Profile"}

                <Icon
                  name="arrow"
                  size={17}
                  stroke="#FFFFFF"
                />
              </button>

              {saveMessage && (
                <div
                  style={{
                    ...styles.saveMessage,
                    color:
                      saveMessage.includes(
                        "successfully"
                      )
                        ? C.green
                        : C.red,
                  }}
                >
                  {saveMessage}
                </div>
              )}

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={
                  resetPractice
                }
              >
                Practice Again
              </button>

              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={() =>
                  onOpenSection?.(
                    "analysis"
                  )
                }
              >
                View Analysis

                <Icon
                  name="arrow"
                  size={15}
                  stroke={C.muted}
                />
              </button>
            </>
          )}

          {stage === "questions" &&
            !currentQuestion &&
            !loadingQuestions && (
              <div
                style={styles.errorCard}
              >
                No question available.
              </div>
            )}
        </main>
      </div>
    </div>
  );
}

function ResultStat({
  label,
  value,
  color,
}) {
  return (
    <div style={styles.resultStat}>
      <div
        style={{
          ...styles.resultStatValue,
          color,
        }}
      >
        {value}
      </div>

      <div
        style={styles.resultStatLabel}
      >
        {label}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100dvh",
    background: C.mint,
    color: C.navy,
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box",
  },

  mobileShell: {
    width: "100%",
    maxWidth: 430,
    minHeight: "100dvh",
    background: "transparent",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "rgba(6, 49, 43, 0.85)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom:
      `1px solid ${C.border}`,
    flexShrink: 0,
  },

  headerInner: {
    width: "100%",
    minHeight: 64,
    padding: "0 15px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border:
      `1px solid ${C.border}`,
    background: "rgba(255, 255, 255, 0.08)",
    color: "#10E79D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },

  brandWrap: {
    flex: 1,
    minWidth: 0,
  },

  brand: {
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0.8,
    lineHeight: 1,
  },

  tagline: {
    marginTop: 5,
    fontSize: 8,
    color: C.muted,
    fontWeight: 800,
    letterSpacing: 0.7,
  },

  headerLabel: {
    color: C.green,
    fontSize: 10,
    fontWeight: 900,
  },

  container: {
    width: "100%",
    maxWidth: 390,
    flex: 1,
    overflowY: "auto",
    padding:
      "20px 15px 105px",
    boxSizing: "border-box",
    WebkitOverflowScrolling:
      "touch",
  },

  kicker: {
    fontSize: 9,
    fontWeight: 900,
    letterSpacing: 1,
    color: C.green,
    marginBottom: 6,
  },

  title: {
    margin: 0,
    fontSize: 25,
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: -0.6,
  },

  subtitle: {
    margin: "8px 0 0",
    color: C.muted,
    fontSize: 11.5,
    lineHeight: 1.5,
  },

  infoCard: {
    marginTop: 18,
    padding: 14,
    borderRadius: 17,
    border:
      `1px solid ${C.border}`,
    background: C.softMint,
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  infoTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  infoText: {
    marginTop: 4,
    color: C.muted,
    fontSize: 9.5,
    lineHeight: 1.5,
  },

  savedActions: {
    marginTop: 12,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },

  savedButton: {
    minHeight: 40,
    border: `1px solid ${C.border}`,
    borderRadius: 11,
    background: C.white,
    color: C.green,
    fontSize: 9.5,
    fontWeight: 850,
    cursor: "pointer",
    padding: "8px 6px",
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 9,
    fontSize: 15,
    fontWeight: 900,
  },

  subjectGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 9,
  },

  subjectCard: {
    minHeight: 88,
    borderRadius: 16,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },

  subjectIcon: {
    fontSize: 19,
    fontWeight: 900,
  },

  subjectName: {
    fontSize: 10.5,
    fontWeight: 850,
    marginTop: 8,
  },

  subjectArrow: {
    alignSelf: "flex-end",
    color: "#8A9699",
    fontSize: 16,
  },

  modeList: {
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  modeCard: {
    width: "100%",
    minHeight: 90,
    border:
      `1px solid ${C.border}`,
    borderRadius: 16,
    background: C.white,
    padding: 13,
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    textAlign: "left",
    boxSizing: "border-box",
  },

  modeCardActive: {
    borderColor: C.green,
    background: C.mint,
  },

  modeNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: C.softMint,
    color: C.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 9,
    fontWeight: 900,
    flexShrink: 0,
  },

  modeBody: {
    flex: 1,
    minWidth: 0,
  },

  modeTitle: {
    fontSize: 11.5,
    fontWeight: 900,
  },

  modeText: {
    marginTop: 4,
    fontSize: 9,
    lineHeight: 1.45,
    color: C.muted,
  },

  modeArrow: {
    color: C.green,
    fontSize: 17,
    flexShrink: 0,
  },

  practiceFilters: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },

  filterLabel: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 800,
  },

  filterSelect: {
    width: "100%",
    minHeight: 36,
    padding: "7px 8px",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    background: C.white,
    color: C.navy,
    fontSize: 9.5,
    boxSizing: "border-box",
  },

  filterInput: {
    width: "100%",
    minHeight: 36,
    padding: "7px 8px",
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    background: C.white,
    color: C.navy,
    fontSize: 9.5,
    boxSizing: "border-box",
  },

  errorCard: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    background: "#FFF1F3",
    border:
      "1px solid #F1D9DC",
    color: C.red,
    fontSize: 9.5,
    lineHeight: 1.45,
    fontWeight: 750,
  },

  primaryButton: {
    marginTop: 15,
    width: "100%",
    minHeight: 44,
    border: "none",
    borderRadius: 12,
    background: C.green,
    color: C.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 11.5,
    fontWeight: 900,
    cursor: "pointer",
    boxSizing: "border-box",
  },

  secondaryButton: {
    marginTop: 10,
    width: "100%",
    minHeight: 43,
    border:
      `1px solid ${C.border}`,
    borderRadius: 12,
    background: C.white,
    color: C.muted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontSize: 10.5,
    fontWeight: 850,
    cursor: "pointer",
    boxSizing: "border-box",
  },

  practiceActions: {
    marginTop: 15,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    alignItems: "center",
  },

  progressTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  questionCounter: {
    fontSize: 14,
    fontWeight: 900,
  },

  scorePill: {
    padding: "6px 8px",
    borderRadius: 8,
    background: C.mint,
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  questionProgressTrack: {
    marginTop: 10,
    width: "100%",
    height: 5,
    borderRadius: 30,
    background: C.softMint,
    overflow: "hidden",
  },

  questionProgressFill: {
    height: "100%",
    borderRadius: 30,
    background: C.green,
    transition:
      "width 180ms ease",
  },

  questionCard: {
    marginTop: 15,
    borderRadius: 18,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    padding: 15,
    boxSizing: "border-box",
  },

  questionNumber: {
    color: C.green,
    fontSize: 8.5,
    fontWeight: 900,
    letterSpacing: 0.8,
  },

  bookmarkButton: {
    float: "right",
    minHeight: 30,
    padding: "6px 9px",
    border: `1px solid ${C.border}`,
    borderRadius: 9,
    background: C.mint,
    color: C.green,
    fontSize: 8.5,
    fontWeight: 850,
    cursor: "pointer",
  },

  chapterLabel: {
    marginTop: 5,
    color: C.muted,
    fontSize: 8,
    fontWeight: 750,
  },

  questionText: {
    margin: "8px 0 0",
    fontSize: 18,
    lineHeight: 1.35,
    fontWeight: 850,
    color: C.navy,
  },

  optionsList: {
    marginTop: 17,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  option: {
    width: "100%",
    minHeight: 47,
    border:
      `1px solid ${C.border}`,
    borderRadius: 12,
    background: C.white,
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "8px 10px",
    boxSizing: "border-box",
    cursor: "pointer",
    textAlign: "left",
  },

  optionSelected: {
    borderColor: C.green,
    background: C.mint,
  },

  optionCorrect: {
    borderColor: C.green,
    background: "#EAF8F3",
  },

  optionWrong: {
    borderColor: C.red,
    background: "#FFF1F3",
  },

  optionLetter: {
    width: 27,
    height: 27,
    borderRadius: 8,
    background: "#F6F9F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: C.navy,
    fontSize: 9,
    fontWeight: 900,
    flexShrink: 0,
  },

  optionText: {
    flex: 1,
    minWidth: 0,
    fontSize: 10.5,
    fontWeight: 750,
    color: C.navy,
  },

  explanationCard: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    border:
      `1px solid ${C.border}`,
  },

  explanationTitle: {
    fontSize: 9,
    fontWeight: 900,
  },

  explanationText: {
    marginTop: 4,
    fontSize: 9.5,
    lineHeight: 1.5,
    color: C.muted,
  },

  correctAnswerText: {
    marginTop: 7,
    color: C.red,
    fontSize: 9,
    fontWeight: 800,
  },

  resultCard: {
    marginTop: 18,
    borderRadius: 19,
    border:
      `1px solid ${C.border}`,
    background: C.white,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  resultCircle: {
    width: 112,
    height: 112,
    borderRadius: "50%",
    background:
      "conic-gradient(#007050 0 72%, #EAF5F1 72% 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  resultScore: {
    fontSize: 27,
    lineHeight: 1,
    fontWeight: 900,
    color: C.navy,
  },

  resultOutOf: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: 800,
    color: C.muted,
  },

  resultStatus: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: 900,
    color: C.green,
  },

  resultSubtext: {
    marginTop: 4,
    fontSize: 9,
    color: C.muted,
  },

  resultGrid: {
    marginTop: 11,
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 9,
  },

  resultStat: {
    padding: 13,
    borderRadius: 14,
    background: C.white,
    border:
      `1px solid ${C.border}`,
    textAlign: "center",
  },

  resultStatValue: {
    fontSize: 21,
    fontWeight: 900,
  },

  resultStatLabel: {
    marginTop: 3,
    color: C.muted,
    fontSize: 8.5,
    fontWeight: 750,
  },

  saveMessage: {
    marginTop: 9,
    textAlign: "center",
    fontSize: 9.5,
    fontWeight: 800,
  },
};