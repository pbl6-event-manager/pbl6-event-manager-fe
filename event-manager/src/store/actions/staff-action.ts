export const FETCH_EVENT_STAFFS_REQUEST = "FETCH_EVENT_STAFFS_REQUEST";
export const FETCH_EVENT_STAFFS_FAILED = "FETCH_EVENT_STAFFS_FAILED";
export const FETCH_EVENT_STAFFS_SUCCESS = "FETCH_EVENT_STAFFS_SUCCESS";
export const FETCH_ORGANIZER_STAFFS_REQUEST = "FETCH_ORGANIZER_STAFFS_REQUEST";
export const FETCH_ORGANIZER_STAFFS_SUCCESS = "FETCH_ORGANIZER_STAFFS_SUCCESS";
export const FETCH_ORGANIZER_STAFFS_FAILURE = "FETCH_ORGANIZER_STAFFS_FAILURE";
export const ASSIGN_STAFF_REQUEST = "ASSIGN_STAFF_REQUEST";
export const ASSIGN_STAFF_SUCCESS = "ASSIGN_STAFF_SUCCESS";
export const ASSIGN_STAFF_FAILURE = "ASSIGN_STAFF_FAILURE";
export const INVITE_STAFF_TO_OWNER_REQUEST = "INVITE_STAFF_TO_OWNER_REQUEST";
export const INVITE_STAFF_TO_OWNER_SUCCESS = "INVITE_STAFF_TO_OWNER_SUCCESS";
export const INVITE_STAFF_TO_OWNER_FAILURE = "INVITE_STAFF_TO_OWNER_FAILURE";
export const REMOVE_STAFF_FROM_EVENT_REQUEST = "REMOVE_STAFF_FROM_EVENT_REQUEST";
export const REMOVE_STAFF_FROM_EVENT_SUCCESS = "REMOVE_STAFF_FROM_EVENT_SUCCESS";
export const REMOVE_STAFF_FROM_EVENT_FAILURE = "REMOVE_STAFF_FROM_EVENT_FAILURE";
export const REMOVE_STAFF_FROM_OWNER_REQUEST = "REMOVE_STAFF_FROM_OWNER_REQUEST";
export const REMOVE_STAFF_FROM_OWNER_SUCCESS = "REMOVE_STAFF_FROM_OWNER_SUCCESS";
export const REMOVE_STAFF_FROM_OWNER_FAILURE = "REMOVE_STAFF_FROM_OWNER_FAILURE";
<<<<<<< HEAD
export const FETCH_EVENT_STAFFS_REQUEST_ADMIN = "FETCH_EVENT_STAFFS_REQUEST_ADMIN";
export const FETCH_EVENT_STAFFS_FAILED_ADMIN = "FETCH_EVENT_STAFFS_FAILED_ADMIN";
export const FETCH_EVENT_STAFFS_SUCCESS_ADMIN = "FETCH_EVENT_STAFFS_SUCCESS_ADMIN";
export const RESET_TEAM_STATE = "RESET_TEAM_STATE";

import { convertEventStaffAdminModelToEventStaffAdminDto } from "../../converters/event-staff-converter";
import { mapResponseToEventStaffModelAdmin } from "../../mappers/event-staff-mapper";
import { assignStaffToOwnerService, fetchStaffGroupedByRoleService, getStaffOfEventAdminService, removeStaffOfOwnerService, } from "../../service/staff-service";
=======
export const ASSIGN_OR_UPDATE_STAFFS_TO_EVENT_REQUEST = "ASSIGN_OR_UPDATE_STAFFS_TO_EVENT_REQUEST";
export const ASSIGN_OR_UPDATE_STAFFS_TO_EVENT_SUCCESS = "ASSIGN_OR_UPDATE_STAFFS_TO_EVENT_SUCCESS";
export const ASSIGN_OR_UPDATE_STAFFS_TO_EVENT_FAILURE = "ASSIGN_OR_UPDATE_STAFFS_TO_EVENT_FAILURE";
export const SYNC_STAFFS_TO_EVENT_REQUEST = "SYNC_STAFFS_TO_EVENT_REQUEST";
export const SYNC_STAFFS_TO_EVENT_SUCCESS = "SYNC_STAFFS_TO_EVENT_SUCCESS";
export const SYNC_STAFFS_TO_EVENT_FAILURE = "SYNC_STAFFS_TO_EVENT_FAILURE";
export const RESET_TEAM_STATE = "RESET_TEAM_STATE";

