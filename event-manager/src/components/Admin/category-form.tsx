import React, { useState, useEffect } from "react";
import type { CategoryFormProps } from "../../models/Admin/category-models";
import { useCategoryViewModel } from "../../viewmodels/Admin/category-view-model";

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSave,
  onCancel,
  isUpdate = false,
}) => {
  const { setCategory, category, handleChange } = useCategoryViewModel();

  useEffect(() => {
    if (initialData) {
      setCategory(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSave(category);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow border">
      <h3 className="font-semibold mb-3">
        {isUpdate ? "Update Category" : "Add New Category"}
      </h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Category Name"
          value={category.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Description"
          value={category.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded hover:bg-[var(--primary-hover)]"
          >
            {isUpdate ? "Update" : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;