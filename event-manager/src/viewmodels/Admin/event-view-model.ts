import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByUser, clearEvents, getPublicEvents, getPendingEvents } from "../../store/actions/event-action";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";

export const useEventViewModel = () => {
  const dispatch = useDispatch();
  const selectedUserEmail = useSelector((state: RootState) => state.userReducer.selectedUserEmail);
  const eventsByUser = useSelector((state: RootState) => state.eventReducer.eventsByUser);
  const publicEvents = useSelector((state: RootState) => state.eventReducer.publicEvents);
  const pendingEvents = useSelector((state: RootState) => state.eventReducer.pendingEvents);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "public">("public");

  const eventColumns = [
      { header: "ID", accessor: "id", type: "text" as const },
      { header: "Title", accessor: "title", type: "text" as const },
      { header: "Description", accessor: "description", type: "text" as const },
      { header: "Location", accessor: "location", type: "text" as const },
      { header: "Start", accessor: "starttime", type: "text" as const },
      { header: "End", accessor: "endtime", type: "text" as const },
      { header: "Status", accessor: "status", type: "text" as const },
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
      dispatch(getPublicEvents());
      dispatch(getPendingEvents());
      if(selectedUserEmail) getEventsForUser(selectedUserEmail);
    }, [dispatch]);
  
  const userEvents = selectedUserEmail
    ? eventsByUser[selectedUserEmail] || []
    : [];
  
  const getEventsForUser = (email: string) => {
    dispatch(fetchEventsByUser(email));
  };

  const resetEvents = () => {
    dispatch(clearEvents());
  };

  const handleViewDetail = (id: string) => {
    
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
    publicEvents,
    pendingEvents,
    eventsByUser,
    activeTab,
    eventColumns,
    setActiveTab,
    getEventsForUser,
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
    userEvents,
    eventColumnsDelView
  };
};
