import { useEffect, useState } from "react";
import { PERMISSION_FORM_DEFAULT } from "../../models/form-models/permission-form-models";
import type { PermissionDto } from "../../dtos/permission-dto";
import { useDispatch, useSelector } from "react-redux";
import { addPermission, deletePermission, fetchPermissions, updatePermission } from "../../store/actions/permission-action";
import type { RootState } from "../../store/store";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert, showSuccessAlert, showWarningAlert } from "../../helpers/alert-helpers";

export const usePermissionViewModel = (initialData?: PermissionDto) => {
    const permissionColumns = [
        { header: "ID", accessor: "id", type: "text" as const },
        { header: "Name", accessor: "name", type: "text" as const },
        { header: "Description", accessor: "description", type: "text" as const },
        { header: "Action", accessor: "actions", type: "action" as const },
    ];

    const dispatch = useDispatch();
    const { listPermissionItem } = useSelector((root: RootState) => root.permissionReducer) ?? [];
    const [newPermission, setNewPermission] = useState(PERMISSION_FORM_DEFAULT);
    const [permission, setPermission] = useState(PERMISSION_FORM_DEFAULT);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [updateId, setUpdateId] = useState<any>();
    const [deleteId, setDeleteId] = useState<any>();

    useEffect(() => {
        const getPermissionsInfo = async () => {
            showLoadingAlert();
            await dispatch<any>(fetchPermissions());
            closeLoadingAlert();
        }

        getPermissionsInfo();
    }, [dispatch]);

    useEffect(() => {
        if (initialData) {
            setPermission(initialData);
        }
    }, [initialData]);

    const handleAddChange = (field: keyof PermissionDto, value: string) => {
        setNewPermission((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdateChange = (field: keyof PermissionDto, value: string) => {
        setPermission((prev) => ({ ...prev, [field]: value }));
    }

    const handleEditPermission = (permissionId: number) => {
        setUpdateId(permissionId);
        const permission = listPermissionItem.find((c) => c.id === permissionId);
        if (permission) {
            const updateCategory = {
                name: permission.name,
                description: permission.description
            }
            setPermission(updateCategory);
            setIsEditing(true);
        }
    };

    const handleDeletePermission = (id: number) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleAddPermission = async () => {
        if (!newPermission.name.trim()) {
            showWarningAlert("Permission name is required");
            return;
        }

        const _newPermission = {
            name: newPermission.name,
            description: newPermission.description
        }

        try {
            await dispatch<any>(addPermission(_newPermission));
            showSuccessAlert("Permission added successfully!");
            setNewPermission(PERMISSION_FORM_DEFAULT);
            setIsAdding(false);
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to add permission");
        }
    };

    const handleUpdatePermission = async (id: number) => {
        if (!permission.name) {
            showWarningAlert("Permission name is required");
            return;
        }

        try {
            await dispatch<any>(updatePermission(id, permission));
            showSuccessAlert("Updated permission successfully");
            setUpdateId(null);
            setIsEditing(false);
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to update permission");
        }
    }

    const confirmDelete = async () => {
        if (deleteId === null) {
            showErrorAlert("Failed to delete permission");
            return;
        }

        try {
            await dispatch<any>(deletePermission(deleteId));
            showSuccessAlert("Deleted permission successfully");
            setDeleteId(null);
            setOpenDeleteDialog(false);
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to delete permission");
        }
    };

    return {
        openDeleteDialog,
        setOpenDeleteDialog,
        permissionColumns,
        newPermission,
        permission,
        isAdding,
        setIsAdding,
        setIsEditing,
        isEditing,
        handleAddChange,
        handleUpdateChange,
        updateId,
        setUpdateId,
        listPermissionItem,
        handleEditPermission,
        handleDeletePermission,
        handleAddPermission,
        handleUpdatePermission,
        confirmDelete
    }
}