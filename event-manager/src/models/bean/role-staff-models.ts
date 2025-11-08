//#region StaffRole Model
export interface RolStaffModel {
  id: number
  createdAt: Date 
  updatedAt: Date
  name: string
  description?: string
  ownerId: number
}
//#endregion