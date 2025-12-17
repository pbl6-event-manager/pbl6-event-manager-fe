import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { EventPreviewCard } from "../../../components/Organizer/event-preview-card"
import { OrganizerByCard } from "../../../components/Organizer/organized-by-card"
import { EventCategoryCard } from "../../../components/Organizer/event-category-card"
import type { EventFormData, MediaFileModel } from "../../../models/form-models/event-form-models"
import { RotateCw, Lock } from "lucide-react"
import { LockedContent } from "../../../components/Permission/LockedContent"

interface PublishEventPageProps {
    eventData: EventFormData,
    mediaFile?: MediaFileModel[],
    isPublishing: boolean,
    publishOrganizerId: number | undefined,
    publishCategoryIds: number[],
    handlePublishEvent: () => void,
    handleOrganizerChange: (organizerId: number) => void,
    handleCategoryChange: (categoryIds: number[]) => void,
    isOwner?: boolean,
    canViewEvent?: boolean,
    canPublishEvent?: boolean,
}

export default function PublishEventPage({ eventData, mediaFile, isPublishing, publishOrganizerId, publishCategoryIds, handlePublishEvent, handleOrganizerChange, handleCategoryChange, isOwner = true, canViewEvent = true, canPublishEvent = true }: PublishEventPageProps) {
    return (
        (isOwner || canViewEvent) ? (
            <div className="space-y-8 pb-24">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Your event is almost ready to publish</h1>
                    <p className="text-base text-muted-foreground">Review your settings and let everyone find your event.</p>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Column - Event Preview and Organizer*/}
                    <div className="lg:col-span-1 space-y-8">
                        <EventPreviewCard eventData={eventData} mediaFile={mediaFile} />
                        <OrganizerByCard
                            organizerId={publishOrganizerId}
                            onOrganizerChange={handleOrganizerChange}
                            readOnly={(!isOwner || !canPublishEvent)}
                        />
                    </div>

                    {/* Right Column - Categories */}
                    <div className="lg:col-span-1 space-y-8">
                        <EventCategoryCard
                            selectedCategoryIds={publishCategoryIds}
                            onCategoryChange={handleCategoryChange}
                            readOnly={(!isOwner || !canPublishEvent)}
                        />
                    </div>
                </div>
                {/* Publish Button */}
                <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 -mx-6 px-6 pb-6">
                    <div className="bg-card border rounded-lg p-6 shadow-lg">
                        {(!isOwner && !canPublishEvent) && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 mb-4">
                                <Lock className="h-4 w-4 text-red-600 flex-shrink-0" />
                                <p className="text-red-700 text-sm font-medium">
                                    You don't have permission to publish this event. Contact the event owner to request access.
                                </p>
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground mb-1">
                                    Ready to go live?
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {!publishOrganizerId 
                                        ? "Please select an organizer"
                                        : publishCategoryIds.length === 0
                                        ? "Please select at least one category"
                                        : "Your event will be visible to everyone"}
                                </p>
                            </div>
                            
                            <Button
                                onClick={() => handlePublishEvent()}
                                disabled={isPublishing || !publishOrganizerId || publishCategoryIds.length === 0 || !canPublishEvent}
                                size="lg"
                                className="bg-[#f05537] hover:bg-[#d63c1f] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold px-8 h-12 text-base transition-all hover:shadow-lg disabled:shadow-none"
                            >
                                {isPublishing ? (
                                    <>
                                        <RotateCw className="animate-spin mr-2 h-5 w-5" />
                                        Publishing...
                                    </>
                                ) : !canPublishEvent ? (
                                    <>
                                        <Lock className="mr-2 h-5 w-5" />
                                        Locked
                                    </>
                                ) : (
                                    "Publish Event"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div>
                <Card>
                    <CardHeader className="px-6 py-4 border-b">
                        <h1 className="text-3xl font-bold mb-2">Publish Event</h1>
                    </CardHeader>
                    <CardContent className="px-6 py-6">
                        <LockedContent message="You do not have permission to view this content. Please contact your event administrator." />
                    </CardContent>
                </Card>
            </div>
        )
    )
}
