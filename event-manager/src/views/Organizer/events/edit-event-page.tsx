"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
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
import type { EventFormData, EventFormErrors, MediaFileModel, GoodToKnowData } from "../../../models/form-models/event-form-models"

// Mock function to fetch event data - replace with actual API call
const fetchEventData = async (eventId: string): Promise<EventFormData> => {
  // Simulate API call
  return {
    mediaFile: null,
    title: "League of Legends Championship Pacific Finals Weekend 2025",
    summary: "Join us for the most exciting esports event of the year! Watch the best teams compete for glory.",
    description:
      "Experience the thrill of competitive League of Legends at its finest. This championship event brings together the top teams from across the Pacific region to compete for the ultimate prize.",
    startDate: "2025-09-06",
    endDate: "2025-09-06",
    startTime: "12:00",
    endTime: "18:00",
    location: {
      type: "venue",
      country: "Vietnam",
      city: "Bac Ninh",
      venueName: "Tien Son Sport Center",
      address1: "123 Sport Street",
      address2: "",
      stateProvince: "Bac Ninh",
    },
    goodToKnowData: {
      doorTime: { value: "30", unit: "minutes" },
      ageInfo: { type: "restricted", limit: "18+" },
      parkingInfo: "free",
      faqs: [],
    },
    lineUp: [],
    agenda: [],
    ticketType: null,
    capacity: "200",
    category: ["Sports", "Esports"],
    timezone: "GMT+7",
    language: "en-US",
  }
}

export default function EditEventPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [eventData, setEventData] = useState<EventFormData>({
    mediaFile: null,
    title: "",
    summary: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "10:00",
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
    timezone: "GMT+7",
    language: "en-US",
  })
  const [errors, setErrors] = useState<EventFormErrors>({})
  const [uploadedMedia, setUploadedMedia] = useState<MediaFileModel[]>([])
  const [goodToKnowData, setGoodToKnowData] = useState<GoodToKnowData>({
    doorTime: null,
    ageInfo: null,
    parkingInfo: null,
    faqs: [],
  })
  const initialStep = Number.parseInt(searchParams.get("step") || "1")
  const [currentSection, setCurrentSection] = useState<string | number>(initialStep)

  useEffect(() => {
    const loadEventData = async () => {
      if (!eventId) {
        navigate("/organizer/events/all")
        return
      }

      try {
        setIsLoading(true)
        const data = await fetchEventData(eventId)
        setEventData(data)
        setGoodToKnowData(data.goodToKnowData)
      } catch (error) {
        console.error("[v0] Error loading event data:", error)
        // Handle error - could show toast notification
      } finally {
        setIsLoading(false)
      }
    }

    loadEventData()
  }, [eventId, navigate])

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

  const handleSaveChanges = () => {
    if (validateForm()) {
      console.log("[v0] Saving event changes:", eventData)
      // TODO: Implement API call to save changes
    }
  }

  const handleBackClick = () => {
    const confirmed = window.confirm("Are you sure you want to leave? Any unsaved changes will be lost.")
    if (confirmed) {
      navigate("/organizer/events/all")
    }
  }
  const handleStepClick = (stepId: number) => {
    setCurrentSection(stepId)
  }

  const handleMenuItemClick = (itemId: string) => {
    setCurrentSection(itemId)
  }

  if (isLoading) {
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
            {/* Event Sidebar - Set isCreating to false to show all menu items */}
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
                    <GoodToKnowCard data={goodToKnowData} onUpdate={setGoodToKnowData} />

                    {/* Additional Sections */}
                    <LineupAndAgendaCard eventData={eventData} onUpdate={setEventData} />
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

      {/* <div className="fixed bottom-0 left-0 right-0 bg-card border-t py-4 z-50">
        <div className="container mx-auto px-4 flex justify-end gap-3">
          <Button size="lg" variant="outline" onClick={handleBackClick}>
            Cancel
          </Button>
          <Button size="lg" onClick={handleSaveChanges} className="bg-[#f05537] hover:bg-[#d63c1f] text-white">
            Save changes
          </Button>
        </div>
      </div> */}
    </div>
  )
}
