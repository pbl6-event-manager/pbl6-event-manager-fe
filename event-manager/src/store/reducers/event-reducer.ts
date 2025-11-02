import { FETCH_EVENTS_BY_USER, CLEAR_EVENTS, FETCH_PUBLIC_EVENTS, FETCH_PENDING_EVENTS, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILED } from "../actions/event-action";
import { DEFAULT_EVENT_STATE, type EventState } from "../../models/reducer-models/event-reducer-models";

export const eventReducer = (state = DEFAULT_EVENT_STATE, action: any): EventState => {
  switch (action.type) {
    case FETCH_EVENTS_BY_USER:
      return {
        ...state,
        eventsByUser: {
          ...state.eventsByUser,
          [action.payload.email]: action.payload.events,
        },
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        eventsByUser: {},
      };
    case FETCH_PUBLIC_EVENTS:
      return {
        ...state,
        publicEvents: action.payload
      };
    case FETCH_PENDING_EVENTS:
      return {
        ...state,
        pendingEvents: action.payload
      };
    case CREATE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createEvent: action.payload,
        isSuccess: true
      }
    case CREATE_EVENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isSuccess: false
      }
    default:
      return state;
  }
};

