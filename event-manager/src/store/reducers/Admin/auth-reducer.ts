import { LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN_SUCCESS } from "../../actions/Admin/auth-action";

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

export const _authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};