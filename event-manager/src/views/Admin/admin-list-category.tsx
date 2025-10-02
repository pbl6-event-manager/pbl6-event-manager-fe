import React from "react";
import { Plus } from "lucide-react";
import Table from "../../components/Admin/table";
import { useCategoryViewModel } from "../../viewmodels/Admin/category-view-model";
import ConfirmDialog from "../../components/Admin/confirm-dialog";


const CategoryManagementView: React.FC = () => {
  const { categories, isAdding, newCategory, openDeleteDialog, setOpenDeleteDialog, setNewCategory, handleAddCategory, handleDeleteCategory, confirmDelete, handleUpdateCategory, setIsAdding } = useCategoryViewModel();

  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Name", accessor: "name", type: "text" as const },
    { header: "Description", accessor: "description", type: "text" as const },
    { header: "Action", accessor: "actions", type: "action" as const },
  ];

  return (
    <div className="flex-1 p-6 bg-[var(--surface)] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[var(--defaulttext)]">
          Category Management
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[var(--primary-admin)] text-white rounded-lg hover:bg-[var(--primary-hover)]"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={categories}
        className="rounded-lg shadow-md"
        getRowActions={(row) => [
          {
            label: "Update",
            onClick: () => handleUpdateCategory(row.id),
          },
          {
            label: "Delete",
            onClick: () => handleDeleteCategory(row.id),
            danger: true,
          },
        ]}
      />

      {/* Add Category Form */}
      {isAdding && (
        <div className="mt-6 bg-white p-4 rounded shadow border">
          <h3 className="font-semibold mb-3">Add New Category</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full border rounded p-2"
            />
            <textarea
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full border rounded p-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded hover:bg-[var(--primary-hover)]"
              >
                Save
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
            title="Confirm"
            description="Are you sure you want to delete this category?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={confirmDelete}
          />
    </div>
  );
};



export default CategoryManagementView;
