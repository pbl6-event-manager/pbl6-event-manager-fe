import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { Staff } from "../../../models/bean/staff-models";
import {
    fetchOwnerStaffs,
    inviteStaffToOwner,
    removeStaffOfOwner
} from "../../../store/actions/staff-action"

//Mock data - replace with Redux state
const mockMembers: Staff[] = [
    {
        id: 1,
        email: "letonthanhan@gmail.com",
        name: "Lê Tôn Thanh An",
        role: "Owner",
        status: "active",
        joinedAt: "2024-01-15",
    },
    {
        id: 2,
        email: "nguyendacnguyentam@gmail.com",
        name: "Nguyễn Đắc Nguyên Tâm",
        role: "Admin",
        status: "active",
        joinedAt: "2025-01-15",
    },
]

const mockRoles = ["Owner", "Admin", "Editor", "Viewer"];

export const useOrganizerTeamManagementViewModel = () => {
    const dispatch = useDispatch();
    const { organizerStaffs, isLoading, error } = useSelector((state: RootState) => state.staffReducer);

    const handleFetchOwnerStaff = async (id: number) => {
        dispatch<any>(fetchOwnerStaffs(id));
    }

    const handleInviteStaffToOwner = async (ownerId: number, email: string, roleStaffId: number) => {
        dispatch<any>(inviteStaffToOwner(ownerId, email, roleStaffId));
    }
    const handleRemoveStaffOfOwner = async (ownerId: number, listStaffId: number[]) => {
        dispatch<any>(removeStaffOfOwner(ownerId, listStaffId));
    }
    return {
        organizerStaffs,
        isLoading,
        error,
        handleFetchOwnerStaff,
        handleInviteStaffToOwner,
        handleRemoveStaffOfOwner,
    }
}