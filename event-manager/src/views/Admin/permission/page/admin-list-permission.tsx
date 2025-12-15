import React from "react";
import Table from "../../../../components/Admin/table";
import ConfirmDialog from "../../../../components/Admin/confirm-dialog";
import { Plus } from "lucide-react";
import { usePermissionViewModel } from "../../../../viewmodels/Admin/permission/permission-view-model";
import PermissionForm from "../components/permission-form";

const PermissionManagememtView: React.FC = () => {
  const {
    permissionColumns,
    newPermission,
    permission,
    openDeleteDialog,
    setOpenDeleteDialog,
    isAdding,
    isEditing,
    setIsAdding,
    setIsEditing,
    handleAddChange,
    handleUpdateChange,
    updateId,
    listPermissionItem,
    handleEditPermission,
    handleDeletePermission,
    handleAddPermission,
    handleUpdatePermission,
    confirmDelete
  } = usePermissionViewModel();
  return (
    <div className="flex-1 p-6 bg-[var(--surface)] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[var(--defaulttext)]">
          Permission Management
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[var(--primary-admin)] text-white rounded-lg hover:bg-[var(--primary-hover)] cursor-pointer"
        >
          <Plus size={18} /> Add Permission
        </button>
      </div>

      <Table
        columns={permissionColumns}
        data={listPermissionItem}
        className="rounded-lg shadow-md"
        getRowActions={(row) => [
          { type: "edit", onClick: () => handleEditPermission(row.id) },
          { type: "delete", onClick: () => handleDeletePermission(row.id) },
        ]}
      />

      {isAdding && (
        <PermissionForm
          permission={newPermission}
          handleChange={handleAddChange}
          onSave={handleAddPermission}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {isEditing && (
        <PermissionForm
          permission={permission}
          handleChange={handleUpdateChange}
          isUpdate
          onSave={() => handleUpdatePermission(updateId)}
          onCancel={() => setIsEditing(false)}
        />
      )}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Confirm"
        description="Are you sure you want to delete this permission?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default PermissionManagememtView;
