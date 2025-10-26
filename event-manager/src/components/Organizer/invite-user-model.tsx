"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface InviteUserModalProps {
  onClose: () => void
}

// Mock roles - replace with Redux state
const mockRoles = [
  { id: "1", name: "Owner" },
  { id: "2", name: "Admin" },
  { id: "3", name: "Editor" },
]

export default function InviteUserModal({ onClose }: InviteUserModalProps) {
  const [email, setEmail] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [limitedAccess, setLimitedAccess] = useState(false)

  const handleSubmit = () => {
    if (email && selectedRole) {
      // TODO: Dispatch Redux action to invite user
      console.log("[v0] Inviting user:", { email, role: selectedRole, limitedAccess })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8">
        <p className="mb-6 text-gray-700">
          Enter the email addresses of the users you'd like to add, then choose the role they should have within your
          organization
        </p>

        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              placeholder="Enter an email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a role</option>
              {mockRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Limited Event Access Checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="limitedAccess"
              checked={limitedAccess}
              onChange={(e) => setLimitedAccess(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <label htmlFor="limitedAccess" className="text-sm text-gray-700">
              Limited event access
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!email || !selectedRole}
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
