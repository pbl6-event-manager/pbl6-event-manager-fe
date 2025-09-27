"use client"

import type React from "react"
import { Home, Calendar, FileText, Megaphone, BarChart3, Building, Settings, HelpCircle, Grid3X3 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { Link, useLocation } from "react-router-dom"

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Home", href: "/organizer/home" },
  { icon: Calendar, label: "Events", href: "/organizer/events/all" },
  { icon: FileText, label: "Reports", href: "/organizer/reports" },
  { icon: Megaphone, label: "Marketing", href: "/organizer/marketing" },
  { icon: BarChart3, label: "Analytics", href: "/organizer/analytics" },
  { icon: Building, label: "Venues", href: "/organizer/venues" },
  { icon: Settings, label: "Settings", href: "/organizer/settings" },
  { icon: HelpCircle, label: "Help", href: "/organizer/help" },
]


export default function OrganizerSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Navigation Items */}
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={index} to={item.href}>
              <Button
                variant="ghost"
                size="icon"
                className = {cn(
                  "w-12 h-12 rounded-lg",
                  isActive
                    ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="h-6 w-6"></Icon>
              </Button>  
            </Link>
          )
        })}
      </div>

      {/* Bottom Apps Icon */}
      <div className="mt-auto">
        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-lg text-gray-600 hover:bg-gray-100">
          <Grid3X3 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
