import type { EventSelectionDto } from "../../dtos/event-dto";
import type { CreateVoucherDto, VoucherListDto } from "../../dtos/voucher-dto";
import { getEventsByOwnerService } from "../../service/event-service";
import { createNewVoucherService, deleteVoucherService, getAllVoucherService, getVoucherByIdService, getVouchersByEventIdService, updateVoucherService } from "../../service/voucher-service";
import { store } from "../store";

export const GET_ALL_VOUCHER_REQUEST = "GET_ALL_VOUCHER_REQUEST";
export const GET_ALL_VOUCHER_SUCCESS = "GET_ALL_VOUCHER_SUCCESS";
export const GET_ALL_VOUCHER_FAILURE = "GET_ALL_VOUCHER_FAILURE";
export const CREATE_NEW_VOUCHER_REQUEST = "CREATE_NEW_VOUCHER_REQUEST";
export const CREATE_NEW_VOUCHER_SUCCESS = "CREATE_NEW_VOUCHER_SUCCESS";
export const CREATE_NEW_VOUCHER_FAILURE = "CREATE_NEW_VOUCHER_FAILURE";
export const DUPLICATE_VOUCHER_REQUEST = "DUPLICATE_VOUCHER_REQUEST";
export const DUPLICATE_VOUCHER_SUCCESS = "DUPLICATE_VOUCHER_SUCCESS";
export const DUPLICATE_VOUCHER_FAILURE = "DUPLICATE_VOUCHER_FAILURE";
export const GET_VOUCHER_BY_ID_REQUEST = "GET_VOUCHER_BY_ID_REQUEST";
export const GET_VOUCHER_BY_ID_SUCCESS = "GET_VOUCHER_BY_ID_SUCCESS";
export const GET_VOUCHER_BY_ID_FAILURE = "GET_VOUCHER_BY_ID_FAILURE";
export const UPDATE_VOUCHER_REQUEST = "UPDATE_VOUCHER_REQUEST";
export const UPDATE_VOUCHER_SUCCESS = "UPDATE_VOUCHER_SUCCESS";
export const UPDATE_VOUCHER_FAILURE = "UPDATE_VOUCHER_FAILURE";
export const DELETE_VOUCHER_REQUEST = "DELETE_VOUCHER_REQUEST";
export const DELETE_VOUCHER_SUCCESS = "DELETE_VOUCHER_SUCCESS";
export const DELETE_VOUCHER_FAILURE = "DELETE_VOUCHER_FAILURE";
export const GET_VOUCHERS_BY_EVENT_ID_REQUEST = "GET_VOUCHERS_BY_EVENT_ID_REQUEST";
export const GET_VOUCHERS_BY_EVENT_ID_SUCCESS = "GET_VOUCHERS_BY_EVENT_ID_SUCCESS";
export const GET_VOUCHERS_BY_EVENT_ID_FAILURE = "GET_VOUCHERS_BY_EVENT_ID_FAILURE";

export const getAllVoucher = () => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_ALL_VOUCHER_REQUEST
        })

        const response = await getAllVoucherService();

        dispatch({
            type: GET_ALL_VOUCHER_SUCCESS,
            payload: response
        })
    } catch (error: any) {
        dispatch({
            type: GET_ALL_VOUCHER_FAILURE,
            payload: error?.message || "Failed to get all voucher of your accounts"
        })
        throw error;
    }
}

export const createNewVoucher = (createVoucherDto: CreateVoucherDto) => async (dispatch: any) => {
    try {
        dispatch({
            type: CREATE_NEW_VOUCHER_REQUEST
        })

        const response = await createNewVoucherService(createVoucherDto);
        const voucherList = store.getState().voucherReducer.voucherListDto;
        const updatedVoucherList = [response, ...voucherList];
        const eventListDto = (await getEventsByOwnerService()).eventListDto;
        const eventListSelectionDto: EventSelectionDto[] = eventListDto;

        const normalizedList = (updatedVoucherList || []).filter(
            (v): v is VoucherListDto => v !== undefined && v !== null
        );

        const voucherDtoListWithEventTitle = normalizedList.map((voucher) => {
            const evtId = (voucher as any).eventId ?? (voucher as any).event;
            if (evtId != null) {
                const event = eventListSelectionDto.find((e) => e.id === Number(evtId));
                return {
                    ...voucher,
                    eventTitle: event?.title || "Unknown Event",
                };
            }
            return {
                ...voucher,
                eventTitle: "All Events",
            };
        });

        dispatch({
            type: CREATE_NEW_VOUCHER_SUCCESS,
            payload: voucherDtoListWithEventTitle
        })
    } catch (error: any) {
        dispatch({
            type: CREATE_NEW_VOUCHER_FAILURE,
            payload: error?.message || "Failed to get all voucher of your accounts"
        })
        throw error;
    }
}

