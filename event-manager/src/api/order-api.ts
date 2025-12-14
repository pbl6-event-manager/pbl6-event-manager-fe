import apiClient from "./api-config";

export const getOrderByCustomerIdApi = (customerId: any) => apiClient.get(`/orders/my-orders/`, { params: customerId });

export const getOrdersApi = (orderSearchParams: any) => apiClient.get(`/orders`, { params: orderSearchParams });