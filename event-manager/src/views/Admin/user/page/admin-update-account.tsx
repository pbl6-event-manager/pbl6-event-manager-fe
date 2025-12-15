import React from "react";
import AccountForm from "../components/account-form";
import { useUserViewModel } from "../../../../viewmodels/Admin/user/user-view-model";
import { ArrowLeft } from "lucide-react";


const UpdateAccountView: React.FC = () => {
  const {handleUpdate, handleBack, location} = useUserViewModel();
  const user = location.state?.user;

  return (
    <div className="relative flex items-center justify-center h-full bg-gray-100 overflow-hidden">

      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Back</span>
      </button>

      <AccountForm
        initialData={{
            avatar: user.avatarUrl,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone === "Not Updated" ? null : user.phone,
            role: user.roles,
        }}
        onSubmit={(data) => handleUpdate(data)}
      />
    </div>
  );
};

export default UpdateAccountView;
