import { Search, ShoppingCart, DollarSign, Filter, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Separator } from "../../../components/ui/separator";
import { fmt } from "../../../utils/Organizer/date-format";
import type { TicketInfoDto } from "../../../dtos/ticket-dto";
import type { OrderListDto } from "../../../dtos/order-dto";
import { getInitials } from "../../../utils/Organizer/ava-format";

type Props = {
  orders: OrderListDto[] | undefined;
  totalCount: number;
  totalRevenue: number;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  handleViewDetails: () => void;
  isDetailsOpen: boolean;
  setIsDetailsOpen: (b: boolean) => void;
  selectedOrder?: OrderListDto;
  totalTicket: number;
  statusText: (s: string) => string;
  statusColor: (s: string) => void;
};

export default function EventManageOrdersPage({
  totalCount,
  totalRevenue,
  orders,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  handleViewDetails,
  isDetailsOpen,
  setIsDetailsOpen,
  selectedOrder,
  statusColor,
  statusText,
  totalTicket
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Manage Orders</h2>
        <p className="text-muted-foreground mt-2">
          View and manage all orders for this event
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Orders placed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From all orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalTicket}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tickets sold</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order number, buyer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px] cursor-pointer">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="cursor-pointer">
                    All Status
                  </SelectItem>
                  <SelectItem value="COMPLETED" className="cursor-pointer">
                    Completed
                  </SelectItem>
                  <SelectItem value="PENDING" className="cursor-pointer">
                    Pending
                  </SelectItem>
                  <SelectItem value="CANCELED" className="cursor-pointer">
                    Cancelled
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders List ({orders?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Order</TableHead>
                  <TableHead className="text-left pl-10">Buyer</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Tickets</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center pl-7">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  orders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-mono font-medium text-center">
                            {order.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(order.buyerName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{order.buyerName}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.buyerEmail}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-center">{fmt(order.createdAt)}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">
                          {order.tickets?.length}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-center">{order.total}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`${statusColor(
                            order.status
                          )}`}
                        >
                          {statusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewDetails()}
                          className="gap-2 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about this order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-bold text-lg">
                      {selectedOrder.id}
                    </p>
                  </div>
                  {/* {getStatusBadge(selectedOrder.status)} */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {fmt(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Buyer Information</h4>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {getInitials(selectedOrder.buyerName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-lg">
                      {selectedOrder.buyerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.buyerEmail}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ticket Holders */}
              <div className="space-y-3">
                <h4 className="font-semibold">
                  Ticket Holders ({selectedOrder.tickets?.length})
                </h4>
                <div className="space-y-3">
                  {selectedOrder.tickets?.map(
                    (attendee: TicketInfoDto, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg border"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{attendee.name}</p>
                            <Badge variant="outline">
                              {attendee.ticketName}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {attendee.email}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tickets</span>
                    <span className="font-medium">
                      {selectedOrder.tickets?.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
