// Constants
export const actionTypes = {
    AUTH_START: "AUTH_START",
    AUTH_SUCCESS: "AUTH_SUCCESS",
    AUTH_FAIL: "AUTH_FAIL",
    LOGOUT: "LOGOUT",
};

// Action creators
export function startAuth() {
    return {
        type: actionTypes.AUTH_START,
    };
}

export function successAuth() {
    return {
        type: actionTypes.AUTH_SUCCESS,
    };
}

export function failAuth() {
    return {
        type: actionTypes.AUTH_FAIL,
    };
}

export function logout() {
    return {
        type: actionTypes.LOGOUT,
    };
}

// Reducers
const initialState = {
    inProgress: false,
    isAuthenticated: false,
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                inProgress: true,
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                inProgress: false,
                isAuthenticated: true,
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                inProgress: false,
                isAuthenticated: false,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                inProgress: false,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
