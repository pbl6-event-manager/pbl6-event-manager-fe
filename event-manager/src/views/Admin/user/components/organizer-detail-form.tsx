import React from "react";
import type { OrganizerDetailInfoProps } from "../../../../models/form-models/organizer-form-models";

const OrganizerDetailInfo: React.FC<OrganizerDetailInfoProps> = ({ organizer }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-3">Organizer Detail Information</h3>
      {organizer ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
          {organizer.logoUrl && (
            <div className="md:col-span-2 flex justify-center mb-3">
              <img
                src={organizer.logoUrl}
                alt={`${organizer.name} logo`}
                className="w-32 h-32 object-cover rounded-full border"
              />
            </div>
          )}

          <p><strong>ID:</strong> {organizer.id}</p>
          <p><strong>Name:</strong> {organizer.name}</p>
          {organizer.contactEmail && <p><strong>Email:</strong> {organizer.contactEmail}</p>}
          {organizer.contactPhone && <p><strong>Phone:</strong> {organizer.contactPhone}</p>}
          {organizer.website && <p><strong>Website:</strong> {organizer.website}</p>}
          {organizer.description && (
            <p className="md:col-span-2">
              <strong>Description:</strong> {organizer.description}
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 italic">Select an organizer to view details</p>
      )}
    </div>
  );
};

export default OrganizerDetailInfo;
