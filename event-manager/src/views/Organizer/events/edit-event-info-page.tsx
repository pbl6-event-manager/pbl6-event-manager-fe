import { MediaUploadCard } from "../../../components/Organizer/media-upload-card"
import { EventTitleCard } from "../../../components/Organizer/event-title-card"
import { DateLocationCard } from "../../../components/Organizer/date-location-card"
import { OverviewCard } from "../../../components/Organizer/overview-card"
import { Button } from "../../../components/ui/button"
import { Lock } from "lucide-react"
import { LockedContent } from "../../../components/Permission/LockedContent"
import type { EditEventInfoPageProps } from "../../../models/component-props/section-props"
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../components/ui/card";


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
  handleUpdateEvent,
  handleBackClick,
  isOwner = true,
  canViewEvent = true,
  canEditEvent = true,
}: EditEventInfoPageProps) {

  return (
    <div>
      {canViewEvent ? (
        <div className="space-y-8 pb-24">
          {/* Upload Card */}
          <MediaUploadCard
            ref={mediaCardRef}
            uploadedMedia={uploadedMedia}
            onUpdate={setUploadedMedia}
            inputRef={mediaRef}
            isOwner={isOwner}
            canEditEvent={canEditEvent}
          />

          {/* Event Title Card */}
          <EventTitleCard
            ref={titleCardRef}
            eventData={eventData}
            onUpdate={handleUpdateEventData}
            inputRef={titleRef}
            isOwner={isOwner}
            canEditEvent={canEditEvent}
          />

          {/* Date and Location */}
          <DateLocationCard
            ref={dateLocationCardRef}
            eventData={eventData}
            onUpdate={handleUpdateEventData}
            dateInputRef={dateTimeRef}
            locationInputRef={locationRef}
            isOwner={isOwner}
            canEditEvent={canEditEvent}
          />

          {/* Overview Section */}
          <OverviewCard
            ref={overviewCardRef}
            description={eventData.description}
            onUpdate={(description) => handleUpdateEventData({ ...eventData, description })}
            textareaRef={overviewRef}
            isOwner={isOwner}
            canEditEvent={canEditEvent}
          />
          <div className="flex justify-end gap-3">
            <Button size="sm" variant="outline" onClick={handleBackClick}>
              Cancel
            </Button>

            {(!isOwner || !canEditEvent) ? (
              <Button
                size="sm"
                onClick={handleUpdateEvent}
                className="bg-gray-400 hover:bg-gray-400 text-gray-200 cursor-not-allowed"
              >
                <Lock className="h-3.5 w-3.5 mr-1.5" />
                Save changes
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleUpdateEvent}
                className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
              >
                Save changes
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader className="px-6 py-4 border-b">
              <h1 className="text-3xl font-bold mb-2">Event Info</h1>
            </CardHeader>
            <CardContent className="px-6 py-6">
              <LockedContent message="You do not have permission to view this content. Please contact your event administrator." />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
