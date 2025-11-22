import type { StaffDto } from "../../dtos/staff-dto"
import type { RoleStaffDto } from "../../dtos/role-staff-dto"

//#region Reducer Models
export interface StaffsState {
  eventStaffs: StaffDto[]
  organizerStaffs: StaffDto[]
  roles: RoleStaffDto[]
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