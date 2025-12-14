"use client"

import { Button } from "../../../components/ui/button"
import { EventPreviewCard } from "../../../components/Organizer/event-preview-card"
import { OrganizerByCard } from "../../../components/Organizer/organized-by-card"
import { EventCategoryCard } from "../../../components/Organizer/event-category-card"
import type { EventFormData, MediaFileModel } from "../../../models/form-models/event-form-models"
import { RotateCw, Shield } from "lucide-react"

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
    canPublishEvent?: boolean,
}

export default function PublishEventPage({ eventData, mediaFile, isPublishing, publishOrganizerId, publishCategoryIds, handlePublishEvent, handleOrganizerChange, handleCategoryChange, isOwner = true, canPublishEvent = true }: PublishEventPageProps) {
    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Your event is almost ready to publish</h1>
                <p className="text-base text-muted-foreground">Review your settings and let everyone find your event.</p>
            </div>

            {(!isOwner && !canPublishEvent) && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
                    <Shield className="h-5 w-5 text-amber-600" />
                    <div>
                        <p className="text-amber-800 font-medium">Limited Access</p>
                        <p className="text-amber-700 text-sm">
                            You don't have permission to publish this event. Contact the event owner to request access.
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content - Two Column Layout */}
            <div className="grid grid-cols-2 gap-8">
                {/* Left Column - Event Preview and Organizer*/}
                <div className="lg:col-span-1 space-y-8">
                    <EventPreviewCard eventData={eventData} mediaFile={mediaFile} />
                    <OrganizerByCard organizerId={publishOrganizerId} onOrganizerChange={handleOrganizerChange} />
                </div>

                {/* Right Column - Categories */}
                <div className="lg:col-span-1 space-y-8">
                    <EventCategoryCard selectedCategoryIds={publishCategoryIds} onCategoryChange={handleCategoryChange} />
                </div>
            </div>
            {/* Publish Button */}
            <Button
                onClick={() => handlePublishEvent()}
                disabled={isPublishing || !publishOrganizerId || publishCategoryIds.length === 0}
                className="w-full bg-[#f05537] hover:bg-[#d63c1f] text-white font-semibold py-3 h-auto"
            >
                {isPublishing ? (
                    <>
                        <RotateCw className="animate-spin inline-block mr-2" />
                        Publishing...
                    </>
                ) : (
                    "Publish now"
                )}
            </Button>
        </div>
    )
}
