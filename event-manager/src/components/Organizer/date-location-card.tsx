"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar, MapPin, Plus, Check, AlertCircle, Clock, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Badge } from "../ui/badge"
import { Switch } from "../ui/switch"
import type { EventData } from "../../models"

interface DateLocationCardProps {
  eventData: EventData
  onUpdate: (data: EventData) => void
}

export function DateLocationCard({ eventData, onUpdate }: DateLocationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState<{ date?: string; location?: string }>({})
  const [eventType, setEventType] = useState("single")
  const [locationType, setLocationType] = useState("venue")
  const cardRef = useRef<HTMLDivElement>(null)

  // Validate fields
  const validateFields = () => {
    const newErrors: { date?: string; location?: string } = {}

    if (!eventData.date.trim()) {
      newErrors.date = "Date is required"
    }

    if (locationType === "venue" && !eventData.location.trim()) {
      newErrors.location = "Location is required"
    }

    setErrors(newErrors)
    const valid = Object.keys(newErrors).length === 0
    setIsValid(valid)
    return valid
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node) && isExpanded) {
        const valid = validateFields()
        if (valid) {
          setIsExpanded(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded, eventData, locationType])

  // Check if card has valid data
  useEffect(() => {
    if (eventData.date && (locationType !== "venue" || eventData.location)) {
      setIsValid(true)
    }
  }, [eventData.date, eventData.location, locationType])

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  const formatDateTime = () => {
    if (!eventData.date) return "Enter date and time"

    const date = new Date(eventData.date)
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })

    return `${dateStr} · ${eventData.startTime} - ${eventData.endTime} ${eventData.timezone}`
  }

  const formatLocation = () => {
    if (locationType === "online") return "Online event"
    if (locationType === "tba") return "To be announced"
    return eventData.location || "Enter a location"
  }

  if (!isExpanded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date and Time Card - Collapsed */}
        <Card
          ref={cardRef}
          className="cursor-pointer hover:border-primary transition-colors relative"
          onClick={handleCardClick}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Date and time</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDateTime()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isValid && eventData.date && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Card - Collapsed */}
        <Card className="cursor-pointer hover:border-primary transition-colors" onClick={handleCardClick}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{formatLocation()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isValid && (locationType !== "venue" || eventData.location) && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Date and Time Card - Expanded */}
      <Card className="border-primary">
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
            <RadioGroup value={eventType} onValueChange={setEventType} className="mt-2 space-y-2">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="single" id="single" />
                <div className="flex-1">
                  <Label htmlFor="single" className="text-sm font-medium cursor-pointer">
                    Single event
                  </Label>
                  <p className="text-xs text-muted-foreground">An event that happens once</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="recurring" id="recurring" />
                <div className="flex-1">
                  <Label htmlFor="recurring" className="text-sm font-medium cursor-pointer">
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
              <Label htmlFor="date" className="flex items-center gap-1">
                Date
                <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                id="date"
                className={`mt-1 ${errors.date ? "border-destructive" : ""}`}
                value={eventData.date}
                onChange={(e) => {
                  onUpdate({ ...eventData, date: e.target.value })
                  if (errors.date) {
                    setErrors({ ...errors, date: undefined })
                  }
                }}
                onBlur={validateFields}
              />
              {errors.date && (
                <div className="flex items-center gap-1 mt-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.date}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="startTime">Start time</Label>
                <Input
                  type="time"
                  id="startTime"
                  className="mt-1"
                  value={eventData.startTime}
                  onChange={(e) => onUpdate({ ...eventData, startTime: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">End time</Label>
                <Input
                  type="time"
                  id="endTime"
                  className="mt-1"
                  value={eventData.endTime}
                  onChange={(e) => onUpdate({ ...eventData, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {eventData.date && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg">
              <Clock className="h-4 w-4" />
              <span>{formatDateTime()}</span>
            </div>
          )}

          <Button variant="link" className="text-primary p-0 h-auto">
            More options
          </Button>
        </CardContent>
      </Card>

      {/* Location Card - Expanded */}
      <Card className="border-primary">
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
                <Label htmlFor="venue" className="text-sm cursor-pointer">
                  Venue
                </Label>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="online" id="online" />
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <Label htmlFor="online" className="text-sm cursor-pointer">
                  Online event
                </Label>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="tba" id="tba" />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <Label htmlFor="tba" className="text-sm cursor-pointer">
                  To be announced
                </Label>
              </div>
            </div>
          </RadioGroup>

          {locationType === "venue" && (
            <div>
              <Label htmlFor="location" className="flex items-center gap-1">
                Location
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                placeholder="Search for a venue or address"
                className={`mt-1 ${errors.location ? "border-destructive" : ""}`}
                value={eventData.location}
                onChange={(e) => {
                  onUpdate({ ...eventData, location: e.target.value })
                  if (errors.location) {
                    setErrors({ ...errors, location: undefined })
                  }
                }}
                onBlur={validateFields}
              />
              {errors.location && (
                <div className="flex items-center gap-1 mt-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.location}</span>
                </div>
              )}
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
              <p className="text-xs text-muted-foreground">Use your venue map to set price tiers for each section</p>
            </div>
            <Switch id="reserved-seating" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
