import apiClient from "./api-config";

export const getStaffOfEventAdminApi = (eventId: number) => apiClient.get(`event-staff/admin/${eventId}/staffs`);