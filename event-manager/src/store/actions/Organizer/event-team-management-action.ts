import type { TeamMember } from "../../../models/team-models";

export const EVENT_TEAM_ACTION = {
  //Fetch Event Members
  FETCH_EVENT_MEMBERS_REQUEST: "FETCH_EVENT_MEMBERS_REQUEST",
  FETCH_EVENT_MEMBERS_SUCCESS: "FETCH_EVENT_MEMBERS_SUCCESS",
  FETCH_EVENT_MEMBERS_FAILURE: "FETCH_EVENT_MEMBERS_FAILURE",

  //Fetch Organizer Members
  FETCH_ORGANIZER_MEMBERS_REQUEST: "FETCH_ORGANIZER_MEMBERS_REQUEST",
  FETCH_ORGANIZER_MEMBERS_SUCCESS: "FETCH_ORGANIZER_MEMBERS_SUCCESS",
  FETCH_ORGANIZER_MEMBERS_FAILURE: "FETCH_ORGANIZER_MEMBERS_FAILURE",

  //Assign Member to Event
  ASSIGN_MEMBER_REQUEST: "ASSIGN_MEMBER_REQUEST",
  ASSIGN_MEMBER_SUCCESS: "ASSIGN_MEMBER_SUCCESS",
  ASSIGN_MEMBER_FAILURE: "ASSIGN_MEMBER_FAILURE",

  //Remove Member from Event
  REMOVE_MEMBER_REQUEST: "REMOVE_MEMBER_REQUEST",
  REMOVE_MEMBER_SUCCESS: "REMOVE_MEMBER_SUCCESS",
  REMOVE_MEMBER_FAILURE: "REMOVE_MEMBER_FAILURE",

  //Reset Event Team State
  RESET_TEAM_STATE: "RESET_TEAM_STATE",
} as const;

// Action Creators
export const fetchEventMembersRequest = () => ({
  type: EVENT_TEAM_ACTION.FETCH_EVENT_MEMBERS_REQUEST,
});

export const fetchEventMembersSuccess = (payload: TeamMember[]) => ({
  type: EVENT_TEAM_ACTION.FETCH_EVENT_MEMBERS_SUCCESS,
  payload,
});

export const fetchEventMembersFailure = (payload: string) => ({
  type: EVENT_TEAM_ACTION.FETCH_EVENT_MEMBERS_FAILURE,
  payload,
});

export const fetchOrganizerMembersRequest = () => ({
  type: EVENT_TEAM_ACTION.FETCH_ORGANIZER_MEMBERS_REQUEST,
});

export const fetchOrganizerMembersSuccess = (payload: TeamMember[]) => ({
  type: EVENT_TEAM_ACTION.FETCH_ORGANIZER_MEMBERS_SUCCESS,
  payload,
});

export const fetchOrganizerMembersFailure = (payload: string) => ({
  type: EVENT_TEAM_ACTION.FETCH_ORGANIZER_MEMBERS_FAILURE,
  payload,
});

export const assignMemberRequest = () => ({
  type: EVENT_TEAM_ACTION.ASSIGN_MEMBER_REQUEST,
});

export const assignMemberSuccess = (payload: TeamMember) => ({
  type: EVENT_TEAM_ACTION.ASSIGN_MEMBER_SUCCESS,
  payload,
});

export const assignMemberFailure = (payload: string) => ({
  type: EVENT_TEAM_ACTION.ASSIGN_MEMBER_FAILURE,
  payload,
});

export const removeMemberRequest = () => ({
  type: EVENT_TEAM_ACTION.REMOVE_MEMBER_REQUEST,
});

export const removeMemberSuccess = (payload: string) => ({
  type: EVENT_TEAM_ACTION.REMOVE_MEMBER_SUCCESS,
  payload,
});

export const removeMemberFailure = (payload: string) => ({
  type: EVENT_TEAM_ACTION.REMOVE_MEMBER_FAILURE,
  payload,
});

export const resetTeamState = () => ({
  type: EVENT_TEAM_ACTION.RESET_TEAM_STATE,
});