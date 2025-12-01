import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import AssignMemberModal from "../../../components/Organizer/assign-member-modal"
import { useEventTeamManagementViewModel } from "../../../viewmodels/Organizer/events/event-team-management-view-model"

export default function EventTeamManagementPage() {
    const [showAssignModal, setShowAssignModal] = useState(false);

    const {
        searchTerm,
        setSearchTerm,
        organizerStaffs,
        eventStaffs,
        selectedStaffIds,
        isLoading,
        error,
        isStaffAssigned,
        handleToggleStaff,
        handleSyncStaffs,
    } = useEventTeamManagementViewModel();

    const handleSaveAssignments = async () => {
        await handleSyncStaffs();
        setShowAssignModal(false);
    };

    return (
        <div className="flex-1 bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Staff Management</h1>
                    <p className="text-gray-600">Manage staffs assigned to this event</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6 flex items-center justify-between gap-4">
                    <Input
                        type="text"
                        placeholder="Search staffs by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Button
                        onClick={() => setShowAssignModal(true)}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer"
                    >
                        Assign staffs
                    </Button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {/* Assigned Members Summary */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Assigned staffs ({eventStaffs.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                            </div>
                        ) : eventStaffs.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No staffs assigned to this event yet
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {eventStaffs.map((staff) => (
                                    <div 
                                        key={staff.id} 
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-semibold text-xs">
                                            {staff.name?.charAt(0) || staff.email.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{staff.name}</p>
                                            <p className="text-xs text-gray-600">{staff.email}</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                                            {staff.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {showAssignModal && (
                    <AssignMemberModal
                        availableMembers={organizerStaffs}
                        selectedStaffIds={selectedStaffIds}
                        onToggle={handleToggleStaff}
                        onSave={handleSaveAssignments}
                        onClose={() => setShowAssignModal(false)}
                        isLoading={isLoading}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                )}
            </div>
        </div>
    )
}