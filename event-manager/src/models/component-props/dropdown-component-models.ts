//#region Dropdown Menu Component Models
export interface DropdownItem {
  label: string;
  onClick: () => void;
  danger?: boolean; 
}

export interface DropdownMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  items: DropdownItem[];
}

export interface DropdownFilterProps {
  label: string;
  options: string[];
  onSelect: (value: string | null) => void;
}
//#endregion