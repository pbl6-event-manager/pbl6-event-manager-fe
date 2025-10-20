export const FETCH_USERS = "FETCH_USERS";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAIL = "ADD_USER_FAIL";
export const GET_ORGS_OF_AN_USER_REQUEST = "GET_ORGS_OF_AN_USER"
export const GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS = "GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS"
export const GET_ORGS_OF_AN_USER_SUCCESS = "GET_ORGS_OF_AN_USER_SUCCESS"
export const GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS = "GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS"
export const GET_ORGS_OF_AN_USER_FAILED = "GET_ORGS_OF_AN_USER_FAILED"


import { addUserService, fetchUsersService, updateStatusUserService } from "../../../service/user-service";
import { fetchActiveOrgOfAnUserService } from "../../../service/user-service";
import { store } from "../../store";
 

export const getUsers = () => async (dispatch: any) => {
  try {
    const res = await fetchUsersService();
    dispatch({type: FETCH_USERS, payload: res})
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

export const updateStatusUser = (email: string, isActive: boolean) => async (dispatch: any) => {
  try {
    const deletedUser = await updateStatusUserService(email, isActive);
    const users  = store.getState().userReducer.users;

    const updatedList = users.map((user: any) =>
      user.email === email ? { ...user, isActive: deletedUser.isActive } : user
    );
    dispatch({type: DELETE_USER, payload: updatedList});
  } catch (error) {
    console.log("Failed to delete users: ", error)
  }
}

export const setSelectedUser = (payload: { email?: string }) => ({
  type: SET_SELECTED_USER,
  payload,
});

export const clearSelectedUser = () => ({
  type: CLEAR_SELECTED_USER,
});


export const addUser = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_USER_REQUEST });

    const data = await addUserService(userData);

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: data.data,
    });
    return data;
  } catch (error: any) {
    dispatch({
      type: ADD_USER_FAIL,
      payload:
        error.response?.data?.message || error.message || "Add user failed",
    });
    throw error;
  }
};

export const getOrgOfAnUser = (id: any) => async (dispatch: any) => {
    try {
        dispatch({type:GET_ORGS_OF_AN_USER_REQUEST});

        const data = await fetchActiveOrgOfAnUserService(id);
        
        dispatch({
          type: GET_ORGS_OF_AN_USER_SUCCESS,
          payload: data.organizers
        })

        dispatch({
          type: GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS,
          payload: data.activeOrgsListDto
        })

        dispatch({
          type: GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS,
          payload: data.inActiveOrgsListDto
        })
    } catch (error: any) {
        dispatch({
            type: GET_ORGS_OF_AN_USER_FAILED,
            payload:
            error.response?.data?.message || error.message || "Failed to get organizers of an user",
        });
        throw error;
    }
}