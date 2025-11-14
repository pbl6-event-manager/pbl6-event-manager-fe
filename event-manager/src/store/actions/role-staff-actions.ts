export const FETCH_OWNER_ROLE_STAFF_REQUEST = "FETCH_OWNER_ROLE_STAFF_REQUEST";
export const FETCH_OWNER_ROLE_STAFF_SUCCESS = "FETCH_OWNER_ROLE_STAFF_SUCCESS";
export const FETCH_OWNER_ROLE_STAFF_FAILED = "FETCH_OWNER_ROLE_STAFF_FAILED";
export const CREATE_OWNER_ROLE_STAFF_REQUEST = "CREATE_OWNER_ROLE_STAFF_REQUEST";
export const CREATE_OWNER_ROLE_STAFF_SUCCESS = "CREATE_OWNER_ROLE_STAFF_SUCESS";
export const CREATE_OWNER_ROLE_STAFF_FAILED = "CREATE_OWNER_ROLE_STAFF_FAILED";
export const DELETE_OWNER_ROLE_STAFF_REQUEST = "DELETE_OWNER_ROLE_STAFF_REQUEST";
export const DELETE_OWNER_ROLE_STAFF_SUCCESS = "DELETE_OWNER_ROLE_STAFF_SUCCESS";
export const DELETE_OWNER_ROLE_STAFF_FAILED = "DELETE_OWNER_ROLE_STAFF_FAILED";
export const UPDATE_OWNER_ROLE_STAFF_REQUEST = "UPDATE_OWNER_ROLE_STAFF_REQUEST";
export const UPDATE_OWNER_ROLE_STAFF_SUCCESS = "UPDATE_OWNER_ROLE_STAFF_SUCCESS";
export const UPDATE_OWNER_ROLE_STAFF_FAILED = "UPDATE_OWNER_ROLE_STAFF_FAILED";

import { fetchOwnerRoleStaffsService, createRoleStaffService, deleteRoleStaffService, updateRoleStaffService } from "../../service/role-staff-service";

export const fetchOwnerRoleStaffs = () => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_OWNER_ROLE_STAFF_REQUEST
        })

        const { roleStaffListItems, roleStaffDtos } = await fetchOwnerRoleStaffsService();

        dispatch({
            type: FETCH_OWNER_ROLE_STAFF_SUCCESS,
            payload: roleStaffDtos
        })
        return roleStaffListItems;
    } catch (error: any) {
        dispatch({
            type: FETCH_OWNER_ROLE_STAFF_FAILED,
            payload:
                error.response?.data?.message || error.message || "Fetch all role staff of an owner failed",
        });
        throw error;
    }
}


export const createOwnerRoleStaff = (roleForm: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: CREATE_OWNER_ROLE_STAFF_REQUEST
        })

        const data = await createRoleStaffService(roleForm);

        dispatch({
            type: CREATE_OWNER_ROLE_STAFF_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: CREATE_OWNER_ROLE_STAFF_FAILED,
            payload:
                error.response?.data?.message || error.message || "Create role staff failed",
        });
        throw error;
    }
}


export const updateOwnerRoleStaff = (roleStaffId: number, roleForm: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: UPDATE_OWNER_ROLE_STAFF_REQUEST
        })

        const data = await updateRoleStaffService(roleStaffId, roleForm);

        dispatch({
            type: UPDATE_OWNER_ROLE_STAFF_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: UPDATE_OWNER_ROLE_STAFF_FAILED,
            payload:
                error.response?.data?.message || error.message || "Update role staff failed",
        });
        throw error;
    }
}

export const deleteOwnerRoleStaff = (roleStaffId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: DELETE_OWNER_ROLE_STAFF_REQUEST
        })

        const data = await deleteRoleStaffService(roleStaffId);

        dispatch({
            type: DELETE_OWNER_ROLE_STAFF_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: DELETE_OWNER_ROLE_STAFF_FAILED,
            payload:
                error.response?.data?.message || error.message || "Delete role staff failed",
        });
        throw error;
    }
}


