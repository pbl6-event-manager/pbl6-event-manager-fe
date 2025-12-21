import { getTicketsByEventIdAction } from "../../../store/actions/ticket-action"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../../store/store"
import { useNavigate, useSearchParams, useParams } from "react-router-dom"
import { useCallback, useEffect, useState, useRef, useMemo } from "react"
import {
  getEventsByOwner,
  getEventDetailsById,
  setEventData,
  updateEvent,
  publishEvent,
  getEventsByStaff,
  deleteEvent,
} from "../../../store/actions/event-action"
import type {
  EventFormErrors,
  MediaFileModel,
  OrganizerEventsListItem,
  StaffEventsListItem,
} from "../../../models/form-models/event-form-models"
import {
  showLoadingAlert,
  showSuccessAlert,
  showErrorAlert,
  closeLoadingAlert,
  showConfirmAlert,
} from "../../../helpers/alert-helpers"
import type { EventFormData, GoodToKnowData } from "../../../models/form-models/event-form-models"
import { eventConverter } from "../../../converters/event-converter"
import type { EventDetailsDto } from "../../../dtos/event-dto"
import type { OverviewCardHandle } from "../../../components/Organizer/overview-card"
import type { DateLocationCardHandle } from "../../../components/Organizer/date-location-card"
import type { EventTitleCardHandle } from "../../../components/Organizer/event-title-card"
import type { MediaUploadCardHandle } from "../../../components/Organizer/media-upload-card"
import { toast } from "sonner"
import { convertTicketListToDashboardTicketInfo } from "../../../converters/ticket-converter"
import type { DashboardTicketInfoDto } from "../../../dtos/ticket-dto"
import { checkIn, getAllOrdersByEventId, getAttendee, getOrders } from "../../../store/actions/order-action"
import type { DashboardOrderStatsDto, OrderListDto, OrderSearchParamsDto } from "../../../dtos/order-dto"
import { convertOrderListToDashboardOrderInfoDto } from "../../../converters/order-converter"
import type { AttendeeListDto } from "../../../dtos/attendee-dto"
import { convertResponseToAttendeeInfoDto } from "../../../converters/attendee-converter"

interface ValidationResult {
  isValid: boolean
  errors: EventFormErrors
  firstErrorMessage: string | null
  firstErrorField: "media" | "title" | "dateTime" | "location" | "description" | null
}

