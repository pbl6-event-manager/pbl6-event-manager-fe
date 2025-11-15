import {
    FETCH_PERMISSIONS_REQUEST,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILED,
    ADD_PERMISSION_REQUEST,
    ADD_PERMISSION_SUCCESS,
    ADD_PERMISSION_FAILURE,
    UPDATE_PERMISSION_REQUEST,
    UPDATE_PERMISSION_SUCCESS,
    UPDATE_PERMISSION_FAILURE,
    DELETE_PERMISSION_REQUEST,
    DELETE_PERMISSION_SUCCESS,
    DELETE_PERMISSION_FAILURE
} from "../actions/permission-action";

import { DEFAULT_PERMISSION_STATE, type PermissionState } from "../../models/reducer-models/permission-reducer-models";

export const permissionReducer = (
    state = DEFAULT_PERMISSION_STATE,
    action: any
): PermissionState => {
    switch (action.type) {
        case FETCH_PERMISSIONS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_PERMISSIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                permissions: action.payload.permissionDtos || [],
                listPermissionItem: action.payload.permissionListItems,
                error: null
            };
        case FETCH_PERMISSIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload?.message || "Failed to fetch permissions",
            };
        case ADD_PERMISSION_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case ADD_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPermissionItem: action.payload,
                error: null
            };
        case ADD_PERMISSION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case UPDATE_PERMISSION_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case UPDATE_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPermissionItem: action.payload,
                error: null
            };
        case UPDATE_PERMISSION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case DELETE_PERMISSION_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case DELETE_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listPermissionItem: action.payload,
                error: null
            };
        case DELETE_PERMISSION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}