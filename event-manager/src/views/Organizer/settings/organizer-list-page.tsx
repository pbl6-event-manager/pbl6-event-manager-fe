"use client"

import { useEffect, useState } from "react"
import { useOrganizerViewModel } from "../../../viewmodels/Organizer/settings/organizer-view-model"
import type { OrganizerProfile } from "../../../models/organizer-models"

export default function OrganizerListPage() {
  const {
    organizers,
    loading,
    loadOrganizers,
    navigateToAddOrganizer,
    navigateToEditOrganizer,
    navigateToViewOrganizer,
    handleDeleteOrganizer,
  } = useOrganizerViewModel()

  const [selectedOrganizer, setSelectedOrganizer] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [organizationName, setOrganizationName] = useState("Lê Tôn Thanh An")
  const [preferredCountry, setPreferredCountry] = useState("")
  const [countryError, setCountryError] = useState(false)

  useEffect(() => {
    loadOrganizers()
  }, [loadOrganizers])

  const handleMenuClick = (organizerId: string) => {
    setSelectedOrganizer(selectedOrganizer === organizerId ? null : organizerId)
  }

  const handleEdit = (organizerId: string) => {
    navigateToEditOrganizer(organizerId)
    setSelectedOrganizer(null)
  }

  const handleView = (organizer: OrganizerProfile) => {
    navigateToViewOrganizer(organizer.pageUrl)
    setSelectedOrganizer(null)
  }

  const handleDelete = async (organizerId: string) => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (selectedOrganizer) {
      await handleDeleteOrganizer(selectedOrganizer)
      setShowDeleteConfirm(false)
      setSelectedOrganizer(null)
    }
  }

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
                className={`flex items-center justify-between p-6 ${
                  index !== organizers.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <svg className="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-gray-900">{organizer.name}</span>
                </div>

                <div className="relative">
                  <button onClick={() => handleMenuClick(organizer.id)} className="rounded p-2 hover:bg-gray-100">
                    <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {selectedOrganizer === organizer.id && (
                    <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-lg">
                      <button
                        onClick={() => handleEdit(organizer.id)}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleView(organizer)}
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                      >
                        View
                      </button>
                      {!organizer.isUnnamed && (
                        <button
                          onClick={() => handleDelete(organizer.id)}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-gray-50"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Organization Section */}
        {/* <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-2 text-xl font-bold text-gray-900">Organization</h2>
          <p className="mb-6 text-sm text-gray-600">Details that apply across your events and venues</p>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              />
              <div className="mt-1 text-right text-xs text-gray-500">{organizationName.length}/50</div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Preferred Country <span className="text-red-500">*</span>
              </label>
              <select
                value={preferredCountry}
                onChange={(e) => {
                  setPreferredCountry(e.target.value)
                  setCountryError(false)
                }}
                className={`w-full rounded-lg border ${
                  countryError ? "border-red-500" : "border-gray-300"
                } px-4 py-2.5 focus:border-blue-500 focus:outline-none`}
              >
                <option value="">Select a country</option>
                <option value="VN">Vietnam</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
              </select>
              {countryError && <p className="mt-1 text-sm text-red-500">Preferred Country is required</p>}
            </div>
          </div>
        </div> */}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
              <h3 className="mb-4 text-xl font-bold">Delete Organizer</h3>
              <p className="mb-6 text-gray-600">
                Are you sure you want to delete this organizer? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}