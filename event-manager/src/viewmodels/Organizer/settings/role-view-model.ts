import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { RoleModel } from "../../../models/bean/role-models";


export const useRoleViewModel = () => {
    const dispatch = useDispatch();
    const { roles, isLoading, error } = useSelector((state: RootState) => state.roleReducer);

    const fetchRoles = async () => {

    }
    const createRole = async (name: string, permissions: string[]) => {
        
    }
    const deleteRole = async (roleId: string) => {
        
    }
    return {
        roles,
        isLoading,
        error,
        fetchRoles,
        createRole,
        deleteRole,
    }
}