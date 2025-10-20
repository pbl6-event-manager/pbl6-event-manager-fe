import React from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import UserParticipantEvents from "../../components/Admin/user-participant-event";
import ConfirmDialog from "../../components/Admin/confirm-dialog";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";
import UserInformationCard from "../../components/Admin/user-information-card";
import UserActiveOrganizerEvents from "../../components/Admin/user-active-organizer-event";
import UserInActiveOrganizerEvents from "../../components/Admin/user-inactive-organizer-event";

const UserViewDetailPage: React.FC = () => {
  const { selectedUserEmail, location, navigate, openDelDialog, setOpenDelDialog, activeDetailTab, setActiveDetailTab } = useUserViewModel();
  const user = location.state?.user;

  const handleEdit = (email: string) => {
    navigate("/admin/users/edit", { state: { email } }); 
  };

  const handleDelete = (email: string) => {
    setOpenDelDialog(false);
  }


  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Details</h2>

      <UserInformationCard
        user={user}
        onEdit={handleEdit}
        onDelete={() => setOpenDelDialog(true)}
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
          onConfirm={() => handleDelete(user.email)}
        />
    </div>
  );
};

export default UserViewDetailPage;
