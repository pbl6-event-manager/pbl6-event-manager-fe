export const FETCH_ORGANIZERS_REQUEST = "FETCH_ORGANIZERS_REQUEST"
export const FETCH_ORGANIZERS_SUCCESS = "FETCH_ORGANIZERS_SUCCESS"
export const FETCH_ORGANIZERS_FAILURE = "FETCH_ORGANIZERS_FAILURE"
export const FETCH_ORGANIZER_DETAIL_REQUEST = "FETCH_ORGANIZER_DETAIL_REQUEST"
export const FETCH_ORGANIZER_DETAIL_SUCCESS = "FETCH_ORGANIZER_DETAIL_SUCCESS"
export const FETCH_ORGANIZER_DETAIL_FAILURE = "FETCH_ORGANIZER_DETAIL_FAILURE"
export const UPDATE_ORGANIZER_REQUEST = "UPDATE_ORGANIZER_REQUEST"
export const UPDATE_ORGANIZER_SUCCESS = "UPDATE_ORGANIZER_SUCCESS"
export const UPDATE_ORGANIZER_FAILURE = "UPDATE_ORGANIZER_FAILURE"
export const DELETE_ORGANIZER_REQUEST = "DELETE_ORGANIZER_REQUEST"
export const DELETE_ORGANIZER_SUCCESS = "DELETE_ORGANIZER_SUCCESS"
export const DELETE_ORGANIZER_FAILURE = "DELETE_ORGANIZER_FAILURE"
export const CREATE_ORGANIZER_REQUEST = "CREATE_ORGANIZER_REQUEST"
export const CREATE_ORGANIZER_SUCCESS = "CREATE_ORGANIZER_SUCCESS"
export const CREATE_ORGANIZER_FAILURE = "CREATE_ORGANIZER_FAILURE"

import type { OrganizerFormData } from "../../models/form-models/organizer-form-models"
import { getMyOrganizersService, getOrganizerByIdService, createOrganizerService, updateOrganizerService, deleteOrganizerService } from "../../service/organizer-service";

export const fetchMyOrganizers = () => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_ORGANIZERS_REQUEST
        });

        const { listOrganizerDto, listOrganizerFormData,} = await getMyOrganizersService();

        dispatch({
            type: FETCH_ORGANIZERS_SUCCESS,
            payload: listOrganizerDto
        });
        return listOrganizerFormData;
    } catch (error: any) {
        dispatch({
            type: FETCH_ORGANIZERS_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get organizers failed",
        });
        throw error;
    }
}

export const fetchOrganizerDetail = (organizerId: number, isAdmin: boolean) => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_ORGANIZER_DETAIL_REQUEST
        });

        const { organizerDto, organizerFormData } = await getOrganizerByIdService(organizerId, isAdmin);

        dispatch({
            type: FETCH_ORGANIZER_DETAIL_SUCCESS,
            payload: organizerDto
        });

        return organizerFormData;
    } catch (error: any) {
        dispatch({
            type: FETCH_ORGANIZER_DETAIL_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get organizer detail failed",
        });
        throw error;
    }
}

export const updateOrganizer = (organizerId: number, organizer: OrganizerFormData) => async (dispatch: any) => {
    try {
        dispatch({
            type: UPDATE_ORGANIZER_REQUEST
        });

        const data = await updateOrganizerService(organizerId, organizer);

        dispatch({
            type: UPDATE_ORGANIZER_SUCCESS,
            payload: data
        });
    } catch (error: any) {
        dispatch({
            type: UPDATE_ORGANIZER_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Update organizer failed",
        });
        throw error;
    }
}

export const createOrganizer = (organizer: OrganizerFormData) => async (dispatch: any) => {
    try {
        dispatch({
            type: CREATE_ORGANIZER_REQUEST
        });

        const organizerDto = await createOrganizerService(organizer);

        dispatch({
            type: CREATE_ORGANIZER_SUCCESS,
            payload: organizerDto
        });
    } catch (error: any) {
        dispatch({
            type: CREATE_ORGANIZER_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Create organizer failed",
        });
        throw error;
    }
}

export const deleteOrganizer = (organizerId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: DELETE_ORGANIZER_REQUEST
        });

        const result = await deleteOrganizerService(organizerId);

        dispatch({
            type: DELETE_ORGANIZER_SUCCESS,
            payload: organizerId
        });
        return result;
    } catch (error: any) {
        dispatch({
            type: DELETE_ORGANIZER_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Delete organizer failed",
        });
        throw error;
    }
}



