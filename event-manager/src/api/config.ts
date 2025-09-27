// API configuration
//Use "import.meta" to access environment variables in Vite
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api"

export const API_ENDPOINTS = {
  CHECK_EMAIL: "/auth/check-email",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh",
  LOGOUT: "/auth/logout",
} as const

// HTTP client configuration
export const apiClient = {
  get: async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem("accessToken")
    return fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
      ...options,
    })
  },

  post: async (url: string, data?: any, options?: RequestInit) => {
    const token = localStorage.getItem("accessToken")
    return fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  },
}
