//#region Event Dtos
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
  banner?: File
  categoryIds: number[]
};

export interface EventListDto {
  id: number
  title: string
  summary: string
  startTime: string
  endTime: string
  location: string
  status: string
}
//#endregion
