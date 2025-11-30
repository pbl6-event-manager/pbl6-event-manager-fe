import type { CreateTicketRequestDto, TicketDto } from "../dtos/ticket-dto";
import type { TicketFormData, TicketListItem } from "../models/form-models/ticket-form-models";
import { isTicketOnSale } from "../utils/Organizer/ticket-util";
import type { TicketModel } from "../models/bean/ticket-models";
import type { TicketType } from "../models/form-models/ticket-form-models";

export const convertToTicketDto = (model: TicketModel): TicketDto => ({
    id: model.id,
    eventId: model.eventId,
    name: model.name,
    type: model.type,
    price: model.price,
    quantity: model.quantity,
    soldQuantity: model.soldQuantity,
    description: model.description,
    saleStartDate: model.saleStartDate instanceof Date 
        ? model.saleStartDate.toISOString() 
        : model.saleStartDate,
    saleEndDate: model.saleEndDate instanceof Date 
        ? model.saleEndDate.toISOString() 
        : model.saleEndDate,
});

export const convertToTicketListItem = (dto: TicketDto): TicketListItem => {
    const saleEndDate = new Date(dto.saleEndDate);
    const formattedDate = saleEndDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const formattedTime = saleEndDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return {
        ticketID: dto.id,
        nameTicket: dto.name,
        price: dto.price,
        currency: "USD", // Default currency, can be extended
        quantityTotal: dto.quantity,
        onSale: isTicketOnSale(dto),
        sold: dto.soldQuantity,
        salesEndDate: `${formattedDate} at ${formattedTime}`,
    };
};

export const convertToTicketFormData = (dto: TicketDto): TicketFormData => {
    const saleStartDate = new Date(dto.saleStartDate);
    const saleEndDate = new Date(dto.saleEndDate);

    return {
        name: dto.name,
        type: dto.type === "PAID" ? "paid" : "free",
        price: dto.price,
        currency: "USD",
        availableQuantity: dto.quantity,
        salesStart: saleStartDate.toISOString().split("T")[0],
        salesStartTime: saleStartDate.toTimeString().slice(0, 5),
        salesEnd: saleEndDate.toISOString().split("T")[0],
        salesEndTime: saleEndDate.toTimeString().slice(0, 5),
        description: dto.description,
        visibility: "visible",
        minQuantity: 1,
        maxQuantity: 10,
        salesChannel: "everywhere",
        eTicket: true,
        willCall: false,
    };
};

export const convertFormDataToCreateRequest = (
    eventId: number,
    formData: TicketFormData
): CreateTicketRequestDto => {
    // Combine date and time into ISO datetime string
    const saleStartDateTime = new Date(`${formData.salesStart}T${formData.salesStartTime}:00`).toISOString();
    const saleEndDateTime = new Date(`${formData.salesEnd}T${formData.salesEndTime}:00`).toISOString();

    return {
        eventId: eventId.toString(),
        name: formData.name,
        type: formData.type === "paid" ? "PAID" : "FREE",
        price: formData.type === "paid" ? formData.price : 0,
        quantity: formData.availableQuantity,
        description: formData.description || "",
        saleStartDate: saleStartDateTime,
        saleEndDate: saleEndDateTime,
    };
};

export const converTicketModelToTicketType = (ticketModel: TicketModel): TicketType => {
    return {
        ticketID: ticketModel.id,
        nameTicket: ticketModel.name,
        price: ticketModel.price,
        quantityTotal: ticketModel.quantity,
        currency: "USD",
    };
};

export const convertTicketDtoToTicketType = (ticketDto: TicketDto): TicketType => {
    return {
        ticketID: ticketDto.id,
        nameTicket: ticketDto.name,
        price: ticketDto.price,
        quantityTotal: ticketDto.quantity,
        currency: "USD",
    };
};