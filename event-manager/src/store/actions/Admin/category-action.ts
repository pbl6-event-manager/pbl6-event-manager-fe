import { convertCategoryModelToListCategoryDto } from "../../../converters/category-converter";
import { deleteCategoryService, getAllCategoriesService } from "../../../service/category-service";

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_ACTIVE_CATEGORIES_SUCCESS = "FETCH_ACTIVE_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_INACTIVE_CATEGORIES_SUCCESS = "FETCH_INACTIVE_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILED = "FETCH_CATEGORIES_FAILED";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCESSS";
export const DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED";
import { store } from "../../store";
 

export const getCategories = () => async(dispatch: any) => {
  dispatch({type: FETCH_CATEGORIES_REQUEST})
  try {
    const data = await getAllCategoriesService();
    dispatch({
      type: FETCH_ACTIVE_CATEGORIES_SUCCESS,
      payload: data.listActiveCategoryDto
    })
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: data.categories,
    })
    dispatch({
      type: FETCH_INACTIVE_CATEGORIES_SUCCESS,
      payload: data.listInActiveCategoryDto
    })
  } catch (error: any) {
    dispatch({
      type: FETCH_CATEGORIES_FAILED,
      payload: error.response?.data?.message || error.message || "Failed to get categories",
    });
    throw error;
  }
};

export const deleleCategory = (id: any) => async(dispatch: any) => {
  dispatch({type: DELETE_CATEGORY_REQUEST})
  try {
    const data = await deleteCategoryService(id);
    if(data === id) {
      const categories = store.getState().category.categories;
      const updatedCategories = categories.map((c: any) => c.id === id ? {...c, isActive: false} : c);
      const updatedListActiveCategories = updatedCategories.filter((c: any) => c.isActive === true).map(convertCategoryModelToListCategoryDto);
      const updatedListInActiveCategories = updatedCategories.filter((c: any) => c.isActive === false).map(convertCategoryModelToListCategoryDto);
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: {
          updatedCategories,
          updatedListActiveCategories,
          updatedListInActiveCategories
        },
      })
    }
  } catch (error: any) {
    dispatch({
      type: DELETE_CATEGORY_FAILED,
      payload: error.response?.data?.message || error.message || "Failed to delete category",
    });
    throw error;
  }
}

export const addCategory = (category: any) => {
  return {
    type: ADD_CATEGORY,
    payload: category,
  };
};
