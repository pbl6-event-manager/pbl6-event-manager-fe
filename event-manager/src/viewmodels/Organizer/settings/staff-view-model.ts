import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { showLoadingAlert, closeLoadingAlert, showSuccessAlert, showErrorAlert, showConfirmAlert } from "../../../helpers/alert-helpers";
import {
    fetchOwnerStaffs,
    inviteStaffToOwner,
    removeStaffOfOwner,
} from "../../../store/actions/staff-action";
import { useCallback, useEffect, useState } from "react";
import type { OwnerStaffListItem } from "../../../models/form-models/staff-form-models";

export const useStaffViewModel = () => {
    // const { eventId } = useParams<{ eventId: string }>()
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showInviteModal, setShowInviteModal] = useState(false); 4
    const [modalMode, setModalMode] = useState<"invite" | "edit">("invite");
    const [editingStaff, setEditingStaff] = useState<OwnerStaffListItem | null>(null);
    const { organizerStaffs, organizerStaffsForAssignment, isLoading, error } = useSelector((state: RootState) => state.staffReducer);
    const [selectedMember, setSelectedMember] = useState<number | null>(null);

    // Filter staffs based on search term
    const filteredStaffs = organizerStaffs.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredStaffsForAssignment = organizerStaffsForAssignment.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFetchOwnerStaff = useCallback(async () => {
        try {
            showLoadingAlert("Loading owner staffs...");
            await new Promise(resolve => setTimeout(resolve, 500));
            await dispatch<any>(fetchOwnerStaffs());
            closeLoadingAlert();
        } catch (error: any) {
            closeLoadingAlert();
            showErrorAlert("Error loading owner staffs");
            throw new Error("Error loading owner staffs: " + error);
        }
    }, [dispatch]);

    // const handleFetchEventStaff = useCallback(async (eventId: number | undefined) => {
    //     try {
    //         if (eventId === undefined) {
    //             return
    //         } else {
    //             showLoadingAlert("Loading event staffs...");
    //             await new Promise(resolve => setTimeout(resolve, 500));
    //             await dispatch<any>(fetchEventStaffs(eventId));
    //             closeLoadingAlert();
    //         }
    //     } catch (error) {
    //         closeLoadingAlert();
    //         showErrorAlert("Error loading event staffs");
    //         throw new Error("Error loading event staffs: " + error);
    //     }
    // }, [dispatch]);

    const handleInviteStaffToOwner = useCallback(async (email: string, roleStaffId: number) => {
        if (!email || !roleStaffId) {
            showErrorAlert("Please provide email and select a role");
            return;
        }

        try {
            showLoadingAlert(modalMode === 'edit' ? "Updating staff..." : "Inviting staff...");
            const result = await dispatch<any>(inviteStaffToOwner(email, roleStaffId));
            closeLoadingAlert();

            if (result.message.includes("updated")) {
                showSuccessAlert("Staff role updated successfully");
            } else {
                showSuccessAlert("Staff invited successfully");
            }

            // Reset form and close modal
            handleCloseModal();

            // Refresh staff list
            await handleFetchOwnerStaff();
        } catch (error: any) {
            closeLoadingAlert();
            showErrorAlert(error.message || "Error inviting staff");
        }
    }, [dispatch, handleFetchOwnerStaff]);

    const handleOpenInviteModal = useCallback(() => {
        setModalMode('invite');
        setEditingStaff(null);
        setEmail("");
        setSelectedRole("");
        setShowInviteModal(true);
    }, []);

    const handleOpenEditModal = useCallback((staff: OwnerStaffListItem) => {
        setModalMode('edit');
        setEditingStaff(staff);
        setEmail(staff.email);
        setSelectedRole("");
        setShowInviteModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowInviteModal(false);
        setModalMode('invite');
        setEditingStaff(null);
        setEmail("");
        setSelectedRole("");
    }, []);

    const handleRemoveStaffOfOwner = useCallback(async (staffEmail: string) => {
        try {
            const result = await showConfirmAlert(
                "Are you sure you want to remove this staff?",
                "Remove Staff"
            );

            if (result) {
                showLoadingAlert("Removing staff...");
                await dispatch<any>(removeStaffOfOwner(staffEmail));
                closeLoadingAlert();
                showSuccessAlert("Staff removed successfully");
                setSelectedMember(null);

                // Refresh staff list
                await handleFetchOwnerStaff();
            }
        } catch (error: any) {
            closeLoadingAlert();
            showErrorAlert("Error removing staff");
        }
    }, [dispatch, handleFetchOwnerStaff]);

    useEffect(() => {
        handleFetchOwnerStaff();
    }, []);

    return {
        email,
        selectedRole,
        organizerStaffs: filteredStaffs,
        organizerStaffsForAssignment: filteredStaffsForAssignment,
        isLoading,
        error,
        searchTerm,
        showInviteModal,
        modalMode,
        editingStaff,
        selectedMember,

        setEmail,
        setSelectedRole,
        setShowInviteModal,
        setSearchTerm,
        setSelectedMember,

        handleInviteStaffToOwner,
        handleRemoveStaffOfOwner,
        handleFetchOwnerStaff,
        handleOpenInviteModal,
        handleOpenEditModal,
        handleCloseModal,
    };
}