import React from "react";
import AccountForm from "../../components/Admin/account-form";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import { ArrowLeft } from "lucide-react";

const CreateAccountView: React.FC = () => {
  const { handleBack, handleAdd } = useUserViewModel();

  return (
    <div className="relative flex items-center justify-center h-full bg-[var(--surface)] overflow-hidden">
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-medium">Back</span>
      </button>

      {/* 📋 Form căn giữa tuyệt đối */}
      <div className="flex justify-center items-center w-full px-4">
        <div className="w-full max-w-md">
          <AccountForm onSubmit={(data) => handleAdd(data)} />
        </div>
      </div>
    </div>
  );
};

export default CreateAccountView;
