import React, { useState } from "react";

const exams = [
  {
    id: "neet",
    name: "NEET UG",
    description: "Medical & Dental (MBBS / BDS)",
    aspirants: "2.4M+ Aspirants",
    accent: "#10E79D",
    gradient: "linear-gradient(135deg, rgba(16, 231, 157, 0.2) 0%, rgba(5, 150, 105, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10E79D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
        <path d="M12 9v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
      </svg>
    ),
  },
  {
    id: "jee-main",
    name: "JEE Main",
    description: "NITs, IIITs & State Engineering",
    aspirants: "1.4M+ Aspirants",
    accent: "#22D3EE",
    gradient: "linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(14, 165, 233, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "jee-advanced",
    name: "JEE Advanced",
    description: "Premier IIT Admissions",
    aspirants: "250K+ Qualified",
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: "cuet",
    name: "CUET UG",
    description: "Central Universities (DU, BHU, JNU)",
    aspirants: "1.9M+ Aspirants",
    accent: "#818CF8",
    gradient: "linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, rgba(99, 102, 241, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 10h6" />
        <path d="M9 14h6" />
        <path d="M9 18h6" />
      </svg>
    ),
  },
  {
    id: "neet-pg",
    name: "NEET PG",
    description: "Post-Graduate MD / MS Admissions",
    aspirants: "200K+ Doctors",
    accent: "#EC4899",
    gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(219, 39, 119, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    id: "aiims",
    name: "AIIMS / INI-CET",
    description: "Premier Medical Institutes",
    aspirants: "Top 1% Percentile",
    accent: "#10E79D",
    gradient: "linear-gradient(135deg, rgba(16, 231, 157, 0.2) 0%, rgba(13, 148, 136, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10E79D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
      </svg>
    ),
  },
  {
    id: "nursing",
    name: "B.Sc Nursing & CET",
    description: "State & Central Nursing Entrance",
    aspirants: "500K+ Aspirants",
    accent: "#A855F7",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(147, 51, 234, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "paramedical",
    name: "Paramedical & Allied",
    description: "Lab Tech, Radiology & Pharmacy",
    aspirants: "State Level Entrance",
    accent: "#38BDF8",
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(2, 132, 199, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    ),
  },
];

