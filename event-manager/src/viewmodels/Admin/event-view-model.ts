import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearEvents, getAllEventsAdmin, getEventsByOrganizerIds } from "../../store/actions/event-action";
import type { RootState } from "../../store/store";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert } from "../../helpers/alert-helpers";
import { useLocation } from "react-router-dom";

export const useEventViewModel = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const eventsByUser = useSelector((state: RootState) => state.eventReducer.eventsByUser);
  const publishedEvents = useSelector((state: RootState) => state.eventReducer.publishedEvents);
  const pendingEvents = useSelector((state: RootState) => state.eventReducer.pendingEvents);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "public">("public");

  const eventColumns = [
      { header: "ID", accessor: "id", type: "text" as const },
      { header: "Title", accessor: "title", type: "text" as const },
      { header: "Summary", accessor: "summary", type: "text" as const },
      { header: "Location", accessor: "location", type: "text" as const },
      { header: "Start", accessor: "startTime", type: "text" as const },
      { header: "End", accessor: "endTime", type: "text" as const },
      { header: "Actions", accessor: "actions", type: "action" as const },
    ];
  const eventColumnsDelView = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Title", accessor: "title", type: "text" as const },
    { header: "Location", accessor: "location", type: "text" as const },
    { header: "Organizer", accessor: "organizer", type: "text" as const },
    { header: "Actions", accessor: "actions", type: "action" as const },
  ]

  useEffect(() => {
      dispatch<any>(getAllEventsAdmin());
    }, [dispatch]);

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
  } 

  const handleDelete = (id: string) => {
    setOpenDeleteDialog(true);
  }

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleAccept = (id: string) => {
    setOpenAcceptDialog(true);
  }
  
  const confirmAccept = () => {
    setOpenAcceptDialog(false);
  }
  
  const handleReject = (id: string) => {
    setOpenRejectDialog(true);
  }

  const confirmReject = () => {
    setOpenRejectDialog(false);
  }

  return {
    publishedEvents,
    pendingEvents,
    eventsByUser,
    activeTab,
    eventColumns,
    setActiveTab,
    resetEvents,
    handleViewDetail,
    handleDelete,
    confirmDelete,
    openDeleteDialog,
    setOpenDeleteDialog,
    handleAccept,
    handleReject,
    openAcceptDialog,
    openRejectDialog,
    setOpenAcceptDialog,
    setOpenRejectDialog,
    confirmAccept,
    confirmReject,
    eventColumnsDelView,
    fetchEventsByOrganizerIds
  };
};
