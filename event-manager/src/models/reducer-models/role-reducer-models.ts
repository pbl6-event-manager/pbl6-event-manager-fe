import type { RoleModel } from "../bean/role-models";

export interface RoleState {
    roles: RoleModel[];
    isLoading: boolean;
    error: string | null;
}

export const DEFAULT_ROLE_STATE: RoleState = {
    roles: [],
    isLoading: false,
    error: null,
};
