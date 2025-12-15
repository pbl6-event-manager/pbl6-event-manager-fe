import { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserCheck,
  Users,
  Filter,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
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
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import type { AttendeeListDto } from "../../../dtos/attendee-dto";
import { getInitials } from "../../../utils/Organizer/ava-format";

type Props = {
  filteredAttendees: AttendeeListDto[] | undefined;
  filterCheckIn: string | undefined;
  setFilterCheckIn: (s: string) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  checkedInCount: number | undefined;
  totalCount: number;
  handleCheckIn: (n: number) => void;
};

export default function EventManageAttendeesPage({
  filteredAttendees,
  checkedInCount,
  handleCheckIn,
  searchTerm,
  setSearchTerm,
  totalCount,
  filterCheckIn,
  setFilterCheckIn
}: Props) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredAttendees?.length ?? 0) / itemsPerPage)
  );

  useEffect(() => {
    // clamp current page when data length changes
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage]);
  const pageItems = useMemo(() => {
    if (!filteredAttendees || filteredAttendees.length === 0) return [];
    return filteredAttendees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAttendees, startIndex]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Manage Attendees</h2>
        <p className="text-muted-foreground mt-2">
          View and manage all attendees for this event
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attendees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Registered for event
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Checked In</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{checkedInCount ? checkedInCount : 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalCount > 0
                ? Math.round((checkedInCount ? checkedInCount : 0 / totalCount) * 100)
                : 0}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Not Checked In
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCount - (checkedInCount ? checkedInCount : 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pending check-in
            </p>
          </CardContent>
        </Card>
      </div>

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
              <Select value={filterCheckIn} onValueChange={setFilterCheckIn}>
                <SelectTrigger className="w-[160px] cursor-pointer">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Check-in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="cursor-pointer">All</SelectItem>
                  <SelectItem value="true" className="cursor-pointer">Checked In</SelectItem>
                  <SelectItem value="false" className="cursor-pointer">Not Checked In</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attendees List ({filteredAttendees?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-20">Attendee</TableHead>
                  <TableHead className="text-center">Ticket</TableHead>
                  <TableHead className="text-center">Order ID</TableHead>
                  <TableHead className="text-center">Check-in</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No attendees found
                    </TableCell>
                  </TableRow>
                ) : (
                  pageItems.map((attendee, index) => (
                    <TableRow key={startIndex + index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {getInitials(attendee.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {attendee.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {attendee.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-center">
                            {attendee.ticketName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono text-sm">
                          {attendee.orderId}
                        </span>
                      </TableCell>
                      <TableCell className="text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                          {attendee.isCheckin === "true" ? (
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
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {attendee.isCheckin === "false" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCheckIn(startIndex + index)}
                              className="gap-2 cursor-pointer"
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
        <div className="px-4 py-3 flex items-center justify-between border-t bg-white">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(startIndex + 1, filteredAttendees?.length ?? 0)} -
            {Math.min(startIndex + pageItems.length, filteredAttendees?.length ?? 0)} of {filteredAttendees?.length ?? 0}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer"
            >
              Prev
            </Button>
            {/* simple page buttons */}
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${currentPage === i + 1 ? "bg-primary text-white" : "bg-white border"}`}
              >
                {i + 1}
              </button>
            ))}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
       </Card>
     </div>
   );
 }
