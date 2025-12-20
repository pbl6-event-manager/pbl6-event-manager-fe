import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../store/store";
import {
    showLoadingAlert,
    closeLoadingAlert,
    showSuccessAlert,
    showErrorAlert
} from "../../../helpers/alert-helpers";
import {
    syncStaffsToEvent,
    fetchEventStaffsForStaff,
    fetchOwnerStaffsForAssignment
} from "../../../store/actions/staff-action";
import { usePermission } from "../../../hooks/usePermission";
import { usePermissionCheck } from "../../../hooks/usePermissionCheck";
import { PERMISSIONS } from "../../../constants/permission";

export const useEventTeamManagementViewModel = () => {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const { eventId } = useParams<{ eventId: string }>();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStaffIds, setSelectedStaffIds] = useState<number[]>([]);
    const {
        isOwner,
        hasPermission,
        hasAnyPermission,
    } = usePermission({ eventId: parseInt(eventId || "0", 10), autoLoad: true });

    const { showPermissionDenied } = usePermissionCheck({
        isOwner,
        hasPermission,
        hasAnyPermission,
    });

    const { organizerStaffsForAssignment, eventStaffs, isLoading, error } = useSelector(
        (state: RootState) => state.staffReducer
    );

    const currentUser = useSelector((state: RootState) => state.authReducer.user);
    const currentUserEmail = currentUser?.email;

    // Sort event staffs: current user first, then others
    const sortedEventStaffs = useMemo(() => {
        if (!currentUserEmail) return eventStaffs;

        const currentUserStaff = eventStaffs.find(
            staff => staff.email === currentUserEmail
        );
        const otherStaffs = eventStaffs.filter(
            staff => staff.email !== currentUserEmail
        );

        return currentUserStaff 
            ? [currentUserStaff, ...otherStaffs] 
            : eventStaffs;
    }, [eventStaffs, currentUserEmail]);

    // Filter organizer staffs based on search
    const filteredOrganizerStaffsForAssignment = organizerStaffsForAssignment.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter event staffs based on search
    const filteredEventStaffs = sortedEventStaffs.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if staff is current user
    const isCurrentUser = useCallback((staffEmail: string) => {
        return staffEmail === currentUserEmail;
    }, [currentUserEmail]);

    // Check if staff is assigned to event
    const isStaffAssigned = useCallback((staffId: number) => {
        return eventStaffs.some(staff => staff.id === staffId);
    }, [eventStaffs]);

    // Initialize selected staff IDs from event staffs
    useEffect(() => {
        if (eventStaffs.length > 0) {
            setSelectedStaffIds(eventStaffs.map(staff => staff.id));
        }
    }, [eventStaffs]);

    // Fetch organizer and event staffs
    const handleFetchStaffs = useCallback(async () => {
        if (!eventId) return;

        try {
            await Promise.all([
                dispatch<any>(fetchOwnerStaffsForAssignment(Number(eventId))),
                dispatch<any>(fetchEventStaffsForStaff(Number(eventId)))
            ]);
        } catch (error: any) {
            throw new Error('Error in handleFetchStaffs:', error);
        }
    }, [dispatch, eventId]);

    const handleFetchStaffForAssignment = useCallback(async () => {
        if (!eventId) return;

        try {
            await dispatch<any>(fetchEventStaffsForStaff(Number(eventId)));
        } catch (error: any) {
            throw new Error('Error in handleFetchStaffForAssignment:', error);
        }
    }, [dispatch, eventId]);

    // Toggle staff selection
    const handleToggleStaff = useCallback((staffId: number) => {
        setSelectedStaffIds(prev => {
            if (prev.includes(staffId)) {
                return prev.filter(id => id !== staffId);
            } else {
                return [...prev, staffId];
            }
        });
    }, []);

    // Sync staffs to event
    const handleSyncStaffs = useCallback(async () => {
        if (!eventId) {
            showErrorAlert("Event ID is required");
            return;
        }

        try {
            showLoadingAlert("Syncing staffs...");
            await dispatch<any>(syncStaffsToEvent(Number(eventId), selectedStaffIds));
            closeLoadingAlert();
            showSuccessAlert("Staffs synced successfully");
        } catch (error: any) {
            closeLoadingAlert();
            showErrorAlert(error.message || "Error syncing staffs");
        }
    }, [dispatch, eventId, selectedStaffIds]);
    const handleSaveAssignments = async () => {
        await handleSyncStaffs();
        setShowAssignModal(false);
    };

    const handleShowAssignModalWithPermission = (isOwner: boolean, canAssignStaff: boolean) => {
        if (canAssignStaff || isOwner) {
            setShowAssignModal(true);
        } else {
            showPermissionDenied(PERMISSIONS.ASSIGN_STAFF);
            return
        }
    }

    // Initial load
    useEffect(() => {
        handleFetchStaffs();
    }, [handleFetchStaffs]);

    useEffect(() => {
        handleFetchStaffForAssignment();
    }, [handleFetchStaffForAssignment]);

    return {
        searchTerm,
        setSearchTerm,
        showAssignModal,
        setShowAssignModal,
        organizerStaffsForAssignment: filteredOrganizerStaffsForAssignment,
        eventStaffs: filteredEventStaffs,
        selectedStaffIds,
        isLoading,
        error,
        isStaffAssigned,
        isCurrentUser,
        handleToggleStaff,
        handleSyncStaffs,
        handleFetchStaffs,
        handleSaveAssignments,
        handleShowAssignModalWithPermission
    };
};