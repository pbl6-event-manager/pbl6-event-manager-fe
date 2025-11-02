import type { CategoryModel } from "../models/bean/category-models";

export const mapToCategoryModel = (raw:any) : CategoryModel => ({
    id: raw.id,
    name: raw.name,
    description: raw.description ? raw.description : "",
    isActive: raw.isActive
});