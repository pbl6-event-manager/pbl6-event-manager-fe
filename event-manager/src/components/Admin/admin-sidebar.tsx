import React from "react";
import { Link } from "react-router-dom";
import { useSideBarViewModel } from "../../viewmodels/Admin/sidebar-view-model";
import {
  Home,
  Users,
  LogOut,
  Banknote,
  Tags,
  Ticket,
  Shield,
} from "lucide-react";
import ConfirmDialog from "./confirm-dialog";
import Logo from "../../assets/Logo.svg";

const AdminSidebar: React.FC = () => {
  const { openDialog, setOpenDialog, handleLogout } = useSideBarViewModel();
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    {
      path: "/admin/users",
      label: "Account Management",
      icon: <Users size={18} />,
    },
    {
      path: "/admin/permissions",
      label: "Permission Management",
      icon: <Shield size={18} />,
    },
    {
      path: "/admin/events",
      label: "Event Management",
      icon: <Ticket size={18} />,
    },
    {
      path: "/admin/categories",
      label: "Category Management",
      icon: <Tags size={18} />,
    },
    {
      path: "/admin/payments",
      label: "Transaction Management",
      icon: <Banknote size={18} />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-[var(--surface)] flex flex-col text-[var(--defaulttext)] border-r border-[var(--border-sidebar)]">
      {/* Logo */}
      <div className="px-6 py-4 text-lg font-bold">
        <img src={Logo} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              location.pathname.startsWith(item.path)
                ? "bg-[var(--primary-admin)] text-white"
                : "hover:bg-[var(--primary-admin)] hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Avatar + Tên */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=12"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium">Admin</span>
        </div>

        {/* Icon Logout */}
        <button
          onClick={() => setOpenDialog(true)}
          className="p-2 rounded-md hover:bg-[var(--error)] hover:text-white transition"
        >
          <LogOut size={18} />
        </button>

        <ConfirmDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Confirm"
          description="Are you sure you want to log out?"
          confirmText="Log out"
          cancelText="Cancel"
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
