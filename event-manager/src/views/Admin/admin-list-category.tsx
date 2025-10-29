import React from "react";
import { Plus } from "lucide-react";
import Table from "../../components/Admin/table";
import { useCategoryViewModel } from "../../viewmodels/Admin/category-view-model";
import ConfirmDialog from "../../components/Admin/confirm-dialog";
import CategoryForm from "../../components/Admin/category-form";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";


const CategoryManagementView: React.FC = () => {
  const { newCategory, updateId, activeCategories, inActiveCategories, isAdding, isEditing, openDeleteDialog, categoryColumns, activeTab, category, openRecoverDialog, setOpenRecoverDialog, handleRecoverCategory, confirmRecover, setActiveTab, handleEditCategory, setIsEditing, setOpenDeleteDialog, handleAddCategory, handleDeleteCategory, confirmDelete, handleUpdateCategory, setIsAdding, handleAddChange, handleUpdateChange } = useCategoryViewModel();

  return (
    <div className="flex-1 p-6 bg-[var(--surface)] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[var(--defaulttext)]">
          Category Management
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[var(--primary-admin)] text-white rounded-lg hover:bg-[var(--primary-hover)] cursor-pointer"
        >
          <Plus size={18} /> Add Category
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <TabGroup>
          <TabItem
            label="Active"
            active={activeTab === "active"}
            onClick={() => setActiveTab("active")}
          />
          <TabItem
            label="Deleted"
            active={activeTab === "deleted"}
            onClick={() => setActiveTab("deleted")}
          />
        </TabGroup>
      </div>

      {/* Table */}
      <div>
        {activeTab === "active" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Table
                columns={categoryColumns}
                data={activeCategories}
                className="rounded-lg shadow-md"
                getRowActions={(row) => [
                  { type: "edit", onClick: () => handleEditCategory(row.id) },
                  { type: "delete", onClick: () => handleDeleteCategory(row.id) },
                ]}
              />
            </div>
          </div>
        )}
        {activeTab === "deleted" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Table
                columns={categoryColumns}
                data={inActiveCategories}
                className="rounded-lg shadow-md"
                getRowActions={(row) => [
                  { type: "recover", onClick: () => handleRecoverCategory(row.id) },
                ]}
              />
            </div>
          </div>
        )}
      </div>
      

      {/* Add Category Form */}
      {isAdding && (
        <CategoryForm
          category={newCategory}
          handleChange={handleAddChange}
          onSave={handleAddCategory}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {/* Update Category Form */}
      {isEditing && (
        <CategoryForm
          category={category}
          handleChange={handleUpdateChange}
          isUpdate
          onSave={() => handleUpdateCategory(updateId)}
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
      <ConfirmDialog
            open={openRecoverDialog}
            onOpenChange={setOpenRecoverDialog}
            title="Confirm"
            description="Are you sure you want to recover this category?"
            confirmText="Recover"
            cancelText="Cancel"
            onConfirm={confirmRecover}
            danger={false}
          />
    </div>
  );
};



export default CategoryManagementView;
