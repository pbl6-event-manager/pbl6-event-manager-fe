export const FETCH_PERMISSIONS_REQUEST = "FETCH_PERMISSIONS_REQUEST";
export const FETCH_PERMISSIONS_SUCCESS = "FETCH_PERMISSIONS_SUCCESS";
export const FETCH_PERMISSIONS_FAILED = "FETCH_PERMISSIONS_FAILED";
export const ADD_PERMISSION_REQUEST = "ADD_PERMISSION_REQUEST";
export const ADD_PERMISSION_SUCCESS = "ADD_PERMISSION_SUCCESS";
export const ADD_PERMISSION_FAILURE = "ADD_PERMISSION_FAILURE";
export const UPDATE_PERMISSION_REQUEST = "UPDATE_CATEGORY_REQUEST";
export const UPDATE_PERMISSION_SUCCESS = "UPDATE_PERMISSION_SUCCESS";
export const UPDATE_PERMISSION_FAILURE = "UPDATE_PERMISSION_FAILURE";
export const DELETE_PERMISSION_REQUEST = "DELETE_PERMISSION_REQUEST";
export const DELETE_PERMISSION_SUCCESS = "DELETE_PERMISSION_SUCCESS";
export const DELETE_PERMISSION_FAILURE = "DELETE_PERMISSION_FAILURE";

import { addNewPermissionService, deletePermissionService, getAllPermissionsService, updatePermissionService } from "../../service/permission-service";
import { store } from "../store";

export const fetchPermissions = () => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_PERMISSIONS_REQUEST
        });
        const { permissionDtos, permissionListItems } = await getAllPermissionsService();
        dispatch({
            type: FETCH_PERMISSIONS_SUCCESS,
            payload: {
                permissionDtos,
                permissionListItems
            }
        });
    } catch (error) {
        dispatch({
            type: FETCH_PERMISSIONS_FAILED,
            payload: error
        });
    }
}

export const addPermission = (permission: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: ADD_PERMISSION_REQUEST
        })

        const data = await addNewPermissionService(permission);
        const permissionList = store.getState().permissionReducer.listPermissionItem;
        const updatedPermissions = [ ...permissionList, data ].sort((a: any, b: any) => a.id - b.id);

        dispatch({
            type: ADD_PERMISSION_SUCCESS,
            payload: updatedPermissions
        })
    } catch (error: any) {
        dispatch({
            type: ADD_PERMISSION_FAILURE,
            payload: error.response?.data?.message || error.message || "Failed to add new permission",
        })
        throw error;
    }
}

export const updatePermission = (id: number, permission: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: UPDATE_PERMISSION_REQUEST
    })

    const data = await updatePermissionService(id, permission);
    const permissionListItems = store.getState().permissionReducer.listPermissionItem;
    
    const updatedPermissionListItems = permissionListItems.map((c: any) =>
      c.id === id ? { ...c, ...data } : c
    );

    dispatch({
      type: UPDATE_PERMISSION_SUCCESS,
      payload: updatedPermissionListItems
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_PERMISSION_FAILURE,
      payload: error.response?.data?.message || error.message || "Failed to update permission",
    })
    throw error;
  }
}

export const deletePermission = (id: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELETE_PERMISSION_FAILURE
    })

    const response = await deletePermissionService(id);
    const permissionListItems = store.getState().permissionReducer.listPermissionItem;
    const updatedPermissionList = Array.isArray(permissionListItems)
      ? permissionListItems.filter((p: any) => Number(p?.id) !== Number(response))
      : [];
      
    dispatch({
      type: DELETE_PERMISSION_SUCCESS,
      payload: updatedPermissionList
    })
  } catch (error: any) {
    dispatch({
      type: DELETE_PERMISSION_FAILURE,
      payload: error.response?.data?.message || error.message || "Failed to delete permission",
    })
    throw error;
  }
}