import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { TeamMember } from "../../../models/bean/staff-models";
import {
    fetchTeamMembersRequest,
    fetchTeamMembersSuccess,
    fetchTeamMembersFailure,
    inviteMemberRequest,
    inviteMemberSuccess,
    inviteMemberFailure,
    removeTeamMemberRequest,
    removeTeamMemberSuccess,
    removeTeamMemberFailure,
    updateMemberRoleRequest,
    updateMemberRoleSuccess,
    updateMemberRoleFailure,
    resetOrganizerTeamState,
} from "../../../store/actions/Organizer/organizer-team-management-action"

//Mock data - replace with Redux state
const mockMembers: TeamMember[] = [
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

const mockRoles = ["Owner", "Admin", "Editor", "Viewer"];

export const useOrganizerTeamManagementViewModel = () => {
    const dispatch = useDispatch();
    const { members, isLoading, error } = useSelector((state: RootState) => state.organizerTeamManagement);

    const fetchTeamMembers = async () => {
        dispatch(fetchTeamMembersRequest());
        try {
            // Replace with actual API call
            const data: TeamMember[] = mockMembers;
            dispatch(fetchTeamMembersSuccess(data));
        } catch (err) {
            dispatch(fetchTeamMembersFailure("Failed to fetch team members"));
        }
    }

    const inviteMember = async (email: string, role: string) => {
        dispatch(inviteMemberRequest());
        try {
            const newMember: TeamMember = {
                id: (members.length + 1).toString(),
                email,
                name: email.split("@")[0],
                role: role,
                status: "pending",
                joinedAt: new Date().toISOString(),
            }
            dispatch(inviteMemberSuccess(newMember));
        } catch (error) {
            dispatch(inviteMemberFailure(error instanceof Error ? error.message : "Failed to invite member"));
        }
    }
    const removeTeamMember = async (memberId: string) => {
        dispatch(removeTeamMemberRequest());
        try {
            dispatch(removeTeamMemberSuccess(memberId));
        } catch (error) {
            dispatch(removeTeamMemberFailure(error instanceof Error ? error.message : "Failed to remove member"));
        }
    }
    const updateMemberRole = async (memberId: string, newRole: string) => {
        dispatch(updateMemberRoleRequest());
        try {
            // Replace with actual API call
            const updatedMember = members.find((m) => m.id === memberId);
            if (updatedMember) {
                dispatch(updateMemberRoleSuccess({ ...updatedMember, role: newRole }))
            }
        } catch (error) {
            dispatch(updateMemberRoleFailure(error instanceof Error ? error.message : "Failed to update member role"));
        }
    }
    const resetTeamState = () => {
        dispatch(resetOrganizerTeamState());
    }
    return {
        members,
        isLoading,
        error,
        fetchTeamMembers,
        inviteMember,
        removeTeamMember,
        updateMemberRole,
        resetTeamState,
    }
}