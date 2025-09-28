import React from "react";
import EventForm from "../../components/Admin/event-form";

const CreateEventView: React.FC = () => {
  return (
    <div className="w-full flex-1 p-8 bg-[var(--surface)] overflow-auto">
        <EventForm />
    </div>
  );
};

export default CreateEventView;
