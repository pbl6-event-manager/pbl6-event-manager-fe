// src/viewmodels/Admin/event-form-viewmodel.ts
import { useState } from "react";
import type { EventFormData } from "../../models/Admin/event-models";
import { EVENT_FORM_DEFAULT } from "../../models/Admin/event-models";
import type { Ticket } from "../../models/Admin/ticket-models";

export const useEventFormViewModel = () => {
  const [formData, setFormData] = useState<EventFormData>(EVENT_FORM_DEFAULT);
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // xử lý change chung
  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      const location =
      formData.city && formData.country
      ? `${formData.city}, ${formData.country}`
      : formData.country || formData.city || "";
      setFormData((prev) => ({...prev, location}))    
    };
  const handleCountryCityChange = (country: string, city: string) => {
    setFormData((prev) => ({ ...prev, country, city }));
  }

  // xử lý upload file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, banner: file }));
  };

  // submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      setError("Ngày kết thúc phải lớn hơn ngày bắt đầu");
      return;
    }
    setError(null);
    console.log("Submit form:", formData);
    // TODO: dispatch Redux action createEvent(formData)
    resetForm();
  };

  // reset
  const resetForm = () => {
    setFormData(EVENT_FORM_DEFAULT);
  };

  const handleTicketChange = (index: number, field: keyof Ticket, value: string | number) => {
    const updatedTickets = [...formData.tickets];
    updatedTickets[index] = {
      ...updatedTickets[index],
      [field]: field === "name" ? value : Number(value),
    };
    setFormData((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  const addTicket = () => {
    setFormData((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { name: "", price: 0, quantity: 0 }],
    }));
  };

  const removeTicket = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (formData.startDate && formData.endDate) {
        const from = new Date(formData.startDate);
        const to = new Date(formData.endDate);
        if (to < from) {
          setError("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
          return;
        }
      }
    }
    setError(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return {
    formData,
    step,
    preview,
    error,
    handleChange,
    handleFileChange,
    handleCountryCityChange,
    handleSubmit,
    resetForm,
    handleBack,
    handleNext,
    removeTicket,
    addTicket,
    handleTicketChange
  };
};
