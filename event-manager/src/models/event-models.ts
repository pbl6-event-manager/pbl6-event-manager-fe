import type { TicketType } from "./ticket-models"

export interface EventData {
    mediaFile: MediaFile[] | null;
    title: string;
    summary: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: LocationData;
    goodToKnowData: GoodToKnowData;
    lineUp: LineUpItem[];
    agenda: AgendaSection[];
    ticketType: TicketType[] | null;
    capacity: string;
    category: string[];
    timezone: string;
    language: string
}

export interface MediaFile {
    id: string;
    file: File;
    preview: string;
    type: 'image' | 'video';
    uploadedAt: Date;
}

export interface EventFormErrors {
    title?: string;
    summary?: string;
    description?: string;
    date?: string;
    location?: string;
    capacity?: string;
    catelory?: string;
}

export interface FAQ {
    id: string;
    question: string,
    answer: string
}

export interface GoodToKnowData {
    doorTime: {
        value: string
        unit: "minutes" | "hours"
    } | null
    ageInfo: {
        type: "none" | "restricted" | "guardian"
        limit: string
    } | null
    parkingInfo: "free" | "paid" | "none" | null
    faqs: FAQ[]
}

export interface LineUpItem {
    name: string;
    role: string | null;
    image: string | null;
}

export interface AgendaItem {
    time: string;
    title: string;
    description: string | null;
    host: string | null;
}

export interface AgendaSection {
    id: string
    name: string
    items: AgendaItem[]
}

export interface LocationData {
    type: "venue" | "online" | "tba"
    country: string
    city: string
    venueName: string
    address1: string
    address2: string
    stateProvince: string
}


// ============ API Models (Raw from Backend) ============
export interface CreateEventRequest {
  organizerId: number
  title: string
  summary: string
  startTime: string // ISO 8601 format with offset
  endTime: string // ISO 8601 format with offset
  address: string
  city: string
  country: string
  language?: string
  latitude: number
  longitude: number
  banner?: File
  categoryIds?: number[]
}

export interface CreateEventResponse {
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
}

// ============ Domain Models (TypeScript Interfaces) ============
export interface EventDomainModel {
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