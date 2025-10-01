import { SET_SELECTED_USER, CLEAR_SELECTED_USER } from "../../actions/Admin/user-action";

interface UserDetailState {
  selectedUserEmail: string | null;
}

const initialState: UserDetailState = {
  selectedUserEmail: null,
};

const userDetailReducer = (state = initialState, action: any): UserDetailState => {
  switch (action.type) {
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUserEmail: action.payload.email || null,
      };
    case CLEAR_SELECTED_USER:
      return {
        ...state,       
        selectedUserEmail: null,
      };
    default:
      return state;
  }
};

export default userDetailReducer;