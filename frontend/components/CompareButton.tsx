import React from "react";

interface CompareButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      className={`
        px-6 py-2 rounded-md font-medium transition-colors
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      Compare
    </button>
  );
};
