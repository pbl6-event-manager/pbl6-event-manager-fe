import React from "react";
import { useUserViewModel } from "../../../../viewmodels/Admin/user/user-view-model";
import ConfirmDialog from "../../../../components/Admin/confirm-dialog";
import TabGroup from "../../../../components/Admin/tab-group";
import TabItem from "../../../../components/Admin/tab-item";
import UserInformationCard from "../components/user-information-card";
import UserActiveOrganizerEvents from "../components/user-active-organizer-event";
import UserInActiveOrganizerEvents from "../components/user-inactive-organizer-event";
import { ArrowLeft } from "lucide-react";
import OrderOfAnUser from "./order-of-an-user";

const UserViewDetailPage: React.FC = () => {
  const { user, openDelDialog, setOpenDelDialog, activeDetailTab, setActiveDetailTab, handleEdit, handleDelete, handleBack, confirmDelete, handleRecover, openRecDialog, setOpenRecDialog, confirmRecover } = useUserViewModel();

  if (!user) {
    return (
      <div className="p-6">
        <div>Loading user...</div>
      </div>
    );
  }

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

      <TabGroup>
        <TabItem
          label="Order"
          active={activeDetailTab === "order"}
          onClick={() => setActiveDetailTab("order")}
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

      <div>
        {activeDetailTab === "order" && <OrderOfAnUser customerId={user.id} />}
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
