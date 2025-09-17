import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import type { Instance } from "@popperjs/core";
import ReactDOM from "react-dom";


interface ActionMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onEdit: (email: string) => void;
  onDelete: (email: string) => void;
  ViewDetail: (email: string) => void;
  email: string;
}

const DropdownMenu: React.FC<ActionMenuProps> = ({
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  ViewDetail,
  email
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const popperInstance = useRef<Instance | null>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current && menuRef.current) {
      popperInstance.current = createPopper(buttonRef.current, menuRef.current, {
        placement: "bottom-end",
        strategy: "fixed",
        modifiers: [
          { name: "offset", options: { offset: [0, 8] } },
          { name: "preventOverflow", options: { padding: 8 } },
        ],
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="px-2 py-1 rounded hover:bg-[var(--border-secondary)]"
      >
        ...
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="z-50 bg-[var(--containertext)] shadow-lg border border-[var(--border-secondary)] rounded w-32"
          style={{ position: "absolute" }}
        >
          <button
            onClick={() => {
              ViewDetail(email);
              onToggle();
            }}
            className="block w-full text-left px-4 py-2 hover:bg-[var(--surface-secondary)]"
          >
            Details
          </button>
          <button
            onClick={() => {
              onEdit(email);
              onToggle();
            }}
            className="block w-full text-left px-4 py-2 hover:bg-[var(--surface-secondary)]"
          >
            Update
          </button>
          <button
            onClick={() => {
              onDelete(email);
              onToggle();
            }}
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-[var(--surface-secondary)]"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
