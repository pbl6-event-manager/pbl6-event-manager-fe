export const AUTH_ACTION = {
    LOGIN_START: "auth/loginStart",
    LOGIN_SUCCESS: "auth/loginSuccess",
    LOGIN_FAILURE: "auth/loginFailure",
    LOGOUT: "auth/logout",
} as const;

export interface LoginStartAction{
    type: typeof AUTH_ACTION.LOGIN_START,
}

export interface LoginSuccessAction{
    type: typeof AUTH_ACTION.LOGIN_SUCCESS,
    payload: {
        email: any,
        user: any,
    },
}

export interface LoginFailureAction{
    type: typeof AUTH_ACTION.LOGIN_FAILURE,
    payload: string,
}

export interface LogoutAction{
    type: typeof AUTH_ACTION.LOGOUT
}

export type AuthAction = LoginStartAction | LoginSuccessAction | LoginFailureAction | LogoutAction;

export const loginStart = (): LoginStartAction => ({
    type: AUTH_ACTION.LOGIN_START,
});

export const loginSuccess = (payload: {email: any, user: any}): LoginSuccessAction => ({
    type: AUTH_ACTION.LOGIN_SUCCESS,
    payload,
});

export const loginFailure = (payload: string): LoginFailureAction => ({
    type: AUTH_ACTION.LOGIN_FAILURE,
    payload,
});

export const logout = (): LogoutAction => ({
    type: AUTH_ACTION.LOGOUT,
});