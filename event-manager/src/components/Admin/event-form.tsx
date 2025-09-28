import React, { useState } from "react";
import ProgressIndicator from "./progress-indicator";
import EventInfoForm from "./event-info-form";

interface Ticket {
  name: string;
  price: number;
  quantity: number;
}


interface EventFormData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "draft" | "published";
  banner?: File | null;
  tickets: Ticket[];
}

const EventForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [infoFormData, setInFoFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
  });
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    status: "draft",
    banner: null,
    tickets: [],
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner: file }));
      setPreview(URL.createObjectURL(file));
    }
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

  const handleSubmit = () => {
    console.log("Submit event:", formData);
    // TODO: gọi API tạo event
    alert("Sự kiện đã được tạo thành công!");
  };

  return (
    <div className="w-full mx-auto bg-[var(--surface)] rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Tạo sự kiện mới</h2>
      {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}

      {/* Progress indicator */}
      <ProgressIndicator
        step={step}
        labels={["Thông tin", "Ảnh", "Vé", "Xác nhận"]}
      />

      {/* Step 1: Thông tin sự kiện */}
      {step === 1 && (
        <EventInfoForm formData={formData} onChange={handleChange} />
      )}

      {/* Step 2: Ảnh sự kiện */}
      {step === 2 && (
        <div>
          <label className="block font-medium mb-1">Ảnh sự kiện</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <img src={preview} alt="Preview" className="mt-3 h-40 object-cover rounded" />
          )}
        </div>
      )}

      {/* Step 3: Vé */}
      {step === 3 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block font-medium">Danh sách vé</label>
            <button
              type="button"
              onClick={addTicket}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Thêm vé
            </button>
          </div>
          {formData.tickets.map((ticket, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 items-center mb-2">
              <input
                type="text"
                placeholder="Tên vé"
                value={ticket.name}
                onChange={(e) => handleTicketChange(index, "name", e.target.value)}
                className="border rounded p-2"
              />
              <input
                type="number"
                placeholder="Giá vé"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                className="border rounded p-2"
              />
              <div className="flex items-center">
                <input
                  type="number"
                  placeholder="Số lượng"
                  value={ticket.quantity}
                  onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeTicket(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 4: Xác nhận */}
      {step === 4 && (
        <div>
          <h3 className="font-semibold mb-3">Xem lại thông tin</h3>
          <p><b>Tiêu đề:</b> {formData.title}</p>
          <p><b>Mô tả:</b> {formData.description}</p>
          <p><b>Địa điểm:</b> {formData.location}</p>
          <p>
            <b>Thời gian:</b> {formData.startDate} → {formData.endDate}
          </p>
          <p><b>Vé:</b></p>
          <ul className="list-disc list-inside">
            {formData.tickets.map((t, i) => (
              <li key={i}>
                {t.name} - {t.price}đ ({t.quantity} vé)
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Quay lại
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Tiếp tục
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Xuất bản sự kiện
          </button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
