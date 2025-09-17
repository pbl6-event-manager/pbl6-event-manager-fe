import React, {useState} from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import Table from "../../components/Admin/table";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../../components/Admin/filter-sidebar";
import {applyUserFilters} from "../../utils/Admin/filter-user";
import type { FilterState } from "../../utils/Admin/filter-user";

const AdminUsers: React.FC = () => {
  const { users } = useUserViewModel();
  const navigate = useNavigate();

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
          onClick={() => navigate("/admin/users/create")}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)]"
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
          />
        </div>

        <FilterSidebar onFilter={setFilters} />
      </div>
    </div>
  );
};

export default AdminUsers;
