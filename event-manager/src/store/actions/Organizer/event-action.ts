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

import type { EventData, GoodToKnowData, LineUpItem, AgendaSection } from "../../../models"

export interface SetEventDataAction {
    type: typeof EVENT_ACTIONS.SET_EVENT_DATA,
    payload: EventData
}

export interface UpdateEventFieldAction {
    type: typeof EVENT_ACTIONS.UPDATE_EVENT_FIELD,
    payload: { field: keyof EventData, value: any }
}

export interface UpdateOverviewAction {
    type: typeof EVENT_ACTIONS.UPDATE_OVERVIEW,
    payload: string
}

export interface UpdateGoodToKnowAction {
    type: typeof EVENT_ACTIONS.UPDATE_GOOD_TO_KNOW,
    payload: GoodToKnowData
}

export interface UpdateLineupAction {
    type: typeof EVENT_ACTIONS.UPDATE_LINEUP,
    payload: LineUpItem[]
}

export interface UpdateAgendaAction {
    type: typeof EVENT_ACTIONS.UPDATE_AGENDA,
    payload: AgendaSection[]
}

export interface UpdateDateLocationAction {
   type: typeof EVENT_ACTIONS.UPDATE_DATE_LOCATION,
   payload:  Partial<EventData>
}

export interface ResetEventDataAction {
  type: typeof EVENT_ACTIONS.RESET_EVENT_DATA
}

export interface SaveEventStartAction {
  type: typeof EVENT_ACTIONS.SAVE_EVENT_START
}

export interface SaveEventSuccessAction {
  type: typeof EVENT_ACTIONS.SAVE_EVENT_SUCCESS
  payload: EventData
}

export interface SaveEventFailureAction {
  type: typeof EVENT_ACTIONS.SAVE_EVENT_FAILURE
  payload: string
}

export type EventAction =
  | SetEventDataAction
  | UpdateEventFieldAction
  | UpdateOverviewAction
  | UpdateGoodToKnowAction
  | UpdateLineupAction
  | UpdateAgendaAction
  | UpdateDateLocationAction
  | ResetEventDataAction
  | SaveEventStartAction
  | SaveEventSuccessAction
  | SaveEventFailureAction

//Action Creators
export const setEventData = (payload: EventData) : SetEventDataAction => ({
    type: EVENT_ACTIONS.SET_EVENT_DATA,
    payload,
})

export const updateEventField = (field: keyof EventData, value: any): UpdateEventFieldAction => ({
  type: EVENT_ACTIONS.UPDATE_EVENT_FIELD,
  payload: { field, value },
})

export const updateOverview = (payload: string): UpdateOverviewAction => ({
  type: EVENT_ACTIONS.UPDATE_OVERVIEW,
  payload,
})

export const updateGoodToKnow = (payload: GoodToKnowData): UpdateGoodToKnowAction => ({
  type: EVENT_ACTIONS.UPDATE_GOOD_TO_KNOW,
  payload,
})

export const updateLineup = (payload: LineUpItem[]): UpdateLineupAction => ({
  type: EVENT_ACTIONS.UPDATE_LINEUP,
  payload,
})

export const updateAgenda = (payload: AgendaSection[]): UpdateAgendaAction => ({
  type: EVENT_ACTIONS.UPDATE_AGENDA,
  payload,
})

export const updateDateLocation = (payload: Partial<EventData>): UpdateDateLocationAction => ({
  type: EVENT_ACTIONS.UPDATE_DATE_LOCATION,
  payload,
})

export const resetEventData = (): ResetEventDataAction => ({
  type: EVENT_ACTIONS.RESET_EVENT_DATA,
})

export const saveEventStart = (): SaveEventStartAction => ({
  type: EVENT_ACTIONS.SAVE_EVENT_START,
})

export const saveEventSuccess = (payload: EventData): SaveEventSuccessAction => ({
  type: EVENT_ACTIONS.SAVE_EVENT_SUCCESS,
  payload,
})

export const saveEventFailure = (payload: string): SaveEventFailureAction => ({
  type: EVENT_ACTIONS.SAVE_EVENT_FAILURE,
  payload,
})