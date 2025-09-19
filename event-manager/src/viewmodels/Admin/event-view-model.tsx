import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByUser, clearEvents, getEvents } from "../../store/actions/Admin/event-action";
import { useEffect } from "react";
import type { RootState } from "../../store/store";

export const useEventViewModel = () => {
  const dispatch = useDispatch();
  const eventsByUser = useSelector((state: any) => state.event.eventsByUser);
  const events = useSelector((state: RootState) => state.event.events);

  useEffect(() => {
      dispatch(getEvents());
    }, [dispatch]);

  const getEventsForUser = (email: string) => {
    dispatch(fetchEventsByUser(email));
  };

  const resetEvents = () => {
    dispatch(clearEvents());
  };


  return {
    events,
    eventsByUser,
    getEventsForUser,
    resetEvents,
  };
};
