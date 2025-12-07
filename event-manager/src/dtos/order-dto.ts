import type { TicketInfoDto } from "./ticket-dto";

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
    status: string,
    tickets?: TicketInfoDto[],
    eventTitle?: string
}

export type SEARCH_TIME_ENUM =
    | "LAST_24_HOURS"
    | "LAST_7_DAYS"
    | "LAST_30_DAYS"
    | "THIS_MONTH"
    | "LAST_MONTH"
    | "THIS_YEAR"
    | "LAST_YEAR";

export type SEARCH_BY_ENUM =
    | "--"
    | "BUYER"
    | "EMAIL"
    | "ORDER_ID";

export interface OrderSearchParamsDto {
    searchValue?: string;
    eventId?: number;
    searchTime: SEARCH_TIME_ENUM;
    searchBy?: SEARCH_BY_ENUM;
}
