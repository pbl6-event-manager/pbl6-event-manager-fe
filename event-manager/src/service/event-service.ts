import { createEvent, getEventById } from "../api/event-api"
import { eventMapper } from "../mappers/event-mapper"
import { eventConverter } from "../converters/event-converter"
import type { EventFormDto } from "../dtos/event-dto"

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

export const getEventByIdService = async(eventId: number) => {
  try {
    const rawResponse = await getEventById(eventId)
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

