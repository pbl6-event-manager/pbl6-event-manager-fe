"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Alert, AlertDescription } from "../ui/alert"
import type { EventData, EventFormErrors } from "../../models/event-models"

interface BasicInfoFormProps {
  eventData: EventData
  onUpdate: (data: EventData) => void
  errors: EventFormErrors
}

export function BasicInfoForm({ eventData, onUpdate, errors }: BasicInfoFormProps) {
  const [charCount, setCharCount] = useState(eventData.summary.length)

  const categories = [
    "Business & Professional",
    "Food & Drink",
    "Health & Wellness",
    "Music",
    "Arts & Culture",
    "Sports & Fitness",
    "Technology",
    "Education",
    "Community & Environment",
    "Fashion & Beauty",
    "Film, Media & Entertainment",
    "Government & Politics",
    "Hobbies & Special Interest",
    "Home & Lifestyle",
    "Performing & Visual Arts",
    "Religion & Spirituality",
    "Science & Technology",
    "Seasonal & Holiday",
    "Travel & Outdoor",
  ]

  const handleSummaryChange = (value: string) => {
    if (value.length <= 140) {
      setCharCount(value.length)
      onUpdate({ ...eventData, summary: value })
    }
  }

  return (
    <Card
      className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer rounded-lg"
    >
      <CardHeader>
        <CardTitle>Event Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Be clear and descriptive with details that tell people what your event is about.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="title">Event title *</Label>
          <Input
            id="title"
            placeholder="Give it a short, clear name"
            className={`mt-2 ${errors.title ? "border-destructive" : ""}`}
            value={eventData.title}
            onChange={(e) => onUpdate({ ...eventData, title: e.target.value })}
          />
          {errors.title && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.title}</AlertDescription>
            </Alert>
          )}
          <p className="text-sm text-muted-foreground mt-1">Event title is required.</p>
        </div>

        <div>
          <Label htmlFor="summary">Summary *</Label>
          <Textarea
            id="summary"
            placeholder="Write a short, engaging summary to get people excited about your event"
            className={`mt-2 min-h-[100px] ${errors.summary ? "border-destructive" : ""}`}
            value={eventData.summary}
            onChange={(e) => handleSummaryChange(e.target.value)}
          />
          {errors.summary && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.summary}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-muted-foreground">
              Grab people's attention with a short description about your event. Attendees will see this at the top of
              your event page.
            </p>
            <span className={`text-xs ${charCount > 120 ? "text-orange-500" : "text-muted-foreground"}`}>
              {charCount} / 140
            </span>
          </div>
          {charCount < 50 && (
            <p className="text-sm text-orange-500 mt-1">
              💡 Suggest summary: Add more details to help attendees understand what to expect
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={eventData.category} onValueChange={(value) => onUpdate({ ...eventData, category: value })}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">
            Help people discover your event by selecting a relevant category.
          </p>
        </div>

        <div>
          <Label htmlFor="capacity">Event capacity</Label>
          <Input
            id="capacity"
            type="number"
            placeholder="How many people can attend?"
            className="mt-2"
            value={eventData.capacity}
            onChange={(e) => onUpdate({ ...eventData, capacity: e.target.value })}
          />
          <p className="text-sm text-muted-foreground mt-1">Set the maximum number of attendees for your event.</p>
        </div>
      </CardContent>
    </Card>
  )
}
