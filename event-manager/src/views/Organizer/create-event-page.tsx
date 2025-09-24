"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, MapPin, Users, ImageIcon, Video, Plus, Edit2, Upload, Clock, Globe } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Switch } from "../../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { BasicInfoForm } from "../../components/Organizer/event-creation"

export default function CreateEventPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [eventType, setEventType] = useState("single")
  const [locationType, setLocationType] = useState("venue")
  const [eventData, setEventData] = useState({
    title: "",
    summary: "",
    description: "",
    date: "",
    startTime: "10:00",
    endTime: "12:00",
    location: "",
    capacity: "",
    category: "",
    timezone: "GMT+7",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

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

  const steps = [
    {
      id: 1,
      title: "Build event page",
      description: "Add all of your event details and let attendees know what to expect",
    },
    { id: 2, title: "Add tickets", description: "Set up ticket types and pricing" },
    { id: 3, title: "Publish", description: "Review and publish your event" },
  ]

  const handleSaveAndContinue = () => {
    if (validateForm()) {
      // Save and continue logic
      console.log("Form is valid, saving...")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to events
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Draft
              </Button>
              <Button size="sm" onClick={handleSaveAndContinue}>
                Save and continue
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
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
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {eventData.date
                    ? new Date(eventData.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Mon, Oct 6, 2025"}
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
                      {steps.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                              currentStep === step.id
                                ? "bg-primary text-primary-foreground"
                                : currentStep > step.id
                                  ? "bg-green-500 text-white"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {currentStep > step.id ? "✓" : step.id}
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Hero Section */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 mx-auto">
                          <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <Button variant="outline" className="bg-white">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Upload photos and video
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Pro tip: Use photos that set the mood, and avoid distracting text overlays.
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-bold">{eventData.title || "Event Title"}</h1>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      {eventData.summary || "A short and sweet sentence about your event."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Info Form */}
              <BasicInfoForm eventData={eventData} onUpdate={setEventData} errors={errors} />

              {/* Date and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Date and time
                      </CardTitle>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Type of event</Label>
                      <RadioGroup value={eventType} onValueChange={setEventType} className="mt-2">
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="single" id="single" />
                          <div className="flex-1">
                            <Label htmlFor="single" className="text-sm font-medium">
                              Single event
                            </Label>
                            <p className="text-xs text-muted-foreground">An event that happens once</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="recurring" id="recurring" />
                          <div className="flex-1">
                            <Label htmlFor="recurring" className="text-sm font-medium">
                              Recurring event
                            </Label>
                            <p className="text-xs text-muted-foreground">For events every day and multiple days</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          type="date"
                          id="date"
                          className="mt-1"
                          value={eventData.date}
                          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="startTime">Start time</Label>
                          <Input
                            type="time"
                            id="startTime"
                            className="mt-1"
                            value={eventData.startTime}
                            onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endTime">End time</Label>
                          <Input
                            type="time"
                            id="endTime"
                            className="mt-1"
                            value={eventData.endTime}
                            onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg">
                      <Clock className="h-4 w-4" />
                      <span>
                        {eventData.date
                          ? new Date(eventData.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })
                          : "Monday, October 8"}{" "}
                        • {eventData.startTime} - {eventData.endTime} {eventData.timezone}
                      </span>
                    </div>

                    <Button variant="link" className="text-primary p-0 h-auto">
                      More options
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location
                      </CardTitle>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={locationType} onValueChange={setLocationType}>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="venue" id="venue" />
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <Label htmlFor="venue" className="text-sm">
                            Venue
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="online" id="online" />
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          <Label htmlFor="online" className="text-sm">
                            Online event
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value="tba" id="tba" />
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <Label htmlFor="tba" className="text-sm">
                            To be announced
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {locationType === "venue" && (
                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="Search for a venue or address"
                          className="mt-1"
                          value={eventData.location}
                          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                        />
                        <p className="text-sm text-destructive mt-1">Location is required.</p>
                        <Button variant="link" className="text-primary p-0 h-auto mt-2">
                          + Add location details
                        </Button>
                      </div>
                    )}

                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                      <div className="text-center">
                        <MapPin className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Map will appear here</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <Label htmlFor="reserved-seating" className="text-sm font-medium">
                          Reserved seating
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Use your venue map to set price tiers for each section and choose whether attendees can pick
                          their seat
                        </p>
                      </div>
                      <Switch id="reserved-seating" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overview Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Overview</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this section to provide more details about your event. You can include things to know, venue
                    information, accessibility options—anything that will help people know what to expect.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 min-h-[200px]">
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                      <Select defaultValue="normal">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="heading1">Heading 1</SelectItem>
                          <SelectItem value="heading2">Heading 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          B
                        </Button>
                        <Button variant="ghost" size="sm">
                          I
                        </Button>
                        <Button variant="ghost" size="sm">
                          U
                        </Button>
                        <Button variant="ghost" size="sm">
                          •
                        </Button>
                        <Button variant="ghost" size="sm">
                          1.
                        </Button>
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      Add more details about your event and include what people can expect if they attend.
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Add text
                    </Button>
                    <Button variant="outline" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Add image
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Add video
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Sections */}
              <Card>
                <CardHeader>
                  <CardTitle>Add more sections to your event page</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Make your event stand out even more. These sections help attendees find information and answer their
                    questions—which means more ticket sales and less time answering messages.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Lineup</p>
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="text-primary">
                        See examples
                      </Button>
                      <Button size="sm">Add</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Agenda</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="text-primary">
                        See examples
                      </Button>
                      <Button size="sm">Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
