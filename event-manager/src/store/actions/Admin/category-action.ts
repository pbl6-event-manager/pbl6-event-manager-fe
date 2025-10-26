import { convertCategoryModelToListCategoryDto } from "../../../converters/category-converter";
import { addNewCategoryService, deleteCategoryService, getAllCategoriesService, recoverCateogoryService, updateCategoryService } from "../../../service/category-service";

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_ACTIVE_CATEGORIES_SUCCESS = "FETCH_ACTIVE_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_INACTIVE_CATEGORIES_SUCCESS = "FETCH_INACTIVE_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILED = "FETCH_CATEGORIES_FAILED";
export const ADD_CATEGORY_REQUEST = "ADD_CATEGORY_REQUEST";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAILED = "ADD_CATEGORY_FAILED";
export const DELETE_CATEGORY_REQUEST = "DELETE_CATEGORY_REQUEST";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCESSS";
export const DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED";
export const UPDATE_CATEGORY_REQUEST = "UPDATE_CATEGORY_REQUEST";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAILED = "UPDATE_CATEGORY_FAILED"; 
export const RECOVER_CATEGORY_REQUEST = "RECOVER_CATEGORY_REQUEST";
export const RECOVER_CATEGORY_SUCCESS = "RECOVER_CATEGORY_SUCCESS";
export const RECOVER_CATEGORY_FAILED = "RECOVER_CATEGORY_FAILED";
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
      const updatedCategories = categories.map((c: any) => c.id === id ? {...c, isActive: false} : c).sort((a: any, b: any) => a.id - b.id);;
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

export const addCategory = (category: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_CATEGORY_REQUEST
    });

    const data = await addNewCategoryService(category);
    const categories = store.getState().category.categories;
    const updatedCategories = [ ...categories, data ].sort((a: any, b: any) => a.id - b.id);
    const updatedListActiveCategories = updatedCategories.filter((c: any) => c.isActive === true).map(convertCategoryModelToListCategoryDto);

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: {
        updatedCategories,
        updatedListActiveCategories
      }
    });
  } catch (error: any) {
    dispatch({
      type: ADD_CATEGORY_FAILED,
      payload: error.response?.data?.message || error.message || "Failed to add new category",
    })
    throw error;
  }
};

export const updateCategory = (id: any, category: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_REQUEST
    })

    const data = await updateCategoryService(id, category);
    const categories = store.getState().category.categories;
    
    const updatedCategories = categories.map((c: any) =>
      c.id === id ? { ...c, ...data } : c
    );

    const updatedListActiveCategories = updatedCategories
      .filter((c: any) => c.isActive === true)
      .map(convertCategoryModelToListCategoryDto);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: {
        updatedCategories,
        updatedListActiveCategories
      }
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_CATEGORY_FAILED,
      payload: error.response?.data?.message || error.message || "Failed to update category",
    })
    throw error;
  }
}

export const recoverCategory = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: RECOVER_CATEGORY_REQUEST
    })

    const data = await recoverCateogoryService(id);
    if(data === id) {
      const categories = store.getState().category.categories;
      const updatedCategories = categories.map((c: any) => c.id === id ? {...c, isActive: true} : c).sort((a: any, b: any) => a.id - b.id);;
      const updatedListActiveCategories = updatedCategories.filter((c: any) => c.isActive === true).map(convertCategoryModelToListCategoryDto);
      const updatedListInActiveCategories = updatedCategories.filter((c: any) => c.isActive === false).map(convertCategoryModelToListCategoryDto);
      dispatch({
        type: RECOVER_CATEGORY_SUCCESS,
        payload: {
          updatedCategories,
          updatedListActiveCategories,
          updatedListInActiveCategories
        },
      })
    }

  } catch (error: any) {
    dispatch({
      type: RECOVER_CATEGORY_FAILED,
      payload: error.response?.data?.message || error.message || "Failed to recover category",
    })
    throw error;
  }
}
