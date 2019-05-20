import { issueService } from "../api_services/index";

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
        return issueService.getIssues().then(response => {
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
        return issueService.postIssue(issue).then(response => {
            dispatch(receiveAddIssue({ ...issue, id: response.data.id }));
        });
    };
}

const requestUpdateIssue = issue => ({
    type: actionTypes.UPDATE_ISSUE_START,
    issue,
});

const receiveUpdateIssue = issue => ({
    type: actionTypes.UPDATE_ISSUE_SUCCESS,
    issue,
});

export function updateIssue(issue) {
    return function(dispatch) {
        dispatch(requestUpdateIssue(issue));
        return issueService.putIssue(issue).then(response => {
            dispatch(receiveUpdateIssue(issue));
        });
    };
}

const requestDeleteIssue = issueId => ({
    type: actionTypes.DELETE_ISSUE_START,
    issueId,
});

const receiveDeleteIssue = issueId => ({
    type: actionTypes.DELETE_ISSUE_SUCCESS,
    issueId,
});

export function deleteIssue(issueId) {
    return function(dispatch) {
        dispatch(requestDeleteIssue(issueId));
        return issueService.deleteIssue(issueId).then(() => {
            dispatch(receiveDeleteIssue(issueId));
        });
    };
}

// Reducers
const initialState = {
    items: [],
    isFetching: false,
    isInitialDataFetched: false,
};

export function issueReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ISSUES_START:
        case actionTypes.CREATE_ISSUE_START:
            // UI needs to wait data before update
            return {
                ...state,
                isFetching: true,
            };
        case actionTypes.FETCH_ISSUES_SUCCESS:
            return {
                isFetching: false,
                isInitialDataFetched: true,
                items: action.issues,
            };
        case actionTypes.CREATE_ISSUE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: state.items.concat(action.issue),
            };
        case actionTypes.UPDATE_ISSUE_START:
            // let UI update without delay
            return {
                ...state,
                isFetching: true,
                items: state.items.map(issue => (issue.id !== action.issue.id ? issue : action.issue)),
            };
        case actionTypes.UPDATE_ISSUE_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        case actionTypes.DELETE_ISSUE_START:
            // let UI update without delay
            return {
                ...state,
                isFetching: true,
                items: state.items.filter(issue => issue.id !== action.issueId),
            };
        case actionTypes.DELETE_ISSUE_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
}
