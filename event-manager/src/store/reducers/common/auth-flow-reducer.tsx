//Mockdata for authentication flow
const MOCK_USERS = [
    { email: "john@example.com", password: "123456", firstName: "John", lastName: "Doe" },
    { email: "jane@example.com", password: "password", firstName: "Jane", lastName: "Smith" },
    { email: "test@eventbrite.com", password: "test123", firstName: "Test", lastName: "User" },
    { email: "user@gmail.com", password: "user123", firstName: "Demo", lastName: "User" },
]

const MOCK_EXISTING_EMAILS = MOCK_USERS.map(user => user.email.toLowerCase());

import { AUTH_FLOW_ACTION, type AuthStep } from "../../actions/common/auth-flow-action";

interface AuthFlowState {
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

const initialState: AuthFlowState = {
    currentStep: "email",
    email: "",
    isExistingUser: false,
    userInfo: {
        firstName: "",
        lastName: "",
    },
    isLoading: false,
    error: null,
    stepHistory: ["email"], // Initialize with the first step
};

export const authFlowReducer = (state = initialState, action: any):
    AuthFlowState => {
    switch (action.type) {
        case AUTH_FLOW_ACTION.SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case AUTH_FLOW_ACTION.CHECK_EMAIL_EXISTS:
            const isExistingUser = MOCK_EXISTING_EMAILS.includes(state.email.toLowerCase());
            const nextStep = isExistingUser ? "password" : "user-info";
            return {
                ...state,
                isExistingUser,
                currentStep: nextStep,
                stepHistory: [...state.stepHistory || [], nextStep], // Append the new step to history
            };
        case AUTH_FLOW_ACTION.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
                currentStep: "create-password",
                stepHistory: [...state.stepHistory || [], "create-password"], // Append the new step to history
            }
        case AUTH_FLOW_ACTION.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload,
                stepHistory: state.stepHistory?.includes(action.payload)
                    ? state.stepHistory
                    : [...(state.stepHistory, action.payload)], // Append only if not already in history
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
            return initialState;
        default:
            return state;
    }
};

export { MOCK_USERS }
export default authFlowReducer;