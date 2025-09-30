import React from "react";
import ProgressIndicator from "./progress-indicator";
import EventInfoForm from "./event-info-form";
import { useEventFormViewModel } from "../../viewmodels/Admin/event-form-view-model";
import ImageUploadBox from "./event-image-form";
import { useImageUploadViewModel } from "../../viewmodels/Admin/image-upload-view-model";
import TicketList from "./event-ticket-form";
import ReviewInfo from "./event-confirm-form";

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
        <ReviewInfo formData={formData}/>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded hover:bg-[var(--primary-hover)]"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded hover:bg-[var(--primary-hover)]"
          >
            Publish
          </button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
