import { useState, useRef } from "react";

export function useTableViewModel() {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  return {
    tableRef,
    openMenuIndex,
    setOpenMenuIndex,
  };
}
