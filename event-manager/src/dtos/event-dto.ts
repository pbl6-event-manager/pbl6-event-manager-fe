export interface CreateEventDTO {
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
}

export interface EventFormDTO {
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
}
