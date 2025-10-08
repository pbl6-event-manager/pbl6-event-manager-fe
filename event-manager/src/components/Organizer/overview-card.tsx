"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Plus, Bold, Italic, List, ListOrdered, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface OverviewCardProps {
  description: string
  onUpdate: (description: string) => void
}

export function OverviewCard({ description, onUpdate }: OverviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [localDescription, setLocalDescription] = useState(description)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalDescription(description)
    setIsValid(description.trim().length >= 50)
  }, [description])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node) && isExpanded) {
        // Validate and collapse if valid
        const valid = localDescription.trim().length >= 50
        if (valid) {
          onUpdate(localDescription)
          setIsExpanded(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isExpanded, localDescription, onUpdate])

  const handleDescriptionChange = (value: string) => {
    setLocalDescription(value)
    onUpdate(value)
    setIsValid(value.trim().length >= 50)
  }

  if (!isExpanded) {
    // Collapsed state
    const hasContent = description.trim().length > 0

    return (
      <Card
        ref={cardRef}
        className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Overview</CardTitle>
            <div className="flex items-center gap-2">
              {isValid && (
                <div className="bg-green-500 text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {hasContent
              ? description.substring(0, 150) + (description.length > 150 ? "..." : "")
              : "Use this section to provide more details about your event. You can include things to know, venue information, accessibility options—anything that will help people know what to expect."}
          </p>
        </CardHeader>
      </Card>
    )
  }

  // Expanded state
  return (
    <Card ref={cardRef} className="border-2 border-blue-700 transition-colors duration-300 cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overview</CardTitle>
          {isValid && (
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
              Done
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Event description</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Add more details about your event and include what people can expect if they attend.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {/* Toolbar */}
          {/* <div className="flex items-center gap-2 p-2 border-b bg-muted/30">
            <Select defaultValue="normal">
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="heading1">Heading 1</SelectItem>
                <SelectItem value="heading2">Heading 2</SelectItem>
              </SelectContent>
            </Select>
            <div className="h-6 w-px bg-border" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Italic className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-border" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div> */}

          {/* Text Area */}
          <Textarea
            value={localDescription}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Add more details about your event and include what people can expect if they attend."
            className="min-h-[200px] border-0 focus-visible:ring-0 resize-none"
          />
        </div>

        {!isValid && localDescription.length > 0 && (
          <p className="text-sm text-destructive">Description should be at least 50 characters</p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{localDescription.length} characters</span>
          {isValid && <span className="text-green-600">• Minimum reached</span>}
        </div>
      </CardContent>
    </Card>
  )
}
