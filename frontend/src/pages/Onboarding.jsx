import React from "react";

export default function Onboarding({ onContinue }) {
  const features = [
    {
      title: "Targeted Practice Arena",
      desc: "Strengthen high-yield concepts with chapter-wise AI questions.",
      badge: "100K+ Questions",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10E79D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      glow: "rgba(16, 231, 157, 0.15)",
    },
    {
      title: "All-India Mock Simulations",
      desc: "Build speed, accuracy, and real exam confidence with timer tests.",
      badge: "Real NTA Pattern",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      glow: "rgba(34, 211, 238, 0.15)",
    },
    {
      title: "Neural Rank & Gap Analysis",
      desc: "Instant percentile forecasting and subject weakness diagnosis.",
      badge: "99.2% Accuracy",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
          <path d="M4 20h16" />
        </svg>
      ),
      glow: "rgba(245, 158, 11, 0.15)",
    },
    {
      title: "24/7 AI Admission Mentor",
      desc: "Personalized roadmap, cutoff analysis, and college predictions.",
      badge: "Smart Match",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2a4 4 0 0 1 4-4z" />
          <path d="M6 8v11a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8" />
          <circle cx="9" cy="13" r="1" fill="#A855F7" />
          <circle cx="15" cy="13" r="1" fill="#A855F7" />
          <path d="M10 17h4" />
        </svg>
      ),
      glow: "rgba(168, 85, 247, 0.15)",
    },
  ];

  return (
    <div className="onboard-root">
      {/* Ambient background light orbs */}
      <div className="onboard-bg-glows" aria-hidden="true">
        <div className="onboard-orb orb-top" />
        <div className="onboard-orb orb-bottom" />
      </div>

      <div className="onboard-card">
        {/* Top Header */}
        <div className="onboard-header">
          <div className="onboard-pill">
            <span className="sparkle">✦</span>
            <span>AI EXAM PREP SUITE</span>
          </div>

          <div className="emblem-mini-pod">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
              <rect x="18" y="48" width="18" height="34" rx="5" fill="#10E79D" />
              <rect x="42" y="34" width="18" height="48" rx="5" fill="#22D3EE" />
              <rect x="66" y="20" width="18" height="62" rx="5" fill="#34D399" />
              <path d="M22 60L46 44L64 52L86 22" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="onboard-title">
            Prepare Smarter.
            <span className="title-highlight"> Rank Higher.</span>
          </h1>

          <p className="onboard-subtitle">
            Next-generation intelligent preparation for NEET, JEE & State CETs with predictive rank analytics.
          </p>
        </div>

        {/* Realistic Glassmorphic Features */}
        <div className="features-scroller">
          {features.map((item, index) => (
            <div
              key={index}
              className="feature-glass-box"
              style={{ "--item-glow": item.glow }}
            >
              <div className="feature-icon-pod">
                {item.icon}
              </div>

              <div className="feature-details">
                <div className="feature-top-meta">
                  <span className="feature-name">{item.title}</span>
                  <span className="feature-micro-badge">{item.badge}</span>
                </div>
                <p className="feature-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer & CTA */}
        <div className="onboard-bottom">
          <button
            type="button"
            onClick={onContinue}
            className="onboard-primary-btn"
          >
            <span>Get Started</span>
            <span className="btn-arrow">➔</span>
            <div className="btn-shimmer" />
          </button>

          <p className="onboard-guarantee">
            ✦ Fast 30-second setup • Trusted by 50,000+ Students
          </p>
        </div>
      </div>

      <style>{`
        .onboard-root {
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

        .onboard-bg-glows {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .onboard-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.22;
        }

        .orb-top {
          width: 320px;
          height: 320px;
          background: #10B981;
          top: -90px;
          left: 50%;
          transform: translateX(-50%);
        }

        .orb-bottom {
          width: 260px;
          height: 260px;
          background: #06B6D4;
          bottom: -50px;
          right: 5%;
        }

        .onboard-card {
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

        /* Header */
        .onboard-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .onboard-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.3);
          color: #6EE7B7;
          font-size: clamp(9.5px, 2.7vw, 11px);
          font-weight: 700;
          letter-spacing: 1px;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .sparkle {
          color: #34D399;
        }

        .emblem-mini-pod {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(6,49,43,0.6) 100%);
          border: 1px solid rgba(255,255,255,0.2);
          box-shadow: 0 10px 24px -4px rgba(0,0,0,0.5), 0 0 16px rgba(16, 185, 129, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .onboard-title {
          margin: 0;
          font-size: clamp(24px, 6.8vw, 30px);
          font-weight: 900;
          line-height: 1.18;
          color: #FFFFFF;
          letter-spacing: -0.4px;
        }

        .title-highlight {
          display: block;
          background: linear-gradient(180deg, #10E79D 0%, #34D399 50%, #22D3EE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .onboard-subtitle {
          margin: 8px 0 0;
          font-size: clamp(12px, 3.3vw, 13.5px);
          line-height: 1.45;
          color: rgba(226, 232, 240, 0.75);
          max-width: 330px;
        }

        /* Features List */
        .features-scroller {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.8vh, 12px);
          margin: clamp(10px, 2vh, 18px) 0;
          overflow-y: auto;
          scrollbar-width: none;
          flex: 1;
          min-height: 0;
        }

        .features-scroller::-webkit-scrollbar {
          display: none;
        }

        .feature-glass-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: clamp(10px, 2vh, 14px);
          backdrop-filter: blur(14px);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          position: relative;
          overflow: hidden;
        }

        .feature-glass-box::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--item-glow);
          box-shadow: 0 0 10px var(--item-glow);
        }

        .feature-glass-box:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(52, 211, 153, 0.35);
        }

        .feature-icon-pod {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.15);
        }

        .feature-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
          flex: 1;
        }

        .feature-top-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
        }

        .feature-name {
          font-size: clamp(12.5px, 3.4vw, 14px);
          font-weight: 700;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .feature-micro-badge {
          font-size: 10px;
          font-weight: 700;
          color: #6EE7B7;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(52, 211, 153, 0.3);
          padding: 2px 7px;
          border-radius: 8px;
          flex-shrink: 0;
          letter-spacing: 0.2px;
        }

        .feature-desc {
          margin: 0;
          font-size: clamp(11px, 2.9vw, 12px);
          line-height: 1.35;
          color: rgba(226, 232, 240, 0.65);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Bottom Section */
        .onboard-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          width: 100%;
        }

        .onboard-primary-btn {
          position: relative;
          width: 100%;
          height: clamp(48px, 6.8vh, 54px);
          border: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, #059669 0%, #10B981 50%, #10E79D 100%);
          color: #022019;
          font-size: clamp(15px, 4vw, 16px);
          font-weight: 800;
          letter-spacing: 0.3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 12px 28px -4px rgba(16, 231, 157, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          overflow: hidden;
          outline: none;
        }

        .onboard-primary-btn:active {
          transform: scale(0.97);
        }

        .btn-arrow {
          font-size: 17px;
          transition: transform 0.2s ease;
        }

        .onboard-primary-btn:hover .btn-arrow {
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

        .onboard-guarantee {
          margin: 0;
          font-size: clamp(10px, 2.8vw, 11.5px);
          color: rgba(226, 232, 240, 0.55);
          text-align: center;
          font-weight: 500;
        }

        @media (max-height: 640px) {
          .onboard-header { margin-top: 0; }
          .emblem-mini-pod { width: 40px; height: 40px; margin-bottom: 6px; }
          .onboard-pill { margin-bottom: 6px; padding: 2px 8px; }
          .onboard-subtitle { display: none; }
          .features-scroller { gap: 6px; margin: 8px 0; }
          .feature-glass-box { padding: 8px 10px; }
          .feature-desc { display: none; }
        }
      `}</style>
    </div>
  );
}