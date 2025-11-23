import { createANewTicket, getTicketsByEventId, getTicketById, updateTicketById, deleteTicketById } from "../api/ticket-api";
import type { CreateTicketRequestDto, TicketDto } from "../dtos/ticket-dto";
import { mapToTicketModel } from "../mappers/ticket-mapper";
import { convertToTicketDto, convertToTicketListItem } from "../converters/ticket-converter";

export const createANewTicketService = async (eventId: number, ticketData: CreateTicketRequestDto) => {
    try {
        console.log("[TicketService] Creating ticket:", { eventId, ticketData });

        const response = await createANewTicket(eventId, ticketData);
        console.log("[TicketService] Create ticket response:", response);
        const rawTicketResponse = response.data.data;
        if (response.data.status && response.data.message === "success") {
            console.log("[TicketService] Ticket created successfully");
            const ticketModel = mapToTicketModel(rawTicketResponse);
            console.log("[TicketService] Mapped ticket model:", ticketModel);
            const ticketDto: TicketDto = convertToTicketDto(ticketModel);
            console.log("[TicketService] Converted ticket DTO:", ticketDto);
            return ticketDto;
        } else {
            throw new Error(response.data.message || "Failed to create ticket");
        }

    } catch (error: any) {
        console.error("[TicketService] Create ticket error:", error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            "Failed to create ticket"
        );
    }
}

export const getTicketsByEventIdService = async (eventId: number) => {
    try {
        console.log("[TicketService] Fetching tickets for event:", eventId);

        const response = await getTicketsByEventId(eventId);
        
        console.log("[TicketService] Get tickets response:", response);
        if (response.data.status && response.data.message === "success") {
            const rawTickets = response.data.data
            const ticketModels = rawTickets.map((ticketData: any) => mapToTicketModel(ticketData));
            console.log("[TicketService] Mapped ticket models:", ticketModels);
            const ticketDtos: TicketDto[] = ticketModels.map((ticketModel: any) => convertToTicketDto(ticketModel));
            console.log("[TicketService] Converted ticket DTOs:", ticketDtos);
            const ticketListItems = ticketDtos.map((dto) => convertToTicketListItem(dto));
            console.log("[TicketService] Converted ticket list items:", ticketListItems);
            return { ticketDtos, ticketListItems };
        } else {
            throw new Error(response.data.message || "Failed to fetch tickets");
        }
    } catch (error: any) {
        console.error("[TicketService] Get tickets error:", error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            "Failed to fetch tickets"
        );
    }
}

export const getTicketByIdService = async (eventId: number, ticketId: number) => {
    try {
        console.log("[TicketService] Fetching ticket:", { eventId, ticketId });

        const response = await getTicketById(ticketId, eventId);
        
        console.log("[TicketService] Get ticket response:", response);
        if (response.data.status && response.data.message === "success") {
            const rawTicket = response.data.data;
            const ticketModel = mapToTicketModel(rawTicket);
            const ticketDto: TicketDto = convertToTicketDto(ticketModel);
            console.log("[TicketService] Converted ticket DTO:", ticketDto);
            return ticketDto;
        } else {
            throw new Error(response.data.message || "Failed to fetch ticket");
        }
    } catch (error: any) {
        console.error("[TicketService] Get ticket error:", error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            "Failed to fetch ticket"
        );
    }
}

export const updateTicketByIdService = async (eventId: number, ticketId: number, ticketData: CreateTicketRequestDto) => {
    try {
        console.log("[TicketService] Updating ticket:", { eventId, ticketId, ticketData });

        const response = await updateTicketById(ticketId, eventId, ticketData);
        
        console.log("[TicketService] Update ticket response:", response);
        if (response.data.status && response.data.message === "success") {
            const rawTicketResponse = response.data.data;
            const ticketModel = mapToTicketModel(rawTicketResponse);
            const ticketDto: TicketDto = convertToTicketDto(ticketModel);
            console.log("[TicketService] Updated ticket DTO:", ticketDto);
            return ticketDto;
        } else {
            throw new Error(response.data.message || "Failed to update ticket");
        }
    } catch (error: any) {
        console.error("[TicketService] Update ticket error:", error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            "Failed to update ticket"
        );
    }
}

export const deleteTicketByIdService = async (eventId: number, ticketId: number) => {
    try {
        console.log("[TicketService] Deleting ticket:", { eventId, ticketId });

        const response = await deleteTicketById(ticketId, eventId);
        
        console.log("[TicketService] Delete ticket response:", response);
        if (response.data.status && response.data.message === "success") {
            console.log("[TicketService] Ticket deleted successfully");
            return true;
        } else {
            throw new Error(response.data.message || "Failed to delete ticket");
        }
    } catch (error: any) {
        console.error("[TicketService] Delete ticket error:", error);
        throw new Error(
            error.response?.data?.message || 
            error.message || 
            "Failed to delete ticket"
        );
    }
}