import IssueApiService from "src/api_services/IssueApiService";

const issueApiService = new IssueApiService("http://localhost:8000");

// Action creators
export const REQUEST_ISSUES = "REQUEST_ISSUES";
export const RECEIVE_ISSUES = "RECEIVE_ISSUES";
export const ADD_ISSUE = "ADD_ISSUE";
export const UPDATE_ISSUE = "UPDATE_ISSUE";
export const DELETE_ISSUE = "DELETE_ISSUE";

function requestIssues() {
    return {
        type: REQUEST_ISSUES,
    };
}

function receiveIssues(issues) {
    return {
        type: RECEIVE_ISSUES,
        issues,
    };
}

export function fetchIssues() {
    return function(dispatch) {
        dispatch(requestIssues());
        return issueApiService.getIssues().then(response => {
            dispatch(receiveIssues(response.data));
        });
    };
}

export function addIssue(issue) {
    return {
        type: ADD_ISSUE,
        issue,
    };
}

export function updateIssue(issue) {
    return {
        type: UPDATE_ISSUE,
        issue,
    };
}

export function deleteIssue(issueId) {
    return {
        type: DELETE_ISSUE,
        issueId,
    };
}

// Reducers
const initialState = {
    items: [],
    isFetching: false,
};

export function issueReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_ISSUES:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_ISSUES:
            return {
                ...state,
                isFetching: false,
                items: action.issues,
            };
        case ADD_ISSUE:
            return {
                ...state,
                items: state.items.concat(action.issue),
            };
        case UPDATE_ISSUE:
            return {
                ...state,
                items: state.items.map(issue => (issue.id !== action.issue.id ? issue : action.issue)),
            };
        case DELETE_ISSUE:
            return {
                ...state,
                items: state.items.filter(issue => issue.id !== action.issueId),
            };
        default:
            return state;
    }
}
