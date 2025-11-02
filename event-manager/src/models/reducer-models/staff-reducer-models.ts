import type { Staff } from "../bean/staff-models"
import type { StaffRole } from "../bean/staff-role-models"

//#region Reducer Models
export interface StaffsState {
  eventStaffs: Staff[]
  organizerStaffs: Staff[]
  roles: StaffRole[]
  isLoading: boolean
  error: string | null
}

export const DEFAULT_STAFF_STATE: StaffsState = {
    eventStaffs: [],
    organizerStaffs: [],
    roles: [],
    isLoading: false,
    error: null,
};
//#endregion