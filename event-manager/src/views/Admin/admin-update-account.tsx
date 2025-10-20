import React from "react";
import AccountForm from "../../components/Admin/account-form";
import { useLocation } from "react-router-dom";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import { ArrowLeft } from "lucide-react";


const UpdateAccountView: React.FC = () => {
  const {handleUpdate, handleBack, location} = useUserViewModel();
  const user = location.state?.user;

  return (
    <div className="relative flex items-center justify-center h-full bg-gray-100 overflow-hidden">

      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2 rounded-xl 
                   bg-[var(--primary-admin)] text-white font-semibold shadow-md 
                   transition-all duration-300"
      >
        <ArrowLeft size={20} />
        Back
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
