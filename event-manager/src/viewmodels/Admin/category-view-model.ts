import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store/store";
import { addCategory, deleleCategory, getCategories } from "../../store/actions/Admin/category-action";
import { useEffect } from "react";
import { CATEGORY_FORM_DEFAULT, type Category } from "../../models/Admin/category-models";

export const useCategoryViewModel = (initialData?: Category) => {
  const dispatch = useDispatch();
  const {categories, activeCategories, inActiveCategories} = useSelector((state: RootState) => state.category);
  const [newCategory, setNewCategory] = useState(CATEGORY_FORM_DEFAULT);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [category, setCategory] = useState<Category>(CATEGORY_FORM_DEFAULT);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "deleted">("active");
  useEffect(() => {
    dispatch<any>(getCategories());
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


  const handleChange = (field: keyof Category, value: string) => {
    setCategory((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleAddCategory = () => {
    if (!newCategory.name) return;
    const _newCategory = {
        id: Date.now(),
        name: newCategory.name,
        description: newCategory.description
    }
    dispatch(addCategory(_newCategory));
    setNewCategory(CATEGORY_FORM_DEFAULT);
    setIsAdding(false);
  };

  

  const handleDeleteCategory = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch<any>(deleleCategory(deleteId));
      setDeleteId(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleEditCategory = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setIsEditing(true);
    }
  };


  const handleUpdateCategory = (updated: Category) => {
    // setCategories((prev) =>
    //   prev.map((c) => (c.id === updated.id ? updated : c))
    // );
    setIsEditing(false);
    setSelectedCategory(null);
  };
  return { 
    categories,
    isAdding,
    isEditing,
    selectedCategory,
    openDeleteDialog,
    categoryColumns,
    activeTab,
    activeCategories,
    inActiveCategories,
    setActiveTab,
    setOpenDeleteDialog,
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    confirmDelete,
    setIsAdding,
    setIsEditing,
    handleChange,
    category, 
    setCategory
  };
};
