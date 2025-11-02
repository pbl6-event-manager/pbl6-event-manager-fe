export const FETCH_EVENTS_BY_USER = "FETCH_EVENTS_BY_USER";
export const CLEAR_EVENTS = "CLEAR_EVENTS";
export const FETCH_PUBLIC_EVENTS = "FETCH_EVENTS";
export const FETCH_PENDING_EVENTS = "FETCH_PENDING_EVENTS";
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
import type { EventFormDto } from "../../dtos/event-dto";
import type { EventFormData, GoodToKnowData, LineUpItem, AgendaSection } from "../../models/form-models/event-form-models";
import { createEventService } from "../../service/event-service";

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

export const getPublicEvents = () => {
  const dummyEvents = [
    { id: "e1", title: "Event A", description: "Đây là mô tả cơ bản dành cho sự kiện A", location: "Da Nang, Vietnam", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
    { id: "e2", title: "Event B", description: "Đây là mô tả cơ bản dành cho sự kiện B", location: "Ho Chi Minh City, Vietnam", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
    { id: "e3", title: "Event C", description: "Đây là mô tả cơ bản dành cho sự kiện C", location: "Hanoi, Vietnam", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
  ];
  
  return {
    type: FETCH_PUBLIC_EVENTS,
    payload: dummyEvents
  };
}

export const getPendingEvents = () => {
  const dummyEvents = [
    { id: "e4", title: "Event D", description: "Đây là mô tả cơ bản dành cho sự kiện A", location: "Da Nang, Vietnam", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
    { id: "e5", title: "Event E", description: "Đây là mô tả cơ bản dành cho sự kiện B", location: "Ho Chi Minh City, Vietnam", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
    { id: "e6", title: "Event F", description: "Đây là mô tả cơ bản dành cho sự kiện C", location: "Hanoi, Vietnam", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
  ];
  
  return {
    type: FETCH_PENDING_EVENTS,
    payload: dummyEvents
  };
}

export const clearEvents = () => ({
  type: CLEAR_EVENTS,
});

export const createEvent = (formData: EventFormDto) => async (dispatch: any) => {
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