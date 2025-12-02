import EventbriteLogo from "../eventbrite-logo";
import { useAppSelector } from "../../hooks/redux"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, ChevronDown, Plus } from "lucide-react";
import { useAccountViewModel } from "../../viewmodels/Organizer/accounts/accounts-view-model";

export default function OrganizerNavbar() {
  const user = useAppSelector((state) => state.authReducer.user)
  const navigate = useNavigate()
  const { handleAccountSettings } = useAccountViewModel();
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }
  const handleNavigateToCreateEvent = () => {
    navigate("/organizer/events/create-event")
  }

  const getDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user?.email || "User"
  }

  const handleLogout = () => {
    // TODO: Implement logout action
    navigate("/login")
  }
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <EventbriteLogo className="h-5 w-auto" />
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center gap-4">
          <Button className="bg-[#f05537] hover:bg-[#e04527] text-white cursor-pointer" onClick={handleNavigateToCreateEvent}>
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-500 text-white text-sm">{getInitials()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{getDisplayName()}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <span>Switch to attending</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleAccountSettings}>
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <span>Log out</span>
                <span className="text-xs text-gray-500 ml-auto">{user?.email?.substring(0, 20)}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}
