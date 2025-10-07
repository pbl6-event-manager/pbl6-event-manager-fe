import { loginApi, refreshTokenApi, checkEmailExist } from "../api/auth-api";

export const loginService = async (email: string, password: string) => {
  const { data } = await loginApi(email, password);
  return data; // { accessToken, refreshToken, userInfo }
};

export const refreshTokenService = async (refreshToken: string) => {
  const { data } = await refreshTokenApi(refreshToken);
  return data; // { accessToken, refreshToken }
};

export const checkEmailService = async (email: string) => {
  const { data } = await checkEmailExist(email);
  return data; // data: true || false
}
