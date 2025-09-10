import React, { useState, useRef, useEffect } from "react";

interface DropdownFilterProps {
  label: string;
  options: string[];
  onSelect: (value: string | null) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string | null) => {
    setSelected(value);
    setIsOpen(false);
    onSelect(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-white border rounded-md shadow-sm flex items-center gap-2"
      >
        {selected || label}
        <span className="text-gray-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
          <div
            className="px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(null)}
          >
            Tất cả
          </div>
          {options.map((opt, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
