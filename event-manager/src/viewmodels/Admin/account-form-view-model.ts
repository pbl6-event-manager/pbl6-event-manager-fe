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
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler: SubmitHandler<UserFormData> = (data) => {
    if (isUpdated && !data.password) {
      const { password, ...rest } = data;
      onSubmit?.(rest as UserFormData);
    } else {
      onSubmit?.(data);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmitHandler,
    errors,
    preview,
    handleImageChange,
    isUpdated
  };
}