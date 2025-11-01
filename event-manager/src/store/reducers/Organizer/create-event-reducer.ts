import type { CreateEventDTO } from "../../../dtos/event-dto";
import { CREATE_EVENT_ACTIONS } from "../../actions/Organizer/create-event-action";

export interface CreateEventState {
  isLoading: boolean
  error: string | null
  createdEvent: CreateEventDTO | null
  isSuccess: boolean
}

const initialState: CreateEventState = {
  isLoading: false,
  error: null,
  createdEvent: null,
  isSuccess: false,
}

export const createEventReducer = (state = initialState, action: any) : CreateEventState => {
    switch (action.type) {
    case CREATE_EVENT_ACTIONS.CREATE_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        isSuccess: false,
      }

    case CREATE_EVENT_ACTIONS.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        createdEvent: action.payload,
        isSuccess: true,
      }

    case CREATE_EVENT_ACTIONS.CREATE_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isSuccess: false,
      }

    default:
      return state
  }
}

export default createEventReducer