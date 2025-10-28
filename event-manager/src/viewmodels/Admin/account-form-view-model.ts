import { userFormSchema, type UserFormData  } from "../../models/Admin/form-models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";

export function useAccountFormViewModel(initialData?: Partial<UserFormData>, onSubmit?: (data: UserFormData) => void) {
  const [preview, setPreview] = useState<string | null>(null);
  const isUpdated = Boolean(initialData)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema(isUpdated)) as any,
    defaultValues: initialData,
  });

  const newAvatarSelectedRef = useRef(false);

  useEffect(() => {
    const avatarIsFileList = initialData?.avatar instanceof FileList;
    const resetValues = initialData
      ? { ...initialData, avatar: avatarIsFileList ? initialData.avatar : undefined }
      : undefined;

    if (newAvatarSelectedRef.current) {
      const current = getValues();
      reset({ ...resetValues, avatar: current.avatar });
    } else {
      reset(resetValues);
    }

    const avatar = initialData?.avatar;

    if (typeof avatar === "string") {
      if (!newAvatarSelectedRef.current && avatar !== "") {
        setPreview(avatar);
        setValue("avatar" as any, undefined);
        return;
      }
    }

    if (!newAvatarSelectedRef.current && avatar instanceof FileList && avatar[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(avatar[0]);
      return;
    }

    if (!newAvatarSelectedRef.current) {
      setPreview(null);
    }
  }, [initialData, reset, setValue, getValues]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      newAvatarSelectedRef.current = true;
      setValue("avatar" as any, files);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(files[0]);
    } else {
      newAvatarSelectedRef.current = false;
      setValue("avatar" as any, undefined);
      setPreview(null);
    }
  };

  const onSubmitHandler: SubmitHandler<UserFormData> = (data) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName ?? "");
    formData.append("lastName", data.lastName ?? "");
    formData.append("email", data.email ?? "");
    formData.append("phone", data.phone ?? "");
    formData.append("role", data.role ?? "");

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
    setValue,
  };
}