"use-client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import OrganizerSidebar from "../../components/Organizer/organizer-sidebar"
import OrganizerNavbar from "../../components/Organizer/organizer-navbar"
//import { OrganizerRightSidebar } from "../../components/Organizer/organizer-right-sidebar"


export default function OrganizerLayout() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`transition-transform duration-300 ${isScrolled ? "-translate-y-full" : "translate-y-0"}`}>
        <OrganizerNavbar />
      </div>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <OrganizerSidebar showLogo= {isScrolled} />

        <main className="flex-1"> 
          <Outlet />
        </main>
        {/* <OrganizerRightSidebar /> */}
      </div>
    </div>
  )
}