export interface EventState {
  eventsByUser: {
    [email: string]: any[]; 
  };
  currentEvent: any | null;
  createEvent: any | null;
  publicEvents: any[];
  pendingEvents: any[];
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export const DEFAULT_EVENT_STATE: EventState = {
  eventsByUser: {},
  publicEvents: [],
  pendingEvents: [],
  createEvent: null,
  currentEvent: null,
  isLoading: false,
  error: null,
  isSuccess: false
};