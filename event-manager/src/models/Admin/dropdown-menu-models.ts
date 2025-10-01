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