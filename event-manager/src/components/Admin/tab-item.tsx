import React from "react";

interface TabItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white shadow"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default TabItem;
