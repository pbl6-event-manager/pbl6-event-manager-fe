import type { SignUpDto } from "../dtos/auth-dto";
import apiClient from "./api-config";


export const loginApi = (email: string, password: string) =>
  apiClient.post("/auth/login", { email, password });

export const refreshTokenApi = (refreshToken: string) =>
  apiClient.post("/auth/refresh-token", { refreshToken });

export const checkEmailExist = (email : string) => 
  apiClient.post("/auth/check-email", { email });

export const signupApi = (body: SignUpDto) =>
  apiClient.post("/auth/signup", body);