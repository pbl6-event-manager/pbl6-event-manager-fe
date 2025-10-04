import apiClient from "./api-config";


export const loginApi = (email: string, password: string) =>
  apiClient.post("/auth/login", { email, password });

export const refreshTokenApi = (refreshToken: string) =>
  apiClient.post("/auth/refresh-token", { refreshToken });
