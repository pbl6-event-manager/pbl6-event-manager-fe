import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEventTeamManagementViewModel } from "../../viewmodels/Organizer/events/event-team-management-view-model"
import type { AssignMemberModalProps } from "../../models/component-props/modal-component-props"

export default function AssignMemberModal({
    availableMembers,
    onAssign,
    onClose,
    isLoading = false,
}: AssignMemberModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const viewModel = useEventTeamManagementViewModel()
    const filteredMembers = availableMembers.filter(
        (member) =>
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900">Assign Member to Event</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Search */}
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Members List */}
                    <div className="max-h-96 space-y-2 overflow-y-auto">
                        {filteredMembers.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No available members</p>
                        ) : (
                            filteredMembers.map((member) => {
                                const isAssigned = viewModel.isMemberAssigned(member.id)
                                return (
                                    (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-semibold text-xs">
                                                    {member.name?.charAt(0) || member.email.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">{member.name}</p>
                                                    <p className="text-xs text-gray-600 truncate">{member.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">   
                                                <input
                                                    type="checkbox"
                                                    checked={isAssigned}
                                                    onChange={() => onAssign(member)}
                                                    disabled={isLoading}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
                                                />
                                                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                                                    {isAssigned ? 'Assigned' : 'Assign'}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 flex justify-end gap-4">
                    <Button 
                        className="bg-orange-600 hover:bg-orange-700 text-white hover:text-white px-6 py-2 rounded-lg font-medium cursor-pointer" 
                        onClick={onClose} 
                        variant="outline"
                    >
                        Save
                    </Button>
                    <Button className="cursor-pointer" onClick={onClose} variant="outline">
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}
