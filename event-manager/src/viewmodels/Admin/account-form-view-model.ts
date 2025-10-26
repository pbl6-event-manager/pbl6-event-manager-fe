import { userFormSchema, type UserFormData  } from "../../models/Admin/form-models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

export function useAccountFormViewModel(initialData?: Partial<UserFormData>, onSubmit?: (data: UserFormData) => void) {
  const [preview, setPreview] = useState<string | null>(null);
  const isUpdated = Boolean(initialData)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema(isUpdated)) as any,
    defaultValues: initialData,
  });

  useEffect(() => {
    reset(initialData);
    if (initialData?.avatar instanceof FileList && initialData.avatar[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(initialData.avatar[0]);
    }
  }, [initialData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Avatar selected:", e.target.files);
    const file = e.target.files;
    if (file && file[0]) {
      setValue("avatar", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file[0]);
    }
  };

  const onSubmitHandler: SubmitHandler<UserFormData> = (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName)
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone ?? "");
    formData.append("role", data.role);

    if (!isUpdated || (isUpdated && data.password)) {
      formData.append("password", data.password ?? "");
    }

    if (data.avatar && data.avatar instanceof FileList && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    onSubmit?.(formData as any);
  };

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    preview,
    handleImageChange,
    isUpdated,
    setValue
  };
}