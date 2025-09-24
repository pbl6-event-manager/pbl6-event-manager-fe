import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userListReducer } from "./reducers/Admin/user-list-reducer";
import { authReducer } from "./reducers/common/auth-reducer";
import userDetailReducer from "./reducers/Admin/user-detail-reducers";
import { navigationReducer } from "./reducers/common/navigation-reducer";
import { authFlowReducer } from "./reducers/common/auth-flow-reducer";
import eventReducer from "./reducers/Admin/event-reducer";

const allReducer = combineReducers({
  userList: userListReducer,
  userDetail : userDetailReducer,
  event: eventReducer,
  auth: authReducer,
  navigation: navigationReducer,
  authFlow: authFlowReducer, 
}); 

export type RootState = ReturnType<typeof allReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = createStore(allReducer, applyMiddleware(thunk));

