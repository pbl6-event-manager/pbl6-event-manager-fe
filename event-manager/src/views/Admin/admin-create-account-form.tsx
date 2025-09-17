import React from "react";
import AccountForm from "../../components/Admin/account-form";


const CreateAccountView: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full bg-[var(--surface)] overflow-hidden">
        <AccountForm onSubmit={() => console.log("...")}/>
    </div>
  );
};

export default CreateAccountView;
