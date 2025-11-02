import React from "react";
//#region Tab Props
export interface TabGroupProps {
  children: React.ReactNode;
}

export interface TabItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}
//#endregion