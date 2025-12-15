import React, { useState } from "react";
import CountryCitySelect from "../../../../components/Admin/country-city-select";
import { validateFromTo } from "../../../../utils/Admin/date-utils";
interface FilterEventSidebarProps {
  onFilter: (filters: {
    title: string;
    description: string;
    location: string;
    status: string;
    sortOrder: "asc" | "desc" | "";
    country: string;
    city: string;
    startDateFrom: string;
    startDateTo: string;
    endDateFrom: string;
    endDateTo: string;
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
    startDateFrom: "",
    startDateTo: "",
    endDateFrom: "",
    endDateTo: ""
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCityChange = (country: string, city: string) => {
    setFilters((prev) => ({ ...prev, country, city }));
  };

  const handleSubmit = () => {
    if(validateFromTo(filters.startDateFrom, filters.startDateTo).error) {
      alert("Start Date To must be greater than or equal to Start Date From")
    }

    if(validateFromTo(filters.endDateFrom, filters.endDateTo).error) {
      alert("End Date To must be greater than or equal to End Date From")
    }
    
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
        startDateFrom: "",
        startDateTo: "",
        endDateFrom: "",
        endDateTo: "",
    });
    onFilter({
        title: "",
        description: "",
        location: "",
        status: "",
        sortOrder: "",
        country: "",
        city: "",
        startDateFrom: "",
        startDateTo: "",
        endDateFrom: "",
        endDateTo: "",
    });

  };

  return (
    <div className="p-4 w-64 bg-white rounded-lg shadow-md text-sm self-start">
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

      <div className="mb-3">
        <label className="block font-medium">Start Date</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            name="startDateFrom"
            value={filters.startDateFrom}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          />
          <input
            type="date"
            name="startDateTo"
            value={filters.startDateTo}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="block font-medium">End Date</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            name="endDateFrom"
            value={filters.endDateFrom}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          />
          <input
            type="date"
            name="endDateTo"
            value={filters.endDateTo}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          />
        </div>
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
            <option value="Public">Public</option>
            <option value="Passed">Passed</option>
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
          className="flex-1 bg-[var(--primary-admin)] text-white px-3 py-2 rounded hover:bg-[var(--primary-hover)]"
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
