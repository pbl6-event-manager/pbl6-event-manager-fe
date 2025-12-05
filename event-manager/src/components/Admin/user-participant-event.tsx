import React from "react";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import Table from "../../components/Admin/table";

const UserParticipantEvents: React.FC = () => {
  const { eventColumns, eventsByUser, handleDelete, handleViewDetail } = useEventViewModel();

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">List of events</h3>
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
  );
};

export default UserParticipantEvents;
