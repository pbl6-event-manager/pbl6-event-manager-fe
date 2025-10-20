import type { ListOrganizerDto } from "../dtos/organizer-dto";
import type { OrganizerModel } from "../models/organizer-models";

export const convertOrgModelToListOrgDto = (org: OrganizerModel) : ListOrganizerDto => ({
    id: org.id,
    name: org.name,
    isActive: org.isActive
})