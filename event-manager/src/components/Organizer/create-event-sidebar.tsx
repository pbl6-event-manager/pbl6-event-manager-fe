"use client"

import { Calendar, Plus, Check } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { Button } from "../ui/button"
import type { EventData } from "../../models"

interface CreateEventSidebarProps {
    eventData: EventData
    currentStep: number
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

export function CreateEventSidebar({ eventData, currentStep }: CreateEventSidebarProps) {
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
                            {steps.map((step) => (
                                <div key={step.id} className="flex items-start gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${currentStep === step.id
                                            ? "bg-primary text-primary-foreground"
                                            : currentStep > step.id
                                                ? "bg-green-500 text-white"
                                                : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm font-medium ${currentStep === step.id ? "text-foreground" : "text-muted-foreground"}`}
                                        >
                                            {step.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}