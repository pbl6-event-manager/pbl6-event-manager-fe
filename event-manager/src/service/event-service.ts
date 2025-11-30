import { approveRejectEventApi, createEvent, getAllEventsAdminApi, getEventByIdApi, getEventsByOrganizerApi, getEventsByOwnerApi, updateEventApi, publishEventApi } from "../api/event-api"
import { eventMapper } from "../mappers/event-mapper"
import { eventConverter } from "../converters/event-converter"
import type { EventFormDto, EventListDto, EventSelectionDto } from "../dtos/event-dto"
import type { EventModel } from "../models/bean/event-models";
import type { OrganizerEventsListItem } from "../models/form-models/event-form-models";
import { getMyOrganizersService } from "./organizer-service";

export const createEventService = async (formData: EventFormDto) => {
  try {
    const multipartFormData = new FormData()
    multipartFormData.append("title", formData.title)
    multipartFormData.append("summary", formData.summary)
    multipartFormData.append("startTime", formData.startTime)
    multipartFormData.append("endTime", formData.endTime)
    multipartFormData.append("address", formData.address)
    multipartFormData.append("city", formData.city)
    multipartFormData.append("country", formData.country)
    multipartFormData.append("language", formData.language)
    multipartFormData.append("latitude", formData.latitude.toString())
    multipartFormData.append("longitude", formData.longitude.toString())

    const bannerFormData = formData.bannerFile as File | null;
    if (bannerFormData) {
      multipartFormData.append("banner", bannerFormData)
    }
    const myOrganizers = await getMyOrganizersService();
    const firstOrganizerId = myOrganizers.listOrganizerDto[0]?.id;
    if (!firstOrganizerId) {
      throw new Error("No organizers found for the user.");
    }
    multipartFormData.append("organizerId", firstOrganizerId.toString());
    formData.categoryIds.forEach((id) => {
      multipartFormData.append("categoryIds", id.toString())
    })

    const rawResponse = await createEvent(multipartFormData)
    const rawData = rawResponse.data
    if (rawData.message !== "success") {
      throw new Error(rawData.message || "Failed to create event");
    }

    const eventModel = eventMapper.mapCreateEventResponseDtoToEventModel(rawData.data)

    const dto = eventConverter.convertDomainToDTO(eventModel)

    return dto
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

export const getEventByIdService = async (eventId: number) => {
  try {
    const rawResponse = await getEventByIdApi(eventId)
    const domainModel = eventMapper.mapCreateEventResponseDtoToEventModel(rawResponse)
    const dto = eventConverter.convertDomainToDTO(domainModel)
    return dto
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const getEventDetailsByIdService = async (eventId: number) => {
  try {
    const response = await getEventByIdApi(eventId);
    if (response.data.message === "success") {
      const eventDetails = eventMapper.mapResponseToEventDetailsDto(response.data.data);
      return eventDetails;
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const updateEventService = async (eventId: number, formData: EventFormDto) => {
  try {
    const multipartFormData = new FormData()
    multipartFormData.append("title", formData.title)
    multipartFormData.append("summary", formData.summary)
    multipartFormData.append("startTime", formData.startTime)
    multipartFormData.append("endTime", formData.endTime)
    multipartFormData.append("address", formData.address)
    multipartFormData.append("city", formData.city)
    multipartFormData.append("country", formData.country)
    multipartFormData.append("language", formData.language)
    multipartFormData.append("latitude", formData.latitude.toString())
    multipartFormData.append("longitude", formData.longitude.toString())

    // Only append banner if it's a new file
    if (formData.bannerFile instanceof File) {
      multipartFormData.append("banner", formData.bannerFile)
    }
    if (formData.organizerId !== undefined) {
      multipartFormData.append("organizerId", formData.organizerId.toString());
    }
    formData.categoryIds.forEach((id) => {
      multipartFormData.append("categoryIds", id.toString())
    })

    const rawResponse = await updateEventApi(eventId, multipartFormData)

    if (rawResponse.data.message !== "success") {
      throw new Error(rawResponse.data.message || "Failed to update event");
    }

    const eventModel = eventMapper.mapCreateEventResponseDtoToEventModel(rawResponse.data.data)
    const dto = eventConverter.convertDomainToDTO(eventModel)

    return dto
  } catch (error: any) {
    console.error("[EventService] Update event error:", error)
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const publishEventService = async (
  eventId: number,
  formData: EventFormDto,
) => {
  try {
    const multipartFormData = new FormData()
    multipartFormData.append("title", formData.title)
    multipartFormData.append("summary", formData.summary)
    multipartFormData.append("startTime", formData.startTime)
    multipartFormData.append("endTime", formData.endTime)
    multipartFormData.append("address", formData.address)
    multipartFormData.append("city", formData.city)
    multipartFormData.append("country", formData.country)
    multipartFormData.append("language", formData.language)
    multipartFormData.append("latitude", formData.latitude.toString())
    multipartFormData.append("longitude", formData.longitude.toString())
    if (formData.bannerFile instanceof File) {
      multipartFormData.append("banner", formData.bannerFile)
    }
    multipartFormData.append("organizerId", formData.organizerId?.toString() || "0");
    formData.categoryIds.forEach((id) => {
      multipartFormData.append("categoryIds", id.toString())
    })
    //Call update API to ensure event is updated before publishing
    const updateResponse = await updateEventApi(eventId, multipartFormData)
    if (updateResponse.data.message !== "success") {
      throw new Error(updateResponse.data.message || "Failed to update event before publishing");
    }
    //Call publish API
    const publishResponse = await publishEventApi(eventId)
    if (publishResponse.data.message !== "success") {
      throw new Error(publishResponse.data.message || "Failed to publish event");
    }
    return {
      success: true,
      message: publishResponse.data.data
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error")
    } else {
      throw new Error(error.message || "Unexpected error occurred")
    }
  }
}

export const getAllEventsAdminService = async () => {
  try {
    const response = await getAllEventsAdminApi();
    if (response.data.message === "success") {
      const eventModelList = response.data.data.map(eventMapper.mapResponseEventToEventModel);
      const eventListDtoList = eventModelList.map(eventConverter.convertEventModelToEventListDto);
      const eventDashBoardDtoList = response.data.data.map(eventMapper.mapResponseToEventDashBoardDto);
      return {
        eventListDtoList,
        eventDashBoardDtoList
      }
    }
    else {
      throw new Error("Unexpected error occurred");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const getEventsByOrganizerIdsService = async (organizerIds: number[]) => {
  try {
    if (!organizerIds || organizerIds.length === 0) {
      return [];
    }
    const results = await Promise.allSettled(
      organizerIds.map((id) => getEventsByOrganizerApi(id))
    );

    const collectedModels: EventModel[] = [];

    results.forEach((res) => {
      if (res.status === "fulfilled") {
        const resp = res.value;
        if (resp?.data?.message === "success" && Array.isArray(resp.data.data)) {
          const models = resp.data.data.map(eventMapper.mapResponseEventToEventModel);
          collectedModels.push(...models);
        }
      } else {
        throw new Error("Unexpected error occurred");
      }
    });

    const uniqueById = Array.from(new Map(collectedModels.map((e) => [e.id, e])).values());
    uniqueById.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

    const dtoList = uniqueById.map(eventConverter.convertEventModelToEventListDto);

    return dtoList;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const approveRejectEventService = async (eventId: number, isApprove: boolean) => {
  try {
    if (!eventId) return false;

    const response = await approveRejectEventApi(eventId, isApprove);

    if (response.data.message === "success") {
      return true;
    }

    return false;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}

export const getEventsByOwnerService = async () => {
  try {
    const response = await getEventsByOwnerApi();
    if (response.data.message === "success") {
      const rawData = response.data.data;
      console.log("[debug] Raw Data:", rawData);
      const eventModelList: EventModel[] = rawData.map(eventMapper.mapResponseEventToEventModel);
      const eventListDto: EventListDto[] = eventModelList.map(eventConverter.convertEventModelToEventListDto);
      const organizerEventsListItem: OrganizerEventsListItem[] = eventListDto.map((dto) => {
        const organizerName = rawData.find((item: any) => item.id === dto.id)?.organizer?.name || "";
        const tickets = rawData.find((item: any) => item.id === dto.id)?.tickets || [];
        return eventConverter.convertEventListDtoToOrganizerEventsListItem(dto, organizerName, tickets);
      });
      return {
        eventListDto,
        organizerEventsListItem
      };
    }
    else {
      throw new Error("Unexpected error occurred");
    }
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
}