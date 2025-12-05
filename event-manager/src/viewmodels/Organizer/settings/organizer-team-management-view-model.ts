import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
//import type { OwnerStaffModelStaff } from "../../../models/bean/owner-staff-models";
import {
    fetchOwnerStaffs,
    inviteStaffToOwner,
} from "../../../store/actions/staff-action"

export const useOrganizerTeamManagementViewModel = () => {
    const dispatch = useDispatch();
    const { organizerStaffs, isLoading, error } = useSelector((state: RootState) => state.staffReducer);

    const handleFetchOwnerStaff = async () => {
        dispatch<any>(fetchOwnerStaffs());
    }

    const handleInviteStaffToOwner = async ( email: string, roleStaffId: number) => {
        dispatch<any>(inviteStaffToOwner( email, roleStaffId));
    }
    // const handleRemoveStaffOfOwner = async (ownerId: number, listStaffId: number[]) => {
    //     dispatch<any>(removeStaffOfOwner(ownerId, listStaffId));
    // }
    return {
        organizerStaffs,
        isLoading,
        error,
        handleFetchOwnerStaff,
        handleInviteStaffToOwner,
    }
}