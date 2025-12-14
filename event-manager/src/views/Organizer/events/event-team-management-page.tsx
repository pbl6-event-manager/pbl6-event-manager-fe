import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import AssignMemberModal from "../../../components/Organizer/assign-member-modal"
import { useEventTeamManagementViewModel } from "../../../viewmodels/Organizer/events/event-team-management-view-model"
import { Lock } from "lucide-react"

export default function EventTeamManagementPage({ isOwner, canAssignStaffs }: { isOwner: boolean, canAssignStaffs: boolean }) {
    const {
        searchTerm,
        setSearchTerm,
        showAssignModal,
        setShowAssignModal,
        organizerStaffs,
        eventStaffs,
        selectedStaffIds,
        isLoading,
        error,
        isCurrentUser,
        handleToggleStaff,
        handleSaveAssignments,
        handleShowAssignModalWithPermission,
    } = useEventTeamManagementViewModel();

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
                    {(!isOwner || !canAssignStaffs) ? (
                        <Button
                            onClick={() => handleShowAssignModalWithPermission(isOwner, canAssignStaffs)}
                            className="bg-gray-400 hover:bg-gray-400 text-gray-200 cursor-not-allowed"
                        >
                            <Lock className="h-3.5 w-3.5 mr-1.5" />
                            Assign staffs
                        </Button>
                    ) : (
                        <Button
                            onClick={() => handleShowAssignModalWithPermission(isOwner, canAssignStaffs)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer"
                        >
                            Assign staffs
                        </Button>
                    )}
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
                                {eventStaffs.map((staff) => {
                                    const isCurrent = isCurrentUser(staff.email);

                                    return (
                                        <div
                                            key={staff.id}
                                            className={`flex items-center gap-3 p-3 rounded-lg ${isCurrent
                                                ? 'bg-orange-50 border border-orange-200'
                                                : 'bg-gray-50'
                                                }`}
                                        >
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white font-semibold text-xs ${isCurrent ? 'bg-orange-600' : 'bg-green-600'
                                                }`}>
                                                {staff.name?.charAt(0) || staff.email.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-gray-900">{staff.name}</p>
                                                    {isCurrent && (
                                                        <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                                                            Me
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-600">{staff.email}</p>
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                                                {staff.role}
                                            </span>
                                        </div>
                                    );
                                })}
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