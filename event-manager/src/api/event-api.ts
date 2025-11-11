import apiClient from "./api-config";

export const createEvent = (event: any) => apiClient.post("/events", event);

export const getEventByIdApi = (eventId: any) => apiClient.get(`/events/${eventId}`);

export const getAllEventsAdminApi = () => apiClient.get(`/events/admin`);

export const getEventsByOrganizerApi = (organizerId: any) => apiClient.get(`/events/organizer/${organizerId}`);

export const approveRejectEventApi = (eventId: number, isApprove: boolean) => apiClient.post(`/events/${eventId}/${isApprove ? "approve" : "reject"}`);
