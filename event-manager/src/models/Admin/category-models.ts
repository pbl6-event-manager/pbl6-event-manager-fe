import type { ListCategoryDto } from "../../dtos/category-dto";

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface CategoryFormData {
    name: string;
    description: string;
}

export interface CategoryFormProps {
  initialData?: Category;
  onSave: (data: Category) => void;
  onCancel: () => void;
  isUpdate?: boolean;
}


export interface CategoryState {
  categories: CategoryModel[]
  activeCategories: ListCategoryDto[],
  inActiveCategories: ListCategoryDto[],
  loading: boolean
  error: string | null
}

export const initialState: CategoryState = {
  categories: [],
  activeCategories: [],
  inActiveCategories: [],
  loading: false,
  error: null
};

export const CATEGORY_FORM_DEFAULT: CategoryFormData = {
  name: "",
  description: "",
};

export interface CategoryModel {
  id: number,
  name: string,
  description: string,
  isActive: boolean
}