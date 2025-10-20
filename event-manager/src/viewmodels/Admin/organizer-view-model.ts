import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrganizer } from "../../store/actions/Organizer/organizer-action";
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

    const handleDelete = (id: any) => {
        setOpenDelDialog(true);
        setSelectedOrgId(id);
    }

    const confirmDelete = () => {
        dispatch<any>(deleteOrganizer(selectedOrgId));
        setOpenDelDialog(false);
    }
    
    return {
        selectedOrganizer,
        openDelDialog,
        setOpenDelDialog,
        openRecDialog,
        setOpenRecDialog,
        setSelectedOrganizer,
        handleSelectOrganizer,
        handleDelete,
        confirmDelete
    };
}