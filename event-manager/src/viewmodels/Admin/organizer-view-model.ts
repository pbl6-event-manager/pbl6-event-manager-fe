import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export const useOrganizerViewModel = () => {
    const dispatch = useDispatch();
    const [selectedOrganizer, setSelectedOrganizer] = useState<any>(null);
    const organizers = useSelector((state: RootState) => state.userReducer.organizers);
    const [openDelDialog, setOpenDelDialog] = useState<any>(false);
    const [openRecDialog, setOpenRecDialog] = useState<any>(false);
    const [selectedOrgId, setSelectedOrgId] = useState<any>(null);

    const handleSelectOrganizer = (id: any) => {
        const organizer = organizers.filter((o) => o.id === id);
        setSelectedOrganizer(organizer[0]);
    };
    
    return {
        selectedOrganizer,
        openDelDialog,
        setOpenDelDialog,
        openRecDialog,
        setOpenRecDialog,
        setSelectedOrganizer,
        handleSelectOrganizer,
    };
}