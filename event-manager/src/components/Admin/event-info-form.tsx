import React from "react";
import CountryCitySelect from "./country-city-select";
import type { EventInfoFormProps } from "../../models/Admin/event-models";

const EventInfoForm: React.FC<EventInfoFormProps> = ({ formData, onChange, onCountryCityChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          className="w-full border rounded p-2"
        />
      </div>

       <div className="mb-3">
        <CountryCitySelect
          country={formData.country}
          city={formData.city}
          onChange={onCountryCityChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default EventInfoForm;
