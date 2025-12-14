import { createVoucherApi, deleteVoucherApi, getAllVoucherApi, getVoucherByIdApi, updateVoucherApi, getVouchersByEventIdApi } from "../api/voucher-api";
import { convertVoucherModelToVoucherListDto } from "../converters/voucher-converter";
import type { EventSelectionDto } from "../dtos/event-dto";
import type { CreateVoucherDto, VoucherListDto } from "../dtos/voucher-dto";
import { mapResponseToVoucherModel } from "../mappers/voucher-mapper";
import { getEventsByOwnerService } from "./event-service";

export const getAllVoucherService = async () => {
    try {
        const response = await getAllVoucherApi();
        const voucherModelList = response.data.data.map(mapResponseToVoucherModel);
        const voucherDtoList = voucherModelList.map(convertVoucherModelToVoucherListDto);
        const eventListDto = (await getEventsByOwnerService()).eventListDto;
        const eventListSelectionDto: EventSelectionDto[] = eventListDto;
        const voucherDtoListWithEventTitle = voucherDtoList.map((voucher: VoucherListDto) => {
            if (voucher.event) {
                const event = eventListSelectionDto.find(e => e.id === voucher.event);
                return {
                    ...voucher,
                    eventTitle: event?.title || "Unknown Event"
                };
            }
            return {
                ...voucher,
                eventTitle: "All Events"
            };
        });

        return voucherDtoListWithEventTitle;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const createNewVoucherService = async (createVoucherDto: CreateVoucherDto) => {
    try {
        const response = await createVoucherApi(createVoucherDto);
        if (response.data.message === "success") {
            const voucherModel = mapResponseToVoucherModel(response.data.data);
            const voucherDto = convertVoucherModelToVoucherListDto(voucherModel);
            return voucherDto;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const getVoucherByIdService = async (voucherId: number) => {
    try {
        const response = await getVoucherByIdApi(voucherId);
        if (response.data.message === "success") {
            const voucherModel = mapResponseToVoucherModel(response.data.data);
            return voucherModel;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const updateVoucherService = async (voucherId: number, updateVoucherDto: CreateVoucherDto) => {
    try {
        const response = await updateVoucherApi(voucherId, updateVoucherDto);
        if (response.data.message === "success") {
            const voucherModel = mapResponseToVoucherModel(response.data.data);
            const voucherDto = convertVoucherModelToVoucherListDto(voucherModel);
            return voucherDto;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const deleteVoucherService = async (voucherId: number) => {
    try {
        const response = await deleteVoucherApi(voucherId);
        if (response.data.message === "success") {
            return voucherId;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const getVouchersByEventIdService = async (eventId: number) => {
    try {
        const response = await getVouchersByEventIdApi(eventId);
        const voucherModelList = response.data.data.map(mapResponseToVoucherModel);
        const voucherDtoList = voucherModelList.map(convertVoucherModelToVoucherListDto);
        console.log("[debug] Vouchers for event", eventId, voucherDtoList);
        return voucherDtoList;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}