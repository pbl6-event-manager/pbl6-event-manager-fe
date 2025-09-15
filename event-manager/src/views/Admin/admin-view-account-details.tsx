import React, { useState } from "react";
import { useUserDetailViewModel } from "../../viewmodels/Admin/user-detail-view-model";
import UserParticipantEvents from "../../components/Admin/user-participant-event";
import { Pencil, Lock, Trash } from "lucide-react";

const UserViewDetailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"participant" | "organizer">(
    "participant"
  );
  const { selectedUserEmail } = useUserDetailViewModel();

  // Mock dữ liệu user detail, thực tế bạn lấy từ store hoặc gọi API
  const userInfo = {
    name: "Nguyễn Văn A",
    email: selectedUserEmail || "a@example.com",
    phone: "0123456789",
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=5",
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Chi tiết tài khoản</h2>

      {/* Thông tin chi tiết */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 relative">
        {/* Icon actions góc phải */}
        <div className="absolute top-4 right-4 flex space-x-3 text-gray-600">
          <button className="hover:text-blue-500">
            <Pencil size={20} />
          </button>
          <button className="hover:text-yellow-500">
            <Lock size={20} />
          </button>
          <button className="hover:text-red-500">
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
            <p className="text-gray-600">Vai trò: {userInfo.role}</p>
            <p className="text-gray-600">Trạng thái: {userInfo.status}</p>
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
          Người tham dự
        </button>
        <button
          onClick={() => setActiveTab("organizer")}
          className={`pb-2 ${
            activeTab === "organizer"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-gray-600"
          }`}
        >
          Người tổ chức
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
    </div>
  );
};

export default UserViewDetailPage;
