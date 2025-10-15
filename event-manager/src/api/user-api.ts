import apiClient from "./api-config";

export const getAllUsersApi = () => apiClient.get("/admin/accounts");

export const updateStatusUserApi = (email: string, isActive: boolean) => apiClient.patch(`/admin/profile/?email=${email}`, {isActive});

export const createUserApi = (email: string, userData: any) => apiClient.patch(`/admin/profile/?email=${email}`, userData);