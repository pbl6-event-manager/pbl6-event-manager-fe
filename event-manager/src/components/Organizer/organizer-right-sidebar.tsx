import type React from "react"
import { Calendar, Megaphone, Mail } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface ActionItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
}

const actionItems: ActionItem[] = [
  { icon: Calendar, label: "Event" },
  { icon: Calendar, label: "Collection" },
  { icon: Megaphone, label: "Eventbrite Ad" },
  { icon: Mail, label: "Email campaign" },
]

export function OrganizerRightSidebar() {
  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
      <div className="space-y-3">
        {actionItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-gray-700 hover:bg-white"
            >
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon className="h-4 w-4 text-orange-600" />
              </div>
              {item.label}
            </Button>
          )
        })}
      </div>

      {/* Search/Filter Dropdown */}
      <div className="mt-6">
        <Select defaultValue="tam">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tam">Tạm</SelectItem>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
