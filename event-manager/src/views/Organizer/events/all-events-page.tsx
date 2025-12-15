"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronDown, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Badge } from "../../../components/ui/badge"
import { useEventViewModel } from "../../../viewmodels/Organizer/events/event-view-model"
import { formatDateRange } from "../../../utils/Organizer/date-format"

export default function AllEventsPage() {
  const {
    activeTab,
    filteredMyEvents,
    filteredOtherEvents,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    getStatusColor,
    handleNavigateToEditEvent,
    handleViewEvent,
    handleTabChange,
  } = useEventViewModel()

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = activeTab === "my" ? filteredMyEvents.length : filteredOtherEvents.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [activeTab, totalItems, totalPages]);

  const paginatedMyEvents = useMemo(() => {
    if (!filteredMyEvents || filteredMyEvents.length === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMyEvents.slice(start, start + itemsPerPage);
  }, [filteredMyEvents, currentPage]);

  const paginatedOtherEvents = useMemo(() => {
    if (!filteredOtherEvents || filteredOtherEvents.length === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOtherEvents.slice(start, start + itemsPerPage);
  }, [filteredOtherEvents, currentPage]);


  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Events</h1>

        {/* Tabs */}
        <div className="flex gap-8 mb-6 border-b border-gray-200">
          <button
            onClick={() => handleTabChange("my")}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer ${activeTab === "my"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
              }`}
          >
            My Events
          </button>
          <button
            onClick={() => handleTabChange("other")}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer ${activeTab === "other"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
              }`}
          >
            Other Events
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-128"
              />
            </div>

            {/* View Mode Toggle */}
            {/* <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
            </div> */}

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                  {statusFilter}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Draft")}>Draft</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Published")}>Published</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Create Event Button - Only show on My Events tab */}
          {activeTab === "my" && (
            <Link to="/organizer/events/create-event">
              <Button className="bg-[#f05537] hover:bg-[#d94829] text-white cursor-pointer">
                Create Event
              </Button>
            </Link>
          )}
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          {activeTab === "my" ? (
            <div>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div className="col-span-4">Event</div>
                <div className="col-span-2">Sold</div>
                <div className="col-span-2">Gross</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Organizer</div>
                <div className="col-span-1"></div>
              </div>
              {filteredMyEvents.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  No events found
                </div>
              ) : (
                paginatedMyEvents.map((event) => (
                  <div
                    key={event.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleViewEvent(event.id)}
                  >
                    {/* Event Info */}
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center bg-orange-50 rounded px-2 py-1 min-w-[50px]">
                        <span className="text-xs font-semibold text-orange-600 uppercase">
                          {new Date(event.startDate).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-xl font-bold text-gray-900">{new Date(event.startDate).getDate()}</span>
                      </div>
                      <img
                        src={event.bannerImagePath || "/placeholder.svg"}
                        alt={event.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.address}</p>
                        <p className="text-sm text-gray-500">
                          {formatDateRange(event.startDate, event.endDate, "", "")}
                        </p>
                      </div>
                    </div>

                    {/* Sold */}
                    <div className="col-span-2 flex items-center text-sm text-gray-700">
                      {event.soldTickets} / {event.capacity}
                    </div>

                    {/* Gross */}
                    <div className="col-span-2 flex items-center text-sm text-gray-700">$0</div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <Badge variant="secondary" className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>

                    {/* Organizer Name */}
                    <div className="col-span-1 flex items-center text-sm text-gray-700">
                      <Badge variant="secondary" className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="block truncate">
                          {event.organizerName}
                        </span>
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* Only show Edit for My Events */}
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNavigateToEditEvent(event.id)
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {/* Only show Delete for My Events */}
                          <DropdownMenuItem
                            // onClick={(e) => {
                            //   e.stopPropagation()
                            //   handleDeleteEvent(event.id)
                            // }}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
              {filteredMyEvents.length > itemsPerPage && (
                <div className="border-t px-6 py-3">
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium">
                        {filteredMyEvents && filteredMyEvents.length > 0
                          ? (currentPage - 1) * itemsPerPage + 1
                          : 0}
                      </span>{" "}
                      -{" "}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredMyEvents?.length ?? 0)}
                      </span>{" "}
                      / <span className="font-medium">{filteredMyEvents?.length ?? 0}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="cursor-pointer"
                      >
                        Prev
                      </Button>

                      <div className="hidden md:flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-3 py-1 rounded text-sm cursor-pointer ${
                              p === currentPage ? "bg-primary text-white" : "bg-transparent text-muted-foreground hover:bg-gray-100"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
                <div className="col-span-5">Event</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Organizer</div>
                <div className="col-span-1"></div>
              </div>
              {/* Table Body */}
              {filteredOtherEvents.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500">
                  You are not assigned to any events
                </div>
              ) : (
                paginatedOtherEvents.map((event) => (
                  <div
                    key={event.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleViewEvent(event.id)}
                  >
                    {/* Event Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center bg-orange-50 rounded px-2 py-1 min-w-[50px]">
                        <span className="text-xs font-semibold text-orange-600 uppercase">
                          {new Date(event.startDate).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-xl font-bold text-gray-900">{new Date(event.startDate).getDate()}</span>
                      </div>
                      <img
                        src={event.bannerImagePath || "/placeholder.svg"}
                        alt={event.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600">{event.address}</p>
                        <p className="text-sm text-gray-500">
                          {formatDateRange(event.startDate, event.endDate, "", "")}
                        </p>
                      </div>
                    </div>

                    {/* Role in Event */}
                    <div className="col-span-2 flex items-center text-sm text-gray-700">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {event.roleInEvent}
                      </Badge>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex items-center">
                      <Badge variant="secondary" className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>

                    {/* Organizer Name */}
                    <div className="col-span-2 flex items-center text-sm text-gray-700">
                      <Badge variant="secondary" className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="block truncate">
                          {event.organizerName}
                        </span>
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* Show View Details for Other Events */}
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNavigateToEditEvent(event.id)
                            }}
                          >
                            <Search className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
              {filteredOtherEvents.length > itemsPerPage && (
                <div className="border-t px-6 py-3">
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="text-muted-foreground">
                      Hiển thị{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span>{" "}
                      -{" "}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, filteredOtherEvents.length)}
                      </span>{" "}
                      / <span className="font-medium">{filteredOtherEvents.length}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border"
                      >
                        Prev
                      </button>

                      <div className="hidden md:flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-3 py-1 rounded text-sm ${
                              p === currentPage ? "bg-blue-600 text-white" : "bg-transparent text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded border"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}