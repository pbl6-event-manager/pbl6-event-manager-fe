import React from "react";
import { useAccountViewModel } from "../../../viewmodels/Organizer/accounts/accounts-view-model";
import { AccountProfileSidebar } from "../../../components/Organizer/account-profile-sidebar";
import { AccountPasswordSection } from "../../../components/Organizer/account-password-section";
import { AccountProfileSection } from "../../../components/Organizer/account-profile-section";

const AccountSettingPage: React.FC = () => {
  const { user, isPasswordRoute } = useAccountViewModel();

  return (
    <div className="min-h-screen bg-white flex">
      <AccountProfileSidebar />

      <main className="flex-1 p-10">
        {isPasswordRoute ? (
          <AccountPasswordSection />
        ) : (
          <AccountProfileSection user={user} />
        )}
      </main>
    </div>
  );
};

export default AccountSettingPage;
