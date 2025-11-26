import { getMyOrganizers, getOrganizerByIdApi, createANewOrganizerApi, deleteOrganizerApi, updateOrganizerApi } from "../api/organizer-api";
import { mapToOrganizerModel } from "../mappers/organizer-mapper";
import type { OrganizerFormData, OrganizerListItem } from "../models/form-models/organizer-form-models";
import type { ListOrganizerDto } from "../dtos/organizer-dto";
import { convertOrganizerFormDataToFormData, convertOrganizerModelToFormData, convertOrgModelToListOrgDto, convertToOrganizerListItem } from "../converters/organizer-converter";

export const getMyOrganizersService = async () => {
    try {
        const dataResponse = await getMyOrganizers();
        const rawList = dataResponse?.data?.data ?? [];

        const myOrganizers = Array.isArray(rawList)
            ? rawList.map((raw: any) => mapToOrganizerModel(raw)).filter(Boolean)
            : [];

        const listOrganizerDto: ListOrganizerDto[] = myOrganizers.map((org: any) => convertOrgModelToListOrgDto(org));
        const listOrganizerFormData: OrganizerListItem[] = listOrganizerDto
            .map((org: any) => convertToOrganizerListItem(org))
            .filter((item): item is OrganizerListItem => item != null);

        return {
            listOrganizerDto,
            listOrganizerFormData,
        };
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data?.message || "Server error");
        } else {
            throw new Error(error.message || "Unexpected error occurred");
        }
    }
}

export const createOrganizerService = async (organizerData: OrganizerFormData) => {
    try {
        const formData = convertOrganizerFormDataToFormData(organizerData);
        const response = await createANewOrganizerApi(formData);
        const rawOrganizerResponse = response.data.data;
        if (response.data.status && response.data.message === "success") {
            const organizerModel = mapToOrganizerModel(rawOrganizerResponse);
            const organizerDto: ListOrganizerDto = convertOrgModelToListOrgDto(organizerModel);
            const organizerListItem: OrganizerListItem | null = convertToOrganizerListItem(organizerDto);
            return {
                organizerDto,
                organizerListItem,
            };
        } else {
            throw new Error(response.data.message || "Failed to create organizer");
        }
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to create organizer"
        );
    }
}


export const getOrganizerByIdService = async (id: number) => {
    try {
        const response = await getOrganizerByIdApi(id);
        const rawOrganizerResponse = response.data.data;
        if (response.data.status || response.data.message === "success") {
            const organizerModel = mapToOrganizerModel(rawOrganizerResponse);
            const organizerDto: ListOrganizerDto = convertOrgModelToListOrgDto(organizerModel);
            const organizerFormData: OrganizerFormData = convertOrganizerModelToFormData(organizerModel);
            return {
                organizerDto,
                organizerFormData,
            }
        } else {
            throw new Error(response.data.message || "Failed to fetch organizer");
        }
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch organizer"
        );
    }
}

export const updateOrganizerService = async (id: number, organizerData: OrganizerFormData) => {
    try {
        const formData = convertOrganizerFormDataToFormData(organizerData);
        const response = await updateOrganizerApi(id, formData);
        const rawOrganizerResponse = response.data.data;
        
        if (response.data.status && response.data.message === "success") {
            const organizerModel = mapToOrganizerModel(rawOrganizerResponse);
            const organizerDto: ListOrganizerDto = convertOrgModelToListOrgDto(organizerModel);
            const organizerListItem: OrganizerListItem | null = convertToOrganizerListItem(organizerDto);

            return {
                organizerDto,
                organizerListItem,
            };
        } else {
            throw new Error(response.data.message || "Failed to update organizer");
        }
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to update organizer"
        );
    }
}

export const deleteOrganizerService = async (id: number) => {
    try {
        const response = await deleteOrganizerApi(id);
        
        if (response.data.status && response.data.message === "success") {
            return {
                id,
                message: response.data.data.message,
                organizerName: response.data.data.organizerName
            };
        } else {
            throw new Error(response.data.message || "Failed to delete organizer");
        }
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            "Failed to delete organizer"
        );
    }
}