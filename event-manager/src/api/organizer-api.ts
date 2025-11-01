import apiClient from "./api-config";

export const getOrgOfAnUserApi = (id: any) => apiClient.get(`/organizers/admin/user/${id}`);

export const getMyOrganizers = () => apiClient.get("organizers/my/organizers");