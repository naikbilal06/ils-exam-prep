import React from "react";

function ILSLogo() {
  return (
    <div className="page-ils-logo">
      <svg
        width="30"
        height="38"
        viewBox="0 0 43 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M25.5 8C31 2 38 1 42 1C41 9 37 15 29 18C25 19.5 21.5 19 18.5 18"
          fill="#41AB6B"
        />

        <path
          d="M8 15C14 18 18 23 18 30V51"
          stroke="#41AB6B"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <path
          d="M25 17V51"
          stroke="#41AB6B"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="page-ils-logo-text">
        <strong>ILS</strong>
        <span>Exam Prep</span>
      </div>
    </div>
  );
}

export default function PageHeader({
  title,
  onOpenMenu,
}) {
  return (
    <header className="page-header">
      <button
        type="button"
        className="page-menu-button"
        onClick={() => onOpenMenu("menu")}
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className="page-header-title">
        {title}
      </div>

      <ILSLogo />
    </header>
  );
}