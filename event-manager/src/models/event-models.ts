import type { TicketType } from "./ticket-models";

export interface EventData{
    mediaFile: MediaFile[] | null;
    title: string;
    summary: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    goodToKnowData: GoodToKnowData;
    lineUp: LineUpItem[];
    agenda: AgendaItem[];
    ticketType: TicketType[] | null;
    capacity: string;
    category: string[];
    timezone: string;
}

export interface MediaFile{
    id: string;
    file: File;
    preview: string;
    type: 'image' | 'video';
    uploadedAt: Date;
}

export interface EventFormErrors{
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
}