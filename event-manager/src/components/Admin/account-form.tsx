import React from "react";
import type { RegisterFormProps } from "../../models/Admin/form-models";
import { useAccountFormViewModel } from "../../viewmodels/Admin/account-form-view-model";

const AccountForm: React.FC<RegisterFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    preview,
    handleImageChange,
    isUpdated
  } = useAccountFormViewModel(initialData, onSubmit);

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[var(--surface)]">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-[var(--surface)] p-6 rounded-2xl w-80 border border-[var(--border-primary)]"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {initialData ? "Update an account" : "Create an account"}
        </h2>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4 relative">
          <div className="relative">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar preview"
              className="w-24 h-24 rounded-full object-cover border"
            />

            <label
              htmlFor="avatarUpload"
              className="absolute bottom-1 right-1 bg-[var(--primary-admin)] text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer shadow-md hover:bg-[var(--primary-hover)] text-sm"
            >
              +
            </label>

            <input
              id="avatarUpload"
              type="file"
              accept="image/*"
              {...register("avatar")}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Họ và tên */}
        <div className="mb-3">
          <label className="block mb-1 font-medium text-sm">First Name</label>
          <input
            {...register("firstName")}
            type="text"
            placeholder="Enter first name"
            className="w-full px-3 py-2 border border-[var(--placeholder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.firstName && (
            <p className="text-[var(--error)] text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium text-sm">Last Name</label>
          <input
            {...register("lastName")}
            type="text"
            placeholder="Enter last name"
            className="w-full px-3 py-2 border border-[var(--placeholder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.lastName && (
            <p className="text-[var(--error)] text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
            disabled={isUpdated}
            className="w-full px-3 py-2 border border-[var(--placeholder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.email && (
            <p className="text-[var(--error)] text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone + Role */}
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-sm">Phone</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-[var(--placeholder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.phone && (
              <p className="text-[var(--error)] text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-sm">Role</label>
            <select
              {...register("role")}
              className="w-full px-3 py-2 border border-[var(--placeholder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">-- Option --</option>
              <option value="Attendee/Organizer">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-[var(--error)] text-xs mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-[var(--placeholder)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.password && (
            <p className="text-[var(--error)] text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[var(--primary-admin)] text-white py-2 rounded-lg hover:bg-[var(--primary-hover)] transition text-sm cursor-pointer"
        >
          {initialData ? "Update" : "Create" }
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
