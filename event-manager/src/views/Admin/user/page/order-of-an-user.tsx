import React from "react";
import Table from "../../../../components/Admin/table";
import { useOrderViewModel } from "../../../../viewmodels/Admin/user/order-view-model";
import OrderDetailModal from "../components/order-details-modal";
import type { OrderOfAnUserSectionProps } from "../../../../models/component-props/section-props";

const OrderOfAnUser: React.FC<OrderOfAnUserSectionProps> = ({ customerId }) => {
  const {
    orderListAdmin,
    orderListAdminColumn,
    handleViewDetail,
    detailOpen,
    selectedOrder,
    detailLoading,
    closeDetail,
  } = useOrderViewModel({customerId: customerId});

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">List of orders</h3>
      <Table
        columns={orderListAdminColumn}
        data={orderListAdmin}
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

export default OrderOfAnUser;
