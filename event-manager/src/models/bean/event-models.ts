//#region Event Model
export interface EventModel {
  id: number
  organizerId: number
  title: string
  summary: string
  startTime: Date
  endTime: Date
  address: string
  city: string
  country: string
  language: string
  latitude: number
  longitude: number
  bannerUrl?: string
  categoryIds: number[]
  createdAt: Date
  updatedAt: Date
}
//#endregion

