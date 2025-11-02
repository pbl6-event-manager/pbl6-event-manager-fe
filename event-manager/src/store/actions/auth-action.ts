import type { SignUpDto } from "../../dtos/auth-dto"; 
import { loginService, refreshTokenService, signupService } from "../../service/auth-service";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    const { data } = await loginService(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const signup = (signupDto : SignUpDto) => async (dispatch: any) => {
  try {
    const { data } = await signupService(signupDto);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
    return data;  
  } catch (error) {
    console.log("Sign up failed", error);
  }
}

export const refreshAccessToken = (refreshToken: string) => async (dispatch: any) => {
  try {
    const data = await refreshTokenService(refreshToken);
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: data,
    });
    return data.accessToken;
  } catch (error) {
    dispatch({ type: LOGOUT });
    return null;
  }
};

export const logout = () => ({type: LOGOUT});
