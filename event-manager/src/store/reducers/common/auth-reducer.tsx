import { AUTH_ACTION } from "../../actions/common/auth-action";

interface AuthState {
    isAuthenticated: boolean,
    user: any | null,
    isLoading: boolean,
    error: string | null,
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case AUTH_ACTION.LOGIN_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case AUTH_ACTION.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                error: null,
            };
        case AUTH_ACTION.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case AUTH_ACTION.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
