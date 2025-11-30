import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { getEventsByOwner, getEventDetailsById, setEventData, updateEvent, publishEvent } from "../../../store/actions/event-action";
import type { EventFormErrors, MediaFileModel, OrganizerEventsListItem } from "../../../models/form-models/event-form-models";
import { showLoadingAlert, showSuccessAlert, showErrorAlert, closeLoadingAlert, showConfirmAlert } from "../../../helpers/alert-helpers";
import type { EventFormData, GoodToKnowData } from "../../../models/form-models/event-form-models";
import { eventConverter } from "../../../converters/event-converter";
import type { EventDetailsDto } from "../../../dtos/event-dto";

interface ValidationResult {
    isValid: boolean
    errors: EventFormErrors
    firstErrorMessage: string | null
    firstErrorField: 'media' | 'title' | 'dateTime' | 'location' | 'description' | null
}

export const useEventViewModel = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { eventsByUser, currentEvent, isLoading, error, isSaved } = useSelector((state: RootState) => state.eventReducer);
    const navigate = useNavigate()
    const eventId = Number.parseInt(useParams<{ eventId: string }>().eventId || "")
    const [errors, setErrors] = useState<EventFormErrors>({})
    const [activeTab, setActiveTab] = useState<"my" | "other">("my")
    const [events, setEvents] = useState<OrganizerEventsListItem[]>([])
    const [otherEvents, setOtherEvents] = useState<OrganizerEventsListItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
    const [statusFilter, setStatusFilter] = useState<string>("All")
    const [searchParams] = useSearchParams()
    const initialStep = Number.parseInt(searchParams.get("step") || "1")
    const [currentSection, setCurrentSection] = useState<string | number>(initialStep)
    const [isPublishing, setIsPublishing] = useState(false)

    const [eventData, setEventDataLocal] = useState<EventFormData | null>(null)
    const [originalEventData, setOriginalEventData] = useState<EventFormData | null>(null)
    const [uploadedMedia, setUploadedMedia] = useState<MediaFileModel[]>([])
    const [goodToKnowData, setGoodToKnowData] = useState<GoodToKnowData>({
        doorTime: null,
        ageInfo: null,
        parkingInfo: null,
        faqs: [],
    })
    const [publishOrganizerId, setPublishOrganizerId] = useState<number | undefined>(eventData?.organizerId)
    const [publishCategoryIds, setPublishCategoryIds] = useState<number[]>(eventData?.category || [])

    const { tickets: ticketsFromStore } = useSelector((state: RootState) => state.ticketReducer || { tickets: [] })

    // Refs for card components - để trigger expand
    const mediaCardRef = useRef<{ expand: () => void }>(null)
    const titleCardRef = useRef<{ expand: () => void }>(null)
    const dateLocationCardRef = useRef<{ expand: () => void }>(null)
    const overviewCardRef = useRef<{ expand: () => void }>(null)

    // Refs for focusing on error fields (trong các card)
    const titleRef = useRef<HTMLInputElement>(null)
    const dateTimeRef = useRef<HTMLInputElement>(null)
    const locationRef = useRef<HTMLButtonElement>(null)
    const overviewRef = useRef<HTMLTextAreaElement>(null)
    const mediaRef = useRef<HTMLInputElement>(null)

    const completedSteps = useMemo(() => {
        const steps: number[] = []

        if (!eventData) return steps

        const status = eventData.status?.toUpperCase() || ""
        const ticketsCount = ticketsFromStore?.length || 0

        // Step 1: Completed if status is DRAFT or higher
        if (["DRAFT", "APPROVAL_PENDING", "PUBLISHED"].includes(status)) {
            steps.push(1)
        }

        // Step 2: Completed if status is DRAFT+ AND has at least 1 ticket
        if (["DRAFT", "APPROVAL_PENDING", "PUBLISHED"].includes(status) && ticketsCount > 0) {
            steps.push(2)
        }

        // Step 3: Completed if status is APPROVAL_PENDING or PUBLISHED
        if (["APPROVAL_PENDING", "PUBLISHED"].includes(status)) {
            steps.push(3)
        }

        return steps
    }, [eventData?.status, ticketsFromStore?.length])
    const fetchEventDetails = async () => {
        if (!eventId) return

        try {
            showLoadingAlert("Loading event details...")
            const result = await dispatch(getEventDetailsById(Number(eventId))) as unknown as EventDetailsDto
            closeLoadingAlert()

            if (result) {
                console.log("[debug]Fetched event details:", result)
                // Map event details to form data
                const formData = eventConverter.convertEventDetailToFormData(result)
                console.log("[debug]Converted form data:", formData)
                const mediaFiles = eventConverter.convertBannerToMediaFile(result.eventInfo?.bannerImagePath ?? null)
                //const goodToKnow = eventConverter.convertGoodToKnowData(result)
                console.log("[debug]Converted media files:", mediaFiles)
                setEventDataLocal(formData)
                setOriginalEventData(formData) // Store original for comparison
                setUploadedMedia(mediaFiles)
                //setGoodToKnowData(goodToKnow)
                // Update Redux store
                dispatch(setEventData(formData))
            }
        } catch (err: any) {
            closeLoadingAlert()
            console.error("[EventViewModel] Failed to load event details:", err)
            showErrorAlert("Failed to load event details", err.message)
        }
    }

    useEffect(() => {
        fetchEventDetails()
    }, [eventId, dispatch])

    useEffect(() => {
        if (eventData) {
            setPublishOrganizerId(eventData.organizerId)
            setPublishCategoryIds(eventData.category || [])
        }
    }, [eventData])

    // Validation helper functions
    const validateTitle = (title: string): string | null => {
        if (!title.trim()) {
            return "Please enter event title"
        }

        if (/^\d+$/.test(title.trim())) {
            return "Event title is invalid, must be at least 4 alphanumeric characters and no more than 100 characters"
        }

        if (title.trim().length < 5 || title.trim().length > 100) {
            return "Event title is invalid, must be at least 4 alphanumeric characters and no more than 100 characters"
        }

        return null
    }

    const validateDateTime = (startDate: string, startTime: string, endDate: string, endTime: string): string | null => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/
        if (!datePattern.test(startDate) || (endDate && !datePattern.test(endDate))) {
            return "Invalid start/end date time"
        }

        const timePattern = /^\d{2}:\d{2}$/
        if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
            return "Invalid start/end date time"
        }

        const effectiveEndDate = endDate && endDate.trim().length > 0 ? endDate : startDate
        const startDateTime = new Date(`${startDate}T${startTime}:00`)
        const endDateTime = new Date(`${effectiveEndDate}T${endTime}:00`)
        const now = new Date()

        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            return "Invalid start/end date time"
        }

        if (startDateTime < now) {
            return "Start Date Time must be greater than current date"
        }
        if (endDateTime < now) {
            return "End Date Time must be greater than current date"
        }

        if (endDateTime <= startDateTime) {
            return "End Date time must be greater than Start Date Time"
        }

        return null
    }

    const validateLocation = (location: EventFormData['location']): string | null => {
        if (!location.city.trim()) {
            return "Please enter city of event"
        }
        if (!location.country.trim()) {
            return "Please enter country of event"
        }
        if (!location.address1.trim()) {
            return "Please enter address of event"
        }
        return null
    }

    const validateOverview = (description: string): string | null => {
        if (!description.trim()) {
            return "Please enter event overview"
        }

        if (description.trim().length < 30 || description.trim().length > 1000) {
            return "Event overview is invalid, must be at least 30 alphanumeric characters and no more than 1000 characters"
        }

        return null
    }

    const validateMedia = (media: MediaFileModel[]): string | null => {
        if (media.length === 0) {
            return null // Media is optional
        }

        const allowedImageFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        const allowedVideoFormats = ['video/mp4', 'video/webm', 'video/ogg']
        const maxImageSize = 5 * 1024 * 1024 // 5MB
        const maxVideoSize = 50 * 1024 * 1024 // 50MB

        for (const file of media) {
            // Skip validation for existing files (no File object)
            if (!file.file) continue

            const isImage = file.type === 'image'
            const isVideo = file.type === 'video'

            if (isImage) {
                if (!allowedImageFormats.includes(file.file.type)) {
                    return "Unsupported file format"
                }
                if (file.file.size > maxImageSize) {
                    return "Unsupported file format"
                }
            } else if (isVideo) {
                if (!allowedVideoFormats.includes(file.file.type)) {
                    return "Unsupported file format"
                }
                if (file.file.size > maxVideoSize) {
                    return "Unsupported file format"
                }
            } else {
                return "Unsupported file format"
            }
        }

        return null
    }

    // Hàm validate form - trả về ValidationResult với thông tin field bị lỗi
    const validateForm = (): ValidationResult => {
        if (!eventData) {
            return {
                isValid: false,
                errors: { title: "Event data not loaded" },
                firstErrorMessage: "Event data not loaded",
                firstErrorField: null,
            }
        }

        const newErrors: EventFormErrors = {}
        let firstErrorMessage: string | null = null
        let firstErrorField: ValidationResult['firstErrorField'] = null

        // Validate theo thứ tự ưu tiên
        const mediaErr = validateMedia(uploadedMedia)
        if (mediaErr) {
            newErrors.media = mediaErr
            if (!firstErrorMessage) {
                firstErrorMessage = mediaErr
                firstErrorField = 'media'
            }
        }

        const titleErr = validateTitle(eventData.title)
        if (titleErr) {
            newErrors.title = titleErr
            if (!firstErrorMessage) {
                firstErrorMessage = titleErr
                firstErrorField = 'title'
            }
        }

        const dateErr = validateDateTime(eventData.startDate, eventData.startTime, eventData.endDate, eventData.endTime)
        if (dateErr) {
            newErrors.dateTime = dateErr
            if (!firstErrorMessage) {
                firstErrorMessage = dateErr
                firstErrorField = 'dateTime'
            }
        }

        const locErr = validateLocation(eventData.location)
        if (locErr) {
            newErrors.location = locErr
            if (!firstErrorMessage) {
                firstErrorMessage = locErr
                firstErrorField = 'location'
            }
        }

        const overviewErr = validateOverview(eventData.description)
        if (overviewErr) {
            newErrors.description = overviewErr
            if (!firstErrorMessage) {
                firstErrorMessage = overviewErr
                firstErrorField = 'description'
            }
        }

        setErrors(newErrors)

        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors,
            firstErrorMessage,
            firstErrorField
        }
    }

    // Hàm focus vào field bị lỗi và expand card tương ứng
    const focusErrorField = (field: ValidationResult['firstErrorField']) => {
        if (!field) return

        // Expand card tương ứng
        switch (field) {
            case 'media':
                mediaCardRef.current?.expand()
                setTimeout(() => mediaRef.current?.focus(), 300)
                break
            case 'title':
                titleCardRef.current?.expand()
                setTimeout(() => titleRef.current?.focus(), 300)
                break
            case 'dateTime':
            case 'location':
                dateLocationCardRef.current?.expand()
                setTimeout(() => {
                    if (field === 'dateTime') {
                        dateTimeRef.current?.focus()
                    } else {
                        locationRef.current?.focus()
                    }
                }, 300)
                break
            case 'description':
                overviewCardRef.current?.expand()
                setTimeout(() => overviewRef.current?.focus(), 300)
                break
        }
    }

    const handleHasChanges = (original: EventFormData, current: EventFormData): boolean => {
        return JSON.stringify(original) !== JSON.stringify(current)
    }

    const handleBackClick = () => {
        const hasChanges = originalEventData && eventData
            ? handleHasChanges(originalEventData, eventData)
            : false

        if (hasChanges) {
            showConfirmAlert("Are you sure to leave the page?", "Unsaved changes will be lost.").then((confirmed) => {
                if (confirmed) {
                    navigate("/organizer/events/all")
                }
            })
        } else {
            navigate("/organizer/events/all")
        }
    }

    const handleFetchOwnerEvents = useCallback(async () => {
        try {
            showLoadingAlert("Fetching events...")
            const result = await dispatch(getEventsByOwner()) as unknown as OrganizerEventsListItem[]
            setEvents(result)
            closeLoadingAlert()
        } catch (error: any) {
            closeLoadingAlert()
            showErrorAlert("Failed to fetch events", error.message || "An error occurred while fetching events.")
        }
    }, [dispatch])
    const handleFetchOtherEvents = useCallback(async () => {
        try {
            showLoadingAlert("Fetching events...")
            const result = await dispatch(getEventsByOwner()) as unknown as OrganizerEventsListItem[]

            setOtherEvents(result)
            closeLoadingAlert()
        } catch (error: any) {
            closeLoadingAlert()
            showErrorAlert("Failed to fetch events", error.message || "An error occurred while fetching events.")
        }
    }, [dispatch])
    useEffect(() => {
        handleFetchOwnerEvents()
    }, [handleFetchOwnerEvents])

    const handleViewEvent = (eventId: number) => {
        navigate(`/organizer/events/dashboard/${eventId}`)
    }

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || event.status === statusFilter.toUpperCase()
        return matchesSearch && matchesStatus
    })

    const filteredMyEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || event.status === statusFilter.toUpperCase()
        return matchesSearch && matchesStatus
    })

    const filteredOtherEvents = otherEvents.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || event.status === statusFilter.toUpperCase()
        return matchesSearch && matchesStatus
    })

    useEffect(() => {
        if (activeTab === "other" && otherEvents.length === 0) {
            handleFetchOtherEvents()
        }
    }, [activeTab, otherEvents.length, handleFetchOtherEvents])

    const handleTabChange = (tab: "my" | "other") => {
        setActiveTab(tab)
        // Reset search và filter khi đổi tab
        setSearchQuery("")
        setStatusFilter("All")
    }

    const getStatusColor = (status: string) => {
        const s = String(status || "").toUpperCase(); // normalize
        switch (s) {
            case "DRAFT":
                return "bg-gray-100 text-gray-700";
            case "PUBLISHED":
                return "bg-green-100 text-green-700";
            case "APPROVAL_PENDING":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    }


    const handleStepClick = (stepId: number) => {
        setCurrentSection(stepId)
    }

    const handleMenuItemClick = (itemId: string) => {
        setCurrentSection(itemId)
    }

    const handleUpdateEvent = async () => {
        const validationResult = validateForm()

        if (!validationResult.isValid) {
            focusErrorField(validationResult.firstErrorField)
            await showErrorAlert(validationResult.firstErrorMessage || "Please fix the errors in the form before saving.")
            return
        }

        try {
            showLoadingAlert("Saving changes...")

            //TODO: Implement update API call here
            const bannerFile = uploadedMedia.find(m => m.type === 'image' && m.file)?.file
            const formDTO = await eventConverter.convertEventDataToFormDTO(eventData!, bannerFile)
            await dispatch(updateEvent(eventId, formDTO))

            closeLoadingAlert()
            await showSuccessAlert("Event updated successfully!")

            // Update original data to prevent unsaved changes warning
            if (eventData) {
                setOriginalEventData(eventData)
            }
        } catch (err: any) {
            closeLoadingAlert()
            console.error("[EventViewModel] Failed to save changes:", err)
            await showErrorAlert(err?.message || "An error occurred while saving changes.")
        }
    }

    // Handler để update organizerId
    const handleOrganizerChange = useCallback((newOrganizerId: number) => {
        setPublishOrganizerId(newOrganizerId)
        // Update vào eventData
        if (eventData) {
            const updatedEventData = {
                ...eventData,
                organizerId: newOrganizerId
            }
            setEventDataLocal(updatedEventData)
            dispatch(setEventData(updatedEventData))
        }
    }, [eventData, dispatch])

    // Handler để update categoryIds
    const handleCategoryChange = useCallback((newCategoryIds: number[]) => {
        setPublishCategoryIds(newCategoryIds)
        // Update vào eventData
        if (eventData) {
            const updatedEventData = {
                ...eventData,
                category: newCategoryIds
            }
            setEventDataLocal(updatedEventData)
            dispatch(setEventData(updatedEventData))
        }
    }, [eventData, dispatch])

    const handlePublishEvent = useCallback(async () => {
        if (!eventId || !eventData) {
            showErrorAlert("Invalid Event", "Event data is missing.")
            return false
        }
        // Validate categories
        if (!publishOrganizerId) {
            showErrorAlert("Missing Categories", "Please select at least one category.")
            return false
        }
        if (!publishCategoryIds || publishCategoryIds.length === 0) {
            showErrorAlert("Missing Organizer", "Please select an organizer for the event.")
            return false
        }
        setIsPublishing(true)
        try {
            showLoadingAlert("Publishing event...")
            const publishEventData: EventFormData = {
                ...eventData,
                organizerId: publishOrganizerId,
                category: publishCategoryIds
            }
            const bannerFile = uploadedMedia.find(m => m.type === 'image' && m.file)?.file
            const formDTO = await eventConverter.convertEventDataToFormDTO(publishEventData, bannerFile)
            await dispatch(publishEvent(eventId, formDTO))

            closeLoadingAlert()
            await showSuccessAlert("Event Published!", "Your event has been submitted for approval.")
            navigate("/organizer/events/all")
            return true
        } catch (error: any) {
            showErrorAlert("Failed to publish event", error.message || "Please try again later.")
            return false
        } finally {
            setIsPublishing(false)
        }
    }, [eventId, eventData, publishOrganizerId, publishCategoryIds, uploadedMedia, dispatch, navigate])

    const handleNavigateToEditEvent = useCallback(async (eventId: number) => {
        navigate(`/organizer/events/edit/${eventId}`)
    }, [dispatch, navigate])

    const handleUpdateEventData = useCallback((newData: EventFormData) => {
        setEventDataLocal(newData)
        dispatch(setEventData(newData))
    }, [dispatch])

    return {
        currentEvent,
        isLoading,
        error,
        isSaved,
        filteredEvents,
        searchQuery,
        currentSection,
        eventData,
        uploadedMedia,
        goodToKnowData,
        errors,
        isPublishing,
        publishOrganizerId,
        publishCategoryIds,
        activeTab,
        filteredMyEvents,
        filteredOtherEvents,
        completedSteps,
        ticketsCount: ticketsFromStore?.length || 0,

        // Refs
        mediaCardRef,
        titleCardRef,
        dateLocationCardRef,
        overviewCardRef,
        titleRef,
        dateTimeRef,
        locationRef,
        overviewRef,
        mediaRef,

        // Actions
        setCurrentSection,
        setSearchQuery,
        viewMode,
        setViewMode,
        statusFilter,
        handleBackClick,
        handleUpdateEvent,
        handlePublishEvent,
        handleStepClick,
        handleMenuItemClick,
        handleTabChange,
        getStatusColor,
        setStatusFilter,
        handleNavigateToEditEvent,
        handleViewEvent,
        handleOrganizerChange,
        handleCategoryChange,
        setUploadedMedia,
        setGoodToKnowData,
        handleUpdateEventData,
        validateForm,
    }
}