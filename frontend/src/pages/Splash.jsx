import React, { useState, useEffect } from "react";

export default function Splash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Engine...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2600; // 2.6s optimized smooth cycle

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      const rounded = Math.round(rawProgress);
      setProgress(rounded);

      if (rawProgress < 30) {
        setStatusText("Calibrating Rank Predictor...");
      } else if (rawProgress < 65) {
        setStatusText("Loading 2026 Cutoff Matrix...");
      } else if (rawProgress < 90) {
        setStatusText("Optimizing AI Counseling...");
      } else {
        setStatusText("Ready to Elevate Your Future 🚀");
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 320);
        }, 120);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = (e) => {
    e.stopPropagation();
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <div className={`splash-root ${isFadingOut ? "fade-out" : ""}`}>
      {/* Background ambient lighting */}
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Floating subtle micro-particles */}
      <div className="particles-canvas" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${(i * 23) % 94 + 3}%`,
              top: `${(i * 31) % 90 + 5}%`,
              animationDelay: `${(i * 0.35) % 3.5}s`,
              animationDuration: `${3 + (i % 4) * 0.7}s`,
              width: `${(i % 3) * 1.5 + 2.5}px`,
              height: `${(i % 3) * 1.5 + 2.5}px`,
            }}
          />
        ))}
      </div>

      {/* Main Responsive Mobile Frame */}
      <div className="splash-card">
        {/* Top Header Row */}
        <div className="splash-top-row">
          <div className="badge-pill">
            <span className="badge-sparkle">✦</span>
            <span>AI RANK INTELLIGENCE</span>
          </div>

          <button className="skip-btn" onClick={handleSkip} type="button">
            Skip ➔
          </button>
        </div>

        {/* Center Content Section */}
        <div className="splash-center">
          {/* 3D Realistic Glowing Emblem */}
          <div className="emblem-container">
            <div className="radar-wave wave-1" />
            <div className="radar-wave wave-2" />

            <div className="emblem-glass-pod">
              <svg
                className="emblem-svg"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="mBar1Grad" x1="20" y1="52" x2="42" y2="92" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#10E79D" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#024734" />
                  </linearGradient>

                  <linearGradient id="mBar2Grad" x1="48" y1="36" x2="72" y2="92" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="40%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0369A1" />
                  </linearGradient>

                  <linearGradient id="mBar3Grad" x1="78" y1="20" x2="102" y2="92" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="50%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#065F46" />
                  </linearGradient>

                  <linearGradient id="mArrowGrad" x1="24" y1="72" x2="98" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#06D6A0" />
                    <stop offset="60%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>

                  <filter id="mGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="mIntenseGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5.5" result="blur2" />
                    <feComposite in="SourceGraphic" in2="blur2" operator="over" />
                  </filter>
                </defs>

                {/* Ground Shadow */}
                <ellipse cx="60" cy="94" rx="46" ry="11" fill="rgba(0, 0, 0, 0.45)" filter="url(#mGlow)" />

                {/* Bar 1 */}
                <g className="chart-bar bar-left">
                  <rect x="22" y="56" width="20" height="34" rx="6" fill="url(#mBar1Grad)" />
                  <path d="M22 62C22 58.6863 24.6863 56 28 56H36C39.3137 56 42 58.6863 42 62V65H22V62Z" fill="rgba(255,255,255,0.4)" />
                  <rect x="23.5" y="57.5" width="17" height="31" rx="4.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
                </g>

                {/* Bar 2 */}
                <g className="chart-bar bar-mid">
                  <rect x="50" y="40" width="20" height="50" rx="6" fill="url(#mBar2Grad)" />
                  <path d="M50 46C50 42.6863 52.6863 40 56 40H64C67.3137 40 70 42.6863 70 46V49H50V46Z" fill="rgba(255,255,255,0.4)" />
                  <rect x="51.5" y="41.5" width="17" height="47" rx="4.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
                </g>

                {/* Bar 3 */}
                <g className="chart-bar bar-right">
                  <rect x="78" y="24" width="20" height="66" rx="6" fill="url(#mBar3Grad)" />
                  <path d="M78 30C78 26.6863 80.6863 24 84 24H92C95.3137 24 98 26.6863 98 30V33H78V30Z" fill="rgba(255,255,255,0.5)" />
                  <rect x="79.5" y="25.5" width="17" height="63" rx="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
                </g>

                {/* Arrow */}
                <path
                  d="M26 68L48 50L68 58L94 24"
                  stroke="url(#mArrowGrad)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#mGlow)"
                />
                <path
                  d="M82 24H95V37"
                  stroke="url(#mArrowGrad)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#mIntenseGlow)"
                />

                <circle cx="94" cy="24" r="5" fill="#FFFFFF" filter="url(#mGlow)" />
                <circle cx="94" cy="24" r="2.5" fill="#10E79D" />
              </svg>
            </div>
          </div>

          {/* Brand Header */}
          <div className="brand-section">
            <h1 className="brand-title">
              <span className="title-ils">ILS</span>
              <span className="title-ranker">RANKER</span>
            </h1>

            <p className="brand-sub">
              Know your Rank. Explore your Options. Make your Decision.
            </p>
          </div>

          {/* Compact Responsive Feature Highlights */}
          <div className="feature-tags">
            <span className={`f-tag ${progress > 20 ? "f-tag-active" : ""}`}>
              <span className="f-dot" /> Rank Predictor
            </span>
            <span className={`f-tag ${progress > 55 ? "f-tag-active" : ""}`}>
              <span className="f-dot" /> Cutoffs 2026
            </span>
            <span className={`f-tag ${progress > 85 ? "f-tag-active" : ""}`}>
              <span className="f-dot" /> AI Counseling
            </span>
          </div>
        </div>

        {/* Bottom Loading Block */}
        <div className="splash-bottom">
          <div className="loader-block">
            <div className="loader-meta">
              <span className="status-label">{statusText}</span>
              <span className="percentage-number">{progress}%</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              >
                <div className="progress-glow-head" />
              </div>
            </div>
          </div>

          <div className="security-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Trusted by 50,000+ Aspirants</span>
          </div>
        </div>
      </div>

      {/* Responsive Pure CSS */}
      <style>{`
        .splash-root {
          position: fixed;
          inset: 0;
          width: 100%;
          min-width: 100%;
          height: 100vh;
          height: 100dvh;
          background: radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          z-index: 99999;
          transition: opacity 0.32s ease, transform 0.32s ease;
          box-sizing: border-box;
          user-select: none;
        }

        .splash-root.fade-out {
          opacity: 0;
          transform: scale(1.02);
          pointer-events: none;
        }

        /* Ambient Lighting */
        .ambient-orbs {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.25;
          animation: floatOrb 8s ease-in-out infinite alternate;
        }

        .orb-1 {
          width: min(320px, 80vw);
          height: min(320px, 80vw);
          background: #10B981;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
        }

        .orb-2 {
          width: min(240px, 60vw);
          height: min(240px, 60vw);
          background: #06B6D4;
          bottom: 10%;
          right: -20px;
          animation-duration: 9s;
        }

        .orb-3 {
          width: min(200px, 50vw);
          height: min(200px, 50vw);
          background: #059669;
          bottom: 5%;
          left: -20px;
          animation-duration: 10s;
        }

        @keyframes floatOrb {
          0% { transform: translate(0, 0); }
          100% { transform: translate(12px, 16px); }
        }

        .particles-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .floating-particle {
          position: absolute;
          background: #A7F3D0;
          border-radius: 50%;
          opacity: 0.3;
          animation: particleDrift 4s ease-in-out infinite alternate;
          box-shadow: 0 0 6px rgba(52, 211, 153, 0.7);
        }

        @keyframes particleDrift {
          0% { transform: translateY(0px); opacity: 0.2; }
          100% { transform: translateY(-18px); opacity: 0.6; }
        }

        /* Mobile First Responsive Card Container */
        .splash-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 100%;
          max-height: 100dvh;
          padding: max(16px, env(safe-area-inset-top, 16px)) 20px max(18px, env(safe-area-inset-bottom, 18px));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          z-index: 2;
          overflow: hidden;
        }

        /* Top Bar */
        .splash-top-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.28);
          color: #6EE7B7;
          font-size: clamp(9px, 2.6vw, 11px);
          font-weight: 700;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .badge-sparkle {
          color: #34D399;
          font-size: 10px;
        }

        .skip-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.75);
          font-size: 11.5px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .skip-btn:active {
          transform: scale(0.96);
          background: rgba(255, 255, 255, 0.18);
        }

        /* Center Content Group */
        .splash-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          flex: 1;
          min-height: 0;
          gap: clamp(8px, 2.2vh, 18px);
          margin: auto 0;
        }

        /* Responsive 3D Emblem */
        .emblem-container {
          position: relative;
          width: clamp(92px, 25vw, 126px);
          height: clamp(92px, 25vw, 126px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radar-wave {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1.5px solid rgba(16, 231, 157, 0.25);
          animation: radarPing 2.8s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }

        .wave-2 {
          animation-delay: 1.4s;
        }

        @keyframes radarPing {
          0% { transform: scale(0.75); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .emblem-glass-pod {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: clamp(24px, 6vw, 32px);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(6, 49, 43, 0.45) 50%, rgba(1, 15, 14, 0.75) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            0 16px 36px -6px rgba(0, 0, 0, 0.6),
            0 0 24px rgba(16, 185, 129, 0.3),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emblem-svg {
          width: 76%;
          height: 76%;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
        }

        .chart-bar {
          transform-origin: bottom center;
          animation: barRise 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        .bar-left { animation-delay: 0.15s; }
        .bar-mid { animation-delay: 0.3s; }
        .bar-right { animation-delay: 0.45s; }

        @keyframes barRise {
          0% { transform: scaleY(0.2); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }

        /* Branding */
        .brand-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .brand-title {
          margin: 0;
          font-size: clamp(26px, 7.5vw, 36px);
          font-weight: 900;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          line-height: 1.1;
        }

        .title-ils {
          color: #10E79D;
          text-shadow: 0 0 20px rgba(16, 231, 157, 0.55);
        }

        .title-ranker {
          background: linear-gradient(180deg, #FFFFFF 0%, #D1FAE5 70%, #6EE7B7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-sub {
          margin: 6px 0 0;
          font-size: clamp(11.5px, 3.4vw, 13.5px);
          font-weight: 500;
          color: rgba(226, 232, 240, 0.85);
          letter-spacing: 0.2px;
          max-width: min(320px, 90vw);
          line-height: 1.4;
        }

        /* Horizontal/Wrap Feature Pills */
        .feature-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 6px;
          width: 100%;
          max-width: 340px;
          flex-shrink: 0;
        }

        .f-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 10px;
          border-radius: 10px;
          font-size: clamp(10px, 2.9vw, 11.5px);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.45);
          transition: all 0.3s ease;
        }

        .f-tag-active {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(52, 211, 153, 0.35);
          color: #FFFFFF;
        }

        .f-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .f-tag-active .f-dot {
          background: #10E79D;
          box-shadow: 0 0 6px #10E79D;
        }

        /* Bottom Section */
        .splash-bottom {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .loader-block {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .loader-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: clamp(10.5px, 3vw, 12px);
        }

        .status-label {
          color: #94A3B8;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 230px;
        }

        .percentage-number {
          color: #34D399;
          font-family: monospace, ui-monospace, sans-serif;
          font-size: clamp(11.5px, 3.2vw, 13px);
          font-weight: 700;
        }

        .progress-track {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #059669 0%, #10E79D 70%, #22D3EE 100%);
          border-radius: 10px;
          position: relative;
          transition: width 0.05s linear;
        }

        .progress-glow-head {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background: #FFFFFF;
          border-radius: 50%;
          filter: blur(1px);
        }

        .security-tag {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: clamp(10px, 2.8vw, 11px);
          font-weight: 500;
          color: rgba(226, 232, 240, 0.65);
        }

        .security-tag svg {
          color: #34D399;
        }

        /* Extreme Small Screen Optimizations (height < 600px) */
        @media (max-height: 620px) {
          .splash-card {
            padding: 10px 16px 12px;
          }
          .splash-center {
            gap: 6px;
          }
          .emblem-container {
            width: 80px;
            height: 80px;
          }
          .brand-title {
            font-size: 24px;
          }
          .brand-sub {
            display: none;
          }
          .feature-tags {
            margin: 2px 0;
          }
          .f-tag {
            padding: 3px 8px;
          }
        }
      `}</style>
    </div>
  );
}