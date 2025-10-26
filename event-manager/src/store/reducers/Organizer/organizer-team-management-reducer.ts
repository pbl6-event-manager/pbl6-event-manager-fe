import { ORGANIZER_TEAM_ACTIONS } from "../../actions/Organizer/organizer-team-management-action"
import type { TeamMember } from "../../../models/team-models"

export interface OrganizerTeamState {
  members: TeamMember[]
  isLoading: boolean
  error: string | null
}

const initialState: OrganizerTeamState = {
  members: [],
  isLoading: false,
  error: null,
}

export const organizerTeamManagementReducer = (state = initialState, action: any): OrganizerTeamState => {
  switch (action.type) {
    case ORGANIZER_TEAM_ACTIONS.FETCH_TEAM_MEMBERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.FETCH_TEAM_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
        isLoading: false,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.FETCH_TEAM_MEMBERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case ORGANIZER_TEAM_ACTIONS.INVITE_MEMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.INVITE_MEMBER_SUCCESS:
      return {
        ...state,
        members: [...state.members, action.payload],
        isLoading: false,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.INVITE_MEMBER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case ORGANIZER_TEAM_ACTIONS.REMOVE_TEAM_MEMBER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.REMOVE_TEAM_MEMBER_SUCCESS:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
        isLoading: false,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.REMOVE_TEAM_MEMBER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case ORGANIZER_TEAM_ACTIONS.UPDATE_MEMBER_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.UPDATE_MEMBER_ROLE_SUCCESS:
      return {
        ...state,
        members: state.members.map((member) => (member.id === action.payload.id ? action.payload : member)),
        isLoading: false,
        error: null,
      }

    case ORGANIZER_TEAM_ACTIONS.UPDATE_MEMBER_ROLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case ORGANIZER_TEAM_ACTIONS.RESET_ORGANIZER_TEAM_STATE:
      return initialState

    default:
      return state
  }
}

export default organizerTeamManagementReducer
