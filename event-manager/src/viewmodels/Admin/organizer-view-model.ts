import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { fetchOrganizerDetail } from "../../store/actions/organizer-action";
import { closeLoadingAlert, showErrorAlert, showLoadingAlert } from "../../helpers/alert-helpers";

export const useOrganizerViewModel = () => {
    const dispatch = useDispatch();
    const organizer = useSelector((root: RootState) => root.organizerReducer.currentOrganizer);
    const [selectedOrganizer, setSelectedOrganizer] = useState<any>();
    const [openDelDialog, setOpenDelDialog] = useState<any>(false);
    const [openRecDialog, setOpenRecDialog] = useState<any>(false);

    const handleSelectOrganizer = async (id: number, isActive: boolean) => {
        try {
            showLoadingAlert();
            const data = await dispatch<any>(fetchOrganizerDetail(id));
            setSelectedOrganizer(data);
            closeLoadingAlert();
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to get details of an organizer");
        }
    }
    
    return {
        selectedOrganizer,
        openDelDialog,
        setOpenDelDialog,
        openRecDialog,
        setOpenRecDialog,
        setSelectedOrganizer,
        handleSelectOrganizer
    };
}