import { syncStaffsToEventService, assignStaffToOwnerService, fetchStaffGroupedByRoleService, removeStaffOfOwnerService, fetchAssignedStaffsOfEventByListIds } from "../../service/staff-service";
>>>>>>> develop

export const fetchEventStaffs = (eventId: number) => async (dispatch: any) => {
    dispatch({ type: FETCH_EVENT_STAFFS_REQUEST });
    try {
        const { assignedStaffsDto, assignedStaffsItems } = await fetchAssignedStaffsOfEventByListIds(eventId);

        dispatch({
            type: FETCH_EVENT_STAFFS_SUCCESS,
            payload: assignedStaffsDto
        });

        return assignedStaffsItems;
    } catch (error: any) {
        console.error("[fetchEventStaffs] Error:", error);

        dispatch({
            type: FETCH_EVENT_STAFFS_FAILED,
            payload: error.message
        });
        throw error;
    }
};

export const fetchEventStaffsAdmin = (eventId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_EVENT_STAFFS_REQUEST_ADMIN
        });

        const data = await getStaffOfEventAdminService(eventId);
        const eventStaffModelAdminList = data.map(mapResponseToEventStaffModelAdmin);
        const eventStaffDtoAdminList = eventStaffModelAdminList.map(convertEventStaffAdminModelToEventStaffAdminDto);

        dispatch({
            type: FETCH_EVENT_STAFFS_SUCCESS_ADMIN,
            payload: eventStaffDtoAdminList
        });
    } catch (error: any) {
        dispatch({
            type: FETCH_EVENT_STAFFS_FAILED_ADMIN,
            payload:
                error.response?.data?.message || error.message || "Get event staffs failed",
        });
        throw error;
    }
}

export const fetchOwnerStaffs = () => async (dispatch: any) => {
    try {
        dispatch({
            type: FETCH_ORGANIZER_STAFFS_REQUEST
        });

        const { allStaffDtos, allStaffItems } = await fetchStaffGroupedByRoleService();

        dispatch({
            type: FETCH_ORGANIZER_STAFFS_SUCCESS,
            payload: allStaffDtos
        });
        return allStaffItems;
    } catch (error: any) {
        dispatch({
            type: FETCH_ORGANIZER_STAFFS_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Get staffs of an owner failed",
        });
        throw error;
    }
}

export const updateListStaffsOfEvent = (eventId: number, userIdList: number[]) => async (dispatch: any) => {
    try {
        dispatch({
            type: ASSIGN_STAFF_REQUEST
        })

        const data = "CALL SERVICE HERE";

        dispatch({
            type: ASSIGN_STAFF_SUCCESS,
            payload: data
        })
    } catch (error: any) {
        dispatch({
            type: ASSIGN_STAFF_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Assign staff to an event failed",
        });
        throw error;
    }
}

export const inviteStaffToOwner = (staffEmail: string, roleStaffId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: INVITE_STAFF_TO_OWNER_REQUEST
        })

        const data = await assignStaffToOwnerService(staffEmail, roleStaffId);

        dispatch({
            type: INVITE_STAFF_TO_OWNER_SUCCESS,
            payload: data.staffDto
        })
        return data;
    } catch (error: any) {
        dispatch({
            type: INVITE_STAFF_TO_OWNER_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Invite staff to an owner failed",
        });
        throw error;
    }
}

export const removeStaffOfOwner = (staffEmail: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: REMOVE_STAFF_FROM_OWNER_REQUEST
        })

        const data = await removeStaffOfOwnerService(staffEmail);

        dispatch({
            type: REMOVE_STAFF_FROM_OWNER_SUCCESS,
            payload: staffEmail
        })
    } catch (error: any) {
        dispatch({
            type: REMOVE_STAFF_FROM_OWNER_FAILURE,
            payload:
                error.response?.data?.message || error.message || "Invite staff to an owner failed",
        });
        throw error;
    }
}

export const syncStaffsToEvent = (eventId: number, staffIds: number[]) => {
    return async (dispatch: any) => {
        dispatch({ type: SYNC_STAFFS_TO_EVENT_REQUEST });
        try {
            const response = await syncStaffsToEventService(eventId, staffIds);

            const { assignedStaffsDto } = await fetchAssignedStaffsOfEventByListIds(eventId);

            dispatch({
                type: SYNC_STAFFS_TO_EVENT_SUCCESS,
                payload: assignedStaffsDto
            });

            return response;
        } catch (error: any) {
            dispatch({
                type: SYNC_STAFFS_TO_EVENT_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};