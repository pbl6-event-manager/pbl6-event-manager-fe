import apiClient from "./api-config";
import type { CreateTicketRequestDto } from "../dtos/ticket-dto";

export const createANewTicket = async (eventId: number, ticketData: CreateTicketRequestDto) => apiClient.post(`/tickets/event/${eventId}`, ticketData);

export const getTicketsByEventId = async (eventId: number) => apiClient.get(`/tickets/event/${eventId}`);

export const getTicketById = async (id: number, eventId: number) => apiClient.get(`/tickets/event/${eventId}/ticket/${id}`);

export const updateTicketById = async (id: number, eventId: number, ticketData: CreateTicketRequestDto) => apiClient.put(`/tickets/event/${eventId}/ticket/${id}`, ticketData);

export const deleteTicketById = async (id: number, eventId: number) => apiClient.delete(`/tickets/event/${eventId}/ticket/${id}`);