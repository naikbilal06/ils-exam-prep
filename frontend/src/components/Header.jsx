import React from "react";

export default function Header({
  title = "Dashboard",
  subtitle = "ILS Exam Prep",
  onMenu,
  onProfile,
  profileName = "Student",
}) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <button
          type="button"
          className="menu-button"
          onClick={onMenu}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div>
          <div className="dashboard-brand">{subtitle}</div>
          <div className="dashboard-page-title">{title}</div>
        </div>
      </div>

      <button
        type="button"
        className="profile-button"
        onClick={onProfile}
        aria-label="Open profile"
      >
        {profileName.charAt(0).toUpperCase()}
      </button>
    </header>
  );
}