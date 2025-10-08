"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { EventTitleCard } from "../../../components/Organizer/event-title-card"
import { DateLocationCard } from "../../../components/Organizer/date-location-card"
import { CreateEventSidebar } from "../../../components/Organizer/create-event-sidebar"
import { MediaUploadCard } from "../../../components/Organizer/media-upload-card"
import { OverviewCard } from "../../../components/Organizer/overview-card"
import { GoodToKnowCard } from "../../../components/Organizer/good-to-know-card"
import { LineupAndAgendaCard } from "../../../components/Organizer/lineup-and-agenda-card"
import type { EventData, EventFormErrors, MediaFile, GoodToKnowData } from "../../../models"

export default function CreateEventPage() {
  const [eventData, setEventData] = useState<EventData>({
    mediaFile: null,          
    title: "",
    summary: "",
    description: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "12:00",
    location: {
      type: "venue",
      country: "",
      city: "",
      venueName: "",
      address1: "",
      address2: "",
      stateProvince: "",
    },
    goodToKnowData: {
      doorTime: null,
      ageInfo: null,
      parkingInfo: null,
      faqs: [],
    },
    lineUp: [],                 
    agenda: [],                 
    ticketType: null,          
    capacity: "",
    category: [],               
    timezone: "",
    language: "en-US"
  })
  const [errors, setErrors] = useState<EventFormErrors>({})
  const [uploadedMedia, setUploadedMedia] = useState<MediaFile[]>([])
  const [goodToKnowData, setGoodToKnowData] = useState<GoodToKnowData>({
    doorTime: null,
    ageInfo: null,
    parkingInfo: null,
    faqs: [],
  })


  const validateForm = () => {
    const newErrors: EventFormErrors = {}

    if (!eventData.title.trim()) {
      newErrors.title = "Event title is required"
    }

    if (!eventData.summary.trim()) {
      newErrors.summary = "Summary is required"
    } else if (eventData.summary.length < 50) {
      newErrors.summary = "Summary should be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveAndContinue = () => {
    if (validateForm()) {
      console.log("Form is valid, saving...")
    }
  }

  const navigate = useNavigate()
  const handleBackClick = () => {
    const confirmed = window.confirm("Bạn đã chắc rời khỏi trang?")
    if (confirmed) {
      navigate("/organizer/events/all")
    }
  }

  const currentStep = 1

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
            {/* Create Event Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto">
                <CreateEventSidebar eventData={eventData} currentStep={currentStep} />
              </div>
            </div>

            <div className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)] pr-4">
              <div className="space-y-8 pb-24">
                {/* Upload Card */}
                <MediaUploadCard uploadedMedia={uploadedMedia} onUpdate={setUploadedMedia} />

                {/* Event Title Card */}
                <EventTitleCard eventData={eventData} onUpdate={setEventData} />

                {/* Date and Location */}
                <DateLocationCard eventData={eventData} onUpdate={setEventData} />

                {/* Overview Section */}
                <OverviewCard
                  description={eventData.description}
                  onUpdate={(description) => setEventData({ ...eventData, description })}
                />

                {/* Good To Know Section */}
                <GoodToKnowCard data={goodToKnowData} onUpdate={setGoodToKnowData}></GoodToKnowCard>

                {/* Additional Sections */}
                <LineupAndAgendaCard eventData={eventData} onUpdate={setEventData}></LineupAndAgendaCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t py-4 z-50">
        <div className="container mx-auto px-4 flex justify-end">
          <Button size="lg" onClick={handleSaveAndContinue} className="bg-[#f05537] hover:bg-[#d63c1f] text-white">
            Save and continue
          </Button>
        </div>
      </div>
    </div>
  )
}
