//#region Organizer Form Models
export interface OrganizerProfileForm {
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
  id: number,
  name: string,
  website: string,
  bio: string,
  description: string,
  facebookId: string,
  twitter: string,
  emailOptIn: boolean,
  profileImage: string
}

export interface OrganizerListItem {
  id: number,
  logoUrl: string,
  name: string,
}

export interface OrganizerDetailInfoProps {
  organizer: any | null;
}
//#endregion

//#region Sub Models
export interface Organization {
  id: string
  name: string
  preferredCountry: string
}
//#endregion