import { createEvent, getAllEventsAdminApi, getEventByIdApi, getEventsByOrganizerApi } from "../api/event-api"
import { eventMapper } from "../mappers/event-mapper"
import { eventConverter } from "../converters/event-converter"
import type { EventFormDto } from "../dtos/event-dto"
import type { EventModel } from "../models/bean/event-models";

export const createEventService = async (formData: EventFormDto) => {
  try {
    const multipartFormData = new FormData()
    multipartFormData.append("organizerId", formData.organizerId.toString())
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

    if (formData.banner) {
      multipartFormData.append("banner", formData.banner)
    }

    formData.categoryIds.forEach((id) => {
      multipartFormData.append("categoryIds", id.toString())
    })

    const rawResponse = await createEvent(multipartFormData)
    console.log("[DEBUG] Raw API Response:", rawResponse) // ✅ Log response

    // Step 2: Map to domain model
    const domainModel = eventMapper.mapCreateEventResponseDtoToEventModel(rawResponse)
    console.log("[DEBUG] Domain Model:", domainModel) // ✅ Log mapped data

    // Step 3: Convert to DTO
    const dto = eventConverter.convertDomainToDTO(domainModel)
    console.log("[DEBUG] Final DTO:", dto) // ✅ Log final result

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
      return eventListDtoList;
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

