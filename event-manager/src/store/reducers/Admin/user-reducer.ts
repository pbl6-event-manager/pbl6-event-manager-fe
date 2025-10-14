import { FETCH_USERS, DELETE_USER, SET_SELECTED_USER, CLEAR_SELECTED_USER } from "../../actions/Admin/user-action";
import { DEFAULT_USERS_STATE, type UserState } from "../../../models/user-models";

const userReducer = (state = DEFAULT_USERS_STATE, action: any) : UserState => {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                selectedUserEmail: null,
                users: action.payload
            }
        case SET_SELECTED_USER:
            return {
                ...state,
                selectedUserEmail: action.payload.email || null
            }
        case CLEAR_SELECTED_USER:
            return {
                ...state,
                selectedUserEmail: null
            }
        default:
            return state;
    }
}

export default userReducer;