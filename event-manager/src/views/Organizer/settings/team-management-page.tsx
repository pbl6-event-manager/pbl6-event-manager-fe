import { useNavigate, useSearchParams } from "react-router-dom"
import { cn } from "../../../lib/utils"
import UsersListPage from "./users-list-page"
import RolesListPage from "./roles-list-page"
import { Button } from "../../../components/ui/button"
import { User, BriefcaseBusiness } from "lucide-react"

type TeamTab = "users" | "roles"

export default function TeamManagementPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const tab = (searchParams.get("tab") || "users") as TeamTab

    const handleTabChange = (newTab: TeamTab) => {
        navigate(`?tab=${newTab}`)
    }

    return (
        <div className="container mx-auto px-2 py-2 h-full">
            {/* ===== MOBILE TAB BAR ===== */}
            <div className="flex lg:hidden gap-2 mb-6">
                <Button
                    variant="secondary"
                    onClick={() => handleTabChange("users")}
                    className={cn(
                        "flex-1 flex items-center justify-center text-sm font-medium transition-colors",
                        tab === "users"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100 shadow-sm",
                    )}
                >
                    <User className="mr-2 h-4 w-4" />
                    Users
                </Button>

                <Button
                    variant="secondary"
                    onClick={() => handleTabChange("roles")}
                    className={cn(
                        "flex-1 flex items-center justify-center text-sm font-medium transition-colors",
                        tab === "roles"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100 shadow-sm",
                    )}
                >
                    <BriefcaseBusiness className="mr-2 h-4 w-4" />
                    Roles
                </Button>
            </div>

            {/* ===== DESKTOP GRID LAYOUT ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 h-full">
                {/* Sidebar (ẩn trên mobile) */}
                <div className="hidden lg:flex flex-col gap-4 overflow-y-auto h-full">
                    <Button
                        variant="secondary"
                        onClick={() => handleTabChange("users")}
                        className={cn(
                            "w-full flex items-center justify-start text-sm font-medium transition-colors rounded-md",
                            tab === "users"
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "text-gray-600 hover:text-blue-600 hover:bg-white shadow-md",
                        )}
                    >
                        <User className="mr-2 h-4 w-4" />
                        Users
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => handleTabChange("roles")}
                        className={cn(
                            "w-full flex items-center justify-start text-sm font-medium transition-colors rounded-md",
                            tab === "roles"
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "text-gray-600 hover:text-blue-600 hover:bg-white shadow-md",
                        )}
                    >
                        <BriefcaseBusiness className="mr-2 h-4 w-4" />
                        Roles
                    </Button>
                </div>

                {/* Main content */}
                <div className="lg:col-span-6">
                    <div className="h-full">
                        {tab === "users" && <UsersListPage />}
                        {tab === "roles" && <RolesListPage />}
                    </div>
                </div>
            </div>
        </div>
    )
}
