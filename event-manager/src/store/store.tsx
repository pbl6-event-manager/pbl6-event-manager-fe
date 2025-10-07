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

const allReducer = combineReducers({
  userList: userListReducer,
  userDetail : userDetailReducer,
  event: eventReducer,
  navigation: navigationReducer,
  authFlow: authFlowReducer, 
  location: locationReducer,
  category: categoryReducer,
  auth: _authReducer,
}); 

export type RootState = ReturnType<typeof allReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = createStore(allReducer, applyMiddleware(thunk));

