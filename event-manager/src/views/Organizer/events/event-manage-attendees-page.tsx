"use client"

import { useState, useEffect } from "react"
import { Search, UserCheck, Users, Download, Filter, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"

export default function EventManageAttendeesPage() {
  const [attendees, setAttendees] = useState<any[]>([])
  const [filteredAttendees, setFilteredAttendees] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterCheckIn, setFilterCheckIn] = useState<string>("all")
  const [totalCount, setTotalCount] = useState(0)
  const [checkedInCount, setCheckedInCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with API call
  useEffect(() => {
    const mockAttendees: any[] = [
      {
        id: "1",
        orderId: "ORD-001",
        ticketId: "TKT-001",
        ticketName: "General Admission",
        ticketType: "PAID",
        firstName: "Nguyễn",
        lastName: "Văn A",
        email: "nguyenvana@email.com",
        phoneNumber: "+84 912 345 678",
        checkInStatus: "CHECKED_IN",
        checkInTime: "2024-01-15T10:30:00",
        barcodeNumber: "BAR123456789",
        purchaseDate: "2024-01-10T14:20:00",
        status: "ACTIVE",
      },
      {
        id: "2",
        orderId: "ORD-001",
        ticketId: "TKT-001",
        ticketName: "General Admission",
        ticketType: "PAID",
        firstName: "Trần",
        lastName: "Thị B",
        email: "tranthib@email.com",
        phoneNumber: "+84 987 654 321",
        checkInStatus: "NOT_CHECKED_IN",
        barcodeNumber: "BAR987654321",
        purchaseDate: "2024-01-10T14:20:00",
        status: "ACTIVE",
      },
      {
        id: "3",
        orderId: "ORD-002",
        ticketId: "TKT-002",
        ticketName: "VIP Pass",
        ticketType: "PAID",
        firstName: "Lê",
        lastName: "Minh C",
        email: "leminhc@email.com",
        phoneNumber: "+84 901 234 567",
        checkInStatus: "CHECKED_IN",
        checkInTime: "2024-01-15T09:15:00",
        barcodeNumber: "BAR555666777",
        purchaseDate: "2024-01-08T16:45:00",
        status: "ACTIVE",
      },
    ]

    setAttendees(mockAttendees)
    setFilteredAttendees(mockAttendees)
    setTotalCount(mockAttendees.length)
    setCheckedInCount(mockAttendees.filter((a) => a.checkInStatus === "CHECKED_IN").length)
  }, [])

  // Filter logic
  useEffect(() => {
    let filtered = attendees

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (a) =>
          a.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.barcodeNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((a) => a.status === filterStatus)
    }

    // Check-in filter
    if (filterCheckIn !== "all") {
      filtered = filtered.filter((a) => a.checkInStatus === filterCheckIn)
    }

    setFilteredAttendees(filtered)
  }, [searchTerm, filterStatus, filterCheckIn, attendees])

  const handleCheckIn = (attendeeId: string) => {
    setAttendees((prev) =>
      prev.map((a) =>
        a.id === attendeeId ? { ...a, checkInStatus: "CHECKED_IN" as const, checkInTime: new Date().toISOString() } : a,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
      case "REFUNDED":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Refunded</Badge>
      case "CANCELLED":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Manage Attendees</h2>
        <p className="text-muted-foreground mt-2">View and manage all attendees for this event</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered for event</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Checked In</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{checkedInCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Not Checked In</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount - checkedInCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Pending check-in</p>
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
                placeholder="Search by name, email, or barcode..."
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
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCheckIn} onValueChange={setFilterCheckIn}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Check-in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                  <SelectItem value="NOT_CHECKED_IN">Not Checked In</SelectItem>
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

      {/* Attendees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendees List ({filteredAttendees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attendee</TableHead>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No attendees found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(attendee.firstName, attendee.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {attendee.firstName} {attendee.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">{attendee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{attendee.ticketName}</div>
                          <div className="text-sm text-muted-foreground">{attendee.barcodeNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{attendee.orderId}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(attendee.status)}</TableCell>
                      <TableCell>
                        {attendee.checkInStatus === "CHECKED_IN" ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm">Checked in</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <XCircle className="h-4 w-4" />
                            <span className="text-sm">Not checked in</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {attendee.checkInStatus === "NOT_CHECKED_IN" && attendee.status === "ACTIVE" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCheckIn(attendee.id)}
                            className="gap-2"
                          >
                            <UserCheck className="h-4 w-4" />
                            Check In
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
