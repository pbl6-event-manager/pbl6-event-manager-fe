import { DEFAULT_ORGANIZER_STATE, type OrganizerState } from "../../models/reducer-models/organizer-reducer-models";
import {
  FETCH_ORGANIZERS_REQUEST,
  DELETE_ORGANIZER_FAILURE,
  DELETE_ORGANIZER_REQUEST,
  DELETE_ORGANIZER_SUCCESS,
  FETCH_ORGANIZERS_FAILURE,
  FETCH_ORGANIZERS_SUCCESS,
  FETCH_ORGANIZER_DETAIL_FAILURE,
  FETCH_ORGANIZER_DETAIL_REQUEST,
  FETCH_ORGANIZER_DETAIL_SUCCESS,
  UPDATE_ORGANIZER_FAILURE,
  UPDATE_ORGANIZER_REQUEST,
  UPDATE_ORGANIZER_SUCCESS,
  CREATE_ORGANIZER_FAILURE,
  CREATE_ORGANIZER_REQUEST,
  CREATE_ORGANIZER_SUCCESS
} from "../actions/organizer-action";

export const organizerReducer = (state = DEFAULT_ORGANIZER_STATE, action: any): OrganizerState => {
  switch (action.type) {
    case FETCH_ORGANIZERS_REQUEST:
    case FETCH_ORGANIZER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case UPDATE_ORGANIZER_REQUEST:

    case FETCH_ORGANIZERS_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: action.payload || [], // ✅ Thêm fallback
        error: null,
      }

    case FETCH_ORGANIZER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        currentOrganizer: action.payload,
        error: null,
      }
    case CREATE_ORGANIZER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case CREATE_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: [...state.organizers, action.payload],
        error: null,
      }
    case CREATE_ORGANIZER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case UPDATE_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: state.organizers.map((org) => (org.id === action.payload.id ? action.payload : org)),
        currentOrganizer: action.payload,
        error: null,
      }
    case DELETE_ORGANIZER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case DELETE_ORGANIZER_SUCCESS:
      return {
        ...state,
        loading: false,
        organizers: state.organizers.filter((org) => org.id !== action.payload),
        error: null,
      }
    case DELETE_ORGANIZER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case FETCH_ORGANIZERS_FAILURE:
    case FETCH_ORGANIZER_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CREATE_ORGANIZER_FAILURE:
    case UPDATE_ORGANIZER_FAILURE:
    default:
      return state
  }
}