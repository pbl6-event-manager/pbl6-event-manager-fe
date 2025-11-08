import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import {
    fetchOwnerRoleStaffs,
    createOwnerRoleStaff,
    deleteOwnerRoleStaff
} from "../../../store/actions/role-staff-actions";
import type { RoleStaffListItem } from "../../../models/form-models/role-staff-form-models";

// const mockRoles = [
//     {
//         id: 1,
//         name: "Owner",
//         description: "Full access to all organization features",
//         permissions: ["all"],
//         isCustom: false,
//     },
//     {
//         id: 2,
//         name: "Admin",
//         description: "Administrative access to organization",
//         permissions: ["manage_events", "manage_team", "manage_settings"],
//         isCustom: false,
//     },
// ]

export const useRoleViewModel = () => {
    const dispatch = useDispatch();
    const { roles, isLoading, error } = useSelector((state: RootState) => state.roleReducer);

    const handleFetchOwnerRoleStaffs = async () => {
        dispatch<any>(fetchOwnerRoleStaffs());
        
    }
    const handleCreateOwnerRole = async (roleForm: any) => {
        dispatch<any>(createOwnerRoleStaff(roleForm));
        
    }
    const handleDeleteOwnerRole = async (roleStaffId: number) => {
        dispatch<any>(deleteOwnerRoleStaff(roleStaffId));
    }
    
    return {
        roles,
        isLoading,
        error,
        handleFetchOwnerRoleStaffs,
        handleCreateOwnerRole,
        handleDeleteOwnerRole
    }
}