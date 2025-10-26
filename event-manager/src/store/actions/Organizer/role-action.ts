import type { TeamRole } from "../../../models/team-models";

export const ROLE_ACTION = {
    //Fetch Roles
    FETCH_ROLES_REQUEST: "FETCH_ROLES_REQUEST",
    FETCH_ROLES_SUCCESS: "FETCH_ROLES_SUCCESS",
    FETCH_ROLES_FAILURE: "FETCH_ROLES_FAILURE",

    //Create Role
    CREATE_ROLE_REQUEST: "CREATE_ROLE_REQUEST",
    CREATE_ROLE_SUCCESS: "CREATE_ROLE_SUCCESS",
    CREATE_ROLE_FAILURE: "CREATE_ROLE_FAILURE",

    //Delete Role
    DELETE_ROLE_REQUEST: "DELETE_ROLE_REQUEST",
    DELETE_ROLE_SUCCESS: "DELETE_ROLE_SUCCESS",
    DELETE_ROLE_FAILURE: "DELETE_ROLE_FAILURE",

    //Reset Role State
    RESET_ROLE_STATE: "RESET_ROLE_STATE",
} as const;

// Action Creators
export const fetchRolesRequest = () => ({
    type: ROLE_ACTION.FETCH_ROLES_REQUEST,
});
export const fetchRolesSuccess = (payload: TeamRole[]) => ({
    type: ROLE_ACTION.FETCH_ROLES_SUCCESS,
    payload,
});
export const fetchRolesFailure = (payload: string) => ({
    type: ROLE_ACTION.FETCH_ROLES_FAILURE,
    payload,
});

export const createRoleRequest = () => ({
    type: ROLE_ACTION.CREATE_ROLE_REQUEST,
});
export const createRoleSuccess = (payload: TeamRole) => ({
    type: ROLE_ACTION.CREATE_ROLE_SUCCESS,
    payload,
});
export const createRoleFailure = (payload: string) => ({
    type: ROLE_ACTION.CREATE_ROLE_FAILURE,
    payload,
});

export const deleteRoleRequest = () => ({
    type: ROLE_ACTION.DELETE_ROLE_REQUEST,
});
export const deleteRoleSuccess = (payload: string) => ({
    type: ROLE_ACTION.DELETE_ROLE_SUCCESS,
    payload,
});
export const deleteRoleFailure = (payload: string) => ({
    type: ROLE_ACTION.DELETE_ROLE_FAILURE,
    payload,
});

export const resetRoleState = () => ({
    type: ROLE_ACTION.RESET_ROLE_STATE,
});
