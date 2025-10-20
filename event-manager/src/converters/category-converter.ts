import type { ListCategoryDto } from "../dtos/category-dto";
import type { CategoryModel } from "../models/Admin/category-models";

export const convertCategoryModelToListCategoryDto = (categoryModel : CategoryModel) : ListCategoryDto => ({
    id: categoryModel.id,
    name: categoryModel.name,
    description: categoryModel.description
})