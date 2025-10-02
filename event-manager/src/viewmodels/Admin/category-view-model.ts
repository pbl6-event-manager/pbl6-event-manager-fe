import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store/store";
import { addCategory, getCategories } from "../../store/actions/Admin/category-action";
import { useEffect } from "react";
import { CATEGORY_FORM_DEFAULT } from "../../models/Admin/category-models";

export const useCategoryViewModel = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);
  const [newCategory, setNewCategory] = useState(CATEGORY_FORM_DEFAULT);
  const [isAdding, setIsAdding] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    const category = {
        id: Date.now(),
        name: newCategory.name,
        description: newCategory.description
    }
    dispatch(addCategory(category));
    setNewCategory(CATEGORY_FORM_DEFAULT);
    setIsAdding(false);
  };

  const handleDeleteCategory = (id: number) => {
    // setCategories(categories.filter((c) => c.id !== id));
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
  }

  const handleUpdateCategory = (id: number) => {

  }
  return { categories, openDeleteDialog, setOpenDeleteDialog, handleAddCategory, handleDeleteCategory, handleUpdateCategory, setIsAdding, setNewCategory, isAdding, newCategory, confirmDelete };
};
