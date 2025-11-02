import type { OrganizerModel } from "../bean/organizer-models"

export interface OrganizerState {
  organizers: OrganizerModel[]
  currentOrganizer: OrganizerModel | null
  loading: boolean
  error: string | null
}

export const DEFAULT_ORGANIZER_STATE: OrganizerState = {
  organizers: [],
  currentOrganizer: null,
  loading: false,
  error: null,
}