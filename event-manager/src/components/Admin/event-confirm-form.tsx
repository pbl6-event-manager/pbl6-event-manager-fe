import React from "react";
import type { ReviewInfoProps } from "../../models/Admin/event-models";

const ReviewInfo: React.FC<ReviewInfoProps> = ({ formData }) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Xem lại thông tin</h3>
      <p>
        <b>Title:</b> {formData.title}
      </p>
      <p>
        <b>Description:</b> {formData.description}
      </p>
      <p>
        <b>Location:</b> {formData.location}
      </p>
      <p>
        <b>Start Date:</b> {formData.startDate} 
      </p>
      <p>
        <b>End Date:</b> {formData.endDate} 
      </p>
      <p>
        <b>Tickets:</b>
      </p>
      <ul className="list-disc list-inside">
        {formData.tickets.map((t, i) => (
          <li key={i}>
            Name: {t.name} - Price: {t.price} | Quantity: {t.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewInfo;