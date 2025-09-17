import React from "react";
import { Pencil, Lock, Unlock, Trash } from "lucide-react";

interface UserInformationCardProps {
  user: {
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    avatar: string;
  };
  onEdit: (email: string) => void;
  onBan: (email: string) => void;
  onDelete: (email: string) => void;
}

const UserInformationCard: React.FC<UserInformationCardProps> = ({
  user,
  onEdit,
  onBan,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 relative">
      {/* Icon actions góc phải */}
      <div className="absolute top-4 right-4 flex space-x-3 text-gray-600">
        <button className="hover:text-blue-500" onClick={() => onEdit(user.email)}>
          <Pencil size={20} />
        </button>
        {user.status === "Active" ? (
          <button
            className="hover:text-yellow-500"
            onClick={() => onBan(user.email)}
          >
            <Lock size={20} />
          </button>
        ) : (
          <button
            className="hover:text-green-500"
            onClick={() => onBan(user.email)}
          >
            <Unlock size={20} />
          </button>
        )}
        <button className="hover:text-red-500" onClick={() => onDelete(user.email)}>
          <Trash size={20} />
        </button>
      </div>

      {/* Nội dung user */}
      <div className="flex items-start space-x-8">
        {/* Avatar + tên */}
        <div className="flex flex-col items-center w-1/4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover shadow-md mb-3"
          />
          <h3 className="text-xl font-bold">{user.name}</h3>
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex-1 grid grid-cols-2 gap-8">
          {/* Cột trái */}
          <div>
            <p className="font-semibold text-gray-700 text-lg">Email</p>
            <p className="flex items-center text-gray-800 mt-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              {user.email}
            </p>

            <p className="font-semibold text-gray-700 text-lg mt-4">Phone</p>
            <p className="flex items-center text-gray-800 mt-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              {user.phone}
            </p>
          </div>

          {/* Cột phải */}
          <div>
            <p className="font-semibold text-gray-700 text-lg">Role</p>
            <p className="flex items-center text-gray-800 mt-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              {user.role}
            </p>

            <p className="font-semibold text-gray-700 text-lg mt-4">Status</p>
            <p
              className={`flex items-center font-semibold mt-1 ${
                user.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  user.status === "Active" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              {user.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationCard;
