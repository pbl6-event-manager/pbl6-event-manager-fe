import { EVENT_ACTIONS, type EventAction } from "../../actions/Organizer/event-action";
import type { EventData } from "../../../models";

export interface EventState {
    currentEvent: EventData | null
    isLoading: boolean
    error: string | null
    isSaved: boolean
}

const initialState: EventState = {
  currentEvent: null,
  isLoading: false,
  error: null,
  isSaved: false,
}

export const organizerEventReducer = (state = initialState, action: any) : EventState => {
    switch (action.type) {
    case EVENT_ACTIONS.SET_EVENT_DATA:
      return {
        ...state,
        currentEvent: action.payload,
        error: null,
      }

    case EVENT_ACTIONS.UPDATE_EVENT_FIELD:
      if (!state.currentEvent) return state
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          [action.payload.field]: action.payload.value,
        },
        isSaved: false,
      }

    case EVENT_ACTIONS.UPDATE_OVERVIEW:
      if (!state.currentEvent) return state
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          description: action.payload,
        },
        isSaved: false,
      }

    case EVENT_ACTIONS.UPDATE_GOOD_TO_KNOW:
      if (!state.currentEvent) return state
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          goodToKnowData: action.payload,
        },
        isSaved: false,
      }

    case EVENT_ACTIONS.UPDATE_LINEUP:
      if (!state.currentEvent) return state
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          lineUp: action.payload,
        },
        isSaved: false,
      }

    case EVENT_ACTIONS.UPDATE_AGENDA:
      if (!state.currentEvent) return state
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          agenda: action.payload,
        },
        isSaved: false,
      }

    case EVENT_ACTIONS.UPDATE_DATE_LOCATION:
      if (!state.currentEvent) return state
      return {
        ...state,
        currentEvent: {
          ...state.currentEvent,
          ...action.payload,
        },
        isSaved: false,
      }

    case EVENT_ACTIONS.RESET_EVENT_DATA:
      return initialState

    case EVENT_ACTIONS.SAVE_EVENT_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case EVENT_ACTIONS.SAVE_EVENT_SUCCESS:
      return {
        ...state,
        currentEvent: action.payload,
        isLoading: false,
        isSaved: true,
        error: null,
      }

    case EVENT_ACTIONS.SAVE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isSaved: false,
      }

    default:
      return state
  }
}

export default organizerEventReducer