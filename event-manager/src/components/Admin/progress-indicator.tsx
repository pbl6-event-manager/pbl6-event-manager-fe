import React from "react";

interface ProgressIndicatorProps {
  step: number; // bước hiện tại
  labels: string[]; // danh sách các nhãn
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ step, labels }) => {
  return (
    <div className="flex justify-between mb-6">
      {labels.map((label, index) => (
        <div
          key={index}
          className={`flex-1 text-center p-2 rounded mx-1 transition-colors duration-200 ${
            step === index + 1 ? "bg-[var(--primary-admin)] text-white" : "bg-gray-200 text-black"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
