"use client"

import { useState, useRef, useEffect } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import type { FAQ, GoodToKnowData } from "../../models"

interface GoodToKnowCardProps {
    data: GoodToKnowData
    onUpdate: (data: GoodToKnowData) => void
}

type HighlightType = "age" | "doorTime" | "parking"

export function GoodToKnowCard({ data, onUpdate }: GoodToKnowCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [showHighlightModal, setShowHighlightModal] = useState(false)
    const [currentHighlightType, setCurrentHighlightType] = useState<HighlightType | null>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    //Highlight form state
    const [doorTime, setDoorTime] = useState(data.doorTime?.value || "")
    const [doorTimeUnit, setDoorTimeUnit] = useState<"minutes" | "hours">(data.doorTime?.unit || "minutes")
    const [ageRestriction, setAgeRestriction] = useState<"none" | "restricted" | "guardian">(data.ageInfo?.type || "none")
    const [ageLimit, setAgeLimit] = useState(data.ageInfo?.limit || "")
    const [parkingType, setParkingType] = useState<"free" | "paid" | "none">(data.parkingInfo || "none")

    // FAQ state
    const [faqs, setFaqs] = useState<FAQ[]>(data.faqs || [])
    const [newQuestion, setNewQuestion] = useState("")
    const [newAnswer, setNewAnswer] = useState("")
    const [editingFaqId, setEditingFaqId] = useState<string | null>(null)

    useEffect(() => {
        const hasAnyData =
            data.doorTime !== null ||
            data.ageInfo !== null ||
            data.parkingInfo !== null ||
            (data.faqs && data.faqs.length > 0)
        setIsValid(hasAnyData)
    }, [data])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node) && isExpanded) {
                validateAndCollapse()
            }
        }

        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isExpanded])

    const validateAndCollapse = () => {
        const hasAnyData =
            data.doorTime !== null ||
            data.ageInfo !== null ||
            data.parkingInfo !== null ||
            (data.faqs && data.faqs.length > 0)
        if (hasAnyData) {
            setIsValid(true)
            setIsExpanded(false)
        }
    }

    const openHighlightModal = (type: HighlightType) => {
        setCurrentHighlightType(type)
        setShowHighlightModal(true)
    }

    const saveHighlight = () => {
        const updatedData = { ...data }

        if (currentHighlightType === "doorTime" && doorTime) {
            updatedData.doorTime = { value: doorTime, unit: doorTimeUnit }
        } else if (currentHighlightType === "age") {
            if (ageRestriction === "none") {
                updatedData.ageInfo = { type: "none", limit: "" }
            } else if (ageRestriction === "restricted" && ageLimit) {
                updatedData.ageInfo = { type: "restricted", limit: ageLimit }
            } else if (ageRestriction === "guardian" && ageLimit) {
                updatedData.ageInfo = { type: "guardian", limit: ageLimit }
            }
        } else if (currentHighlightType === "parking") {
            updatedData.parkingInfo = parkingType
        }

        onUpdate(updatedData)
        setShowHighlightModal(false)
        setCurrentHighlightType(null)
    }

    const removeHighlight = (type: HighlightType) => {
        const updatedData = { ...data }
        if (type === "doorTime") updatedData.doorTime = null
        if (type === "age") updatedData.ageInfo = null
        if (type === "parking") updatedData.parkingInfo = null
        onUpdate(updatedData)
    }

    const addFaq = () => {
        if (newQuestion.trim() && newAnswer.trim()) {
            const newFaq: FAQ = {
                id: Date.now().toString(),
                question: newQuestion,
                answer: newAnswer,
            }
            const updatedFaqs = [...faqs, newFaq]
            setFaqs(updatedFaqs)
            onUpdate({ ...data, faqs: updatedFaqs })
            setNewQuestion("")
            setNewAnswer("")
        }
    }

    const removeFaq = (id: string) => {
        const updatedFaqs = faqs.filter((faq) => faq.id !== id)
        setFaqs(updatedFaqs)
        onUpdate({ ...data, faqs: updatedFaqs })
    }

    const getHighlightSummary = () => {
        const highlights = []
        if (data.doorTime) {
            highlights.push(`Door time: ${data.doorTime.value} ${data.doorTime.unit} before`)
        }
        if (data.ageInfo && data.ageInfo.type !== "none") {
            if (data.ageInfo.type === "restricted") {
                highlights.push(`Age restriction: ${data.ageInfo.limit}+`)
            } else {
                highlights.push(`Guardian required: Under ${data.ageInfo.limit}`)
            }
        }
        if (data.parkingInfo && data.parkingInfo !== "none") {
            highlights.push(`Parking: ${data.parkingInfo}`)
        }
        return highlights
    }

    if (!isExpanded) {
        return (
            <Card
                ref={cardRef}
                className="cursor-pointer hover:border-primary/50 transition-colors relative"
                onClick={() => setIsExpanded(true)}
            >
                {isValid && (
                    <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                    </div>
                )}
                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Good to know</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Use this section to feature specific information about your event. Add highlights and frequently asked
                        questions for attendees.
                    </p>
                    {isValid && (
                        <div className="space-y-3 mt-4">
                            {getHighlightSummary().length > 0 && (
                                <div>
                                    <p className="text-sm font-medium mb-2">Highlights</p>
                                    <div className="flex flex-wrap gap-2">
                                        {getHighlightSummary().map((highlight, index) => (
                                            <span key={index} className="text-sm bg-muted px-3 py-1 rounded-full">
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {faqs.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium mb-2">FAQs</p>
                                    <p className="text-sm text-muted-foreground">{faqs.length} question(s) added</p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    }

    return (
    <>
      <Card ref={cardRef} className="border-primary">
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Good to know</h3>
            <p className="text-sm text-muted-foreground">
              Use this section to feature specific information about your event. Add highlights and frequently asked
              questions for attendees.
            </p>
          </div>

          {/* Highlights Section */}
          <div className="space-y-4">
            <h4 className="font-semibold">Highlights</h4>
            <div className="flex flex-wrap gap-3">
              {!data.ageInfo && (
                <Button variant="outline" size="sm" onClick={() => openHighlightModal("age")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Age info
                </Button>
              )}
              {data.ageInfo && (
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <span className="text-sm">
                    {data.ageInfo.type === "restricted"
                      ? `${data.ageInfo.limit}+`
                      : data.ageInfo.type === "guardian"
                        ? `Guardian required: Under ${data.ageInfo.limit}`
                        : "All ages"}
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeHighlight("age")}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {!data.doorTime && (
                <Button variant="outline" size="sm" onClick={() => openHighlightModal("doorTime")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Door Time
                </Button>
              )}
              {data.doorTime && (
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <span className="text-sm">
                    {data.doorTime.value} {data.doorTime.unit} before
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeHighlight("doorTime")}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {!data.parkingInfo && (
                <Button variant="outline" size="sm" onClick={() => openHighlightModal("parking")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Parking info
                </Button>
              )}
              {data.parkingInfo && data.parkingInfo !== "none" && (
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                  <span className="text-sm capitalize">{data.parkingInfo} parking</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeHighlight("parking")}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-4">
            <h4 className="font-semibold">Frequently asked questions</h4>
            <p className="text-sm text-muted-foreground">
              Answer questions your attendees may have about the event, like accessibility and amenities.
            </p>

            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFaq(faq.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="space-y-3 border rounded-lg p-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="e.g., Is there wheelchair access?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Input
                  id="answer"
                  placeholder="e.g., Yes, the venue is fully accessible"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
              </div>
              <Button onClick={addFaq} disabled={!newQuestion.trim() || !newAnswer.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add question
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlight Modal */}
      <Dialog open={showHighlightModal} onOpenChange={setShowHighlightModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add highlights about your event</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {currentHighlightType === "doorTime" && (
              <div className="space-y-4">
                <Label>What time can attendees check in before the event?</Label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Time before event starts"
                    value={doorTime}
                    onChange={(e) => setDoorTime(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant={doorTimeUnit === "minutes" ? "default" : "outline"}
                      onClick={() => setDoorTimeUnit("minutes")}
                    >
                      Minutes
                    </Button>
                    <Button
                      variant={doorTimeUnit === "hours" ? "default" : "outline"}
                      onClick={() => setDoorTimeUnit("hours")}
                    >
                      Hours
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentHighlightType === "age" && (
              <>
                <div className="space-y-4">
                  <Label>Is there an age restriction?</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={ageRestriction === "none" ? "default" : "outline"}
                      onClick={() => setAgeRestriction("none")}
                      className="h-auto py-3"
                    >
                      All ages allowed
                    </Button>
                    <Button
                      variant={ageRestriction === "restricted" ? "default" : "outline"}
                      onClick={() => setAgeRestriction("restricted")}
                      className="h-auto py-3"
                    >
                      There's an age restriction
                    </Button>
                    <Button
                      variant={ageRestriction === "guardian" ? "default" : "outline"}
                      onClick={() => setAgeRestriction("guardian")}
                      className="h-auto py-3"
                    >
                      Parent or guardian needed
                    </Button>
                  </div>
                </div>

                {ageRestriction === "guardian" && (
                  <div className="space-y-4">
                    <Label>What ages need a parent or guardian?</Label>
                    <div className="grid grid-cols-4 gap-3">
                      {["14", "16", "18", "21"].map((age) => (
                        <Button
                          key={age}
                          variant={ageLimit === age ? "default" : "outline"}
                          onClick={() => setAgeLimit(age)}
                        >
                          Under {age}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {ageRestriction === "restricted" && (
                  <div className="space-y-4">
                    <Label>What ages are allowed?</Label>
                    <div className="grid grid-cols-5 gap-3">
                      {["12", "13", "14", "15", "16", "17", "18", "19", "21"].map((age) => (
                        <Button
                          key={age}
                          variant={ageLimit === age ? "default" : "outline"}
                          onClick={() => setAgeLimit(age)}
                        >
                          {age}+
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {currentHighlightType === "parking" && (
              <div className="space-y-4">
                <Label>Is there parking at your venue?</Label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={parkingType === "free" ? "default" : "outline"}
                    onClick={() => setParkingType("free")}
                    className="h-auto py-3"
                  >
                    Free parking
                  </Button>
                  <Button
                    variant={parkingType === "paid" ? "default" : "outline"}
                    onClick={() => setParkingType("paid")}
                    className="h-auto py-3"
                  >
                    Paid parking
                  </Button>
                  <Button
                    variant={parkingType === "none" ? "default" : "outline"}
                    onClick={() => setParkingType("none")}
                    className="h-auto py-3"
                  >
                    No parking options
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={saveHighlight} className="bg-[#f05537] hover:bg-[#d63c1f] text-white">
              Add to event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