export const useEventViewModel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentEvent, isLoading, error, isSaved } = useSelector((state: RootState) => state.eventReducer)
  const navigate = useNavigate()
  const eventId = Number.parseInt(useParams<{ eventId: string }>().eventId || "")
  const [errors, setErrors] = useState<EventFormErrors>({})
  const [events, setEvents] = useState<OrganizerEventsListItem[]>([])
  const [otherEvents, setOtherEvents] = useState<StaffEventsListItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [searchParams, setSearchParams] = useSearchParams()
  const allowedSections = ["dashboard", "team-management", "manage-attendee", "manage-orders", "discount"]
  const MAX_STEP = 3
  const [eventLoadError, setEventLoadError] = useState<string | null>(null)

  const rawSection = searchParams.get("section")
  const rawStep = searchParams.get("step")
  const rawTab = searchParams.get("tab")
  const initialTab: "my" | "other" = rawTab === "my" || rawTab === "other" ? rawTab : "my"
  const [activeTab, _setActiveTab] = useState<"my" | "other">(initialTab)

  const parsedStep = rawStep ? Number.parseInt(rawStep, 10) : undefined
  const initialResolved: string | number =
    rawSection && allowedSections.includes(rawSection)
      ? rawSection
      : parsedStep && !Number.isNaN(parsedStep)
        ? Math.max(1, Math.min(MAX_STEP, parsedStep))
        : 1

  const [currentSectionState, setCurrentSectionState] = useState<string | number>(initialResolved)

  const setCurrentSection = (s: string | number) => {
    const isStep = typeof s === "number" || (!Number.isNaN(Number(s)) && String(Number(s)) === String(s))
    let stepVal: number | null = null
    let sectionVal: string | null = null

    if (isStep) {
      const n = Number(s)
      stepVal = Math.max(1, Math.min(MAX_STEP, Math.floor(n)))
    } else {
      const ss = String(s).trim()
      sectionVal = allowedSections.includes(ss) ? ss : null
    }

    if (stepVal === null && sectionVal === null) return

    const newState: string | number = stepVal !== null ? stepVal : (sectionVal as string)
    setCurrentSectionState(newState)

    try {
      const sp = new URLSearchParams(searchParams.toString())
      if (stepVal !== null) {
        sp.set("step", String(stepVal))
        sp.delete("section")
      } else {
        sp.set("section", sectionVal as string)
        sp.delete("step")
      }
      setSearchParams(sp, { replace: true })
    } catch (e) { }
  }

  const setActiveTab = (tab: "my" | "other") => {
    _setActiveTab(tab)
    try {
      const sp = new URLSearchParams(searchParams.toString())
      sp.set("tab", tab)
      setSearchParams(sp, { replace: true })
    } catch (e) { }
  }

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
  const [dashboardTicketInfo, setDashboardTicketInfo] = useState<DashboardTicketInfoDto>()
  const [dashboardRevenueInfo, setDashboardRevenueInfo] = useState<number>(0)
  const [dashboardAttendeeInfo, setDashboardAttendeeInfo] = useState<number>(0)
  const [dashboardOrderStats, setDashboardOrderStats] = useState<DashboardOrderStatsDto[]>()

  // Refs for card components - để trigger expand
  const mediaCardRef = useRef<MediaUploadCardHandle>(null)
  const titleCardRef = useRef<EventTitleCardHandle>(null)
  const dateLocationCardRef = useRef<DateLocationCardHandle>(null)
  const overviewCardRef = useRef<OverviewCardHandle>(null)

  // Refs for focusing on error fields (trong các card)
  const titleRef = useRef<HTMLInputElement>(null)
  const dateTimeRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLButtonElement>(null)
  const overviewRef = useRef<HTMLTextAreaElement>(null)
  const mediaRef = useRef<HTMLInputElement>(null)

  const displayEventData = eventData || {
    mediaFile: null,
    status: "DRAFT",
    title: "Event Information",
    summary: "Limited access",
    description: "You have limited access to this event. Some information may be restricted.",
    startDate: new Date().toISOString().split('T')[0],
    startTime: "00:00",
    endDate: new Date().toISOString().split('T')[0],
    endTime: "23:59",
    location: {
      type: "venue" as const,
      country: "",
      city: "",
      venueName: "Restricted",
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
    timezone: "UTC",
    language: "en",
    organizerId: undefined,
  };

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
  }, [eventData, ticketsFromStore?.length])

  const fetchEventDetails = async () => {
    if (!eventId) return

    setEventLoadError(null)

    try {
      showLoadingAlert("Loading event details...")
      const result = (await dispatch(getEventDetailsById(Number(eventId)))) as unknown as EventDetailsDto

      // Load tickets ngay sau khi load event
      await dispatch(getTicketsByEventIdAction(Number(eventId)))

      const params: Partial<OrderSearchParamsDto> = {}
      params.eventId = eventId

      const response = convertOrderListToDashboardOrderInfoDto(
        await dispatch<any>(getOrders(params as OrderSearchParamsDto, false)),
      )
      setDashboardRevenueInfo(response.totalRevenue)
      setDashboardAttendeeInfo(response.totalAttendee)
      setDashboardOrderStats(response.orderStats)

      if (result) {
        // Map event details to form data
        const formData = eventConverter.convertEventDetailToFormData(result)
        const mediaFiles = eventConverter.convertBannerToMediaFile(result.eventInfo?.bannerImagePath ?? null)
        const ticketInfo = convertTicketListToDashboardTicketInfo(result.ticket)
        setDashboardTicketInfo(ticketInfo)
        setEventDataLocal(formData)
        setOriginalEventData(formData)
        setUploadedMedia(mediaFiles)
        dispatch(setEventData(formData))
      }
      closeLoadingAlert()
    } catch (err: any) {
      closeLoadingAlert()
      // ... existing error handling
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

  const validateLocation = (location: EventFormData["location"]): string | null => {
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

    const allowedImageFormats = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    const allowedVideoFormats = ["video/mp4", "video/webm", "video/ogg"]
    const maxImageSize = 5 * 1024 * 1024 // 5MB
    const maxVideoSize = 50 * 1024 * 1024 // 50MB

    for (const file of media) {
      // Skip validation for existing files (no File object)
      if (!file.file) continue

      const isImage = file.type === "image"
      const isVideo = file.type === "video"

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
    let firstErrorField: ValidationResult["firstErrorField"] = null

    // Validate theo thứ tự ưu tiên
    const mediaErr = validateMedia(uploadedMedia)
    if (mediaErr) {
      newErrors.media = mediaErr
      if (!firstErrorMessage) {
        firstErrorMessage = mediaErr
        firstErrorField = "media"
      }
    }

    const titleErr = validateTitle(eventData.title)
    if (titleErr) {
      newErrors.title = titleErr
      if (!firstErrorMessage) {
        firstErrorMessage = titleErr
        firstErrorField = "title"
      }
    }

    const dateErr = validateDateTime(eventData.startDate, eventData.startTime, eventData.endDate, eventData.endTime)
    if (dateErr) {
      newErrors.dateTime = dateErr
      if (!firstErrorMessage) {
        firstErrorMessage = dateErr
        firstErrorField = "dateTime"
      }
    }

    const locErr = validateLocation(eventData.location)
    if (locErr) {
      newErrors.location = locErr
      if (!firstErrorMessage) {
        firstErrorMessage = locErr
        firstErrorField = "location"
      }
    }

    const overviewErr = validateOverview(eventData.description)
    if (overviewErr) {
      newErrors.description = overviewErr
      if (!firstErrorMessage) {
        firstErrorMessage = overviewErr
        firstErrorField = "description"
      }
    }

    setErrors(newErrors)

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
      firstErrorMessage,
      firstErrorField,
    }
  }

  // Hàm focus vào field bị lỗi và expand card tương ứng
  const focusErrorField = (field: ValidationResult["firstErrorField"]) => {
    if (!field) return

    // Expand card tương ứng
    switch (field) {
      case "media":
        mediaCardRef.current?.expand()
        setTimeout(() => mediaRef.current?.focus(), 300)
        break
      case "title":
        titleCardRef.current?.expand()
        setTimeout(() => titleRef.current?.focus(), 300)
        break
      case "dateTime":
      case "location":
        dateLocationCardRef.current?.expand()
        setTimeout(() => {
          if (field === "dateTime") {
            dateTimeRef.current?.focus()
          } else {
            locationRef.current?.focus()
          }
        }, 300)
        break
      case "description":
        overviewCardRef.current?.expand()
        setTimeout(() => overviewRef.current?.focus(), 300)
        break
    }
  }

  const handleHasChanges = (original: EventFormData, current: EventFormData): boolean => {
    return JSON.stringify(original) !== JSON.stringify(current)
  }

  const handleBackClick = () => {
    const hasChanges = originalEventData && eventData ? handleHasChanges(originalEventData, eventData) : false

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
      const result = (await dispatch(getEventsByOwner())) as unknown as OrganizerEventsListItem[]
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
      const result = (await dispatch(getEventsByStaff())) as unknown as StaffEventsListItem[]
      console.log("[debug] Staff Events List Item:", result)
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
    navigate(`/organizer/events/detail/${eventId}?section=dashboard`)
  }

  const filteredMyEvents = events.filter((event) => {
    if (event.status === "DELETED") return false
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || event.status === statusFilter.toUpperCase()
    if (statusFilter === "Pending") {
      return matchesSearch && event.status === "APPROVAL_PENDING"
    }
    return matchesSearch && matchesStatus
  })

  const filteredOtherEvents = otherEvents.filter((event) => {
    if (event.status === "DELETED") return false
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || event.status === statusFilter.toUpperCase()
    if (statusFilter === "Pending") {
      return matchesSearch && event.status === "APPROVAL_PENDING"
    }
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
    const s = String(status || "").toUpperCase() // normalize
    switch (s) {
      case "DRAFT":
        return "bg-gray-100 text-gray-700"
      case "PUBLISHED":
        return "bg-green-100 text-green-700"
      case "APPROVAL_PENDING":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleStepClick = (stepId: number) => {
    setCurrentSection(stepId)
  }

  const handleMenuItemClick = async (itemId: string) => {
    setCurrentSection(itemId)
    if (itemId === "dashboard") {
      await fetchEventDetails()
    }

    if (itemId === "manage-orders") {
      await fetchOrdersByEventId(eventId)
    }
  }
  const [orders, setOrders] = useState<OrderListDto[]>()
  const [selectedOrder, setSelectedOrder] = useState<OrderListDto>()
  const [filteredOrders, setFilteredOrders] = useState<OrderListDto[]>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalRevenue, setTotalRevenue] = useState<number>(0)
  const [totalTicket, setTotalTicket] = useState<number>(0)
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

  const handleViewOrderDetails = (order?: OrderListDto) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered?.filter(
        (o) =>
          o.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered?.filter((o) => o.status === filterStatus)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, filterStatus, orders])

  const fetchOrdersByEventId = useCallback(
    async (eid?: number) => {
      const params: Partial<OrderSearchParamsDto> = {}
      params.eventId = typeof eid === "number" ? eid : eventId
      try {
        showLoadingAlert("Loading orders")
        const response: OrderListDto[] = await dispatch<any>(getAllOrdersByEventId(eventId, false))
        setFilteredOrders(response)
        setTotalCount(response.length)
        const converted = convertOrderListToDashboardOrderInfoDto(response)
        setTotalRevenue(converted.totalRevenue)
        setTotalTicket(converted.totalAttendee)
        closeLoadingAlert()
      } catch (error: any) {
        showErrorAlert(error?.message || "Failed to get orders of this event")
      }
    },
    [dispatch, eventId],
  )

  useEffect(() => {
    if (currentSectionState === "manage-orders") {
      setSearchTerm("")
      fetchOrdersByEventId()
    }
  }, [currentSectionState, fetchOrdersByEventId])

  const [attendees, setAttendees] = useState<AttendeeListDto[]>()
  const [filteredAttendees, setFilteredAttendees] = useState<AttendeeListDto[]>()
  const [filterCheckIn, setFilterCheckIn] = useState<string>("all")
  const [checkedInCount, setCheckedInCount] = useState<number>()

  useEffect(() => {
    // defensive copy to avoid mutating original attendees array
    const base = Array.isArray(attendees) ? [...attendees] : [];

    // apply search filter (case-insensitive)
    const q = (searchTerm || "").trim().toLowerCase();
    let filtered = q
      ? base.filter((a) =>
          (a.name || "").toLowerCase().includes(q) ||
          (a.ticketName || "").toLowerCase().includes(q) ||
          (a.email || "").toLowerCase().includes(q) ||
          String(a.orderId || "").toLowerCase().includes(q),
        )
      : base;

    // apply check-in filter (support "all", "true"/"checked", "false"/"unchecked")
    if (filterCheckIn && String(filterCheckIn).toLowerCase() !== "all") {
      const wantChecked = ["true", "checked"].includes(String(filterCheckIn).toLowerCase());
      filtered = filtered.filter((a) => String(a.isCheckin).toLowerCase() === String(wantChecked));
    }

    // sort by name (localeCompare) without mutating original
    const sorted = filtered.sort((a, b) =>
      String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base" }),
    );

    setFilteredAttendees(sorted);
  }, [searchTerm, filterCheckIn, attendees])

  const handleCheckIn = async (qrCode: string) => {
    try {
      const confirmed = await showConfirmAlert("Are you sure you want to check in this attendee?")
      if (confirmed) {
        showLoadingAlert()
        const response = await dispatch<any>(checkIn(qrCode, eventId))
        await showSuccessAlert("Checkin successfully")
        setFilteredAttendees(response)
        const attendeeInfo = convertResponseToAttendeeInfoDto(response)
        setTotalCount(attendeeInfo.totalAttendees)
        setCheckedInCount(attendeeInfo.totalCheckedIn)
        closeLoadingAlert()
      }
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to get attendees of this event")
    }
  }

  const fetchAttendeesByEventId = useCallback(
    async (eid?: number) => {
      try {
        showLoadingAlert("Loading attendees")
        const response: AttendeeListDto[] = await dispatch<any>(getAttendee(eid ? eid : eventId))
        setAttendees(response)
        setFilteredAttendees(response)
        const attendeeInfo = convertResponseToAttendeeInfoDto(response)
        setTotalCount(attendeeInfo.totalAttendees)
        setCheckedInCount(attendeeInfo.totalCheckedIn)
        closeLoadingAlert()
      } catch (error: any) {
        showErrorAlert(error?.message || "Failed to get attendees of this event")
      }
    },
    [dispatch, eventId],
  )

  useEffect(() => {
    if (currentSectionState === "manage-attendee") {
      fetchAttendeesByEventId()
      setSearchTerm("")
    }
  }, [currentSectionState, fetchAttendeesByEventId])

  const handleUpdateEvent = async (isOwner: boolean, canEditEvent: boolean) => {
    if (!isOwner || !canEditEvent) {
      toast.error("Permission Denied", {
        description: 'You need "Update Event" permission to save changes',
        duration: 4000,
      })
      return
    }

    const validationResult = validateForm()

    if (!validationResult.isValid) {
      focusErrorField(validationResult.firstErrorField)
      await showErrorAlert(validationResult.firstErrorMessage || "Please fix the errors in the form before saving.")
      return
    }

    try {
      showLoadingAlert("Saving changes...")

      //TODO: Implement update API call here
      const bannerFile = uploadedMedia.find((m) => m.type === "image" && m.file)?.file
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

  const handleDeleteEvent = async (eventId: number) => {
    try {
      const confirmed = await showConfirmAlert(
        "Delete Event",
        "Are you sure you want to delete this event? This action cannot be undone."
      );

      if (!confirmed) return;
      showLoadingAlert("Deleting event...")
      await dispatch(deleteEvent(eventId))
      closeLoadingAlert()
      await showSuccessAlert("Event deleted successfully!")
      // Cập nhật state local để xóa event khỏi danh sách
      if (activeTab === "my") {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      } else {
        setOtherEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      }
    } catch (error: any) {
      closeLoadingAlert()
      await showErrorAlert("Failed to delete event", error.message || "Please try again later.")
    }
  }

  // Handler để update organizerId
  const handleOrganizerChange = useCallback(
    (newOrganizerId: number) => {
      setPublishOrganizerId(newOrganizerId)
      // Update vào eventData
      if (eventData) {
        const updatedEventData = {
          ...eventData,
          organizerId: newOrganizerId,
        }
        setEventDataLocal(updatedEventData)
        dispatch(setEventData(updatedEventData))
      }
    },
    [eventData, dispatch],
  )

  // Handler để update categoryIds
  const handleCategoryChange = useCallback(
    (newCategoryIds: number[]) => {
      setPublishCategoryIds(newCategoryIds)
      // Update vào eventData
      if (eventData) {
        const updatedEventData = {
          ...eventData,
          category: newCategoryIds,
        }
        setEventDataLocal(updatedEventData)
        dispatch(setEventData(updatedEventData))
      }
    },
    [eventData, dispatch],
  )

  const handlePublishEvent = useCallback(
    async (isOwner: boolean, canPublishEvent: boolean) => {
      if (!isOwner && !canPublishEvent) {
        toast.error("Permission Denied", {
          description: 'You need "Publish Event" permission to publish this event',
          duration: 4000,
        })
        return
      }
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
          category: publishCategoryIds,
        }
        const bannerFile = uploadedMedia.find((m) => m.type === "image" && m.file)?.file
        const formDTO = await eventConverter.convertEventDataToFormDTO(publishEventData, bannerFile)
        console.log("[debug] Publish Event DTO:", formDTO)
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
    },
    [eventId, eventData, publishOrganizerId, publishCategoryIds, uploadedMedia, dispatch, navigate],
  )

  const handleNavigateToEditEvent = useCallback(
    async (eventId: number) => {
      navigate(`/organizer/events/detail/${eventId}?step=1`)
    },
    [dispatch, navigate],
  )

  const handleUpdateEventData = useCallback(
    (newData: EventFormData) => {
      setEventDataLocal(newData)
      dispatch(setEventData(newData))
    },
    [dispatch],
  )



  return {
    eventId,
    currentEvent,
    isLoading,
    error,
    isSaved,
    searchQuery,
    currentSection: currentSectionState,
    eventData,
    displayEventData,
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
    dashboardTicketInfo,
    dashboardOrderStats,

    // Actions
    setCurrentSection,
    setSearchQuery,
    viewMode,
    setViewMode,
    statusFilter,
    handleBackClick,
    handleUpdateEvent,
    handleDeleteEvent,
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
    dashboardRevenueInfo,
    dashboardAttendeeInfo,
    totalCount,
    totalRevenue,
    isDetailsOpen,
    handleViewOrderDetails,
    searchTerm,
    setSearchTerm,
    filteredOrders,
    setFilterStatus,
    filterStatus,
    orders,
    selectedOrder,
    setSelectedOrder,
    setIsDetailsOpen,
    totalTicket,
    setOrders,
    attendees,
    setAttendees,
    filterCheckIn,
    setFilterCheckIn,
    checkedInCount,
    setCheckedInCount,
    handleCheckIn,
    filteredAttendees,
    eventLoadError,
  }
}
