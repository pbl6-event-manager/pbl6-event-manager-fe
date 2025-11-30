import type { CategoryModel } from "../models/bean/category-models"
import type { EventModel } from "../models/bean/event-models"
import type { OrganizerModel } from "../models/bean/organizer-models"
import type { UserModel } from "../models/bean/user-models"
import type { ListCategoryDto } from "./category-dto"
import type { TicketDto } from "./ticket-dto"

//#region Event Dtos
export const EVENT_STATUS = {
  PUBLISHED: "PUBLISHED",
  PENDING: "APPROVAL_PENDING",
  DRAFT: "DRAFT"
}
export interface CreateEventRequestDto {
  id: number
  title: string
  summary: string
  startDateTime: string
  endDateTime: string 
  location: string 
  language: string
  city: string,
  country: string,
  bannerUrl?: string
  categories: number[]
};

export interface CreateEventResponseDto {
  id: number
  organizerId: number
  title: string
  summary: string
  startTime: string
  endTime: string
  address: string
  city: string
  country: string
  language: string
  latitude: number
  longitude: number
  bannerUrl?: string
  categoryIds: number[]
  createdAt: string
  updatedAt: string
};

export interface EventFormDto {
  title: string
  summary: string
  startTime: string
  endTime: string
  address: string
  city: string
  country: string
  language: string
  latitude: number
  longitude: number
  bannerFile?: File
  categoryIds: number[]
};

export interface EventListDto {
  id: number,
  bannerImagePath?: string,
  title: string
  summary: string
  startTime: string
  endTime: string
  location: string
  status: string
}

export interface EventSelectionDto {
  id: number,
  title: string
}

export interface EventDashBoardDto {
  id: number
  categories?: CategoryModel
}

export interface EventDetailsDto {
  eventInfo?: EventModel
  tickets?: TicketDto[],
  categories?: CategoryModel[]
  organizer?: OrganizerModel 
  owner?: UserModel
}
//#endregion
