import React from "react";
import { Plus } from "lucide-react";
import Table from "../../components/Admin/table";
import { useCategoryViewModel } from "../../viewmodels/Admin/category-view-model";
import ConfirmDialog from "../../components/Admin/confirm-dialog";
import CategoryForm from "../../components/Admin/category-form";


const CategoryManagementView: React.FC = () => {
  const { categories, isAdding, isEditing, selectedCategory, openDeleteDialog, handleEditCategory, setIsEditing, setOpenDeleteDialog, handleAddCategory, handleDeleteCategory, confirmDelete, handleUpdateCategory, setIsAdding } = useCategoryViewModel();

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
            onClick: () => handleEditCategory(row.id),
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
        <CategoryForm
          onSave={handleAddCategory}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {/* Update Category Form */}
      {isEditing && selectedCategory && (
        <CategoryForm
          initialData={selectedCategory}
          isUpdate
          onSave={handleUpdateCategory}
          onCancel={() => setIsEditing(false)}
        />
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
