"use client"

// viewmodels/Organizer/date-location-view-model.ts
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCountries, fetchCities } from "../../../store/actions/location-action"
import type { RootState } from "../../../store/store"
import type { EventData, LocationData } from "../../../models/bean/event-models"

export const useDateLocationViewModel = (eventData: EventData, onUpdate: (data: EventData) => void) => {
  const dispatch = useDispatch()
  const { countries, cities, loading } = useSelector((state: RootState) => state.location)

  const [isExpanded, setIsExpanded] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState<{ date?: string; endDate?: string; location?: string }>({})
  const [eventType, setEventType] = useState<"single" | "multi">("single")
  const [showLocationDetails, setShowLocationDetails] = useState(false)

  // Fetch countries on mount
  useEffect(() => {
    dispatch<any>(fetchCountries())
  }, [dispatch])

  // Fetch cities when country changes
  useEffect(() => {
    if (eventData.location.country) {
      dispatch<any>(fetchCities(eventData.location.country))
    }
  }, [eventData.location.country, dispatch])

  // Validate fields
  const validateFields = () => {
    const newErrors: { date?: string; endDate?: string; location?: string } = {}

    if (!eventData.startDate.trim()) {
      newErrors.date = "Start date is required"
    }

    if (eventType === "multi" && !eventData.endDate.trim()) {
      newErrors.endDate = "End date is required"
    }

    if (eventData.location.type === "venue") {
      if (!eventData.location.country.trim() || !eventData.location.city.trim()) {
        newErrors.location = "Country and City are required"
      }
    }

    setErrors(newErrors)
    const valid = Object.keys(newErrors).length === 0
    setIsValid(valid)
    return valid
  }

  // Check if card has valid data
  useEffect(() => {
    const hasDate = eventData.startDate && (eventType === "single" || eventData.endDate)
    const hasLocation = eventData.location.type !== "venue" || (eventData.location.country && eventData.location.city)

    if (hasDate && hasLocation) {
      setIsValid(true)
    }
  }, [eventData.startDate, eventData.endDate, eventData.location, eventType])

  const updateLocation = (updates: Partial<LocationData>) => {
    onUpdate({
      ...eventData,
      location: { ...eventData.location, ...updates },
    })
  }

  const formatDateTime = () => {
    if (!eventData.startDate) return "Enter date and time"

    const startDate = new Date(eventData.startDate)
    const dateStr = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })

    if (eventType === "multi" && eventData.endDate) {
      const endDate = new Date(eventData.endDate)
      const endDateStr = endDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
      return `${dateStr} - ${endDateStr} · ${eventData.startTime} - ${eventData.endTime}`
    }

    return `${dateStr} · ${eventData.startTime} - ${eventData.endTime}`
  }

  const formatLocation = () => {
    if (eventData.location.type === "online") return "Online event"
    if (eventData.location.type === "tba") return "To be announced"

    if (eventData.location.country && eventData.location.city) {
      return `${eventData.location.city}, ${eventData.location.country}`
    }

    return "Enter a location"
  }

  return {
    isExpanded,
    setIsExpanded,
    isValid,
    errors,
    setErrors,
    eventType,
    setEventType,
    showLocationDetails,
    setShowLocationDetails,
    countries,
    cities,
    loading,
    validateFields,
    updateLocation,
    formatDateTime,
    formatLocation,
  }
}
