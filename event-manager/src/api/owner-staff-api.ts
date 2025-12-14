import apiClient from "./api-config"

export const assignAndUpdateStaffToOwner = (staffEmail: string, roleStaffId: number) => apiClient.post("owner-user-rolestaff/assignment", 
    { staffEmail, roleStaffId }
)

export const getStaffGroupedByRole = () => apiClient.get("owner-user-rolestaff/staffs-grouped-by-role")

export const deleteOwnerStaffByEmail = (staffEmail: string) => apiClient.delete("owner-user-rolestaff/assignment", { data: { staffEmail } })

export const getEventAssignmentApi = (eventId: number) => apiClient.get(`owner-user-rolestaff/event-assignment/${eventId}`)