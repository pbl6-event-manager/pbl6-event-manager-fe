import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useOrganizerViewModel } from "../../viewmodels/Organizer/settings/organizer-view-model"

interface OrganizerByCardProps {
    organizerId?: number
    onOrganizerChange?: (organizerId: number) => void
}

export function OrganizerByCard({ organizerId, onOrganizerChange }: OrganizerByCardProps) {
    const {
        organizers,
        loading: isLoading,
    } = useOrganizerViewModel()
    
    const selectedOrganizer = organizers.find(org => org.id === organizerId) || null;

    return (
    <div className="bg-card border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Organized by</h3>

      <div className="flex flex-col gap-4">
        <Select value={organizers.find(org => org.id === organizerId)?.id.toString()} onValueChange={value => onOrganizerChange?.(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoading ? "Loading organizers..." : "Select an organizer"} />
          </SelectTrigger>
          <SelectContent>
            {organizers.map((org) => (
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