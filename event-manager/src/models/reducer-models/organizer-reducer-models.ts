import type { OrganizerFormData } from "../form-models/organizer-form-models"

export interface OrganizerState {
  organizers: OrganizerFormData[]
  currentOrganizer: OrganizerFormData | null
  loading: boolean
  error: string | null
}

export const DEFAULT_ORGANIZER_STATE: OrganizerState = {
  organizers: [],
  currentOrganizer: null,
  loading: false,
  error: null,
}