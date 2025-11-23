import type { EventStaffModelAdmin } from "../models/bean/event-staff-models"
import { mapToRoleStaffModel } from "./role-staff-mapper"
import { mapToUserModel } from "./user-mapper"

export const mapResponseToEventStaffModelAdmin = (raw: any) : EventStaffModelAdmin => ({
    user: mapToUserModel(raw.user),
    roleStaff: mapToRoleStaffModel(raw.roleStaff)
})