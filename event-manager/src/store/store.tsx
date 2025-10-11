import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userListReducer } from "./reducers/Admin/user-list-reducer";
import { _authReducer } from "./reducers/auth-reducer";
import userDetailReducer from "./reducers/Admin/user-detail-reducers";
import { navigationReducer } from "./reducers/common/navigation-reducer";
import { authFlowReducer } from "./reducers/auth-flow-reducer";
import eventReducer from "./reducers/Admin/event-reducer";
import { locationReducer } from "./reducers/Admin/location-reducer";
import categoryReducer from "./reducers/Admin/category-reducer";
import organizerEventReducer from "./reducers/Organizer/event-reducer";
import organizerReducer from "./reducers/Organizer/organizer-reducer"

const allReducer = combineReducers({
  userList: userListReducer,
  userDetail : userDetailReducer,
  event: eventReducer,
  //auth: authReducer,
  navigation: navigationReducer,
  authFlow: authFlowReducer, 
  location: locationReducer,
  category: categoryReducer,
  _auth: _authReducer,
  organizerEvent: organizerEventReducer,
  organizer: organizerReducer,
}); 

export const store = createStore(allReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof allReducer>;
export type AppDispatch = typeof store.dispatch;

