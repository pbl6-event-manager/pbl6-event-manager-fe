import { ADD_CATEGORY, FETCH_CATEGORIES } from "../../actions/Admin/category-action";
import type { CategoryState } from "../../../models/Admin/category-models";
import { initialState } from "../../../models/Admin/category-models";

const categoryReducer = (state = initialState, action: any): CategoryState => {
  switch (action.type) {
    case FETCH_CATEGORIES:
        return { ...state, categories: action.payload };
    case ADD_CATEGORY:
        return {
            ...state,
            categories: [...state.categories, action.payload]
        }
    default:
      return state;
  }
};

export default categoryReducer;