export interface AttendeeListDto {
    ticketName: string,
    email: string,
    name: string,
    isCheckin: string,
    orderId: number
}

export interface AttendeeInfoDto {
    totalAttendees: number,
    totalCheckedIn: number,
    totalNotCheckedIn: number
}