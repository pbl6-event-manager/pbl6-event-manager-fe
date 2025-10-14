export const FETCH_USERS = "FETCH_USERS";
export const SET_SELECTED_USER = "SET_SELECTED_USER";
export const CLEAR_SELECTED_USER = "CLEAR_SELECTED_USER";
export const DELETE_USER = "DELETE_USER";

import { fetchUsersService, updateStatusUserService } from "../../../service/user-service";
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
