import React from "react";

export default function SectionHeader({
  label,
  title,
  actionLabel,
  onAction,
}) {
  return (
    <div className="section-heading">
      <div>
        {label && <span className="section-label">{label}</span>}
        {title && <h2>{title}</h2>}
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          className="text-button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}