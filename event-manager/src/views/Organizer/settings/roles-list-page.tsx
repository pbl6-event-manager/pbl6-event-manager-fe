"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { useRoleViewModel } from "../../../viewmodels/Organizer/settings/role-view-model"

export default function RolesListPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<number | null>(null)
  const { roles, isLoading, error, handleFetchOwnerRoleStaffs, handleDeleteOwnerRole } = useRoleViewModel()
  
  useEffect(() => {
    handleFetchOwnerRoleStaffs(1) // Assuming ownerId is 1 for demo purposes
  }, [])

  const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleMenuClick = (roleId: number) => {
    setSelectedRole(selectedRole === roleId ? null : roleId)
  }

  const handleCreateNewRole = () => {
    navigate("/organizer/settings/members/roles/create")
  }

  const handleDeleteRole = async (roleId: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await handleDeleteOwnerRole(roleId)
      setSelectedRole(null)
    }
  }

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
          onClick={handleCreateNewRole}
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
                {/* {role.description && <p className="text-sm text-gray-600">{role.description}</p>} */}
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600" onClick={() => handleMenuClick(role.id)}>
              <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            {selectedRole === role.id && (
              <div className="absolute right-0 top-[70%] z-50 mt-0 w-40 rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-150 ease-out">
                <button
                  onClick={() => {
                    /* Handle Edit Action */
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => { handleDeleteRole(role.id) }}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
