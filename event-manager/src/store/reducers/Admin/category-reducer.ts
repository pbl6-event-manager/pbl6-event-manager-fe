import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_FAILED, ADD_CATEGORY_SUCCESS, FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED, FETCH_ACTIVE_CATEGORIES_SUCCESS, FETCH_INACTIVE_CATEGORIES_SUCCESS, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAILED, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAILED, RECOVER_CATEGORY_REQUEST, RECOVER_CATEGORY_SUCCESS, RECOVER_CATEGORY_FAILED } from "../../actions/Admin/category-action";
import type { CategoryState } from "../../../models/Admin/category-models";
import { initialState } from "../../../models/Admin/category-models";

const categoryReducer = (state = initialState, action: any): CategoryState => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_ACTIVE_CATEGORIES_SUCCESS:
      return { ...state, loading: false, activeCategories: action.payload };
    case FETCH_INACTIVE_CATEGORIES_SUCCESS:
      return { ...state, loading: false, inActiveCategories: action.payload };
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null};
    case FETCH_CATEGORIES_FAILED:
      return { ...state, loading: false, error: action.payload};
    case DELETE_CATEGORY_REQUEST:
      return {...state, loading: true, error: null}
    case DELETE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload.updatedCategories, activeCategories: action.payload.updatedListActiveCategories, inActiveCategories: action.payload.updatedListInActiveCategories}
    case DELETE_CATEGORY_FAILED:
      return { ...state, loading: false, error: action.payload}
    case ADD_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null}
    case ADD_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload.updatedCategories, activeCategories: action.payload.updatedListActiveCategories}
    case ADD_CATEGORY_FAILED:
      return { ...state, loading: false, error: action.payload}
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null}
    case UPDATE_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload.updatedCategories, activeCategories: action.payload.updatedListActiveCategories}
    case UPDATE_CATEGORY_FAILED:
      return { ...state, loading: false, error: action.payload}
    case RECOVER_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null}
    case RECOVER_CATEGORY_SUCCESS:
      return { ...state, loading: false, categories: action.payload.updatedCategories, activeCategories: action.payload.updatedListActiveCategories, inActiveCategories: action.payload.updatedListInActiveCategories}
    case RECOVER_CATEGORY_FAILED:
      return { ...state, loading: false, error: action.payload}
    default:
      return state;
  }
};

export default categoryReducer;