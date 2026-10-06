import React, { useEffect, useRef, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import {
    Capacitor,
    CapacitorHttp,
} from "@capacitor/core";
import { ScreenOrientation } from "@capacitor/screen-orientation";

/* =========================================================
   ILS RANKER — MOCK TESTS
   Full replacement
   ========================================================= */

const COLORS = {
    green: "#10E79D",
    navy: "#FFFFFF",
    mint: "rgba(16, 231, 157, 0.15)",
    softMint: "rgba(16, 231, 157, 0.10)",
    white: "rgba(255, 255, 255, 0.05)",
    muted: "rgba(226, 232, 240, 0.65)",
    border: "rgba(255, 255, 255, 0.12)",
    red: "#FF5E62",
    yellow: "#FBBF24",
    blue: "#38BDF8",
};

/* =========================================================
   ICON
   ========================================================= */

function Icon({
    name,
    size = 22,
    stroke = COLORS.navy,
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

        arrow: (
            <>
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
            </>
        ),

        check: (
            <path d="M5 12.5l4.2 4.2L19 7" />
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

        play: (
            <path d="M8 5.5v13L18 12 8 5.5Z" />
        ),

        trophy: (
            <>
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
                <path d="M7 6H4v2a4 4 0 0 0 4 4" />
                <path d="M17 6h3v2a4 4 0 0 1-4 4" />
            </>
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

        trend: (
            <>
                <path d="M4 17l6-6 4 4 6-7" />
                <path d="M16 8h4v4" />
            </>
        ),

        shield: (
            <>
                <path d="M12 3l7 3v5c0 4.8-3 8.2-7 10-4-1.8-7-5.2-7-10V6l7-3Z" />
                <path d="M8.5 12l2.2 2.2 4.8-5" />
            </>
        ),

        info: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 10v6" />
                <path d="M12 7h.01" />
            </>
        ),

        close: (
            <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
            </>
        ),

        home: (
            <>
                <path d="M3 11l9-7 9 7" />
                <path d="M5 10v10h14V10" />
                <path d="M9 20v-6h6v6" />
            </>
        ),
    };

    return (
        <svg {...common}>
            {paths[name]}
        </svg>
    );
}

/* =========================================================
   TEST DATA
   ========================================================= */

const tests = [
    {
        id: "neet-full",
        title: "NEET UG Full Mock Test",
        number: "Mock Test 05",
        description:
            "Complete NEET-style test covering Physics, Chemistry and Biology.",
        questions: 180,
        marks: 720,
        duration: "3 Hours",
        difficulty: "Full Syllabus",
        icon: "target",
        featured: true,
        subjects: [
            {
                name: "Physics",
                questions: 45,
                marks: 180,
                icon: "⚛",
                tone: COLORS.blue,
            },
            {
                name: "Chemistry",
                questions: 45,
                marks: 180,
                icon: "◇",
                tone: COLORS.red,
            },
            {
                name: "Biology",
                questions: 90,
                marks: 360,
                icon: "✦",
                tone: COLORS.green,
            },
        ],
    },

    {
        id: "neet-chapter",
        title: "NEET Chapter Test",
        number: "Chapter Practice",
        description:
            "Focused chapter-wise practice for targeted revision.",
        questions: 50,
        marks: 200,
        duration: "60 Min",
        difficulty: "Chapter Wise",
        icon: "questions",
        subjects: [
            {
                name: "Physics",
                questions: 15,
                marks: 60,
                icon: "⚛",
                tone: COLORS.blue,
            },
            {
                name: "Chemistry",
                questions: 15,
                marks: 60,
                icon: "◇",
                tone: COLORS.red,
            },
            {
                name: "Biology",
                questions: 20,
                marks: 80,
                icon: "✦",
                tone: COLORS.green,
            },
        ],
    },

    {
        id: "neet-pyq",
        title: "NEET Previous Year Paper",
        number: "PYQ Practice",
        description:
            "Practice with previous-year style questions.",
        questions: 200,
        marks: 800,
        duration: "200 Min",
        difficulty: "Previous Year",
        icon: "trend",
        subjects: [
            {
                name: "Physics",
                questions: 50,
                marks: 200,
                icon: "⚛",
                tone: COLORS.blue,
            },
            {
                name: "Chemistry",
                questions: 50,
                marks: 200,
                icon: "◇",
                tone: COLORS.red,
            },
            {
                name: "Biology",
                questions: 100,
                marks: 400,
                icon: "✦",
                tone: COLORS.green,
            },
        ],
    },

    {
        id: "biology",
        title: "Biology Mock Test",
        number: "Subject Test",
        description:
            "High-yield Biology practice for NEET preparation.",
        questions: 50,
        marks: 200,
        duration: "60 Min",
        difficulty: "Biology",
        icon: "shield",
        subjects: [
            {
                name: "Botany",
                questions: 25,
                marks: 100,
                icon: "B",
                tone: COLORS.green,
            },
            {
                name: "Zoology",
                questions: 25,
                marks: 100,
                icon: "Z",
                tone: COLORS.blue,
            },
        ],
    },

    {
        id: "chemistry",
        title: "Chemistry Mock Test",
        number: "Subject Test",
        description:
            "Balanced Physical, Organic and Inorganic practice.",
        questions: 50,
        marks: 200,
        duration: "60 Min",
        difficulty: "Chemistry",
        icon: "questions",
        subjects: [
            {
                name: "Physical Chemistry",
                questions: 17,
                marks: 68,
                icon: "P",
                tone: "#7C5AC7",
            },
            {
                name: "Organic Chemistry",
                questions: 17,
                marks: 68,
                icon: "O",
                tone: COLORS.red,
            },
            {
                name: "Inorganic Chemistry",
                questions: 16,
                marks: 64,
                icon: "I",
                tone: COLORS.green,
            },
        ],
    },

    {
        id: "physics",
        title: "Physics Mock Test",
        number: "Subject Test",
        description:
            "Build speed and accuracy with focused Physics practice.",
        questions: 50,
        marks: 200,
        duration: "60 Min",
        difficulty: "Physics",
        icon: "target",
        subjects: [
            {
                name: "Physics",
                questions: 50,
                marks: 200,
                icon: "⚛",
                tone: COLORS.blue,
            },
        ],
    },
];

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function MockTests({
    profile,
    onBack,
    onOpenSection,
    onExamModeChange,
}) {
    const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:3000";

    const selectedExam = "neet";

    const [stage, setStage] =
        useState("list");

    const [selectedTest, setSelectedTest] =
        useState(null);

    const [activeTab, setActiveTab] =
        useState("subjects");

    const [difficulty, setDifficulty] =
        useState("Mixed");

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

    const [markedQuestions, setMarkedQuestions] =
        useState([]);

    const [timeLeft, setTimeLeft] =
        useState(0);

    const [submitProgress, setSubmitProgress] =
        useState(0);

    const [submissionError, setSubmissionError] =
        useState("");

    const [resultData, setResultData] =
        useState(null);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [examViolationCount, setExamViolationCount] =
        useState(0);

    const [examWarning, setExamWarning] =
        useState("");

    const [bookmarkIds, setBookmarkIds] =
        useState(() => new Set());

    const submissionStartedRef =
        useRef(false);

    const examModeChangeRef =
        useRef(onExamModeChange);

    useEffect(() => {
        examModeChangeRef.current =
            onExamModeChange;
    }, [onExamModeChange]);

    const examModeActive =
        stage === "test";

    const currentQuestionData =
        Array.isArray(questions) &&
            currentQuestion >= 0 &&
            currentQuestion < questions.length
            ? questions[currentQuestion]
            : null;

    const loadBookmarkIds = async () => {
        const params = new URLSearchParams();
        if (profile?.mobile) params.set("mobile", profile.mobile);
        if (profile?.email) params.set("email", profile.email);
        if (profile?.googleId) params.set("googleId", profile.googleId);

        try {
            const response = await fetch(
                `${API_URL}/api/bookmarks?${params.toString()}`
            );
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data?.success) return;
            setBookmarkIds(
                new Set(
                    (data.bookmarks || []).map((bookmark) =>
                        String(bookmark.questionId)
                    )
                )
            );
        } catch (error) {
            if (import.meta.env.DEV) {
                console.warn("Mock bookmark loading failed:", error);
            }
        }
    };

    const toggleQuestionBookmark = async () => {
        const questionId = String(
            currentQuestionData?.questionId || ""
        );
        if (!questionId) return;

        const isBookmarked = bookmarkIds.has(questionId);

        try {
            const response = await fetch(
                `${API_URL}/api/bookmarks`,
                {
                    method: isBookmarked ? "DELETE" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mobile: profile?.mobile || "",
                        email: profile?.email || "",
                        googleId: profile?.googleId || "",
                        questionId,
                        exam: selectedExam,
                    }),
                }
            );
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !data?.success) {
                throw new Error(
                    data?.message || "Unable to update bookmark."
                );
            }
            setBookmarkIds((previous) => {
                const next = new Set(previous);
                if (isBookmarked) next.delete(questionId);
                else next.add(questionId);
                return next;
            });
        } catch (error) {
            setExamWarning(
                error.message || "Unable to update bookmark."
            );
        }
    };

    const enterExamDisplay = async () => {
        const platform = Capacitor.getPlatform();

        if (platform === "web") {
            try {
                if (
                    !document.fullscreenElement &&
                    document.documentElement.requestFullscreen
                ) {
                    await document.documentElement.requestFullscreen();
                }
            } catch (error) {
                console.warn(
                    "Unable to enter fullscreen exam display:",
                    error
                );
            }

            try {
                await screen.orientation?.lock?.("portrait");
            } catch (error) {
                console.warn(
                    "Unable to lock web exam orientation:",
                    error
                );
            }

            return;
        }

        try {
            await ScreenOrientation.lock({
                orientation: "portrait",
            });
        } catch (error) {
            console.warn(
                "Unable to lock exam orientation:",
                error
            );
        }
    };

    const exitExamDisplay = async () => {
        if (Capacitor.getPlatform() === "web") {
            try {
                if (
                    document.fullscreenElement &&
                    document.exitFullscreen
                ) {
                    await document.exitFullscreen();
                }
            } catch (error) {
                console.warn(
                    "Unable to exit fullscreen exam display:",
                    error
                );
            }

            try {
                await screen.orientation?.unlock?.();
            } catch (error) {
                console.warn(
                    "Unable to restore web exam orientation:",
                    error
                );
            }

            return;
        }

        try {
            await ScreenOrientation.unlock();
        } catch (error) {
            console.warn(
                "Unable to restore exam orientation:",
                error
            );
        }
    };

    useEffect(() => {
        examModeChangeRef.current?.(
            examModeActive
        );

        if (!examModeActive) {
            void exitExamDisplay();
            return undefined;
        }

        void enterExamDisplay();
        setExamWarning("");

        const flagViolation = () => {
            setExamViolationCount((previous) => {
                const next = previous + 1;

                setExamWarning(
                    next === 1
                        ? "You left Exam Mode. Please stay on this test screen."
                        : `Exam Mode violation ${next}: please do not leave the test.`
                );

                return next;
            });
        };

        const handleVisibilityChange = () => {
            if (
                document.visibilityState ===
                "visible"
            ) {
                flagViolation();
            }
        };

        const platform = Capacitor.getPlatform();
        let backListener;
        let appStateListener;
        let historyEntryAdded = false;

        const handleBrowserBack = () => {
            window.history.pushState(
                {
                    ...(window.history.state || {}),
                    ilsExamMode: true,
                },
                "",
                window.location.href
            );
            setExamWarning(
                "Exam Mode is active. Use Submit Test to finish the test."
            );
        };

        if (platform === "web") {
            window.history.pushState(
                {
                    ...(window.history.state || {}),
                    ilsExamMode: true,
                },
                "",
                window.location.href
            );
            historyEntryAdded = true;
            window.addEventListener(
                "popstate",
                handleBrowserBack
            );
        }

        if (platform === "web") {
            document.addEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        } else {
            backListener = CapacitorApp.addListener(
                "backButton",
                () => {
                    setExamWarning(
                        "Exam Mode is active. Use the on-screen back button to leave the test."
                    );
                }
            );

            appStateListener = CapacitorApp.addListener(
                "appStateChange",
                ({ isActive }) => {
                    if (isActive) {
                        flagViolation();
                    }
                }
            );
        }

        return () => {
            if (platform === "web") {
                document.removeEventListener(
                    "visibilitychange",
                    handleVisibilityChange
                );
                window.removeEventListener(
                    "popstate",
                    handleBrowserBack
                );

                if (historyEntryAdded) {
                    window.history.back();
                }
            }
            backListener?.then((listener) =>
                listener.remove()
            );
            appStateListener?.then((listener) =>
                listener.remove()
            );
            void exitExamDisplay();
            examModeChangeRef.current?.(false);
        };
    }, [examModeActive]);

    /* =======================================================
       RESULT DATA
       ======================================================= */

    const resultCorrect = Number(
        resultData?.correct ??
        resultData?.result?.correct ??
        0
    );

    const resultIncorrect = Number(
        resultData?.incorrect ??
        resultData?.result?.incorrect ??
        0
    );

    const resultSkipped = Number(
        resultData?.skipped ??
        resultData?.result?.skipped ??
        0
    );

    const resultScore = Number(
        resultData?.score ??
        resultData?.result?.score ??
        0
    );

    const resultAccuracy = Number(
        resultData?.accuracy ??
        resultData?.result?.accuracy ??
        0
    );

    const resultTotalQuestions = Number(
        resultData?.totalQuestions ??
        resultData?.result?.totalQuestions ??
        questions.length
    );

    /* =======================================================
       NORMALIZE
       ======================================================= */

    const normalizeQuestions = (items) => {
        if (!Array.isArray(items)) {
            return [];
        }

        return items
            .filter(
                (item) =>
                    item &&
                    typeof item === "object"
            )
            .map((item) => {
                let rawOptions = [];

                if (Array.isArray(item?.options)) {
                    rawOptions = item.options;
                } else if (
                    item?.options &&
                    typeof item.options === "object"
                ) {
                    rawOptions = Object.entries(
                        item.options
                    ).map(([key, value]) => ({
                        key,
                        text: value,
                    }));
                }

                const normalizedOptions = rawOptions
                    .map((option, index) => {
                        const fallbackKey =
                            String.fromCharCode(
                                65 + index
                            );

                        if (
                            option &&
                            typeof option === "object"
                        ) {
                            return {
                                key: String(
                                    option.key ||
                                    fallbackKey
                                ).toUpperCase(),
                                text: String(
                                    option.text ??
                                    option.value ??
                                    ""
                                ),
                            };
                        }

                        return {
                            key: fallbackKey,
                            text: String(option ?? ""),
                        };
                    })
                    .filter(
                        (option) =>
                            option.text.trim()
                    );

                const questionId = String(
                    item?.questionId ??
                    item?.id ??
                    item?._id ??
                    ""
                );

                return {
                    ...item,

                    questionId,

                    id: String(
                        item?.id ??
                        item?._id ??
                        questionId ??
                        ""
                    ),

                    question: String(
                        item?.questionText ??
                        item?.question ??
                        ""
                    ),

                    options: normalizedOptions,

                    subjectId: String(
                        item?.subjectId || ""
                    ),

                    subjectName: String(
                        item?.subjectName || ""
                    ),

                    chapterId: String(
                        item?.chapterId || ""
                    ),

                    chapterName: String(
                        item?.chapterName || ""
                    ),

                    difficulty: String(
                        item?.difficulty || "Easy"
                    ),
                };
            })
            .filter(
                (item) =>
                    item.questionId &&
                    item.question &&
                    item.options.length >= 2
            );
    };
    /* =======================================================
       SHUFFLE
       ======================================================= */

    const shuffle = (items) => {
        const copy = [...items];

        for (
            let i = copy.length - 1;
            i > 0;
            i--
        ) {
            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [
                copy[i],
                copy[j],
            ] = [
                    copy[j],
                    copy[i],
                ];
        }

        return copy;
    };

    /* =======================================================
       API GET
       ======================================================= */

    const getQuestionsFromAPI =
        async ({
            subject = "",
            limit = 20,
            selectedDifficulty = "Mixed",
            testId = "",
        }) => {
            const params =
                new URLSearchParams();

            params.set(
                "exam",
                selectedExam
            );

            if (subject) {
                params.set(
                    "subject",
                    subject
                );
            }

            if (testId) {
                params.set(
                    "testId",
                    testId
                );
            }

            params.set(
                "difficulty",
                selectedDifficulty
            );

            params.set(
                "limit",
                String(limit)
            );
            if (import.meta.env.DEV) {
                params.set("allowPartial", "true");
            }
            const url =
                `${API_URL}/api/practice/questions?` +
                params.toString();

            const platform =
                Capacitor.getPlatform();

            /* WEB */
            if (
                platform === "web"
            ) {
                const response =
                    await fetch(url);

                const data =
                    await response
                        .json()
                        .catch(
                            () => ({})
                        );

                if (
                    !response.ok ||
                    !data?.success
                ) {
                    throw new Error(
                        data?.message ||
                        "Unable to load questions."
                    );
                }

                if (!Array.isArray(data.questions)) {
                    throw new Error(
                        "The question service returned an invalid response."
                    );
                }

                return normalizeQuestions(
                    data.questions
                );
            }

            /* ANDROID / NATIVE */
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

            if (!Array.isArray(data.questions)) {
                throw new Error(
                    "The question service returned an invalid response."
                );
            }

            return normalizeQuestions(
                data.questions
            );
        };

    /* =======================================================
       LOAD SUBJECT
       ======================================================= */

    const loadSubjectQuestions =
        async (
            subject,
            count,
            selectedDifficulty
        ) => {
            return getQuestionsFromAPI({
                subject,
                limit: count,
                selectedDifficulty,
            });
        };

    /* =======================================================
       LOAD TEST QUESTIONS
       ======================================================= */

    const loadTestQuestions =
        async (
            test,
            selectedDifficulty
        ) => {
            /*
             * NEET FULL MOCK
             *
             * Always request subject-wise.
             * This allows the app to maintain
             * 45 Physics + 45 Chemistry +
             * 90 Biology without needing
             * pre-assigned full-mock documents.
             */

            if (
                test.id === "neet-full"
            ) {
                const [
                    physics,
                    chemistry,
                    biology,
                ] = await Promise.all([
                    loadSubjectQuestions(
                        "physics",
                        45,
                        selectedDifficulty
                    ),

                    loadSubjectQuestions(
                        "chemistry",
                        45,
                        selectedDifficulty
                    ),

                    loadSubjectQuestions(
                        "biology",
                        90,
                        selectedDifficulty
                    ),
                ]);

                /*
                 * Remove duplicate IDs
                 * before combining.
                 */

                const map =
                    new Map();

                [
                    ...physics,
                    ...chemistry,
                    ...biology,
                ].forEach(
                    (question) => {
                        if (
                            !map.has(
                                question.questionId ||
                                question.id
                            )
                        ) {
                            map.set(
                                question.questionId ||
                                question.id,
                                question
                            );
                        }
                    }
                );

                /*
                 * Randomize the final paper
                 * so subjects are mixed.
                 */

                return shuffle([
                    ...map.values(),
                ]);
            }

            /*
             * SUBJECT TESTS
             */

            if (
                test.id ===
                "biology"
            ) {
                return loadSubjectQuestions(
                    "biology",
                    50,
                    selectedDifficulty
                );
            }

            if (
                test.id ===
                "chemistry"
            ) {
                return loadSubjectQuestions(
                    "chemistry",
                    50,
                    selectedDifficulty
                );
            }

            if (
                test.id ===
                "physics"
            ) {
                return loadSubjectQuestions(
                    "physics",
                    50,
                    selectedDifficulty
                );
            }

            /*
             * Chapter / PYQ for now:
             * use the NEET question bank
             * with random selection.
             */

            return getQuestionsFromAPI({
                limit:
                    test.questions || 50,

                selectedDifficulty,
            });
        };

    /* =======================================================
       RESET
       ======================================================= */

    const resetAttemptState = () => {
        setCurrentQuestion(0);
        setAnswers({});
        setMarkedQuestions([]);
        setTimeLeft(0);
        setSubmitProgress(0);
        setSubmissionError("");
        setResultData(null);
        setIsSubmitting(false);
        submissionStartedRef.current = false;
    };

    /* =======================================================
       OPEN TEST
       ======================================================= */

    const openTest =
        async (test) => {
            setSelectedTest(test);

            setActiveTab(
                "subjects"
            );

            setDifficulty(
                "Mixed"
            );

            resetAttemptState();

            setQuestions([]);

            setQuestionsError("");

            setQuestionsLoading(
                true
            );

            setStage("preview");

            try {
                const loaded =
                    await loadTestQuestions(
                        test,
                        "Mixed"
                    );

                setQuestions(
                    loaded
                );
                void loadBookmarkIds();

                if (
                    loaded.length === 0
                ) {
                    setQuestionsError(
                        "No active questions are available in MongoDB for this test yet."
                    );
                }
            } catch (error) {
                console.error(
                    "Question loading error:",
                    error
                );

                setQuestionsError(
                    error?.message ||
                    "Unable to load questions."
                );
            } finally {
                setQuestionsLoading(
                    false
                );
            }
        };

    /* =======================================================
       CHANGE DIFFICULTY
       ======================================================= */

    const changeDifficulty =
        async (
            nextDifficulty
        ) => {
            if (
                !selectedTest ||
                questionsLoading ||
                isSubmitting
            ) {
                return;
            }

            setDifficulty(
                nextDifficulty
            );

            setQuestionsLoading(
                true
            );

            setQuestionsError("");

            setQuestions([]);

            setCurrentQuestion(0);

            setAnswers({});

            try {
                const loaded =
                    await loadTestQuestions(
                        selectedTest,
                        nextDifficulty
                    );

                setQuestions(
                    loaded
                );

                if (
                    loaded.length === 0
                ) {
                    setQuestionsError(
                        `No ${nextDifficulty.toLowerCase()} questions are currently available in MongoDB.`
                    );
                }
            } catch (error) {
                console.error(
                    "Difficulty load error:",
                    error
                );

                setQuestionsError(
                    error?.message ||
                    "Unable to load questions."
                );
            } finally {
                setQuestionsLoading(
                    false
                );
            }
        };

    /* =======================================================
       START TEST
       ======================================================= */

    /* =======================================================
     START TEST
     ======================================================= */

    const startTest = () => {
        if (
            !selectedTest ||
            questionsLoading ||
            isSubmitting ||
            questions.length === 0
        ) {
            return;
        }

        setCurrentQuestion(0);
        setAnswers({});
        setResultData(null);
        setSubmissionError("");

        if (
            !Array.isArray(questions) ||
            questions.length === 0
        ) {
            setQuestionsError(
                "Question set is not ready. Please wait for questions to finish loading."
            );
            return;
        }

        const duration = String(
            selectedTest.duration || "60 Min"
        );

        const hourMatch = duration.match(
            /(\d+)\s*(Hour|Hours)/i
        );

        const minMatch = duration.match(
            /(\d+)\s*(Min|Minutes)/i
        );

        let seconds = 60 * 60;

        if (hourMatch) {
            seconds =
                Number(hourMatch[1]) *
                60 *
                60;
        } else if (minMatch) {
            seconds =
                Number(minMatch[1]) *
                60;
        }

        setTimeLeft(seconds);
        setStage("test");
    };

    /* =======================================================
       SELECT ANSWER
       ======================================================= */

    const chooseAnswer =
        (optionKey) => {
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

    const toggleMarkForReview = () => {
        if (
            !currentQuestionData ||
            isSubmitting
        ) {
            return;
        }

        setMarkedQuestions((previous) =>
            previous.includes(currentQuestion)
                ? previous.filter(
                    (index) =>
                        index !== currentQuestion
                )
                : [...previous, currentQuestion]
        );
    };

    const isCurrentMarked =
        markedQuestions.includes(currentQuestion);

    const goToQuestion = (index) => {
        if (
            stage !== "test" ||
            isSubmitting ||
            !Array.isArray(questions) ||
            index < 0 ||
            index >= questions.length
        ) {
            return;
        }

        setCurrentQuestion(index);
    };

    /* =======================================================
       SUBMIT SERVER
       ======================================================= */

    const submitAnswersToServer =
        async () => {
            if (
                !selectedTest ||
                questions.length === 0
            ) {
                throw new Error(
                    "There are no questions to submit."
                );
            }

            // Compute subjectResults and chapterResults from questions and answers
            const subjectMap = new Map();
            const chapterMap = new Map();

            questions.forEach((q, index) => {
                const subId = String(q.subjectId || q.subject || q.subjectName || selectedTest?.id || "general").toLowerCase().trim();
                const subName = q.subjectName || q.subject || (subId.charAt(0).toUpperCase() + subId.slice(1));
                const chapId = String(q.chapterId || q.chapter || q.chapterName || "general").trim();
                const chapName = q.chapterName || q.chapter || chapId;

                if (!subjectMap.has(subId)) {
                    subjectMap.set(subId, {
                        subjectId: subId,
                        subjectName: subName,
                        totalQuestions: 0,
                        attempted: 0,
                        correct: 0,
                        incorrect: 0,
                        skipped: 0,
                        score: 0,
                        accuracy: 0,
                    });
                }
                const subStat = subjectMap.get(subId);
                subStat.totalQuestions += 1;

                const chapKey = `${subId}:${chapId}`;
                if (!chapterMap.has(chapKey)) {
                    chapterMap.set(chapKey, {
                        subjectId: subId,
                        chapterId: chapId,
                        chapterName: chapName,
                        totalQuestions: 0,
                        attempted: 0,
                        correct: 0,
                        incorrect: 0,
                        skipped: 0,
                        score: 0,
                        accuracy: 0,
                    });
                }
                const chapStat = chapterMap.get(chapKey);
                chapStat.totalQuestions += 1;

                const selectedAns = answers[index];
                const isSkipped = selectedAns === undefined || selectedAns === null || selectedAns === "";
                if (isSkipped) {
                    subStat.skipped += 1;
                    chapStat.skipped += 1;
                } else {
                    subStat.attempted += 1;
                    chapStat.attempted += 1;
                    const isCorrect = String(q.correctAnswer || "").trim().toUpperCase() === String(selectedAns).trim().toUpperCase();
                    const marks = Number(q.marks || 4);
                    const neg = Number(q.negativeMarks || 1);
                    if (isCorrect) {
                        subStat.correct += 1;
                        subStat.score += marks;
                        chapStat.correct += 1;
                        chapStat.score += marks;
                    } else {
                        subStat.incorrect += 1;
                        subStat.score -= neg;
                        chapStat.incorrect += 1;
                        chapStat.score -= neg;
                    }
                }
            });

            const subjectResults = Array.from(subjectMap.values()).map((s) => ({
                ...s,
                accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
            }));

            const chapterResults = Array.from(chapterMap.values()).map((c) => ({
                ...c,
                accuracy: c.attempted > 0 ? Math.round((c.correct / c.attempted) * 100) : 0,
            }));

            const payload = {
                mobile:
                    profile?.mobile ||
                    "",

                email:
                    profile?.email ||
                    "",

                googleId:
                    profile?.googleId ||
                    "",

                testId:
                    selectedTest.id,

                testTitle:
                    selectedTest.title,

                exam:
                    selectedExam,
                answers: questions.map(
                    (question, index) => {
                        const questionId = String(
                            question.questionId ||
                            question.id ||
                            ""
                        );

                        return {
                            questionId,
                            selectedAnswer:
                                answers[index] ?? null,
                        };
                    }
                ),
                subjectResults,
                chapterResults,
            };

            const url =
                `${API_URL}/api/test-results`;

            const platform =
                Capacitor.getPlatform();

            let status = 0;
            let data = {};

            /* WEB */
            if (
                platform === "web"
            ) {
                let response;

                try {
                    response =
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
                } catch (error) {
                    if (import.meta.env.DEV) {
                        console.error(
                            "Test-result network failure:",
                            {
                                url,
                                error,
                            }
                        );
                    }

                    throw new Error(
                        `Unable to reach the result server at ${url}. Check that the backend is running and reachable from this device.`
                    );
                }

                status = response.status;

                const responseText =
                    await response.text();

                try {
                    data = responseText
                        ? JSON.parse(responseText)
                        : {};
                } catch {
                    data = {};
                }

                if (import.meta.env.DEV) {
                    console.debug(
                        "Test-result response:",
                        {
                            url,
                            status,
                            body: responseText,
                        }
                    );
                }
            }

            /* ANDROID */
            else {
                const response =
                    await CapacitorHttp.post(
                        {
                            url,

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            data: payload,
                        }
                    );

                status =
                    response?.status ||
                    0;

                data =
                    response?.data || {};

                if (import.meta.env.DEV) {
                    console.debug(
                        "Test-result response:",
                        {
                            url,
                            status,
                            body: data,
                        }
                    );
                }
            }

            if (
                status < 200 ||
                status >= 300 ||
                data?.success !==
                true
            ) {
                throw new Error(
                    data?.message ||
                    `Result server returned HTTP ${status}.`
                );
            }

            return (
                data?.result ||
                data?.data ||
                data
            );
        };

    /* =======================================================
       SUBMIT TEST
       ======================================================= */

    const submitTest =
        async () => {
            if (
                isSubmitting ||
                submissionStartedRef.current
            ) {
                return;
            }

            if (
                !selectedTest ||
                !Array.isArray(questions) ||
                questions.length === 0
            ) {
                setSubmissionError(
                    "There are no valid questions to submit."
                );
                return;
            }

            submissionStartedRef.current = true;

            setIsSubmitting(
                true
            );

            setSubmissionError("");

            setSubmitProgress(8);

            setStage(
                "submission"
            );

            try {
                const result =
                    await submitAnswersToServer();

                setResultData(
                    result
                );

                setSubmitProgress(
                    100
                );

                window.setTimeout(
                    () => {
                        setStage(
                            "result"
                        );

                        setIsSubmitting(
                            false
                        );
                        submissionStartedRef.current = false;
                    },
                    400
                );
            } catch (error) {
                console.error(
                    "Test submission error:",
                    error
                );

                setSubmissionError(
                    error?.message ||
                    "Unable to submit the test."
                );

                setSubmitProgress(
                    100
                );

                setIsSubmitting(
                    false
                );
                submissionStartedRef.current = false;
            }
        };

    /* =======================================================
       NEXT
       ======================================================= */

    const nextQuestion =
        () => {
            if (
                !currentQuestionData ||
                isSubmitting
            ) {
                return;
            }

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

            submitTest();
        };

    /* =======================================================
       TIMER
       ======================================================= */

    useEffect(() => {
        if (
            stage !== "test" ||
            timeLeft <= 0
        ) {
            return;
        }

        const timer = window.setInterval(() => {
            setTimeLeft((previous) =>
                previous > 0
                    ? previous - 1
                    : 0
            );
        }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, [stage]);

    /* =======================================================
       AUTO SUBMIT ON TIMEOUT
       ======================================================= */

    useEffect(() => {
        if (
            stage === "test" &&
            timeLeft === 0 &&
            questions.length > 0 &&
            !isSubmitting
        ) {
            submitTest();
        }
    }, [
        stage,
        timeLeft,
        questions.length,
        isSubmitting,
    ]);

    /* =======================================================
       SUBMISSION PROGRESS
       ======================================================= */

    useEffect(() => {
        if (
            stage !==
            "submission"
        ) {
            return;
        }

        if (
            submissionError
        ) {
            return;
        }

        const interval =
            window.setInterval(
                () => {
                    setSubmitProgress(
                        (previous) => {
                            if (
                                previous >=
                                92
                            ) {
                                window.clearInterval(
                                    interval
                                );

                                return 92;
                            }

                            return (
                                previous + 3
                            );
                        }
                    );
                },
                140
            );

        return () =>
            window.clearInterval(
                interval
            );
    }, [
        stage,
        submissionError,
    ]);

    /* =======================================================
       FORMAT TIME
       ======================================================= */

    const formatTime =
        (seconds) => {
            const safe =
                Math.max(
                    0,
                    Number(
                        seconds
                    ) || 0
                );

            const hours =
                Math.floor(
                    safe / 3600
                );

            const minutes =
                Math.floor(
                    (safe % 3600) /
                    60
                );

            const secs =
                safe % 60;

            if (
                hours > 0
            ) {
                return `${String(
                    hours
                ).padStart(
                    2,
                    "0"
                )}:${String(
                    minutes
                ).padStart(
                    2,
                    "0"
                )}:${String(
                    secs
                ).padStart(
                    2,
                    "0"
                )}`;
            }

            return `${String(
                minutes
            ).padStart(
                2,
                "0"
            )}:${String(
                secs
            ).padStart(
                2,
                "0"
            )}`;
        };

    /* =======================================================
       RESET ALL
       ======================================================= */

    const resetTests =
        () => {
            setStage(
                "list"
            );

            setSelectedTest(
                null
            );

            setQuestions([]);

            setQuestionsError(
                ""
            );

            setCurrentQuestion(
                0
            );

            setAnswers({});

            setDifficulty(
                "Mixed"
            );

            setResultData(
                null
            );

            setSubmissionError(
                ""
            );

            setIsSubmitting(
                false
            );

            setSubmitProgress(
                0
            );

            setTimeLeft(
                0
            );
        };

    /* =======================================================
       LIST SCREEN
       ======================================================= */

    if (
        stage === "list"
    ) {
        return (
            <Page>
                <Header
                    onBack={onBack}
                />

                <main
                    style={
                        styles.container
                    }
                >
                    <div
                        style={
                            styles.kicker
                        }
                    >
                        TEST CENTER
                    </div>

                    <h1
                        style={
                            styles.pageTitle
                        }
                    >
                        Mock Tests
                    </h1>

                    <p
                        style={
                            styles.pageSubtitle
                        }
                    >
                        Simulate the real
                        exam environment,
                        improve your
                        accuracy and
                        measure your
                        preparation.
                    </p>

                    <div
                        style={
                            styles.featuredCard
                        }
                    >
                        <div
                            style={
                                styles.featuredTop
                            }
                        >
                            <div
                                style={
                                    styles.featuredIcon
                                }
                            >
                                <Icon
                                    name="target"
                                    size={26}
                                    stroke={
                                        COLORS.green
                                    }
                                />
                            </div>

                            <span
                                style={
                                    styles.featuredBadge
                                }
                            >
                                RECOMMENDED
                            </span>
                        </div>

                        <div
                            style={
                                styles.featuredTitle
                            }
                        >
                            Full Syllabus
                            Mock
                        </div>

                        <div
                            style={
                                styles.featuredDescription
                            }
                        >
                            Complete exam
                            simulation with
                            performance
                            analysis.
                        </div>

                        <div
                            style={
                                styles.featuredStats
                            }
                        >
                            <Stat
                                icon="questions"
                                text="180 Questions"
                            />

                            <Stat
                                icon="clock"
                                text="180 Minutes"
                            />

                            <Stat
                                icon="trophy"
                                text="720 Marks"
                            />
                        </div>

                        <button
                            type="button"
                            style={
                                styles.featuredButton
                            }
                            onClick={() =>
                                openTest(
                                    tests[0]
                                )
                            }
                        >
                            <span style={{ color: "#010F0E" }}>
                                Take Test
                            </span>

                            <Icon
                                name="arrow"
                                size={18}
                                stroke="#010F0E"
                            />
                        </button>
                    </div>

                    <div
                        style={
                            styles.sectionHeader
                        }
                    >
                        <h2
                            style={
                                styles.sectionTitle
                            }
                        >
                            Available Tests
                        </h2>

                        <span
                            style={
                                styles.sectionCount
                            }
                        >
                            {tests.length} Tests
                        </span>
                    </div>

                    {tests
                        .slice(1)
                        .map((test) => (
                            <TestCard
                                key={test.id}
                                test={test}
                                onClick={() =>
                                    openTest(
                                        test
                                    )
                                }
                            />
                        ))}

                    <div
                        style={
                            styles.tipCard
                        }
                    >
                        <div
                            style={
                                styles.tipIcon
                            }
                        >
                            <Icon
                                name="trend"
                                size={20}
                                stroke={
                                    COLORS.green
                                }
                            />
                        </div>

                        <div>
                            <div
                                style={
                                    styles.tipTitle
                                }
                            >
                                Practice
                                strategically
                            </div>

                            <div
                                style={
                                    styles.tipText
                                }
                            >
                                Every new attempt
                                can receive a
                                fresh randomized
                                question set.
                            </div>
                        </div>
                    </div>
                </main>
            </Page>
        );
    }

    /* =======================================================
       PREVIEW
       ======================================================= */

    if (
        stage ===
        "preview" &&
        selectedTest
    ) {
        const displayedCount =
            questionsLoading
                ? "…"
                : questions.length;

        return (
            <Page>
                <Header
                    onBack={() => {
                        resetTests();
                    }}
                />

                <main
                    style={
                        styles.container
                    }
                >
                    <div
                        style={
                            styles.breadcrumb
                        }
                    >
                        <span>
                            Mock Tests
                        </span>

                        <span>›</span>

                        <strong>
                            Take a Test
                        </strong>
                    </div>

                    <div
                        style={
                            styles.testHero
                        }
                    >
                        <div
                            style={
                                styles.testHeroIcon
                            }
                        >
                            <Icon
                                name={
                                    selectedTest.icon
                                }
                                size={27}
                                stroke={
                                    COLORS.green
                                }
                            />
                        </div>

                        <div
                            style={{
                                flex: 1,
                            }}
                        >
                            <div
                                style={
                                    styles.testHeroEyebrow
                                }
                            >
                                {
                                    selectedTest.number
                                }
                            </div>

                            <h1
                                style={
                                    styles.testHeroTitle
                                }
                            >
                                {
                                    selectedTest.title
                                }
                            </h1>

                            <p
                                style={
                                    styles.testHeroDescription
                                }
                            >
                                {
                                    selectedTest.description
                                }
                            </p>
                        </div>
                    </div>

                    <div
                        style={
                            styles.metaGrid
                        }
                    >
                        <MetaBox
                            icon="questions"
                            label="Questions"
                            value={
                                displayedCount
                            }
                        />

                        <MetaBox
                            icon="clock"
                            label="Duration"
                            value={
                                selectedTest.duration
                            }
                        />

                        <MetaBox
                            icon="trophy"
                            label="Maximum"
                            value={
                                questions.length >
                                    0
                                    ? `${questions.length *
                                    4
                                    } Marks`
                                    : `${selectedTest.marks} Marks`
                            }
                        />
                    </div>

                    <div
                        style={
                            styles.difficultyCard
                        }
                    >
                        <div
                            style={
                                styles.difficultyHeader
                            }
                        >
                            <div>
                                <div
                                    style={
                                        styles.difficultyTitle
                                    }
                                >
                                    Question
                                    Difficulty
                                </div>

                                <div
                                    style={
                                        styles.difficultySubtitle
                                    }
                                >
                                    Choose the
                                    difficulty for
                                    this attempt.
                                </div>
                            </div>

                            <span
                                style={
                                    styles.difficultyBadge
                                }
                            >
                                {difficulty}
                            </span>
                        </div>

                        <div
                            style={
                                styles.difficultyOptions
                            }
                        >
                            {[
                                "Easy",
                                "Medium",
                                "Hard",
                                "Mixed",
                            ].map(
                                (level) => {
                                    const active =
                                        difficulty ===
                                        level;

                                    return (
                                        <button
                                            key={
                                                level
                                            }
                                            type="button"
                                            disabled={
                                                questionsLoading
                                            }
                                            onClick={() =>
                                                changeDifficulty(
                                                    level
                                                )
                                            }
                                            style={{
                                                ...styles.difficultyButton,

                                                ...(active
                                                    ? styles.difficultyButtonActive
                                                    : {}),

                                                opacity:
                                                    questionsLoading &&
                                                        !active
                                                        ? 0.6
                                                        : 1,
                                            }}
                                        >
                                            {level}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <div
                            style={
                                styles.randomNote
                            }
                        >
                            <Icon
                                name="trend"
                                size={14}
                                stroke={
                                    COLORS.green
                                }
                            />

                            <span>
                                A fresh random
                                set is loaded
                                when you change
                                difficulty or
                                start the test.
                            </span>
                        </div>
                    </div>

                    {questionsError && (
                        <div
                            style={
                                styles.errorBox
                            }
                        >
                            <strong>
                                Questions not
                                available
                            </strong>

                            <div
                                style={{
                                    marginTop: 5,
                                }}
                            >
                                {questionsError}
                            </div>
                        </div>
                    )}

                    {!questionsLoading &&
                        !questionsError &&
                        questions.length <
                        selectedTest.questions &&
                        questions.length >
                        0 && (
                            <div
                                style={
                                    styles.infoBox
                                }
                            >
                                <strong>
                                    {questions.length}
                                </strong>{" "}
                                real questions
                                are currently
                                available in
                                MongoDB for this
                                selection. The
                                app will use
                                only real
                                questions and
                                will not
                                duplicate them
                                artificially.
                            </div>
                        )}

                    <div
                        style={
                            styles.tabs
                        }
                    >
                        <button
                            type="button"
                            style={{
                                ...styles.tab,

                                ...(activeTab ===
                                    "subjects"
                                    ? styles.activeTab
                                    : {}),
                            }}
                            onClick={() =>
                                setActiveTab(
                                    "subjects"
                                )
                            }
                        >
                            Subjects
                        </button>

                        <button
                            type="button"
                            style={{
                                ...styles.tab,

                                ...(activeTab ===
                                    "instructions"
                                    ? styles.activeTab
                                    : {}),
                            }}
                            onClick={() =>
                                setActiveTab(
                                    "instructions"
                                )
                            }
                        >
                            Instructions
                        </button>
                    </div>

                    {activeTab ===
                        "subjects" ? (
                        <div
                            style={
                                styles.panel
                            }
                        >
                            <div
                                style={
                                    styles.panelHeader
                                }
                            >
                                <div>
                                    <h2
                                        style={
                                            styles.panelTitle
                                        }
                                    >
                                        Test Structure
                                    </h2>

                                    <p
                                        style={
                                            styles.panelSubtitle
                                        }
                                    >
                                        Questions included
                                        in this test
                                    </p>
                                </div>

                                <span
                                    style={
                                        styles.panelBadge
                                    }
                                >
                                    {
                                        selectedTest.difficulty
                                    }
                                </span>
                            </div>

                            <div
                                style={
                                    styles.subjectList
                                }
                            >
                                {selectedTest.subjects.map(
                                    (
                                        subject,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                subject.name
                                            }
                                            style={{
                                                ...styles.subjectItem,

                                                borderBottom:
                                                    index ===
                                                        selectedTest
                                                            .subjects
                                                            .length -
                                                        1
                                                        ? "none"
                                                        : `1px solid ${COLORS.border}`,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    ...styles.subjectAvatar,

                                                    color:
                                                        subject.tone,

                                                    background:
                                                        subject.tone ===
                                                            COLORS.green
                                                            ? COLORS.mint
                                                            : "#F6F8FA",
                                                }}
                                            >
                                                {
                                                    subject.icon
                                                }
                                            </div>

                                            <div
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <div
                                                    style={
                                                        styles.subjectName
                                                    }
                                                >
                                                    {
                                                        subject.name
                                                    }
                                                </div>

                                                <div
                                                    style={
                                                        styles.subjectMeta
                                                    }
                                                >
                                                    {
                                                        subject.questions
                                                    }{" "}
                                                    Questions
                                                    <span>
                                                        {" "}
                                                        •{" "}
                                                    </span>
                                                    {
                                                        subject.marks
                                                    }{" "}
                                                    Marks
                                                </div>
                                            </div>

                                            <div
                                                style={
                                                    styles.checkCircle
                                                }
                                            >
                                                <Icon
                                                    name="check"
                                                    size={16}
                                                    stroke="#FFFFFF"
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        <div
                            style={
                                styles.panel
                            }
                        >
                            <div
                                style={
                                    styles.panelHeader
                                }
                            >
                                <div>
                                    <h2
                                        style={
                                            styles.panelTitle
                                        }
                                    >
                                        Test Instructions
                                    </h2>

                                    <p
                                        style={
                                            styles.panelSubtitle
                                        }
                                    >
                                        Please read before
                                        starting
                                    </p>
                                </div>

                                <div
                                    style={
                                        styles.infoCircle
                                    }
                                >
                                    <Icon
                                        name="info"
                                        size={17}
                                        stroke={
                                            COLORS.green
                                        }
                                    />
                                </div>
                            </div>

                            <Instruction
                                number="01"
                                text="The test will begin immediately after you tap Start Test."
                            />

                            <Instruction
                                number="02"
                                text="Each question has one best answer. Select the option you think is correct."
                            />

                            <Instruction
                                number="03"
                                text="Your responses are evaluated securely by the server."
                            />

                            <Instruction
                                number="04"
                                text="Questions can be randomly selected according to the chosen difficulty."
                                last
                            />
                        </div>
                    )}

                    <div
                        style={
                            styles.readyCard
                        }
                    >
                        <div
                            style={
                                styles.readyHeader
                            }
                        >
                            <div>
                                <div
                                    style={
                                        styles.readyTitle
                                    }
                                >
                                    {questionsLoading
                                        ? "Loading your test…"
                                        : questions.length >
                                            0
                                            ? "Ready to begin?"
                                            : "Test not ready"}
                                </div>

                                <div
                                    style={
                                        styles.readySubtitle
                                    }
                                >
                                    {questionsLoading
                                        ? "Fetching a fresh random question set."
                                        : questions.length >
                                            0
                                            ? `${questions.length} real questions are loaded.`
                                            : "Add active questions in MongoDB before starting."}
                                </div>
                            </div>

                            <div
                                style={
                                    styles.readyCheck
                                }
                            >
                                <Icon
                                    name="check"
                                    size={18}
                                    stroke={
                                        COLORS.green
                                    }
                                />
                            </div>
                        </div>

                        <button
                            type="button"
                            style={{
                                ...styles.startButton,

                                opacity:
                                    questionsLoading ||
                                        questions.length ===
                                        0
                                        ? 0.55
                                        : 1,

                                cursor:
                                    questionsLoading ||
                                        questions.length ===
                                        0
                                        ? "not-allowed"
                                        : "pointer",
                            }}
                            onClick={
                                startTest
                            }
                            disabled={
                                questionsLoading ||
                                questions.length ===
                                0
                            }
                        >
                            <Icon
                                name="play"
                                size={18}
                                stroke="#FFFFFF"
                            />

                            <span>
                                Start Test
                            </span>
                        </button>
                    </div>
                </main>
            </Page>
        );
    }

    /* =======================================================
       ACTIVE TEST
       ======================================================= */

    if (
        stage === "test" &&
        selectedTest
    ) {
        if (
            !Array.isArray(questions) ||
            questions.length === 0 ||
            currentQuestion < 0 ||
            currentQuestion >= questions.length ||
            !currentQuestionData
        ) {
            return (
                <Page>
                    <Header
                        right={
                            <div
                                style={
                                    styles.examHeaderRight
                                }
                            >
                                <div
                                    style={
                                        styles.testCounter
                                    }
                                >
                                    {currentQuestion + 1}
                                    /
                                    {questions.length}
                                </div>

                                <div
                                    style={
                                        styles.timerPill
                                    }
                                >
                                    <Icon
                                        name="clock"
                                        size={15}
                                        stroke={
                                            COLORS.green
                                        }
                                    />

                                    <span>
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                            </div>
                        }
                    />

                    <main
                        style={
                            styles.container
                        }
                    >
                        <div
                            style={
                                styles.errorBox
                            }
                        >
                            <strong>
                                Question could not be loaded
                            </strong>

                            <div
                                style={{
                                    marginTop: 5,
                                }}
                            >
                                The current question is unavailable. Return to the test preview and try again.
                            </div>
                        </div>

                        <button
                            type="button"
                            style={
                                styles.primaryResultButton
                            }
                            onClick={() =>
                                setStage("preview")
                            }
                        >
                            Back to Test
                        </button>
                    </main>
                </Page>
            );
        }

        const progress =
            questions.length >
                0
                ? ((currentQuestion +
                    1) /
                    questions.length) *
                100
                : 0;

        const answeredCount =
            Object.keys(
                answers
            ).length;

        return (
            <Page>
                <Header
                    right={
                        <div
                            style={
                                styles.examHeaderRight
                            }
                        >
                            <div
                                style={
                                    styles.testCounter
                                }
                            >
                                {currentQuestion +
                                    1}
                                /
                                {questions.length}
                            </div>

                            <div
                                style={
                                    styles.timerPill
                                }
                            >
                                <Icon
                                    name="clock"
                                    size={15}
                                    stroke={
                                        COLORS.green
                                    }
                                />

                                <span>
                                    {formatTime(
                                        timeLeft
                                    )}
                                </span>
                            </div>
                        </div>
                    }
                />

                <main
                    style={
                        styles.container
                    }
                >
                    <div
                        style={
                            styles.examModeBar
                        }
                    >
                        EXAM MODE • Do not leave the test
                        {examViolationCount > 0 && (
                            <span>
                                {` • Violation ${examViolationCount}`}
                            </span>
                        )}
                    </div>

                    {examWarning && (
                        <div
                            style={
                                styles.examWarning
                            }
                        >
                            {examWarning}
                        </div>
                    )}

                    <div
                        style={
                            styles.examBar
                        }
                    >
                        <div
                            style={{
                                minWidth: 0,
                                flex: 1,
                            }}
                        >
                            <div
                                style={
                                    styles.examLabel
                                }
                            >
                                CURRENT TEST
                            </div>

                            <div
                                style={
                                    styles.examName
                                }
                            >
                                {
                                    selectedTest.title
                                }
                            </div>
                        </div>

                    </div>

                    <div
                        style={
                            styles.progressWrapper
                        }
                    >
                        <div
                            style={
                                styles.progressTrack
                            }
                        >
                            <div
                                style={{
                                    ...styles.progressFill,

                                    width: `${progress}%`,
                                }}
                            />
                        </div>

                        <div
                            style={
                                styles.progressText
                            }
                        >
                            <span>
                                Question{" "}
                                {currentQuestion +
                                    1}{" "}
                                of{" "}
                                {
                                    questions.length
                                }
                            </span>

                            <span>
                                {
                                    Math.round(
                                        progress
                                    )
                                }
                                % complete
                            </span>
                        </div>
                    </div>

                    <div
                        style={
                            styles.attemptBar
                        }
                    >
                        <span>
                            Difficulty:{" "}
                            <strong>
                                {difficulty}
                            </strong>
                        </span>

                        <span>
                            Attempted:{" "}
                            <strong>
                                {answeredCount}
                            </strong>
                        </span>
                    </div>

                    <div
                        style={
                            styles.questionPalette
                        }
                    >
                        <div
                            style={
                                styles.paletteHeader
                            }
                        >
                            <div
                                style={
                                    styles.paletteTitle
                                }
                            >
                                Question Palette
                            </div>

                            <div
                                style={
                                    styles.paletteLegend
                                }
                            >
                                <span
                                    style={
                                        styles.legendItem
                                    }
                                >
                                    <span
                                        style={{
                                            ...styles.legendDot,
                                            ...styles.legendDotCurrent,
                                        }}
                                    />
                                    Current
                                </span>

                                <span
                                    style={
                                        styles.legendItem
                                    }
                                >
                                    <span
                                        style={{
                                            ...styles.legendDot,
                                            ...styles.legendDotAnswered,
                                        }}
                                    />
                                    Answered
                                </span>

                                <span
                                    style={
                                        styles.legendItem
                                    }
                                >
                                    <span
                                        style={{
                                            ...styles.legendDot,
                                            ...styles.legendDotUnanswered,
                                        }}
                                    />
                                    Not Answered
                                </span>
                            </div>
                        </div>

                        <div
                            style={
                                styles.paletteGrid
                            }
                        >
                            {questions.map((question, index) => {
                                const isCurrent =
                                    index === currentQuestion;
                                const isAnswered =
                                    Boolean(answers[index]);
                                const isMarked =
                                    markedQuestions.includes(index);

                                return (
                                    <button
                                        key={
                                            String(
                                                question.questionId ||
                                                question.id ||
                                                index
                                            )
                                        }
                                        type="button"
                                        aria-label={`Go to question ${index + 1}`}
                                        aria-current={
                                            isCurrent
                                                ? "step"
                                                : undefined
                                        }
                                        onClick={() =>
                                            goToQuestion(index)
                                        }
                                        disabled={isSubmitting}
                                        style={{
                                            ...styles.paletteButton,
                                            ...(isAnswered
                                                ? styles.paletteButtonAnswered
                                                : styles.paletteButtonUnanswered),
                                            ...(isCurrent
                                                ? styles.paletteButtonCurrent
                                                : {}),
                                            ...(isMarked
                                                ? styles.paletteButtonMarked
                                                : {}),
                                        }}
                                    >
                                        {index + 1}
                                        {isMarked && (
                                            <span
                                                aria-label="Marked for review"
                                                style={
                                                    styles.paletteReviewDot
                                                }
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        style={
                            styles.questionPanel
                        }
                    >
                        <div
                            style={
                                styles.questionLabel
                            }
                        >
                            QUESTION{" "}
                            {String(
                                currentQuestion +
                                1
                            ).padStart(
                                2,
                                "0"
                            )}
                        </div>


                        <button
                            type="button"
                            style={
                                styles.examBookmarkButton
                            }
                            onClick={
                                toggleQuestionBookmark
                            }
                            disabled={isSubmitting}
                        >
                            {bookmarkIds.has(
                                currentQuestionData.questionId
                            )
                                ? "Bookmarked"
                                : "Bookmark"}
                        </button>
                        <h1
                            style={
                                styles.questionText
                            }
                        >
                            {
                                currentQuestionData.question
                            }
                        </h1>

                        {currentQuestionData.chapterName && (
                            <div
                                style={
                                    styles.questionMeta
                                }
                            >
                                {
                                    currentQuestionData.subjectName
                                }

                                {currentQuestionData
                                    .chapterName
                                    ? ` • ${currentQuestionData.chapterName}`
                                    : ""}
                            </div>
                        )}

                        <div
                            style={
                                styles.options
                            }
                        >
                            {currentQuestionData.options.map(
                                (option) => {
                                    const selected =
                                        answers[currentQuestion] ===
                                        option.key;

                                    return (
                                        <button
                                            type="button"
                                            key={
                                                option.key
                                            }
                                            onClick={() =>
                                                chooseAnswer(
                                                    option.key
                                                )
                                            }
                                            style={{
                                                ...styles.optionButton,

                                                ...(selected
                                                    ? styles.selectedOption
                                                    : {}),
                                            }}
                                        >
                                            <span
                                                style={{
                                                    ...styles.optionLetter,

                                                    ...(selected
                                                        ? styles.selectedLetter
                                                        : {}),
                                                }}
                                            >
                                                {
                                                    option.key
                                                }
                                            </span>

                                            <span
                                                style={{
                                                    flex: 1,
                                                    textAlign:
                                                        "left",
                                                }}
                                            >
                                                {
                                                    option.text
                                                }
                                            </span>

                                            {selected && (
                                                <span
                                                    style={
                                                        styles.optionTick
                                                    }
                                                >
                                                    <Icon
                                                        name="check"
                                                        size={14}
                                                        stroke="#FFFFFF"
                                                    />
                                                </span>
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <div
                            style={
                                styles.testActionRow
                            }
                        >
                            <button
                                type="button"
                                style={{
                                    ...styles.smallActionButton,
                                    ...(currentQuestion === 0
                                        ? styles.smallActionButtonDisabled
                                        : {}),
                                }}
                                onClick={() =>
                                    setCurrentQuestion(
                                        (previous) =>
                                            Math.max(0, previous - 1)
                                    )
                                }
                                disabled={
                                    currentQuestion === 0 ||
                                    isSubmitting
                                }
                            >
                                <Icon
                                    name="back"
                                    size={16}
                                    stroke={COLORS.navy}
                                />
                                Previous
                            </button>

                            <button
                                type="button"
                                style={
                                    styles.markButton
                                }
                                onClick={
                                    toggleMarkForReview
                                }
                                disabled={isSubmitting}
                            >
                                {isCurrentMarked
                                    ? "Marked"
                                    : "Mark for Review"}
                            </button>

                            <button
                                type="button"
                                style={
                                    styles.nextButtonCompact
                                }
                                onClick={nextQuestion}
                                disabled={isSubmitting}
                            >
                                {currentQuestion ===
                                    questions.length - 1
                                    ? "Submit Test"
                                    : "Next"}

                                <Icon
                                    name="arrow"
                                    size={17}
                                    stroke="#FFFFFF"
                                />
                            </button>
                        </div>
                    </div>
                </main>
            </Page>
        );
    }

    /* =======================================================
       SUBMISSION
       ======================================================= */

    if (
        stage ===
        "submission"
    ) {
        return (
            <Page>
                <main
                    style={
                        styles.submissionPage
                    }
                >
                    <div
                        style={
                            styles.submissionCard
                        }
                    >
                        <div
                            style={
                                styles.successRing
                            }
                        >
                            <Icon
                                name="check"
                                size={55}
                                stroke="#FFFFFF"
                            />
                        </div>

                        <div
                            style={
                                styles.successEyebrow
                            }
                        >
                            TEST SUBMISSION
                        </div>

                        <h1
                            style={
                                styles.successTitle
                            }
                        >
                            {submissionError
                                ? "Submission Failed"
                                : "Test Submitted Successfully!"}
                        </h1>

                        <p
                            style={
                                styles.successText
                            }
                        >
                            {submissionError
                                ? submissionError
                                : "Your responses are being evaluated securely by the server."}
                        </p>

                        <div
                            style={
                                styles.largeProgress
                            }
                        >
                            <div
                                style={{
                                    ...styles.largeProgressFill,

                                    width: `${submitProgress}%`,
                                }}
                            />
                        </div>

                        <div
                            style={
                                styles.analysisStatus
                            }
                        >
                            <span>
                                {submissionError
                                    ? "Please go back and try again"
                                    : "Calculating your result"}
                            </span>

                            <strong>
                                {
                                    submitProgress
                                }
                                %
                            </strong>
                        </div>

                        {submissionError && (
                            <button
                                type="button"
                                style={
                                    styles.primaryResultButton
                                }
                                onClick={() =>
                                    setStage(
                                        "preview"
                                    )
                                }
                            >
                                Back to Test
                            </button>
                        )}
                    </div>
                </main>
            </Page>
        );
    }

    /* =======================================================
       RESULT
       ======================================================= */

    if (
        stage === "result"
    ) {
        return (
            <Page>
                <main
                    style={
                        styles.container
                    }
                >
                    <div
                        style={
                            styles.kicker
                        }
                    >
                        TEST COMPLETED
                    </div>

                    <div
                        style={
                            styles.resultHero
                        }
                    >
                        <div>
                            <h1
                                style={
                                    styles.pageTitle
                                }
                            >
                                Test Result
                            </h1>

                            <p
                                style={
                                    styles.pageSubtitle
                                }
                            >
                                {
                                    selectedTest?.title
                                }
                            </p>
                        </div>

                        <div
                            style={
                                styles.resultStatus
                            }
                        >
                            Completed
                        </div>
                    </div>

                    <div
                        style={
                            styles.scoreCard
                        }
                    >
                        <div
                            style={
                                styles.scoreCircle
                            }
                        >
                            <div
                                style={
                                    styles.scoreValue
                                }
                            >
                                {
                                    resultScore
                                }
                            </div>

                            <div
                                style={
                                    styles.scoreCaption
                                }
                            >
                                Score
                            </div>
                        </div>

                        <div
                            style={
                                styles.scoreSummary
                            }
                        >
                            <div
                                style={
                                    styles.scoreSummaryLabel
                                }
                            >
                                Total Performance
                            </div>

                            <div
                                style={
                                    styles.scoreSummaryValue
                                }
                            >
                                {
                                    resultCorrect
                                }{" "}
                                /{" "}
                                {
                                    resultTotalQuestions
                                }
                            </div>

                            <div
                                style={
                                    styles.scoreSummaryHint
                                }
                            >
                                Accuracy:{" "}
                                <strong>
                                    {
                                        resultAccuracy
                                    }
                                    %
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div
                        style={
                            styles.resultGrid
                        }
                    >
                        <ResultMetric
                            label="Correct"
                            value={
                                resultCorrect
                            }
                            icon="check"
                        />

                        <ResultMetric
                            label="Incorrect"
                            value={
                                resultIncorrect
                            }
                            icon="close"
                        />

                        <ResultMetric
                            label="Skipped"
                            value={
                                resultSkipped
                            }
                            icon="questions"
                        />
                    </div>

                    <div
                        style={
                            styles.rankCard
                        }
                    >
                        <div
                            style={
                                styles.rankIcon
                            }
                        >
                            <Icon
                                name="target"
                                size={22}
                                stroke={
                                    COLORS.green
                                }
                            />
                        </div>

                        <div>
                            <div
                                style={
                                    styles.rankSmall
                                }
                            >
                                PERFORMANCE
                            </div>

                            <div
                                style={
                                    styles.rankTitle
                                }
                            >
                                Difficulty
                            </div>

                            <div
                                style={
                                    styles.rankNumber
                                }
                            >
                                {
                                    difficulty
                                }
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        style={
                            styles.primaryResultButton
                        }
                        onClick={
                            resetTests
                        }
                    >
                        Take Another Test

                        <Icon
                            name="arrow"
                            size={17}
                            stroke="#FFFFFF"
                        />
                    </button>

                    {onOpenSection && (
                        <button
                            type="button"
                            style={
                                styles.secondaryResultButton
                            }
                            onClick={() =>
                                onOpenSection(
                                    "analysis"
                                )
                            }
                        >
                            View Analysis

                            <Icon
                                name="arrow"
                                size={15}
                                stroke={
                                    COLORS.green
                                }
                            />
                        </button>
                    )}
                </main>
            </Page>
        );
    }

    return (
        <Page>
            <Header onBack={onBack} />
            <main
                style={
                    styles.container
                }
            >
                <div
                    style={
                        styles.errorBox
                    }
                >
                    <strong>
                        Mock Test could not be loaded
                    </strong>

                    <div
                        style={{
                            marginTop: 5,
                        }}
                    >
                        Please return to the test list and try again.
                    </div>
                </div>

                <button
                    type="button"
                    style={
                        styles.primaryResultButton
                    }
                    onClick={resetTests}
                >
                    Back to Mock Tests
                </button>
            </main>
        </Page>
    );
}

/* =========================================================
   PAGE
   ========================================================= */

function Page({
    children,
}) {
    return (
        <div
            style={
                styles.page
            }
        >
            <div
                style={
                    styles.mobileShell
                }
            >
                {children}
            </div>
        </div>
    );
}

/* =========================================================
   HEADER
   ========================================================= */

function Header({
    onBack,
    right,
}) {
    return (
        <header
            style={
                styles.header
            }
        >
            {onBack ? (
                <button
                    type="button"
                    style={
                        styles.backButton
                    }
                    onClick={
                        onBack
                    }
                >
                    <Icon
                        name="back"
                        size={20}
                    />
                </button>
            ) : (
                <div
                    style={{
                        width: 36,
                    }}
                />
            )}

            <div
                style={
                    styles.brandWrap
                }
            >
                <div
                    style={
                        styles.brand
                    }
                >
                    ILS RANKER
                </div>

                <div
                    style={
                        styles.brandSub
                    }
                >
                    EXAM PREPARATION
                </div>
            </div>

            {right ? (
                <div>
                    {right}
                </div>
            ) : (
                <div
                    style={{
                        width: 36,
                    }}
                />
            )}
        </header>
    );
}

/* =========================================================
   STAT
   ========================================================= */

function Stat({
    icon,
    text,
}) {
    return (
        <div
            style={
                styles.stat
            }
        >
            <Icon
                name={icon}
                size={14}
                stroke={
                    COLORS.green
                }
            />

            <span>
                {text}
            </span>
        </div>
    );
}

/* =========================================================
   TEST CARD
   ========================================================= */

function TestCard({
    test,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={
                onClick
            }
            style={
                styles.testCard
            }
        >
            <div
                style={
                    styles.testCardIcon
                }
            >
                <Icon
                    name={test.icon}
                    size={22}
                    stroke={
                        COLORS.green
                    }
                />
            </div>

            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            >
                <div
                    style={
                        styles.testCardTop
                    }
                >
                    <span
                        style={
                            styles.testNumber
                        }
                    >
                        {
                            test.number
                        }
                    </span>

                    <span
                        style={
                            styles.testDifficulty
                        }
                    >
                        {
                            test.difficulty
                        }
                    </span>
                </div>

                <div
                    style={
                        styles.testCardTitle
                    }
                >
                    {
                        test.title
                    }
                </div>

                <div
                    style={
                        styles.testCardMeta
                    }
                >
                    {
                        test.questions
                    }{" "}
                    Questions{" "}
                    <span>
                        •
                    </span>{" "}
                    {
                        test.duration
                    }
                </div>
            </div>

            <Icon
                name="arrow"
                size={17}
                stroke={
                    COLORS.muted
                }
            />
        </button>
    );
}

/* =========================================================
   META
   ========================================================= */

function MetaBox({
    icon,
    label,
    value,
}) {
    return (
        <div
            style={
                styles.metaBox
            }
        >
            <div
                style={
                    styles.metaIcon
                }
            >
                <Icon
                    name={icon}
                    size={16}
                    stroke={
                        COLORS.green
                    }
                />
            </div>

            <div
                style={
                    styles.metaLabel
                }
            >
                {label}
            </div>

            <div
                style={
                    styles.metaValue
                }
            >
                {value}
            </div>
        </div>
    );
}

/* =========================================================
   INSTRUCTION
   ========================================================= */

function Instruction({
    number,
    text,
    last = false,
}) {
    return (
        <div
            style={{
                ...styles.instruction,

                borderBottom:
                    last
                        ? "none"
                        : `1px solid ${COLORS.border}`,
            }}
        >
            <div
                style={
                    styles.instructionNumber
                }
            >
                {number}
            </div>

            <div
                style={
                    styles.instructionText
                }
            >
                {text}
            </div>
        </div>
    );
}

/* =========================================================
   RESULT METRIC
   ========================================================= */

function ResultMetric({
    label,
    value,
    icon,
}) {
    const iconStroke =
        label ===
            "Incorrect"
            ? COLORS.red
            : COLORS.green;

    return (
        <div
            style={
                styles.resultMetric
            }
        >
            <div
                style={{
                    ...styles.resultMetricIcon,

                    ...(label ===
                        "Incorrect"
                        ? {
                            background:
                                "#FFF5F5",
                        }
                        : {}),
                }}
            >
                <Icon
                    name={icon}
                    size={16}
                    stroke={
                        iconStroke
                    }
                />
            </div>

            <div
                style={
                    styles.resultMetricLabel
                }
            >
                {label}
            </div>

            <div
                style={
                    styles.resultMetricValue
                }
            >
                {value}
            </div>
        </div>
    );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = {
    page: {
        minHeight:
            "100dvh",
        width: "100%",
        background:
            "transparent",
        display: "flex",
        justifyContent:
            "center",
        boxSizing:
            "border-box",
    },

    mobileShell: {
        width:
            "100%",
        maxWidth: "430px",
        minHeight:
            "100dvh",
        background:
            "transparent",
        position:
            "relative",
        boxSizing:
            "border-box",
    },

    header: {
        minHeight: 66,
        padding:
            "11px 15px",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "space-between",
        gap: 10,
        background:
            "rgba(6, 49, 43, 0.85)",
        backdropFilter:
            "blur(16px)",
        WebkitBackdropFilter:
            "blur(16px)",
        borderBottom:
            `1px solid ${COLORS.border}`,
        boxSizing:
            "border-box",
        position:
            "sticky",
        top: 0,
        zIndex: 20,
    },

    backButton: {
        width: 36,
        height: 36,
        border:
            `1px solid ${COLORS.border}`,
        borderRadius: 11,
        background:
            "rgba(255, 255, 255, 0.08)",
        color:
            "#10E79D",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        cursor:
            "pointer",
        flexShrink: 0,
    },

    brandWrap: {
        textAlign:
            "center",
        flex: 1,
    },

    brand: {
        fontSize: 15,
        fontWeight: 950,
        letterSpacing:
            1.5,
        color:
            COLORS.navy,
    },

    brandSub: {
        marginTop: 2,
        fontSize: 7,
        fontWeight: 850,
        letterSpacing:
            1.2,
        color:
            COLORS.muted,
    },

    container: {
        padding:
            "20px 16px 145px",
        boxSizing:
            "border-box",
    },

    kicker: {
        color:
            COLORS.green,
        fontSize: 10,
        fontWeight: 900,
        letterSpacing:
            1.4,
        textTransform: "uppercase",
    },

    pageTitle: {
        margin:
            "8px 0 0",
        color:
            "#FFFFFF",
        fontSize: 28,
        lineHeight: 1.15,
        fontWeight: 900,
        letterSpacing: "-0.5px",
    },

    pageSubtitle: {
        margin:
            "8px 0 0",
        color:
            COLORS.muted,
        fontSize: 12.5,
        lineHeight: 1.5,
        maxWidth: 370,
    },

    featuredCard: {
        marginTop: 18,
        borderRadius: 24,
        padding: 18,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.12)`,
        boxShadow:
            "0 15px 36px rgba(0, 0, 0, 0.4)",
    },

    featuredTop: {
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "space-between",
    },

    featuredIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        background:
            "rgba(16, 231, 157, 0.15)",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        border:
            `1px solid rgba(16, 231, 157, 0.25)`,
    },

    featuredBadge: {
        padding:
            "7px 11px",
        borderRadius: 9,
        background:
            "rgba(16, 231, 157, 0.15)",
        border:
            "1px solid rgba(16, 231, 157, 0.3)",
        color:
            COLORS.green,
        fontSize: 8.5,
        fontWeight: 900,
        letterSpacing:
            0.8,
    },

    featuredTitle: {
        marginTop: 16,
        fontSize: 22,
        fontWeight: 950,
        color:
            "#FFFFFF",
    },

    featuredDescription: {
        marginTop: 6,
        color:
            "rgba(226, 232, 240, 0.75)",
        fontSize: 11,
        lineHeight: 1.5,
    },

    featuredStats: {
        marginTop: 15,
        display:
            "grid",
        gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
        gap: 7,
    },

    stat: {
        minHeight: 34,
        padding:
            "7px 6px",
        borderRadius: 11,
        background:
            "rgba(255, 255, 255, 0.06)",
        border:
            "1px solid rgba(255, 255, 255, 0.1)",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        gap: 5,
        color:
            "#FFFFFF",
        fontSize: 10,
        fontWeight: 800,
        textAlign:
            "center",
    },

    featuredButton: {
        marginTop: 15,
        width:
            "100%",
        padding:
            "13px 15px",
        border: "none",
        borderRadius: 13,
        background:
            "linear-gradient(135deg, #10E79D, #007050)",
        color:
            "#010F0E",
        fontSize: 13,
        fontWeight: 900,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        gap: 9,
        cursor:
            "pointer",
        boxShadow:
            "0 6px 20px rgba(16, 231, 157, 0.35)",
    },

    sectionHeader: {
        marginTop: 24,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "space-between",
    },

    sectionTitle: {
        margin: 0,
        color:
            COLORS.navy,
        fontSize: 15,
        fontWeight: 900,
    },

    sectionCount: {
        color:
            COLORS.muted,
        fontSize: 9,
        fontWeight: 800,
    },

    testCard: {
        width:
            "100%",
        marginTop: 9,
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: 18,
        padding:
            "13px 12px",
        background:
            "rgba(255, 255, 255, 0.05)",
        display:
            "flex",
        alignItems:
            "center",
        gap: 11,
        textAlign:
            "left",
        cursor:
            "pointer",
        boxSizing:
            "border-box",
    },

    testCardIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        background:
            COLORS.mint,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    testCardTop: {
        display:
            "flex",
        justifyContent:
            "space-between",
        alignItems:
            "center",
        gap: 8,
    },

    testNumber: {
        color:
            COLORS.green,
        fontSize: 9.5,
        fontWeight: 850,
        letterSpacing:
            0.5,
    },

    testDifficulty: {
        color:
            COLORS.muted,
        fontSize: 9.5,
        fontWeight: 750,
    },

    testCardTitle: {
        marginTop: 4,
        color:
            "#FFFFFF",
        fontSize: 13.5,
        fontWeight: 850,
        lineHeight: 1.3,
    },

    testCardMeta: {
        marginTop: 4,
        color:
            COLORS.muted,
        fontSize: 10.5,
        fontWeight: 600,
    },

    tipCard: {
        marginTop: 15,
        padding: 14,
        borderRadius: 16,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        display:
            "flex",
        gap: 10,
        alignItems:
            "flex-start",
    },

    tipIcon: {
        width: 36,
        height: 36,
        borderRadius: 11,
        background:
            "rgba(16, 231, 157, 0.15)",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    tipTitle: {
        fontSize: 11,
        fontWeight: 900,
        color:
            "#FFFFFF",
    },

    tipText: {
        marginTop: 4,
        fontSize: 9.5,
        lineHeight: 1.45,
        color:
            COLORS.muted,
    },

    breadcrumb: {
        display:
            "flex",
        gap: 6,
        alignItems:
            "center",
        color:
            COLORS.muted,
        fontSize: 9,
    },

    testHero: {
        marginTop: 15,
        display:
            "flex",
        alignItems:
            "flex-start",
        gap: 12,
    },

    testHeroIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        background:
            "rgba(16, 231, 157, 0.15)",
        border:
            `1px solid rgba(16, 231, 157, 0.3)`,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    testHeroEyebrow: {
        color:
            COLORS.green,
        fontSize: 8,
        fontWeight: 900,
        letterSpacing:
            0.8,
    },

    testHeroTitle: {
        margin:
            "5px 0 0",
        fontSize: 21,
        lineHeight: 1.22,
        fontWeight: 950,
        color:
            "#FFFFFF",
    },

    testHeroDescription: {
        margin:
            "6px 0 0",
        fontSize: 10.5,
        lineHeight: 1.5,
        color:
            COLORS.muted,
    },

    metaGrid: {
        marginTop: 17,
        display:
            "grid",
        gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
        gap: 7,
    },

    metaBox: {
        padding:
            "11px 7px",
        borderRadius: 15,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        textAlign:
            "center",
    },

    metaIcon: {
        width: 30,
        height: 30,
        margin:
            "0 auto",
        borderRadius: 10,
        background:
            COLORS.mint,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
    },

    metaLabel: {
        marginTop: 7,
        color:
            COLORS.muted,
        fontSize: 8.5,
        fontWeight: 750,
    },

    metaValue: {
        marginTop: 3,
        color:
            "#FFFFFF",
        fontSize: 13,
        fontWeight: 900,
    },

    difficultyCard: {
        marginTop: 14,
        padding: 15,
        borderRadius: 19,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
    },

    difficultyHeader: {
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "space-between",
        gap: 10,
    },

    difficultyTitle: {
        color:
            "#FFFFFF",
        fontSize: 13,
        fontWeight: 900,
    },

    difficultySubtitle: {
        marginTop: 4,
        color:
            COLORS.muted,
        fontSize: 9.5,
        lineHeight: 1.4,
    },

    difficultyBadge: {
        flexShrink: 0,
        padding:
            "6px 9px",
        borderRadius: 9,
        background:
            COLORS.mint,
        color:
            COLORS.green,
        fontSize: 8,
        fontWeight: 900,
    },

    difficultyOptions: {
        marginTop: 12,
        display:
            "grid",
        gridTemplateColumns:
            "repeat(4, minmax(0, 1fr))",
        gap: 6,
    },

    difficultyButton: {
        padding:
            "9px 4px",
        borderRadius: 10,
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        background:
            "rgba(255, 255, 255, 0.06)",
        color:
            "#FFFFFF",
        fontSize: 9.5,
        fontWeight: 850,
        cursor:
            "pointer",
    },

    difficultyButtonActive: {
        background:
            "linear-gradient(135deg, #10E79D, #007050)",
        color:
            "#010F0E",
        border:
            `1px solid ${COLORS.green}`,
        boxShadow:
            "0 4px 12px rgba(16, 231, 157, 0.3)",
    },

    randomNote: {
        marginTop: 10,
        display:
            "flex",
        alignItems:
            "center",
        gap: 6,
        color:
            COLORS.muted,
        fontSize: 8.5,
        lineHeight: 1.4,
    },

    errorBox: {
        marginTop: 13,
        padding:
            "12px 13px",
        borderRadius: 14,
        background:
            "#FFF5F5",
        border:
            "1px solid #F1D8D8",
        color:
            COLORS.red,
        fontSize: 10,
        lineHeight: 1.5,
    },

    infoBox: {
        marginTop: 13,
        padding:
            "11px 13px",
        borderRadius: 14,
        background:
            COLORS.softMint,
        border:
            `1px solid ${COLORS.border}`,
        color:
            COLORS.navy,
        fontSize: 9.5,
        lineHeight: 1.5,
    },

    tabs: {
        marginTop: 16,
        display:
            "flex",
        gap: 4,
        padding: 4,
        borderRadius: 12,
        background:
            COLORS.softMint,
    },

    tab: {
        flex: 1,
        padding:
            "9px 8px",
        border: "none",
        borderRadius: 9,
        background:
            "transparent",
        color:
            COLORS.muted,
        fontSize: 9.5,
        fontWeight: 850,
        cursor:
            "pointer",
    },

    activeTab: {
        background:
            "rgba(16, 231, 157, 0.2)",
        color:
            COLORS.green,
        boxShadow:
            "0 2px 8px rgba(16, 231, 157, 0.2)",
    },

    panel: {
        marginTop: 10,
        borderRadius: 19,
        padding: 15,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
    },

    panelHeader: {
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "space-between",
        gap: 10,
    },

    panelTitle: {
        margin: 0,
        color:
            COLORS.navy,
        fontSize: 13,
        fontWeight: 900,
    },

    panelSubtitle: {
        margin:
            "4px 0 0",
        color:
            COLORS.muted,
        fontSize: 9,
    },

    panelBadge: {
        padding:
            "6px 8px",
        borderRadius: 9,
        background:
            COLORS.mint,
        color:
            COLORS.green,
        fontSize: 8,
        fontWeight: 900,
    },

    subjectList: {
        marginTop: 9,
    },

    subjectItem: {
        padding:
            "11px 0",
        display:
            "flex",
        alignItems:
            "center",
        gap: 10,
    },

    subjectAvatar: {
        width: 36,
        height: 36,
        borderRadius: 11,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        fontSize: 14,
        fontWeight: 900,
        flexShrink: 0,
    },

    subjectName: {
        color:
            COLORS.navy,
        fontSize: 11,
        fontWeight: 850,
    },

    subjectMeta: {
        marginTop: 3,
        color:
            COLORS.muted,
        fontSize: 8.5,
    },

    checkCircle: {
        width: 23,
        height: 23,
        borderRadius:
            "50%",
        background:
            COLORS.green,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
    },

    infoCircle: {
        width: 30,
        height: 30,
        borderRadius:
            "50%",
        background:
            COLORS.mint,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
    },

    instruction: {
        padding:
            "12px 0",
        display:
            "flex",
        gap: 10,
    },

    instructionNumber: {
        width: 27,
        height: 27,
        borderRadius: 9,
        background:
            COLORS.mint,
        color:
            COLORS.green,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        fontSize: 8,
        fontWeight: 900,
        flexShrink: 0,
    },

    instructionText: {
        flex: 1,
        color:
            COLORS.muted,
        fontSize: 9.5,
        lineHeight: 1.5,
    },

    readyCard: {
        marginTop: 14,
        padding: 15,
        borderRadius: 19,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid ${COLORS.border}`,
    },

    readyHeader: {
        display:
            "flex",
        justifyContent:
            "space-between",
        alignItems:
            "center",
        gap: 10,
    },

    readyTitle: {
        color:
            COLORS.navy,
        fontSize: 13,
        fontWeight: 900,
    },

    readySubtitle: {
        marginTop: 4,
        color:
            COLORS.muted,
        fontSize: 9,
        lineHeight: 1.4,
    },

    readyCheck: {
        width: 35,
        height: 35,
        borderRadius: 11,
        background:
            "rgba(16, 231, 157, 0.15)",
        border:
            `1px solid rgba(16, 231, 157, 0.3)`,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    startButton: {
        marginTop: 13,
        width:
            "100%",
        padding:
            "13px 15px",
        border: "none",
        borderRadius: 13,
        background:
            "linear-gradient(135deg, #10E79D, #007050)",
        color:
            "#010F0E",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 900,
        boxShadow:
            "0 6px 20px rgba(16, 231, 157, 0.35)",
        cursor:
            "pointer",
    },

    examBar: {
        display:
            "flex",
        justifyContent:
            "space-between",
        alignItems:
            "center",
        gap: 10,
    },

    examHeaderRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 6,
    },

    examModeBar: {
        marginBottom: 9,
        padding: "8px 10px",
        borderRadius: 10,
        background: "rgba(16, 231, 157, 0.15)",
        border: "1px solid rgba(16, 231, 157, 0.3)",
        color: COLORS.green,
        fontSize: 8.5,
        fontWeight: 900,
        letterSpacing: 0.4,
        textAlign: "center",
    },

    examWarning: {
        marginBottom: 9,
        padding: "9px 10px",
        borderRadius: 10,
        background: "rgba(244, 63, 94, 0.12)",
        border: "1px solid rgba(244, 63, 94, 0.25)",
        color: "#FB7185",
        fontSize: 9,
        lineHeight: 1.4,
        fontWeight: 800,
    },

    examLabel: {
        color:
            COLORS.green,
        fontSize: 8,
        fontWeight: 900,
        letterSpacing:
            0.9,
    },

    examName: {
        marginTop: 4,
        color:
            COLORS.navy,
        fontSize: 13,
        fontWeight: 900,
        whiteSpace:
            "nowrap",
        overflow:
            "hidden",
        textOverflow:
            "ellipsis",
    },

    timerPill: {
        display:
            "flex",
        alignItems:
            "center",
        gap: 5,
        padding:
            "8px 9px",
        borderRadius: 11,
        background:
            COLORS.mint,
        border:
            `1px solid rgba(16, 231, 157, 0.3)`,
        color:
            COLORS.green,
        fontSize: 10,
        fontWeight: 900,
        flexShrink: 0,
    },

    testCounter: {
        minWidth: 43,
        padding:
            "7px 8px",
        borderRadius: 10,
        background:
            COLORS.mint,
        color:
            COLORS.green,
        fontSize: 9,
        fontWeight: 900,
        textAlign:
            "center",
    },

    progressWrapper: {
        marginTop: 15,
    },

    progressTrack: {
        height: 7,
        borderRadius: 20,
        background:
            "rgba(255, 255, 255, 0.08)",
        overflow:
            "hidden",
    },

    progressFill: {
        height:
            "100%",
        borderRadius: 20,
        background:
            COLORS.green,
        transition:
            "width 200ms ease",
    },

    progressText: {
        marginTop: 6,
        display:
            "flex",
        justifyContent:
            "space-between",
        color:
            COLORS.muted,
        fontSize: 8.5,
        fontWeight: 750,
    },

    attemptBar: {
        marginTop: 10,
        padding:
            "8px 10px",
        borderRadius: 10,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        display:
            "flex",
        justifyContent:
            "space-between",
        color:
            COLORS.muted,
        fontSize: 8.5,
    },

    questionPalette: {
        marginTop: 10,
        padding: 12,
        borderRadius: 15,
        background: "rgba(255, 255, 255, 0.05)",
        border: `1px solid rgba(255, 255, 255, 0.1)`,
    },

    paletteHeader: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 8,
        flexWrap: "wrap",
    },

    paletteTitle: {
        color: COLORS.navy,
        fontSize: 10,
        fontWeight: 900,
    },

    paletteLegend: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: 7,
        color: COLORS.muted,
        fontSize: 7.5,
        lineHeight: 1.3,
    },

    legendItem: {
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        whiteSpace: "nowrap",
    },

    legendDot: {
        width: 7,
        height: 7,
        borderRadius: "50%",
        display: "inline-block",
        flexShrink: 0,
    },

    legendDotCurrent: {
        background: COLORS.green,
    },

    legendDotAnswered: {
        background: COLORS.softMint,
        border: `1px solid ${COLORS.green}`,
    },

    legendDotUnanswered: {
        background: "rgba(255, 255, 255, 0.1)",
        border: `1px solid rgba(255, 255, 255, 0.15)`,
    },

    paletteGrid: {
        marginTop: 9,
        maxHeight: 120,
        overflowY: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(31px, 1fr))",
        gap: 6,
        paddingRight: 2,
    },

    paletteButton: {
        width: "100%",
        minWidth: 0,
        minHeight: 31,
        padding: "5px 2px",
        borderRadius: 9,
        fontSize: 9,
        fontWeight: 900,
        cursor: "pointer",
        boxSizing: "border-box",
        position: "relative",
    },

    paletteButtonUnanswered: {
        background: "rgba(255, 255, 255, 0.06)",
        border: `1px solid rgba(255, 255, 255, 0.1)`,
        color: COLORS.muted,
    },

    paletteButtonAnswered: {
        background: COLORS.softMint,
        border: `1px solid ${COLORS.green}`,
        color: COLORS.green,
    },

    paletteButtonCurrent: {
        background: "linear-gradient(135deg, #10E79D, #007050)",
        border: `1px solid ${COLORS.green}`,
        color: "#010F0E",
        boxShadow: "0 3px 8px rgba(16, 231, 157, 0.35)",
    },

    paletteButtonMarked: {
        boxShadow: "inset 0 0 0 2px rgba(245, 158, 11, 0.75)",
    },

    paletteReviewDot: {
        position: "absolute",
        top: 3,
        right: 3,
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: COLORS.yellow,
    },

    questionPanel: {
        marginTop: 13,
        padding: 17,
        borderRadius: 20,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        boxShadow:
            "0 12px 32px rgba(0, 0, 0, 0.35)",
    },

    questionLabel: {
        color:
            COLORS.green,
        fontSize: 8,
        fontWeight: 900,
        letterSpacing:
            1,
    },

    examBookmarkButton: {
        float: "right",
        minHeight: 30,
        padding: "6px 9px",
        borderRadius: 9,
        border: `1px solid rgba(16, 231, 157, 0.3)`,
        background: COLORS.mint,
        color: COLORS.green,
        fontSize: 8.5,
        fontWeight: 850,
        cursor: "pointer",
    },

    questionText: {
        margin:
            "8px 0 0",
        color:
            COLORS.navy,
        fontSize: 20,
        lineHeight: 1.35,
        fontWeight: 900,
    },

    questionMeta: {
        marginTop: 7,
        color:
            COLORS.muted,
        fontSize: 8.5,
    },

    options: {
        marginTop: 17,
        display:
            "grid",
        gap: 8,
    },

    optionButton: {
        width:
            "100%",
        minHeight: 52,
        padding:
            "9px 10px",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: 13,
        background:
            "rgba(255, 255, 255, 0.05)",
        color:
            COLORS.navy,
        display:
            "flex",
        alignItems:
            "center",
        gap: 10,
        fontSize: 11,
        fontWeight: 700,
        cursor:
            "pointer",
        boxSizing:
            "border-box",
    },

    selectedOption: {
        border:
            `1.5px solid ${COLORS.green}`,
        background:
            "rgba(16, 231, 157, 0.15)",
    },

    optionLetter: {
        width: 30,
        height: 30,
        borderRadius: 10,
        background:
            "rgba(255, 255, 255, 0.08)",
        color:
            "#FFFFFF",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        fontSize: 10,
        fontWeight: 900,
        flexShrink: 0,
    },

    selectedLetter: {
        background:
            COLORS.green,
        color:
            "#010F0E",
    },

    optionTick: {
        width: 22,
        height: 22,
        borderRadius:
            "50%",
        background:
            COLORS.green,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    nextButton: {
        marginTop: 15,
        width:
            "100%",
        padding:
            "14px 16px",
        border: "none",
        borderRadius: 13,
        background:
            "linear-gradient(135deg, #10E79D, #007050)",
        color:
            "#010F0E",
        fontSize: 13,
        fontWeight: 900,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        gap: 10,
        cursor:
            "pointer",
        boxShadow:
            "0 6px 20px rgba(16, 231, 157, 0.35)",
    },

    submissionPage: {
        minHeight:
            "100dvh",
        padding:
            "24px 15px 105px",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        boxSizing:
            "border-box",
    },

    submissionCard: {
        width:
            "100%",
        maxWidth: 360,
        textAlign:
            "center",
        background:
            "rgba(6, 49, 43, 0.95)",
        border:
            `1px solid rgba(16, 231, 157, 0.25)`,
        borderRadius: 26,
        padding:
            "40px 25px",
        boxShadow:
            "0 18px 45px rgba(0, 0, 0, 0.6)",
    },

    successRing: {
        width: 104,
        height: 104,
        borderRadius:
            "50%",
        margin:
            "0 auto",
        background:
            COLORS.green,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
    },

    successEyebrow: {
        marginTop: 28,
        color:
            COLORS.green,
        fontSize: 9,
        fontWeight: 900,
        letterSpacing:
            1,
    },

    successTitle: {
        margin:
            "8px 0 0",
        fontSize: 27,
        lineHeight: 1.23,
        fontWeight: 900,
        color:
            COLORS.navy,
    },

    successText: {
        margin:
            "12px auto 0",
        maxWidth: 390,
        color:
            COLORS.muted,
        fontSize: 12,
        lineHeight: 1.6,
    },

    largeProgress: {
        height: 11,
        background:
            COLORS.softMint,
        borderRadius: 30,
        overflow:
            "hidden",
        marginTop: 28,
    },

    largeProgressFill: {
        height:
            "100%",
        borderRadius: 30,
        background:
            COLORS.green,
        transition:
            "width 100ms linear",
    },

    analysisStatus: {
        marginTop: 10,
        display:
            "flex",
        justifyContent:
            "space-between",
        color:
            COLORS.muted,
        fontSize: 10,
        fontWeight: 750,
    },

    resultHero: {
        display:
            "flex",
        justifyContent:
            "space-between",
        alignItems:
            "flex-end",
        gap: 10,
    },

    resultStatus: {
        display:
            "inline-flex",
        alignItems:
            "center",
        padding:
            "7px 9px",
        borderRadius: 10,
        background:
            COLORS.mint,
        color:
            COLORS.green,
        fontSize: 8.5,
        fontWeight: 900,
        whiteSpace:
            "nowrap",
    },

    scoreCard: {
        marginTop: 17,
        padding: 15,
        borderRadius: 20,
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        display:
            "flex",
        alignItems:
            "center",
        gap: 13,
    },

    scoreCircle: {
        width: 92,
        height: 92,
        borderRadius:
            "50%",
        background:
            COLORS.mint,
        border:
            `10px solid ${COLORS.green}`,
        display:
            "flex",
        flexDirection:
            "column",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    scoreValue: {
        fontSize: 22,
        fontWeight: 900,
        color:
            "#FFFFFF",
    },

    scoreCaption: {
        marginTop: 2,
        fontSize: 9,
        color:
            COLORS.muted,
        fontWeight: 800,
    },

    scoreSummary: {
        minWidth: 0,
    },

    scoreSummaryLabel: {
        color:
            COLORS.muted,
        fontSize: 10,
        fontWeight: 750,
    },

    scoreSummaryValue: {
        marginTop: 4,
        fontSize: 23,
        fontWeight: 900,
        color:
            "#FFFFFF",
    },

    scoreSummaryHint: {
        marginTop: 5,
        color:
            COLORS.muted,
        fontSize: 10,
    },

    resultGrid: {
        marginTop: 12,
        display:
            "grid",
        gridTemplateColumns:
            "repeat(3, minmax(0, 1fr))",
        gap: 7,
    },

    resultMetric: {
        background:
            "rgba(255, 255, 255, 0.05)",
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        borderRadius: 16,
        padding: 13,
    },

    resultMetricIcon: {
        width: 31,
        height: 31,
        borderRadius: 10,
        background:
            COLORS.mint,
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
    },

    resultMetricLabel: {
        marginTop: 9,
        color:
            COLORS.muted,
        fontSize: 9,
        fontWeight: 750,
    },

    resultMetricValue: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: 900,
        color:
            "#FFFFFF",
    },

    rankCard: {
        marginTop: 13,
        background:
            "linear-gradient(135deg, #06312B, #031D1B)",
        border:
            `1px solid rgba(16, 231, 157, 0.3)`,
        borderRadius: 19,
        padding: 16,
        display:
            "flex",
        alignItems:
            "center",
        gap: 12,
    },

    rankIcon: {
        width: 46,
        height: 46,
        borderRadius: 13,
        background:
            "rgba(16, 231, 157, 0.15)",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        flexShrink: 0,
    },

    rankSmall: {
        fontSize: 8,
        fontWeight: 900,
        letterSpacing:
            0.8,
        color:
            COLORS.green,
    },

    rankTitle: {
        marginTop: 3,
        fontSize: 10,
        fontWeight: 800,
        color:
            "#FFFFFF",
    },

    rankNumber: {
        marginTop: 2,
        color:
            COLORS.green,
        fontSize: 19,
        fontWeight: 900,
    },

    primaryResultButton: {
        marginTop: 18,
        width:
            "100%",
        border: "none",
        borderRadius: 13,
        padding:
            "14px 16px",
        background:
            "linear-gradient(135deg, #10E79D, #007050)",
        color:
            "#010F0E",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        gap: 9,
        fontSize: 13,
        fontWeight: 900,
        cursor:
            "pointer",
        boxShadow:
            "0 6px 20px rgba(16, 231, 157, 0.35)",
    },

    secondaryResultButton: {
        marginTop: 9,
        width:
            "100%",
        border:
            `1px solid rgba(16, 231, 157, 0.3)`,
        borderRadius: 13,
        padding:
            "13px 16px",
        background:
            "rgba(255, 255, 255, 0.08)",
        color:
            COLORS.green,
        fontSize: 12,
        fontWeight: 850,
        cursor:
            "pointer",
        display:
            "flex",
        alignItems:
            "center",
        justifyContent:
            "center",
        gap: 8,
    },
    testActionRow: {
        marginTop: 15,
        display: "grid",
        gridTemplateColumns:
            "auto 1fr auto",
        gap: 7,
        alignItems: "center",
    },

    smallActionButton: {
        minHeight: 44,
        padding: "9px 10px",
        borderRadius: 12,
        border:
            `1px solid rgba(255, 255, 255, 0.1)`,
        background: "rgba(255, 255, 255, 0.08)",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        fontSize: 9.5,
        fontWeight: 850,
        cursor: "pointer",
    },

    smallActionButtonDisabled: {
        opacity: 0.45,
        cursor: "not-allowed",
    },

    markButton: {
        minHeight: 44,
        padding: "9px 8px",
        borderRadius: 12,
        border:
            `1px solid rgba(16, 231, 157, 0.3)`,
        background: COLORS.mint,
        color: COLORS.green,
        fontSize: 9,
        fontWeight: 850,
        cursor: "pointer",
    },

    nextButtonCompact: {
        minHeight: 44,
        padding: "9px 12px",
        border: "none",
        borderRadius: 12,
        background: "linear-gradient(135deg, #10E79D, #007050)",
        color: "#010F0E",
        fontSize: 10,
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(16, 231, 157, 0.3)",
    },

};