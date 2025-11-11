import apiClient from "./api-config";

export const getAllRoleStaffs = () => apiClient.get("/role-staff");

export const getRoleStaffById = (id: number) => apiClient.get(`/role-staff/${id}`);

export const createNewRoleStaff = (name: string, description: string, permissionIds: number[]) => apiClient.post("/role-staff", { name, description, permissionIds });

export const updateRoleStaff = (id: number, name: string, description: string, permissionIds: number[]) =>
    apiClient.patch(`/role-staff/${id}`, { name, description, permissionIds });

export const deleteRoleStaff = (id: number) => apiClient.delete(`/role-staff/${id}`);