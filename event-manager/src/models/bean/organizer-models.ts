export interface OrganizerModel {
  id: number
  name: string
  description?: string
  contactEmail?: string
  contactPhone?: string
  website?: string
  logoUrl?: string
  isActive: boolean
  ownerId: number
  createdAt: string
  updatedAt: string
}
