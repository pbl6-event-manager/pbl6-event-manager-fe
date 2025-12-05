"use client"

import { useOrganizerViewModel } from "../../../viewmodels/Organizer/settings/organizer-view-model"
import { Button } from "../../../components/ui/button"
import { MoreVertical, Pencil, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

export default function OrganizerListPage() {
  const {
    organizers,
    loading,
    navigateToAddOrganizer,
    navigateToEditOrganizer,
    handleDeleteOrganizer,
  } = useOrganizerViewModel()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Organizer profiles</h1>
          <p className="text-gray-600">
            Each profile describes a unique organizer and shows all of their events on one page. Having a complete
            profile can encourage attendees to follow you.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more
            </a>
          </p>
        </div>

        {/* Add Organizer Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={navigateToAddOrganizer}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-900 hover:bg-gray-50"
          >
            Add organizer profile
          </button>
        </div>

        {/* Organizers List */}
        <div className="mb-8 overflow-visible rounded-lg border border-gray-200 bg-white">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : (
            organizers.map((organizer, index) => (
              <div
                key={organizer.id}
                className={`flex items-center justify-between p-6 ${index !== organizers.length - 1 ? "border-b border-gray-200" : ""
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    {
                      organizer.logoUrl ? (
                        <img
                          src={organizer.logoUrl}
                          alt={organizer.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )
                    }
                  </div>
                  <span className="text-lg font-medium text-gray-900">{organizer.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                    //onClick={() => }
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigateToEditOrganizer(organizer.id)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDeleteOrganizer(organizer.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}