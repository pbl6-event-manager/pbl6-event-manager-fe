import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"
import type { RootState } from "../../../store/store";
import type { PermissionListItem } from "../../../models/form-models/permission-form-models";
import { fetchPermissions } from "../../../store/actions/permission-action";

export const usePermissionViewModel = (
    updateFormData?: (field: string, value: any) => void
) => {
    const dispatch = useDispatch();

    const [selectedPermissions, setSelectedPermissions] = useState<Set<number>>(new Set())
    const [errors, setErrors] = useState<Record<string, string>>({})
    const { permissions, isLoading, error } = useSelector((state: RootState) => state.permissionReducer);
    const navigate = useNavigate()
    const permissionListItems: PermissionListItem[] = useMemo<PermissionListItem[]>(() => {
        return permissions
            .filter((dto) => dto.isActive)
            .map((dto) => ({
                id: dto.id,
                name: dto.name,
                description: dto.description,
            }))
    }, [permissions]);

    const handleFetchPermissions = useCallback(async () => {
        try {
            await dispatch<any>(fetchPermissions())
        } catch (error) {
            console.error("Error loading permissions:", error)
        }
    }, [dispatch])

    const togglePermission = useCallback((permissionId: number) => {
        setSelectedPermissions(prev => {
            const newPermissions = new Set(prev);
            
            if (newPermissions.has(permissionId)) {
                newPermissions.delete(permissionId);
            } else {
                newPermissions.add(permissionId);
            }
            if (updateFormData) {
                updateFormData("permissionIds", Array.from(newPermissions));
            }

            return newPermissions;
        });
    }, [updateFormData]);

    const toggleSelectAll = useCallback(() => {
        setSelectedPermissions(prev => {
            const allSelected = permissionListItems.every(p => prev.has(p.id));
            let newPermissions: Set<number>;

            if (allSelected) {
                newPermissions = new Set();
            } else {
                newPermissions = new Set(permissionListItems.map(p => p.id));
            }
            if (updateFormData) {
                updateFormData("permissionIds", Array.from(newPermissions));
            }

            return newPermissions;
        });
    }, [permissionListItems, updateFormData]);

    const isAllSelected = useMemo(() => {
        return permissionListItems.length > 0 &&
            permissionListItems.every(p => selectedPermissions.has(p.id));
    }, [permissionListItems, selectedPermissions]);

    useEffect(() => {
        handleFetchPermissions();
    }, []);


    return {
        permissionListItems,
        
        selectedPermissions,
        setSelectedPermissions,
        isLoading,
        errors,
        error,
        navigate,
        setErrors,
        handleFetchPermissions,
        togglePermission,
        isAllSelected,
        toggleSelectAll,
    };
}