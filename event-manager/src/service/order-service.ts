import { getOrderByCustomerIdApi, getOrdersApi } from "../api/order-api";
import { converOrderModelToOrderListDto, convertOrderModelToOrderListAdminDto } from "../converters/order-converter";
import type { OrderSearchParamsDto } from "../dtos/order-dto";
import { mapResponseToOrderModel } from "../mappers/order-mapper";
import { getAllEventsAdminService, getEventsByOwnerService } from "./event-service";

export const getOrdersByCustomerIdService = async (customerId: any) => {
    try {
        const response = await getOrderByCustomerIdApi(customerId);
        if (response.data.message === "success") {
            const orderModelList = response.data.data.map(mapResponseToOrderModel);
            const orderListAdminDtoList = orderModelList.map(convertOrderModelToOrderListAdminDto).sort((a: any, b: any) => a.id - b.id);
            const eventList = (await getAllEventsAdminService()).eventListDtoList;

            const eventMap = new Map<string, any>(
                eventList.map((e: any) => [String(e.id), e])
            );

            const orderListAdminDtoListWithTitle = orderListAdminDtoList.map((o: any) => {
                const ev = eventMap.get(String(o.eventId));
                const eventTitle = ev.title;
                return {
                    ...o,
                    eventTitle,
                };
            });

            return {
                orderModelList,
                orderListAdminDtoList: orderListAdminDtoListWithTitle
            };
        } else {
            return null;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const getOrdersService = async (orderSearchParams: OrderSearchParamsDto, isAdminSite: boolean) => {
    try {
        const response = await getOrdersApi(orderSearchParams);
        if (response.data.message === "success") {
            const orderModelList = response.data.data.map(mapResponseToOrderModel);
            const orderListDtoList = orderModelList.map(isAdminSite ? convertOrderModelToOrderListAdminDto : converOrderModelToOrderListDto).sort((a: any, b: any) => a.id - b.id);
            const eventListDto = isAdminSite ? (await getAllEventsAdminService()).eventListDtoList : (await getEventsByOwnerService()).eventListDto;

            const eventMap = new Map<string, any>(
                eventListDto.map((e: any) => [String(e.id), e])
            );

            const orderListDtoListWithTitle = orderListDtoList.map((o: any) => {
                const ev = eventMap.get(String(o.eventId));
                const eventTitle = ev.title;
                return {
                    ...o,
                    eventTitle,
                };
            });

            return {
                orderModelList,
                orderListDtoList: orderListDtoListWithTitle,
            };
        } else {
            return null;
        }
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}