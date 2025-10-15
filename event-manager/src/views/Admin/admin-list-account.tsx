import React, {useState} from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import Table from "../../components/Admin/table";
import FilterUserSidebar from "../../components/Admin/filter-user-sidebar";
import ConfirmDialog from "../../components/Admin/confirm-dialog";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";

const AdminUsers: React.FC = () => {
  const {  filteredActiveUsers, filteredInActiveUsers, columns, openDelDialog, openRecDialog, activeTab, setActiveTab, handleViewDetail, handleDelete, handleEdit, confirmDelete, setOpenDelDialog, setOpenRecDialog, handleCreate, setFilters, handleRecover, confirmRecover } = useUserViewModel();

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
      <div>
        {activeTab === "active" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Table
                columns={columns}
                data={filteredActiveUsers}
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
        )}
        {activeTab === "deleted" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Table
                columns={columns}
                data={filteredInActiveUsers}
                className="rounded-lg shadow-md"
                getRowActions={(row) => [
                  { 
                    label: "Details", 
                    onClick: () => handleViewDetail(row.id) 
                  },
                  {
                    label: "Recover",
                    onClick: () => handleRecover(row.email),
                  }
                ]}
              />
            </div>

            <FilterUserSidebar onFilter={setFilters} />
          </div>
        )}
      </div>
      <ConfirmDialog
            open={openDelDialog}
            onOpenChange={setOpenDelDialog}
            title="Confirm"
            description="Are you sure you want to delete this account?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={confirmDelete}
          />
      <ConfirmDialog
            open={openRecDialog}
            onOpenChange={setOpenRecDialog}
            title="Confirm"
            description="Are you sure you want to recover this account?"
            confirmText="Recover"
            cancelText="Cancel"
            danger = {false}
            onConfirm={confirmRecover}
          />
    </div>
  );
};

export default AdminUsers;
