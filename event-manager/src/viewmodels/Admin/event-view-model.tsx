import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByUser, clearEvents } from "../../store/actions/Admin/event-action";

export const useEventViewModel = () => {
  const dispatch = useDispatch();
  const eventsByUser = useSelector((state: any) => state.event.eventsByUser);

  const getEventsForUser = (email: string) => {
    dispatch(fetchEventsByUser(email));
  };

  const resetEvents = () => {
    dispatch(clearEvents());
  };

  return {
    eventsByUser,
    getEventsForUser,
    resetEvents,
  };
};
