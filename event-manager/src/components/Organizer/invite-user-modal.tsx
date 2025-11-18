import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRoleViewModel } from "../../viewmodels/Organizer/settings/role-staff-view-model"
//import type { InviteUserModalProps } from "../../models/component-props/modal-component-props"

export default function InviteUserModal({
   onClose,
   email,
   setEmail,
   selectedRole,
   setSelectedRole,
   handleInviteStaffToOwner
  }: any) {
  
  const { 
    roles 
  } = useRoleViewModel();

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
            className="px-6 py-2 bg-gray-50 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleInviteStaffToOwner(email, Number(selectedRole))}
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
