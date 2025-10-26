"use client"

import { useState, useCallback } from "react"
import type { LineUpItem, AgendaSection } from "../../../models"

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
  initialAgenda: AgendaSection[],
  onUpdate: (lineup: LineUpItem[], agenda: AgendaSection[]) => void,
) => {
  const [lineupItems, setLineupItems] = useState<LineUpItem[]>(initialLineup)
  const [agendaSections, setAgendaSections] = useState<AgendaSection[]>(
    initialAgenda.length > 0 ? initialAgenda : [{ id: Date.now().toString(), name: "Agenda", items: [] }],
  )

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
    onUpdate(newLineupItems, agendaSections)
    return true
  }, [lineupForms, agendaSections, validateAllLineupForms, onUpdate])

  const saveAgenda = useCallback(
    (sectionIndex: number) => {
      if (!validateAllAgendaForms()) return false

      const newAgendaItems = agendaForms.map((form) => ({
        time: `${form.startTime} - ${form.endTime}`,
        title: form.title,
        description: form.description || null,
        host: form.hostOrArtist || null,
      }))

      const updatedSections = agendaSections.map((section, index) =>
        index === sectionIndex ? { ...section, items: newAgendaItems } : section,
      )

      setAgendaSections(updatedSections)
      onUpdate(lineupItems, updatedSections)
      return true
    },
    [agendaForms, agendaSections, lineupItems, validateAllAgendaForms, onUpdate],
  )

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

  const addAgendaSection = useCallback(() => {
    const newSection: AgendaSection = {
      id: Date.now().toString(),
      name: `Agenda ${agendaSections.length + 1}`,
      items: [],
    }
    setAgendaSections((prev) => [...prev, newSection])
    return newSection
  }, [agendaSections.length])

  const updateAgendaSectionName = useCallback((index: number, name: string) => {
    setAgendaSections((prev) => prev.map((section, i) => (i === index ? { ...section, name } : section)))
  }, [])

  return {
    lineupItems,
    agendaSections,
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
    addAgendaSection,
    updateAgendaSectionName,
  }
}
