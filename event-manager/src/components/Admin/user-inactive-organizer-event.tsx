import React from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import Table from "./table";
import OrganizerDetailInfo from "./organizer-detail-form"; 
import { useOrganizerViewModel } from "../../viewmodels/Admin/organizer-view-model";

const UserInActiveOrganizerEvents: React.FC = () => {
  const { inActiveOrganizers, organizerColumns } = useUserViewModel(); // danh sách organizers của user
  const { userEvents, eventColumnsDelView } = useEventViewModel(); // danh sách events của user
  const { setSelectedOrganizer, selectedOrganizer, handleSelectOrganizer } = useOrganizerViewModel();
  // Cấu hình cột cho bảng organizers
  

  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* --- Khu vực trên: Organizer Info + List Organizer --- */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Bên trái: Organizer Detail */}
        <div className="flex-1">
          <OrganizerDetailInfo organizer={selectedOrganizer} />
        </div>

        {/* Bên phải: Danh sách Organizer */}
        <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">List of Organizers</h3>
          <Table
            columns={organizerColumns}
            data={inActiveOrganizers}
            className="rounded-lg"
            getRowActions={(row) => [
              {
                label: "View Details",
                onClick: () => handleSelectOrganizer(row),
              },
            ]}
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
          columns={eventColumnsDelView}
          data={
            selectedOrganizer
              ? userEvents.filter(
                  (event: any) => event.organizerId === selectedOrganizer.id
                )
              : userEvents
          }
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default UserInActiveOrganizerEvents;
