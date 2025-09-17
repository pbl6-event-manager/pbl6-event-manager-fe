export const FETCH_EVENTS_BY_USER = "FETCH_EVENTS_BY_USER";
export const CLEAR_EVENTS = "CLEAR_EVENTS";

export const fetchEventsByUser = (email: string) => {
  const dummyEvents = [
    { id: "e1", name: "Sự kiện A", date: "2025-09-01", location: "Hà Nội" },
    { id: "e2", name: "Sự kiện B", date: "2025-09-05", location: "TP.HCM" },
  ];

  return {
    type: FETCH_EVENTS_BY_USER,
    payload: { email, events: dummyEvents },
  };
};

export const clearEvents = () => ({
  type: CLEAR_EVENTS,
});
