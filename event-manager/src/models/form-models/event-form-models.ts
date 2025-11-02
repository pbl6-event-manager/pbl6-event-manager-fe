import type { TicketType } from "./ticket-form-models";

//#region Event Form Models
export interface EventFormData {
    mediaFile: MediaFileModel[] | null;
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

export interface EventFormErrors {
    title?: string;
    summary?: string;
    description?: string;
    date?: string;
    location?: string;
    capacity?: string;
    catelory?: string;
}
//#endregion

//#region Sub Models
export interface MediaFileModel {
    id: string;
    file: File;
    preview: string;
    type: 'image' | 'video';
    uploadedAt: Date;
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
//#endregion