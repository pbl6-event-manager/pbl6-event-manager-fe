import apiClient from "./api-config";

export const getOrgOfAnUserApi = (id: any) => apiClient.get(`/organizers/admin/user/${id}`);

export const getMyOrganizers = () => apiClient.get("/organizers/my/organizers");

export const getOrganizerOfAnEventForPublicApi = (eventId: number) => apiClient.get(`/organizers/publish/${eventId}`);

export const getOrganizerByIdApi = (id: number) => apiClient.get(`/organizers/${id}`);

export const getOrganizerByIdAdminSiteApi = (id: number) => apiClient.get(`/organizers/admin/${id}`);

export const createANewOrganizerApi = (organizer: any) => apiClient.post(
    "/organizers", 
    organizer, 
    { headers: { "Content-type": "multipart/form-data" }
});

export const updateOrganizerApi = (id: number, organizer: any) => apiClient.put(
    `/organizers/${id}`, 
    organizer, 
    { headers: { "Content-type": "multipart/form-data" }
});

export const deleteOrganizerApi = (id: number) => apiClient.delete(`/organizers/${id}`);