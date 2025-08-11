import React from "react";

function ExperienceBar({ currentXp }) {
  const maxXP = 100;
  const percentage = (currentXp / maxXP) * 100;

  return (
    <div className="relative w-64">
      <progress
        className="progress progress-primary w-full"
        value={currentXp}
        max={maxXP}
      ></progress>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        {currentXp}/{maxXP}
      </span>
    </div>
  );
}

export default ExperienceBar;
