import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { use, useCallback, useEffect, useState } from "react";
import { getEventsByOwner } from "../../../store/actions/event-action";
import type { OrganizerEventsListItem } from "../../../models/form-models/event-form-models";
import { showLoadingAlert, showSuccessAlert, showErrorAlert, closeLoadingAlert, showConfirmAlert } from "../../../helpers/alert-helpers";
import {
    setEventData,
    updateEventField,
    updateOverview,
    updateGoodToKnow,
    updateLineup,
    updateAgenda,
    updateDateLocation,
    resetEventData,
    saveEventStart,
    saveEventSuccess,
    saveEventFailure,
} from "../../../store/actions/event-action"
import type { EventFormData, GoodToKnowData, LineUpItem, AgendaSection } from "../../../models/form-models/event-form-models";
import { set } from "react-hook-form";
// Mock event data
const mockEvents: OrganizerEventsListItem[] = [
    {
        id: 1,
        title: "League of Legends Championship Pacific Finals Weekend 2025",
        address: "Tien Son Sport Center",
        startDate: "Saturday, September 6, 2025",
        endDate: "Sunday, September 7, 2025",
        bannerImagePath: "/esports-arena.png",
        soldTickets: 0,
        capacity: 200,
        organizerName: "Esports Org",
        status: "Draft",
    },
    {
        id: 2,
        title: "Tech Conference 2025",
        address: "Convention Center",
        startDate: "Monday, October 15, 2025",
        endDate: "Monday, October 15, 2025",
        bannerImagePath: "/tech-conference.png",
        soldTickets: 150,
        capacity: 500,
        organizerName: "Tech Events Ltd.",
        status: "Pending",
    },
    {
        id: 3,
        title: "Summer Music Festival",
        address: "City Park",
        startDate: "Friday, July 20, 2025",
        endDate: "Friday, July 20, 2025",
        bannerImagePath: "/vibrant-music-festival.png",
        soldTickets: 450,
        capacity: 1000,
        organizerName: "Summer Music Org",
        status: "Published",
    },
]

export const useEventViewModel = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { eventsByUser, currentEvent, isLoading, error, isSaved } = useSelector((state: RootState) => state.eventReducer);
    const navigate = useNavigate()
    const [events, setEvents] = useState<OrganizerEventsListItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
    const [statusFilter, setStatusFilter] = useState<string>("All")

    const handleFetchOwnerEvents = useCallback(async () => {
        try {
            console.log("eventsByUser:", eventsByUser);
            showLoadingAlert("Fetching events...")
            const result = await dispatch(getEventsByOwner()) as unknown as OrganizerEventsListItem[]
            console.log("Fetched events:", result);
            setEvents(result)
            closeLoadingAlert()
        } catch (error: any) {
            closeLoadingAlert()
            showErrorAlert("Failed to fetch events", error.message || "An error occurred while fetching events.")
        }
    }, [dispatch])
    useEffect(() => {
        handleFetchOwnerEvents()
    }, [handleFetchOwnerEvents])

    const handleDeleteEvent = (eventId: number) => {
        setEvents(events.filter((event) => event.id !== eventId))
    }

    const handleEditEvent = (eventId: number) => {
        navigate(`/organizer/events/edit/${eventId}`)
    }

    const handleViewEvent = (eventId: number) => {
        navigate(`/organizer/events/dashboard/${eventId}`)
    }

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || event.status === statusFilter.toUpperCase()
        return matchesSearch && matchesStatus
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Draft":
                return "bg-gray-100 text-gray-700"
            case "Published":
                return "bg-green-100 text-green-700"
            case "Pending":
                return "bg-yellow-100 text-yellow-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const initializeEvent = (eventData: EventFormData) => {
        dispatch(setEventData(eventData))
    }

    const updateField = (field: keyof EventFormData, value: any) => {
        dispatch(updateEventField(field, value))
    }

    const updateDescription = (description: string) => {
        dispatch(updateOverview(description))
    }

    const updateGoodToKnowData = (data: GoodToKnowData) => {
        dispatch(updateGoodToKnow(data))
    }

    const updateLineupData = (lineup: LineUpItem[]) => {
        dispatch(updateLineup(lineup))
    }

    const updateAgendaData = (agenda: AgendaSection[]) => {
        dispatch(updateAgenda(agenda))
    }

    const updateDateLocationData = (data: Partial<EventFormData>) => {
        dispatch(updateDateLocation(data))
    }

    const resetEvent = () => {
        dispatch(resetEventData())
    }

    const saveEvent = async (eventData: EventFormData) => {
        dispatch(saveEventStart())
        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(saveEventSuccess(eventData))
            return { success: true, data: eventData }
        } catch (err: any) {
            dispatch(saveEventFailure(err.message || "Failed to save event"))
            return { success: false, error: err.message }
        }
    }

    return {
        currentEvent,
        isLoading,
        error,
        isSaved,
        filteredEvents,
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        statusFilter,
        getStatusColor,
        setStatusFilter,
        handleDeleteEvent,
        handleEditEvent,
        handleViewEvent,
        initializeEvent,
        updateField,
        updateDescription,
        updateGoodToKnowData,
        updateLineupData,
        updateAgendaData,
        updateDateLocationData,
        resetEvent,
        saveEvent,
    }
}