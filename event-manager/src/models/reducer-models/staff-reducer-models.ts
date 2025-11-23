//import type { Staff } from "../bean/owner-staff-models"
import type { StaffDto } from "../../dtos/staff-dto"
import type { RoleStaffDto } from "../../dtos/role-staff-dto"
import type { EventStaffDtoAdmin } from "../../dtos/event-staff-dto"

//#region Reducer Models
export interface StaffsState {
  eventStaffs: StaffDto[]
  organizerStaffs: StaffDto[]
  eventStaffsAdmin: EventStaffDtoAdmin[],
  roles: RoleStaffDto[]
  isLoading: boolean
  error: string | null
}

export const DEFAULT_STAFF_STATE: StaffsState = {
    eventStaffs: [],
    organizerStaffs: [],
    eventStaffsAdmin: [],
    roles: [],
    isLoading: false,
    error: null,
};
//#endregion