import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, LogOut, Banknote, Ticket, ChevronDown, ChevronRight } from "lucide-react";
import ConfirmDialog from "./confirm-dialog";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [openUsersMenu, setOpenUsersMenu] = useState(false);

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { path: "/admin/systems", label: "Quản lý hệ thống", icon: <Settings size={18} /> },
    { path: "/admin/users", label: "Quản lý tài khoản", icon: <Users size={18} /> },
    { path: "/admin/events", label: "Quản lý sự kiện", icon: <Ticket size={18} /> },
    { path: "/admin/payments", label: "Quản lý giao dịch", icon: <Banknote size={18} /> },
  ];

  const handleLogout = () => {
    setOpenDialog(false);
  };

  return (
    <div className="h-screen w-64 bg-white flex flex-col text-gray-800 border-r border-gray-200">
      {/* Logo */}
      <div className="px-6 py-4 text-lg font-bold border-b border-gray-200">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
              location.pathname.startsWith(item.path)
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
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
          className="p-2 rounded-md hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={18} />
        </button>

        <ConfirmDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Xác nhận"
          description="Bạn có chắc muốn đăng xuất không?"
          confirmText="Đăng xuất"
          cancelText="Hủy"
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
};

export default AdminSidebar;
