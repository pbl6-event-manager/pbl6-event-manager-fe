import React from "react";
import AccountForm from "../../components/Admin/account-form";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import { ArrowLeft } from "lucide-react";

const CreateAccountView: React.FC = () => {
  const { handleBack, handleAdd } = useUserViewModel();

  return (
    <div className="relative flex items-center justify-center h-full bg-[var(--surface)] overflow-hidden">
      {/* 🔙 Nút Back cố định và nổi bật */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2 rounded-xl 
                   bg-[var(--primary-admin)] text-white font-semibold shadow-md 
                   transition-all duration-300"
      >
        <ArrowLeft size={20} />
        Back
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
