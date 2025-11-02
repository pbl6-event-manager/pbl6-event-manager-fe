import type { EventModel} from "../models/bean/event-models"
import type { CreateEventRequestDto, EventFormDto } from "../dtos/event-dto"
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

  convertEventFormDataToFormDTO: async (eventData: EventFormData, organizerId: number, banner?: File): Promise<EventFormDto> => {
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

  convertEventListToDTO: (domainList: EventModel[]): CreateEventRequestDto[] => {
    return domainList.map((item) => eventConverter.convertDomainToDTO(item))
  },
}
