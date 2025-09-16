import React, { useState } from "react";
import { useUserDetailViewModel } from "../../viewmodels/Admin/user-detail-view-model";
import UserParticipantEvents from "../../components/Admin/user-participant-event";
import { Pencil, Lock, Unlock, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/Admin/confirm-dialog";

const UserViewDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"participant" | "organizer">(
    "participant"
  );
  const { selectedUserEmail } = useUserDetailViewModel();
  const navigate  = useNavigate();
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [openBanDialog, setOpenBanDialog] = useState(false);
  // Mock dữ liệu user detail, thực tế bạn lấy từ store hoặc gọi API
  const userInfo = {
    name: "Nguyễn Văn A",
    email: selectedUserEmail || "a@example.com",
    phone: "0123456789",
    role: "Admin",
    status: "Banned",
    avatar: "https://i.pravatar.cc/150?img=5",
  };

  const handleEdit = (email: string) => {
    navigate("/admin/users/edit", { state: { email } }); 
  };

  const handleDelete = (email: string) => {
    setOpenDelDialog(false);
  }

  const handleBan = (email: string) => {
    setOpenBanDialog(false);
  }


  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Details</h2>

      {/* Thông tin chi tiết */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 relative">
        {/* Icon actions góc phải */}
        <div className="absolute top-4 right-4 flex space-x-3 text-gray-600">
          <button className="hover:text-blue-500"
                  onClick={() => handleEdit(userInfo.email)}>
            <Pencil size={20} />
          </button>
          {userInfo.status === "Active" ? (
            <button
              className="hover:text-yellow-500"
              onClick={() => setOpenBanDialog(true)}
            >
              <Lock size={20} />
            </button>
          ) : (
            <button
              className="hover:text-green-500"
              onClick={() => setOpenBanDialog(true)}
            >
              <Unlock size={20} />
            </button>
          )}
          <button className="hover:text-red-500"
                  onClick={() => setOpenDelDialog(true)}>
            <Trash size={20} />
          </button>
        </div>

        {/* Nội dung user */}
        <div className="flex items-center space-x-6">
          <img
            src={userInfo.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{userInfo.name}</h3>
            <p className="text-gray-600">{userInfo.email}</p>
            <p className="text-gray-600">{userInfo.phone}</p>
            <p className="text-gray-600">Role: {userInfo.role}</p>
            <p className="text-gray-600">Status: {userInfo.status}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4 flex space-x-6">
        <button
          onClick={() => setActiveTab("participant")}
          className={`pb-2 ${
            activeTab === "participant"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          Attendee
        </button>
        <button
          onClick={() => setActiveTab("organizer")}
          className={`pb-2 ${
            activeTab === "organizer"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          Organizer
        </button>
      </div>

      {/* Nội dung tab */}
      <div>
        {activeTab === "participant" && <UserParticipantEvents />}
        {activeTab === "organizer" && (
          <div className="bg-white shadow-md rounded-lg p-4">
            📌 Danh sách sự kiện do người dùng tổ chức (đang mock)
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
          onConfirm={() => handleDelete(userInfo.email)}
        />

      <ConfirmDialog
        open={openBanDialog}
        onOpenChange={setOpenBanDialog}
        title="Confirm"
        description={
          userInfo.status === "Active"
            ? "Are you sure you want to ban this account?"
            : "Are you sure you want to unban this account?"
        }
        confirmText={userInfo.status === "Active" ? "Ban" : "Unban"}
        cancelText="Cancel"
        onConfirm={() => handleBan(userInfo.email)}
      />
    </div>
  );
};

export default UserViewDetailPage;
