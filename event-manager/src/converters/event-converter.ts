import type { EventDomainModel} from "../models/event-models"
import type { CreateEventDTO, EventFormDTO } from "../dtos/event-dto"
import type { EventData } from "../models/event-models"
import { convertToISODateTime } from "../utils/Organizer/date-format"
import { getCoordinates } from "../utils/Organizer/geocode"

/**
 * Converter Layer - Converts domain models to DTOs for UI consumption
 * Handles formatting and display logic
 */

export const eventConverter = {
  /**
   * Convert domain model to DTO for display
   * Formats dates and combines fields for UI
   */
  convertDomainToDTO: (domain: EventDomainModel): CreateEventDTO => {
  
    const startDateTime = domain.startTime.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    const endDateTime = domain.endTime.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    const location = `${domain.address}, ${domain.city}, ${domain.country}`

    return {
      id: domain.id,
      title: domain.title,
      summary: domain.summary,
      startDateTime,
      endDateTime,
      location,
      city: domain.city,
      country: domain.country,
      language: domain.language,
      bannerUrl: domain.bannerUrl,
      categories: domain.categoryIds,
    }
  },

  /**
   * Convert EventData (form state) to EventFormDTO for API submission
   */
  convertEventDataToFormDTO: async (eventData: EventData, organizerId: number, banner?: File): Promise<EventFormDTO> => {
    const startDateTime = convertToISODateTime(eventData.startDate, eventData.startTime, eventData.timezone)
    const endDateTime = convertToISODateTime(eventData.endDate, eventData.endTime, eventData.timezone)
    const coordinates = await getCoordinates(eventData.location.address1, eventData.location.city, eventData.location.country)

    return {
      organizerId,
      title: eventData.title,
      summary: eventData.summary,
      startTime: startDateTime,
      endTime: endDateTime,
      address: eventData.location.address1,
      city: eventData.location.city,
      country: eventData.location.country,
      language: eventData.language,
      latitude: coordinates?.lat ?? 0,
      longitude: coordinates?.lng ?? 0,
      banner,
      categoryIds: eventData.category.map((c) => Number.parseInt(c)),
    }
  },

  /**
   * Convert multiple domain models to DTOs
   */
  convertEventListToDTO: (domainList: EventDomainModel[]): CreateEventDTO[] => {
    return domainList.map((item) => eventConverter.convertDomainToDTO(item))
  },
}
