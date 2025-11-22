import { LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN_SUCCESS, SIGNUP_SUCCESS } from "../actions/auth-action";
import { UPDATE_CURRENT_USER_SUCCESS } from "../actions/user-action";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case UPDATE_CURRENT_USER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      }
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case SIGNUP_SUCCESS:
      return initialState;
    case LOGOUT:
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      return initialState;
    default:
      return state;
  }
};