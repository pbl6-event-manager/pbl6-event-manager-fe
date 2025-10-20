import { FETCH_USERS, DELETE_USER, SET_SELECTED_USER, CLEAR_SELECTED_USER, ADD_USER_SUCCESS, ADD_USER_FAIL, ADD_USER_REQUEST, GET_ORGS_OF_AN_USER_FAILED, GET_ORGS_OF_AN_USER_REQUEST, GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS, GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS, GET_ORGS_OF_AN_USER_SUCCESS } from "../../actions/Admin/user-action";
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
        case ADD_USER_REQUEST:
            return { ...state, loading: true, error: null };

        case ADD_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };

        case ADD_USER_FAIL:
            return { ...state, loading: false, error: action.payload };

        case GET_ORGS_OF_AN_USER_REQUEST:
            return { ...state, loading: true, error: null};

        case GET_ORGS_OF_AN_USER_SUCCESS:
            return { ... state, loading: false, organizers: action.payload }

        case GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS:
            return { ...state, loading: false, activeOrganizers: action.payload };

        case GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS:
            return { ...state, loading: false, inActiveOrganizers: action.payload };

        case GET_ORGS_OF_AN_USER_FAILED:
            return { ...state, loading: false, error: action.payload };
            
        default:
            return state;
    }
}

export default userReducer;