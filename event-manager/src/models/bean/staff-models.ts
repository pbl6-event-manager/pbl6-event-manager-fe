//#region Staff Models
export interface Staff {
  id: string
  email: string
  name?: string
  role: string
  status: "active" | "pending" | "invited"
  joinedAt?: string
}
//#endregion
