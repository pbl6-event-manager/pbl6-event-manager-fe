import { FETCH_EVENTS_BY_USER, CLEAR_EVENTS, FETCH_PUBLIC_EVENTS, FETCH_PENDING_EVENTS } from "../../actions/Admin/event-action";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
}

interface EventState {
  eventsByUser: {
    [email: string]: Event[]; 
  };
  publicEvents: any[];
  pendingEvents: any[];
}

const initialState: EventState = {
  eventsByUser: {},
  publicEvents: [],
  pendingEvents: [],
};

const eventReducer = (state = initialState, action: any): EventState => {
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
    default:
      return state;
  }
};

export default eventReducer;
