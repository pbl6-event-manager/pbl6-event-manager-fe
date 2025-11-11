import type { EventModel} from "../models/bean/event-models"
import type { CreateEventRequestDto, EventFormDto, EventListDto } from "../dtos/event-dto"
import type { EventFormData } from "../models/form-models/event-form-models"
import { convertToISODateTime } from "../utils/Organizer/date-format"
import { getCoordinates } from "../utils/Organizer/geocode"


export const eventConverter = {
  convertDomainToDTO: (domain: EventModel): CreateEventRequestDto => {
  
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
  convertEventDataToFormDTO: async (eventData: EventFormData, organizerId: number, banner?: File): Promise<EventFormDto> => {
    // If endDate not provided, default to startDate (single day event)
    const effectiveEndDate = eventData.endDate && eventData.endDate.trim().length > 0 ? eventData.endDate : eventData.startDate

    const startDateTime = convertToISODateTime(eventData.startDate, eventData.startTime, eventData.timezone)
    const endDateTime = convertToISODateTime(effectiveEndDate, eventData.endTime, eventData.timezone)

    // Validate produced ISO strings
    const startCheck = new Date(startDateTime)
    const endCheck = new Date(endDateTime)
    if (isNaN(startCheck.getTime())) {
      throw new Error("Invalid start date/time")
    }
    if (isNaN(endCheck.getTime())) {
      throw new Error("Invalid end date/time")
    }

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
      categoryIds: (eventData.category || []).map((c) => Number.parseInt(String(c))).filter((n) => !isNaN(n)),
    }
  },

  convertEventListToDTO: (domainList: EventModel[]): CreateEventRequestDto[] => {
    return domainList.map((item) => eventConverter.convertDomainToDTO(item))
  },

  convertEventModelToEventListDto: (eventModel: EventModel) : EventListDto => {
    return {
      id: eventModel.id,
      title: eventModel.title,
      summary: eventModel.summary,
      location: eventModel.city + ", " + eventModel.country,
      startTime: eventModel.startTime.toDateString(),
      endTime: eventModel.endTime.toDateString(),
      status: eventModel.status
    }
  }
}
