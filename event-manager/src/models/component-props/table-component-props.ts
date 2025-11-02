//#region Table Component Props
export interface Column {
  header: string;
  accessor: string;
  type?: "text" | "image" | "action";
}

export interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
  getRowActions?: (row: any, rowIndex: number) => TableAction[];
  onRowClick?: (row: any, rowIndex: number) => void;
}

export interface TableAction {
  type: "edit" | "delete" | "recover" | string;
  onClick: () => void;
}
//#endregion