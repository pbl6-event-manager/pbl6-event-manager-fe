import type { RouteObject } from "react-router-dom";
import OrganizerLayout from "../../layouts/Organizer/organizer-layout";
import CreateEventPage from "../../views/Organizer/events/create-event-page";
import EventDetailPage from "../../views/Organizer/events/event-detail-page";
import OrganizerHomePage from "../../views/Organizer/organizer-home-page";
import AllEventsPage from "../../views/Organizer/events/all-events-page";
import OrganizationSettingsPage from "../../views/Organizer/settings/organization-settings-page";
import AddOrganizerPage from "../../views/Organizer/settings/add-organizer-page";
import EditOrganizerPage from "../../views/Organizer/settings/edit-organizer-page";
import CreateRolePage from "../../views/Organizer/settings/create-role-page";
import EditRolePage from "../../views/Organizer/settings/edit-role-page";
import VoucherListPage from "../../views/Organizer/vouchers/voucher-list-page";
import AccountSettingPage from "../../views/Organizer/accounts/account-setting-page";
import ListOrderPage from "../../views/Organizer/orders/list-order-page";
import RequireRole from "../require-role";
import PrivateRoute from "../private-routes";

const OrganizerRoutes: RouteObject = {
  path: "/organizer",
  element: (
    <RequireRole role="user">
      <PrivateRoute>
        <OrganizerLayout/>
      </PrivateRoute>
    </RequireRole>
  ),
  children: [
    { path: "home", element: <OrganizerHomePage /> },
    { path: "events/all", element: <AllEventsPage /> },
    { path: "events/create-event", element: <CreateEventPage /> },
    { path: "events/detail/:eventId", element: <EventDetailPage /> },
    { path: "settings", element: <OrganizationSettingsPage /> },
    { path: "settings/members/roles/create", element: <CreateRolePage /> },
    { path: "settings/members/roles/edit/:id", element: <EditRolePage /> },
    { path: "settings/add", element: <AddOrganizerPage /> },
    { path: "settings/edit/:organizerId", element: <EditOrganizerPage /> },
    { path: "accounts-settings", element: <AccountSettingPage /> },
    { path: "orders", element: <ListOrderPage /> },
    { path: "vouchers", element: <VoucherListPage /> },
  ],
};

export default OrganizerRoutes;
