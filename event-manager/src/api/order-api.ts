import apiClient from "./api-config";

export const getOrderByCustomerIdApi = (customerId: number) => apiClient.get(`/orders/${customerId}`);