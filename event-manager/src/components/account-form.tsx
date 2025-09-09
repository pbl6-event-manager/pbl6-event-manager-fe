import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Họ và tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  phone: yup.string().required("Số điện thoại là bắt buộc"),
  role: yup.string().required("Vui lòng chọn vai trò"),
});

export type FormData = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  avatar?: FileList;
};

interface RegisterFormProps {
  initialData?: Partial<FormData>; // dữ liệu truyền vào
  onSubmit: (data: FormData) => void;
}

const AccountForm: React.FC<RegisterFormProps> = ({ initialData, onSubmit }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData, // nếu có data thì đổ vào
  });

  // Cập nhật lại form khi initialData thay đổi
  useEffect(() => {
    reset(initialData);
    if (initialData?.avatar instanceof FileList && initialData.avatar[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(initialData.avatar[0]);
    }
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    onSubmit(data); // gọi callback từ props
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {initialData ? "Chỉnh sửa tài khoản" : "Tạo tài khoản"}
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
              className="absolute bottom-1 right-1 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer shadow-md hover:bg-blue-600 text-sm"
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
          <label className="block mb-1 font-medium text-sm">Họ và tên</label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Nhập họ và tên"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 font-medium text-sm">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Nhập email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone + Role */}
        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="block mb-1 font-medium text-sm">Số điện thoại</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Số ĐT"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium text-sm">Vai trò</label>
            <select
              {...register("role")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">-- Chọn --</option>
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-sm">Mật khẩu</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm"
        >
          {initialData ? "Cập nhật" : "Tạo tài khoản"}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
