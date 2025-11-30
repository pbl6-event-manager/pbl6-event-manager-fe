import type { EventModel} from "../models/bean/event-models"
import type { CreateEventRequestDto, EventDetailsDto, EventFormDto, EventListDto } from "../dtos/event-dto"
import type { EventFormData, MediaFileModel } from "../models/form-models/event-form-models"
import type { OrganizerEventsListItem } from "../models/form-models/event-form-models"
import { convertToISODateTime } from "../utils/Organizer/date-format"
import { getCoordinates } from "../utils/Organizer/geocode"
import { converTicketModelToTicketType, convertTicketDtoToTicketType } from "./ticket-converter"

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
    console.log("[debug] Start Date:", eventData.startDate)
    console.log("[debug] End Date:", eventData.endDate)
    console.log("[debug] Effective End Date:", effectiveEndDate)
    console.log("[debug] Timezone:", eventData.timezone)
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
      organizerId: eventData.organizerId
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
      status: eventModel.status,
      capacity: 1000
    }
  },
  convertEventListDtoToOrganizerEventsListItem: (eventListDto: EventListDto, organizerName: string, ticket: any) : OrganizerEventsListItem => {
    return {
      id: eventListDto.id,
      bannerImagePath: eventListDto.bannerImagePath ?? null,
      organizerName: organizerName ?? "",
      title: eventListDto.title,
      address: eventListDto.location,
      startDate: eventListDto.startTime.toString(),
      endDate: eventListDto.endTime.toString(),
      soldTickets: ticket && ticket.length > 0 ? ticket.filter((t: any) => t.isActive === true).reduce((sum: number, t: any) => sum + Number(t.soldQuantity || 0), 0) : 0,
      capacity: ticket && ticket.length > 0 ? ticket.filter((t: any) => t.isActive === true).reduce((sum: number, t: any) => sum + Number(t.quantity || 0), 0) : 0,
      status: eventListDto.status
    }
  },
  convertEventDetailToFormData: (eventDetail: EventDetailsDto): EventFormData => {
    const eventInfo = eventDetail.eventInfo
    if (!eventInfo) {
      throw new Error("Event info is missing in event details")
    }
    const startDate = new Date(eventInfo.startTime)
    const endDate = new Date(eventInfo.endTime)

    const formattedStartDate = startDate.toISOString().split('T')[0]
    const formattedEndDate = endDate.toISOString().split('T')[0]

    const formattedStartTime = startDate.toTimeString().slice(0, 5)
    const formattedEndTime = endDate.toTimeString().slice(0, 5)

    

    const isSingleDay = formattedStartDate === formattedEndDate
    return {
      mediaFile: null, // Will be handled separately
      title: eventInfo.title,
      status: eventInfo.status || "DRAFT",
      summary: eventInfo.summary,
      description: "", // Not in API response, might need to add later
      startDate: formattedStartDate,
      startTime: formattedStartTime,
      endDate: isSingleDay ? "" : formattedEndDate,
      endTime: formattedEndTime,
      location: {
        type: "venue",
        country: eventInfo.country,
        city: eventInfo.city,
        venueName: "",
        address1: eventInfo.address,
        address2: "",
        stateProvince: "",
      },
      goodToKnowData: {
        doorTime: null,
        ageInfo: null,
        parkingInfo: null,
        faqs: [],
      },
      lineUp: [],
      agenda: [],
      ticketType: eventDetail.ticket ? eventDetail.ticket.map(convertTicketDtoToTicketType) : [],
      capacity: eventDetail.ticket && eventDetail.ticket.length > 0 ? eventDetail.ticket.reduce((sum, ticket) => sum + Number(ticket.quantity || 0), 0) : 0,
      category: eventDetail.categories ? eventDetail.categories.map(category => category.id) : [],
      timezone: "UTC+7",
      language: eventInfo.language || "en",
      organizerId: eventInfo.organizerId,
    }
  },
  convertBannerToMediaFile: (bannerUrl: string | null): MediaFileModel[] => {
    if (!bannerUrl) {
      return []
    }

    return [
      {
        id: "banner-existing",
        file: null as any, // Existing file, no File object
        preview: bannerUrl,
        type: "image",
        uploadedAt: new Date(),
      },
    ]
  },

}
