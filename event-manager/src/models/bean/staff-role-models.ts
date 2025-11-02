//#region StaffRole Model
export interface StaffRole {
  id: string
  name: string
  description?: string
  permissions: string[]
  isCustom: boolean
}
//#endregion