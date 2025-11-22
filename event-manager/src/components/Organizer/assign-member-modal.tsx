import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import type { StaffDto } from "../../dtos/staff-dto"

interface AssignMemberModalProps {
    availableMembers: StaffDto[]
    selectedStaffIds: number[]
    onToggle: (staffId: number) => void
    onSave: () => void
    onClose: () => void
    isLoading?: boolean
    searchTerm: string
    setSearchTerm: (term: string) => void
}

export default function AssignMemberModal({
    availableMembers,
    selectedStaffIds,
    onToggle,
    onSave,
    onClose,
    isLoading = false,
    searchTerm,
    setSearchTerm,
}: AssignMemberModalProps) {
    const filteredMembers = availableMembers.filter(
        (member) =>
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Assign Staff to Event
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {selectedStaffIds.length} staff(s) selected
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Search */}
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search by name, email or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Members List */}
                    <div className="max-h-96 space-y-2 overflow-y-auto">
                        {filteredMembers.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">
                                No available members found
                            </p>
                        ) : (
                            filteredMembers.map((member) => {
                                const isSelected = selectedStaffIds.includes(member.id);
                                
                                return (
                                    <div
                                        key={member.id}
                                        className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                                            isSelected 
                                                ? 'border-orange-500 bg-orange-50' 
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sm ${
                                                isSelected 
                                                    ? 'bg-orange-600 text-white' 
                                                    : 'bg-blue-600 text-white'
                                            }`}>
                                                {member.name?.charAt(0) || member.email.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 truncate">
                                                    {member.name}
                                                </p>
                                                <p className="text-xs text-gray-600 truncate">
                                                    {member.email}
                                                </p>
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full shrink-0">
                                                {member.role}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => onToggle(member.id)}
                                                disabled={isLoading}
                                                className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer disabled:cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 flex justify-end gap-4">
                    <Button 
                        onClick={onClose} 
                        variant="outline"
                        disabled={isLoading}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="bg-orange-600 hover:bg-orange-700 text-white hover:text-white px-6 py-2 rounded-lg font-medium cursor-pointer" 
                        onClick={onSave}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </div>
    )
}