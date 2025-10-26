import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { TeamMember } from "../../../models/team-models";
import {
    fetchEventMembersRequest,
    fetchEventMembersSuccess,
    fetchEventMembersFailure,
    fetchOrganizerMembersRequest,
    fetchOrganizerMembersSuccess,
    fetchOrganizerMembersFailure,
    assignMemberRequest,
    assignMemberSuccess,
    assignMemberFailure,
    removeMemberRequest,
    removeMemberSuccess,
    removeMemberFailure,
    resetTeamState,
} from "../../../store/actions/Organizer/event-team-management-action"

// Mock data - replace with Redux state
const mockMembersInOrganizer: TeamMember[]  = [
    {
        id: "1",
        email: "letonthanhan@gmail.com",
        name: "Lê Tôn Thanh An",
        role: "Owner",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: "2",
        email: "nguyendacnguyentam@gmail.com",
        name: "Nguyễn Đắc Nguyên Tâm",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
    {
        id: "3",
        email: "nguyenvana@gmail.com",
        name: "Nguyễn Văn A",
        role: "Marketing",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: "4",
        email: "staff@gmail.com",
        name: "Staff",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
]

const mockMembersInEvent: TeamMember[]  = [
    {
        id: "1",
        email: "letonthanhan@gmail.com",
        name: "Lê Tôn Thanh An",
        role: "Owner",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: "2",
        email: "nguyendacnguyentam@gmail.com",
        name: "Nguyễn Đắc Nguyên Tâm",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
]

export const useEventTeamManagementViewModel = () => {
    const dispatch = useDispatch();
    const { eventMembers, organizerMembers, isLoading, error } = useSelector((state: RootState) => state.eventTeamManagement);

    const fetchEventMembers = async (eventId: string) => {
        dispatch(fetchEventMembersRequest());
        try {
            // Replace with actual API call
            const mockMembers : TeamMember[] = mockMembersInEvent
            dispatch(fetchEventMembersSuccess(mockMembers))
        } catch (error) {
            dispatch(fetchEventMembersFailure(error instanceof Error ? error.message : "Failed to fetch event members"))
        }
    }
    const fetchOrganizerMembers = async () => {
        dispatch(fetchOrganizerMembersRequest());
        try {
            // Replace with actual API call
            const mockMembers: TeamMember[] = mockMembersInOrganizer
            dispatch(fetchOrganizerMembersSuccess(mockMembers))
        } catch (error) {
            dispatch(fetchOrganizerMembersFailure(error instanceof Error ? error.message : "Failed to fetch organizer members"))
        }
    }
    const assignMemberToEvent = async (member: TeamMember) => {
        if (eventMembers.some((m) => m.id === member.id)) {
            return
        }

        dispatch(assignMemberRequest())
        try {
            // Replace with actual API call
            dispatch(assignMemberSuccess(member))
        } catch (err) {
            dispatch(assignMemberFailure(err instanceof Error ? err.message : "Failed to assign member"))
        }
    }
    const removeMemberFromEvent = async (memberId: string) => {
        dispatch(removeMemberRequest())
        try {
            // Replace with actual API call
            dispatch(removeMemberSuccess(memberId))
        } catch (err) {
            dispatch(removeMemberFailure(err instanceof Error ? err.message : "Failed to remove member"))
        }
    }
    const isMemberAssigned = (memberId: string): boolean => {
        return eventMembers.some((member) => member.id === memberId);
    }
    const getUnassignedMembers = (): TeamMember[] => {
        return organizerMembers.filter((member) => !isMemberAssigned(member.id))
    }
    const getAssignedMembers = (): TeamMember[] => {
        return organizerMembers.filter((member) => isMemberAssigned(member.id))
    }
    const getSortedMembers = (): TeamMember[] => {
        const unassigned = getUnassignedMembers()
        const assigned = getAssignedMembers()
        return [...unassigned, ...assigned]
    }
    const reset = () => {
        dispatch(resetTeamState())
    }
    
    return {
        eventMembers,
        organizerMembers,
        isLoading,
        error,
        fetchEventMembers,
        fetchOrganizerMembers,
        assignMemberToEvent,
        removeMemberFromEvent,
        isMemberAssigned,
        getUnassignedMembers,
        getAssignedMembers,
        getSortedMembers,
        reset,
    }
}