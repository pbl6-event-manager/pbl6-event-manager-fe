"use client"

import { forwardRef, useImperativeHandle } from "react"
import { Calendar, MapPin, Plus, Check, AlertCircle, Clock, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { SearchableSelect } from "../ui/searchable-select"
import type { EventFormData } from "../../models/form-models/event-form-models"
import { useDateLocationViewModel } from "../../viewmodels/Organizer/events/date-location-view-model"
import { TIMEZONES, LANGUAGES } from "../../utils/Organizer/timezone-language"
import type { EventCardProps } from "../../models/component-props/card-component-props"

interface DateLocationCardProps {
  eventData: EventFormData
  onUpdate: (data: EventFormData) => void
  dateInputRef?: React.RefObject<HTMLInputElement | null>
  locationInputRef?: React.RefObject<HTMLButtonElement | null>
}

export interface DateLocationCardHandle {
  expand: () => void
}

export const DateLocationCard = forwardRef<DateLocationCardHandle, DateLocationCardProps>(
  ({ eventData, onUpdate, dateInputRef, locationInputRef }, ref) => {
    const {
      isExpanded,
      cardRef,
      setIsExpanded,
      isValid,
      errors,
      setErrors,
      eventType,
      setEventType,
      showLocationDetails,
      setShowLocationDetails,
      countries,
      cities,
      loading,
      validateFields,
      updateLocation,
      formatDateTime,
      formatLocation,
      setIsValidating,
      handleCardClick,
    } = useDateLocationViewModel(eventData, onUpdate)


    // Expose expand method to parent
    useImperativeHandle(ref, () => ({
      expand: () => {
        setIsValidating(true)
        setIsExpanded(true)
        // Focus on the appropriate field
        setTimeout(() => {
          if (dateInputRef?.current) {
            dateInputRef.current.focus()
          } else if (locationInputRef?.current) {
            locationInputRef.current.click()
          }
          // Reset validating state sau khi focus xong
          setTimeout(() => setIsValidating(false), 500)
        }, 100)
      }
    }))


    if (!isExpanded) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date and Time Card - Collapsed */}
          <Card
            ref={cardRef}
            className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer"
            onClick={handleCardClick}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Date and time</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{formatDateTime()} {eventData.timezone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isValid && eventData.startDate && (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Card - Collapsed */}
          <Card
            className="border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer"
            onClick={handleCardClick}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{formatLocation()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isValid && (eventData.location.type !== "venue" || (eventData.location.address1 && eventData.location.city && eventData.location.country)) && (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date and Time Card - Expanded */}
        <Card className="border-2 border-blue-700 transition-colors duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Date and time
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Type of event</Label>
              <RadioGroup
                value={eventType}
                onValueChange={(value: "single" | "multi") => setEventType(value)}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="single" id="single" />
                  <div className="flex-1">
                    <Label htmlFor="single" className="text-sm font-medium cursor-pointer">
                      Single day event
                    </Label>
                    <p className="text-xs text-muted-foreground">An event that happens in just one day</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="multi" id="multi" />
                  <div className="flex-1">
                    <Label htmlFor="multi" className="text-sm font-medium cursor-pointer">
                      Multi days event
                    </Label>
                    <p className="text-xs text-muted-foreground">An event that happens continuously for many consecutive days.</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {/* Start date */}
                <div>
                  <Label htmlFor="date" className="flex items-center gap-1">
                    Start date
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    ref={dateInputRef}
                    type="date"
                    id="date"
                    className={`mt-1 ${errors.date ? "border-destructive" : ""}`}
                    value={eventData.startDate}
                    onChange={(e) => {
                      onUpdate({
                        ...eventData,
                        startDate: e.target.value,
                        endDate: eventType === "single" ? e.target.value : eventData.endDate,
                      })
                      if (errors.date) {
                        setErrors({ ...errors, date: undefined })
                      }
                    }}
                    onBlur={validateFields}
                  />
                  {errors.date && (
                    <div className="flex items-center gap-1 mt-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.date}</span>
                    </div>
                  )}
                </div>
                {/* End date */}
                {eventType === "multi" && (
                  <div>
                    <Label htmlFor="endDate" className="flex items-center gap-1">
                      End date
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      type="date"
                      id="endDate"
                      className={`mt-1 ${errors.endDate ? "border-destructive" : ""}`}
                      value={eventData.endDate}
                      onChange={(e) => {
                        onUpdate({ ...eventData, endDate: e.target.value })
                        if (errors.endDate) {
                          setErrors({ ...errors, endDate: undefined })
                        }
                      }}
                      onBlur={validateFields}
                    />
                    {errors.endDate && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.endDate}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Start time */}
                <div>
                  <Label htmlFor="startTime">Start time</Label>
                  <Input
                    type="time"
                    id="startTime"
                    className="mt-1"
                    value={eventData.startTime}
                    onChange={(e) => onUpdate({ ...eventData, startTime: e.target.value })}
                  />
                </div>
                {/* End time */}
                <div>
                  <Label htmlFor="endTime">End time</Label>
                  <Input
                    type="time"
                    id="endTime"
                    className="mt-1"
                    value={eventData.endTime}
                    onChange={(e) => onUpdate({ ...eventData, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {eventData.startDate && (
              <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>{formatDateTime()}</span>
              </div>
            )}

            {/* More options */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="text-sm font-medium">More options</h4>

              {/* Grid chia 2 cột */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Event timezone */}
                <div>
                  <Label htmlFor="timezone" className="text-sm font-medium">
                    Event timezone
                  </Label>
                  <Select
                    value={eventData.timezone}
                    onValueChange={(value) => {
                      console.log("Timezone changed to:", value)
                      setIsValidating(true)
                      onUpdate({ ...eventData, timezone: value })
                      setTimeout(() => setIsValidating(false), 100)
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Event page language */}
                <div>
                  <Label htmlFor="language" className="text-sm font-medium">
                    Event page language
                  </Label>
                  <Select
                    value={eventData.language}
                    onValueChange={(value) => {
                      console.log("Language changed to:", value)
                      setIsValidating(true)
                      onUpdate({ ...eventData, language: value })
                      setTimeout(() => setIsValidating(false), 100)
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Location Card - Expanded */}
        <Card className="border-2 border-blue-700 transition-colors duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={eventData.location.type}
              onValueChange={(value: "venue" | "online" | "tba") => updateLocation({ type: value })}
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="venue" id="venue" />
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <Label htmlFor="venue" className="text-sm cursor-pointer">
                    Venue
                  </Label>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="online" id="online" />
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <Label htmlFor="online" className="text-sm cursor-pointer">
                    Online event
                  </Label>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="tba" id="tba" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <Label htmlFor="tba" className="text-sm cursor-pointer">
                    To be announced
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {eventData.location.type === "venue" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {/* Select country with search */}
                  <div>
                    <Label htmlFor="country" className="flex items-center gap-1">
                      Country
                      <span className="text-destructive">*</span>
                    </Label>
                    <SearchableSelect
                      ref={locationInputRef}
                      value={eventData.location.country}
                      onValueChange={(value) => {
                        console.log("Country changed to:", value)
                        // Ngăn card collapse khi đang thay đổi
                        setIsValidating(true)
                        updateLocation({ country: value, city: "" })
                        if (errors.location) {
                          setErrors({ ...errors, location: undefined })
                        }
                        setTimeout(() => setIsValidating(false), 100)
                      }}
                      options={countries}
                      placeholder="Select country"
                      searchPlaceholder="Search countries..."
                      emptyMessage="No country found."
                      loading={loading}
                      error={!!errors.location}
                      className="mt-1"
                    />
                  </div>

                  {/* Select city with search */}
                  <div>
                    <Label htmlFor="city" className="flex items-center gap-1">
                      City
                      <span className="text-destructive">*</span>
                    </Label>
                    <SearchableSelect
                      value={eventData.location.city}
                      onValueChange={(value) => {
                        console.log("City changed to:", value)
                        // Ngăn card collapse khi đang thay đổi
                        setIsValidating(true)
                        updateLocation({ city: value })
                        if (errors.location) {
                          setErrors({ ...errors, location: undefined })
                        }
                        setTimeout(() => setIsValidating(false), 100)
                      }}
                      options={cities}
                      placeholder={eventData.location.country ? "Select city" : "Select country first"}
                      searchPlaceholder="Search cities..."
                      emptyMessage="No city found."
                      disabled={!eventData.location.country}
                      loading={loading}
                      error={!!errors.location}
                      className="mt-1"
                    />
                  </div>
                </div>

                {errors.location && (
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.location}</span>
                  </div>
                )}

                {/* Add location details */}
                <div>
                  <Button
                    variant="link"
                    className="text-primary p-0 h-auto"
                    onClick={() => setShowLocationDetails(!showLocationDetails)}
                  >
                    {showLocationDetails ? "- Hide location details" : "+ Add location details"}
                  </Button>

                  {showLocationDetails && (
                    <div className="mt-4 space-y-3">
                      {/* <div>
                        <Label htmlFor="venueName">Venue Name</Label>
                        <Input
                          id="venueName"
                          placeholder="Enter venue name"
                          className="mt-1"
                          value={eventData.location.venueName}
                          onChange={(e) => updateLocation({ venueName: e.target.value })}
                        />
                      </div> */}

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="address1">Address</Label>
                          <Input
                            id="address1"
                            placeholder="Street address"
                            className="mt-1"
                            value={eventData.location.address1}
                            onChange={(e) => updateLocation({ address1: e.target.value })}
                          />
                        </div>
                        {/* <div>
                          <Label htmlFor="address2">Address 2</Label>
                          <Input
                            id="address2"
                            placeholder="Apt, suite, etc."
                            className="mt-1"
                            value={eventData.location.address2}
                            onChange={(e) => updateLocation({ address2: e.target.value })}
                          />
                        </div> */}
                      </div>

                      {/* <div>
                        <Label htmlFor="stateProvince">State/Province</Label>
                        <Input
                          id="stateProvince"
                          placeholder="e.g. California"
                          className="mt-1"
                          value={eventData.location.stateProvince}
                          onChange={(e) => updateLocation({ stateProvince: e.target.value })}
                        />
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <Label htmlFor="reserved-seating" className="text-sm font-medium">
                  Reserved seating
                </Label>
                <p className="text-xs text-muted-foreground">Use your venue map to set price tiers for each section</p>
              </div>
              <Switch id="reserved-seating" />
            </div> */}
          </CardContent>
        </Card>
      </div>
    )
  }
)

DateLocationCard.displayName = "DateLocationCard"
