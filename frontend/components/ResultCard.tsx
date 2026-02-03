import React from "react";
import { ScoreBar } from "./ScoreBar";

interface ResultCardProps {
  title: string;
  score: number;
  strengths: string[];
  gaps: string[];
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, score, strengths, gaps }) => {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg mb-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <ScoreBar score={score} />
      <div className="mt-3 text-gray-700">
        <p><span className="font-semibold">Strengths:</span> {strengths.join(", ")}</p>
        <p><span className="font-semibold">Gaps:</span> {gaps.join(", ")}</p>
      </div>
    </div>
  );
};
