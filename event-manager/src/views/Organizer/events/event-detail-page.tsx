"use client";

import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { EventSidebar } from "../../../components/Organizer/event-sidebar"
import EventDashboardPage from "./event-dashboard-page"
import EventTeamManagementPage from "./event-team-management-page"
import EventManageAttendeesPage from "./event-manage-attendees-page"
import EventManageOrdersPage from "./event-manage-orders-page"
import CreateTicketsPage from "./create-ticket-page"
import PublishEventPage from "./publish-event-page"
import EventDiscountPage from "./event-discount-page"
import EditEventInfoPage from "./edit-event-info-page"
import { useEventViewModel } from "../../../viewmodels/Organizer/events/event-view-model"
import { useEventPermissionViewModel } from "../../../viewmodels/Organizer/events/event-permission-view-model"
import { useOrderViewModel } from "../../../viewmodels/Organizer/orders/order-view-model";
//import { PermissionBadge } from "../../../components/Permission/PermissionBadge"
//import { EventAccessGuard } from "../../../components/Permission/EventAccessGuard"

export default function EventDetailPage() {
  const {
    isLoading,
    currentSection,
    eventData,
    uploadedMedia,
    isPublishing,
    publishOrganizerId,
    publishCategoryIds,
    completedSteps,

    // Refs
    mediaCardRef,
    titleCardRef,
    dateLocationCardRef,
    overviewCardRef,
    titleRef,
    dateTimeRef,
    locationRef,
    overviewRef,
    mediaRef,
    dashboardTicketInfo,
    dashboardRevenueInfo,
    dashboardAttendeeInfo,
    dashboardOrderStats,

    // Actions
    setUploadedMedia,
    handleStepClick,
    handleMenuItemClick,
    handleBackClick,
    setCurrentSection,
    handleUpdateEventData,
    handlePublishEvent,
    handleOrganizerChange,
    handleCategoryChange,
    handleUpdateEvent,
    getStatusColor,
    selectedOrder,
    totalCount,
    totalRevenue,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    filteredOrders,
    handleViewOrderDetails,
    isDetailsOpen,
    setIsDetailsOpen,
    totalTicket,
    filteredAttendees,
    checkedInCount,
    filterCheckIn,
    setFilterCheckIn,
    handleCheckIn,

  } = useEventViewModel();

  const {
    isOwner,
    roleStaffName,
    isLoading: isPermissionLoading,
    // canViewEvent,
    // canViewAnalytics,
    // canViewEventStaff,
    // canViewAttendees,
    // canViewOrders,
    // canViewDiscount,
    canEditEvent,
    // canDeleteEvent,
    canPublishEvent,
    // canCreateTickets,
    // canUpdateTickets,
    // canDeleteTickets,
    canAssignStaffs,
    // canDeleteDiscounts,
    // canManageTickets,
    canAccessStep,
    canAccessMenuItem,
    checkStepPermission,
    checkMenuItemPermission,
    checkAndAllow,
    PERMISSIONS,
  } = useEventPermissionViewModel();

  const { statusColor, statusText } = useOrderViewModel();

  const handleUpdateEventWithPermission = () => {
    checkAndAllow(PERMISSIONS.UPDATE_EVENT, () =>
      handleUpdateEvent(isOwner, canEditEvent)
    );
  };

  const handlePublishEventWithPermission = async () => {
    const allowed = checkAndAllow(PERMISSIONS.PUBLISH_EVENT, () => {});
    if (allowed) {
      await handlePublishEvent(isOwner, canPublishEvent);
    }
  };

  if (isLoading || !eventData) {
    return;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to events
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
            {/* Event Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
                <EventSidebar
                  eventData={eventData}
                  currentStep={
                    typeof currentSection === "number" ? currentSection : 0
                  }
                  completedSteps={completedSteps}
                  isCreating={false}
                  onStepClick={handleStepClick}
                  onMenuItemClick={handleMenuItemClick}
                  activeMenuItem={
                    typeof currentSection === "string"
                      ? currentSection
                      : undefined
                  }
                  isOwner={isOwner}
                  roleStaffName={roleStaffName}
                  isPermissionLoading={isPermissionLoading}
                  canAccessStep={canAccessStep}
                  canAccessMenuItem={canAccessMenuItem}
                  checkStepPermission={checkStepPermission}
                  checkMenuItemPermission={checkMenuItemPermission}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)] pr-4">
              <div className="space-y-8 pb-24">
                {currentSection === 1 && (
                  <EditEventInfoPage
                    mediaCardRef={mediaCardRef}
                    titleCardRef={titleCardRef}
                    dateLocationCardRef={dateLocationCardRef}
                    overviewCardRef={overviewCardRef}
                    mediaRef={mediaRef}
                    titleRef={titleRef}
                    dateTimeRef={dateTimeRef}
                    locationRef={locationRef}
                    overviewRef={overviewRef}
                    eventData={eventData}
                    uploadedMedia={uploadedMedia}
                    handleUpdateEventData={handleUpdateEventData}
                    setUploadedMedia={setUploadedMedia}
                    handleUpdateEvent={handleUpdateEventWithPermission}
                    handleBackClick={handleBackClick}
                    isOwner={isOwner}
                    canEditEvent={canEditEvent}
                  />
                )}

                {currentSection === 2 && (
                  <div className="bg-card rounded-lg border">
                    <CreateTicketsPage
                      onNext={() => setCurrentSection(3)}
                      isOwner={isOwner}
                    />
                  </div>
                )}

                {currentSection === 3 && (
                  <div className="bg-card rounded-lg p-6 border">
                    <PublishEventPage
                      eventData={eventData}
                      mediaFile={uploadedMedia}
                      isPublishing={isPublishing}
                      publishOrganizerId={publishOrganizerId}
                      publishCategoryIds={publishCategoryIds}
                      handlePublishEvent={handlePublishEventWithPermission}
                      handleOrganizerChange={handleOrganizerChange}
                      handleCategoryChange={handleCategoryChange}
                    />
                  </div>
                )}

                {currentSection === "dashboard" && (
                  <div className="bg-card rounded-lg border">
                    <EventDashboardPage
                      setCurrentSection={setCurrentSection}
                      eventData={eventData}
                      getStatusColor={getStatusColor}
                      ticketInfo={dashboardTicketInfo}
                      revenueInfo={dashboardRevenueInfo}
                      attendeeInfo={dashboardAttendeeInfo}
                      orderStats={dashboardOrderStats}
                    />
                  </div>
                )}

                {currentSection === "team-management" && (
                  <div className="bg-card rounded-lg border">
                    <EventTeamManagementPage isOwner={isOwner} canAssignStaffs={canAssignStaffs} />
                  </div>
                )}

                {currentSection === "manage-attendee" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <EventManageAttendeesPage 
                      checkedInCount={checkedInCount}
                      filterCheckIn={filterCheckIn}
                      filteredAttendees={filteredAttendees}
                      searchTerm={searchTerm}
                      totalCount={totalCount}
                      setSearchTerm={setSearchTerm}
                      setFilterCheckIn={setFilterCheckIn}
                      handleCheckIn={handleCheckIn}
                    />
                  </div>
                )}

                {currentSection === "manage-orders" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <EventManageOrdersPage
                      orders={filteredOrders}
                      selectedOrder={selectedOrder}
                      filterStatus={filterStatus}
                      searchTerm={searchTerm}
                      setFilterStatus={setFilterStatus}
                      setSearchTerm={setSearchTerm}
                      handleViewDetails={handleViewOrderDetails}
                      totalRevenue={totalRevenue}
                      totalCount={totalCount}
                      isDetailsOpen={isDetailsOpen}
                      setIsDetailsOpen={setIsDetailsOpen}
                      statusColor={statusColor}
                      statusText={statusText}
                      totalTicket={totalTicket}
                    />
                  </div>
                )}

                {currentSection === "discount" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <EventDiscountPage />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
