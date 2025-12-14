import apiClient from "./api-config";

export const getOrderByCustomerIdApi = (customerId: number) => apiClient.get(`/orders/${customerId}`);

export const getOrdersApi = (orderSearchParams: any) => apiClient.get(`/orders`, { params: orderSearchParams });