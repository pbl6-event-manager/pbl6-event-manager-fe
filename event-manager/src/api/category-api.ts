import apiClient from "./api-config";

export const getAllCategoriesApi = () => apiClient.get("/categories/admin/all");

export const deleteCategoryApi = (id: any) => apiClient.delete(`/categories/${id}`);