import type { AuthStep } from "../store/actions/common/auth-flow-action";
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}


export interface AuthResponse {
    user: User;
    token: string;
    refreshToken: string;
    expiresIn: number; // in seconds
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthFlowState {
    currentStep: AuthStep,
    email: string,
    isExistingUser: boolean,
    userInfo: {
        firstName: string,
        lastName: string,
    },
    isLoading: boolean,
    error: string | null,
    stepHistory?: AuthStep[], // Optional: To track the history of steps
}

export const DEFAULT_AUTH_FLOW_STATE : AuthFlowState = {
    currentStep: "email",
    email: "",
    isExistingUser: false,
    userInfo: {
        firstName: "",
        lastName: "",
    },
    isLoading: false,
    error: null,
    stepHistory: ["email"],
}

