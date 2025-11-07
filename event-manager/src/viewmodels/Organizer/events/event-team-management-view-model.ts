import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { Staff } from "../../../models/bean/staff-models";
import {
    fetchEventStaffs,
    fetchOwnerStaffs,
    updateListStaffsOfEvent,
    inviteStaffToOwner,
    removeStaffOfOwner,
} from "../../../store/actions/staff-action"

// Mock data - replace with Redux state
const mockMembersInOrganizer: Staff[]  = [
    {
        id: 1,
        email: "letonthanhan@gmail.com",
        name: "Lê Tôn Thanh An",
        role: "Owner",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: 2,
        email: "nguyendacnguyentam@gmail.com",
        name: "Nguyễn Đắc Nguyên Tâm",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
    {
        id: 3,
        email: "nguyenvana@gmail.com",
        name: "Nguyễn Văn A",
        role: "Marketing",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: 4,
        email: "staff@gmail.com",
        name: "Staff",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
]

const mockMembersInEvent: Staff[]  = [
    {
        id: 1,
        email: "letonthanhan@gmail.com",
        name: "Lê Tôn Thanh An",
        role: "Owner",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: 2,
        email: "nguyendacnguyentam@gmail.com",
        name: "Nguyễn Đắc Nguyên Tâm",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
]

export const useEventTeamManagementViewModel = () => {
    const dispatch = useDispatch();
    const { eventStaffs, organizerStaffs, isLoading, error } = useSelector((state: RootState) => state.staffReducer);

    const handleFetchEventStaffs = async () => {
        dispatch<any>(fetchEventStaffs());
    }
    const handleFetchOwnerStaffs = async (id: number) => {
        dispatch<any>(fetchOwnerStaffs(id));
        
    }
    const handleUpdateListStaffsOfEvent = async (eventId: number, listStaffId: number[]) => {
        if (eventStaffs.some((m) => m.id === listStaffId[0])) {
            return
        }

        dispatch<any>(updateListStaffsOfEvent(eventId, listStaffId));
    }
    const handleRemoveStaffOfOwner = async (ownerId: number, listStaffId: number[]) => {
        dispatch<any>(removeStaffOfOwner(ownerId, listStaffId));
    }
    const isStaffAssigned = (staffId: number): boolean => {
        return eventStaffs.some((staff) => staff.id === staffId);
    }
    const getUnassignedStaffs = (): Staff[] => {
        return organizerStaffs.filter((staff) => !isStaffAssigned(staff.id))
    }
    const getAssignedStaffs = (): Staff[] => {
        return organizerStaffs.filter((staff) => isStaffAssigned(staff.id))
    }
    const getSortedStaffs = (): Staff[] => {
        const unassigned = getUnassignedStaffs()
        const assigned = getAssignedStaffs()
        return [...unassigned, ...assigned]
    }
    
    return {
        eventStaffs,
        organizerStaffs,
        isLoading,
        error,
        handleFetchEventStaffs,
        handleFetchOwnerStaffs,
        handleUpdateListStaffsOfEvent,
        handleRemoveStaffOfOwner,
        isStaffAssigned,
        getUnassignedStaffs,
        getAssignedStaffs,
        getSortedStaffs,
    }
}