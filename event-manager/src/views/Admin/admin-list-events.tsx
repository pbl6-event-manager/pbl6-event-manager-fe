import React, {useState} from "react";
import Table from "../../components/Admin/table";
import FilterEventSidebar from "../../components/Admin/filter-event-sidebar";
import { applyEventFilters } from "../../utils/Admin/filter-event";
import type { EventFilterState } from "../../utils/Admin/filter-event";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";
import ConfirmDialog from "../../components/Admin/confirm-dialog";

const AdminEvents: React.FC = () => {
  const { publicEvents, pendingEvents, openDeleteDialog, openAcceptDialog, openRejectDialog, activeTab, eventColumns, setActiveTab, setOpenDeleteDialog, setOpenAcceptDialog, setOpenRejectDialog, handleDelete, handleViewDetail, confirmDelete, handleAccept, handleReject, confirmAccept, confirmReject } = useEventViewModel();

  

  const [filters, setFilters] = useState<EventFilterState>({
    title: "",
    description: "",
    location: "",
    status: "",
    sortOrder: "",
  });


  const filteredPublicEvents = applyEventFilters(publicEvents, filters);
  const filteredPendingEvents = applyEventFilters(pendingEvents, filters);

  return (
    <div className="p-6">
      {/* Header chung */}
      <h2 className="text-2xl font-bold text-[var(--defaulttext)]">Events</h2>

      <div className="flex justify-between items-center mb-4">
        <TabGroup>
          <TabItem
            label="Public"
            active={activeTab === "public"}
            onClick={() => setActiveTab("public")}
          />
          <TabItem
            label="Pending"
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          />
        </TabGroup>
      </div>

      <div>
        {activeTab === "public" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Table
                columns={eventColumns}
                data={filteredPublicEvents}
                className="rounded-lg shadow-md"
                getRowActions={(row) => [
                  { type: "delete", onClick: () => handleDelete(row.id) },
                ]}
                onRowClick={(row) => handleViewDetail(row.id)}
              />
            </div>

            <FilterEventSidebar onFilter={setFilters} />
          </div>
        )}
        {activeTab === "pending" && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Table
                columns={eventColumns}
                data={filteredPendingEvents}
                className="rounded-lg shadow-md"
                getRowActions={(row) => [
                  { type: "accept", onClick: () => handleAccept(row.id) },
                  { type: "reject", onClick: () => handleReject(row.id) },
                ]}
                onRowClick={(row) => handleViewDetail(row.id)}
              />
            </div>

            <FilterEventSidebar onFilter={setFilters} />
          </div>
        )}
      </div>
      <ConfirmDialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
            title="Confirm"
            description="Are you sure you want to delete this events?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={confirmDelete}
          />
      <ConfirmDialog
            open={openAcceptDialog}
            onOpenChange={setOpenAcceptDialog}
            title="Confirm"
            description="Are you sure you want to approve this events?"
            confirmText="Approve"
            cancelText="Cancel"
            onConfirm={confirmAccept}
            danger = {false}
          />
      <ConfirmDialog
            open={openRejectDialog}
            onOpenChange={setOpenRejectDialog}
            title="Confirm"
            description="Are you sure you want to reject this events?"
            confirmText="Reject"
            cancelText="Cancel"
            onConfirm={confirmReject}
          />
    </div>
  );
};

export default AdminEvents;
 