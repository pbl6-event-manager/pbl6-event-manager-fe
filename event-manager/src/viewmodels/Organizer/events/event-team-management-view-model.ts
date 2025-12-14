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
    fetchOwnerStaffs,
    syncStaffsToEvent,
    fetchEventStaffsForStaff
} from "../../../store/actions/staff-action";
import { toast } from "sonner";

export const useEventTeamManagementViewModel = () => {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const { eventId } = useParams<{ eventId: string }>();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStaffIds, setSelectedStaffIds] = useState<number[]>([]);

    const { organizerStaffs, eventStaffs, isLoading, error } = useSelector(
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
    const filteredOrganizerStaffs = organizerStaffs.filter(staff =>
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
            showLoadingAlert("Loading staffs...");
            const results = await Promise.all([
                dispatch<any>(fetchOwnerStaffs()),
                dispatch<any>(fetchEventStaffsForStaff(Number(eventId)))
            ]);
            console.log('Fetch results:', results);
            console.log('Event staffs from Redux:', eventStaffs);
            closeLoadingAlert();
        } catch (error: any) {
            console.error('Error in handleFetchStaffs:', error);
            showErrorAlert(error?.message || "Error loading staffs");
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

    const handleShowAssignModalWithPermission = (isOwner: boolean, canAssignStaffs: boolean) => {
        if (canAssignStaffs || isOwner) {
            setShowAssignModal(true);
        } else {
            toast.error("Permission Denied", {
                description: 'You need "Assign Staffs" permission to add new staffs',
                duration: 4000,
            })
            return
        }
    }

    // Initial load
    useEffect(() => {
        handleFetchStaffs();
    }, [handleFetchStaffs]);

    return {
        searchTerm,
        setSearchTerm,
        showAssignModal,
        setShowAssignModal,
        organizerStaffs: filteredOrganizerStaffs,
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