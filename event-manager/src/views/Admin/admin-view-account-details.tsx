import React, { useState } from "react";
import { useUserDetailViewModel } from "../../viewmodels/Admin/user-detail-view-model";
import UserParticipantEvents from "../../components/Admin/user-participant-event";
import { Pencil, Lock, Unlock, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/Admin/confirm-dialog";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";
import UserInformationCard from "../../components/Admin/user-information-card";

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

      <UserInformationCard
        user={userInfo}
        onEdit={handleEdit}
        onBan={() => setOpenBanDialog(true)}
        onDelete={() => setOpenDelDialog(true)}
      />

      {/* Tabs */}
      <TabGroup>
        <TabItem
          label="Attendee"
          active={activeTab === "participant"}
          onClick={() => setActiveTab("participant")}
        />
        <TabItem
          label="Organizer"
          active={activeTab === "organizer"}
          onClick={() => setActiveTab("organizer")}
        />
      </TabGroup>

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
