export const FETCH_OWNER_ROLE_STAFF_REQUEST = "FETCH_OWNER_ROLE_STAFF_REQUEST";
export const FETCH_OWNER_ROLE_STAFF_SUCCESS = "FETCH_OWNER_ROLE_STAFF_SUCCESS";
export const FETCH_OWNER_ROLE_STAFF_FAILED = "FETCH_OWNER_ROLE_STAFF_FAILED";
export const CREATE_OWNER_ROLE_STAFF_REQUEST = "CREATE_OWNER_ROLE_STAFF_REQUEST";
export const CREATE_OWNER_ROLE_STAFF_SUCCESS = "CREATE_OWNER_ROLE_STAFF_SUCESS";
export const CREATE_OWNER_ROLE_STAFF_FAILED = "CREATE_OWNER_ROLE_STAFF_FAILED";
export const DELETE_OWNER_ROLE_STAFF_REQUEST = "CREATE_OWNER_ROLE_STAFF_REQUEST";
export const DELETE_OWNER_ROLE_STAFF_SUCCESS = "CREATE_OWNER_ROLE_STAFF_SUCCESS";
export const DELETE_OWNER_ROLE_STAFF_FAILED = "CREATE_OWNER_ROLE_STAFF_FAILED";

export const fetchOwnerRoleStaffs = (ownerId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_OWNER_ROLE_STAFF_REQUEST
        })

        const data = "CALL SERVICE HERE";

        dispatch({
            type: FETCH_OWNER_ROLE_STAFF_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: FETCH_OWNER_ROLE_STAFF_FAILED,
            payload:
                error.response?.data?.message || error.message || "Fetch all role staff of an owner failed",
        });
        throw error;
    }
}

export const deleteOwnerRoleStaff = (roleStaffId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: DELETE_OWNER_ROLE_STAFF_REQUEST
        })

        const data = "CALL SERVICE HERE";

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

export const createOwnerRoleStaff = (roleForm: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: CREATE_OWNER_ROLE_STAFF_REQUEST
        })

        const data = "CALL SERVICE HERE";

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



