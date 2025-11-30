//#region Ticket Form Data
export interface TicketFormData {
  name: string
  type: "paid" | "free"
  price: number
  currency: string
  availableQuantity: number
  salesStart: string
  salesStartTime: string
  salesEnd: string
  salesEndTime: string
  description?: string
  visibility: "visible" | "hidden"
  minQuantity: number
  maxQuantity: number
  salesChannel: string
  eTicket: boolean
  willCall: boolean
}

export interface TicketType {
  ticketID: number
  nameTicket: string
  price: number
  currency: string,
  quantityTotal: number
}

export interface TicketListItem extends TicketType {
  onSale: boolean
  sold: number
  salesEndDate: string
}
//#endregion