import React from "react";
import AccountForm from "../../components/Admin/account-form";
import { useLocation } from "react-router-dom";


const UpdateAccountView: React.FC = () => {
  const location = useLocation();
  const { email } = location.state as { email: string };
  
  console.log(email);

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 overflow-hidden">
      <AccountForm
        initialData={{
            fullName: "Nguyễn Văn A",
            email: "a@example.com",
            phone: "0987654321",
            role: "user",
            password: "123456",
        }}
        onSubmit={(data) => console.log("Update:", data)}
      />
    </div>
  );
};

export default UpdateAccountView;
