import type { CreateEventResponse, EventDomainModel } from "../models/event-models"

/**
 * Mapper Layer - Converts raw API responses to domain models
 * Pure functions with no side effects
 */

export const eventMapper = {
  /**
   * Map raw API response to domain model
   * Converts ISO strings to Date objects
   */
  mapCreateEventResponseToDomain: (raw: any): EventDomainModel => {
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

  /**
   * Map multiple raw responses to domain models
   */
  mapEventListToDomain: (rawList: any[]): EventDomainModel[] => {
    return rawList.map((item) => eventMapper.mapCreateEventResponseToDomain(item))
  },
}
