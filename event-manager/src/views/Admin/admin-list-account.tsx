import React from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import Table from "../../components/table";
import { useNavigate } from "react-router-dom";

const AdminUsers: React.FC = () => {
  const { users } = useUserViewModel();
  const navigate = useNavigate();

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
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý tài khoản</h2>
        <button
          onClick={() => navigate("/admin/users/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tạo tài khoản
        </button>
      </div>

      <Table
        columns={columns}
        data={users}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default AdminUsers;
