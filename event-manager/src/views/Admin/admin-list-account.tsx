import React, {useState} from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import Table from "../../components/Admin/table";
import FilterUserSidebar from "../../components/Admin/filter-user-sidebar";
import {applyUserFilters} from "../../utils/Admin/filter-user";
import type { FilterState } from "../../utils/Admin/filter-user";
import ConfirmDialog from "../../components/Admin/confirm-dialog";

const AdminUsers: React.FC = () => {
  const { users, openDialog, handleViewDetail, handleDelete, handleEdit, confirmDelete, setOpenDialog, handleCreate } = useUserViewModel();
  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Avatar", accessor: "avatar", type: "image" as const },
    { header: "Full Name", accessor: "name", type: "text" as const },
    { header: "Email", accessor: "email", type: "text" as const },
    { header: "Phone", accessor: "phone", type: "text" as const },
    { header: "Role", accessor: "role", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ];

  const [filters, setFilters] = useState<FilterState>({
    name: "",
    email: "",
    phone: "",
    role: "",
    sortOrder: "",
  });

  const filteredUsers = applyUserFilters(users, filters);

  return (
    <div className="p-6">
      {/* Header chung */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[var(--defaulttext)]">Accounts</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded-lg hover:bg-[var(--primary-hover)]"
        >
          Create an account
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Table
            columns={columns}
            data={filteredUsers}
            className="rounded-lg shadow-md"
            getRowActions={(row) => [
              { label: "Details", onClick: () => handleViewDetail(row.email) },
              { label: "Update", onClick: () => handleEdit(row.email) },
              {
                label: "Delete",
                onClick: () => handleDelete(row.email),
                danger: true,
              },
            ]}
          />
        </div>

        <FilterUserSidebar onFilter={setFilters} />
      </div>
      <ConfirmDialog
            open={openDialog}
            onOpenChange={setOpenDialog}
            title="Confirm"
            description="Are you sure you want to delete this account?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={confirmDelete}
          />
    </div>
  );
};

export default AdminUsers;
