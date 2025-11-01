import type { CreateEventDTO, EventFormDTO } from "../../../dtos/event-dto"
import { eventService } from "../../../service/event-service"

//Create Event Actions for Organizer
export const CREATE_EVENT_ACTIONS = {
    CREATE_EVENT_REQUEST: "CREATE_EVENT_REQUEST",
    CREATE_EVENT_SUCCESS: "CREATE_EVENT_SUCCESS",
    CREATE_EVENT_FAILURE: "CREATE_EVENT_FAILURE",
} as const

//Action Creators
export const createEventRequest = () => ({
  type: CREATE_EVENT_ACTIONS.CREATE_EVENT_REQUEST,
})
export const createEventSuccess = (payload: CreateEventDTO) => ({
  type: CREATE_EVENT_ACTIONS.CREATE_EVENT_SUCCESS,
  payload
})
export const createEventFailure = (payload: string) => ({
  type: CREATE_EVENT_ACTIONS.CREATE_EVENT_FAILURE,
  payload,
})
// ============ Async Thunk ============
/**
 * Thunk for creating event
 * Dispatches REQUEST → calls service → dispatches SUCCESS or FAILURE
 */
export const createEventThunk = (formData: EventFormDTO) => async (dispatch: any) => {
  try {
    dispatch(createEventRequest())
    const result = await eventService.createEvent(formData)
    dispatch(createEventSuccess(result))
    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create event"
    dispatch(createEventFailure(errorMessage))
    throw error
  }
}