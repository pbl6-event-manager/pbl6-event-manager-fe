import React from "react";
import TabGroup from "../../../../components/Admin/tab-group";
import TabItem from "../../../../components/Admin/tab-item";
import { ArrowLeft } from "lucide-react";
import { useEventViewModel } from "../../../../viewmodels/Admin/event/event-view-model";
import { EventInfoSection } from "./event-info-section";
import { EventStaffSection } from "./event-stafff-section";
import { EventTicketSection } from "./event-ticket-section";
import { EventTransactionSection } from "./event-transaction-section";

const AdminEventDetailPage: React.FC = () => {
  const { id, handleBack, activeDelTab, setActiveDelTab, eventDetails } = useEventViewModel();
  return (
    <div className="p-6">
      <div className="flex-cols items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <TabGroup>
        <TabItem label="Information" active={activeDelTab === "information"} onClick={() => setActiveDelTab("information")} />
        <TabItem label="Staff" active={activeDelTab === "staff"} onClick={() => setActiveDelTab("staff")} />
        <TabItem label="Ticket" active={activeDelTab === "ticket"} onClick={() => setActiveDelTab("ticket")} />
        <TabItem label="Transaction" active={activeDelTab === "transaction"} onClick={() => setActiveDelTab("transaction")} />
      </TabGroup>

      <div className="mt-6">
        {activeDelTab === "information" && <EventInfoSection/>}
        {activeDelTab === "staff" && <EventStaffSection/>}
        {activeDelTab === "ticket" && <EventTicketSection tickets={eventDetails?.ticket}/>}
        {activeDelTab === "transaction" && <EventTransactionSection eventId={Number.parseInt(id)} />}
      </div>
    </div>
  );
};

export default AdminEventDetailPage;