import React from "react";
import ProgressIndicator from "./progress-indicator";
import EventInfoForm from "./event-info-form";
import { useEventFormViewModel } from "../../viewmodels/Admin/event-form-view-model";
import ImageUploadBox from "./event-image-form";
import { useImageUploadViewModel } from "../../viewmodels/Admin/image-upload-view-model";
import TicketList from "./event-ticket-form";

const EventForm: React.FC = () => {
  const {formData, step, error, handleChange, handleSubmit, handleCountryCityChange, handleBack, handleNext, handleTicketChange, addTicket, removeTicket, resetForm} = useEventFormViewModel();
  const { preview, fileInputRef, handleButtonClick, handleFileChange } = useImageUploadViewModel();

  return (
    <div className="w-full mx-auto bg-[var(--surface)] rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Create new events</h2>
      {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}

      {/* Progress indicator */}
      <ProgressIndicator
        step={step}
        labels={["Information", "Image", "Ticket", "Confirm"]}
      />

      {/* Step 1: Thông tin sự kiện */}
      {step === 1 && (
        <EventInfoForm formData={formData} onChange={handleChange} onCountryCityChange={handleCountryCityChange} />
      )}

      {/* Step 2: Ảnh sự kiện */}
      {step === 2 && (
        <ImageUploadBox
          preview={preview}
          fileInputRef={fileInputRef}
          onButtonClick={handleButtonClick}
          onFileChange={handleFileChange}
        />
      )}

      {/* Step 3: Vé */}
      {step === 3 && (
        <TicketList
          tickets={formData.tickets}
          addTicket={addTicket}
          handleTicketChange={handleTicketChange}
          removeTicket={removeTicket}
        />
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
