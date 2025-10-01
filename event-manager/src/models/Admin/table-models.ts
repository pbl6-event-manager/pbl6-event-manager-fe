import type { DropdownItem } from "./dropdown-menu-models";

export interface Column {
  header: string;
  accessor: string;
  type?: "text" | "image" | "action";
}

export interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
  getRowActions?: (row: any, rowIndex: number) => DropdownItem[];
}