import React, { useEffect } from "react";
import { useUserViewModel } from "../../viewmodels/Admin/user-view-model";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import Table from "../../components/Admin/table";

const UserParticipantEvents: React.FC = () => {
  const { selectedUserEmail } = useUserViewModel();
  const { eventsByUser, getEventsForUser } = useEventViewModel();

  useEffect(() => {
    if (selectedUserEmail) {
      getEventsForUser(selectedUserEmail); 
    }
  }, [selectedUserEmail]);

  const userEvents = selectedUserEmail
    ? eventsByUser[selectedUserEmail] || []
    : [];

  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Event name", accessor: "name", type: "text" as const },
    { header: "Date", accessor: "date", type: "text" as const },
    { header: "Location", accessor: "location", type: "text" as const },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">List of events</h3>
      <Table
        columns={columns}
        data={userEvents}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default UserParticipantEvents;
