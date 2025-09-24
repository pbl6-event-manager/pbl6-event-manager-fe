import React, {useState} from "react";
import Table from "../../components/Admin/table";
import { useNavigate } from "react-router-dom";
import FilterEventSidebar from "../../components/Admin/filter-event-sidebar";
import { applyEventFilters } from "../../utils/Admin/filter-event";
import type { EventFilterState } from "../../utils/Admin/filter-event";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";

const AdminEvents: React.FC = () => {
  const { events } = useEventViewModel();
  const navigate = useNavigate();

  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Title", accessor: "title", type: "text" as const },
    { header: "Description", accessor: "description", type: "text" as const },
    { header: "Location", accessor: "location", type: "text" as const },
    { header: "Start", accessor: "starttime", type: "text" as const },
    { header: "End", accessor: "endtime", type: "text" as const },
    { header: "Status", accessor: "status", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ];

  const [filters, setFilters] = useState<EventFilterState>({
    title: "",
    description: "",
    location: "",
    status: "",
    sortOrder: "",
  });


  const filteredEvents = applyEventFilters(events, filters);

  return (
    <div className="p-6">
      {/* Header chung */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[var(--defaulttext)]">Events</h2>
        <button
          onClick={() => navigate("/admin/users/create")}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)]"
        >
          Create an event
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Table
            columns={columns}
            data={filteredEvents}
            className="rounded-lg shadow-md"
          />
        </div>

        <FilterEventSidebar onFilter={setFilters} />
      </div>
    </div>
  );
};

export default AdminEvents;
 