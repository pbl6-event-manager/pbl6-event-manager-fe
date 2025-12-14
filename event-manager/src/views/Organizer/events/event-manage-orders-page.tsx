"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, DollarSign, Download, Filter, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Separator } from "../../../components/ui/separator"

export default function EventManageOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [totalCount, setTotalCount] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Mock data - replace with API call
  useEffect(() => {
    const mockOrders: any[] = [
      {
        id: "ORD-001",
        orderNumber: "EVT20240001",
        eventId: "1",
        buyerId: "user-1",
        buyerName: "Nguyễn Văn X",
        buyerEmail: "nguyenvanx@email.com",
        buyerPhone: "+84 912 345 678",
        orderDate: "2024-01-10T14:20:00",
        totalAmount: 500000,
        currency: "VND",
        status: "COMPLETED",
        paymentMethod: "Credit Card",
        ticketCount: 2,
        attendees: [
          {
            id: "1",
            ticketId: "TKT-001",
            ticketName: "General Admission",
            ticketType: "PAID",
            firstName: "Nguyễn",
            lastName: "Văn A",
            email: "nguyenvana@email.com",
            phoneNumber: "+84 912 345 678",
            status: "ACTIVE",
          },
          {
            id: "2",
            ticketId: "TKT-001",
            ticketName: "General Admission",
            ticketType: "PAID",
            firstName: "Trần",
            lastName: "Thị B",
            email: "tranthib@email.com",
            phoneNumber: "+84 987 654 321",
            status: "ACTIVE",
          },
        ],
      },
      {
        id: "ORD-002",
        orderNumber: "EVT20240002",
        eventId: "1",
        buyerId: "user-2",
        buyerName: "Trần Thị Y",
        buyerEmail: "tranthiy@email.com",
        buyerPhone: "+84 987 654 321",
        orderDate: "2024-01-08T16:45:00",
        totalAmount: 1000000,
        currency: "VND",
        status: "COMPLETED",
        paymentMethod: "Bank Transfer",
        ticketCount: 1,
        attendees: [
          {
            id: "3",
            ticketId: "TKT-002",
            ticketName: "VIP Pass",
            ticketType: "PAID",
            firstName: "Lê",
            lastName: "Minh C",
            email: "leminhc@email.com",
            phoneNumber: "+84 901 234 567",
            status: "ACTIVE",
          },
        ],
      },
      {
        id: "ORD-003",
        orderNumber: "EVT20240003",
        eventId: "1",
        buyerId: "user-3",
        buyerName: "Phạm Minh Z",
        buyerEmail: "phamminhz@email.com",
        orderDate: "2024-01-12T10:30:00",
        totalAmount: 750000,
        currency: "VND",
        status: "PENDING",
        paymentMethod: "E-Wallet",
        ticketCount: 3,
        attendees: [
          {
            id: "4",
            ticketId: "TKT-001",
            ticketName: "General Admission",
            ticketType: "PAID",
            firstName: "Phạm",
            lastName: "Văn D",
            email: "phamvand@email.com",
            status: "ACTIVE",
          },
          {
            id: "5",
            ticketId: "TKT-001",
            ticketName: "General Admission",
            ticketType: "PAID",
            firstName: "Ngô",
            lastName: "Thị E",
            email: "ngothie@email.com",
            status: "ACTIVE",
          },
          {
            id: "6",
            ticketId: "TKT-001",
            ticketName: "General Admission",
            ticketType: "PAID",
            firstName: "Đỗ",
            lastName: "Văn F",
            email: "dovanf@email.com",
            status: "ACTIVE",
          },
        ],
      },
    ]

    setOrders(mockOrders)
    setFilteredOrders(mockOrders)
    setTotalCount(mockOrders.length)
    setTotalRevenue(mockOrders.reduce((sum, order) => sum + order.totalAmount, 0))
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = orders

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((o) => o.status === filterStatus)
    }

    setFilteredOrders(filtered)
  }, [searchTerm, filterStatus, orders])

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
      case "REFUNDED":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Refunded</Badge>
      case "CANCELLED":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const getInitials = (name: string) => {
    const parts = name.split(" ")
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Manage Orders</h2>
        <p className="text-muted-foreground mt-2">View and manage all orders for this event</p>
      </div>

      {/* Stats Cards */}
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
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue, "VND")}</div>
            <p className="text-xs text-muted-foreground mt-1">From all orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.reduce((sum, o) => sum + o.ticketCount, 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Tickets sold</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
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
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders List ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div>
                          <div className="font-mono font-medium">{order.orderNumber}</div>
                          <div className="text-sm text-muted-foreground">{order.paymentMethod}</div>
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
                            <div className="text-sm text-muted-foreground">{order.buyerEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(order.orderDate).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(order.orderDate).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.ticketCount}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(order.totalAmount, order.currency)}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(order)} className="gap-2">
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

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Complete information about this order</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-mono font-bold text-lg">{selectedOrder.orderNumber}</p>
                  </div>
                  {getStatusBadge(selectedOrder.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.orderDate).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Buyer Information */}
              <div className="space-y-3">
                <h4 className="font-semibold">Buyer Information</h4>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {getInitials(selectedOrder.buyerName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-lg">{selectedOrder.buyerName}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.buyerEmail}</p>
                    {selectedOrder.buyerPhone && (
                      <p className="text-sm text-muted-foreground">{selectedOrder.buyerPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ticket Holders */}
              <div className="space-y-3">
                <h4 className="font-semibold">Ticket Holders ({selectedOrder.attendees.length})</h4>
                <div className="space-y-3">
                  {selectedOrder.attendees.map((attendee: any, index: any) => (
                    <div key={attendee.id} className="flex items-start gap-3 p-4 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {attendee.firstName} {attendee.lastName}
                          </p>
                          <Badge variant="outline">{attendee.ticketName}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{attendee.email}</p>
                        {attendee.phoneNumber && (
                          <p className="text-sm text-muted-foreground">{attendee.phoneNumber}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Order Summary */}
              <div className="space-y-3">
                <h4 className="font-semibold">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tickets</span>
                    <span className="font-medium">{selectedOrder.ticketCount}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>{formatCurrency(selectedOrder.totalAmount, selectedOrder.currency)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
