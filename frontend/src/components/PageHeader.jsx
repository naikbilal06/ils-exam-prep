import React from "react";

export default function PageHeader({
  title,
  onBack,
  onOpenMenu,
}) {
  const handleBack = onBack || (onOpenMenu ? () => onOpenMenu("menu") : null);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        minHeight: "64px",
        background: "rgba(6, 49, 43, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          margin: "0 auto",
          minHeight: "64px",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxSizing: "border-box",
        }}
      >
        {handleBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#10E79D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10E79D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 900,
              letterSpacing: "1px",
              lineHeight: 1,
              color: "#FFFFFF",
            }}
          >
            ILS RANKER
          </div>
          <div
            style={{
              marginTop: "4px",
              color: "rgba(226, 232, 240, 0.65)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.8px",
            }}
          >
            KNOW YOUR POTENTIAL
          </div>
        </div>

        {title && (
          <div
            style={{
              color: "#10E79D",
              fontSize: "13px",
              fontWeight: 800,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </div>
        )}
      </div>
    </header>
  );
}