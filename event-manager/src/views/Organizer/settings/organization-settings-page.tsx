"use client"

import { useState } from "react"
import { cn } from "../../../lib/utils"
import OrganizerListPage from "./organizer-list-page"
import TeamManagementPage from "./team-management-page"

type SettingsTab = "organizer-profile" | "team-management" | "ticket-fees" | "plan-management" | "app-extensions"

export default function OrganizationSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("organizer-profile")

  const tabs = [
    { id: "organizer-profile" as const, label: "Organizer Profile" },
    { id: "team-management" as const, label: "Team Management" },
    { id: "ticket-fees" as const, label: "Ticket Fees" },
    { id: "plan-management" as const, label: "Plan Management" },
    { id: "app-extensions" as const, label: "App Extensions" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <h1 className="mb-6 text-5xl font-bold text-gray-900">Organization Settings</h1>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-4 text-base font-medium transition-colors relative",
                  activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "organizer-profile" && <OrganizerListPage />}
          {activeTab === "team-management" && <TeamManagementPage />}
          {activeTab === "ticket-fees" && <div className="text-gray-600">Ticket Fees content coming soon...</div>}
          {activeTab === "plan-management" && (
            <div className="text-gray-600">Plan Management content coming soon...</div>
          )}
          {activeTab === "app-extensions" && <div className="text-gray-600">App Extensions content coming soon...</div>}
        </div>
      </div>
    </div>
  )
}
