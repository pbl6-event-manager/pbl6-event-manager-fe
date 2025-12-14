import { useEffect, useState, useCallback, useRef } from "react"
import { closeLoadingAlert, showErrorAlert, showLoadingAlert } from "../../helpers/alert-helpers";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByCustomerId, getOrders } from "../../store/actions/order-action";
import type { RootState } from "../../store/store";
import type { OrderModel } from "../../models/bean/order-models";
import type { OrderListAdminDto, OrderSearchParamsDto } from "../../dtos/order-dto";

export const useOrderViewModel = ({customerId, eventId} : {customerId?: number, eventId?: number}) => {
    const dispatch = useDispatch();
    const { orderListAdmin, orderModel } = useSelector((root: RootState) => root.orderReducer);
    const orderListAdminColumn = [
        { header: "ID", accessor: "id", type: "text" as const },
        { header: "Create Time", accessor: "createdAt", type: "text" as const },
        { header: "Event", accessor: "eventTitle", type: "text" as const },
        { header: "Quantity", accessor: "quantity", type: "text" as const },
        { header: "Total", accessor: "total", type: "text" as const },
        { header: "Status", accessor: "status", type: "text" as const },
    ];

    const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [orders, setOrders] = useState<OrderListAdminDto[]>([]);

    const orderListRef = useRef(orderModel);
    useEffect(() => { orderListRef.current = orderModel }, [orderModel]);

    useEffect(() => {
        const fetchOrderByCustomerId = async (id: number) => {
            try {
                showLoadingAlert();
                const params = {
                    customerId: id
                }
                await dispatch<any>(getOrderByCustomerId(params));
            } catch (error: any) {
                showErrorAlert(error?.message || "Failed to get orders of this customer");
            }
            closeLoadingAlert();
        }
        if (customerId) {
            fetchOrderByCustomerId(customerId)
        }
    }, [customerId, dispatch]);

    useEffect(() => {
        const fetchOrderByEventId = async (id: number) => {
            try {
                showLoadingAlert();
                const params: Partial<OrderSearchParamsDto> = {};
                params.eventId = id;
                params.searchTime = "THIS_YEAR";

                showLoadingAlert();
                const response = await dispatch<any>(getOrders(params as OrderSearchParamsDto, true));
                setOrders(response);
                closeLoadingAlert();
            } catch (error: any) {
                showErrorAlert(error?.message || "Failed to get orders of this customer");
            }
        }
        if (eventId) {
            fetchOrderByEventId(eventId)
        }
    }, [eventId, dispatch]);

    const fetchOrderDetail = useCallback(async (orderId: number) => {
        setDetailLoading(true);
        setSelectedOrder(null);

        try {
            const list = orderListRef.current || [];
            const found = list.find((o: any) => Number(o.id) === Number(orderId));

            if (!found) {
                showErrorAlert("Order details are not available in the store for this order.");
                return;
            }

            const normalized: OrderModel = {
                ...found,
                orderDetails: (found.orderDetails && Array.isArray(found.orderDetails)) ? found.orderDetails : [],
                id: Number(found.id),
                createdAt: String(found.createdAt),
                updatedAt: String(found.updatedAt),
                customerId: Number(found.customerId),
                customerEmail: String(found.customerEmail),
                customerFullName: String(found.customerFullName),
                totalAmount: String(found.totalAmount),
                totalAmountBeforeVoucher: String(found.totalAmountBeforeVoucher),
                eventId: Number(found.eventId),
                status: String(found.status),
                appliedVoucherCode: found.appliedVoucherCode,
                paymentSessionId: String(found.paymentSessionId),
                isVerified: Boolean(found.isVerified),
                customerName: String(found.customerName),
            };

            setSelectedOrder(normalized);
        } catch (err: any) {
            showErrorAlert(err?.message || "Failed to resolve order details");
        } finally {
            setDetailLoading(false);
        }
    }, []);

    const handleViewDetail = (orderId: number) => {
        setDetailOpen(true);
        fetchOrderDetail(orderId);
    }

    const closeDetail = () => {
        setDetailOpen(false);
        setSelectedOrder(null);
    }

    return {
        orderListAdmin,
        orderListAdminColumn,
        handleViewDetail,
        selectedOrder,
        detailOpen,
        detailLoading,
        closeDetail,
        orders
    }
}