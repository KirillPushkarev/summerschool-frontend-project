import { actionTypes, issueReducer } from "../../src/redux/issues";

describe("issue reducer", () => {
    it("should return the initial state", () => {
        expect(issueReducer(undefined, {})).toEqual({
            items: [],
            isFetching: false,
            isInitialDataFetched: false,
        });
    });

    it("should handle FETCH_ISSUES_START", () => {
        expect(
            issueReducer(
                {
                    items: [],
                    isFetching: false,
                    isInitialDataFetched: false,
                },
                {
                    type: actionTypes.FETCH_ISSUES_START,
                },
            ),
        ).toEqual({
            items: [],
            isFetching: true,
            isInitialDataFetched: false,
        });
    });

    it("should handle FETCH_ISSUES_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [],
                    isFetching: true,
                    isInitialDataFetched: false,
                },
                {
                    type: actionTypes.FETCH_ISSUES_SUCCESS,
                    issues: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                        { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                    ],
                },
            ),
        ).toEqual({
            items: [
                { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
            ],
            isFetching: false,
            isInitialDataFetched: true,
        });
    });

    it("should handle CREATE_ISSUE_START", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                    ],
                    isFetching: false,
                    isInitialDataFetched: true,
                },
                {
                    type: actionTypes.CREATE_ISSUE_START,
                },
            ),
        ).toEqual({
            items: [{ id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 }],
            isFetching: true,
            isInitialDataFetched: true,
        });
    });

    it("should handle CREATE_ISSUE_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                    ],
                    isFetching: true,
                    isInitialDataFetched: true,
                },
                {
                    type: actionTypes.CREATE_ISSUE_SUCCESS,
                    issue: { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                },
            ),
        ).toEqual({
            items: [
                { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
            ],
            isFetching: false,
            isInitialDataFetched: true,
        });
    });

    it("should handle UPDATE_ISSUE_START", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                        { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                    ],
                    isFetching: false,
                    isInitialDataFetched: true,
                },
                {
                    type: actionTypes.UPDATE_ISSUE_START,
                    issue: {
                        id: 1,
                        name: "Issue 1",
                        description: "Very important issue",
                        priority: "High",
                        assigneeId: 2,
                    },
                },
            ),
        ).toEqual({
            items: [
                { id: 1, name: "Issue 1", description: "Very important issue", priority: "High", assigneeId: 2 },
                { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
            ],
            isFetching: true,
            isInitialDataFetched: true,
        });
    });

    it("should handle UPDATE_ISSUE_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [
                        {
                            id: 1,
                            name: "Issue 1",
                            description: "Very important issue",
                            priority: "High",
                            assigneeId: 2,
                        },
                        { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                    ],
                    isFetching: true,
                    isInitialDataFetched: true,
                },
                {
                    type: actionTypes.UPDATE_ISSUE_SUCCESS,
                    issue: {
                        id: 1,
                        name: "Issue 1",
                        description: "Very important issue",
                        priority: "High",
                        assigneeId: 2,
                    },
                },
            ),
        ).toEqual({
            items: [
                { id: 1, name: "Issue 1", description: "Very important issue", priority: "High", assigneeId: 2 },
                { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
            ],
            isFetching: false,
            isInitialDataFetched: true,
        });
    });

    it("should handle DELETE_ISSUE_START", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                        { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                    ],
                    isFetching: false,
                    isInitialDataFetched: true,
                },
                {
                    type: actionTypes.DELETE_ISSUE_START,
                    issueId: 2,
                },
            ),
        ).toEqual({
            items: [{ id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 }],
            isFetching: true,
            isInitialDataFetched: true,
        });
    });

    it("should handle DELETE_ISSUE_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                    ],
                    isFetching: true,
                    isInitialDataFetched: true,
                },
                {
                    type: actionTypes.DELETE_ISSUE_SUCCESS,
                    issueId: 2,
                },
            ),
        ).toEqual({
            items: [{ id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 }],
            isFetching: false,
            isInitialDataFetched: true,
        });
    });
});
