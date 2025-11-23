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
            showLoadingAlert("Fetching events...")
            const result = await dispatch(getEventsByOwner()) as unknown as OrganizerEventsListItem[]
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