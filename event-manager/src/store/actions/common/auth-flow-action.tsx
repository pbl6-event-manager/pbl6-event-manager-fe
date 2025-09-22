export type AuthStep = "email" | "password" | "user-info" | "create-password";

export const AUTH_FLOW_ACTION = {
    SET_EMAIL: "auth-flow/setEmail",
    CHECK_EMAIL_EXISTS: "auth-flow/checkEmailExists",
    SET_USER_INFO: "auth-flow/setUserInfo",
    SET_CURRENT_STEP: "auth-flow/setCurrentStep",
    SET_LOADING: "auth-flow/setLoading",
    SET_ERROR: "auth-flow/setError",
    RESET_AUTH_FLOW: "auth-flow/resetAuthFlow",
    GO_BACK: "auth-flow/goBack",
} as const;

export interface SetEmailAction {
    type: typeof AUTH_FLOW_ACTION.SET_EMAIL,
    payload: string,
}

export interface CheckEmailExistsAction {
    type: typeof AUTH_FLOW_ACTION.CHECK_EMAIL_EXISTS
}

export interface SetUserInfoAction {
    type: typeof AUTH_FLOW_ACTION.SET_USER_INFO,
    payload: {
        firstName: string,
        lastName: string,
    },
}

export interface SetCurrentStepAction {
    type: typeof AUTH_FLOW_ACTION.SET_CURRENT_STEP,
    payload: AuthStep,
}

export interface SetLoadingAction {
    type: typeof AUTH_FLOW_ACTION.SET_LOADING,
    payload: boolean,
}

export interface SetErrorAction {
    type: typeof AUTH_FLOW_ACTION.SET_ERROR,
    payload: string | null,
}

export interface ResetAuthFlowAction {
    type: typeof AUTH_FLOW_ACTION.RESET_AUTH_FLOW,
}

export interface GoBackAction {
    type: typeof AUTH_FLOW_ACTION.GO_BACK,
}

export type AuthFlowAction = SetEmailAction | CheckEmailExistsAction | SetUserInfoAction | SetCurrentStepAction | SetLoadingAction | SetErrorAction | ResetAuthFlowAction | GoBackAction;

// Action creators
export const setEmail = (payload: string): SetEmailAction => ({
    type: AUTH_FLOW_ACTION.SET_EMAIL,
    payload,
});

export const checkEmailExists = (): CheckEmailExistsAction => ({
    type: AUTH_FLOW_ACTION.CHECK_EMAIL_EXISTS,
});

export const setUserInfo = (payload: { firstName: string, lastName: string }): SetUserInfoAction => ({
    type: AUTH_FLOW_ACTION.SET_USER_INFO,
    payload,
});

export const setCurrentStep = (payload: AuthStep): SetCurrentStepAction => ({
    type: AUTH_FLOW_ACTION.SET_CURRENT_STEP,
    payload,
});

export const setLoading = (payload: boolean): SetLoadingAction => ({
    type: AUTH_FLOW_ACTION.SET_LOADING,
    payload,
});

export const setError = (payload: string | null) : SetErrorAction => ({
    type: AUTH_FLOW_ACTION.SET_ERROR,
    payload,
});

export const resetAuthFlow = (): ResetAuthFlowAction => ({
    type: AUTH_FLOW_ACTION.RESET_AUTH_FLOW,
});

export const goBack = (): GoBackAction => ({
    type: AUTH_FLOW_ACTION.GO_BACK,
});