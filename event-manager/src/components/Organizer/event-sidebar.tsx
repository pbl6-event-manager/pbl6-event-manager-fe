import { Calendar, Check, Ban } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import type { EventFormData } from "../../models/form-models/event-form-models"

interface EventSidebarProps {
  eventData: EventFormData
  currentStep: number
  completedSteps?: number[] // Added to track completed steps
  isCreating?: boolean
  onStepClick?: (stepId: number) => void
  onMenuItemClick?: (itemId: string) => void
  activeMenuItem?: string // Added to track active menu item
}

const steps = [
  {
    id: 1,
    title: "Build event page",
    description: "Add all of your event details and let attendees know what to expect",
  },
  { id: 2, title: "Add tickets", description: "Set up ticket types and pricing" },
  { id: 3, title: "Publish", description: "Review and publish your event" },
]

const additionalMenuItems = [
  { id: "dashboard", title: "Dashboard" },
  { id: "team-management", title: "Team Management" },
  { id: "manage-attendee", title: "Manage Attendees" },
  { id: "discount", title: "Discount" },
]

export function EventSidebar({
  eventData,
  currentStep,
  completedSteps = [], // Default to empty array
  isCreating = false,
  onStepClick,
  onMenuItemClick,
  activeMenuItem,
}: EventSidebarProps) {
  const isStepCompleted = (stepId: number) => completedSteps.includes(stepId)

  // Get status badge color
  const getStatusBadgeColor = (status?: string) => {
    const s = status?.toUpperCase() || "DRAFT"
    switch (s) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700"
      case "APPROVAL_PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "DRAFT":
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="w-full h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex-1">{eventData.title || "Event Title"}</CardTitle>
          <Badge variant="secondary" className={`ml-2 ${getStatusBadgeColor(eventData.status)}`}>
            {eventData.status || "DRAFT"}
          </Badge>
        </div>
        {eventData.summary && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{eventData.summary}</p>}
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <Calendar className="h-4 w-4 mr-1" />
          {eventData.startDate
            ? new Date(eventData.startDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            : "Mon, Nov 10, 2025"}
          , {eventData.startTime || "10:00 AM"}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">

          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-3">Steps</h4>
            <div className="space-y-3">
              {steps.map((step) => {
                const isDisabled = isCreating && step.id > currentStep
                const isClickable = !isDisabled
                const completed = isStepCompleted(step.id)

                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-3 group relative ${isClickable ? "cursor-pointer hover:opacity-80" : "cursor-not-allowed"
                      }`}
                    onClick={() => isClickable && onStepClick?.(step.id)}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : -1}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : completed
                            ? "bg-black text-white"
                            : isDisabled
                              ? "bg-muted text-muted-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {isDisabled ? (
                        <Ban className="h-4 w-4" />
                      ) : completed ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${isDisabled
                            ? "text-muted-foreground"
                            : currentStep === step.id
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                      >
                        {step.title}
                      </p>
                      {currentStep === step.id && !isDisabled && (
                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {!isCreating && (
            <div className="border-t pt-4 mt-4">
              <div className="space-y-2">
                {additionalMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onMenuItemClick?.(item.id)}
                    className={`w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors cursor-pointer ${activeMenuItem === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                  >
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
