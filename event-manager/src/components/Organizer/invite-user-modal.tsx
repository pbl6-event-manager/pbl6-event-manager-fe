import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRoleViewModel } from "../../viewmodels/Organizer/settings/role-staff-view-model"
//import type { InviteUserModalProps } from "../../models/component-props/modal-component-props"

export interface InviteUserModalProps {
  mode: 'invite' | 'edit'
  onClose: () => void
  email: string
  setEmail: (email: string) => void
  selectedRole: string
  setSelectedRole: (role: string) => void
  handleInviteStaffToOwner: (email: string, roleId: number) => void
  isSubmitting?: boolean
}

export default function InviteUserModal({
  mode = 'invite',
  onClose,
  email,
  setEmail,
  selectedRole,
  setSelectedRole,
  handleInviteStaffToOwner,
  isSubmitting = false
}: InviteUserModalProps) {

  const {
    roles
  } = useRoleViewModel();

  const isEditMode = mode === 'edit'
  const title = isEditMode ? 'Edit Staff Member' : 'Invite New Staff'
  const description = isEditMode
    ? 'Update the role for this staff member'
    : "Enter the email addresses of the users you'd like to add, then choose the role they should have within your organization"
  const submitButtonText = isEditMode ? 'Update' : 'Add'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="mb-6 text-gray-700">{description}</p>

        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              placeholder="Enter an email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEditMode}
              className={`w-full ${isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {isEditMode && (
              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed when editing
              </p>
            )}
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
              disabled={isSubmitting}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <Button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleInviteStaffToOwner(email, Number(selectedRole))}
            disabled={!email || !selectedRole || isSubmitting} 
            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : submitButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
