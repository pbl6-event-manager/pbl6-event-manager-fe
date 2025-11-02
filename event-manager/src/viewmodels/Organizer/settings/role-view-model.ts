import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import {
    fetchRolesRequest,
    fetchRolesSuccess,
    fetchRolesFailure,
    createRoleRequest,
    createRoleSuccess,
    createRoleFailure,
    deleteRoleRequest,
    deleteRoleSuccess,
    deleteRoleFailure,
    resetRoleState
} from "../../../store/actions/Organizer/role-action";
import type { TeamRole } from "../../../models/bean/staff-models";

const mockRoles: TeamRole[] = [
    {
        id: "1",
        name: "Owner",
        description: "Full access to all organization features",
        permissions: ["all"],
        isCustom: false,
    },
    {
        id: "2",
        name: "Admin",
        description: "Administrative access to organization",
        permissions: ["manage_events", "manage_team", "manage_settings"],
        isCustom: false,
    },
]

export const useRoleViewModel = () => {
    const dispatch = useDispatch();
    const { roles, isLoading, error } = useSelector((state: RootState) => state.role);

    const fetchRoles = async () => {
        dispatch(fetchRolesRequest());
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500))
            // Replace with actual API call
            const listRoles: TeamRole[] = mockRoles
            dispatch(fetchRolesSuccess(listRoles));
        } catch (error) {
            dispatch(fetchRolesFailure(error instanceof Error ? error.message : "Failed to fetch roles"))
        }
    }
    const createRole = async (name: string, permissions: string[]) => {
        dispatch(createRoleRequest());
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500))
            // Replace with actual API call
            const newRole: TeamRole = {
                id: (roles.length + 1).toString(),
                name,
                permissions,
                isCustom: true,
            }
            dispatch(createRoleSuccess(newRole));
        } catch (error) {
            dispatch(createRoleFailure(error instanceof Error ? error.message : "Failed to create role"))
        }
    }
    const deleteRole = async (roleId: string) => {
        dispatch(deleteRoleRequest())
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 500))
            // Replace with actual API call
            dispatch(deleteRoleSuccess(roleId))
        } catch (error) {
            dispatch(deleteRoleFailure(error instanceof Error ? error.message : "Failed to delete role"))
        }
    }
    const resetRole = () => {
        dispatch(resetRoleState())
    }
    return {
        roles,
        isLoading,
        error,
        fetchRoles,
        createRole,
        deleteRole,
        resetRole,
    }
}