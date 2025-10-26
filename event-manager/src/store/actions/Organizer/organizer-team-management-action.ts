import type { TeamMember } from "../../../models/team-models";

export const ORGANIZER_TEAM_ACTIONS = {
    // Fetch organizer team members
    FETCH_TEAM_MEMBERS_REQUEST: "FETCH_TEAM_MEMBERS_REQUEST",
    FETCH_TEAM_MEMBERS_SUCCESS: "FETCH_TEAM_MEMBERS_SUCCESS",
    FETCH_TEAM_MEMBERS_FAILURE: "FETCH_TEAM_MEMBERS_FAILURE",

    // Invite team member
    INVITE_MEMBER_REQUEST: "INVITE_MEMBER_REQUEST",
    INVITE_MEMBER_SUCCESS: "INVITE_MEMBER_SUCCESS",
    INVITE_MEMBER_FAILURE: "INVITE_MEMBER_FAILURE",

    // Remove team member
    REMOVE_TEAM_MEMBER_REQUEST: "REMOVE_TEAM_MEMBER_REQUEST",
    REMOVE_TEAM_MEMBER_SUCCESS: "REMOVE_TEAM_MEMBER_SUCCESS",
    REMOVE_TEAM_MEMBER_FAILURE: "REMOVE_TEAM_MEMBER_FAILURE",

    // Update member role
    UPDATE_MEMBER_ROLE_REQUEST: "UPDATE_MEMBER_ROLE_REQUEST",
    UPDATE_MEMBER_ROLE_SUCCESS: "UPDATE_MEMBER_ROLE_SUCCESS",
    UPDATE_MEMBER_ROLE_FAILURE: "UPDATE_MEMBER_ROLE_FAILURE",

    // Reset state
    RESET_ORGANIZER_TEAM_STATE: "RESET_ORGANIZER_TEAM_STATE",
}

// Action creators
export const fetchTeamMembersRequest = () => ({
    type: ORGANIZER_TEAM_ACTIONS.FETCH_TEAM_MEMBERS_REQUEST,
});
export const fetchTeamMembersSuccess = (payload: TeamMember[]) => ({
    type: ORGANIZER_TEAM_ACTIONS.FETCH_TEAM_MEMBERS_SUCCESS,
    payload,
});
export const fetchTeamMembersFailure = (payload: string) => ({
    type: ORGANIZER_TEAM_ACTIONS.FETCH_TEAM_MEMBERS_FAILURE,
    payload,
});

export const inviteMemberRequest = () => ({
    type: ORGANIZER_TEAM_ACTIONS.INVITE_MEMBER_REQUEST,
});
export const inviteMemberSuccess = (payload: TeamMember) => ({
    type: ORGANIZER_TEAM_ACTIONS.INVITE_MEMBER_SUCCESS,
    payload,
});
export const inviteMemberFailure = (payload: string) => ({
    type: ORGANIZER_TEAM_ACTIONS.INVITE_MEMBER_FAILURE,
    payload,
});

export const removeTeamMemberRequest = () => ({
    type: ORGANIZER_TEAM_ACTIONS.REMOVE_TEAM_MEMBER_REQUEST,
});
export const removeTeamMemberSuccess = (payload: string) => ({
    type: ORGANIZER_TEAM_ACTIONS.REMOVE_TEAM_MEMBER_SUCCESS,
    payload,
});
export const removeTeamMemberFailure = (payload: string) => ({
    type: ORGANIZER_TEAM_ACTIONS.REMOVE_TEAM_MEMBER_FAILURE,
    payload,
});

export const updateMemberRoleRequest = () => ({
    type: ORGANIZER_TEAM_ACTIONS.UPDATE_MEMBER_ROLE_REQUEST,
});
export const updateMemberRoleSuccess = (payload: TeamMember) => ({
    type: ORGANIZER_TEAM_ACTIONS.UPDATE_MEMBER_ROLE_SUCCESS,
    payload,
});
export const updateMemberRoleFailure = (payload: string) => ({
    type: ORGANIZER_TEAM_ACTIONS.UPDATE_MEMBER_ROLE_FAILURE,
    payload,
});

export const resetOrganizerTeamState = () => ({
    type: ORGANIZER_TEAM_ACTIONS.RESET_ORGANIZER_TEAM_STATE,
});
