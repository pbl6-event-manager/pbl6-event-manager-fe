import type { CategoryModel } from "../bean/category-models";
import type { ListCategoryDto } from "../../dtos/category-dto";

//#region Reducer Models
export interface CategoryState {
  categories: CategoryModel[]
  activeCategories: ListCategoryDto[]
  inActiveCategories: ListCategoryDto[]
  loading: boolean
  error: string | null
  numberOfCategories: number
}

export const DEFAULT_CATEGORY_STATE: CategoryState = {
  categories: [],
  activeCategories: [],
  inActiveCategories: [],
  loading: false,
  error: null,
  numberOfCategories: 0,
};
//#endregion