import { DollarSign, Pencil, Ticket, TicketIcon, Users } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { EventDashboardSectionProps } from "../../../models/component-props/section-props";
import { Badge } from "../../../components/ui/badge";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EventDashboardPage: React.FC<EventDashboardSectionProps> = ({
  setCurrentSection,
  eventData,
  getStatusColor,
  ticketInfo,
  revenueInfo,
  attendeeInfo,
  orderStats
}) => {
  return (
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg" />
                <div>
                  <h1 className="text-2xl font-bold">{eventData?.title}</h1>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <span>📅</span> {eventData?.startDate}{" "}
                    {eventData?.startTime} - {eventData?.endDate}{" "}
                    {eventData?.endTime} ({eventData.timezone})
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={getStatusColor(eventData.status)}
              >
                {eventData.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentSection(1)}
                className="cursor-pointer"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-stretch">
          <Card className="h-full">
            <CardHeader className="flex items-center justify-between pb-2 px-6">
              <CardTitle className="text-sm font-medium">
                Ticket sold
              </CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-6 py-4 flex flex-col justify-center">
              <div className="text-2xl font-semibold">
                {ticketInfo?.soldTicket} / {ticketInfo?.totalTicket}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {ticketInfo?.paidTicket} paid | {ticketInfo?.freeTicket} free
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="flex items-center justify-between pb-2 px-6">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-6 py-4 flex flex-col justify-center">
              <div className="text-2xl font-semibold">
                ${revenueInfo}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                From all orders
              </p>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="flex items-center justify-between pb-2 px-6">
              <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-6 py-4 flex flex-col justify-center">
              <div className="text-2xl font-semibold">{attendeeInfo}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered for event</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader className="px-6 border-b">
            <CardTitle className="text-base font-semibold">Sales by ticket type</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {ticketInfo?.ticketTypes && ticketInfo.ticketTypes.length > 0 ? (
              <div className="divide-y">
                {ticketInfo.ticketTypes.map((ticket: any, index: number) => {
                  const percentage = ticket.total > 0 ? ((ticket.sold ?? 0) / ticket.total) * 100 : 0;
                  const revenue = (ticket.sold ?? 0) * (ticket.price ?? 0);
                  
                  return (
                    <div key={index} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0">
                            <TicketIcon></TicketIcon>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-base truncate">{ticket.name}</p>
                              {ticket.type === 'FREE' && (
                                <Badge variant="secondary" className="text-xs px-2 py-0">Free</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ${ticket.price.toFixed(2)} per ticket
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-lg mb-1">
                            {ticket.sold ?? 0}<span className="text-muted-foreground font-normal text-sm"> / {ticket.total ?? 0}</span>
                          </p>
                          <p className="text-sm font-medium text-green-600">
                            ${revenue.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{percentage.toFixed(1)}% sold</span>
                          <span>{ticket.total - (ticket.sold ?? 0)} remaining</span>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-sm"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <div className="text-5xl">🎟️</div>
                </div>
                <p className="text-base font-medium text-gray-900 mb-1">No tickets created yet</p>
                <p className="text-sm text-muted-foreground">
                  Create your first ticket to start selling
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-6 py-4 border-b">
            <CardTitle className="text-base font-semibold">Order Statistics (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-6">
            {orderStats && orderStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={orderStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="line"
                  />
                  <Bar 
                    dataKey="total" 
                    fill="#94a3b8" 
                    radius={[8, 8, 0, 0]}
                    name="Total Orders"
                    barSize={40}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paid" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Paid"
                    dot={{ fill: "#10b981", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pending" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    name="Pending"
                    dot={{ fill: "#f59e0b", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="canceled" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Canceled"
                    dot={{ fill: "#ef4444", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <div className="text-5xl">📊</div>
                </div>
                <p className="text-base font-medium text-gray-900 mb-1">No order data available</p>
                <p className="text-sm text-muted-foreground">
                  Order statistics will appear here once you have orders
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDashboardPage;
