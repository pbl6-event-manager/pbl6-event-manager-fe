//#region Staff Models
export interface Staff {
  id: number
  email: string
  name?: string
  role: string
  status: "active" | "pending" | "invited"
  joinedAt?: string
}
//#endregion
