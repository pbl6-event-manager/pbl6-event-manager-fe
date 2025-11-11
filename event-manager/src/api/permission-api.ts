import apiClient  from "./api-config";

export const getAllPermissions = () => apiClient.get("/permission");