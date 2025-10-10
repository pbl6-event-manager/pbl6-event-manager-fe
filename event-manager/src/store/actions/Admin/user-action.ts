export const FETCH_USERS = "FETCH_USERS";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";

import { fetchUsersService } from "../../../service/user-service";
 

export const getUsers = () => async (dispatch: any) => {
  try {
    const res = await fetchUsersService();
    dispatch({type: FETCH_USERS, payload: res})
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

export const setSelectedUser = (payload: { email?: string }) => ({
  type: SET_SELECTED_USER,
  payload,
});

export const clearSelectedUser = () => ({
  type: CLEAR_SELECTED_USER,
});
