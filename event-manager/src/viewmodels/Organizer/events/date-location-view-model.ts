"use client"

// viewmodels/Organizer/date-location-view-model.ts
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCountries, fetchCities } from "../../../store/actions/location-action"
import type { RootState } from "../../../store/store"
import type { EventFormData, LocationData } from "../../../models/form-models/event-form-models"

export const useDateLocationViewModel = (eventData: EventFormData, onUpdate: (data: EventFormData) => void) => {
  const dispatch = useDispatch()
  const { countries, cities, loading } = useSelector((state: RootState) => state.locationReducer)

  const [isExpanded, setIsExpanded] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState<{ date?: string; endDate?: string; location?: string }>({})
  const [eventType, setEventType] = useState<"single" | "multi">("single")
  const [showLocationDetails, setShowLocationDetails] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isValidating, setIsValidating] = useState(false)

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

  useEffect(() => {
    const hasDate = eventData.startDate && (eventType === "single" || eventData.endDate)
    const hasLocation = eventData.location.type !== "venue" || (eventData.location.country && eventData.location.city)

    if (hasDate && hasLocation) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }

  }, [eventData.startDate, eventData.endDate, eventData.location, eventType])

  const updateLocation = (updates: Partial<LocationData>) => {
    const newLocation = { ...eventData.location, ...updates }
    const newEventData = {
      ...eventData,
      location: newLocation,
    }
    onUpdate(newEventData)
  }

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Kiểm tra xem click có phải vào card không
      const isClickInsideCard = cardRef.current?.contains(target)

      // Kiểm tra xem click có phải vào dropdown/popover không
      // Các dropdown của shadcn/ui thường có attribute data-radix-popper-content-wrapper
      const isClickInsideDropdown =
        target.closest('[role="listbox"]') || // Select dropdown
        target.closest('[role="dialog"]') || // Command palette
        target.closest('[data-radix-popper-content-wrapper]') || // Radix popover
        target.closest('[cmdk-root]') || // cmdk command
        target.closest('.select-content') || // Custom class nếu có
        target.closest('[data-state="open"]') // Radix open state

      // CHỈ xử lý nếu click BÊN NGOÀI card VÀ BÊN NGOÀI dropdown
      if (!isClickInsideCard && !isClickInsideDropdown && isExpanded) {
        // Nếu đang validating, không làm gì
        if (isValidating) return

        // Validate trước khi collapse
        const valid = validateFields()
        if (valid) {
          setIsExpanded(false)
        }
      }
    }

    // CHỈ add listener khi card đang expanded
    if (isExpanded) {
      // Delay nhỏ để đảm bảo dropdown đã render
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside)
      }, 0)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded, isValidating, validateFields])

  

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
      return `${eventData.location.address1}, ${eventData.location.city}, ${eventData.location.country}`
    }

    return "Enter a location"
  }

  return {
    isExpanded,
    cardRef,
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
    isValidating,
    setIsValidating,
    handleCardClick,
  }
}