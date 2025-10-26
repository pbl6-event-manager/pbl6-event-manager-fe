import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
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
} from "../../../store/actions/Organizer/event-action"
import type { EventData, GoodToKnowData, LineUpItem, AgendaSection } from "../../../models";

export const useEventViewModel = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { currentEvent, isLoading, error, isSaved } = useSelector((state: RootState) => state.organizerEvent)

    const initializeEvent = (eventData: EventData) => {
        dispatch(setEventData(eventData))
    }

    const updateField = (field: keyof EventData, value: any) => {
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

    const updateDateLocationData = (data: Partial<EventData>) => {
        dispatch(updateDateLocation(data))
    }

    const resetEvent = () => {
        dispatch(resetEventData())
    }

    const saveEvent = async (eventData: EventData) => {
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