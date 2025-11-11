import type { RoleStaffDto } from "../../dtos/role-staff-dto";

export interface RoleState {
    roles: RoleStaffDto[];
    currentRole: RoleStaffDto | null;
    isLoading: boolean;
    error: string | null;
}

export const DEFAULT_ROLE_STATE: RoleState = {
    roles: [],
    currentRole: null,
    isLoading: false,
    error: null,
};
