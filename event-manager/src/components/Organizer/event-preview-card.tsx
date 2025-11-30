import { ExternalLink, Calendar1, Clock, Pin, CircleDollarSign, Camera, UsersRound } from "lucide-react"
import { formatDateRange } from "../../utils/Organizer/date-format"
import type { EventPreviewCardProps } from "../../models/component-props/card-component-props"

export function EventPreviewCard({ eventData, mediaFile }: EventPreviewCardProps) {
    const imageFiles = mediaFile?.filter((f) => f.type === "image") || []
    return (
        <div className="bg-card border rounded-lg overflow-hidden">
            {/* Event Banner */}
            <div className="bg-gray-900 h-48 flex items-center justify-center">
                {imageFiles.length > 0 ? (
                    <img
                        src={imageFiles[0]?.preview || "../../assets/react.svg"}
                        alt="Event banner"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-600 text-center">
                        <Camera className="h-8 w-8 mb-2" />
                        <p className="text-sm">No banner image</p>
                    </div>
                )}
            </div>

            {/* Event Details */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{eventData.title || "Event Title"}</h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                        <Calendar1 className="h-4 w-4" />
                        <span>{formatDateRange(eventData.startDate || "", eventData.endDate || "", eventData.startTime || "", eventData.endTime || "")}</span>
                    </div>

                    {!eventData.endDate && (
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>
                                {eventData.startTime || "TBA"} - {eventData.endTime || "TBA"}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Pin className="h-4 w-4" />
                        <span>
                            {eventData.location?.address1 || "TBA"}, {eventData.location?.city || ""},{" "}
                            {eventData.location?.country || ""}
                        </span>
                    </div>
                </div>

                {/* Ticket Info */}
                <div className="flex items-center gap-4 text-sm mb-4 py-3 border-t border-b">
                    {eventData.ticketType && eventData.ticketType.length > 0 ? (
                        <>
                            <div className="flex items-center gap-1">
                                <CircleDollarSign className="h-4 w-4" />
                                <span className="font-semibold">${eventData.ticketType[0].price || "0.00"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <UsersRound className="h-4 w-4" />
                                <span className="font-semibold">{eventData.capacity || "0"}</span>
                            </div>
                        </>
                    ) : (
                        <span className="text-muted-foreground">No tickets configured</span>
                    )}
                </div>

                {/* Preview Link */}
                <a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Preview
                    <ExternalLink className="h-4 w-4" />
                </a>
            </div>
        </div>
    )
}