import React from "react";

export default function ProgressBar({
  value = 0,
  max = 100,
  className = "",
}) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(
    Math.max(Number(value) || 0, 0),
    safeMax
  );

  const percentage = (safeValue / safeMax) * 100;

  return (
    <div
      className={`progress-bar ${className}`.trim()}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin="0"
      aria-valuemax={safeMax}
    >
      <div
        className="progress-bar-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}