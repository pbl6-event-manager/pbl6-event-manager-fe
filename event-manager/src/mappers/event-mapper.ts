import type { EventModel } from "../models/bean/event-models";

export const eventMapper = {
  mapCreateEventResponseDtoToEventModel: (raw: any): EventModel => {
    return {
      id: raw.id,
      organizerId: raw.organizerId,
      title: raw.title,
      summary: raw.summary,
      startTime: new Date(raw.startTime),
      endTime: new Date(raw.endTime),
      address: raw.address,
      city: raw.city,
      country: raw.country,
      language: raw.language,
      latitude: raw.latitude,
      longitude: raw.longitude,
      bannerUrl: raw.bannerUrl,
      categoryIds: raw.categoryIds,
      createdAt: new Date(raw.createdAt),
      updatedAt: new Date(raw.updatedAt),
    }
  },

  mapEventListToDomain: (rawList: any[]): EventModel[] => {
    return rawList.map((item) => eventMapper.mapCreateEventResponseDtoToEventModel(item))
  },
};
