import { useOrderViewModel } from "../../../../viewmodels/Admin/user/order-view-model";
import OrderDetailModal from "../../user/components/order-details-modal";
import Table from "../../../../components/Admin/table";

export const EventTransactionSection: React.FC<{eventId: number}> = ({eventId}) => {
  const { orderListAdminColumn, selectedOrder, detailLoading, closeDetail, detailOpen, handleViewDetail, orders } = useOrderViewModel({eventId: eventId});
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">List of orders</h3>
      <Table
        columns={orderListAdminColumn}
        data={orders}
        className="rounded-lg"
        onRowClick={(row) => handleViewDetail(row.id)}
      />

      <OrderDetailModal
        open={Boolean(detailOpen)}
        order={selectedOrder}
        loading={detailLoading}
        onClose={closeDetail}
      />
    </div>  
  );
};