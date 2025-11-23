import { useEffect, useState } from "react"
import type { OrganizerProfileForm } from "../../models/form-models/organizer-form-models"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useOrganizerViewModel } from "../../viewmodels/Organizer/settings/organizer-view-model"

interface OrganizerByCardProps {
    organizerId?: string | number
    onOrganizerChange?: (organizerId: string | number) => void
}

export function OrganizerByCard({ organizerId, onOrganizerChange }: OrganizerByCardProps) {
    const [organizers, setOrganizers] = useState<OrganizerProfileForm[]>([])
    const {
        organizers: _organizers,
    } = useOrganizerViewModel()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Mock data - Replace with actual API call to fetch organizers
        const mockOrganizers: OrganizerProfileForm[] = [
            {
                id: "1",
                name: "Tech Events Co",
                website: "https://techevents.com",
                bio: "Professional tech event organizer",
                description: "We organize the best tech conferences",
                facebookId: "",
                twitter: "",
                emailOptIn: true,
                pageUrl: "/organizer/tech-events-co",
                isUnnamed: false,
                followerCount: 5000,
                eventCount: 25,
                profileImage: "https://via.placeholder.com/40",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z",
            },
            {
                id: "2",
                name: "Sports Events Inc",
                website: "https://sportsevents.com",
                bio: "Sports enthusiast",
                description: "Organizing sports events worldwide",
                facebookId: "",
                twitter: "",
                emailOptIn: true,
                pageUrl: "/organizer/sports-events-inc",
                isUnnamed: false,
                followerCount: 3000,
                eventCount: 15,
                profileImage: "https://via.placeholder.com/40",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z",
            },
            {
                id: "3",
                name: "Community Builders",
                website: "https://communitybuilders.com",
                bio: "Building community",
                description: "Creating meaningful community experiences",
                facebookId: "",
                twitter: "",
                emailOptIn: true,
                pageUrl: "/organizer/community-builders",
                isUnnamed: false,
                followerCount: 8000,
                eventCount: 40,
                profileImage: "https://via.placeholder.com/40",
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z",
            },
        ]

        // Simulate API delay
        setTimeout(() => {
            setOrganizers(mockOrganizers)
            setIsLoading(false)
        }, 500)
    }, [])

    const selectedOrganizer = _organizers.find((org) => org.id === organizerId)

    return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Organized by</h3>

      <div className="flex flex-col gap-4">
        <Select value={selectedOrganizer?.name} onValueChange={onOrganizerChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoading ? "Loading organizers..." : "Select an organizer"} />
          </SelectTrigger>
          <SelectContent>
            {_organizers.map((org) => (
              <SelectItem key={org.id} value={org.id.toString()}>
                <div className="flex items-center gap-2">
                  <span>{org.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-sm text-muted-foreground">
          Selecting an organizer will display this event on their organizer profile page.
        </p>

        {selectedOrganizer && (
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View organizer info
          </a>
        )}
      </div>
    </div>
  )
}