"use client"

import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react"
import { Check, Plus} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"

interface OverviewCardProps {
  description: string
  onUpdate: (description: string) => void
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>
  isOwner?: boolean
  canEditEvent?: boolean
}

export interface OverviewCardHandle {
  expand: () => void
}

export const OverviewCard = forwardRef<OverviewCardHandle, OverviewCardProps>(
  ({ description, onUpdate, textareaRef, isOwner = true, canEditEvent = true }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [localDescription, setLocalDescription] = useState(description)
    const cardRef = useRef<HTMLDivElement>(null)
    const hasPermission = isOwner && canEditEvent

    // Expose expand method to parent
    useImperativeHandle(ref, () => ({
      expand: () => {
        if (hasPermission) {
          setIsExpanded(true)
          setTimeout(() => textareaRef?.current?.focus(), 100)
        } else {
          toast.error("Permission Denied", {
            description: 'You need "Update Event" permission to edit media',
            duration: 4000,
          })
        }
      }
    }))
    const handleCardClick = () => {
      if (!hasPermission) {
        toast.error("Permission Denied", {
          description: 'You need "Update Event" permission to edit media',
          duration: 4000,
        })
        return
      }
      setIsExpanded(true)
      setTimeout(() => textareaRef?.current?.focus(), 100)
    }

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
          onClick={() => handleCardClick()}
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
                <Button variant="ghost" size="sm" className="cursor-pointer">
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
      <Card ref={cardRef} className="border-2 border-blue-700 transition-colors duration-300">
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
            {/* Text Area */}
            <Textarea
              ref={textareaRef}
              value={localDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder="Overview of the event..."
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
)

OverviewCard.displayName = "OverviewCard"