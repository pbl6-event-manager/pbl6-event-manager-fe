import React from "react";
import { Pencil, RotateCw, Trash } from "lucide-react";
import type { UserInformationCardProps } from "../../models/component-props/card-component-props"; 

const UserInformationCard: React.FC<UserInformationCardProps> = ({
  user,
  onEdit,
  onChangeStatus,
}) => {
  if(!user) return null;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 relative">
      <div className="absolute top-4 right-4 flex space-x-3 text-gray-600">
        <button
          className="hover:text-blue-500 cursor-pointer"
          onClick={() => onEdit(user.email)}
        >
          <Pencil size={20} />
        </button>

        {user.isActive ? (
          <button
            className="hover:text-red-500 cursor-pointer"
            onClick={() => onChangeStatus(user.email)}
            title="Delete account"
          >
            <Trash size={20} />
          </button>
        ) : (
          <button
            className="hover:text-green-500 cursor-pointer"
            onClick={() => onChangeStatus(user.email)}
            title="Recover account"
          >
            <RotateCw size={20} />
          </button>
        )}
      </div>

      <div className="flex items-start space-x-8">
        <div className="flex flex-col items-center w-1/4">
          <img
            src={user.avatarUrl ? user.avatarUrl : undefined}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover shadow-md mb-3"
          />
        </div>

        <div className="flex-1 grid grid-cols-3 gap-8">
          <div>
            <p className="font-semibold text-gray-700 text-lg">First Name</p>
            <p className="flex items-center text-gray-800 mt-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              {user.firstName}
            </p>

            <p className="font-semibold text-gray-700 text-lg mt-4">Last Name</p>
            <p className="flex items-center text-gray-800 mt-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              {user.lastName}
            </p>
          </div>
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

          <div>
            <p className="font-semibold text-gray-700 text-lg">Role</p>
            <p className="flex items-center text-gray-800 mt-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              {user.roles}
            </p>

            <p className="font-semibold text-gray-700 text-lg mt-4">Status</p>
            <p
              className={`flex items-center font-semibold mt-1 ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}>
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  user.isActive ? "bg-green-500" : "bg-red-500"
                }`}>
              </span>
              {user.isActive ? "Active" : "Deleted"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformationCard;
