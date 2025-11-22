import apiClient from "./api-config";

//#region admin
export const getAllUsersApi = () => apiClient.get("/admin/accounts");

export const updateUserApi = (email: string, userData: any) => apiClient.patch(`/admin/profile/?email=${email}`, userData, {headers: {"Content-type": "multipart/form-data"}});

export const getUserByEmailApi = (email: string) => apiClient.get(`/admin/profile?email=${email}`);

export const udpateCurrentUserApi = (userData: any) => apiClient.patch(`/user/profile`, userData, {headers: {"Content-type": "multipart/form-data"}});
//#endregion

