import { loginApi, refreshTokenApi, checkEmailExist, signupApi } from "../api/auth-api";
import type { SignUpDto } from "../dtos/auth-dto";

export const loginService = async (email: string, password: string) => {
  try {
    const { data } = await loginApi(email, password);
    return data; // { accessToken, refreshToken, userInfo }
  } catch (error) {
    throw error;
  }
};

export const refreshTokenService = async (refreshToken: string) => {
  const { data } = await refreshTokenApi(refreshToken);
  return data; // { accessToken, refreshToken }
};

export const checkEmailService = async (email: string) => {
  const { data } = await checkEmailExist(email);
  return data; // data: true || false
}

export const signupService = async (body: SignUpDto) => {
  const  data  = await signupApi(body);
  return data;
}
