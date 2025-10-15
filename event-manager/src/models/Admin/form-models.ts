import * as yup from "yup";

export const userFormSchema = (isUpdated = false) => yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: isUpdated ? yup.string().notRequired() : yup
    .string()
    .required("Password is required")
    .min(10, "Password must be at least 10 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  phone: yup
    .string()
    .nullable() 
    .matches(
      /^$|^\+?[0-9]{9,15}$/,
      "Phone number must be 9–15 digits and can start with +"
    ),
  role: yup.string().required("Please select a role"),
  avatar: yup.mixed().notRequired(),
});

export type UserFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string | null;
  role: string;
  avatar?: FileList;
};

export interface RegisterFormProps {
  initialData?: Partial<UserFormData>; 
  onSubmit: (data: UserFormData) => void;
}