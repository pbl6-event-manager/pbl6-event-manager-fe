"use client"

import { useState, useEffect, useRef } from "react"
import { Users, Calendar, Check, Upload, Trash2, MoreVertical, Pencil } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import type { EventData } from "../../models"
import { useLineupAgendaViewModel } from "../../viewmodels/Organizer/events/lineup-agenda-view-model"

interface LineupAndAgendaCardProps {
  eventData: EventData
  onUpdate: (data: EventData) => void
}

export function LineupAndAgendaCard({ eventData, onUpdate }: LineupAndAgendaCardProps) {
  const [showLineupForm, setShowLineupForm] = useState(false)
  const [showAgendaForm, setShowAgendaForm] = useState(false)
  const [lineupSaved, setLineupSaved] = useState(false)
  const [agendaSaved, setAgendaSaved] = useState(false)
  const [activeAgendaTab, setActiveAgendaTab] = useState(0)
  const [editingAgendaName, setEditingAgendaName] = useState<number | null>(null)
  const [agendaNameInput, setAgendaNameInput] = useState("")

  const lineupCardRef = useRef<HTMLDivElement>(null)
  const agendaCardRef = useRef<HTMLDivElement>(null)

  const {
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
  } = useLineupAgendaViewModel(eventData.lineUp, eventData.agenda, (lineup, agenda) => {
    onUpdate({ ...eventData, lineUp: lineup, agenda: agenda })
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (lineupCardRef.current && !lineupCardRef.current.contains(event.target as Node)) {
        if (showLineupForm && validateAllLineupForms()) {
          const success = saveLineup()
          if (success) {
            setShowLineupForm(false)
            setLineupSaved(true)
          }
        }
      }
    }

    if (showLineupForm) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLineupForm, validateAllLineupForms, saveLineup])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (agendaCardRef.current && !agendaCardRef.current.contains(event.target as Node)) {
        if (showAgendaForm && validateAllAgendaForms()) {
          const success = saveAgenda(activeAgendaTab)
          if (success) {
            setShowAgendaForm(false)
            setAgendaSaved(true)
          }
        }
      }
    }

    if (showAgendaForm) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAgendaForm, validateAllAgendaForms, saveAgenda, activeAgendaTab])

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      updateLineupForm(index, "image", file)
      updateLineupForm(index, "imagePreview", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDeleteLineupSection = () => {
    resetLineupForms()
    setShowLineupForm(false)
    setLineupSaved(false)
    onUpdate({ ...eventData, lineUp: [] })
  }

  const handleDeleteAgendaSection = () => {
    resetAgendaForms()
    setShowAgendaForm(false)
    setAgendaSaved(false)
    onUpdate({ ...eventData, agenda: [] })
  }

  const handleAddNewAgenda = () => {
    const newSection = addAgendaSection()
    setActiveAgendaTab(agendaSections.length)
  }

  const handleEditAgendaName = (index: number) => {
    setEditingAgendaName(index)
    setAgendaNameInput(agendaSections[index]?.name || "Agenda")
  }

  const handleSaveAgendaName = () => {
    if (editingAgendaName !== null && agendaNameInput.trim()) {
      updateAgendaSectionName(editingAgendaName, agendaNameInput.trim())
      setEditingAgendaName(null)
      setAgendaNameInput("")
    }
  }

  return (
    <Card className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 rounded-lg">
      <CardHeader>
        <CardTitle>Add more sections to your event page</CardTitle>
        <p className="text-sm text-muted-foreground">
          Make your event stand out even more. These sections help attendees find information and answer their
          questions—which means more ticket sales and less time answering messages.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lineup Section */}
        {!showLineupForm && lineupItems.length === 0 ? (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Lineup</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="link" size="sm" className="text-primary">
                See examples
              </Button>
              <Button size="sm" onClick={() => setShowLineupForm(true)}>
                Add
              </Button>
            </div>
          </div>
        ) : !showLineupForm && lineupItems.length > 0 ? (
          <div className="border-2 border-blue-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Lineup</h3>
              </div>
              {lineupSaved && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="space-y-3">
              {lineupItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {item.image && (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.role && <p className="text-sm text-muted-foreground">{item.role}</p>}
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => {
                setShowLineupForm(true)
                setLineupSaved(false)
              }}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div ref={lineupCardRef} className="border-2 border-blue-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Lineup</h3>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={handleDeleteLineupSection}
              >
                Delete section
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Highlight your lineup of special guests with a section on your event page. Change the title of this
              section to fit your event's theme and add info about each person. You can set someone as a headliner to
              highlight them even more.
            </p>

            {lineupForms.map((form, index) => (
              <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-red-500 flex items-center justify-center mb-3 relative overflow-hidden">
                      {form.imagePreview ? (
                        <img
                          src={form.imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <Label htmlFor={`image-upload-${index}`} className="cursor-pointer">
                      <Button type="button" size="sm" variant="outline" asChild>
                        <span>Upload</span>
                      </Button>
                    </Label>
                    <Input
                      id={`image-upload-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(index, file)
                      }}
                    />
                    {!validateLineupForm(form) && form.name && !form.image && (
                      <p className="text-xs text-red-500 mt-1">Image is mandatory</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`name-${index}`}>Name *</Label>
                      <Input
                        id={`name-${index}`}
                        value={form.name}
                        onChange={(e) => updateLineupForm(index, "name", e.target.value)}
                        placeholder="Enter name"
                        className={!form.name.trim() && form.name !== "" ? "border-red-500" : ""}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`tagline-${index}`}>Add a tagline</Label>
                      <Input
                        id={`tagline-${index}`}
                        value={form.tagline}
                        onChange={(e) => updateLineupForm(index, "tagline", e.target.value)}
                        placeholder="e.g., Speaker, Artist"
                      />
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                        🙈 Hide tagline
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Textarea
                        id={`description-${index}`}
                        value={form.description}
                        onChange={(e) => updateLineupForm(index, "description", e.target.value)}
                        placeholder="Enter description"
                        rows={4}
                        maxLength={5000}
                      />
                      <p className="text-xs text-muted-foreground text-right">{form.description.length} / 5000</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`present-${index}`}
                        checked={form.isPresent}
                        onChange={(e) => updateLineupForm(index, "isPresent", e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`present-${index}`} className="text-sm">
                        I confirm the artist(s) listed will be physically present and performing live at this event (not
                        a tribute, DJ set, or themed party).
                      </Label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`headliner-${index}`}>Set as headliner</Label>
                        <Switch
                          id={`headliner-${index}`}
                          checked={form.isHeadliner}
                          onCheckedChange={(checked) => updateLineupForm(index, "isHeadliner", checked)}
                        />
                      </div>
                      <Button variant="link" size="sm" className="text-blue-600">
                        📌 Add social links
                      </Button>
                    </div>

                    {lineupForms.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLineupForm(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button variant="ghost" size="sm" onClick={addLineupForm} className="text-blue-600 w-full mt-4">
              + Add another
            </Button>
          </div>
        )}

        {/* Agenda Section */}
        {!showAgendaForm && agendaSections.length === 0 ? (
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Agenda</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="link" size="sm" className="text-primary">
                See examples
              </Button>
              <Button size="sm" onClick={() => setShowAgendaForm(true)}>
                Add
              </Button>
            </div>
          </div>
        ) : !showAgendaForm && agendaSections.length > 0 ? (
          <div className="border-2 border-blue-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-lg">Agenda</h3>
              </div>
              {agendaSaved && (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4 border-b">
              {agendaSections.map((section, index) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${activeAgendaTab === index ? "border-b-2 border-blue-600" : ""}`}
                  onClick={() => setActiveAgendaTab(index)}
                >
                  {section.name}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {agendaSections[activeAgendaTab]?.items.map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                  <p className="font-medium">{item.title}</p>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3"
              onClick={() => {
                setShowAgendaForm(true)
                setAgendaSaved(false)
              }}
            >
              Edit
            </Button>
          </div>
        ) : (
          <div ref={agendaCardRef} className="border-2 border-blue-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Agenda</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={handleDeleteAgendaSection}
              >
                Delete section
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Add an itinerary, schedule, or lineup to your event. You can include a time, a description of what will
              happen, and who will host or perform during the event. (Ex. Speaker, performer, artist, guide, etc.) If
              your event has multiple dates, you can add a second agenda.
            </p>

            <div className="mb-4">
              <div className="flex items-center gap-2 border-b">
                {agendaSections.map((section, index) => (
                  <div key={section.id} className="flex items-center">
                    {editingAgendaName === index ? (
                      <Input
                        value={agendaNameInput}
                        onChange={(e) => setAgendaNameInput(e.target.value)}
                        onBlur={handleSaveAgendaName}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveAgendaName()
                        }}
                        className="h-8 w-32"
                        autoFocus
                      />
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`rounded-none ${activeAgendaTab === index ? "border-b-2 border-blue-600" : ""}`}
                        onClick={() => setActiveAgendaTab(index)}
                      >
                        {section.name}
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditAgendaName(index)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
                <Button variant="link" size="sm" className="text-blue-600 ml-auto" onClick={handleAddNewAgenda}>
                  + Add new agenda
                </Button>
              </div>
            </div>

            {agendaForms.map((form, index) => (
              <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`agenda-title-${index}`}>
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`agenda-title-${index}`}
                      value={form.title}
                      onChange={(e) => updateAgendaForm(index, "title", e.target.value)}
                      placeholder="Enter title"
                      className={!form.title.trim() && form.title !== "" ? "border-red-500" : ""}
                    />
                    {!form.title.trim() && form.title !== "" && (
                      <p className="text-xs text-red-500 mt-1">Title can't be left blank</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`start-time-${index}`}>Start time</Label>
                      <Input
                        id={`start-time-${index}`}
                        type="time"
                        value={form.startTime}
                        onChange={(e) => updateAgendaForm(index, "startTime", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`end-time-${index}`}>End time</Label>
                      <Input
                        id={`end-time-${index}`}
                        type="time"
                        value={form.endTime}
                        onChange={(e) => updateAgendaForm(index, "endTime", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                      👤 Host or Artist
                    </Button>
                  </div>

                  <div>
                    <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                      📝 Add description
                    </Button>
                  </div>

                  {agendaForms.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeAgendaForm(index)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <Button variant="ghost" size="sm" onClick={addAgendaForm} className="text-blue-600 w-full mt-4">
              + Add slot
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
