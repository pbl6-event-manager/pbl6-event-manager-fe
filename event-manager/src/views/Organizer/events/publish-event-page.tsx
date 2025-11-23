"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { EventPreviewCard } from "../../../components/Organizer/event-preview-card"
import { OrganizerByCard } from "../../../components/Organizer/organized-by-card"
import { EventTypeCategoryCard } from "../../../components/Organizer/event-category-card"
import type { EventFormData } from "../../../models/form-models/event-form-models"

interface PublishEventPageProps {
    eventData: EventFormData
    onPublish?: (settings: PublishSettings) => void
}

interface PublishSettings {
    organizerId: string | number
    categoryIds: number[]
}

export default function PublishEventPage({ eventData, onPublish }: PublishEventPageProps) {
    const [categoryIds, setCategoryIds] = useState<number[]>([])
    const [organizerId, setOrganizerId] = useState<string | number>("")
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([])
    const [isPublishing, setIsPublishing] = useState(false)

    const handlePublish = async () => {
        setIsPublishing(true)
        try {
            const settings: PublishSettings = {
                organizerId,
                categoryIds: selectedCategoryIds,
            }
            onPublish?.(settings)
        } finally {
            setIsPublishing(false)
        }
    }

    return (
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
                    <EventPreviewCard eventData={eventData} />
                    <OrganizerByCard organizerId={organizerId} onOrganizerChange={setOrganizerId} />
                </div>

                {/* Right Column - Categories */}
                <div className="lg:col-span-1 space-y-8">
                    <EventTypeCategoryCard selectedCategoryIds={selectedCategoryIds} onCategoryChange={setSelectedCategoryIds} />
                </div>
            </div>
            {/* Publish Button */}
            <Button
                onClick={handlePublish}
                disabled={isPublishing || !organizerId}
                className="w-full bg-[#f05537] hover:bg-[#d63c1f] text-white font-semibold py-3 h-auto"
            >
                {isPublishing ? (
                    <>
                        <span className="animate-spin inline-block mr-2">⟳</span>
                        Publishing...
                    </>
                ) : (
                    "Publish now"
                )}
            </Button>
        </div>
    )
}
