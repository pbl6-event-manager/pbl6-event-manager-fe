import { checkEmailService } from "../../../service/auth-service";

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

// Action creators
export const setEmail = (payload: string) => ({
    type: AUTH_FLOW_ACTION.SET_EMAIL,
    payload,
});

export const checkEmailExists = (email: string) => async (dispatch: any) => {
    try {
        const res = await checkEmailService(email);
        dispatch({
            type: AUTH_FLOW_ACTION.CHECK_EMAIL_EXISTS,
            payload: res.data,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const setUserInfo = (payload: { firstName: string, lastName: string }) => ({
    type: AUTH_FLOW_ACTION.SET_USER_INFO,
    payload,
});

export const setCurrentStep = (payload: AuthStep) => ({
    type: AUTH_FLOW_ACTION.SET_CURRENT_STEP,
    payload,
});

export const setLoading = (payload: boolean) => ({
    type: AUTH_FLOW_ACTION.SET_LOADING,
    payload,
});

export const setError = (payload: string | null) => ({
    type: AUTH_FLOW_ACTION.SET_ERROR,
    payload,
});

export const resetAuthFlow = () => ({
    type: AUTH_FLOW_ACTION.RESET_AUTH_FLOW,
});

export const goBack = () => ({
    type: AUTH_FLOW_ACTION.GO_BACK,
});