"use client"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import type { RootState, AppDispatch } from "../../store/store"
import type { OrganizerFormData } from "../../models/organizer-models"
import {
  fetchOrganizers,
  fetchOrganizerDetail,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
  followOrganizer,
} from "../../store/actions/Organizer/organizer-action"

export const useOrganizerViewModel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { organizers, currentOrganizer, loading, error } = useSelector((state: RootState) => state.organizer)

  const [formData, setFormData] = useState<OrganizerFormData>({
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

  // Load organizers
  const loadOrganizers = useCallback(() => {
    dispatch(fetchOrganizers())
  }, [dispatch])

  // Load organizer detail
  const loadOrganizerDetail = useCallback(
    (organizerId: string) => {
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
    if (!validateForm()) {
      return false
    }

    try {
      await dispatch(createOrganizer(formData))
      navigate("/organizer/info")
      return true
    } catch (error) {
      console.error("[v0] Failed to create organizer:", error)
      return false
    }
  }, [dispatch, formData, navigate, validateForm])

  // Update existing organizer
  const handleUpdateOrganizer = useCallback(
    async (organizerId: string) => {
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
    async (organizerId: string) => {
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

  // Follow organizer
  const handleFollowOrganizer = useCallback(
    async (organizerId: string) => {
      try {
        await dispatch(followOrganizer(organizerId))
        return true
      } catch (error) {
        console.error("[v0] Failed to follow organizer:", error)
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
    (organizerId: string) => {
      navigate(`/organizer/settings/edit/${organizerId}`)
    },
    [navigate],
  )

  // Navigate to view organizer page (public)
  const navigateToViewOrganizer = useCallback((organizerId: string) => {
    window.open(`/attendee/view-o/${organizerId}`, "_blank")
  }, [])

  // Load organizer data for editing
  useEffect(() => {
    if (currentOrganizer) {
      setFormData({
        name: currentOrganizer.name,
        website: currentOrganizer.website || "",
        bio: currentOrganizer.bio || "",
        description: currentOrganizer.description || "",
        facebookId: currentOrganizer.facebookId || "",
        twitter: currentOrganizer.twitter || "",
        emailOptIn: currentOrganizer.emailOptIn,
        profileImage: currentOrganizer.profileImage || "",
      })
    }
  }, [currentOrganizer])

  const loadOrganizerForEdit = useCallback(
    (organizerId: string) => {
      const organizer = organizers.find((o) => o.id === organizerId)
      if (organizer) {
        setFormData({
          name: organizer.name,
          website: organizer.website || "",
          bio: organizer.bio || "",
          description: organizer.description || "",
          facebookId: organizer.facebookId || "",
          twitter: organizer.twitter || "",
          emailOptIn: organizer.emailOptIn,
          profileImage: organizer.profileImage || "",
        })
      }
    },
    [organizers],
  )

  return {
    // State
    organizers,
    currentOrganizer,
    loading,
    error,
    formData,
    validationErrors,

    // Actions
    loadOrganizers,
    loadOrganizerDetail,
    loadOrganizerForEdit,
    updateFormData,
    handleCreateOrganizer,
    handleUpdateOrganizer,
    handleDeleteOrganizer,
    handleFollowOrganizer,
    navigateToAddOrganizer,
    navigateToEditOrganizer,
    navigateToViewOrganizer,
  }
}
