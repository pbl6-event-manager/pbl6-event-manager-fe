import type { Ticket } from "./ticket-models";

export interface EventFormData {
  title: string;
  description: string;
  location: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  status: "draft" | "published";
  banner?: File | null;
  tickets: Ticket[];
}

export const EVENT_FORM_DEFAULT: EventFormData = {
  title: "",
  description: "",
  location: "",
  country: "",
  city: "",
  startDate: "",
  endDate: "",
  status: "draft",
  banner: null,
  tickets: [],
};

export interface EventInfoFormProps {
  formData: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    country: string,
    city: string,
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCountryCityChange: (country: string, city: string) => void
}

export interface ReviewInfoProps {
  formData: EventFormData;
}