export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCSESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";
export const UPDATE_STATUS_USER_REQUEST = "UPDATE_STATUS_USER_REQUEST";
export const UPDATE_STATUS_USER_FAILED = "UPDATE_STATUS_USER_FAILED";
export const UPDATE_STATUS_USER_SUCCESS = "UPDATE_STATUS_USER_SUCCESS";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAIL = "ADD_USER_FAIL";
export const GET_ACTIVE_ORGS_OF_AN_USER_REQUEST = "GET_ACTIVE_ORGS_OF_AN_USER_REQUEST";
export const GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS = "GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS";
export const GET_ACTIVE_ORGS_OF_AN_USER_FAILURE = "GET_ACTIVE_ORGS_OF_AN_USER_FAILURE";
export const GET_INACTIVE_ORGS_OF_AN_USER_REQUEST = "GET_INACTIVE_ORGS_OF_AN_USER_REQUEST";
export const GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS = "GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS";
export const GET_INACTIVE_ORGS_OF_AN_USER_FAILURE = "GET_INACTIVE_ORGS_OF_AN_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const GET_USER_BY_EMAIL_REQUEST = "GET_USER_BY_EMAIL_REQUEST";
export const GET_USER_BY_EMAIL_SUCCESS = "GET_USER_BY_EMAIL_SUCCESS";
export const GET_USER_BY_EMAIL_FAILED = "GET_USER_BY_EMAIL_FAILED";


import { addUserService, getInActiveOrgOfAnUserService, getActiveOrgOfAnUserService, fetchUsersService, getUserByEmailService, updateStatusUserService, updateUserService } from "../../service/user-service";
import { store } from "../store";
 

export const getUsers = () => async (dispatch: any) => {
  try {
    dispatch({
      type: FETCH_USERS_REQUEST
    })

    const data = await fetchUsersService();
    
    dispatch({
      type: FETCH_USERS_SUCSESS, 
      payload: data
    });
  } catch (error: any) {
    dispatch({
      type: FETCH_USERS_FAILED,
      payload:
        error.response?.data?.message || error.message || "Fetch users failed",
    });
    throw error;
  }
};

export const updateStatusUser = (email: string, isActive: boolean) => async (dispatch: any) => {
  try {
    dispatch({
      type: UPDATE_STATUS_USER_REQUEST
    })

    const updatedUser = await updateStatusUserService(email, isActive);
    const users  = store.getState().userReducer.users;
    
    const updatedList = users.map((user: any) =>
      user.email === email ? { ...user, isActive: updatedUser?.isActive } : user
    );

    dispatch({
      type: UPDATE_STATUS_USER_SUCCESS, 
      payload: {
        updatedList,
        updatedUser
      }
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_STATUS_USER_FAILED,
      payload:
        error.response?.data?.message || error.message || "Update status user failed",
    });
    throw error;
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
    const users = store.getState().userReducer.users;
    const updatedUsers = [ ...users, data].sort((a: any, b: any) => a.id - b.id);

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: updatedUsers
    });
  } catch (error: any) {
    dispatch({
      type: ADD_USER_FAIL,
      payload:
        error.response?.data?.message || error.message || "Add user failed",
    });
    throw error;
  }
};

export const updateUser = (userData: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST
    });

    const data = await updateUserService(userData);
    const users = store.getState().userReducer.users;
    const updatedUsers = users.map((u: any) => u.email === data?.email ? { ...u, ...data} : u)

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: updatedUsers
    });
  } catch (error: any) {
    dispatch({
      type: UPDATE_USER_FAILED,
      payload:
        error.response?.data?.message || error.message || "Update user failed",
    });
    throw error;
  }
}

export const getActiveOrgOfAnUser = (id: any) => async (dispatch: any) => {
  try {
    dispatch({type:GET_ACTIVE_ORGS_OF_AN_USER_FAILURE});

    const data = await getActiveOrgOfAnUserService(id);

    dispatch({
      type: GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS,
      payload: data
    })
  } catch (error: any) {
    dispatch({
        type: GET_ACTIVE_ORGS_OF_AN_USER_FAILURE,
        payload:
        error.response?.data?.message || error.message || "Failed to get organizers of an user",
    });
    throw error;
  }
}

export const getInActiveOrgOfAnUser = (id: any) => async (dispatch: any) => {
  try {
    dispatch({type:GET_INACTIVE_ORGS_OF_AN_USER_REQUEST});

    const data = await getInActiveOrgOfAnUserService(id);

    dispatch({
      type: GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS,
      payload: data
    })
  } catch (error: any) {
    dispatch({
        type: GET_INACTIVE_ORGS_OF_AN_USER_FAILURE,
        payload:
        error.response?.data?.message || error.message || "Failed to get organizers of an user",
    });
    throw error;
  }
}

export const getUserByEmail = (email: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_USER_BY_EMAIL_REQUEST
    })

    const data = await getUserByEmailService(email);
    if(data === null) {
      dispatch({
        type: GET_USER_BY_EMAIL_FAILED,
        payload: "Failed to get information of an user",
      })
      return;
    }

    dispatch({
      type: GET_USER_BY_EMAIL_SUCCESS,
      payload: data
    })

    return data;
  } catch (error: any) {
    dispatch({
      type: GET_USER_BY_EMAIL_FAILED,
      payload:
        error.response?.data?.message || error.message || "Failed to get information of an user",
    })
    throw error;
  }
}