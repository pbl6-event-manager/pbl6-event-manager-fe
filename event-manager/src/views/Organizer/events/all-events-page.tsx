"use client"

import { Link } from "react-router-dom"
import { Search, List, CalendarIcon, ChevronDown, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { Badge } from "../../../components/ui/badge"
import { useEventViewModel } from "../../../viewmodels/Organizer/events/event-view-model"


export default function AllEventsPage() {
  const {
    filteredEvents,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    statusFilter,
    setStatusFilter,
    getStatusColor,
    handleDeleteEvent,
    handleEditEvent,
    handleViewEvent,
  } = useEventViewModel()

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Events</h1>


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
                className="pl-10 w-64"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
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
            </div>

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

          {/* Create Event Button */}
          <Link to="/organizer/events/create-event">
            <Button className="bg-[#f05537] hover:bg-[#d94829] text-white cursor-pointer">
              Create Event
            </Button>
          </Link>
        </div>

        {/* Promotional Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Megaphone className="h-5 w-5 text-gray-700 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Showcase your artist lineup</h3>
                <Badge variant="secondary" className="bg-white text-xs">
                  NEW
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Add headliners and artist pages to your event listings to build hype and trust. Plus, your events can
                get auto-posted to Spotify, Bandsintown, and more.
              </p>
              <div className="flex items-center gap-4">
                <button className="text-sm text-blue-600 hover:underline font-medium">Add your lineup now</button>
                <button className="text-sm text-blue-600 hover:underline font-medium">Learn more</button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
            <div className="col-span-4">Event</div>
            <div className="col-span-2">Sold</div>
            <div className="col-span-2">Gross</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1">Organizer</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Body */}
          {filteredEvents.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">No events found</div>
          ) : (
            filteredEvents.map((event) => (
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
                      {event.startDate} - {event.endDate}
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
                  <Badge variant="secondary">
                    {event.organizerName}
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
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditEvent(event.id)
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteEvent(event.id)
                        }}
                        className="text-red-600"
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
        </div>

        {/* CSV Export */}
        <div className="mt-4">
          <button className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-2">
            <Download className="h-4 w-4" />
            CSV Export
          </button>
        </div>
      </div>
    </div>
  )
}

function Megaphone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    </svg>
  )
}

function Download({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  )
}
