import { FETCH_USERS_REQUEST, FETCH_USERS_FAILED, FETCH_USERS_SUCSESS, SET_SELECTED_USER, CLEAR_SELECTED_USER, ADD_USER_SUCCESS, ADD_USER_FAIL, ADD_USER_REQUEST, GET_ORGS_OF_AN_USER_FAILED, GET_ORGS_OF_AN_USER_REQUEST, GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS, GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS, GET_ORGS_OF_AN_USER_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_STATUS_USER_REQUEST, UPDATE_STATUS_USER_SUCCESS, UPDATE_STATUS_USER_FAILED, GET_USER_BY_EMAIL_REQUEST, GET_USER_BY_EMAIL_SUCCESS, GET_USER_BY_EMAIL_FAILED } from "../../actions/Admin/user-action";
import { DEFAULT_USERS_STATE, type UserState } from "../../../models/user-models";

const userReducer = (state = DEFAULT_USERS_STATE, action: any) : UserState => {
    switch (action.type) {
        case FETCH_USERS_SUCSESS:
            return { ...state, loading: true, users: action.payload};
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true, error: null};
        case FETCH_USERS_FAILED:
            return { ...state, loading: false, error: action.payload};
        case UPDATE_STATUS_USER_SUCCESS:
            return { ...state, loading: false, selectedUserEmail: null, users: action.payload};
        case UPDATE_STATUS_USER_REQUEST:
            return { ...state, loading: true, error: null};
        case UPDATE_STATUS_USER_FAILED:
            return { ...state, loading: false, error: action.payload};
        case SET_SELECTED_USER:
            return { ...state, selectedUserEmail: action.payload.email || null};
        case CLEAR_SELECTED_USER:
            return { ...state, selectedUserEmail: null};
        case ADD_USER_REQUEST:
            return { ...state, loading: true, error: null};
        case ADD_USER_SUCCESS:
            return { ...state, loading: false, users: action.payload};
        case ADD_USER_FAIL:
            return { ...state, loading: false, error: action.payload};
        case GET_ORGS_OF_AN_USER_REQUEST:
            return { ...state, loading: true, error: null};
        case GET_ORGS_OF_AN_USER_SUCCESS:
            return { ... state, loading: false, organizers: action.payload};
        case GET_ACTIVE_ORGS_OF_AN_USER_SUCCESS:
            return { ...state, loading: false, activeOrganizers: action.payload};
        case GET_INACTIVE_ORGS_OF_AN_USER_SUCCESS:
            return { ...state, loading: false, inActiveOrganizers: action.payload};
        case GET_ORGS_OF_AN_USER_FAILED:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_USER_REQUEST:
            return { ...state, loading: true, error: null};
        case UPDATE_USER_SUCCESS:
            return { ...state, loading: false, users: action.payload};
        case UPDATE_USER_FAILED:
            return { ...state, loading: false, error: action.payload};
        case GET_USER_BY_EMAIL_REQUEST:
            return { ...state, loading: true, error: null};
        case GET_USER_BY_EMAIL_SUCCESS:
            return { ...state, loading: false, user: action.payload};
        case GET_USER_BY_EMAIL_FAILED:
            return { ...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default userReducer;