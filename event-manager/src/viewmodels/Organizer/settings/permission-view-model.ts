import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"
import type { RootState, AppDispatch } from "../../../store/store";
import type { PermissionListItem } from "../../../models/form-models/permission-form-models";
import { fetchPermissions } from "../../../store/actions/permission-action";

export const usePermissionViewModel = () => {
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
    };
}