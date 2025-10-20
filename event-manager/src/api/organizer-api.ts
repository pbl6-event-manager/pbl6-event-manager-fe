import apiClient from "./api-config";

export const getOrgOfAnUserApi = (id: any) => apiClient.get(`/organizers/admin/user/${id}`);

