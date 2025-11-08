import type { ListOrganizerDto } from "../dtos/organizer-dto";
import type { OrganizerModel } from "../models/bean/organizer-models";

export const convertOrgModelToListOrgDto = (org: OrganizerModel) : ListOrganizerDto => ({
    id: org.id,
    name: org.name,
    pageUrl: org.website || "",
    isActive: org.isActive
})