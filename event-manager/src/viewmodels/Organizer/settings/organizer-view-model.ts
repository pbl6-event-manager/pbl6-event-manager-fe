"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import type { RootState, AppDispatch } from "../../../store/store"
import type { OrganizerFormData } from "../../../models/form-models/organizer-form-models"
import {
  fetchMyOrganizers,
  fetchOrganizerDetail,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
} from "../../../store/actions/organizer-action"

export const useOrganizerViewModel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { organizers, currentOrganizer, loading, error } = useSelector((state: RootState) => state.organizerReducer)

  const [formData, setFormData] = useState<OrganizerFormData>({
    id: 0,
    name: "",
    website: "",
    bio: "",
    description: "",
    facebookId: "",
    twitter: "",
    emailOptIn: false,
    profileImage: "",
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const handleFetchMyOrganizers = useCallback(async (): Promise<void> => {
    try {
      // dispatch thunk and wait for it to finish; do not assume it returns data
      await dispatch(fetchMyOrganizers() as any)
    } catch (err) {
      console.error("[v0] Failed to fetch organizers:", err)
    }
  }, [dispatch])

  // Load organizers
  const loadOrganizers = useCallback(() => {
    dispatch(fetchMyOrganizers())
  }, [dispatch])

  // Load organizer detail
  const loadOrganizerDetail = useCallback(
    (organizerId: number) => {
      dispatch(fetchOrganizerDetail(organizerId))
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

  }, [dispatch, formData, navigate, validateForm])

  // Update existing organizer
  const handleUpdateOrganizer = useCallback(
    async (organizerId: number, ) => {
      if (!validateForm()) {
        return false
      }

      try {
        await dispatch(updateOrganizer(organizerId, formData))
        navigate("/organizer/info")
        return true
      } catch (error) {
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
        await dispatch(deleteOrganizer(organizerId))
        return true
      } catch (error) {
        console.error("[v0] Failed to delete organizer:", error)
        return false
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

  // Load organizer data for editing
  // useEffect(() => {
  //   if (currentOrganizer) {
  //     setFormData({
  //       id: currentOrganizer.id,
  //       name: currentOrganizer.name,
  //       website: currentOrganizer.website || "",
  //       bio: currentOrganizer.bio || "",
  //       description: currentOrganizer.description || "",
  //       facebookId: currentOrganizer.facebookId || "",
  //       twitter: currentOrganizer.twitter || "",
  //       emailOptIn: currentOrganizer.emailOptIn,
  //       profileImage: currentOrganizer.profileImage || "",
  //     })
  //   }
  // }, [currentOrganizer])

  // const loadOrganizerForEdit = useCallback(
  //   (organizerId: number) => {
  //     const organizer = organizers.find((o) => o.id === organizerId)
  //     if (organizer) {
  //       setFormData({
  //         id: organizer.id,
  //         name: organizer.name,
  //         website: organizer.website || "",
  //         bio: organizer.bio || "",
  //         description: organizer.description || "",
  //         facebookId: organizer.facebookId || "",
  //         twitter: organizer.twitter || "",
  //         emailOptIn: organizer.emailOptIn,
  //         profileImage: organizer.profileImage || "",
  //       })
  //     }
  //   },
  //   [organizers],
  // )

  const loadOrganizerForEdit = (organizerId: number) => {
    
  }
  return {
    // State
    organizers,
    currentOrganizer,
    loading,
    error,
    formData,
    validationErrors,

    // Actions
    handleFetchMyOrganizers,
    loadOrganizers,
    loadOrganizerDetail,
    loadOrganizerForEdit,
    updateFormData,
    handleCreateOrganizer,
    handleUpdateOrganizer,
    handleDeleteOrganizer,
    navigateToAddOrganizer,
    navigateToEditOrganizer,
    navigateToViewOrganizer,
  }
}
