import React from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import UserParticipantEvents from "../../components/Admin/user-participant-event";
import ConfirmDialog from "../../components/Admin/confirm-dialog";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";
import UserInformationCard from "../../components/Admin/user-information-card";
import UserActiveOrganizerEvents from "../../components/Admin/user-active-organizer-event";
import UserInActiveOrganizerEvents from "../../components/Admin/user-inactive-organizer-event";
import { ArrowLeft } from "lucide-react";

const UserViewDetailPage: React.FC = () => {
  const { user, openDelDialog, setOpenDelDialog, activeDetailTab, setActiveDetailTab, handleEdit, handleDelete, handleBack, confirmDelete, handleRecover, openRecDialog, setOpenRecDialog, confirmRecover } = useUserViewModel();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex-cols items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <UserInformationCard
        user={user}
        onEdit={handleEdit}
        onChangeStatus={user.isActive ? handleDelete : handleRecover}
      />

      {/* Tabs */}
      <TabGroup>
        <TabItem
          label="Attendee"
          active={activeDetailTab === "participant"}
          onClick={() => setActiveDetailTab("participant")}
        />
        <TabItem
          label="Active Organizer"
          active={activeDetailTab === "active-organizer"}
          onClick={() => setActiveDetailTab("active-organizer")}
        />
        <TabItem
          label="Deleted Organizer"
          active={activeDetailTab === "deleted-organizer"}
          onClick={() => setActiveDetailTab("deleted-organizer")}
        />
      </TabGroup>

      {/* Nội dung tab */}
      <div>
        {activeDetailTab === "participant" && <UserParticipantEvents />}
        {activeDetailTab === "active-organizer" && <UserActiveOrganizerEvents />}
        {activeDetailTab === "deleted-organizer" && <UserInActiveOrganizerEvents />}
      </div>

      <ConfirmDialog
        open={openDelDialog}
        onOpenChange={setOpenDelDialog}
        title="Confirm"
        description="Are you sure you want to delete this account?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
      />
      <ConfirmDialog
        open={openRecDialog}
        onOpenChange={setOpenRecDialog}
        title="Confirm"
        description="Are you sure you want to recover this account?"
        confirmText="Recover"
        cancelText="Cancel"
        onConfirm={confirmRecover}
        danger={false}
      />
    </div>
  );
};

export default UserViewDetailPage;
