import type { RouteObject } from "react-router-dom";
import OrganizerLayout from "../../layouts/Organizer/organizer-layout";
import CreateEventPage from "../../views/Organizer/events/create-event-page";
import OrganizerHomePage from "../../views/Organizer/organizer-home-page";
import AllEventsPage from "../../views/Organizer/events/all-events-page";

const OrganizerRoutes : RouteObject = {
    path: "/organizer",
    element: <OrganizerLayout/>,
    children: [
        { path: "home", element: <OrganizerHomePage /> }, // /organizer/home
        { path: "events/all", element: <AllEventsPage /> }, // /organizer/events
        { path: "events/create-event", element: <CreateEventPage /> } // /organizer/create-event
    ]
};

export default OrganizerRoutes;