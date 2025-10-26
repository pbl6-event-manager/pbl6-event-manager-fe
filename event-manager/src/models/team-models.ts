export interface TeamMember {
  id: string
  email: string
  name?: string
  role: string
  status: "active" | "pending" | "invited"
  joinedAt?: string
}

export interface TeamRole {
  id: string
  name: string
  description?: string
  permissions: string[]
  isCustom: boolean
}

export interface InviteUserRequest {
  email: string
  role: string
  limitedEventAccess?: boolean
}

export interface TeamManagementState {
  members: TeamMember[]
  roles: TeamRole[]
  loading: boolean
  error: string | null
}
