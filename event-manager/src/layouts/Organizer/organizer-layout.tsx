"use-client"


import { Outlet } from "react-router-dom"
import OrganizerSidebar from "../../components/Organizer/organizer-sidebar"
import OrganizerNavbar from "../../components/Organizer/organizer-navbar"
//import { OrganizerRightSidebar } from "../../components/Organizer/organizer-right-sidebar"


export default function OrganizerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OrganizerNavbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <OrganizerSidebar />

        <main className="flex-1"> 
          <Outlet />
        </main>
        {/* <OrganizerRightSidebar /> */}
      </div>
    </div>
  )
}