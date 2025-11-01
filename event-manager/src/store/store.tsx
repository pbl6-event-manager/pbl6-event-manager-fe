import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/auth-reducer";
import { navigationReducer } from "./reducers/common/navigation-reducer";
import { authFlowReducer } from "./reducers/auth-flow-reducer";
import eventReducer from "./reducers/Admin/event-reducer";
// import createEventReducer from "./reducers/Organizer/create-event-reducer";
import { locationReducer } from "./reducers/Admin/location-reducer";
import categoryReducer from "./reducers/Admin/category-reducer";
import organizerEventReducer from "./reducers/Organizer/event-reducer";
import organizerReducer from "./reducers/Organizer/organizer-reducer"
import userReducer from "./reducers/Admin/user-reducer";
import eventTeamManagementReducer from "./reducers/Organizer/event-team-management-reducer";
import organizerTeamManagementReducer from "./reducers/Organizer/organizer-team-management-reducer";
import { roleReducer } from "./reducers/Organizer/role-reducer";

const allReducer = combineReducers({
  userReducer: userReducer,
  event: eventReducer,  
  navigation: navigationReducer,
  authFlow: authFlowReducer, 
  location: locationReducer,
  category: categoryReducer,
  organizerEvent: organizerEventReducer,
  auth: authReducer,
  organizer: organizerReducer,
  eventTeamManagement: eventTeamManagementReducer,
  organizerTeamManagement: organizerTeamManagementReducer,
  role: roleReducer,
  // createEvent: createEventReducer,
}); 

export const store = createStore(allReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof allReducer>;
export type AppDispatch = typeof store.dispatch;

