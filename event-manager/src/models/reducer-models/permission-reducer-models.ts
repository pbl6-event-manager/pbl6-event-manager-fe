import type { PermissionDto } from "../../dtos/permission-dto";
import type { PermissionListItem } from "../form-models/permission-form-models";

export interface PermissionState {
    permissions: PermissionDto[];
    listPermissionItem: PermissionListItem[];
    isLoading: boolean;
    error: string | null;
}

export const DEFAULT_PERMISSION_STATE: PermissionState = {
    permissions: [],
    listPermissionItem: [],
    isLoading: false,
    error: null,
};