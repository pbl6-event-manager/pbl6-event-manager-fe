import apiClient from "./api-config";

export const getAllRoleStaffs = () => apiClient.get("/role-staff");

export const createNewRoleStaff = (roleStaff: any) => apiClient.post("/role-staff", roleStaff);