import { NAVIGATION_ACTION} from "../../actions/common/navigation-action";

interface NavigationState {
    currentPage: "overview" | "auth",
}

const initialState: NavigationState = {
    currentPage: "auth",
};

export const navigationReducer = (state = initialState, action: any): NavigationState => {
    switch (action.type) {
        case NAVIGATION_ACTION.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state;
    }
};

export default navigationReducer;