import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlertCircle, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface EventAccessGuardProps {
  isLoading: boolean
  isOwner: boolean
  isStaff: boolean
  eventId: number | null
  children: React.ReactNode
  redirectPath?: string
}

export const EventAccessGuard: React.FC<EventAccessGuardProps> = ({
  isLoading,
  isOwner,
  isStaff,
  eventId,
  children,
  redirectPath = "/organizer/events/all",
}) => {
  const navigate = useNavigate()
  const [showUnauthorized, setShowUnauthorized] = useState(false)

  useEffect(() => {
    // Wait for loading to complete
    if (!isLoading && eventId) {
      // Check if user has no access (not owner and not staff)
      const hasAccess = isOwner || isStaff

      if (!hasAccess) {
        setShowUnauthorized(true)
      } else {
        setShowUnauthorized(false)
      }
    }
  }, [isLoading, isOwner, isStaff, eventId])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking access permissions...</p>
        </div>
      </div>
    )
  }

  // Show unauthorized state
  if (showUnauthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <Lock className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this event</p>
          </div>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unauthorized Access</AlertTitle>
            <AlertDescription>
              You are not a staff member or owner of this event. Please contact the event owner if you believe this is a
              mistake.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={() => navigate(redirectPath)} className="flex-1" variant="default">
              Go to Events
            </Button>
            <Button onClick={() => navigate(-1)} className="flex-1" variant="outline">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // User has access - render children
  return <>{children}</>
}