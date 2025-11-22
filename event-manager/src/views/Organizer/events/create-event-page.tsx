import { ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { EventTitleCard } from "../../../components/Organizer/event-title-card"
import { DateLocationCard } from "../../../components/Organizer/date-location-card"
import { EventSidebar } from "../../../components/Organizer/event-sidebar"
import { MediaUploadCard } from "../../../components/Organizer/media-upload-card"
import { OverviewCard } from "../../../components/Organizer/overview-card"
import { GoodToKnowCard } from "../../../components/Organizer/good-to-know-card"
import { LineupAndAgendaCard } from "../../../components/Organizer/lineup-and-agenda-card"
import { useCreateEventViewModel } from "../../../viewmodels/Organizer/events/create-event-view-model"

export default function CreateEventPage() {
  const {
    isLoading,
    error,
    eventData,
    uploadedMedia,
    goodToKnowData,
    currentStep,

    // Card refs
    mediaCardRef,
    titleCardRef,
    dateLocationCardRef,
    overviewCardRef,

    // Field refs
    titleRef,
    dateTimeRef,
    locationRef,
    overviewRef,
    mediaRef,

    handleSaveAndContinue,
    handleBackClick,
    setEventData,
    handleStepClick,
    setUploadedMedia,
    setGoodToKnowData,
  } = useCreateEventViewModel()
  
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
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-8 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
                <EventSidebar
                  eventData={eventData}
                  currentStep={currentStep}
                  isCreating={true}
                  onStepClick={handleStepClick}
                />
              </div>
            </div>

            <div className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)] pr-4">
              <div className="space-y-8 pb-24">
                {/* Pass refs to each card component */}
                <MediaUploadCard 
                  ref={mediaCardRef}
                  uploadedMedia={uploadedMedia} 
                  onUpdate={setUploadedMedia}
                  inputRef={mediaRef}
                />

                <EventTitleCard 
                  ref={titleCardRef}
                  eventData={eventData} 
                  onUpdate={setEventData}
                  inputRef={titleRef}
                />

                <DateLocationCard 
                  ref={dateLocationCardRef}
                  eventData={eventData} 
                  onUpdate={(newData) => {
                    console.log("DateLocationCard onUpdate called with:", newData)
                    setEventData(newData)
                  }}
                  dateInputRef={dateTimeRef}
                  locationInputRef={locationRef}
                />

                <OverviewCard
                  ref={overviewCardRef}
                  description={eventData.description}
                  onUpdate={(description) => setEventData({ ...eventData, description })}
                  textareaRef={overviewRef}
                />

                <GoodToKnowCard data={goodToKnowData} onUpdate={setGoodToKnowData} />

                <LineupAndAgendaCard eventData={eventData} onUpdate={setEventData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t py-4 z-50">
        <div className="container mx-auto px-4 flex justify-end">
          {error && <span className="text-red-500 text-sm mr-4">{error}</span>}
          <Button
            size="lg"
            onClick={handleSaveAndContinue}
            disabled={isLoading}
            className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Saving...
              </>
            ) : (
              "Save and continue"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}