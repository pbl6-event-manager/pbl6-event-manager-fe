import apiClient from "./api-config";

export const getAllUsersApi = () => apiClient.get("/admin/accounts");

export const updateUserApi = (email: string, userData: any) => apiClient.patch(`/admin/profile/?email=${email}`, userData, {headers: {"Content-type": "multipart/form-data"}});

export const getUserByEmailApi = (email: string) => apiClient.get(`/admin/profile?email=${email}`);