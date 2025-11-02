import { FETCH_OWNER_ROLE_STAFF_FAILED, FETCH_OWNER_ROLE_STAFF_REQUEST, FETCH_OWNER_ROLE_STAFF_SUCCESS, CREATE_OWNER_ROLE_STAFF_FAILED, CREATE_OWNER_ROLE_STAFF_REQUEST, CREATE_OWNER_ROLE_STAFF_SUCCESS, DELETE_OWNER_ROLE_STAFF_FAILED, DELETE_OWNER_ROLE_STAFF_REQUEST, DELETE_OWNER_ROLE_STAFF_SUCCESS } from "../actions/role-actions";
import { DEFAULT_ROLE_STATE, type RoleState } from "../../models/reducer-models/role-reducer-models";

export const roleReducer = (state = DEFAULT_ROLE_STATE, action: any): RoleState => {
    switch (action.type) {
        case FETCH_OWNER_ROLE_STAFF_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_OWNER_ROLE_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: action.payload,
            };
        case FETCH_OWNER_ROLE_STAFF_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case CREATE_OWNER_ROLE_STAFF_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case CREATE_OWNER_ROLE_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: [...state.roles, action.payload],
            };
        case CREATE_OWNER_ROLE_STAFF_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case DELETE_OWNER_ROLE_STAFF_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case DELETE_OWNER_ROLE_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roles: state.roles.filter(role => role.id !== action.payload),
            };
        case DELETE_OWNER_ROLE_STAFF_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}