import { FETCH_EVENTS_BY_USER, CLEAR_EVENTS, CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILED, GET_ALL_EVENT_ADMIN_REQUEST, GET_ALL_EVENT_ADMIN_SUCCESS, GET_ALL_EVENT_ADMIN_FAILURE, GET_EVENTS_BY_ORGANIZERS_REQUEST, GET_EVENTS_BY_ORGANIZERS_FAILURE, GET_EVENTS_BY_ORGANIZERS_SUCCESS, GET_EVENT_DETAILS_REQUEST, GET_EVENT_DETAILS_SUCCESS, GET_EVENT_DETAILS_FAILURE, APPROVE_REJECT_EVENT_REQUEST, APPROVE_REJECT_EVENT_SUCCESS, APPROVE_REJECT_EVENT_FAILURE 
  ,GET_EVENTS_BY_OWNER_FAILURE, GET_EVENTS_BY_OWNER_REQUEST, GET_EVENTS_BY_OWNER_SUCCESS,
  UPDATE_EVENT_REQUEST, UPDATE_EVENT_SUCCESS, UPDATE_EVENT_FAILURE
} from "../actions/event-action";
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
        eventsByUser: [],
      };
    case GET_ALL_EVENT_ADMIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case GET_ALL_EVENT_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        publishedEvents: action.payload.publishedEvents,
        pendingEvents: action.payload.pendingEvents,
        numberOfEvents: action.payload.numberOfEvents,
        allEvents: action.payload.allEvents,
        eventDashBoardList: action.payload.eventDashBoardDtoList
      }
    case GET_ALL_EVENT_ADMIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
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
    case GET_EVENTS_BY_ORGANIZERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_EVENTS_BY_ORGANIZERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        eventsByUser: action.payload
      }
    case GET_EVENTS_BY_ORGANIZERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case GET_EVENT_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentEvent: action.payload
      }
    case GET_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case APPROVE_REJECT_EVENT_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case APPROVE_REJECT_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        publishedEvents: action.payload.publishedEvents,
        pendingEvents: action.payload.pendingEvents
      }
    case APPROVE_REJECT_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case GET_EVENTS_BY_OWNER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case GET_EVENTS_BY_OWNER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        eventsByUser: action.payload.eventListDto,
        eventSelectionList: action.payload.eventListSelectionDto

      }
    case GET_EVENTS_BY_OWNER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case UPDATE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentEvent: {
          ...state.currentEvent,
          eventInfo: action.payload
        },
        isSuccess: true
      }
    case UPDATE_EVENT_FAILURE:
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

