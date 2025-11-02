import React from "react";
import type { TabGroupProps } from "../../models/component-props/tab-bar-component-props";

const TabGroup: React.FC<TabGroupProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 p-1 rounded-xl inline-flex space-x-2">
      {children}
    </div>
  );
};

export default TabGroup;
