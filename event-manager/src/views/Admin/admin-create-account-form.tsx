import React from "react";
import AccountForm from "../../components/account-form";


const CreateAccountView: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AccountForm onSubmit={() => console.log("...")}/>
    </div>
  );
};

export default CreateAccountView;
