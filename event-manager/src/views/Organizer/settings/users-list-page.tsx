import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import InviteUserModal from "../../../components/Organizer/invite-user-model";
import { useOrganizerTeamManagementViewModel } from "../../../viewmodels/Organizer/settings/organizer-team-management-view-model";

export default function UsersListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<string | null>(null);
    const { members, isLoading, error, fetchTeamMembers, removeTeamMember } = useOrganizerTeamManagementViewModel();

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const filteredMembers = members.filter(
        (member) =>
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleMenuClick = (memberId: string) => {
        setSelectedMember(selectedMember === memberId ? null : memberId)
    }
    const handleRemoveMember = async (memberId: string) => {
        await removeTeamMember(memberId)
        setSelectedMember(null)
    }

    // Check if there are any members besides the owner
    const hasTeamMembers = members.length > 1;
    if (isLoading) {
        return <div className="flex items-center justify-center py-8">Loading...</div>
    }
    if (!hasTeamMembers) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 text-center">
                    <h3 className="mb-2 text-3xl font-bold text-gray-900">Build you team</h3>
                    <p className="text-gray-600">
                        <span className="text-blue-600 hover:underline" >Create new custom roles </span>
                        and assign them to team members, or invite users into an all access role.
                    </p>
                </div>
                <Button
                    onClick={() => setShowInviteModal(true)}
                    className="mt-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
                >
                    Invite Users
                </Button>
                {showInviteModal && <InviteUserModal onClose={() => setShowInviteModal(false)} />}
            </div>
        )
    }

    return (
        <div>
            {/* Search bar  */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <Input
                    type="text"
                    placeholder="Enter text to search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                >
                </Input>
                <Button
                    onClick={() => setShowInviteModal(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                    Invite users
                </Button>
                {showInviteModal && <InviteUserModal onClose={() => setShowInviteModal(false)} />}
            </div>
            {/* Error message */}
            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

            {/* Members Table */}
            <div over-flow-x-auto>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map((member) => (
                            <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                                            {member.name?.charAt(0) || member.email.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{member.name || member.email}</p>
                                            {member.name && <p className="text-sm text-gray-600">{member.email}</p>}
                                            {member.status === "pending" && <p className="text-sm text-gray-500">Sending invitation</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-700">{member.role}</td>
                                <td className="px-4 py-4 text-right relative">
                                    <button
                                        onClick={() => handleMenuClick(member.id)}
                                        className="rounded p-2 hover:bg-gray-100"
                                    >
                                        <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>

                                    {selectedMember === member.id && (
                                        <div className="absolute right-0 top-[70%] z-50 mt-0 w-40 rounded-lg border border-gray-200 bg-white shadow-lg transition-transform duration-150 ease-out">
                                            <button
                                                onClick={() => {/* Handle Edit Action */ }}
                                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}