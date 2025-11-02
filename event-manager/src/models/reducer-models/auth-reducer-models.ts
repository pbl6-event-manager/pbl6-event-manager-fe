//#region Auth Reducer Models
export type AuthStep = "email" | "password" | "user-info" | "create-password";

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
    stepHistory?: AuthStep[],
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
//#endregion