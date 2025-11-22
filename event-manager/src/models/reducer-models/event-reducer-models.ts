import type { EventDashBoardDto, EventListDto } from "../../dtos/event-dto";

export interface EventState {
  eventsByUser: EventListDto[]; 
  currentEvent: any | null;
  createEvent: EventListDto | null;
  publishedEvents: EventListDto[];
  pendingEvents: EventListDto[];
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  isSaved: boolean;
  numberOfEvents: number;
  allEvents: EventListDto[];
  eventDashBoardList: EventDashBoardDto[];
}

export const DEFAULT_EVENT_STATE: EventState = {
  eventsByUser: [],
  publishedEvents: [],
  pendingEvents: [],
  createEvent: null,
  currentEvent: null,
  isLoading: false,
  error: null,
  isSuccess: false,
  isSaved: false,
  numberOfEvents: 0,
  allEvents: [],
  eventDashBoardList: [],
};