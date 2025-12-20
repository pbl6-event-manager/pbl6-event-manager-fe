"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useRef, useState } from "react"
import type { RootState, AppDispatch } from "../../../store/store"
import type { OrganizerFormData, OrganizerListItem } from "../../../models/form-models/organizer-form-models"
import {
  fetchMyOrganizers,
  fetchOrganizerDetail,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
  fetchOrganizersForPublish,
} from "../../../store/actions/organizer-action"
import { showErrorAlert, showLoadingAlert, closeLoadingAlert, showSuccessAlert, showConfirmAlert } from "../../../helpers/alert-helpers"
import { convertToOrganizerListItem } from "../../../converters/organizer-converter"
import { usePermission } from "../../../hooks/usePermission"

export const useOrganizerViewModel = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { organizers: organizerDtos, organizerForPublish, currentOrganizer, loading, error } = useSelector((state: RootState) => state.organizerReducer)
  const [ organizers, setOrganizers ] = useState<OrganizerListItem[]>([])
  const [ organizersItemForPublish, setOrganizersItemForPublish ] = useState<OrganizerListItem[]>([])
  const [formData, setFormData] = useState<OrganizerFormData>({
    name: "",
    website: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    logoFile: undefined,
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedOrganizer, setSelectedOrganizer] = useState<number | null>(null)

  const {
          isOwner,
          canPublishEvent,
      } = usePermission({ eventId: parseInt(eventId || "0", 10), autoLoad: true });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        showErrorAlert("File size must be less than 10MB")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        showErrorAlert("Please upload an image file (JPEG or PNG)")
        return
      }

      updateFormData("logoFile", file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    updateFormData("logoFile", undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleFetchMyOrganizers = useCallback(async (): Promise<void> => {
    try {
      await dispatch<any>(fetchMyOrganizers())
    } catch (err) {
      showErrorAlert("Failed to load organizers", "Please try again later.")
    }
  }, [dispatch])

  const handleFetchOrganizersForPublish = useCallback(async (eventId: number): Promise<void> => {
    try {
      await dispatch<any>(fetchOrganizersForPublish(eventId))
    } catch (err) {
      showErrorAlert("Failed to load organizers for publish", "Please try again later.")
    }
  }, [dispatch])

  useEffect(() => {
    handleFetchMyOrganizers()
  }, [handleFetchMyOrganizers])

  useEffect(() => {
  // Chỉ fetch nếu có quyền publish hoặc là owner
  if (isOwner || canPublishEvent) {
    handleFetchOrganizersForPublish(Number(eventId))
  }
}, [handleFetchOrganizersForPublish, eventId, isOwner, canPublishEvent])

  useEffect(() => {
    // Map organizer DTOs to List Organizer Items
    const listItems = organizerDtos.map(convertToOrganizerListItem)
    setOrganizers(listItems.filter((item): item is OrganizerListItem => item !== null))
  }, [organizerDtos])

  useEffect(() => {
    // Map organizer DTOs to List Organizer Items for publish
    const listItems = organizerForPublish.map(convertToOrganizerListItem)
    setOrganizersItemForPublish(listItems.filter((item): item is OrganizerListItem => item !== null))
  }, [organizerForPublish])

  // Load organizer detail
  const loadOrganizerDetail = useCallback(
    (organizerId: number) => {
      dispatch(fetchOrganizerDetail(organizerId, false))
    },
    [dispatch],
  )

  // Update form data
  const updateFormData = useCallback((field: keyof OrganizerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation error for this field
    setValidationErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  // Validate form
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Organizer name is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  // Create new organizer
  const handleCreateOrganizer = useCallback(async () => {
    if (!validateForm()) {
      showErrorAlert("Validation Error", "Please fix the validation errors before submitting.")
    }
    try {
      showLoadingAlert("Creating organizer...")
      await dispatch<any>(createOrganizer(formData))
      showSuccessAlert("Organizer Created", "The organizer profile has been created successfully.")
      closeLoadingAlert()
      navigate("/organizer/settings?tab=organizer-profile")
    } catch (error: any) {
      showErrorAlert("Failed to create organizer", error.message || "Please try again later.")
    }
  }, [dispatch, formData, navigate, validateForm])

  // Update existing organizer
  const handleUpdateOrganizer = useCallback(
    async (organizerId: number,) => {
      if (!organizerId) {
        showErrorAlert("Invalid Organizer", "Organizer ID is missing.")
        return false
      }
      if (!validateForm()) {
        showErrorAlert("Validation Error", "Please fix the validation errors before submitting.")
      }

      try {
        showLoadingAlert("Updating organizer...");
        await dispatch<any>(updateOrganizer(organizerId, formData));
        closeLoadingAlert();
        showSuccessAlert("Organizer Updated", "The organizer profile has been updated successfully.");
        navigate("/organizer/settings");
        return true
      } catch (error: any) {
        showErrorAlert("Failed to update organizer", error.message || "Please try again later.")
        console.error("[v0] Failed to update organizer:", error)
        return false
      }
    },
    [dispatch, formData, navigate, validateForm],
  )

  // Delete organizer
  const handleDeleteOrganizer = useCallback(
    async (organizerId: number) => {
      try {
        const confirmed = await showConfirmAlert(
          "Delete Organizer?",
          "Are you sure you want to delete this organizer? This action cannot be undone.",
        )
        if (confirmed) {
          showLoadingAlert("Deleting organizer...")
          const result = await dispatch<any>(deleteOrganizer(organizerId))
          closeLoadingAlert()
          showSuccessAlert(`Organizer Deleted`, `Organizer "${result.organizerName}" has been deleted successfully.`)
          await handleFetchMyOrganizers();
        }
      } catch (error) {
        console.error("[v0] Failed to delete organizer:", error)
        closeLoadingAlert();
        showErrorAlert("Failed to delete organizer", "Please try again later.")
      }
    },
    [dispatch],
  )


  // Navigate to add organizer page
  const navigateToAddOrganizer = useCallback(() => {
    navigate("/organizer/settings/add")
  }, [navigate])

  // Navigate to edit organizer page
  const navigateToEditOrganizer = useCallback(
    (organizerId: number) => {
      navigate(`/organizer/settings/edit/${organizerId}`)
    },
    [navigate],
  )

  // Navigate to view organizer page (public)
  const navigateToViewOrganizer = useCallback((organizerId: string) => {
    window.open(`/attendee/view-o/${organizerId}`, "_blank")
  }, [])

  const handleSubmit = async () => {

  }

  const handleBackClick = async () => {
    const confirmed = await showConfirmAlert(
      "Discard Changes?",
      "Are you sure you want to go back? Unsaved changes will be lost.",
    )
    if (confirmed) {
      navigate("/organizer/settings")
    }
  }

  const loadOrganizerForEdit = useCallback(
    async (organizerId: number) => {
      try {
        showLoadingAlert("Loading organizer data...")
        const organizerFormData = await dispatch<any>(fetchOrganizerDetail(organizerId, false))
        closeLoadingAlert()

        if (organizerFormData) {
          // Set form data from organizer
          setFormData(organizerFormData)

          // Set image preview if logoUrl exists
          if (organizerFormData.logoUrl) {
            setImagePreview(organizerFormData.logoUrl)
          }
        }
      } catch (error) {
        closeLoadingAlert()
        showErrorAlert("Failed to load organizer", "Please try again later.")
      }
    },
    [dispatch],
  )

  return {
    // State
    imagePreview,
    organizers,
    organizersItemForPublish,
    currentOrganizer,
    loading,
    error,
    formData,
    validationErrors,
    fileInputRef,
    selectedOrganizer,

    // Actions
    setSelectedOrganizer,
    handleImageUpload,
    handleRemoveImage,
    handleFetchMyOrganizers,
    loadOrganizerDetail,
    loadOrganizerForEdit,
    updateFormData,
    handleCreateOrganizer,
    handleUpdateOrganizer,
    handleDeleteOrganizer,
    navigateToAddOrganizer,
    navigateToEditOrganizer,
    navigateToViewOrganizer,
    handleSubmit,
    handleBackClick,
  }
}
