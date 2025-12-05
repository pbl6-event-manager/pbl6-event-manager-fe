import type { ListOrganizerDto } from "../../dtos/organizer-dto"

export interface OrganizerState {
  organizers: ListOrganizerDto[]
  currentOrganizer: any | null
  loading: boolean
  error: string | null
}

export const DEFAULT_ORGANIZER_STATE: OrganizerState = {
  organizers: [],
  currentOrganizer: null,
  loading: false,
  error: null,
}