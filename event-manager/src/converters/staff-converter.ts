import type { StaffDto } from "../dtos/staff-dto"
import type { OwnerStaffListItem } from "../models/form-models/staff-form-models"

export const convertToStaffDto = (model: any) => ({
    id: model.id,
    name: model.name,
    email: model.email,
    status: model.status,
    role: model.role,
})

export const convertToOwnerStaffListItem = (dto: StaffDto): OwnerStaffListItem | null => ({
    id: dto.id,
    name: dto.name,
    email: dto.email,
    role: dto.role,
})