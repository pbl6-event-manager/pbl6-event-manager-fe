import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../../../store/store"
import { getActiveCategories } from "../../../store/actions/category-action";
import { showErrorAlert } from "../../../helpers/alert-helpers"
import type { CategoryListItem } from "../../../models/form-models/category-form-models";
import { convertListCategoryDtoToCatergoryListItem } from "../../../converters/category-converter";

export const useCategoryViewModel = (selectedCategoryIds: number[], onCategoryChange?: (categoryIds: number[]) => void) => {
    const dispatch = useDispatch<AppDispatch>();
    const { activeCategories, loading, error } = useSelector((state: RootState) => state.categoryReducer);
    const [categories, setCategories] = useState<CategoryListItem[]>([]);
    const [hasFetched, setHasFetched] = useState(false)

    const handleFetchActiveCategories = useCallback(async () => {
        if (hasFetched) return;
        try {
            await dispatch(getActiveCategories());
            setHasFetched(true);
        } catch (error: any) {
            showErrorAlert(error.response?.data?.message || error.message || "Failed to fetch active categories");
        }
    }, [dispatch]);

    const handleCategoryToggle = (categoryId: number) => {
        const updatedIds = selectedCategoryIds.includes(categoryId)
            ? selectedCategoryIds.filter((id) => id !== categoryId)
            : [...selectedCategoryIds, categoryId]

        onCategoryChange?.(updatedIds)
    }

    useEffect(() => {
        if (activeCategories.length === 0) {
            handleFetchActiveCategories()
        }
    }, [])

    useEffect(() => {
        if (activeCategories.length > 0) {
            setCategories(activeCategories.map(convertListCategoryDtoToCatergoryListItem))
        }
    }, [activeCategories])

    return {
        categories,
        loading,
        error,
        handleFetchActiveCategories,
        handleCategoryToggle
    };
}