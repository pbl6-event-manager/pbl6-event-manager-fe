import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/Admin/user-reducer";

const allReducer = combineReducers({
  user: userReducer,
}); 

export type RootState = ReturnType<typeof allReducer>;

export const store = createStore(allReducer, applyMiddleware(thunk));
