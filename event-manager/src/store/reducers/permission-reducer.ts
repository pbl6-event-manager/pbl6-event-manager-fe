import {
    FETCH_PERMISSIONS_REQUEST,
    FETCH_PERMISSIONS_SUCCESS,
    FETCH_PERMISSIONS_FAILED
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
                permissions: action.payload || [],
                error: null
            };
        case FETCH_PERMISSIONS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload?.message || "Failed to fetch permissions",
            };

        default:
            return state;
    }
}