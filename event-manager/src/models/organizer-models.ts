export interface OrganizerProfile {
  id: string,
  name: string,
  website?: string,
  bio?: string,
  description?: string,
  facebookId?: string,
  twitter?: string,
  emailOptIn: boolean,
  pageUrl: string,
  isUnnamed: boolean,
  followerCount: number,
  eventCount: number,
  profileImage?: string,
  createdAt: string,
  updatedAt: string
}

export interface OrganizerFormData {
  name: string,
  website: string,
  bio: string,
  description: string,
  facebookId: string,
  twitter: string,
  emailOptIn: boolean,
  profileImage: string
}

export interface Organization {
  id: string
  name: string
  preferredCountry: string
}

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

export interface OrganizerDetailInfoProps {
  organizer: any | null;
}

