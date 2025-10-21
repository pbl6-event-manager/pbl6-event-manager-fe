"use client"

import { Calendar, Plus, Check, ChevronDown, Ban } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Button } from "../ui/button"
import type { EventData } from "../../models"

interface EventSidebarProps {
  eventData: EventData
  currentStep: number
  isCreating?: boolean
  onStepClick?: (stepId: number) => void
  onMenuItemClick?: (itemId: string) => void
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
  { id: "team-management", title: "Team Management", hasSubmenu: true },
  { id: "manage-attendee", title: "Manage Attendees", hasSubmenu: true },
  { id: "discount", title: "Discount", hasSubmenu: true },
]


export function EventSidebar({
  eventData,
  currentStep,
  isCreating = false,
  onStepClick,
  onMenuItemClick,
}: EventSidebarProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="w-full h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-2 right-2">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="text-lg">{eventData.title || "Event Title"}</CardTitle>
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
        <Select defaultValue="draft">
          <SelectTrigger className="w-full mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-3">Steps</h4>
            <div className="space-y-3">
              {steps.map((step) => {
                const isDisabled = isCreating && step.id > currentStep
                const isClickable = !isDisabled

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
                          : isDisabled
                            ? "bg-muted text-muted-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {isDisabled ? (
                        <Ban className="h-4 w-4" />
                      ) : (step.id)}
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
                    className="w-full flex items-center justify-between px-2 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <span>{item.title}</span>
                    {item.hasSubmenu && <ChevronDown className="h-4 w-4" />}
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
