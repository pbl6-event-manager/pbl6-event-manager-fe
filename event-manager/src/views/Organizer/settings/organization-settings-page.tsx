"use client"

import { useSearchParams, useNavigate } from "react-router-dom"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import OrganizerListPage from "./organizer-list-page"
import TeamManagementPage from "./team-management-page"

type MainTab = "organizer-profile" | "team-management" | "ticket-fees" | "plan-management" | "app-extensions"
type SettingsTab = "organizer-profile" | "staff-management" | "role-management" | "ticket-fees" | "plan-management" | "app-extensions"

export default function OrganizationSettingsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const activeTab = (searchParams.get("tab") || "organizer-profile") as SettingsTab

  const getMainTab = (): MainTab => {
    if (activeTab === "staff-management" || activeTab === "role-management") {
      return "team-management"
    }
    return activeTab as MainTab
  }
  const mainTab = getMainTab()

  //5 main tabs
  const tabs = [
    { id: "organizer-profile" as const, label: "Organizer Profile" },
    { id: "team-management" as const, label: "Team Management" },
    { id: "ticket-fees" as const, label: "Ticket Fees" },
    { id: "plan-management" as const, label: "Plan Management" },
    { id: "app-extensions" as const, label: "App Extensions" },
  ]

  const handleTabChange = (tab: MainTab) => {
    if (tab === "team-management") {
      navigate(`/organizer/settings?tab=staff-management`)
    } else {
      navigate(`/organizer/settings?tab=${tab}`)
    }
  }

  const isTeamManagement = activeTab === "staff-management" || activeTab === "role-management"

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <h1 className="mb-6 text-5xl font-bold text-gray-900">Organization Settings</h1>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                variant="ghost"
                className={cn(
                  "pb-4 text-base font-medium transition-colors relative whitespace-nowrap shadow-none hover:bg-transparent",
                  activeTab === tab.id ? "text-blue-600" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {tab.label}
                {mainTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "organizer-profile" && <OrganizerListPage />}
          {isTeamManagement && <TeamManagementPage />}
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