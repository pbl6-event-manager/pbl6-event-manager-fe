import type { RouteObject } from "react-router-dom";
import OrganizerLayout from "../../layouts/Organizer/organizer-layout";
import CreateEventPage from "../../views/Organizer/events/create-event-page";
import OrganizerHomePage from "../../views/Organizer/organizer-home-page";
import AllEventsPage from "../../views/Organizer/events/all-events-page";
import EditEventPage from "../../views/Organizer/events/edit-event-page";
import EventDashboardPage from "../../views/Organizer/events/event-dashboard-page";
import OrganizerListPage from "../../views/Organizer/settings/organizer-list-page";
import AddOrganizerPage from "../../views/Organizer/settings/add-organizer-page";
import EditOrganzerPage from "../../views/Organizer/settings/edit-organizer-page";
import OrganizationSettingsPage from "../../views/Organizer/settings/organization-settings-page";
import CreateTicketsPage from "../../views/Organizer/events/create-ticket-page";

const OrganizerRoutes : RouteObject = {
    path: "/organizer",
    element: <OrganizerLayout/>,
    children: [
        { path: "home", element: <OrganizerHomePage /> }, // url/organizer/home
        { path: "events/all", element: <AllEventsPage /> }, // url/organizer/events
        { path: "events/create-event", element: <CreateEventPage /> }, // url/organizer/create-event
        { path: "events/edit/:eventId", element: <EditEventPage />}, // url/organizer/create-event/:id
        { path: "events/dashboard/:eventId", element: <EventDashboardPage /> },
        { path: "settings", element: <OrganizationSettingsPage />}, // url:/organizer/settings
        { path: "info", element: <OrganizerListPage />}, // url/organizer/info
        { path: "settings/add", element: <AddOrganizerPage />}, // url:/organizer/settings/add
        { path: "settings/edit/:organizerId", element: <EditOrganzerPage />}, // url:/organizer/settings/edit/:organizerId,
        { path: "events/create-tickets/:eventId", element: <CreateTicketsPage />} // url/organizer/create-tickets/:eventId
    ]
};

export default OrganizerRoutes;