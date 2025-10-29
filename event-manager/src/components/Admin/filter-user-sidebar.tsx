import React, { useState } from "react";

interface FilterUserSidebarProps {
  onFilter: (filters: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    sortOrder: "asc" | "desc" | "";
  }) => void;
}

const FilterUserSidebar: React.FC<FilterUserSidebarProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    sortOrder: "" as "asc" | "desc" | "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    setFilters({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      sortOrder: "",
    });
    onFilter({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      sortOrder: "",
    });
  };

  return (
    <div className="p-4 w-64 bg-white rounded-lg shadow-md text-sm self-start">
      <h2 className="text-base font-semibold mb-4">Filter</h2>

      <div className="mb-3">
        <label className="block font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={filters.firstName}
          onChange={handleChange}
          className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={filters.lastName}
          onChange={handleChange}
          className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block font-medium">Email</label>
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleChange}
          className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
        />
      </div>

      {/* Số điện thoại */}
      <div className="mb-3">
        <label className="block font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={filters.phone}
          onChange={handleChange}
          className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
        />
      </div>

      {/* Vai trò + Sắp xếp */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1">
          <label className="block font-medium">Role</label>
          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="w-full border border-[var(--placeholder)] rounded px-2 py-1"
          >
            <option value="">-- All --</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
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
          className="flex-1 bg-[var(--primary-admin)] text-white px-3 py-2 rounded hover:bg-[var(--primary-hover)] cursor-pointer"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-[var(--border-secondary)] px-3 py-2 rounded hover:bg-gray-300 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterUserSidebar;
