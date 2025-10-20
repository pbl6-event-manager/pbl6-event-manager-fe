import { deleteCategoryApi, getAllCategoriesApi } from "../api/category-api"
import { convertCategoryModelToListCategoryDto } from "../converters/category-converter";
import { mapToCategoryModel } from "../mappers/category-mapper";
import type { CategoryModel } from "../models/Admin/category-models";

export const getAllCategoriesService = async() => {
    try {
        const data = await getAllCategoriesApi();
        const categories = data.data.data.map(mapToCategoryModel);
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