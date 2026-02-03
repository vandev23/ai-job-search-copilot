import React from "react";

interface ScoreBarProps {
  score: number;
}

export const ScoreBar: React.FC<ScoreBarProps> = ({ score }) => {
  let bgColor = "#DC2626";
  if (score > 85) bgColor = "#16A34A";
  else if (score > 40) bgColor = "#FBBF24";

  return (
    <div className="w-full bg-gray-200 h-3 rounded">
      <div
        className="h-3 rounded transition-all duration-500"
        style={{ width: `${score}%`, backgroundColor: bgColor }}
      />
    </div>
  );
};
