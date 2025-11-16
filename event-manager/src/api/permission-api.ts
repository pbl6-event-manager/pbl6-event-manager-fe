import apiClient  from "./api-config";

export const getAllPermissions = () => apiClient.get("/permission");

export const addPermissionApi = (permission: any) => apiClient.post("/permission", permission);

export const updatePermissionApi = (permissionId: number, permission: any) => apiClient.patch(`/permission/${permissionId}`, permission);

export const deletePermissionApi = (permissionId: number) => apiClient.delete(`/permission/${permissionId}`);