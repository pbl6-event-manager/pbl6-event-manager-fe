export const FETCH_PERMISSIONS_REQUEST = "FETCH_PERMISSIONS_REQUEST";
export const FETCH_PERMISSIONS_SUCCESS = "FETCH_PERMISSIONS_SUCCESS";
export const FETCH_PERMISSIONS_FAILED = "FETCH_PERMISSIONS_FAILED";

import { getAllPermissionsService } from "../../service/permission-service";

export const fetchPermissions = () => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_PERMISSIONS_REQUEST
        });
        const { permissionDtos, permissionListItems } = await getAllPermissionsService();
        dispatch({
            type: FETCH_PERMISSIONS_SUCCESS,
            payload: permissionDtos 
        });
    } catch (error) {
        dispatch({
            type: FETCH_PERMISSIONS_FAILED,
            payload: error
        });
    }
}