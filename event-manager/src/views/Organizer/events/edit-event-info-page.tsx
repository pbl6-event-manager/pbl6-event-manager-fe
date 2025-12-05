"use client"

import { MediaUploadCard } from "../../../components/Organizer/media-upload-card"
import { EventTitleCard } from "../../../components/Organizer/event-title-card"
import { DateLocationCard } from "../../../components/Organizer/date-location-card"
import { OverviewCard } from "../../../components/Organizer/overview-card"
import type { EventFormData, MediaFileModel } from "../../../models/form-models/event-form-models"
import type { MediaUploadCardHandle } from "../../../components/Organizer/media-upload-card"
import type { EventTitleCardHandle } from "../../../components/Organizer/event-title-card"
import type { DateLocationCardHandle } from "../../../components/Organizer/date-location-card"
import type { OverviewCardHandle } from "../../../components/Organizer/overview-card"
import { Button } from "../../../components/ui/button"

interface EditEventInfoPageProps {
  // Card refs
  mediaCardRef: React.RefObject<MediaUploadCardHandle | null>
  titleCardRef: React.RefObject<EventTitleCardHandle | null>
  dateLocationCardRef: React.RefObject<DateLocationCardHandle | null>
  overviewCardRef: React.RefObject<OverviewCardHandle | null>

  // Input refs
  mediaRef: React.RefObject<HTMLInputElement | null>
  titleRef: React.RefObject<HTMLInputElement | null>
  dateTimeRef: React.RefObject<HTMLInputElement | null>
  locationRef: React.RefObject<HTMLButtonElement | null>
  overviewRef: React.RefObject<HTMLTextAreaElement | null>

  // Data
  eventData: EventFormData
  uploadedMedia: MediaFileModel[]

  // Handlers
  handleUpdateEventData: (data: EventFormData) => void
  setUploadedMedia: (media: MediaFileModel[]) => void
  handleUpdateEvent: () => void
  handleBackClick: () => void
}

export default function EditEventInfoPage({
  mediaCardRef,
  titleCardRef,
  dateLocationCardRef,
  overviewCardRef,
  mediaRef,
  titleRef,
  dateTimeRef,
  locationRef,
  overviewRef,
  eventData,
  uploadedMedia,
  handleUpdateEventData,
  setUploadedMedia,
  handleBackClick,
}: EditEventInfoPageProps) {
  return (
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
      <div className="flex justify-end gap-3">
        <Button size="sm" variant="outline" onClick={handleBackClick}>
          Cancel
        </Button>
        <Button size="sm" onClick={() => { }} className="bg-[#f05537] hover:bg-[#d63c1f] text-white">
          Save changes
        </Button>
      </div>
    </>
  )
}