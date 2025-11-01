import { createEvent, getEventById } from "../api/event-api"
import { eventMapper } from "../mappers/event-mapper"
import { eventConverter } from "../converters/event-converter"
import type { CreateEventDTO, EventFormDTO } from "../dtos/event-dto"

/**
 * Service Layer - Orchestrates API calls, mapping, and conversion
 * Calls API → Maps to Domain → Converts to DTO
 * Returns DTOs to actions
 */

export const eventService = {
  /**
   * Create event service
   * 1. Calls API with form data
   * 2. Maps raw response to domain model
   * 3. Converts domain to DTO
   * 4. Returns DTO to action
   */
  createEvent: async (formData: EventFormDTO): Promise<CreateEventDTO> => {
    // Convert DTO to FormData for multipart upload
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

    // Step 1: Call API
    const rawResponse = await createEvent(multipartFormData)

    // Step 2: Map to domain model
    const domainModel = eventMapper.mapCreateEventResponseToDomain(rawResponse)

    // Step 3: Convert to DTO
    const dto = eventConverter.convertDomainToDTO(domainModel)

    return dto
  },

  /**
   * Get event by ID service
   */
  getEventById: async (eventId: number): Promise<CreateEventDTO> => {
    const rawResponse = await getEventById(eventId)
    const domainModel = eventMapper.mapCreateEventResponseToDomain(rawResponse)
    const dto = eventConverter.convertDomainToDTO(domainModel)
    return dto
  },
}
