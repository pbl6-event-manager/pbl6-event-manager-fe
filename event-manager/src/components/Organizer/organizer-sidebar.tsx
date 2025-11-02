import { useState } from "react"
import { Home, Calendar, FileText, Megaphone, Settings, HelpCircle, Grid3X3 } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { Link, useLocation } from "react-router-dom"
import EventbriteLogoIcon from "../eventbrite-logo-icon"
import type { SidebarItem, OrganizerSidebarProps } from "../../models/component-props/sidebar-component-props"

export default function OrganizerSidebar({ showLogo = false }: OrganizerSidebarProps) {
  const sidebarItems: SidebarItem[] = [
    { icon: Home, label: "Home", href: "/organizer/home" },
    { icon: Calendar, label: "Events", href: "/organizer/events/all" },
    { icon: FileText, label: "Orders", href: "/organizer/orders" },
    { icon: Megaphone, label: "Vouchers", href: "/organizer/vouchers" },
    { icon: Settings, label: "Settings", href: "/organizer/settings" },
    { icon: HelpCircle, label: "Help", href: "/organizer/help" },
  ]
  const location = useLocation()
  const pathname = location.pathname
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {showLogo && (
        <div className="mb-6 flex items-center justify-center">
          <EventbriteLogoIcon className="h-8 w-8" />
        </div>
      )}
      {/* Navigation Items */}
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link key={index} to={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg",
                    isActive
                      ? "bg-blue-100 text-blue-600 hover:bg-blue-100"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="h-6 w-6" />
                </Button>
              </Link>

              {hoveredItem === item.label && (
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </div>
              )}
            </div>

          )
        })}
      </div>

      {/* Bottom Apps Icon */}
      <div className="mt-auto relative">
        <div onMouseEnter={() => setHoveredItem("Apps")} onMouseLeave={() => setHoveredItem(null)}>
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-lg text-gray-600 hover:bg-gray-100">
            <Grid3X3 className="h-6 w-6" />
          </Button>
          {hoveredItem === "Apps" && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg">
              Apps
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
