export interface PermissionListItem {
    id: number;
    name: string;
    description: string;
}

export interface PermissionFormData {
    name: string,
    description: string
}

export const PERMISSION_FORM_DEFAULT: PermissionFormData = {
  name: "",
  description: "",
};