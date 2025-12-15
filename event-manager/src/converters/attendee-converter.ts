import type { AttendeeInfoDto, AttendeeListDto } from "../dtos/attendee-dto";

export const convertResponseToAttendeeInfoDto = (raw: AttendeeListDto[]) : AttendeeInfoDto => {
    return {
        totalAttendees: raw.length,
        totalCheckedIn: raw.filter((a) => a.isCheckin.toString() === "true").length,
        totalNotCheckedIn: raw.filter((a) => a.isCheckin.toString() === "false").length,
    }
}

export const convertResponseToAttendeeListDto = (raw: any) : AttendeeListDto => {
    return {
        ticketName: raw.ticketName,
        name: raw.fullName,
        email: raw.email,
        isCheckin: raw.isCheckin.toString(),
        orderId: raw.orderId
    }
}