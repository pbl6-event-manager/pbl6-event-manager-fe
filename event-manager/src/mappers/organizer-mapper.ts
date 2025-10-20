import type { OrganizerModel } from "../models/organizer-models";

export const mapToOrganizerModel = (raw: any) : OrganizerModel => ({
    id: raw.id,
    name: raw.name,
    description: raw.description ?? null,
    contactEmail: raw.contactEmail ?? null,
    contactPhone: raw.contactPhone ?? null,
    website: raw.website ?? null,
    logoUrl: raw.website ?? null,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    isActive: raw.isActive ?? false,
    ownerId: raw.ownerId
})