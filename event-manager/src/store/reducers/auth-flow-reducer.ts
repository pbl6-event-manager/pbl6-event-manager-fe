import { AUTH_FLOW_ACTION } from "../actions/auth-flow-action";
import type { AuthFlowState } from "../../models/reducer-models/auth-reducer-models"; 
import { DEFAULT_AUTH_FLOW_STATE } from "../../models/reducer-models/auth-reducer-models"; 

export const authFlowReducer = (state = DEFAULT_AUTH_FLOW_STATE, action: any) : AuthFlowState => {
    switch (action.type) {
        case AUTH_FLOW_ACTION.SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case AUTH_FLOW_ACTION.CHECK_EMAIL_EXISTS:
            const isExistingUser = action.payload
            const nextStep = isExistingUser ? "password" : "user-info";
            return {
                ...state,
                isExistingUser,
                currentStep: nextStep,
                stepHistory: [...state.stepHistory || [], nextStep],
            };
        case AUTH_FLOW_ACTION.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
                currentStep: "create-password",
                stepHistory: [...state.stepHistory || [], "create-password"],
            }
        case AUTH_FLOW_ACTION.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload,
                stepHistory: state.stepHistory?.includes(action.payload)
                    ? state.stepHistory
                    : [...(state.stepHistory, action.payload)], 
            };
        case AUTH_FLOW_ACTION.GO_BACK:
            const currentIndex = state.stepHistory?.indexOf(state.currentStep) ?? -1;

            const previousStep =
                currentIndex > 0 ? state.stepHistory![currentIndex - 1] : state.currentStep;

            return {
                ...state,
                currentStep: previousStep || state.currentStep,
                stepHistory: state.stepHistory?.slice(0, currentIndex),
            };
        case AUTH_FLOW_ACTION.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case AUTH_FLOW_ACTION.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case AUTH_FLOW_ACTION.RESET_AUTH_FLOW:
            return DEFAULT_AUTH_FLOW_STATE;
        default:
            return state;
    }
};

export default authFlowReducer;