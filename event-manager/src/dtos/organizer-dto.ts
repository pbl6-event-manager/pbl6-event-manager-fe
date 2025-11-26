//#region Organizer Dtos
export interface ListOrganizerDto {
    id: number
    logoUrl?: string
    name: string
    pageUrl: string
    isActive: boolean
};

export interface CreateOrganizerDto {
    logoFile?: File
    name: string
    description?: string
    contactEmail?: string
    contactPhone?: string
    website?: string
}
//#endregion