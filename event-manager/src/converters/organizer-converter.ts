import type { CreateOrganizerDto, ListOrganizerDto } from "../dtos/organizer-dto";
import type { OrganizerModel } from "../models/bean/organizer-models";
import type { OrganizerFormData, OrganizerListItem } from "../models/form-models/organizer-form-models";

export const convertOrgModelToListOrgDto = (org: OrganizerModel): ListOrganizerDto => ({
    id: org.id,
    logoUrl: org.logoUrl,
    name: org.name,
    pageUrl: org.website || "",
    isActive: org.isActive
})

export const convertToOrganizerListItem = (dto: ListOrganizerDto): OrganizerListItem | null => {
    try {
        if (!dto || typeof dto !== "object") return null;

        // Only include active organizers (adjust logic if you want all)
        if (dto.isActive !== true) return null;

        return {
            id: dto.id,
            name: dto.name ?? "",
            logoUrl: dto.logoUrl
        };
    } catch (error) {
        console.error("[v0] Failed to convert organizer DTO:", error);
        return null;
    }
}

export const convertOrganizerFormDataToFormData = (organizerData: OrganizerFormData): FormData => {
    const formData = new FormData();
    formData.append("name", organizerData.name);
    if (organizerData.website) formData.append("website", organizerData.website);
    if (organizerData.description) formData.append("description", organizerData.description);
    if (organizerData.contactEmail) formData.append("contactEmail", organizerData.contactEmail);
    if (organizerData.contactPhone) formData.append("contactPhone", organizerData.contactPhone);

    // Handle logo file
    if (organizerData.logoFile instanceof File) {
        formData.append("logoFile", organizerData.logoFile);
    }
    return formData;
}

export const convertOrganizerModelToFormData = (organizer: OrganizerModel): OrganizerFormData => {
    return {
        name: organizer.name,
        website: organizer.website || "",
        description: organizer.description || "",
        contactEmail: organizer.contactEmail || "",
        contactPhone: organizer.contactPhone || "",
        logoFile: undefined, // File cannot be set from URL, handle separately if needed
        logoUrl: organizer.logoUrl || ""
    };
}