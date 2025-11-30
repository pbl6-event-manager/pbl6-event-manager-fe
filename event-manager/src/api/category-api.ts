import apiClient from "./api-config";

export const getAllCategoriesApi = () => apiClient.get("/categories/admin/all");

export const deleteCategoryApi = (id: any) => apiClient.delete(`/categories/${id}`);

export const addNewCategoryApi = (category: any) => apiClient.post("/categories", category);

export const updateCategoryApi = (id: any, category: any) => apiClient.put(`/categories/${id}`, category);

export const recoverCategoryApi = (id: any) => apiClient.put(`/categories/${id}/restore`);

export const getActiveCategoriesApi = () => apiClient.get("/categories");