import type { EventData, GoodToKnowData, LineUpItem, AgendaSection } from "../../../models"

//Event Actions for Organizer
export const EVENT_ACTIONS = {

    SET_EVENT_DATA: "SET_EVENT_DATA",
    UPDATE_EVENT_FIELD: "UPDATE_EVENT_FIELD",
    UPDATE_OVERVIEW: "UPDATE_OVERVIEW",
    UPDATE_GOOD_TO_KNOW: "UPDATE_GOOD_TO_KNOW",
    UPDATE_LINEUP: "UPDATE_LINEUP",
    UPDATE_AGENDA: "UPDATE_AGENDA",
    UPDATE_DATE_LOCATION: "UPDATE_DATE_LOCATION",
    RESET_EVENT_DATA: "RESET_EVENT_DATA",
    SAVE_EVENT_START: "SAVE_EVENT_START",
    SAVE_EVENT_SUCCESS: "SAVE_EVENT_SUCCESS",
    SAVE_EVENT_FAILURE: "SAVE_EVENT_FAILURE"
} as const

export const setEventData = (payload: EventData)  => ({
    type: EVENT_ACTIONS.SET_EVENT_DATA,
    payload,
})

export const updateEventField = (field: keyof EventData, value: any) => ({
  type: EVENT_ACTIONS.UPDATE_EVENT_FIELD,
  payload: { field, value },
})

export const updateOverview = (payload: string) => ({
  type: EVENT_ACTIONS.UPDATE_OVERVIEW,
  payload,
})

export const updateGoodToKnow = (payload: GoodToKnowData) => ({
  type: EVENT_ACTIONS.UPDATE_GOOD_TO_KNOW,
  payload,
})

export const updateLineup = (payload: LineUpItem[]) => ({
  type: EVENT_ACTIONS.UPDATE_LINEUP,
  payload,
})

export const updateAgenda = (payload: AgendaSection[]) => ({
  type: EVENT_ACTIONS.UPDATE_AGENDA,
  payload,
})

export const updateDateLocation = (payload: Partial<EventData>) => ({
  type: EVENT_ACTIONS.UPDATE_DATE_LOCATION,
  payload,
})

export const resetEventData = () => ({
  type: EVENT_ACTIONS.RESET_EVENT_DATA,
})

export const saveEventStart = () => ({
  type: EVENT_ACTIONS.SAVE_EVENT_START,
})

export const saveEventSuccess = (payload: EventData) => ({
  type: EVENT_ACTIONS.SAVE_EVENT_SUCCESS,
  payload,
})

export const saveEventFailure = (payload: string) => ({
  type: EVENT_ACTIONS.SAVE_EVENT_FAILURE,
  payload,
})