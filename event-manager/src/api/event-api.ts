import apiClient from "./api-config";

export const createEvent = (event: any) => apiClient.post("/events", event)

export const getEventById = (eventId: any) => apiClient.get(`/events/${eventId}`)

