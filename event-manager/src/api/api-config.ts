import axios from "axios";
import { store } from "../store/store";
import { refreshAccessToken, logout } from "../store/actions/auth-action";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // URL backend
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const { auth } = store.getState();
    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { auth } = store.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (auth.refreshToken) {
        try {
          const newAccessToken = await store.dispatch(
            refreshAccessToken(auth.refreshToken)
          );
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        } catch (err) {
          store.dispatch(logout());
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
