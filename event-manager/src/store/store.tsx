import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/Admin/user-reducer";
import { authReducer } from "./reducers/common/auth-reducer";
import { navigationReducer } from "./reducers/common/navigation-reducer";
import { authFlowReducer } from "./reducers/common/auth-flow-reducer";

const allReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  navigation: navigationReducer,
  authFlow: authFlowReducer, 
}); 

export type RootState = ReturnType<typeof allReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = createStore(allReducer, applyMiddleware(thunk));

