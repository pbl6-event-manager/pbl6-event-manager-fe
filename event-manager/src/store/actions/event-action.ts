export const FETCH_EVENTS_BY_USER = "FETCH_EVENTS_BY_USER";
export const CLEAR_EVENTS = "CLEAR_EVENTS";
export const CREATE_EVENT_REQUEST = "CREATE_EVENT_REQUEST";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_REQUEST";
export const CREATE_EVENT_FAILED = "CREATE_EVENT_FAILED";
export const EVENT_UI_ACTIONS = {
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
export const GET_ALL_EVENT_ADMIN_REQUEST = "GET_ALL_EVENT_ADMIN_REQUEST";
export const GET_ALL_EVENT_ADMIN_SUCCESS = "GET_ALL_EVENT_ADMIN_SUCCESS";
export const GET_ALL_EVENT_ADMIN_FAILURE = "GET_ALL_EVENT_ADMIN_FAILURE";
export const GET_EVENTS_BY_ORGANIZERS_REQUEST = "GET_EVENTS_BY_ORGANIZERS_REQUEST";
export const GET_EVENTS_BY_ORGANIZERS_SUCCESS = "GET_EVENTS_BY_ORGANIZERS_SUCCESS";
export const GET_EVENTS_BY_ORGANIZERS_FAILURE = "GET_EVENTS_BY_ORGANIZERS_FAILURE";
export const GET_EVENT_DETAILS_REQUEST = "GET_EVENT_DETAILS_REQUEST";
export const GET_EVENT_DETAILS_SUCCESS = "GET_EVENT_DETAILS_SUCCESS";
export const GET_EVENT_DETAILS_FAILURE = "GET_EVENT_DETAILS_FAILURE";
export const APPROVE_REJECT_EVENT_REQUEST = "APPROVE_REJECT_EVENT_REQUEST";
export const APPROVE_REJECT_EVENT_SUCCESS = "APPROVE_REJECT_EVENT_SUCCESS";
export const APPROVE_REJECT_EVENT_FAILURE = "APPROVE_REJECT_EVENT_FAILURE";
export const GET_EVENTS_BY_OWNER_REQUEST = "GET_EVENTS_BY_OWNER_REQUEST";
export const GET_EVENTS_BY_OWNER_SUCCESS = "GET_EVENTS_BY_OWNER_SUCCESS";
export const GET_EVENTS_BY_OWNER_FAILURE = "GET_EVENTS_BY_OWNER_FAILURE";
export const UPDATE_EVENT_REQUEST = "UPDATE_EVENT_REQUEST";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

import type { EventFormDto, EventListDto, EventSelectionDto } from "../../dtos/event-dto";
import { EVENT_STATUS } from "../../dtos/event-dto";
import type { EventFormData, GoodToKnowData, LineUpItem, AgendaSection } from "../../models/form-models/event-form-models";
import { approveRejectEventService, createEventService, getAllEventsAdminService, getEventDetailsByIdService, updateEventService, getEventsByOrganizerIdsService, getEventsByOwnerService } from "../../service/event-service";
import { store } from "../store";

export const getAllEventsAdmin = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_ALL_EVENT_ADMIN_REQUEST
    })

    const response = await getAllEventsAdminService();
    const allEvents = response.eventListDtoList;
    const eventDashBoardDtoList = response.eventDashBoardDtoList;
    const publishedEvents = response.eventListDtoList.filter((e: EventListDto) => e.status === EVENT_STATUS.PUBLISHED);
    const pendingEvents = response.eventListDtoList.filter((e: EventListDto) => e.status === EVENT_STATUS.PENDING);

    const numberOfEvents = response.eventListDtoList.length;

    dispatch({
      type: GET_ALL_EVENT_ADMIN_SUCCESS,
      payload: {
        publishedEvents,
        pendingEvents,
        numberOfEvents,
        allEvents,
        eventDashBoardDtoList
      }
    })
  } catch (error: any) {
    dispatch({
      type: CREATE_EVENT_FAILED,
      payload:
        error.response?.data?.message || error.message || "Create event failed",
    });
    throw error;
  }
}

export const getEventsByOrganizerIds = (organizerIds: number[]) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_EVENTS_BY_ORGANIZERS_REQUEST
    })

    const response = await getEventsByOrganizerIdsService(organizerIds);

    dispatch({
      type: GET_EVENTS_BY_ORGANIZERS_SUCCESS,
      payload: response
    })
  } catch (error: any) {
    dispatch({
      type: CREATE_EVENT_FAILED,
      payload:
        error.response?.data?.message || error.message || "Create event failed",
    });
    throw error;
  }
}

