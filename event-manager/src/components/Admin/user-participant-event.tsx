import React, { useEffect } from "react";
import { useUserDetailViewModel } from "../../viewmodels/Admin/user-detail-view-model";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import Table from "../../components/Admin/table";

const UserParticipantEvents: React.FC = () => {
  const { selectedUserEmail } = useUserDetailViewModel();
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
    { header: "Tên sự kiện", accessor: "name", type: "text" as const },
    { header: "Ngày diễn ra", accessor: "date", type: "text" as const },
    { header: "Địa điểm", accessor: "location", type: "text" as const },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">Danh sách sự kiện tham gia</h3>
      <Table
        columns={columns}
        data={userEvents}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default UserParticipantEvents;
