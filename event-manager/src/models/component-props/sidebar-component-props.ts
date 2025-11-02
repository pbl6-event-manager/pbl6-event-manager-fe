import React from "react"

export interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

export interface OrganizerSidebarProps {
  showLogo?: boolean
}
