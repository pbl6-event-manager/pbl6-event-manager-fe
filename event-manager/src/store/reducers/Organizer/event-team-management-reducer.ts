import { EVENT_TEAM_ACTION } from "../../actions/Organizer/event-team-management-action";
import type { TeamMember } from "../../../models/team-models";

export interface EventTeamState {
    eventMembers: TeamMember[];
    organizerMembers: TeamMember[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EventTeamState = {
    eventMembers: [],
    organizerMembers: [],
    isLoading: false,
    error: null,
};

export const eventTeamManagementReducer = (state = initialState, action: any): EventTeamState => {
    switch (action.type) {
        case EVENT_TEAM_ACTION.FETCH_EVENT_MEMBERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case EVENT_TEAM_ACTION.FETCH_EVENT_MEMBERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventMembers: action.payload,
            };
        case EVENT_TEAM_ACTION.FETCH_EVENT_MEMBERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EVENT_TEAM_ACTION.FETCH_ORGANIZER_MEMBERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case EVENT_TEAM_ACTION.FETCH_ORGANIZER_MEMBERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                organizerMembers: action.payload,
                error: null,
            };
        case EVENT_TEAM_ACTION.FETCH_ORGANIZER_MEMBERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EVENT_TEAM_ACTION.ASSIGN_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case EVENT_TEAM_ACTION.ASSIGN_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventMembers: [...state.eventMembers, action.payload],
                error: null,
            };
        case EVENT_TEAM_ACTION.ASSIGN_MEMBER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EVENT_TEAM_ACTION.REMOVE_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case EVENT_TEAM_ACTION.REMOVE_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventMembers: state.eventMembers.filter(member => member.id !== action.payload),
                error: null,
            };
        case EVENT_TEAM_ACTION.REMOVE_MEMBER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case EVENT_TEAM_ACTION.RESET_TEAM_STATE:
            return initialState;
        default:
            return state;
    }
}

export default eventTeamManagementReducer;