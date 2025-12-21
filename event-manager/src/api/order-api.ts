import apiClient from "./api-config";

export const getOrderByCustomerIdApi = (customerId: any) => apiClient.get(`/orders/my-orders/`, { params: customerId });

export const getOrdersApi = (orderSearchParams: any) => apiClient.get(`/orders`, { params: orderSearchParams });

export const getAttendeeApi = (eventId: number) => apiClient.get(`/orders/attendees/${eventId}`);

export const checkInApi = (qrCode: string, eventId: number) => apiClient.get(`/orders/get-info-with-event/${qrCode}/${eventId}`);

export const getAllOrderByEventIdApi = (eventId: number) => apiClient.get(`/orders/event/${eventId}`);