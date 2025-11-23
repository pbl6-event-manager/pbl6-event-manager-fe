import apiClient from "./api-config";

export const getAllVoucherApi = () => apiClient.get(`/vouchers`);