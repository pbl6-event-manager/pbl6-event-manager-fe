import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducers/auth-reducer";
import { authFlowReducer } from "./reducers/auth-flow-reducer";
import { eventReducer } from "./reducers/event-reducer";
import { locationReducer } from "./reducers/location-reducer";
import { categoryReducer } from "./reducers/category-reducer";
import { organizerReducer } from "./reducers/organizer-reducer";
import { userReducer } from "./reducers/user-reducer";
import { staffReducer } from "./reducers/staff-reducer";
import { roleReducer } from "./reducers/role-staff-reducer";
import { permissionReducer } from "./reducers/permission-reducer";
import { ticketReducer } from "./reducers/ticket-reducer";

const allReducer = combineReducers({
  userReducer: userReducer,
  authReducer: authReducer,
  eventReducer: eventReducer,
  authFlowReducer: authFlowReducer,
  locationReducer: locationReducer,
  categoryReducer: categoryReducer,
  organizerReducer: organizerReducer,
  staffReducer: staffReducer,
  roleReducer: roleReducer,
  permissionReducer: permissionReducer,
  ticketReducer: ticketReducer,
});

export const store = createStore(allReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof allReducer>;
export type AppDispatch = typeof store.dispatch;
