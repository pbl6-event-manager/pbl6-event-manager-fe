import type { PermissionDto } from "../../dtos/permission-dto";

export interface PermissionState {
    permissions: PermissionDto[];
    isLoading: boolean;
    error: string | null;
}

export const DEFAULT_PERMISSION_STATE: PermissionState = {
    permissions: [],
    isLoading: false,
    error: null,
};