import type { RoleStaffModel } from "./role-staff-models";
import type { UserModel } from "./user-models";

export interface EventStaffModelAdmin {
    user: UserModel
    roleStaff: RoleStaffModel
}