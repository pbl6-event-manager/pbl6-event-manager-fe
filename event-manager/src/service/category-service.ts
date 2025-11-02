import { addNewCategoryApi, deleteCategoryApi, getAllCategoriesApi, recoverCategoryApi, updateCategoryApi } from "../api/category-api"
import { convertCategoryModelToListCategoryDto } from "../converters/category-converter";
import { mapToCategoryModel } from "../mappers/category-mapper";
import type { CategoryModel } from "../models/bean/category-models";

export const getAllCategoriesService = async() => {
    try {
        const data = await getAllCategoriesApi();
        const categories = data.data.data.map(mapToCategoryModel).sort((a: any, b: any) => a.id - b.id);;
        const listActiveCategoryDto = categories.filter((cate: CategoryModel) => cate.isActive === true).map(convertCategoryModelToListCategoryDto)
        const listInActiveCategoryDto = categories.filter((cate: CategoryModel) => cate.isActive === false).map(convertCategoryModelToListCategoryDto)
        return {
            categories,
            listActiveCategoryDto,
            listInActiveCategoryDto
        };
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const deleteCategoryService = async(id: any) => {
    try {
        const data = await deleteCategoryApi(id);
        if(data.data.message === "success") return id;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const addNewCategoryService = async(category: any) => {
    try {
        const data = await addNewCategoryApi(category);
        if(data.data.message === "success") {
            const newCategory = mapToCategoryModel(data.data.data);
            return newCategory;
        } else {
            throw new Error("Unexpected error occurred");
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const updateCategoryService = async (id: any, category: any) => {
    try {
        const data = await updateCategoryApi(id, category);
        if(data.data.message === "success") {
            const updatedCategory = {
                id: id,
                name: category.name,
                description: category.description,
                isActive: true
            }
            return updatedCategory;
        } else {
            throw new Error("Unexpected error occurred");
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const recoverCateogoryService = async (id: any) => {
    try {
        const data = await recoverCategoryApi(id);
        if(data.data.message === "success") {
            return id;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}