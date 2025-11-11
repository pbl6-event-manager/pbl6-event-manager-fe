import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../../store/store";
import {
    fetchOwnerRoleStaffs,
    createOwnerRoleStaff,
    deleteOwnerRoleStaff
} from "../../../store/actions/role-staff-actions";
import type { CreateRoleStaffFormData } from "../../../models/form-models/role-staff-form-models";
import { showLoadingAlert, showSuccessAlert, showErrorAlert, closeLoadingAlert } from "../../../helpers/alert-helpers";


export const useRoleViewModel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { roles, currentRole, isLoading, error } = useSelector((state: RootState) => state.roleReducer);
    const [formData, setFormData] = useState<CreateRoleStaffFormData>({
        name: "",
        description: "",
        permissionIds: [],
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const updateFormData = useCallback((field: keyof CreateRoleStaffFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        
        // Clear validation error khi user nhập
        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }, [validationErrors]);

    const validateForm = useCallback(() => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = "Role name is required";
            console.log("Validation Error: Name is required");
        } else if (formData.name.length > 50) {
            errors.name = "Role name must be less than 50 characters";
            console.log("Validation Error: Name too long");
        }

        if (!formData.description.trim()) {
            errors.description = "Role description is required";
            console.log("Validation Error: Description is required");
        } else if (formData.description.length > 200) {
            errors.description = "Role description must be less than 200 characters";
            console.log("Validation Error: Description too long");
        }

        if (formData.permissionIds.length === 0) {
            errors.permissions = "At least one permission must be selected"
            console.log("Validation Error: No permissions selected");
        };
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

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
        console.log("Form data before validation:", formData);
        if (!validateForm()) {
            showErrorAlert( "Please fix validation errors before submitting.");
            return;
        }
        try {
            showLoadingAlert("Creating role staff...");
            await dispatch<any>(createOwnerRoleStaff(formData));
            closeLoadingAlert();
            showSuccessAlert("Role created successfully");
            navigate("/organizer/settings?tab=roles");
        } catch (error) {
            showErrorAlert("Error creating role");
            console.error("Error creating role:", error)
        }
    }, [dispatch, formData, validateForm, navigate])
    const handleDeleteOwnerRole = useCallback(async (roleStaffId: number) => {
        try {
            dispatch<any>(deleteOwnerRoleStaff(roleStaffId));
        } catch (error) {
            console.error("Error deleting role:", error)
        }
    }, [dispatch])

    return {
        roles,
        isLoading,
        error,
        formData,
        updateFormData, 
        validationErrors,
        handleFetchOwnerRoleStaffs,
        handleCreateOwnerRole,
        handleDeleteOwnerRole
    }
}