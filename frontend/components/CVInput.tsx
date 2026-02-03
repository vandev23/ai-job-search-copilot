import React from "react";

interface CvInputProps {
  cvText: string;
  setCvText: (text: string) => void;
}

export const CvInput: React.FC<CvInputProps> = ({ cvText, setCvText }) => {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-1">Your CV</label>
      <textarea
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={cvText}
        onChange={(e) => setCvText(e.target.value)}
        placeholder="Paste your CV here..."
      />
    </div>
  );
};
