export const FETCH_EVENTS_BY_USER = "FETCH_EVENTS_BY_USER";
export const CLEAR_EVENTS = "CLEAR_EVENTS";
export const FETCH_EVENTS = "FETCH_EVENTS";
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

export const getEvents = () => {
  const dummyEvents = [
    { id: "e1", title: "Event A", description: "Đây là mô tả cơ bản dành cho sự kiện A", location: "Đà Nẵng", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
    { id: "e2", title: "Event B", description: "Đây là mô tả cơ bản dành cho sự kiện B", location: "Đà Nẵng", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
    { id: "e3", title: "Event C", description: "Đây là mô tả cơ bản dành cho sự kiện C", location: "Đà Nẵng", starttime: "2025-01-01", endtime: "2025-01-02", status: "Public"},
  ];
  
  return {
    type: FETCH_EVENTS,
    payload: dummyEvents
  };
}

export const clearEvents = () => ({
  type: CLEAR_EVENTS,
});
