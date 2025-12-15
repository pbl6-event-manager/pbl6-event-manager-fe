export interface AttendeeListDto {
    ticketName: string,
    email: string,
    name: string,
    isCheckin: string,
    orderId: number,
    qrCode: string
}

export interface AttendeeInfoDto {
    totalAttendees: number,
    totalCheckedIn: number,
    totalNotCheckedIn: number
}