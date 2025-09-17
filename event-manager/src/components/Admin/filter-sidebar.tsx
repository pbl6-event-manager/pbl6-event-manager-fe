import React, { useState } from "react";

interface FilterSidebarProps {
  onFilter: (filters: {
    name: string;
    email: string;
    phone: string;
    role: string;
    sortOrder: "asc" | "desc" | "";
  }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: "",
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
      name: "",
      email: "",
      phone: "",
      role: "",
      sortOrder: "",
    });
    onFilter({
      name: "",
      email: "",
      phone: "",
      role: "",
      sortOrder: "",
    });
  };

  return (
    <div className="p-4 w-64 bg-gray-100 rounded-lg shadow-md text-sm">
      <h2 className="text-base font-semibold mb-4">Filter</h2>

      <div className="mb-3">
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
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
          className="w-full border rounded px-2 py-1"
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
          className="w-full border rounded px-2 py-1"
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
            className="w-full border rounded px-2 py-1"
          >
            <option value="">-- All --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-medium">Order</label>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
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
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
