import type { ListOrganizerDto } from "../../dtos/organizer-dto"

export interface OrganizerState {
  organizers: ListOrganizerDto[],
  organizerForPublish: ListOrganizerDto[],
  currentOrganizer: any | null
  loading: boolean
  error: string | null
}

export const DEFAULT_ORGANIZER_STATE: OrganizerState = {
  organizers: [],
  organizerForPublish: [],
  currentOrganizer: null,
  loading: false,
  error: null,
}