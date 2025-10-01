export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoryFormData {
    name: string;
    description: string;
}

export interface CategoryState {
    categories: Category[]
}

export const initialState: CategoryState = {
  categories: [],
};

export const CATEGORY_FORM_DEFAULT: CategoryFormData = {
  name: "",
  description: "",
};