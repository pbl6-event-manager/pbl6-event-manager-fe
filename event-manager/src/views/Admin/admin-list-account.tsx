import React from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import Table from "../../components/table";

const AdminUsers: React.FC = () => {
  const { users } = useUserViewModel();

  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Avatar", accessor: "avatar", type: "image" as const },
    { header: "Tên", accessor: "name", type: "text" as const },
    { header: "Email", accessor: "email", type: "text" as const },
    { header: "SDT", accessor: "phone", type: "text" as const },
    { header: "Vai trò", accessor: "role", type: "text" as const },
    { header: "Thac tác", accessor: "actions", type: "action" as const },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quản lý tài khoản</h2>
      <Table
        columns={columns}
        data={users}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default AdminUsers;
