import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { createNewEvent } from "../../../store/actions/event-action";
import type { RootState, AppDispatch } from "../../../store/store"
import type { EventFormDto } from "../../../dtos/event-dto";
import { showLoadingAlert, closeLoadingAlert, showSuccessAlert, showErrorAlert, showConfirmAlert } from "../../../helpers/alert-helpers"
import { eventConverter } from "../../../converters/event-converter"
import type { EventFormData, EventFormErrors, GoodToKnowData, MediaFileModel } from "../../../models/form-models/event-form-models"

interface ValidationResult {
    isValid: boolean;
    errors: EventFormErrors;
    firstErrorMessage: string | null;
    firstErrorField: 'media' | 'title' | 'dateTime' | 'location' | 'description' | null;
}

export const useCreateEventViewModel = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, error, createEvent, isSuccess } = useSelector((state: RootState) => state.eventReducer)
    const [currentStep, setCurrentStep] = useState(1)
    const [eventData, setEventData] = useState<EventFormData>({
        mediaFile: null,
        title: "",
        summary: "",
        description: "",
        startDate: "",
        startTime: "10:00",
        endDate: "",
        endTime: "12:00",
        location: {
            type: "venue",
            country: "",
            city: "",
            venueName: "",
            address1: "",
            address2: "",
            stateProvince: "",
        },
        goodToKnowData: {
            doorTime: null,
            ageInfo: null,
            parkingInfo: null,
            faqs: [],
        },
        lineUp: [],
        agenda: [],
        ticketType: null,
        capacity: 0,
        category: [],
        timezone: "",
        language: "en-US"
    })
    const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId)
    }
  }
    const [errors, setErrors] = useState<EventFormErrors>({})
    const [uploadedMedia, setUploadedMedia] = useState<MediaFileModel[]>([])
    const [goodToKnowData, setGoodToKnowData] = useState<GoodToKnowData>({
        doorTime: null,
        ageInfo: null,
        parkingInfo: null,
        faqs: [],
    })
    const navigate = useNavigate()

    // Refs for card components - để trigger expand
    const mediaCardRef = useRef<{ expand: () => void }>(null)
    const titleCardRef = useRef<{ expand: () => void }>(null)
    const dateLocationCardRef = useRef<{ expand: () => void }>(null)
    const overviewCardRef = useRef<{ expand: () => void }>(null)

    // Refs for focusing on error fields (trong các card)
    const titleRef = useRef<HTMLInputElement>(null)
    const dateTimeRef = useRef<HTMLInputElement>(null)
    const locationRef = useRef<HTMLButtonElement>(null) // SearchableSelect dùng button
    const overviewRef = useRef<HTMLTextAreaElement>(null)
    const mediaRef = useRef<HTMLInputElement>(null)

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

    const validateLocation = (location: typeof eventData.location): string | null => {
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

    const handleCreateEvent = useCallback(async (formData: EventFormDto) => {
        try {
            const actionResult = await dispatch<any>(createNewEvent(formData))

            return actionResult
        } catch (err) {
            console.error("[v0] Create event error:", err)
            throw err
        }
    },
        [dispatch],
    )

    const handleSaveAndContinue = async () => {
        const validationResult = validateForm()

        if (!validationResult.isValid) {
            focusErrorField(validationResult.firstErrorField)
            await showErrorAlert(validationResult.firstErrorMessage || "Please fix the errors in the form before continuing.")
            return
        }

        try {
            showLoadingAlert("Creating event...")
            console.log("[debug] Creating event with data:", eventData)
            let formDTO: EventFormDto
            try {
                const bannerFile : File | undefined = uploadedMedia.find(m => m.type === 'image')?.file
                formDTO = await eventConverter.convertEventDataToFormDTO(
                    eventData,
                    bannerFile,
                )
            } catch (convErr) {
                closeLoadingAlert()
                await showErrorAlert(String(convErr || "Invalid form data"))
                throw new Error("Event form data conversion failed" + String(convErr))
                return
            }
            await handleCreateEvent(formDTO)
            closeLoadingAlert()
            await showSuccessAlert("Event created successfully!")
            const eventId = createEvent?.id
            if ( !eventId ) {
                navigate("/organizer/events/all")
            } else {
                navigate(`/organizer/events/edit/${eventId}?step=2`)
            }
        } catch (err: any) {
            closeLoadingAlert()
            console.error("[v0] Failed to create event: ", err)
            await showErrorAlert(err?.message || "An error occurred while creating the event.")
        }
    }

    const handleBackClick = () => {
        showConfirmAlert("Are you sure to leave the page?", "Unsaved changes will be lost.").then(async (confirmed) => {
            if (confirmed) {
                navigate("/organizer/events/all")
            }
        })
    }

    const resetState = useCallback(() => {
        // Dispatch reset action if needed
    }, [dispatch])

    return {
        isLoading,
        error,
        createEvent,
        isSuccess,
        eventData,
        errors,
        uploadedMedia,
        goodToKnowData,
        currentStep,

        // Card refs để expand
        mediaCardRef,
        titleCardRef,
        dateLocationCardRef,
        overviewCardRef,

        // Field refs để focus
        titleRef,
        dateTimeRef,
        locationRef,
        overviewRef,
        mediaRef,

        handleSaveAndContinue,
        handleBackClick,
        handleStepClick,
        validateForm,
        setEventData,
        setErrors,
        setUploadedMedia,
        setGoodToKnowData,
        handleCreateEvent,
        resetState
    }
}