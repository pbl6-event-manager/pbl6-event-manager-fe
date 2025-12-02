import apiClient from "./api-config";

export const createEvent = (event: any) => apiClient.post("/events", event, {headers: {"Content-type": "multipart/form-data"}});

export const getEventByIdApi = (eventId: any) => apiClient.get(`/events/${eventId}`);

export const getAllEventsAdminApi = () => apiClient.get(`/events/admin`);

export const getEventsByOrganizerApi = (organizerId: any) => apiClient.get(`/events/organizer/${organizerId}`);

export const approveRejectEventApi = (eventId: number, isApprove: boolean) => apiClient.post(`/events/${eventId}/${isApprove ? "approve" : "reject"}`);

export const getEventsByOwnerApi = () => apiClient.get(`/events/my-events`);

export const getEventsByStaffApi = () => apiClient.get(`/events/my-event-staff`);

export const updateEventApi = (eventId: number, event: any) => apiClient.put(`/events/${eventId}`, event, 
    {headers: {"Content-type": "multipart/form-data"}
});

export const publishEventApi = (eventId: number) => apiClient.post(`/events/${eventId}/publish`);