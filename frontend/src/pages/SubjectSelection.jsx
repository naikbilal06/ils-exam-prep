import React from "react";

const subjects = [
  {
    id: "physics",
    name: "Physics",
    description: "Mechanics, Electrodynamics & Modern Physics",
    chapters: "28 Chapters",
    accent: "#38BDF8",
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(2, 132, 199, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2a10 10 0 1 0 10 10" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
      </svg>
    ),
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Physical, Organic & Inorganic Reactions",
    chapters: "30 Chapters",
    accent: "#A855F7",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(126, 34, 206, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L4.1 19.3A2 2 0 0 0 5.8 22h12.4a2 2 0 0 0 1.7-2.7L14 9.31V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    id: "biology",
    name: "Biology",
    description: "Genetics, Physiology & Ecology",
    chapters: "38 Chapters",
    accent: "#10E79D",
    gradient: "linear-gradient(135deg, rgba(16, 231, 157, 0.2) 0%, rgba(5, 150, 105, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10E79D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Calculus, Vectors, Probability & Algebra",
    chapters: "32 Chapters",
    accent: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v3H4zM4 17h16v3H4zM7 7l5 10 5-10" />
      </svg>
    ),
  },
  {
    id: "english",
    name: "English Proficiency",
    description: "Reading Comprehension & Verbal Logic",
    chapters: "16 Modules",
    accent: "#F43F5E",
    gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(225, 29, 72, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10M6 10h10" />
      </svg>
    ),
  },
  {
    id: "general-test",
    name: "General Test & GK",
    description: "Numerical Ability & Current Affairs",
    chapters: "24 Topics",
    accent: "#6366F1",
    gradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.4) 100%)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.2 1.8 5.8 4.5 7.1V19a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-1.9c2.7-1.3 4.5-3.9 4.5-7.1a8 8 0 0 0-8-8z" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
];

export default function SubjectSelection({
  selectedSubjects,
  onToggleSubject,
  onContinue,
  onBack,
}) {
  const hasSelection = selectedSubjects && selectedSubjects.length > 0;

  return (
    <div className="subjectselect-root">
      {/* Background ambient lighting */}
      <div className="subjectselect-bg-glows" aria-hidden="true">
        <div className="subjectselect-orb orb-top" />
        <div className="subjectselect-orb orb-bottom" />
      </div>

      <div className="subjectselect-card">
        {/* Top Header */}
        <div className="subjectselect-topbar">
          <button
            type="button"
            onClick={onBack}
            className="subjectselect-back-btn"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
          </button>

          <div className="step-pill">
            <span>Step 4 of 4</span>
          </div>
        </div>

        <div className="subjectselect-header">
          <h1 className="subjectselect-title">
            Select your <br />
            <span className="highlight-text">Core Subjects</span>
          </h1>
          <p className="subjectselect-subtitle">
            We will prioritize chapter-level questions & mock papers for these subjects.
          </p>
        </div>

        {/* Scrollable Subject List */}
        <div className="subject-cards-list">
          {subjects.map((subject) => {
            const isSelected = selectedSubjects.includes(subject.id);

            return (
              <div
                key={subject.id}
                role="button"
                tabIndex={0}
                onClick={() => onToggleSubject(subject.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onToggleSubject(subject.id);
                }}
                className={`subject-glass-card ${isSelected ? "selected" : ""}`}
                style={{ "--subject-accent": subject.accent }}
              >
                <div
                  className="subject-icon-pod"
                  style={{ background: subject.gradient }}
                >
                  {subject.icon}
                </div>

                <div className="subject-info">
                  <div className="subject-title-row">
                    <span className="subject-name">{subject.name}</span>
                    <span className="subject-chapters">{subject.chapters}</span>
                  </div>
                  <span className="subject-desc">{subject.description}</span>
                </div>

                <div className="subject-action-indicator">
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
        <div className="subjectselect-bottom">
          <button
            type="button"
            onClick={onContinue}
            disabled={!hasSelection}
            className={`subjectselect-submit-btn ${hasSelection ? "ready" : ""}`}
          >
            <span>
              {hasSelection
                ? `Launch Prep with ${selectedSubjects.length} Subject${selectedSubjects.length > 1 ? "s" : ""}`
                : "Select Subjects to Continue"}
            </span>
            <span className="btn-arrow">➔</span>
            {hasSelection && <div className="btn-shimmer" />}
          </button>

          <p className="subject-note">
            ✦ AI customized practice will be initialized immediately.
          </p>
        </div>
      </div>

      <style>{`
        .subjectselect-root {
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

        .subjectselect-bg-glows {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .subjectselect-orb {
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

        .subjectselect-card {
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
        .subjectselect-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          flex-shrink: 0;
        }

        .subjectselect-back-btn {
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

        .subjectselect-back-btn:hover {
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
        .subjectselect-header {
          margin: 10px 0 12px;
          flex-shrink: 0;
        }

        .subjectselect-title {
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

        .subjectselect-subtitle {
          margin: 6px 0 0;
          font-size: clamp(11.5px, 3.2vw, 13px);
          color: rgba(226, 232, 240, 0.7);
          line-height: 1.4;
        }

        /* List of Subjects */
        .subject-cards-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
          overflow-y: auto;
          scrollbar-width: none;
          flex: 1;
          min-height: 0;
          padding-right: 2px;
        }

        .subject-cards-list::-webkit-scrollbar {
          display: none;
        }

        .subject-glass-card {
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

        .subject-glass-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
        }

        .subject-glass-card:active {
          transform: scale(0.985);
        }

        .subject-glass-card.selected {
          background: rgba(16, 185, 129, 0.12);
          border-color: #10E79D;
          box-shadow: 0 0 20px rgba(16, 231, 157, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .subject-icon-pod {
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

        .subject-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .subject-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .subject-name {
          font-size: 14.5px;
          font-weight: 800;
          color: #FFFFFF;
        }

        .subject-chapters {
          font-size: 10px;
          font-weight: 700;
          color: #94A3B8;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 7px;
          border-radius: 8px;
          letter-spacing: 0.2px;
        }

        .subject-glass-card.selected .subject-chapters {
          color: #6EE7B7;
          background: rgba(16, 185, 129, 0.2);
        }

        .subject-desc {
          font-size: 11.5px;
          color: rgba(226, 232, 240, 0.6);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .subject-action-indicator {
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
        .subjectselect-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
          flex-shrink: 0;
          margin-top: 10px;
        }

        .subjectselect-submit-btn {
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

        .subjectselect-submit-btn.ready {
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #10E79D 100%);
          color: #022019;
          cursor: pointer;
          box-shadow: 0 12px 28px -4px rgba(16, 231, 157, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        .subjectselect-submit-btn.ready:active {
          transform: scale(0.97);
        }

        .btn-arrow {
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .subjectselect-submit-btn.ready:hover .btn-arrow {
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

        .subject-note {
          margin: 0;
          font-size: 10.5px;
          color: rgba(226, 232, 240, 0.55);
          text-align: center;
        }

        @media (max-height: 640px) {
          .subjectselect-header { margin: 6px 0 8px; }
          .subjectselect-subtitle { display: none; }
          .subject-cards-list { gap: 6px; }
          .subject-glass-card { padding: 8px 10px; }
          .subject-icon-pod { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
}