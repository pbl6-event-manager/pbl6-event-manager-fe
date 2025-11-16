import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import InviteUserModal from "../../../components/Organizer/invite-user-modal";
import { useStaffViewModel } from "../../../viewmodels/Organizer/settings/staff-view-model";

export default function StaffsListPage() {    
    const {
        email, 
        setEmail,
        selectedRole,
        setSelectedRole,
        organizerStaffs, 
        isLoading, 
        error, 
        searchTerm,
        showInviteModal,
        setShowInviteModal,
        setSearchTerm,
        handleRemoveStaffOfOwner, 
        handleInviteStaffToOwner,
    } = useStaffViewModel();
    
    if (isLoading) {
        return <div className="flex items-center justify-center py-8">Loading...</div>
    }
    if (organizerStaffs.length === 0) {
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
                {showInviteModal && (<InviteUserModal 
                    onClose={() => setShowInviteModal(false)}
                    email={email}
                    setEmail={setEmail}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    handleInviteStaffToOwner={handleInviteStaffToOwner}
                />) }
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
                {showInviteModal && (<InviteUserModal 
                    onClose={() => setShowInviteModal(false)}
                    email={email}
                    setEmail={setEmail}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    handleInviteStaffToOwner={handleInviteStaffToOwner}
                />)}
            </div>
            {/* Error message */}
            {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

            {/* Members Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizerStaffs.map((member) => (
                            <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                                            {member.name?.charAt(0) || member.email.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{member.name || member.email}</p>
                                            {member.name && <p className="text-sm text-gray-600">{member.email}</p>}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-700">{member.role}</td>
                                <td className="px-4 py-4 text-right relative">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-gray-600"
                                            >
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40">
                                            <DropdownMenuItem
                                                //onClick={() => handleNavigateToUpdateRole(role.id)}
                                            >
                                                <Pencil className="h-4 w-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() => handleRemoveStaffOfOwner(member.email)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}