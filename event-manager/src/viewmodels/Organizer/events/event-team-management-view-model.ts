import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
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
    fetchEventStaffs,
    syncStaffsToEvent 
} from "../../../store/actions/staff-action";

export const useEventTeamManagementViewModel = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStaffIds, setSelectedStaffIds] = useState<number[]>([]);
    
    const { organizerStaffs, eventStaffs, isLoading, error } = useSelector(
        (state: RootState) => state.staffReducer
    );

    // Filter organizer staffs based on search
    const filteredOrganizerStaffs = organizerStaffs.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter event staffs based on search
    const filteredEventStaffs = eventStaffs.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            await Promise.all([
                dispatch<any>(fetchOwnerStaffs()),
                dispatch<any>(fetchEventStaffs(Number(eventId)))
            ]);
            closeLoadingAlert();
        } catch (error: any) {
            closeLoadingAlert();
            showErrorAlert(error.message || "Error loading staffs");
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

    // Initial load
    useEffect(() => {
        handleFetchStaffs();
    }, [handleFetchStaffs]);

    return {
        searchTerm,
        setSearchTerm,
        organizerStaffs: filteredOrganizerStaffs,
        eventStaffs: filteredEventStaffs,
        selectedStaffIds,
        isLoading,
        error,
        isStaffAssigned,
        handleToggleStaff,
        handleSyncStaffs,
        handleFetchStaffs,
    };
};