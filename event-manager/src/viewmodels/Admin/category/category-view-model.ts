import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../../store/store";
import { addCategory, deleleCategory, getCategories, recoverCategory, updateCategory } from "../../../store/actions/category-action";
import { useEffect } from "react";
import type { CategoryModel } from "../../../models/bean/category-models";
import { CATEGORY_FORM_DEFAULT } from "../../../models/form-models/category-form-models";
import { showSuccessAlert, showWarningAlert, showErrorAlert, showLoadingAlert, closeLoadingAlert } from "../../../helpers/alert-helpers";

export const useCategoryViewModel = (initialData?: CategoryModel) => {
  const dispatch = useDispatch();
  const {categories, activeCategories, inActiveCategories} = useSelector((state: RootState) => state.categoryReducer);
  const [newCategory, setNewCategory] = useState(CATEGORY_FORM_DEFAULT);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRecoverDialog, setOpenRecoverDialog] = useState(false);
  const [category, setCategory] = useState(CATEGORY_FORM_DEFAULT);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [recoverId, setRecoverId] = useState<number | null>(null);
  const [updateId, setUpdateId] = useState(null);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  useEffect(() => {
    const getAllCategories = async () => {
      showLoadingAlert();
      await dispatch<any>(getCategories());
      closeLoadingAlert();
    }

    getAllCategories();
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setCategory(initialData);
    }
  }, [initialData]);

  const categoryColumns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Name", accessor: "name", type: "text" as const },
    { header: "Description", accessor: "description", type: "text" as const },
    { header: "Action", accessor: "actions", type: "action" as const },
  ];


  const handleAddChange = (field: keyof CategoryModel, value: string) => {
    setNewCategory((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateChange = (field: keyof CategoryModel, value: string) => {
    setCategory((prev) => ({ ...prev, [field]: value}));
  }

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      showWarningAlert("Category name is required");
      return;
    }

    const _newCategory = {
        name: newCategory.name,
        description: newCategory.description
    }

    try {
      await dispatch<any>(addCategory(_newCategory));
      showSuccessAlert("Category added successfully!");
      setNewCategory(CATEGORY_FORM_DEFAULT);
      setIsAdding(false);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to add category");
    }
  };

  

  const handleDeleteCategory = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleRecoverCategory = (id: number) => {
   setRecoverId(id);
   setOpenRecoverDialog(true); 
  }

  const confirmDelete = async () => {
    if (deleteId === null) {
      showErrorAlert("Failed to delete category");
      return;
    }

    try {
      await dispatch<any>(deleleCategory(deleteId));
      showSuccessAlert("Deleted category successfully");
      setDeleteId(null);
      setOpenDeleteDialog(false);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to delete category");
    }
  };

  const confirmRecover = async () => {
    if (recoverId === null) {
      showErrorAlert("Failed to recover category");
      return;
    }
    try {
      await dispatch<any>(recoverCategory(recoverId));
      showSuccessAlert("Recovered category successfully");
      setOpenRecoverDialog(false);
      setRecoverId(null);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to recover category");
    }
  }

  const handleEditCategory = (categoryId: any) => {
    setUpdateId(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      const updateCategory = {
        name: category.name,
        description: category.description
      }
      setCategory(updateCategory);
      setIsEditing(true);
    }
  };

  const handleUpdateCategory = async (id?: any) => {
    if(!category.name) {
      showWarningAlert("Category name is required");
      return;
    }

    try {
      await dispatch<any>(updateCategory(id, category));
      showSuccessAlert("Updated category successfully");
      setUpdateId(null);
      setIsEditing(false);
    } catch (error: any) {
      showErrorAlert(error?.message || "Failed to update category"); 
    }
  }

  return { 
    categories,
    isAdding,
    isEditing,
    openDeleteDialog,
    openRecoverDialog,
    categoryColumns,
    activeTab,
    activeCategories,
    inActiveCategories,
    newCategory,
    updateId,
    setOpenRecoverDialog,
    handleRecoverCategory,
    confirmRecover,
    setActiveTab,
    setOpenDeleteDialog,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleEditCategory,
    confirmDelete,
    setIsAdding,
    setIsEditing,
    handleAddChange,
    handleUpdateChange,
    category, 
    setCategory
  };
};
