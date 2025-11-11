//#region StaffRole Model
export interface RoleStaffModel {
  id: number
  createdAt: Date 
  updatedAt: Date
  name: string
  description: string
  ownerId: number
}
//#endregion