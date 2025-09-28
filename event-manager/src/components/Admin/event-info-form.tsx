import React from "react";

interface EventInfoFormProps {
  formData: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EventInfoForm: React.FC<EventInfoFormProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Tiêu đề sự kiện</label>
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
        <label className="block font-medium mb-1">Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Địa điểm</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Ngày bắt đầu</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Ngày kết thúc</label>
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
