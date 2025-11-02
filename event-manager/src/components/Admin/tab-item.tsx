import React from "react";
import type { TabItemProps } from "../../models/component-props/tab-bar-component-props";



const TabItem: React.FC<TabItemProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
        active
          ? "bg-[var(--primary-admin)] text-white shadow"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default TabItem;
