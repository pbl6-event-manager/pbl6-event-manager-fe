import apiClient from "./api-config";

export const getAllUsersApi = () => apiClient.get("/admin/accounts");
