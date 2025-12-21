import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveRejectEvent, clearEvents, getAllEventsAdmin, getEventDetailsByIdAdmin, getEventsByOrganizerIds } from "../../../store/actions/event-action";
import type { RootState } from "../../../store/store";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert, showSuccessAlert } from "../../../helpers/alert-helpers";
import { useLocation, useNavigate } from "react-router-dom";
import type { EventDetailsDto } from "../../../dtos/event-dto";
import { fetchEventStaffsAdmin } from "../../../store/actions/staff-action";
import type { EventStaffDtoAdmin } from "../../../dtos/event-staff-dto";

export const useEventViewModel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const eventsByUser = useSelector((state: RootState) => state.eventReducer.eventsByUser);
  const publishedEvents = useSelector((state: RootState) => state.eventReducer.publishedEvents);
  const pendingEvents = useSelector((state: RootState) => state.eventReducer.pendingEvents);
  const eventStaffs = useSelector((root: RootState) => root.staffReducer.eventStaffsAdmin);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetailsDto>();
  const [activeTab, setActiveTab] = useState<"pending" | "public">("public");
  const [selectedEventId, setSelectedEventId] = useState<any>();
  const mapNumToTab = (n: string | null) =>
    n === "2"
      ? ("staff" as const)
      : n === "3"
        ? ("ticket" as const)
        : n === "4"
          ? ("transaction" as const)
            : ("information" as const);

  const mapTabToNum = (t: "information" | "staff" | "ticket" | "transaction") =>
    t === "staff" ? "2" : t === "ticket" ? "3" : t === "transaction" ? "4" : "1";
  const params = new URLSearchParams(location.search);
  const id = params.get("id") ?? "";
  const qTab = params.get("tab");

  const [activeDelTab, _setActiveDelTab] = useState(mapNumToTab(qTab));

  const eventColumns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Title", accessor: "title", type: "text" as const },
    { header: "Summary", accessor: "summary", type: "text" as const },
    { header: "Location", accessor: "location", type: "text" as const },
    { header: "Start", accessor: "startTime", type: "text" as const },
    { header: "End", accessor: "endTime", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ];

  const staffColumns = [
      { header: "ID", accessor: "id", type: "text" as const },
      { header: "Avatar", accessor: "avatarUrl", type: "image" as const },
      { header: "First Name", accessor: "firstName", type: "text" as const },
      { header: "Last Name", accessor: "lastName", type: "text" as const },
      { header: "Phone", accessor: "phone", type: "text" as const },
    ];

  useEffect(() => {
    const getAllEvents = async () => {
      showLoadingAlert();
      await dispatch<any>(getAllEventsAdmin());
      closeLoadingAlert();
    }

    getAllEvents();
  }, [dispatch]);

  const setActiveDelTab = useCallback(
    (tab: "information" | "staff" | "ticket" | "transaction") => {
      _setActiveDelTab(tab);
      const p = new URLSearchParams(location.search);
      p.set("tab", mapTabToNum(tab));
      if (id) p.set("id", id);
      navigate(`${location.pathname}?${p.toString()}`, { replace: true });
    },
    [location, navigate, id]
  );

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const newTab = mapNumToTab(p.get("tab"));
    if (newTab !== activeDelTab) _setActiveDelTab(newTab);
  }, [location.search]);

  useEffect(() => {
    if (!id) return;
    const getEventDetails = async (eventId: number) => {
      showLoadingAlert();
      const response = await dispatch<any>(getEventDetailsByIdAdmin(eventId));
      await dispatch<any>(fetchEventStaffsAdmin(eventId));
      setEventDetails(response);
      closeLoadingAlert();
    }
    getEventDetails(parseInt(id));
  }, [id]);

  const handleBack = () => navigate(-1);

  const fetchEventsByOrganizerIds = useCallback(
    async (organizerIds: number[]) => {
      if (!organizerIds || organizerIds.length === 0) return;
      try {
        showLoadingAlert("Loading");
        await dispatch<any>(getEventsByOrganizerIds(organizerIds));
        closeLoadingAlert();
      } catch (error: any) {
        showErrorAlert(error?.message || "Failed to get list events");
      }
    },
    [dispatch]
  );

  const resetEvents = () => {
    dispatch(clearEvents());
  };

  const handleViewDetail = (id: number) => {
    navigate(`/admin/events/details?id=${id}&tab=1`);
  }

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  }

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleAccept = (id: number) => {
    setSelectedEventId(id)
    setOpenAcceptDialog(true);
  }

  const confirmAccept = async () => {
    try {
      showLoadingAlert();
      setOpenAcceptDialog(false);
      await dispatch<any>(approveRejectEvent(selectedEventId, true));
      closeLoadingAlert();
      await showSuccessAlert("Approved event successfully");
      setSelectedEventId(null);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to approved event");
    }
  }

  const handleReject = (id: number) => {
    setSelectedEventId(id);
    setOpenRejectDialog(true);
  }

  const confirmReject = async () => {
    try {
      showLoadingAlert();
      setOpenRejectDialog(false);
      await dispatch<any>(approveRejectEvent(selectedEventId, false));
      closeLoadingAlert();
      await showSuccessAlert("Rejected event successfully");
      setSelectedEventId(null);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to rejected event");
    }
  }

  const groupedByRole = useMemo(() => {
    const map = new Map<string, EventStaffDtoAdmin[]>();
    for (const s of eventStaffs) {
      const role = s.roleStaff?.trim() || "Unspecified";
      if (!map.has(role)) map.set(role, []);
      map.get(role)!.push(s);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [eventStaffs]);

  return {
    id,
    publishedEvents,
    pendingEvents,
    eventsByUser,
    activeTab,
    eventColumns,
    eventDetails,
    setEventDetails,
    activeDelTab,
    setActiveTab,
    resetEvents,
    handleViewDetail,
    handleDelete,
    confirmDelete,
    openDeleteDialog,
    setOpenDeleteDialog,
    handleAccept,
    handleReject,
    handleBack,
    openAcceptDialog,
    openRejectDialog,
    setOpenAcceptDialog,
    setOpenRejectDialog,
    confirmAccept,
    confirmReject,
    fetchEventsByOrganizerIds,
    setActiveDelTab,
    eventStaffs,
    groupedByRole,
    staffColumns
  };
};
