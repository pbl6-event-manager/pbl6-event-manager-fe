import { convertToTicketDto } from "../converters/ticket-converter";
import type { EventDashBoardDto, EventDetailsDto } from "../dtos/event-dto";
import type { EventModel } from "../models/bean/event-models";
import { mapToCategoryModel } from "./category-mapper";
import { mapToOrganizerModel } from "./organizer-mapper";
import { mapToTicketModel } from "./ticket-mapper";
import { mapToUserModel } from "./user-mapper";

export const eventMapper = {
  mapCreateEventResponseDtoToEventModel: (raw: any): EventModel => {
    return {
      id: raw.id,
      organizerId: raw.organizerId,
      ownerId: raw.ownerId,
      title: raw.title,
      summary: raw.summary,
      startTime: new Date(raw.startTime),
      endTime: new Date(raw.endTime),
      address: raw.address,
      city: raw.city,
      country: raw.country,
      status: raw.status,
      language: raw.language,
      latitude: raw.latitude,
      longitude: raw.longitude,
      bannerImagePath: raw.bannerImagePath,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    }
  },

  mapResponseEventToEventModel: (raw: any): EventModel => {
    return {
      id: raw.id,
      organizerId: raw.organizerId,
      ownerId: raw.ownerId,
      title: raw.title,
      summary: raw.summary,
      startTime: new Date(raw.startTime),
      endTime: new Date(raw.endTime),
      address: raw.address,
      city: raw.city,
      country: raw.country,
      status: raw.status,
      language: raw.language,
      latitude: raw.latitude,
      longitude: raw.longitude,
      bannerImagePath: raw.bannerImagePath,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    }
  },

  mapEventListToDomain: (rawList: any[]): EventModel[] => {
    return rawList.map((item) => eventMapper.mapCreateEventResponseDtoToEventModel(item))
  },

  mapResponseToEventDetailsDto: (raw: any): EventDetailsDto => {
    return {
      eventInfo: eventMapper.mapCreateEventResponseDtoToEventModel(raw),
      tickets: raw.tickets.map(mapToTicketModel).map(convertToTicketDto),
      categories: raw.categories.map(mapToCategoryModel),
      organizer: mapToOrganizerModel(raw.organizer),
      owner: mapToUserModel(raw.owner)
    }
  },

  mapResponseToEventDashBoardDto: (raw: any): EventDashBoardDto => {
    return {
      id: raw.id,
      categories: raw.categories.map(mapToCategoryModel)
    }
  }
};
