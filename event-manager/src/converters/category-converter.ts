import type { ListCategoryDto } from "../dtos/category-dto";
import type { CategoryModel } from "../models/bean/category-models";
import type { CategoryListItem } from "../models/form-models/category-form-models";

export const convertCategoryModelToListCategoryDto = (categoryModel : CategoryModel) : ListCategoryDto => ({
    id: categoryModel.id,
    name: categoryModel.name,
    description: categoryModel.description
})

export const convertListCategoryDtoToCatergoryListItem = (listCategoryDto: ListCategoryDto) : CategoryListItem => ({
    id: listCategoryDto.id,
    name: listCategoryDto.name,
    description: listCategoryDto.description
})