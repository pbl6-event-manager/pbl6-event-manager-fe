import type { AttendeeListDto } from "../../dtos/attendee-dto";
import type { OrderListDto } from "../../dtos/order-dto";

export interface EventAttendeePageProps  {
  filteredAttendees: AttendeeListDto[] | undefined;
  filterCheckIn: string | undefined;
  setFilterCheckIn: (s: string) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  checkedInCount: number | undefined;
  totalCount: number;
  handleCheckIn: (s: string) => void;
};

export interface EventOrderPageProps {
  orders: OrderListDto[] | undefined;
  totalCount: number;
  totalRevenue: number;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filterStatus: string;
  setFilterStatus: (s: string) => void;
  handleViewDetails: (order?: OrderListDto) => void;
  isDetailsOpen: boolean;
  setIsDetailsOpen: (b: boolean) => void;
  selectedOrder?: OrderListDto;
  totalTicket: number;
  statusText: (s: string) => string;
  statusColor: (s: string) => void;
};