export const duplicateVoucher = (voucherId: number, voucherCode: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: DUPLICATE_VOUCHER_REQUEST
        })

        const voucherModel = await getVoucherByIdService(voucherId);
        if (voucherModel) {
            const createVoucherDto: CreateVoucherDto = {
                code: voucherCode,
                name: voucherModel.name,
                description: voucherModel.description,
                discountType: voucherModel.discountType,
                discountValue: voucherModel.discountValue,
                minOrderAmount: voucherModel.minOrderAmount,
                maxDiscountAmount: voucherModel.maxDiscountAmount,
                totalUsageLimit: voucherModel.totalUsageLimit,
                usagePerUser: voucherModel.usagePerUser,
                validFrom: voucherModel.validFrom,
                validTo: voucherModel.validTo,
                eventId: voucherModel.eventId.toString()
            };

            const response = await createNewVoucherService(createVoucherDto);
            const voucherList = store.getState().voucherReducer.voucherListDto;
            const updatedVoucherList = [response, ...voucherList];
            const eventListDto = (await getEventsByOwnerService()).eventListDto;
            const eventListSelectionDto: EventSelectionDto[] = eventListDto;

            const normalizedList = (updatedVoucherList || []).filter(
                (v): v is VoucherListDto => v !== undefined && v !== null
            );

            const voucherDtoListWithEventTitle = normalizedList.map((voucher) => {
                const evtId = (voucher as any).eventId ?? (voucher as any).event;
                if (evtId != null) {
                    const event = eventListSelectionDto.find((e) => e.id === Number(evtId));
                    return {
                        ...voucher,
                        eventTitle: event?.title || "Unknown Event",
                    };
                }
                return {
                    ...voucher,
                    eventTitle: "All Events",
                };
            });
             
             dispatch({
                 type: DUPLICATE_VOUCHER_SUCCESS,
                 payload: voucherDtoListWithEventTitle,
             })
        } else {
            dispatch({
                type: DUPLICATE_VOUCHER_FAILURE,
                payload: "Failed to duplicate this voucher"
            })
        }
    } catch (error: any) {
        dispatch({
            type: DUPLICATE_VOUCHER_FAILURE,
            payload: error?.message || "Failed to duplicate this voucher"
        })
        throw error;
    }
}

export const getVoucherById = (voucherId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_VOUCHER_BY_ID_REQUEST
        })

        const voucherModel = await getVoucherByIdService(voucherId);
        if (voucherModel)
            return voucherModel;

        dispatch({
            type: GET_VOUCHER_BY_ID_SUCCESS
        })
    } catch (error: any) {
        dispatch({
            type: GET_VOUCHER_BY_ID_FAILURE,
            payload: error?.message || "Failed to get this voucher"
        })
        throw error;
    }
}

export const updateVoucher = (voucherId: number, updateVoucherDto: CreateVoucherDto) => async (dispatch: any) => {
    try {
        dispatch({
            type: UPDATE_VOUCHER_REQUEST
        })

        const response = await updateVoucherService(voucherId, updateVoucherDto);
        const voucherList = store.getState().voucherReducer.voucherListDto || [];
        const eventListDto = (await getEventsByOwnerService()).eventListDto;
        const eventListSelectionDto: EventSelectionDto[] = eventListDto;

        const normalizedList = (voucherList || []).filter(
            (v): v is VoucherListDto => v !== undefined && v !== null
        );

        const evtId = (response as any).eventId ?? (response as any).event;
        const event = evtId != null ? eventListSelectionDto.find((e) => e.id === Number(evtId)) : undefined;
        const updatedItem = {
            ...response,
            eventTitle: event?.title ?? (evtId == null ? "All Events" : "Unknown Event")
        } as VoucherListDto;

        const updatedVoucherList = normalizedList.map((v) =>
            Number((v as any).id) === Number((updatedItem as any).id) ? updatedItem : v
        );

        dispatch({
            type: UPDATE_VOUCHER_SUCCESS,
            payload: updatedVoucherList
        });
    } catch (error: any) {
        dispatch({
            type: UPDATE_VOUCHER_FAILURE,
            payload: error?.message || "Failed to update this voucher"
        })
        throw error;
    }
}

export const deleteVoucher = (voucherId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: DELETE_VOUCHER_REQUEST
        })

        const response = await deleteVoucherService(voucherId);
        if (response) {
            const voucherDtoList = store.getState().voucherReducer.voucherListDto;
            const updatedVoucherList = (voucherDtoList || []).filter((v: any) => Number(v?.id) !== Number(response));

            dispatch({
                type: DELETE_VOUCHER_SUCCESS,
                payload: updatedVoucherList
            });
        } else {
            dispatch({
            type: DELETE_VOUCHER_FAILURE,
            payload: "Failed to delete this voucher"
        })
        }
    } catch (error: any) {
        dispatch({
            type: DELETE_VOUCHER_FAILURE,
            payload: error?.message || "Failed to delete this voucher"
        })
        throw error;
    }
}

export const getVouchersByEventId = (eventId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_VOUCHERS_BY_EVENT_ID_REQUEST
        })
        const voucherDtoList = await getVouchersByEventIdService(eventId);
        console.log("[debug] Vouchers for event", eventId, voucherDtoList);
        dispatch({
            type: GET_VOUCHERS_BY_EVENT_ID_SUCCESS,
            payload: voucherDtoList
        })
    } catch (error: any) {
        dispatch({
            type: GET_VOUCHERS_BY_EVENT_ID_FAILURE,
            payload: error?.message || "Failed to get vouchers for this event"
        })
        throw error;
    }
}
