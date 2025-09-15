import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userListReducer } from "./reducers/Admin/user-list-reducer";
import userDetailReducer from "./reducers/Admin/user-detail-reducers";
import eventReducer from "./reducers/Admin/event-reducer";

const allReducer = combineReducers({
  userList: userListReducer,
  userDetail : userDetailReducer,
  event: eventReducer,
}); 

export type RootState = ReturnType<typeof allReducer>;

export const store = createStore(allReducer, applyMiddleware(thunk));
