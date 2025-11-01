import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { createEventThunk } from "../../../store/actions/Organizer/create-event-action";
import type { RootState, AppDispatch } from "../../../store/store"
import type { EventFormDTO } from "../../../dtos/event-dto";

export const useCreateEventViewModel = () => {
    const dispatch = useDispatch<AppDispatch>()

    // Select state from Redux
    const { isLoading, error, createdEvent, isSuccess } = useSelector((state: RootState) => state.createEvent)

    const createEvent = useCallback(
        async (formData: EventFormDTO) => {
            try {
                const result = await dispatch<any>(createEventThunk(formData))
                return result
            } catch (err) {
                console.error("[v0] Create event error:", err)
                throw err
            }
        },
        [dispatch],
    )
    const resetState = useCallback(() => {
        // Dispatch reset action if needed
    }, [dispatch])

    return {
        // State
        isLoading,
        error,
        createdEvent,
        isSuccess,

        // Methods
        createEvent,
        resetState,
    }
}