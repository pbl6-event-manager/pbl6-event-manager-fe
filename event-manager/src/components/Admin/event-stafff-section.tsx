import React from "react";
import Table from "./table";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";

export const EventStaffSection: React.FC<{ id?: string }> = () => {
  const { groupedByRole, staffColumns } = useEventViewModel();

  return (
    <div className="space-y-6">
      {groupedByRole.map(([role, members]) => (
        <div key={role} className="bg-[var(--surface)] rounded -sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">{role}</div>
            <div className="text-xs text-gray-500">
              {members.length} member{members.length > 1 ? "s" : ""}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table
                columns={staffColumns}
                data={members}
                className="rounded-lg shadow-md"
              />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventStaffSection;