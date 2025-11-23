import type { EventStaffDtoAdmin } from "../dtos/event-staff-dto";
import type { EventStaffModelAdmin } from "../models/bean/event-staff-models";

export const convertEventStaffAdminModelToEventStaffAdminDto = (raw: EventStaffModelAdmin) : EventStaffDtoAdmin => ({
    id: raw.user.id,
    avatarUrl: raw.user.avatarUrl,
    firstName: raw.user.firstName,
    lastName: raw.user.lastName,
    phone: raw.user.phone,
    roleStaff: raw.roleStaff.name
})