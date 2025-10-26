import { ROLE_ACTION } from "../../actions/Organizer/role-action";
import type { TeamRole } from "../../../models/team-models";

export interface RoleState {
    roles: TeamRole[];
    isLoading: boolean;
    error: string | null;
}

const initialState: RoleState = {
    roles: [],
    isLoading: false,
    error: null,
};

export const roleReducer = (state = initialState, action: any): RoleState => {
    switch (action.type) {
        case ROLE_ACTION.FETCH_ROLES_REQUEST:
            return {    
                ...state,
                isLoading: true,
                error: null,
            };
        case ROLE_ACTION.FETCH_ROLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: action.payload,
            };
        case ROLE_ACTION.FETCH_ROLES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ROLE_ACTION.CREATE_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ROLE_ACTION.CREATE_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: [...state.roles, action.payload],
            };
        case ROLE_ACTION.CREATE_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ROLE_ACTION.DELETE_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case ROLE_ACTION.DELETE_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: state.roles.filter(role => role.id !== action.payload),
            };
        case ROLE_ACTION.DELETE_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case ROLE_ACTION.RESET_ROLE_STATE:
            return initialState;
        default:
            return state;
    }
}