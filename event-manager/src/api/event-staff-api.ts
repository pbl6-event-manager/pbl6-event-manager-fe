import apiClient from "./api-config";

export const syncStaffToEvent = async (eventId: number, staffIds: number[]) => apiClient.post(`/event-staff/sync/${eventId}`, { eventId, staffIds });

//export const getAllAssignedStaffIdsOfEvent = async (eventId: number) => apiClient.get(`/event-staff/${eventId}/staffs`);

export const getStaffOfEventAdminApi = (eventId: number) => apiClient.get(`event-staff/admin/${eventId}/staffs`);

export const getStaffOfEventStaffApi = (eventId: number) => apiClient.get(`event-staff/staff/${eventId}/staffs`);

export const getStaffForAssignmentGroupedByRole = (eventId: number) => apiClient.get(`owner-user-rolestaff/event/${eventId}/staffs-grouped-by-role`);
