import { useDispatch, useSelector } from "react-redux";
import { fetchEventsByUser, clearEvents, getPublicEvents, getPendingEvents } from "../../store/actions/Admin/event-action";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";

export const useEventViewModel = () => {
  const dispatch = useDispatch();
  const eventsByUser = useSelector((state: any) => state.event.eventsByUser);
  const publicEvents = useSelector((state: RootState) => state.event.publicEvents);
  const pendingEvents = useSelector((state: RootState) => state.event.pendingEvents);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAcceptDialog, setOpenAcceptDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "public">("public");

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
    confirmReject
  };
};
