import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import {
    fetchOwnerRoleStaffs,
    createOwnerRoleStaff,
    deleteOwnerRoleStaff,
    updateOwnerRoleStaff
} from "../../../store/actions/role-staff-actions";
import type { CreateRoleStaffFormData } from "../../../models/form-models/role-staff-form-models";
import { showLoadingAlert, showSuccessAlert, showErrorAlert, closeLoadingAlert, showConfirmAlert } from "../../../helpers/alert-helpers";


export const useRoleViewModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("")
    const { roles, currentRole, isLoading, error } = useSelector((state: RootState) => state.roleReducer);
    const [formData, setFormData] = useState<CreateRoleStaffFormData>({
        name: "",
        description: "",
        permissionIds: [],
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const updateFormData = useCallback((field: keyof CreateRoleStaffFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }, [validationErrors]);

    const handleLoadRoleById = useCallback((roleId: number | string) => {
        const numericRoleId = typeof roleId === 'string' ? parseInt(roleId, 10) : roleId;
        const role = roles.find(r => r.id === numericRoleId);

        if (role) {
            setFormData({
                name: role.name,
                description: role.description,
                permissionIds: [] 
            })
            return role
        }
        return null
    }, [roles]);

    const handleGetRoleById = useCallback((roleId: number | string) => {
        const numericRoleId = typeof roleId === 'string' ? parseInt(roleId, 10) : roleId;
        const role = roles.find(r => r.id === numericRoleId);
        return role;
    }, [roles]);
    const resetForm = useCallback(() => {
        setFormData({
            name: "",
            description: "",
            permissionIds: [],
        });
        setValidationErrors({});
    }, []);

    const validateForm = useCallback(() => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = "Role name is required";
        } else if (formData.name.length > 50) {
            errors.name = "Role name must be less than 50 characters";
        }

        if (!formData.description.trim()) {
            errors.description = "Role description is required";
        } else if (formData.description.length > 200) {
            errors.description = "Role description must be less than 200 characters";
        }

        if (formData.permissionIds.length === 0) {
            errors.permissions = "At least one permission must be selected"
        };
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);
    const handleNavigateToCreateNewRole = () => {
        navigate("/organizer/settings/members/roles/create")
    }
    const handleNavigateToUpdateRole = (roleStaffId: number) => {
        navigate(`/organizer/settings/members/roles/edit/${roleStaffId}`)
    }
    const handleFetchOwnerRoleStaffs = useCallback(async () => {
        try {
            showLoadingAlert("Loading roles...");
            await new Promise(resolve => setTimeout(resolve, 500));
            await dispatch<any>(fetchOwnerRoleStaffs())
            closeLoadingAlert();
        } catch (error) {
            showErrorAlert("Error loading roles");
            console.error("Error loading roles:", error)
        }
    }, [dispatch])
    const handleCreateOwnerRole = useCallback(async () => {
        if (!validateForm()) {
            showErrorAlert("Please fix validation errors before submitting.");
            return;
        }
        try {
            showLoadingAlert("Creating role staff...");
            await dispatch<any>(createOwnerRoleStaff(formData));
            closeLoadingAlert();
            showSuccessAlert("Role created successfully");
            navigate("/organizer/settings?tab=roles");
        } catch (error) {
            closeLoadingAlert();
            showErrorAlert("Error creating role");
        }
    }, [dispatch, formData, validateForm, navigate])

    const handleUpdateOwnerRole = useCallback(async (roleStaffId: number) => {
        if (!validateForm()) {
            showErrorAlert("Please fix validation errors before submitting.");
            return;
        }
        try {
            showLoadingAlert("Updating role...");
            await dispatch<any>(updateOwnerRoleStaff(roleStaffId, formData));
            closeLoadingAlert();
            showSuccessAlert("Role updated successfully");
            navigate("/organizer/settings?tab=roles");
        } catch (error) {
            closeLoadingAlert();
            showErrorAlert("Error updating role");
        }
    }, [dispatch, formData, validateForm, navigate])

    const handleDeleteOwnerRole = useCallback(async (roleStaffId: number) => {
        try {
            const result = await showConfirmAlert("Are you sure you want to delete this role?", "Delete Role")
            if (result) {
                showLoadingAlert("Deleting role...");
                await dispatch<any>(deleteOwnerRoleStaff(roleStaffId));
                closeLoadingAlert();
                showSuccessAlert("Role deleted successfully");
                await handleFetchOwnerRoleStaffs();
            }
        } catch (error) {
            closeLoadingAlert();
            showErrorAlert("Error deleting role");
        }
    }, [dispatch, handleFetchOwnerRoleStaffs])

    const handleBackClick = () => {
        showConfirmAlert("Are you sure to leave the page?", "Unsaved changes will be lost.").then(async (confirmed) => {
            if (confirmed) {
                navigate("/organizer/settings?tab=roles")
            }
        })
    }

    return {
        // State
        roles,
        filteredRoles,
        currentRole,
        isLoading,
        error,
        searchTerm,
        formData,
        validationErrors,
        
        // Setters
        setSearchTerm,
        updateFormData,
        
        // Functions
        handleLoadRoleById,
        handleGetRoleById,         
        resetForm,           
        validateForm,          
        handleFetchOwnerRoleStaffs,
        handleNavigateToCreateNewRole,
        handleNavigateToUpdateRole,
        handleCreateOwnerRole,
        handleUpdateOwnerRole,
        handleDeleteOwnerRole,
        handleBackClick
    }
}