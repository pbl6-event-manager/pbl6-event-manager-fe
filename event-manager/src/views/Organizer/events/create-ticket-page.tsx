import { Ticket, Zap, ChevronRight, MoreVertical, Search, Pencil, Trash2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../../../components/ui/dropdown-menu"
import { Textarea } from "../../../components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { useTicketViewModel } from "../../../viewmodels/Organizer/events/ticket-view-model"
import { usePermission } from "../../../hooks/usePermission"
import { toast } from "sonner"

interface CreateTicketsPageProps {
  onNext?: () => void;
  isOwner?: boolean;
}

export default function CreateTicketsPage({ onNext, isOwner = true }: CreateTicketsPageProps) {
  const {
    navigate,
    eventId,
    showTicketForm,
    setShowTicketForm,
    showTicketTypeSelection,
    setShowTicketTypeSelection,
    selectedTicketType,
    setSelectedTicketType,
    tickets,
    setTickets,
    filteredTickets,
    searchQuery,
    setSearchQuery,
    ticketFormData,
    setTicketFormData,
    showCurrencyDialog,
    setShowCurrencyDialog,
    currency,
    setCurrency,
    isLoading,
    error,
    handleTicketTypeSelect,
    handleCurrencyConfirm,
    handleAddMoreTickets,
    handleSaveTicket,
    handleCancel,
    editingTicketId,
    handleEditTicket,
    handleDeleteTicket,
  } = useTicketViewModel()

  const { canCreateTickets, canUpdateTickets, canDeleteTickets, hasPermission } = usePermission({
    eventId: eventId ? Number(eventId) : null,
    autoLoad: true,
  })

  const handleAddMoreTicketsWithPermission = () => {
    if (!isOwner && !canCreateTickets) {
      toast.error("Permission Denied", {
        description: 'You need "Create Tickets" permission to add new tickets',
        duration: 4000,
      })
      return
    }
    handleAddMoreTickets()
  }

  const handleTicketTypeSelectWithPermission = (type: "paid" | "free") => {
    if (!isOwner && !canCreateTickets) {
      toast.error("Permission Denied", {
        description: 'You need "Create Tickets" permission to create tickets',
        duration: 4000,
      })
      return
    }
    handleTicketTypeSelect(type)
  }

  const handleEditTicketWithPermission = (ticketId: number) => {
    if (!isOwner && !canUpdateTickets) {
      toast.error("Permission Denied", {
        description: 'You need "Update Tickets" permission to edit tickets',
        duration: 4000,
      })
      return
    }
    handleEditTicket(ticketId)
  }

  const handleDeleteTicketWithPermission = (ticketId: number) => {
    if (!isOwner && !canDeleteTickets) {
      toast.error("Permission Denied", {
        description: 'You need "Delete Tickets" permission to delete tickets',
        duration: 4000,
      })
      return
    }
    handleDeleteTicket(ticketId)
  }

  const handleSaveTicketWithPermission = () => {
    const requiredPermission = editingTicketId ? canUpdateTickets : canCreateTickets
    const permissionName = editingTicketId ? "Update Tickets" : "Create Tickets"

    if (!isOwner && !requiredPermission) {
      toast.error("Permission Denied", {
        description: `You need "${permissionName}" permission to ${editingTicketId ? "update" : "create"} tickets`,
        duration: 4000,
      })
      return
    }
    handleSaveTicket()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <header className="border-b bg-card sticky top-0 z-50">
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
      </header> */}

      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 py-8 h-full">
          {/* Loading State */}
          {isLoading && tickets.length === 0 && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading tickets...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Main Content */}
          <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
            {showTicketTypeSelection || (!showTicketForm && tickets.length === 0 && !isLoading) ? (
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
                    onClick={() => handleTicketTypeSelectWithPermission("paid")}
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
                    Create a section if you want to sell multiple ticket types that share the same inventory.
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
                    className="bg-[#f05537] hover:bg-[#d63c1f] text-white cursor-pointer"
                    onClick={() => handleAddMoreTicketsWithPermission()}
                  > 
                    Add more tickets
                  </Button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search tickets by name, price, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Results count */}
                {searchQuery && (
                  <div className="text-sm text-muted-foreground">
                    Found {filteredTickets.length} of {tickets.length} tickets
                  </div>
                )}

                {/* Tickets List */}
                <div className="space-y-4">
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <Card key={ticket.ticketID}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-8 h-8 flex items-center justify-center">
                                <Ticket className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{ticket.nameTicket}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${ticket.onSale ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                    {ticket.onSale ? 'On Sale' : 'Not On Sale'}
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                                  >
                                    <MoreVertical className="h-5 w-5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40">
                                  <DropdownMenuItem
                                    onClick={() => handleEditTicketWithPermission(ticket.ticketID)}
                                  >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => handleDeleteTicketWithPermission(ticket.ticketID)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No tickets found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Ticket Form View
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {editingTicketId ? "Edit ticket" : "Add tickets"}
                    </h2>

                    {/* Ticket Type Tabs */}
                    <div className="flex gap-2 mb-6">
                      <Button
                        variant={selectedTicketType === "paid" ? "default" : "outline"}
                        onClick={() => setSelectedTicketType("paid")}
                        className="flex-1 cursor-pointer"
                        disabled={isLoading}
                      >
                        Paid
                      </Button>
                      <Button
                        variant={selectedTicketType === "free" ? "default" : "outline"}
                        onClick={() => setSelectedTicketType("free")}
                        className="flex-1 cursor-pointer"
                        disabled={isLoading}
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
                          disabled={isLoading}
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
                          disabled={isLoading}
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
                              disabled={isLoading}
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
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label htmlFor="salesStartTime">Start time</Label>
                          <Input
                            id="salesStartTime"
                            type="time"
                            value={ticketFormData.salesStartTime}
                            onChange={(e) => setTicketFormData({ ...ticketFormData, salesStartTime: e.target.value })}
                            disabled={isLoading}
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
                            disabled={isLoading}
                          />
                        </div>
                        <div>
                          <Label htmlFor="salesEndTime">End time</Label>
                          <Input
                            id="salesEndTime"
                            type="time"
                            value={ticketFormData.salesEndTime}
                            onChange={(e) => setTicketFormData({ ...ticketFormData, salesEndTime: e.target.value })}
                            disabled={isLoading}
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
                            <Label htmlFor="description" className="pb-2">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Tell attendees more about this ticket."
                              value={ticketFormData.description}
                              onChange={(e) => setTicketFormData({ ...ticketFormData, description: e.target.value })}
                              disabled={isLoading}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              {ticketFormData.description?.length || 0}/2500
                            </p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent cursor-pointer"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-[#f05537] hover:bg-[#d63c1f] text-white cursor-pointer"
                      onClick={handleSaveTicketWithPermission}
                      disabled={isLoading || !ticketFormData.name || !ticketFormData.availableQuantity}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
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
            <Button onClick={handleCurrencyConfirm} className="bg-primary cursor-pointer">
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
            onClick={onNext}
            disabled={tickets.length === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}