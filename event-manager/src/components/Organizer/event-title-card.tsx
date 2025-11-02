import { useState, useEffect, useRef } from "react"
import { Plus, Check, AlertCircle, Sparkles } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import type { EventCardProps } from "../../models/component-props/card-component-props"

export function EventTitleCard({ eventData, onUpdate }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [touched, setTouched] = useState({ title: false, summary: false })
  const [charCount, setCharCount] = useState(eventData.summary.length)
  const cardRef = useRef<HTMLDivElement>(null)

  const isTitleValid = eventData.title.trim().length > 0
  const isSummaryValid = eventData.summary.trim().length >= 50 && eventData.summary.length <= 140
  const isFormValid = isTitleValid && isSummaryValid

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        if (isExpanded) {
          // Mark all fields as touched when clicking outside
          setTouched({ title: true, summary: true })

          // If form is valid, collapse the card
          if (isFormValid) {
            setIsExpanded(false)
          }
          // If form is invalid, keep it expanded to show errors
        }
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded, isFormValid])

  const handleTitleChange = (value: string) => {
    onUpdate({ ...eventData, title: value })
  }

  const handleSummaryChange = (value: string) => {
    if (value.length <= 140) {
      setCharCount(value.length)
      onUpdate({ ...eventData, summary: value })
    }
  }

  const handleBlur = (field: "title" | "summary") => {
    setTouched({ ...touched, [field]: true })
  }

  if (!isExpanded && isFormValid) {
    return (
      <Card
        ref={cardRef}
        className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{eventData.title}</h2>
              <p className="text-muted-foreground">{eventData.summary}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isExpanded) {
    return (
      <Card
        ref={cardRef}
        className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Event Title</h2>
              <p className="text-muted-foreground">A short and sweet sentence about your event.</p>
            </div>
            <Button variant="ghost" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card ref={cardRef} className="border-2 border-blue-700 transition-colors duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Event Overview</h3>
          </div>

          {/* Event Title Field */}
          <div>
            <Label htmlFor="event-title" className="text-base font-semibold">
              Event title
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Be clear and descriptive with a title that tells people what your event is about.
            </p>
            <div className="relative">
              <Input
                id="event-title"
                placeholder="Event title *"
                className={`mt-1 ${touched.title && !isTitleValid
                    ? "border-destructive focus-visible:ring-destructive"
                    : touched.title && isTitleValid
                      ? "border-green-500 focus-visible:ring-green-500"
                      : ""
                  }`}
                value={eventData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={() => handleBlur("title")}
              />
              {touched.title && !isTitleValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
              )}
            </div>
            {touched.title && !isTitleValid && (
              <p className="text-sm text-destructive mt-1">Event title is required.</p>
            )}
          </div>

          {/* Summary Field */}
          <div>
            <Label htmlFor="event-summary" className="text-base font-semibold">
              Summary
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Grab people's attention with a short description about your event. Attendees will see this at the top of
              your event page. (140 characters max){" "}
              <a href="#" className="text-primary hover:underline">
                See examples
              </a>
            </p>
            <div className="relative">
              <Textarea
                id="event-summary"
                placeholder="Summary *"
                className={`mt-1 min-h-[120px] ${touched.summary && !isSummaryValid
                    ? "border-destructive focus-visible:ring-destructive"
                    : touched.summary && isSummaryValid
                      ? "border-green-500 focus-visible:ring-green-500"
                      : ""
                  }`}
                value={eventData.summary}
                onChange={(e) => handleSummaryChange(e.target.value)}
                onBlur={() => handleBlur("summary")}
              />
              {touched.summary && !isSummaryValid && (
                <div className="absolute right-3 top-3">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-1">
              {touched.summary && !isSummaryValid && <p className="text-sm text-destructive">Summary is required</p>}
              <span
                className={`text-sm ml-auto ${charCount > 120 ? "text-orange-500" : charCount === 140 ? "text-destructive" : "text-muted-foreground"}`}
              >
                {charCount} / 140
              </span>
            </div>
            {charCount < 50 && charCount > 0 && (
              <Button variant="link" className="text-primary p-0 h-auto mt-2 text-sm">
                <Sparkles className="h-4 w-4 mr-1" />
                Suggest summary
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
