import React from "react";
import Table from "../../../../components/Admin/table";
import { useEventViewModel } from "../../../../viewmodels/Admin/event/event-view-model";

export const EventStaffSection: React.FC = () => {
  const { groupedByRole, staffColumns } = useEventViewModel();

  const groups = groupedByRole ?? [];
  
  if (groups.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center text-gray-500">
        No staff assigned for this event
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map(([role, members]) => (
        <div key={role} className="bg-[var(--surface)] rounded -sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">{role}</div>
            <div className="text-xs text-gray-500">
              {members.length} member{members.length > 1 ? "s" : ""}
            </div>
          </div>

          {(!members || members.length === 0) ? (
            <div className="px-4 py-6 text-center text-gray-500">No members in this role</div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                columns={staffColumns}
                data={members}
                className="rounded-lg shadow-md"
              />
            </div>
          )}

        </div>
      ))}
    </div>
  );
};