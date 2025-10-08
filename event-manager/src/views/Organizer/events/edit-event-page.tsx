"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
//import { useParams, useRouter } from "next/navigation"
import type { EventData } from "../../../models/event-models"
//import { OrganizerSidebar } from "../../../components/Organizer/organizer-sidebar"
import { CreateEventSidebar } from "../../../components/Organizer/create-event-sidebar"
import { EventTitleCard } from "../../../components/Organizer/event-title-card"
import { DateLocationCard } from "../../../components/Organizer/date-location-card"
import { MediaUploadCard } from "../../../components/Organizer/media-upload-card"
import { OverviewCard } from "../../../components/Organizer/overview-card"
import { Button } from "../../../components/ui/button"
import { ChevronLeft, ArrowLeft } from "lucide-react"
//import Link from "next/link"

export default function EditEventPage() {
  //const params = useParams()
  //const router = useRouter()
  //const eventId = params.id as string

  const navigate = useNavigate()
  

  // Mock: Load event data based on ID
  const [eventData, setEventData] = useState<EventData>({
    mediaFile: null,          
    title: "",
    summary: "",
    description: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "12:00",
    location: "",
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
    timezone: "GMT+7",
  })

  
  const handleBackClick = () => {
    const confirmed = window.confirm("Bạn đã chắc rời khỏi trang?")
    if (confirmed) {
      navigate("/organizer/events/all")
    }
  }
  const handleSaveChanges = () => {
    //console.log("[v0] Saving edited event data:", eventData)
    // TODO: Implement save functionality
    //router.push("/organizer/events/all")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Organizer Sidebar */}
      {/* <OrganizerSidebar /> */}

      {/* Create Event Sidebar */}
      {/* <CreateEventSidebar eventData={eventData} currentStep={1}/> */}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          {/* Back Button */}
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

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Event</h1>

          {/* Event Cards */}
          <div className="space-y-6">
            {/* <EventTitleCard eventData={eventData} setEventData={setEventData} />
            <DateLocationCard eventData={eventData} setEventData={setEventData} />
            <MediaUploadCard eventData={eventData} setEventData={setEventData} />
            <OverviewCard eventData={eventData} setEventData={setEventData} /> */}
          </div>
        </div>
      </div>

      {/* Sticky Save Button */}
      <div className="fixed bottom-8 right-8">
        <Button onClick={handleSaveChanges} className="bg-[#f05537] hover:bg-[#d94829] text-white px-8 py-6 text-lg">
          Save changes
        </Button>
      </div>
    </div>
  )
}
