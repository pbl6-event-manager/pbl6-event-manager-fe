import type { OrganizerProfile } from "../../../models/organizer-models";
import { ORGANIZER_ACTIONS } from "../../actions/Organizer/organizer-action";

interface OrganizerState {
  organizers: OrganizerProfile[]
  currentOrganizer: OrganizerProfile | null
  loading: boolean
  error: string | null
}

const initialState: OrganizerState = {
  organizers: [],
  currentOrganizer: null,
  loading: false,
  error: null,
}

const organizerReducer = (state = initialState, action: any): OrganizerState => {
  switch (action.type) {
    case ORGANIZER_ACTIONS.FETCH_ORGANIZERS_REQUEST:
    case ORGANIZER_ACTIONS.FETCH_ORGANIZER_DETAIL_REQUEST:
    case ORGANIZER_ACTIONS.CREATE_ORGANIZER_REQUEST:
    case ORGANIZER_ACTIONS.UPDATE_ORGANIZER_REQUEST:
    case ORGANIZER_ACTIONS.DELETE_ORGANIZER_REQUEST:
    case ORGANIZER_ACTIONS.FOLLOW_ORGANIZER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case ORGANIZER_ACTIONS.FETCH_ORGANIZERS_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: action.payload,
        error: null,
      }

    case ORGANIZER_ACTIONS.FETCH_ORGANIZER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrganizer: action.payload,
        error: null,
      }

    case ORGANIZER_ACTIONS.CREATE_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: [...state.organizers, action.payload],
        error: null,
      }

    case ORGANIZER_ACTIONS.UPDATE_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: state.organizers.map((org) => (org.id === action.payload.id ? action.payload : org)),
        currentOrganizer: action.payload,
        error: null,
      }

    case ORGANIZER_ACTIONS.DELETE_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: state.organizers.filter((org) => org.id !== action.payload),
        error: null,
      }

    case ORGANIZER_ACTIONS.FOLLOW_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrganizer: state.currentOrganizer
          ? {
              ...state.currentOrganizer,
              followerCount: state.currentOrganizer.followerCount + 1,
            }
          : null,
        error: null,
      }

    case ORGANIZER_ACTIONS.FETCH_ORGANIZERS_FAILURE:
    case ORGANIZER_ACTIONS.FETCH_ORGANIZER_DETAIL_FAILURE:
    case ORGANIZER_ACTIONS.CREATE_ORGANIZER_FAILURE:
    case ORGANIZER_ACTIONS.UPDATE_ORGANIZER_FAILURE:
    case ORGANIZER_ACTIONS.DELETE_ORGANIZER_FAILURE:
    case ORGANIZER_ACTIONS.FOLLOW_ORGANIZER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default organizerReducer