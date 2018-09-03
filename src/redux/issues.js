import IssueApiService from "../api_services/IssueApiService";

const issueApiService = new IssueApiService("/api");

// Constants
export const actionTypes = {
    FETCH_ISSUES_START: "FETCH_ISSUES_START",
    FETCH_ISSUES_SUCCESS: "FETCH_ISSUES_SUCCESS",

    CREATE_ISSUE_START: "CREATE_ISSUE_START",
    CREATE_ISSUE_SUCCESS: "CREATE_ISSUE_SUCCESS",

    UPDATE_ISSUE_START: "UPDATE_ISSUE_START",
    UPDATE_ISSUE_SUCCESS: "UPDATE_ISSUE_SUCCESS",

    DELETE_ISSUE_START: "DELETE_ISSUE_START",
    DELETE_ISSUE_SUCCESS: "DELETE_ISSUE_SUCCESS",
};

// Actions
const requestIssues = () => ({
    type: actionTypes.FETCH_ISSUES_START,
});

const receiveIssues = issues => ({
    type: actionTypes.FETCH_ISSUES_SUCCESS,
    issues,
});

export function fetchIssues() {
    return function(dispatch) {
        dispatch(requestIssues());
        return issueApiService.getIssues().then(response => {
            dispatch(receiveIssues(response.data));
        });
    };
}

const requestAddIssue = () => ({
    type: actionTypes.CREATE_ISSUE_START,
});

const receiveAddIssue = issue => ({
    type: actionTypes.CREATE_ISSUE_SUCCESS,
    issue,
});

export function addIssue(issue) {
    return function(dispatch) {
        dispatch(requestAddIssue());
        return issueApiService.postIssue(issue).then(response => {
            dispatch(receiveAddIssue(response.data));
        });
    };
}

const requestUpdateIssue = () => ({
    type: actionTypes.UPDATE_ISSUE_START,
});

const receiveUpdateIssue = issue => ({
    type: actionTypes.UPDATE_ISSUE_SUCCESS,
    issue,
});

export function updateIssue(issue) {
    return function(dispatch) {
        dispatch(requestUpdateIssue());
        return issueApiService.putIssue(issue).then(response => {
            dispatch(receiveUpdateIssue(response.data));
        });
    };
}

const requestDeleteIssue = () => ({
    type: actionTypes.DELETE_ISSUE_START,
});

const receiveDeleteIssue = issueId => ({
    type: actionTypes.DELETE_ISSUE_SUCCESS,
    issueId,
});

export function deleteIssue(issueId) {
    return function(dispatch) {
        dispatch(requestDeleteIssue());
        return issueApiService.deleteIssue(issueId).then(() => {
            dispatch(receiveDeleteIssue(issueId));
        });
    };
}

// Reducers
const initialState = {
    items: [],
    isFetching: false,
};

export function issueReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ISSUES_START:
        case actionTypes.CREATE_ISSUE_START:
        case actionTypes.UPDATE_ISSUE_START:
        case actionTypes.DELETE_ISSUE_START:
            return {
                ...state,
                isFetching: true,
            };
        case actionTypes.FETCH_ISSUES_SUCCESS:
            return {
                isFetching: false,
                items: action.issues,
            };
        case actionTypes.CREATE_ISSUE_SUCCESS:
            return {
                isFetching: false,
                items: state.items.concat(action.issue),
            };
        case actionTypes.UPDATE_ISSUE_SUCCESS:
            return {
                isFetching: false,
                items: state.items.map(issue => (issue.id !== action.issue.id ? issue : action.issue)),
            };
        case actionTypes.DELETE_ISSUE_SUCCESS:
            return {
                isFetching: false,
                items: state.items.filter(issue => issue.id !== action.issueId),
            };
        default:
            return state;
    }
}
