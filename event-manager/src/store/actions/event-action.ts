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
import type { EventFormDto, EventListDto } from "../../dtos/event-dto";
import type { EventFormData, GoodToKnowData, LineUpItem, AgendaSection } from "../../models/form-models/event-form-models";
import { createEventService, getAllEventsAdminService, getEventsByOrganizerIdsService } from "../../service/event-service";

export const fetchEventsByUser = (email: string) => {
  const dummyEvents = [
    { id: "e1", name: "Sự kiện A", date: "2025-09-01", location: "Hà Nội" },
    { id: "e2", name: "Sự kiện B", date: "2025-09-05", location: "TP.HCM" },
  ];

  return {
    type: FETCH_EVENTS_BY_USER,
    payload: { email, events: dummyEvents },
  };
};

export const getAllEventsAdmin = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_ALL_EVENT_ADMIN_REQUEST
    })

    const response = await getAllEventsAdminService();
    const publishedEvents = response.filter((e: EventListDto) => e.status === "PUBLISHED");
    const pendingEvents = response.filter((e: EventListDto) => e.status !== "PUBLISHED");

    dispatch({
      type: GET_ALL_EVENT_ADMIN_SUCCESS,
      payload: {
        publishedEvents,
        pendingEvents
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