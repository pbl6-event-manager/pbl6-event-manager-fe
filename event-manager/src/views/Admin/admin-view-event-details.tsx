import React from "react";
import TabGroup from "../../components/Admin/tab-group";
import TabItem from "../../components/Admin/tab-item";
import { ArrowLeft } from "lucide-react";
import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import { EventInfoSection } from "../../components/Admin/event-info-section";
import { EventStaffSection } from "../../components/Admin/event-stafff-section";
import { EventTicketSection } from "../../components/Admin/event-ticket-section";

const EventAttendeeSection: React.FC<{ id: string }> = ({ id }) => {
  return <div>Attendees for event id: {id}</div>;
};
const EventTransactionSection: React.FC<{ id: string }> = ({ id }) => {
  return <div>Transactions for event id: {id}</div>;
};

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
        <TabItem label="Attendee" active={activeDelTab === "attendee"} onClick={() => setActiveDelTab("attendee")} />
        <TabItem label="Transaction" active={activeDelTab === "transaction"} onClick={() => setActiveDelTab("transaction")} />
      </TabGroup>

      <div className="mt-6">
        {activeDelTab === "information" && <EventInfoSection/>}
        {activeDelTab === "staff" && <EventStaffSection/>}
        {activeDelTab === "ticket" && <EventTicketSection tickets={eventDetails?.tickets}/>}
        {activeDelTab === "attendee" && <EventAttendeeSection id={id} />}
        {activeDelTab === "transaction" && <EventTransactionSection id={id} />}
      </div>
    </div>
  );
};

export default AdminEventDetailPage;