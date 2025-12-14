import { useParams, useNavigate } from "react-router-dom"
import { Copy, ExternalLink, Pencil } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import type { EventDashboardSectionProps } from "../../../models/component-props/section-props"

const EventDashboardPage: React.FC<EventDashboardSectionProps> = ({setCurrentSection}) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  const event = {
    id: eventId,
    title: "Chung kết LCP",
    date: "Sat, Oct 17, 2026, 10:00 AM",
    status: "Draft",
    link: `https://www.eventbrite.com/e/chung-ket-lcp-tickets-${eventId}`,
    ticketsSold: 0,
    totalTickets: 0,
    pageViews: 0,
    paidTickets: 0,
    freeTickets: 0,
  }

  const copyLink = () => {
    navigator.clipboard.writeText(event.link)
  }

  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg" />
                <div>
                  <h1 className="text-2xl font-bold">{event.title}</h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>📅</span> {event.date}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded px-3 py-2 text-sm">
                <option>{event.status}</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => setCurrentSection(1)} className="cursor-pointer">
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium">Event link</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline truncate"
              >
                {event.link}
              </a>
            </div>
            <Button variant="outline" size="sm" onClick={copyLink} className="cursor-pointer">
              <Copy className="h-4 w-4 mr-2" />
              Copy link
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Tickets Sold</h3>
              <p className="text-4xl font-bold mb-1">
                {event.ticketsSold}/{event.totalTickets}
              </p>
              <p className="text-sm text-muted-foreground">
                {event.paidTickets} paid • {event.freeTickets} free
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Page Views</h3>
              <p className="text-4xl font-bold mb-1">{event.pageViews}</p>
              <Button variant="link" className="text-blue-600 p-0 h-auto text-sm">
                Open page views report
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent>
            <h3 className="font-semibold mb-4">Sales by ticket type</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-4">🎟️</div>
              <p className="text-muted-foreground">No tickets for this event yet</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start bg-transparent cursor-pointer">
                <span className="mr-2">👥</span>
                Attendees report
              </Button>
              <Button variant="outline" className="justify-start bg-transparent cursor-pointer">
                <span className="mr-2">📋</span>
                Order form responses
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-semibold mb-4">Recent Orders</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-muted-foreground mb-4">No orders for this event yet</p>
              <Button variant="link" className="text-blue-600 cursor-pointer" onClick={() => navigate("/organizer/orders")}>
                Go to all Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default EventDashboardPage;