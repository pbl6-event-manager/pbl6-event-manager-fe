export interface OrderListAdminDto {
    id: number,
    createdAt: string,
    eventId: number,
    quantity: number,
    total: string,
    status: string
}

export interface OrderListDto {
    id: number,
    buyerName: string,
    buyerEmail: string,
    createdAt: string,
    eventId: number,
    quantity: number,
    total: string,
    status: string
}