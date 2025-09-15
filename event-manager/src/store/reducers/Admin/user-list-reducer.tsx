import { FETCH_USERS } from "../../actions/Admin/user-action";

interface UserState {
  users: any[];
}

const initialState: UserState = {
  users: [],
};

export const userListReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
