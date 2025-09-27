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
    currentStep: "email" | "password" | "user-info" | "create-password";
    email: string;
    isExistingUser: boolean;
    userInfo: {
        firstName: string;
        lastName: string;
    };
    stepHistory: string[]; // To manage back navigation
    isLoading: boolean;
    error: string | null;
}