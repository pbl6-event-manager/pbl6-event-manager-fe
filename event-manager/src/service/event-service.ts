import { approveRejectEventApi, createEvent, getAllEventsAdminApi, getEventByIdApi, getEventsByOrganizerApi, getEventsByOwnerApi } from "../api/event-api"
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
    console.log("[DEBUG] Banner appended to FormData:", bannerFormData)
    if (bannerFormData) {
      multipartFormData.append("banner", bannerFormData)
    }
    console.log("[DEBUG] multipartFormData banner:", multipartFormData.get("banner"))  
    const myOrganizers = await getMyOrganizersService();
    const firstOrganizerId = myOrganizers[0]?.id;
    if (!firstOrganizerId) {
      throw new Error("No organizers found for the user.");
    }
    multipartFormData.append("organizerId", firstOrganizerId.toString());
    formData.categoryIds.forEach((id) => {
      multipartFormData.append("categoryIds", id.toString())
    })

    const rawResponse = await createEvent(multipartFormData)
    console.log("[DEBUG] Raw API Response:", rawResponse)
    const rawData = rawResponse.data
    if(rawData.message !== "success") {
      throw new Error(rawData.message || "Failed to create event");
    }

    const eventModel = eventMapper.mapCreateEventResponseDtoToEventModel(rawData.data)
    console.log("[DEBUG] Event Model after mapping:", eventModel)

    const dto = eventConverter.convertDomainToDTO(eventModel)
    console.log("[DEBUG] Final DTO:", dto)

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
    if(response.data.message === "success") {
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

export const getAllEventsAdminService = async () => {
  try {
    const response = await getAllEventsAdminApi();
    if(response.data.message === "success") {
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
    if(!eventId) return false;

    const response = await approveRejectEventApi(eventId, isApprove);

    if(response.data.message === "success") {
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
    if(response.data.message === "success") {
      const rawData = response.data.data;
      const eventModelList : EventModel[] = rawData.map(eventMapper.mapResponseEventToEventModel);
      const eventListDto : EventListDto[] = eventModelList.map(eventConverter.convertEventModelToEventListDto);
      const organizerEventsListItem : OrganizerEventsListItem[] = eventListDto.map((dto) => {
        const organizerName = rawData.find((item: any) => item.id === dto.id)?.organizer?.name || "";
        return eventConverter.convertEventListDtoToOrganizerEventsListItem(dto, organizerName);
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