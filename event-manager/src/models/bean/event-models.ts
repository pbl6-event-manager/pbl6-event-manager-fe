//#region Event Model
export interface EventModel {
  id: number
  organizerId: number
  ownerId: number
  title: string
  summary: string
  startTime: Date
  endTime: Date
  address: string
  city: string
  country: string
  status: string
  language: string
  latitude: number
  longitude: number
  bannerImagePath?: string
  createdAt: Date
  updatedAt: Date
}
//#endregion

