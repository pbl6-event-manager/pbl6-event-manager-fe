import React from "react";
import { useUserViewModel } from "../../../../viewmodels/Admin/user/user-view-model";
import { useEventViewModel } from "../../../../viewmodels/Admin/event/event-view-model";
import Table from "../../../../components/Admin/table";
import OrganizerDetailInfo from "./organizer-detail-form"; 
import { useOrganizerViewModel } from "../../../../viewmodels/Admin/organizer/organizer-view-model";

const UserInActiveOrganizerEvents: React.FC = () => {
  const { inActiveOrganizers, organizerColumns } = useUserViewModel();
  const { eventsByUser, eventColumns, handleDelete, handleViewDetail } = useEventViewModel();
  const { selectedOrganizer, handleSelectOrganizer } = useOrganizerViewModel();

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <OrganizerDetailInfo organizer={selectedOrganizer} />
        </div>

        <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">List of Organizers</h3>
          <Table
            columns={organizerColumns}
            data={inActiveOrganizers}
            className="rounded-lg"
            onRowClick={(row) => handleSelectOrganizer(row.id)}
          />
        </div>
      </div>

      {/* --- Khu vực dưới: Events của Organizer --- */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3">
          {selectedOrganizer
            ? `Events of Organizer: ${selectedOrganizer.name}`
            : "List of Events"}
        </h3>
        <Table
          columns={eventColumns}
          data={eventsByUser}
          className="rounded-lg"
          getRowActions={() => [
            { type: "delete", onClick: () => handleDelete() },
          ]}
          onRowClick={(row) => handleViewDetail(row.id)}
        />
      </div>
    </div>
  );
};

export default UserInActiveOrganizerEvents;
