"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { useEventTeamManagementViewModel } from "../../../viewmodels/Organizer/events/event-team-management-view-model"
import AssignMemberModal from "../../../components/Organizer/assign-member-modal"


export default function EventTeamManagementPage() {
    const { eventId } = useParams()
    const [searchTerm, setSearchTerm] = useState("")
    const [showAssignModal, setShowAssignModal] = useState(false)

    const viewModel = useEventTeamManagementViewModel()

    // useEffect(() => {
    //     viewModel.handleFetchEventStaffs()
    //     viewModel.handleFetchOrganizerMembers( || "")
    // }, [eventId])

    // const assignedMembers = viewModel.getAssignedMembers()
    // const availableMembers = viewModel.getSortedMembers()

    // const filteredAssignedMembers = assignedMembers.filter(
    //     (staffs) =>
    //         staffs.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         staffs.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    // )

    // const handleAssignMember = (member: any) => {
    //     try {
    //         viewModel.assignMemberToEvent(member)
    //         setShowAssignModal(false)
    //     } catch (err: any) {
    //         console.error("Error assigning member:", err.message)
    //     }
    // }
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
                {/* Assigned Members Summary */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Assigned staffs ({viewModel.eventStaffs.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {/* {filteredAssignedMembers.map((member) => ( */}
                                <div  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-semibold text-xs">
                                        {/* {member.name?.charAt(0) || member.email.charAt(0)} */}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">member.name</p>
                                        <p className="text-xs text-gray-600">member.email</p>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">member.role</span>
                                </div>
                            {/* ))} */}
                        </div>
                    </CardContent>
                </Card>

                {showAssignModal && (
                    <AssignMemberModal
                        availableMembers={[]} //availableMembers
                        onAssign={(member) => {} /*handleAssignMember*/}
                        onClose={() => setShowAssignModal(false)}
                        isLoading={viewModel.isLoading}
                    />
                )}
            </div>
        </div>
    )
}
