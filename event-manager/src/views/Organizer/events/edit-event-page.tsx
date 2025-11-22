"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { EventTitleCard } from "../../../components/Organizer/event-title-card"
import { DateLocationCard } from "../../../components/Organizer/date-location-card"
import { EventSidebar } from "../../../components/Organizer/event-sidebar"
import { MediaUploadCard } from "../../../components/Organizer/media-upload-card"
import { OverviewCard } from "../../../components/Organizer/overview-card"
import { GoodToKnowCard } from "../../../components/Organizer/good-to-know-card"
import { LineupAndAgendaCard } from "../../../components/Organizer/lineup-and-agenda-card"
import EventDashboardPage from "./event-dashboard-page"
import EventTeamManagementPage from "./event-team-management-page"
import CreateTicketsPage from "./create-ticket-page"
import { useEventViewModel } from "../../../viewmodels/Organizer/events/event-view-model"

export default function EditEventPage() {
  const {
    isLoading,
    currentEvent,
    currentSection,
    eventData,
    uploadedMedia,
    goodToKnowData,
    
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
    
    // Actions
    setUploadedMedia,
    setGoodToKnowData,
    handleStepClick,
    handleMenuItemClick,
    handleBackClick,
    handleSaveChanges,
    handleUpdateEventData,
  } = useEventViewModel()

  if (isLoading || !eventData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBackClick}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to events
              </Button>
            </div>
            <div className="container mx-auto px-4 flex justify-end gap-3">
              <Button size="sm" variant="outline" onClick={handleBackClick}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveChanges} className="bg-[#f05537] hover:bg-[#d63c1f] text-white">
                Save changes
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
                  currentStep={typeof currentSection === "number" ? currentSection : 1}
                  completedSteps={[1]}
                  isCreating={false}
                  onStepClick={handleStepClick}
                  onMenuItemClick={handleMenuItemClick}
                  activeMenuItem={typeof currentSection === "string" ? currentSection : undefined}
                />
              </div>
            </div>

            <div className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)] pr-4">
              <div className="space-y-8 pb-24">
                {currentSection === 1 && (
                  <>
                    {/* Upload Card */}
                    <MediaUploadCard 
                      ref={mediaCardRef}
                      uploadedMedia={uploadedMedia} 
                      onUpdate={setUploadedMedia}
                      inputRef={mediaRef}
                    />

                    {/* Event Title Card */}
                    <EventTitleCard 
                      ref={titleCardRef}
                      eventData={eventData} 
                      onUpdate={handleUpdateEventData}
                      inputRef={titleRef}
                    />

                    {/* Date and Location */}
                    <DateLocationCard 
                      ref={dateLocationCardRef}
                      eventData={eventData} 
                      onUpdate={handleUpdateEventData}
                      dateInputRef={dateTimeRef}
                      locationInputRef={locationRef}
                    />

                    {/* Overview Section */}
                    <OverviewCard
                      ref={overviewCardRef}
                      description={eventData.description}
                      onUpdate={(description) => handleUpdateEventData({ ...eventData, description })}
                      textareaRef={overviewRef}
                    />

                    {/* Good To Know Section */}
                    <GoodToKnowCard data={goodToKnowData} onUpdate={setGoodToKnowData} />

                    {/* Additional Sections */}
                    <LineupAndAgendaCard eventData={eventData} onUpdate={handleUpdateEventData} />
                  </>
                )}
                {currentSection === 2 && (
                  <div className="bg-card rounded-lg border">
                    <CreateTicketsPage />
                  </div>
                )}
                {currentSection === 3 && (
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Publish Event</h2>
                    <p className="text-muted-foreground">Event publishing section will be displayed here.</p>
                  </div>
                )}
                {currentSection === "dashboard" && (
                  <div className="bg-card rounded-lg border">
                    <EventDashboardPage />
                  </div>
                )}
                {currentSection === "team-management" && (
                  <div className="bg-card rounded-lg border">
                    <EventTeamManagementPage />
                  </div>
                )}
                {currentSection === "order-options" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Order Options</h2>
                    <p className="text-muted-foreground">Order options will be displayed here.</p>
                  </div>
                )}
                {currentSection === "payments" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Payments & Tax</h2>
                    <p className="text-muted-foreground">Payment and tax settings will be displayed here.</p>
                  </div>
                )}
                {currentSection === "marketing" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Marketing</h2>
                    <p className="text-muted-foreground">Marketing tools and settings will be displayed here.</p>
                  </div>
                )}
                {currentSection === "manage-attendees" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Manage Attendees</h2>
                    <p className="text-muted-foreground">Attendee management section will be displayed here.</p>
                  </div>
                )}
                {currentSection === "reporting" && (
                  <div className="bg-card rounded-lg p-6 border">
                    <h2 className="text-2xl font-bold mb-4">Reporting</h2>
                    <p className="text-muted-foreground">Event reporting and analytics will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}