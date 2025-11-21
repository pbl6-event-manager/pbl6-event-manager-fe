import type { EventModel} from "../models/bean/event-models"
import type { CreateEventRequestDto, EventFormDto, EventListDto } from "../dtos/event-dto"
import type { EventFormData } from "../models/form-models/event-form-models"
import type { OrganizerEventsListItem } from "../models/form-models/event-form-models"
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
      bannerUrl: domain.bannerImagePath,
      categories: [],
    }
  },


  convertEventDataToFormDTO: async (eventData: EventFormData, bannerFile?: File): Promise<EventFormDto> => {
    const effectiveEndDate = eventData.endDate && eventData.endDate.trim().length > 0 ? eventData.endDate : eventData.startDate
    
    const startDateTime = convertToISODateTime(eventData.startDate, eventData.startTime, eventData.timezone)
    const endDateTime = convertToISODateTime(effectiveEndDate, eventData.endTime, eventData.timezone)

    const startCheck = new Date(startDateTime)
    const endCheck = new Date(endDateTime)
    if (isNaN(startCheck.getTime())) {
      throw new Error("Invalid start date/time")
    }
    if (isNaN(endCheck.getTime())) {
      throw new Error("Invalid end date/time")
    }
    console.log("[debug] Banner File:", bannerFile)
    const coordinates = await getCoordinates(eventData.location.address1, eventData.location.city, eventData.location.country)
    
    return {
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
      bannerFile,
      categoryIds: (eventData.category || []).map((c) => Number.parseInt(String(c))).filter((n) => !isNaN(n)),
    }
  },

  convertEventListToDTO: (domainList: EventModel[]): CreateEventRequestDto[] => {
    return domainList.map((item) => eventConverter.convertDomainToDTO(item))
  },

  convertEventModelToEventListDto: (eventModel: EventModel) : EventListDto => {
    return {
      id: eventModel.id,
      bannerImagePath: eventModel.bannerImagePath,
      title: eventModel.title,
      summary: eventModel.summary,
      location: eventModel.city + ", " + eventModel.country,
      startTime: eventModel.startTime.toDateString(),
      endTime: eventModel.endTime.toDateString(),
      status: eventModel.status
    }
  },
  convertEventListDtoToOrganizerEventsListItem: (eventListDto: EventListDto, organizerName: string) : OrganizerEventsListItem => {
    return {
      id: eventListDto.id,
      bannerImagePath: eventListDto.bannerImagePath ?? null,
      organizerName: organizerName ?? "",
      title: eventListDto.title,
      address: eventListDto.location,
      startDate: eventListDto.startTime.toString(),
      endDate: eventListDto.endTime.toString(),
      soldTickets: 0,
      capacity: 0,
      status: eventListDto.status
    }
  }
}
