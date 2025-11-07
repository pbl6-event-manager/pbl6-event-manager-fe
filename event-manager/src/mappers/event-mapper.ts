import type { EventModel } from "../models/bean/event-models";

export const eventMapper = {
  mapCreateEventResponseDtoToEventModel: (raw: any): EventModel => {
    return {
      id: raw.data.data.id,
      organizerId: raw.data.data.organizerId,
      title: raw.data.data.title,
      summary: raw.data.data.summary,
      startTime: new Date(raw.data.data.startTime),
      endTime: new Date(raw.data.data.endTime),
      address: raw.data.data.address,
      city: raw.data.data.city,
      country: raw.data.data.country,
      language: raw.data.data.language,
      latitude: raw.data.data.latitude,
      longitude: raw.data.data.longitude,
      bannerUrl: raw.data.data.bannerUrl,
      categoryIds: raw.data.data.categoryIds,
      createdAt: new Date(raw.data.data.createdAt),
      updatedAt: new Date(raw.data.data.updatedAt),
    }
  },

  mapEventListToDomain: (rawList: any[]): EventModel[] => {
    return rawList.map((item) => eventMapper.mapCreateEventResponseDtoToEventModel(item))
  },
};
