import React, { useState } from "react";
import CountryCitySelect from "./country-city-select";

interface FilterEventSidebarProps {
  onFilter: (filters: {
    title: string;
    description: string;
    location: string;
    status: string;
    sortOrder: "asc" | "desc" | "";
    country: string;
    city: string;
  }) => void;
}

const FilterEventSidebar: React.FC<FilterEventSidebarProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    location: "",
    status: "",
    sortOrder: "" as "asc" | "desc" | "",
    country: "",
    city: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCityChange = (country: string, city: string) => {
    setFilters((prev) => ({ ...prev, country, city }));
  };

  const handleSubmit = () => {
    const location =
    filters.city && filters.country
      ? `${filters.city}, ${filters.country}`
      : filters.country || filters.city || "";
    onFilter({...filters,
      location
    });
  };

  const handleClear = () => {
    setFilters({
        title: "",
        description: "",
        location: "",
        status: "",
        sortOrder: "",
        country: "",
        city: "",
    });
    onFilter({
        title: "",
        description: "",
        location: "",
        status: "",
        sortOrder: "",
        country: "",
        city: "",
    });

  };

  return (
    <div className="p-4 w-64 bg-white rounded-lg shadow-md text-sm">
      <h2 className="text-base font-semibold mb-4">Filter</h2>

      <div className="mb-3">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleChange}
          className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <CountryCitySelect
          country={filters.country}
          city={filters.city}
          onChange={handleCountryCityChange}
        />
      </div>

      {/* Vai trò + Sắp xếp */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1">
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          >
            <option value="">-- All --</option>
            <option value="admin">Public</option>
            <option value="user">Passed</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-medium">Order</label>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          >
            <option value="">-- None --</option>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-[var(--primary)] text-white px-3 py-2 rounded hover:bg-[var(--primary-hover)]"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-[var(--border-secondary)] px-3 py-2 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterEventSidebar;