export default function ExamSelection({
  selectedExams,
  onToggleExam,
  onContinue,
  onBack,
}) {
  const hasSelection = selectedExams && selectedExams.length > 0;

  return (
    <div className="examselect-root">
      {/* Background ambient lighting */}
      <div className="examselect-bg-glows" aria-hidden="true">
        <div className="examselect-orb orb-top" />
        <div className="examselect-orb orb-bottom" />
      </div>

      <div className="examselect-card">
        {/* Top Header */}
        <div className="examselect-topbar">
          <button
            type="button"
            onClick={onBack}
            className="examselect-back-btn"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
          </button>

          <div className="step-pill">
            <span>Step 3 of 4</span>
          </div>
        </div>

        <div className="examselect-header">
          <h1 className="examselect-title">
            Which exam are you <br />
            <span className="highlight-text">targeting in 2026?</span>
          </h1>
          <p className="examselect-subtitle">
            Choose one or more to calibrate your AI prediction models & question banks.
          </p>
        </div>

        {/* Scrollable Exam List */}
        <div className="exam-cards-list">
          {exams.map((exam) => {
            const isSelected = selectedExams.includes(exam.id);

            return (
              <div
                key={exam.id}
                role="button"
                tabIndex={0}
                onClick={() => onToggleExam(exam.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onToggleExam(exam.id);
                }}
                className={`exam-glass-card ${isSelected ? "selected" : ""}`}
                style={{ "--exam-accent": exam.accent }}
              >
                <div
                  className="exam-icon-pod"
                  style={{ background: exam.gradient }}
                >
                  {exam.icon}
                </div>

                <div className="exam-info">
                  <div className="exam-title-row">
                    <span className="exam-name">{exam.name}</span>
                    <span className="exam-aspirants">{exam.aspirants}</span>
                  </div>
                  <span className="exam-desc">{exam.description}</span>
                </div>

                <div className="exam-action-indicator">
                  {isSelected ? (
                    <div className="check-bubble">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <div className="empty-bubble" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with continue button */}
        <div className="examselect-bottom">
          <button
            type="button"
            onClick={onContinue}
            disabled={!hasSelection}
            className={`examselect-submit-btn ${hasSelection ? "ready" : ""}`}
          >
            <span>
              {hasSelection
                ? `Continue with ${selectedExams.length} Selected Exam${selectedExams.length > 1 ? "s" : ""}`
                : "Select an Exam to Proceed"}
            </span>
            <span className="btn-arrow">➔</span>
            {hasSelection && <div className="btn-shimmer" />}
          </button>

          <p className="exam-switch-note">
            ✦ You can switch or add exams anytime from settings.
          </p>
        </div>
      </div>

      <style>{`
        .examselect-root {
          position: fixed;
          inset: 0;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          background: radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          user-select: none;
          box-sizing: border-box;
        }

        .examselect-bg-glows {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .examselect-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.22;
        }

        .orb-top {
          width: 300px;
          height: 300px;
          background: #10B981;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
        }

        .orb-bottom {
          width: 250px;
          height: 250px;
          background: #06B6D4;
          bottom: -40px;
          right: 5%;
        }

        .examselect-card {
          position: relative;
          width: 100%;
          max-width: 430px;
          height: 100%;
          max-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: max(16px, env(safe-area-inset-top, 16px)) 20px max(18px, env(safe-area-inset-bottom, 18px));
          box-sizing: border-box;
          z-index: 2;
        }

        /* Top Bar */
        .examselect-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          flex-shrink: 0;
        }

        .examselect-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
        }

        .examselect-back-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
        }

        .step-pill {
          font-size: 11px;
          font-weight: 700;
          color: #6EE7B7;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.28);
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
        }

        /* Header */
        .examselect-header {
          margin: 10px 0 12px;
          flex-shrink: 0;
        }

        .examselect-title {
          margin: 0;
          font-size: clamp(22px, 6.2vw, 27px);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .highlight-text {
          background: linear-gradient(180deg, #10E79D 0%, #34D399 50%, #22D3EE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .examselect-subtitle {
          margin: 6px 0 0;
          font-size: clamp(11.5px, 3.2vw, 13px);
          color: rgba(226, 232, 240, 0.7);
          line-height: 1.4;
        }

        /* List of Exams */
        .exam-cards-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
          overflow-y: auto;
          scrollbar-width: none;
          flex: 1;
          min-height: 0;
          padding-right: 2px;
        }

        .exam-cards-list::-webkit-scrollbar {
          display: none;
        }

        .exam-glass-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          padding: 11px 14px;
          border-radius: 16px;
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          position: relative;
          outline: none;
        }

        .exam-glass-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
        }

        .exam-glass-card:active {
          transform: scale(0.985);
        }

        .exam-glass-card.selected {
          background: rgba(16, 185, 129, 0.12);
          border-color: #10E79D;
          box-shadow: 0 0 20px rgba(16, 231, 157, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .exam-icon-pod {
          width: 44px;
          height: 44px;
          border-radius: 13px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .exam-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .exam-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .exam-name {
          font-size: 14.5px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .exam-aspirants {
          font-size: 10px;
          font-weight: 700;
          color: #94A3B8;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 7px;
          border-radius: 8px;
          letter-spacing: 0.2px;
        }

        .exam-glass-card.selected .exam-aspirants {
          color: #6EE7B7;
          background: rgba(16, 185, 129, 0.2);
        }

        .exam-desc {
          font-size: 11.5px;
          color: rgba(226, 232, 240, 0.6);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Checkbox Bubble */
        .exam-action-indicator {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-bubble {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          transition: all 0.2s ease;
        }

        .check-bubble {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #10E79D;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(16, 231, 157, 0.6);
          animation: popCheck 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes popCheck {
          0% { transform: scale(0.6); }
          100% { transform: scale(1); }
        }

        /* Bottom Section */
        .examselect-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
          flex-shrink: 0;
          margin-top: 10px;
        }

        .examselect-submit-btn {
          position: relative;
          width: 100%;
          height: clamp(48px, 6.8vh, 54px);
          border: 0;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
          font-size: clamp(14px, 3.8vw, 15px);
          font-weight: 800;
          letter-spacing: 0.3px;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          overflow: hidden;
          outline: none;
        }

        .examselect-submit-btn.ready {
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #10E79D 100%);
          color: #022019;
          cursor: pointer;
          box-shadow: 0 12px 28px -4px rgba(16, 231, 157, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        .examselect-submit-btn.ready:active {
          transform: scale(0.97);
        }

        .btn-arrow {
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .examselect-submit-btn.ready:hover .btn-arrow {
          transform: translateX(3px);
        }

        .btn-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: skewX(-20deg);
          animation: btnShimmerAnim 3s infinite;
        }

        @keyframes btnShimmerAnim {
          0% { left: -100%; }
          30% { left: 140%; }
          100% { left: 140%; }
        }

        .exam-switch-note {
          margin: 0;
          font-size: 10.5px;
          color: rgba(226, 232, 240, 0.55);
          text-align: center;
        }

        @media (max-height: 640px) {
          .examselect-header { margin: 6px 0 8px; }
          .examselect-subtitle { display: none; }
          .exam-cards-list { gap: 6px; }
          .exam-glass-card { padding: 8px 10px; }
          .exam-icon-pod { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
}