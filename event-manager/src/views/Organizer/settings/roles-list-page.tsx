import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { useRoleViewModel } from "../../../viewmodels/Organizer/settings/role-staff-view-model"

export default function RolesListPage() {
  const {
    filteredRoles,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    handleNavigateToCreateNewRole,
    handleNavigateToUpdateRole,
    handleDeleteOwnerRole
  } = useRoleViewModel()

  if (isLoading) {
    return <div className="flex items-center justify-center py-8">Loading roles...</div>
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Input
          type="text"
          placeholder="Enter text to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleNavigateToCreateNewRole}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          Create new role
        </Button>
      </div>
      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

      {/* Roles List */}
      <div className="space-y-4">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="relative flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white font-semibold text-sm">
                {role.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{role.name}</h3>
                {role.description && (
                  <p className="text-sm text-gray-600">{role.description}</p>
                )}
              </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem 
                    onClick={() => handleNavigateToUpdateRole(role.id)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    variant="destructive"
                    onClick={() => handleDeleteOwnerRole(role.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  )
}
