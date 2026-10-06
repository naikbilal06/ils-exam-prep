import React from "react";

export default function NameSetup({
  name,
  setName,
  onCreateAccount,
  onBack,
}) {
  const isReady = name && name.trim().length > 0;

  return (
    <div className="namesetup-root">
      {/* Background ambient lighting */}
      <div className="namesetup-bg-glows" aria-hidden="true">
        <div className="namesetup-orb orb-top" />
        <div className="namesetup-orb orb-bottom" />
      </div>

      <div className="namesetup-card">
        {/* Top Bar with Back Button */}
        <div className="namesetup-topbar">
          <button
            type="button"
            onClick={onBack}
            className="namesetup-back-btn"
            aria-label="Go Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
          </button>

          <div className="step-indicator">
            <span>Step 2 of 4</span>
          </div>
        </div>

        {/* Center Form Section */}
        <div className="namesetup-center">
          {/* 3D Glowing Student Avatar Pod */}
          <div className="avatar-pod">
            <div className="avatar-glow-ring" />
            <div className="avatar-icon-box">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10E79D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="avatar-sparkle-dot">✦</div>
          </div>

          <div className="namesetup-headings">
            <h1 className="namesetup-title">
              What should we <span className="highlight-text">call you?</span>
            </h1>
            <p className="namesetup-subtitle">
              Enter your real name to personalize your AI Rank Predictor and All-India mock test scorecards.
            </p>
          </div>

          {/* Realistic Input Field */}
          <div className="input-group">
            <label htmlFor="student-name" className="input-label">
              Full Name / Student Name
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="student-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                autoComplete="name"
                autoFocus
                maxLength={60}
                className="realistic-input"
              />
              {isReady && (
                <span className="valid-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10E79D" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="info-glass-card">
            <div className="info-icon">💡</div>
            <div className="info-text">
              <strong>Tip:</strong> Your name will appear on official rank analytics and personalized counseling roadmaps.
            </div>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="namesetup-bottom">
          <button
            type="button"
            onClick={onCreateAccount}
            disabled={!isReady}
            className={`namesetup-submit-btn ${isReady ? "ready" : ""}`}
          >
            <span>Continue to Target Exam</span>
            <span className="btn-arrow">➔</span>
            {isReady && <div className="btn-shimmer" />}
          </button>

          <p className="privacy-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Your student profile is private & encrypted</span>
          </p>
        </div>
      </div>

      <style>{`
        .namesetup-root {
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

        .namesetup-bg-glows {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .namesetup-orb {
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

        .namesetup-card {
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
        .namesetup-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          flex-shrink: 0;
        }

        .namesetup-back-btn {
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

        .namesetup-back-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
        }

        .step-indicator {
          font-size: 11px;
          font-weight: 700;
          color: #6EE7B7;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.28);
          padding: 4px 10px;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Center */
        .namesetup-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: clamp(12px, 2.5vh, 20px);
          margin: auto 0;
        }

        /* Avatar Pod */
        .avatar-pod {
          position: relative;
          width: 78px;
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .avatar-glow-ring {
          position: absolute;
          inset: -4px;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(16, 231, 157, 0.4), rgba(34, 211, 238, 0.2));
          filter: blur(8px);
        }

        .avatar-icon-box {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(6, 49, 43, 0.7) 100%);
          border: 1px solid rgba(255, 255, 255, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(14px);
        }

        .avatar-sparkle-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          font-size: 14px;
          color: #34D399;
          filter: drop-shadow(0 0 6px #10E79D);
        }

        .namesetup-headings {
          text-align: center;
        }

        .namesetup-title {
          margin: 0;
          font-size: clamp(23px, 6.5vw, 29px);
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

        .namesetup-subtitle {
          margin: 8px 0 0;
          font-size: clamp(12px, 3.3vw, 13.5px);
          color: rgba(226, 232, 240, 0.75);
          line-height: 1.45;
          max-width: 320px;
        }

        /* Input Group */
        .input-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .input-label {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.3px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .realistic-input {
          width: 100%;
          height: 52px;
          padding: 0 46px 0 46px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          color: #FFFFFF;
          font-size: 15.5px;
          font-weight: 600;
          outline: none;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
          transition: all 0.22s ease;
        }

        .realistic-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .realistic-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: #10E79D;
          box-shadow: 0 0 0 3px rgba(16, 231, 157, 0.2), 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .valid-check {
          position: absolute;
          right: 16px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(16, 231, 157, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tip Box */
        .info-glass-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 11px 14px;
          border-radius: 14px;
          font-size: 11.5px;
          color: rgba(226, 232, 240, 0.7);
          line-height: 1.4;
          width: 100%;
          box-sizing: border-box;
        }

        .info-icon {
          font-size: 14px;
          flex-shrink: 0;
        }

        /* Bottom */
        .namesetup-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
          flex-shrink: 0;
        }

        .namesetup-submit-btn {
          position: relative;
          width: 100%;
          height: clamp(48px, 6.8vh, 54px);
          border: 0;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.4);
          font-size: clamp(14.5px, 4vw, 15.5px);
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

        .namesetup-submit-btn.ready {
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #10E79D 100%);
          color: #022019;
          cursor: pointer;
          box-shadow: 0 12px 28px -4px rgba(16, 231, 157, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        .namesetup-submit-btn.ready:active {
          transform: scale(0.97);
        }

        .btn-arrow {
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .namesetup-submit-btn.ready:hover .btn-arrow {
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

        .privacy-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(226, 232, 240, 0.55);
          margin: 0;
        }

        .privacy-badge svg {
          color: #34D399;
        }

        @media (max-height: 640px) {
          .namesetup-headings { margin-top: 0; }
          .avatar-pod { width: 56px; height: 56px; }
          .namesetup-subtitle { display: none; }
          .info-glass-card { display: none; }
        }
      `}</style>
    </div>
  );
}