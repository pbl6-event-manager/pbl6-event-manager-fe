import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/Admin/admin-sidebar";
import { useLayoutViewModel } from "../../viewmodels/Admin/layout-view-model";

const AdminLayout: React.FC = () => {
  const { isScrollable } = useLayoutViewModel();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 text-white flex flex-col">
        <AdminSidebar />
      </aside>

      {/* Content */}
      <main className={`flex-1 bg-[var(--surface)] p-6 ${isScrollable ? "overflow-auto" : "overflow-hidden"}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;