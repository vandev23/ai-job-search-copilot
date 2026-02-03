import React from "react";

export const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-t-blue-600 border-gray-300"
      style={{ width: size, height: size }}
    ></div>
  );
};
