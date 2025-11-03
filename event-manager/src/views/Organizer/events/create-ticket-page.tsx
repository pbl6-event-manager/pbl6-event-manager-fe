"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Ticket, Zap, ChevronRight, Calendar, MoreVertical } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Switch } from "../../../components/ui/switch"
import { Textarea } from "../../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import type { EventData, TicketFormData, TicketListItem } from "../../../models"

export default function CreateTicketsPage() {
  const navigate = useNavigate()
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState<"paid" | "free" | null>(null)
  const [tickets, setTickets] = useState<TicketListItem[]>([])
  const [showCurrencyDialog, setShowCurrencyDialog] = useState(false)
  const [currency, setCurrency] = useState({ country: "United States", code: "USD" })

  const [ticketFormData, setTicketFormData] = useState<TicketFormData>({
    name: "",
    type: "paid",
    price: 0,
    currency: "USD",
    availableQuantity: 0,
    salesStart: new Date().toISOString().split("T")[0],
    salesStartTime: "12:00 AM",
    salesEnd: "",
    salesEndTime: "12:00 PM",
    description: "",
    visibility: "visible",
    minQuantity: 1,
    maxQuantity: 10,
    salesChannel: "everywhere",
    eTicket: true,
    willCall: false,
  })

  // Mock event data - in real app this would come from Redux store
  const [eventData] = useState<EventData>({
    mediaFile: null,
    title: "League of Legends Championship Pacific Finals Weekend 2025",
    summary: "Join us for the biggest esports event of the year",
    description: "",
    startDate: "2025-09-06",
    endDate: "2025-09-06",
    startTime: "12:00 PM",
    endTime: "6:00 PM",
    location: {
      type: "venue",
      country: "United States",
      city: "Los Angeles",
      venueName: "Convention Center",
      address1: "123 Main St",
      address2: "",
      stateProvince: "CA",
    },
    goodToKnowData: {
      doorTime: null,
      ageInfo: null,
      parkingInfo: null,
      faqs: [],
    },
    lineUp: [],
    agenda: [],
    ticketType: null,
    capacity: "200",
    category: [],
    timezone: "GMT+7",
    language: "en-US",
  })

  const handleTicketTypeSelect = (type: "paid" | "free") => {
    setSelectedTicketType(type)
    setTicketFormData({
      ...ticketFormData,
      type,
      price: type === "free" ? 0 : ticketFormData.price,
    })

    // Show currency dialog for paid tickets on first ticket creation
    if (type === "paid" && tickets.length === 0) {
      setShowCurrencyDialog(true)
    } else {
      setShowTicketForm(true)
    }
  }

  const handleCurrencyConfirm = () => {
    setShowCurrencyDialog(false)
    setShowTicketForm(true)
  }

  const handleSaveTicket = () => {
    const newTicket: TicketListItem = {
      ticketID: `ticket-${Date.now()}`,
      nameTicket: ticketFormData.name,
      price: ticketFormData.price,
      currency: ticketFormData.currency,
      quantityTotal: ticketFormData.availableQuantity,
      onSale: true,
      sold: 0,
      salesEndDate: `${ticketFormData.salesEnd} at ${ticketFormData.salesEndTime}`,
    }

    setTickets([...tickets, newTicket])
    setShowTicketForm(false)
    setSelectedTicketType(null)

    // Reset form
    setTicketFormData({
      name: "",
      type: "paid",
      price: 0,
      currency: "USD",
      availableQuantity: 0,
      salesStart: new Date().toISOString().split("T")[0],
      salesStartTime: "12:00 AM",
      salesEnd: "",
      salesEndTime: "12:00 PM",
      description: "",
      visibility: "visible",
      minQuantity: 1,
      maxQuantity: 10,
      salesChannel: "everywhere",
      eTicket: true,
      willCall: false,
    })
  }

  const handleCancel = () => {
    setShowTicketForm(false)
    setSelectedTicketType(null)
  }

  const currentStep = 2

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-end gap-4">
              <Button variant="ghost" size="sm">
                <span className="mr-2">👁</span>
                Preview Your Event
              </Button>
              <Button variant="ghost" size="sm">
                Publish
              </Button>
              <Button variant="ghost" size="sm">
                More
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-8 h-full">
          {/* Main Content */}
          <div className=" overflow-y-auto max-h-[calc(100vh-120px)]">
            {!showTicketForm && tickets.length === 0 ? (
              // Ticket Type Selection View
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Create tickets</h1>
                  <p className="text-muted-foreground">
                    Choose a ticket type or build a section with multiple ticket types.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Paid Ticket Option */}
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleTicketTypeSelect("paid")}
                  >
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Ticket className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Paid</h3>
                          <p className="text-sm text-muted-foreground">
                            Create a ticket that people have to pay for.
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>

                  {/* Free Ticket Option */}
                  <Card
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleTicketTypeSelect("free")}
                  >
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Free</h3>
                          <p className="text-sm text-muted-foreground">Create a ticket that no one has to pay for.</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a section if you want to sell multiple ticket types that share the same inventory. (ex.
                    Floor, Mezzanine, etc.)
                  </p>
                  <Button variant="outline">Create a section</Button>
                </div>
              </div>
            ) : !showTicketForm && tickets.length > 0 ? (
              // Tickets List View
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Tickets</h1>
                  <Button
                    className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
                    onClick={() => setSelectedTicketType(null)}
                  >
                    Add more tickets
                  </Button>
                </div>

                <div className="border-b">
                  <div className="flex gap-6">
                    <button className="pb-3 border-b-2 border-primary font-medium">Admission</button>
                    <button className="pb-3 text-muted-foreground">Add-ons</button>
                    <button className="pb-3 text-muted-foreground">Promotions</button>
                    <button className="pb-3 text-muted-foreground">Holds</button>
                    <button className="pb-3 text-muted-foreground">Settings</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <Card key={ticket.ticketID}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-muted-foreground rounded"></div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{ticket.nameTicket}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                  On Sale
                                </span>
                                <span>•</span>
                                <span>Ends {ticket.salesEndDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Sold:</div>
                              <div className="font-semibold">
                                {ticket.sold}/{ticket.quantityTotal}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${ticket.price.toFixed(2)}</div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Event capacity</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">
                        {tickets.reduce((sum, t) => sum + t.sold, 0)} / {eventData.capacity}
                      </span>
                      <Button variant="link" className="text-primary">
                        Edit capacity
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Ticket Form View
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Add tickets</h2>

                    {/* Ticket Type Tabs */}
                    <div className="flex gap-2 mb-6">
                      <Button
                        variant={selectedTicketType === "paid" ? "default" : "outline"}
                        onClick={() => setSelectedTicketType("paid")}
                        className="flex-1"
                      >
                        Paid
                      </Button>
                      <Button
                        variant={selectedTicketType === "free" ? "default" : "outline"}
                        onClick={() => setSelectedTicketType("free")}
                        className="flex-1"
                      >
                        Free
                      </Button>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          placeholder="General Admission"
                          value={ticketFormData.name}
                          onChange={(e) => setTicketFormData({ ...ticketFormData, name: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground mt-1">{ticketFormData.name.length}/50</p>
                      </div>

                      <div>
                        <Label htmlFor="quantity">Available quantity *</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={ticketFormData.availableQuantity}
                          onChange={(e) =>
                            setTicketFormData({
                              ...ticketFormData,
                              availableQuantity: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>

                      {selectedTicketType === "paid" && (
                        <div>
                          <Label htmlFor="price">Price *</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">$</span>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={ticketFormData.price}
                              onChange={(e) =>
                                setTicketFormData({
                                  ...ticketFormData,
                                  price: Number.parseFloat(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}

                      {selectedTicketType === "free" && (
                        <div>
                          <Label>Price *</Label>
                          <div className="text-muted-foreground">Free</div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="salesStart">Sales start *</Label>
                          <Input
                            id="salesStart"
                            type="date"
                            value={ticketFormData.salesStart}
                            onChange={(e) => setTicketFormData({ ...ticketFormData, salesStart: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="salesStartTime">Start time</Label>
                          <Input
                            id="salesStartTime"
                            type="time"
                            value={ticketFormData.salesStartTime}
                            onChange={(e) => setTicketFormData({ ...ticketFormData, salesStartTime: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="salesEnd">Sales end *</Label>
                          <Input
                            id="salesEnd"
                            type="date"
                            value={ticketFormData.salesEnd}
                            onChange={(e) => setTicketFormData({ ...ticketFormData, salesEnd: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="salesEndTime">End time</Label>
                          <Input
                            id="salesEndTime"
                            type="time"
                            value={ticketFormData.salesEndTime}
                            onChange={(e) => setTicketFormData({ ...ticketFormData, salesEndTime: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Advanced Settings */}
                      <details className="border-t pt-4">
                        <summary className="cursor-pointer font-medium flex items-center justify-between">
                          Advanced settings
                          <ChevronRight className="h-4 w-4" />
                        </summary>
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Tell attendees more about this ticket."
                              value={ticketFormData.description}
                              onChange={(e) => setTicketFormData({ ...ticketFormData, description: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {ticketFormData.description?.length || 0}/2500
                            </p>
                          </div>

                          <div>
                            <Label htmlFor="visibility">Visibility</Label>
                            <Select
                              value={ticketFormData.visibility}
                              onValueChange={(value: "visible" | "hidden") =>
                                setTicketFormData({ ...ticketFormData, visibility: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="visible">Visible</SelectItem>
                                <SelectItem value="hidden">Hidden</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Tickets per order</Label>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div>
                                <Label htmlFor="minQuantity" className="text-xs">
                                  Min. quantity *
                                </Label>
                                <Input
                                  id="minQuantity"
                                  type="number"
                                  value={ticketFormData.minQuantity}
                                  onChange={(e) =>
                                    setTicketFormData({
                                      ...ticketFormData,
                                      minQuantity: Number.parseInt(e.target.value) || 1,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <Label htmlFor="maxQuantity" className="text-xs">
                                  Max. quantity *
                                </Label>
                                <Input
                                  id="maxQuantity"
                                  type="number"
                                  value={ticketFormData.maxQuantity}
                                  onChange={(e) =>
                                    setTicketFormData({
                                      ...ticketFormData,
                                      maxQuantity: Number.parseInt(e.target.value) || 10,
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="salesChannel">Sales channel</Label>
                            <Select
                              value={ticketFormData.salesChannel}
                              onValueChange={(value) => setTicketFormData({ ...ticketFormData, salesChannel: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="everywhere">Everywhere</SelectItem>
                                <SelectItem value="online">Online only</SelectItem>
                                <SelectItem value="atdoor">At door only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="eTicket">eTicket</Label>
                              <Switch
                                id="eTicket"
                                checked={ticketFormData.eTicket}
                                onCheckedChange={(checked) =>
                                  setTicketFormData({ ...ticketFormData, eTicket: checked })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="willCall">Will call</Label>
                              <Switch
                                id="willCall"
                                checked={ticketFormData.willCall}
                                onCheckedChange={(checked) =>
                                  setTicketFormData({ ...ticketFormData, willCall: checked })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#f05537] hover:bg-[#d63c1f] text-white"
                      onClick={handleSaveTicket}
                      disabled={!ticketFormData.name || !ticketFormData.availableQuantity}
                    >
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

        </div>
      </div>

      {/* Currency Dialog */}
      <Dialog open={showCurrencyDialog} onOpenChange={setShowCurrencyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Country & currency</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">Set the payout country and currency for your event.</p>
            <div>
              <Label htmlFor="country">Payout Country *</Label>
              <Select value={currency.country} onValueChange={(value) => setCurrency({ ...currency, country: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency *</Label>
              <Select value={currency.code} onValueChange={(value) => setCurrency({ ...currency, code: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCurrencyConfirm} className="bg-primary">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Action Bar */}
      <div className="bottom-0 left-0 right-0 bg-card border-t py-4 z-50">
        <div className="container mx-auto px-4 flex justify-end">
          <Button
            size="lg"
            className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
            onClick={() => navigate("/organizer/events/publish")}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
