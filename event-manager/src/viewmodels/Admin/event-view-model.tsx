import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByUser, clearEvents, getPublicEvents, getPendingEvents } from "../../store/actions/Admin/event-action";
import { useEffect } from "react";
import type { RootState } from "../../store/store";

export const useEventViewModel = () => {
  const dispatch = useDispatch();
  const eventsByUser = useSelector((state: any) => state.event.eventsByUser);
  const publicEvents = useSelector((state: RootState) => state.event.publicEvents);
  const pendingEvents = useSelector((state: RootState) => state.event.pendingEvents)

  useEffect(() => {
      dispatch(getPublicEvents());
      dispatch(getPendingEvents());
    }, [dispatch]);
  
  
  const getEventsForUser = (email: string) => {
    dispatch(fetchEventsByUser(email));
  };

  const resetEvents = () => {
    dispatch(clearEvents());
  };


  return {
    publicEvents,
    pendingEvents,
    eventsByUser,
    getEventsForUser,
    resetEvents,
  };
};
