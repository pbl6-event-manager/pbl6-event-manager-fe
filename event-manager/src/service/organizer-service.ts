import { getMyOrganizers, getOrganizerByIdApi } from "../api/organizer-api";
import { mapToOrganizerModel } from "../mappers/organizer-mapper";
import type { OrganizerListItem } from "../models/form-models/organizer-form-models";
import type { ListOrganizerDto } from "../dtos/organizer-dto";
import { convertOrgModelToListOrgDto } from "../converters/organizer-converter";

export const getMyOrganizersService = async (): Promise<OrganizerListItem[]> => {
    try {
        const dataResponse = await getMyOrganizers();
        const rawList = dataResponse?.data?.data ?? [];

        // Map raw data to OrganizerModel (guard nulls)
        const myOrganizers = Array.isArray(rawList)
            ? rawList.map((raw: any) => mapToOrganizerModel(raw)).filter(Boolean)
            : [];

        // Convert to DTOs and then to form data, filter out nulls
        const listOrganizerDto: ListOrganizerDto[] = myOrganizers.map((org: any) => convertOrgModelToListOrgDto(org));
        const listOrganizerFormData: OrganizerListItem[] = listOrganizerDto
            .map((org: any) => convertToListOrganizerFormData(org))
            .filter((item): item is OrganizerListItem => item != null);

        return listOrganizerFormData;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

const convertToListOrganizerFormData = (dto: any): OrganizerListItem | null => {
    try {
        if (!dto || typeof dto !== "object") return null;

        // Only include active organizers (adjust logic if you want all)
        if (dto.isActive !== true) return null;

        return {
            id: dto.id,
            name: dto.name ?? "",
            logoUrl: dto.logoUrl ?? "",
        };
    } catch (error) {
        console.error("[v0] Failed to convert organizer DTO:", error);
        return null;
    }
}

export const getOrganizerByIdService = async (id: number) => {
    try {
        const response = await getOrganizerByIdApi(id);
        const organizer = mapToOrganizerModel(response.data.data);
        
        return organizer;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}