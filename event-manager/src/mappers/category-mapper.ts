import type { CategoryModel } from "../models/Admin/category-models";

export const mapToCategoryModel = (raw:any) : CategoryModel => ({
    id: raw.id,
    name: raw.name,
    description: raw.description,
    isActive: raw.isActive
})