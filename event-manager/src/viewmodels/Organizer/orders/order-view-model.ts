import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeLoadingAlert, showErrorAlert, showLoadingAlert } from "../../../helpers/alert-helpers";
import { getEventsByOwner } from "../../../store/actions/event-action";
import type { RootState } from "../../../store/store";
import type { OrderListDto, OrderSearchParamsDto, SEARCH_BY_ENUM, SEARCH_TIME_ENUM } from "../../../dtos/order-dto";
import { getOrders } from "../../../store/actions/order-action";

export const useOrderViewModel = () => {
    const dispatch = useDispatch();
    const [q, setQ] = useState("");
    const [searchBy, setSearchBy] = useState<SEARCH_BY_ENUM>("BUYER");
    const [eventSearch, setEventSearch] = useState("All Events");
    const [dateRange, setDateRange] = useState<SEARCH_TIME_ENUM>("LAST_24_HOURS");
    const eventList = useSelector((root: RootState) => root.eventReducer.eventSelectionList);
    const [orders, setOrders] = useState<OrderListDto[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const totalItems = (orders || []).length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const pagedOrders = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return (orders || []).slice(start, start + pageSize);
    }, [orders, currentPage, pageSize]);

    const handleView = (id: number | string) => {
        const o = (orders as any[]).find((x: any) => String(x.id) === String(id));
        if (!o) return;
        setSelectedOrder(o);
    };

    const closeModal = () => setSelectedOrder(null);

    const statusColor = (s: OrderListDto["status"]) => {
        switch (s) {
            case "PAID":
                return "bg-green-50 text-green-800";
            case "PENDING":
                return "bg-yellow-50 text-yellow-800";
            case "CANCELED":
                return "bg-red-50 text-red-800";
            default:
                return "bg-gray-50 text-gray-800";
        }
    };

    const statusText = (s: OrderListDto["status"]): string => {
        switch (s) {
            case "PAID":
                return "Paid";
            case "PENDING":
                return "Pending";
            case "CANCELED":
                return "Canceled";
            default:
                return "Unkown";
        }
    };

    useEffect(() => {
        const loadEventByOwner = async () => {
            try {
                showLoadingAlert();
                await dispatch<any>(getEventsByOwner());
                closeLoadingAlert();
            } catch (err: any) {
                closeLoadingAlert();
                showErrorAlert(err?.message || "An error occurs when getting your events");
            }
        };

        loadEventByOwner();
    }, [dispatch]);

    const handleLoadOrder = async () => {
        try {
            const params: Partial<OrderSearchParamsDto> = {};
            if (q && q.trim().length > 0) {
                params.searchValue = q.trim();
            }
            if (eventSearch && eventSearch !== "All Events") {
                const id = Number(eventSearch);
                if (!Number.isNaN(id)) params.eventId = id;
            }
            if (searchBy && searchBy !== "--") {
                params.searchBy = searchBy as SEARCH_BY_ENUM;
            }
            if (dateRange) params.searchTime = dateRange;

            showLoadingAlert();
            const response = await dispatch<any>(getOrders(params as OrderSearchParamsDto, false));
            setOrders(response.orderListDtoList);
            closeLoadingAlert();
        } catch (error: any) {
            showErrorAlert(error?.message || "Failed to get orders");
        }
    }

    const onLoadClick = async () => {
        try {
            if (typeof handleLoadOrder === "function") {
                await handleLoadOrder();
            }
        } finally {
            setLoaded(true);
        }
    };

    return {
        eventList,
        handleLoadOrder,
        q,
        setQ,
        searchBy,
        setSearchBy,
        eventSearch,
        setEventSearch,
        dateRange,
        setDateRange,
        orders,
        statusColor,
        statusText,
        onLoadClick,
        loaded,
        closeModal,
        selectedOrder,
        handleView,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalItems,
        totalPages,
        pagedOrders
    };
}