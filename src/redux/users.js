import UserApiService from "src/api_services/UserApiService";

const userApiService = new UserApiService("http://localhost:8000");

// Action creators
export const REQUEST_USERS = "REQUEST_USERS";
export const RECEIVE_USERS = "RECEIVE_USERS";

function requestUsers() {
    return {
        type: REQUEST_USERS,
    };
}

function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    };
}

export function fetchUsers() {
    return function(dispatch) {
        dispatch(requestUsers());
        return userApiService.getUsers().then(response => {
            dispatch(receiveUsers(response.data));
        });
    };
}

// Reducers
const initialState = {
    items: [],
    isFetching: false,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_USERS:
            return {
                ...state,
                isFetching: false,
                items: action.users,
            };
        default:
            return state;
    }
}
