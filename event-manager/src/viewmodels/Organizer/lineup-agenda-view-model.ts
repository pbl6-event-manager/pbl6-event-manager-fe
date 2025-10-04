"use client"

import { useState, useCallback } from "react"
import type { LineUpItem, AgendaItem } from "../../models"

export interface LineupFormData {
  name: string
  tagline: string
  description: string
  image: File | null
  imagePreview: string | null
  isHeadliner: boolean
  isPresent: boolean
}

export interface AgendaFormData {
  title: string
  startTime: string
  endTime: string
  hostOrArtist: string
  description: string
}

export const useLineupAgendaViewModel = (
  initialLineup: LineUpItem[],
  initialAgenda: AgendaItem[],
  onUpdate: (lineup: LineUpItem[], agenda: AgendaItem[]) => void,
) => {
  const [lineupItems, setLineupItems] = useState<LineUpItem[]>(initialLineup)
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(initialAgenda)

  const [lineupForms, setLineupForms] = useState<LineupFormData[]>([
    {
      name: "",
      tagline: "",
      description: "",
      image: null,
      imagePreview: null,
      isHeadliner: false,
      isPresent: false,
    },
  ])

  const [agendaForms, setAgendaForms] = useState<AgendaFormData[]>([
    {
      title: "",
      startTime: "",
      endTime: "",
      hostOrArtist: "",
      description: "",
    },
  ])

  const validateLineupForm = useCallback((form: LineupFormData): boolean => {
    return form.name.trim() !== "" && form.image !== null
  }, [])

  const validateAllLineupForms = useCallback((): boolean => {
    return lineupForms.every(validateLineupForm)
  }, [lineupForms, validateLineupForm])

  const validateAgendaForm = useCallback((form: AgendaFormData): boolean => {
    return form.title.trim() !== "" && form.startTime !== "" && form.endTime !== ""
  }, [])

  const validateAllAgendaForms = useCallback((): boolean => {
    return agendaForms.every(validateAgendaForm)
  }, [agendaForms, validateAgendaForm])

  const addLineupForm = useCallback(() => {
    setLineupForms((prev) => [
      ...prev,
      {
        name: "",
        tagline: "",
        description: "",
        image: null,
        imagePreview: null,
        isHeadliner: false,
        isPresent: false,
      },
    ])
  }, [])

  const removeLineupForm = useCallback((index: number) => {
    setLineupForms((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateLineupForm = useCallback((index: number, field: keyof LineupFormData, value: any) => {
    setLineupForms((prev) => prev.map((form, i) => (i === index ? { ...form, [field]: value } : form)))
  }, [])

  const addAgendaForm = useCallback(() => {
    setAgendaForms((prev) => [
      ...prev,
      {
        title: "",
        startTime: "",
        endTime: "",
        hostOrArtist: "",
        description: "",
      },
    ])
  }, [])

  const removeAgendaForm = useCallback((index: number) => {
    setAgendaForms((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const updateAgendaForm = useCallback((index: number, field: keyof AgendaFormData, value: any) => {
    setAgendaForms((prev) => prev.map((form, i) => (i === index ? { ...form, [field]: value } : form)))
  }, [])

  const saveLineup = useCallback(() => {
    if (!validateAllLineupForms()) return false

    const newLineupItems: LineUpItem[] = lineupForms.map((form) => ({
      name: form.name,
      role: form.tagline || null,
      image: form.imagePreview || null,
    }))

    setLineupItems(newLineupItems)
    onUpdate(newLineupItems, agendaItems)
    return true
  }, [lineupForms, agendaItems, validateAllLineupForms, onUpdate])

  const saveAgenda = useCallback(() => {
    if (!validateAllAgendaForms()) return false

    const newAgendaItems: AgendaItem[] = agendaForms.map((form) => ({
      time: `${form.startTime} - ${form.endTime}`,
      title: form.title,
      description: form.description || null,
    }))

    setAgendaItems(newAgendaItems)
    onUpdate(lineupItems, newAgendaItems)
    return true
  }, [agendaForms, lineupItems, validateAllAgendaForms, onUpdate])

  const resetLineupForms = useCallback(() => {
    setLineupForms([
      {
        name: "",
        tagline: "",
        description: "",
        image: null,
        imagePreview: null,
        isHeadliner: false,
        isPresent: false,
      },
    ])
  }, [])

  const resetAgendaForms = useCallback(() => {
    setAgendaForms([
      {
        title: "",
        startTime: "",
        endTime: "",
        hostOrArtist: "",
        description: "",
      },
    ])
  }, [])

  return {
    lineupItems,
    agendaItems,
    lineupForms,
    agendaForms,
    validateLineupForm,
    validateAllLineupForms,
    validateAgendaForm,
    validateAllAgendaForms,
    addLineupForm,
    removeLineupForm,
    updateLineupForm,
    addAgendaForm,
    removeAgendaForm,
    updateAgendaForm,
    saveLineup,
    saveAgenda,
    resetLineupForms,
    resetAgendaForms,
  }
}