export const approveRejectEvent = (eventId: number, isApprove: boolean) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPROVE_REJECT_EVENT_REQUEST
    })

    const response = await approveRejectEventService(eventId, isApprove);
    let pendingEvents: EventListDto[] = Array.isArray(store.getState().eventReducer.pendingEvents) ? [...store.getState().eventReducer.pendingEvents] : [];
    let publishedEvents: any[] = Array.isArray(store.getState().eventReducer.publishedEvents) ? [...store.getState().eventReducer.publishedEvents] : [];
    let removedEvent = null;
    if(response) {
      const pendingIndex = pendingEvents.findIndex((e: any) => Number(e?.id) === Number(eventId));
      removedEvent = pendingEvents.splice(pendingIndex, 1)[0];
    }

    if(isApprove) {
      publishedEvents = [removedEvent, ...publishedEvents].sort((a , b) => a.id - b.id);
    }

    dispatch({
      type: APPROVE_REJECT_EVENT_SUCCESS,
      payload: {
        publishedEvents,
        pendingEvents
      },
    });
    
    return response;
  } catch (error: any) {
    dispatch({
      type: APPROVE_REJECT_EVENT_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Approve event failed",
    });
    throw error;
  }
}

export const getEventDetailsById = (eventId: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_EVENT_DETAILS_REQUEST,
    })

    const response = await getEventDetailsByIdService(eventId);

    dispatch({
      type: GET_EVENT_DETAILS_SUCCESS,
      payload: response
    })

    return response;
  } catch (error: any) {
    dispatch({
      type: GET_EVENT_DETAILS_FAILURE,
      payload:
        error.response?.data?.message || error.message || "Failed to get detailed informations of event",
    });
    throw error;
  }
}

export const clearEvents = () => ({
  type: CLEAR_EVENTS,
});

export const createNewEvent = (formData: EventFormDto) => async (dispatch: any) => {
  try {
    dispatch({
      type: CREATE_EVENT_REQUEST
    });
    const result = await createEventService(formData);    
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: result
    })
  } catch (error: any) {
    dispatch({
      type: CREATE_EVENT_FAILED,
      payload:
        error.response?.data?.message || error.message || "Create event failed",
    });
    throw error;
  }
}

export const updateEvent = (eventId: number, formData: EventFormDto) => async (dispatch: any) => {
  try {
    dispatch({
      type: UPDATE_EVENT_REQUEST
    });
    
    const result = await updateEventService(eventId, formData);
    
    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: result
    });
  } catch (error) {
    
  }
}

export const getEventsByOwner = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_EVENTS_BY_OWNER_REQUEST,
    });
    
    const { eventListDto, organizerEventsListItem } = await getEventsByOwnerService();
    const eventListSelectionDto : EventSelectionDto[] = eventListDto.filter((e) => e.status === EVENT_STATUS.PUBLISHED);

    dispatch({
      type: GET_EVENTS_BY_OWNER_SUCCESS,
      payload: {
        eventListDto,
        eventListSelectionDto
      },
    });
    
    return organizerEventsListItem;
    
  } catch (error: any) {
    dispatch({
      type: GET_EVENTS_BY_OWNER_FAILURE,
      payload: error.response?.data?.message || error.message || "Failed to get events by owner",
    });
    throw error;
  }
}

//#region UI Action
export const setEventData = (payload: EventFormData)  => ({
    type: EVENT_UI_ACTIONS.SET_EVENT_DATA,
    payload,
})

export const updateEventField = (field: keyof EventFormData, value: any) => ({
  type: EVENT_UI_ACTIONS.UPDATE_EVENT_FIELD,
  payload: { field, value },
})

export const updateOverview = (payload: string) => ({
  type: EVENT_UI_ACTIONS.UPDATE_OVERVIEW,
  payload,
})

export const updateGoodToKnow = (payload: GoodToKnowData) => ({
  type: EVENT_UI_ACTIONS.UPDATE_GOOD_TO_KNOW,
  payload,
})

export const updateLineup = (payload: LineUpItem[]) => ({
  type: EVENT_UI_ACTIONS.UPDATE_LINEUP,
  payload,
})

export const updateAgenda = (payload: AgendaSection[]) => ({
  type: EVENT_UI_ACTIONS.UPDATE_AGENDA,
  payload,
})

export const updateDateLocation = (payload: Partial<EventFormData>) => ({
  type: EVENT_UI_ACTIONS.UPDATE_DATE_LOCATION,
  payload,
})

export const resetEventData = () => ({
  type: EVENT_UI_ACTIONS.RESET_EVENT_DATA,
})

export const saveEventStart = () => ({
  type: EVENT_UI_ACTIONS.SAVE_EVENT_START,
})

export const saveEventSuccess = (payload: EventFormData) => ({
  type: EVENT_UI_ACTIONS.SAVE_EVENT_SUCCESS,
  payload,
})

export const saveEventFailure = (payload: string) => ({
  type: EVENT_UI_ACTIONS.SAVE_EVENT_FAILURE,
  payload,
})
//#endregion