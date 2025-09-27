import EventbriteLogo from "../even-brite-logo";
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

export default function OrganizerNavbar() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-[#f05537]">eventbrite</div>
        </div>

        {/* Right side - Actions and User */}
        <div className="flex items-center gap-4">
          <Button className="bg-[#f05537] hover:bg-[#e04527] text-white">
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
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-blue-500 text-white text-sm">LA</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Lê Tôn Thanh An</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <span>Switch to attending</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
                <span className="text-xs text-gray-500 ml-auto">thanhanleton123@gmail...</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
  );
}
