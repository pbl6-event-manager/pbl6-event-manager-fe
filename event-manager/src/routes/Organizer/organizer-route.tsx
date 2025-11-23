import type { RouteObject } from "react-router-dom"
import OrganizerLayout from "../../layouts/Organizer/organizer-layout"
import CreateEventPage from "../../views/Organizer/events/create-event-page"
import CreateTicketsPage from "../../views/Organizer/events/create-ticket-page"
import EditEventPage from "../../views/Organizer/events/edit-event-page"
import OrganizerHomePage from "../../views/Organizer/organizer-home-page"
import AllEventsPage from "../../views/Organizer/events/all-events-page"
import EventDashboardPage from "../../views/Organizer/events/event-dashboard-page"
import OrganizationSettingsPage from "../../views/Organizer/settings/organization-settings-page" 
import AddOrganizerPage from "../../views/Organizer/settings/add-organizer-page"
import EditOrganizerPage from "../../views/Organizer/settings/edit-organizer-page"
import TeamManagementPage from "../../views/Organizer/settings/team-management-page" 
import RolesListPage from "../../views/Organizer/settings/roles-list-page"
import EventTeamManagementPage from "../../views/Organizer/events/event-team-management-page"
import CreateRolePage from "../../views/Organizer/settings/create-role-page"
import EditRolePage from "../../views/Organizer/settings/edit-role-page"
import StaffsListPage from "../../views/Organizer/settings/staffs-list-page"
import AccountSettingPage from "../../views/Organizer/accounts/account-setting-page"
import ListOrderPage from "../../views/Organizer/orders/list-order-page"
import VoucherListPage from "../../views/Organizer/vouchers/voucher-list-page"

const OrganizerRoutes: RouteObject = {
  path: "/organizer",
  element: <OrganizerLayout />,
  children: [
    { path: "home", element: <OrganizerHomePage /> },
    { path: "events/all", element: <AllEventsPage /> },
    { path: "events/create-event", element: <CreateEventPage /> },
    { path: "events/create-tickets/:eventId", element: <CreateTicketsPage /> },
    { path: "events/dashboard/:eventId", element: <EventDashboardPage /> },
    { path: "events/team-management/:eventId", element: <EventTeamManagementPage /> },
    { path: "events/edit/:eventId", element: <EditEventPage /> },
    { path: "settings", element: <OrganizationSettingsPage /> },
    { path: "settings/members/roles/create", element: <CreateRolePage/>},
    { path: "settings/members/roles/edit/:id", element: <EditRolePage/>},
    { path: "settings/add", element: <AddOrganizerPage/>},
    { path: "settings/edit/:organizerId", element: <EditOrganizerPage/>},
    { path: "settings/members/roles", element: <RolesListPage /> },
    { path: "settings/members/staffs", element: <StaffsListPage /> },
    { path: "accounts-settings", element: <AccountSettingPage />},
    { path: "orders", element: <ListOrderPage />},
    { path: "vouchers", element: <VoucherListPage />},
    // {
    //   path: "settings",
    //   element: <OrganizationSettingsPage />,
    //   children: [
    //     { index: true, element: <OrganizationSettingsPage /> },
    //     { path: "info", element: <OrganizationSettingsPage /> },
    //     {
    //       path: "members",
    //       element: <TeamManagementPage />,
    //       children: [
    //         { index: true, element: <UsersListPage /> },
    //         { path: "users", element: <UsersListPage /> },
    //         { path: "roles", element: <RolesListPage /> },
    //         { path: "roles/create", element: <CreateRolePage /> },
    //       ],
    //     },
    //     { path: "fees", element: <OrganizationSettingsPage /> },
    //     { path: "plan", element: <OrganizationSettingsPage /> },
    //     { path: "extensions", element: <OrganizationSettingsPage /> },
    //     { path: "add", element: <AddOrganizerPage /> },
    //     { path: "edit/:organizerId", element: <EditOrganizerPage /> },
    //   ],
    // },
  ],
}

export default OrganizerRoutes
