import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Admin/admin-sidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 text-white flex flex-col">
        <AdminSidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 bg-[var(--surface)] p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;