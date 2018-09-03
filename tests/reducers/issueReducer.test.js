import { actionTypes, issueReducer } from "../../src/redux/issues";

describe("issue reducer", () => {
    it("should return the initial state", () => {
        expect(issueReducer(undefined, {})).toEqual({
            items: [],
            isFetching: false,
        });
    });

    it("should handle FETCH_ISSUES_START", () => {
        expect(
            issueReducer(
                {
                    items: [],
                    isFetching: false,
                },
                {
                    type: actionTypes.FETCH_ISSUES_START,
                },
            ),
        ).toEqual({
            items: [],
            isFetching: true,
        });
    });

    it("should handle FETCH_ISSUES_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [],
                    isFetching: true,
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
                },
                {
                    type: actionTypes.CREATE_ISSUE_START,
                },
            ),
        ).toEqual({
            items: [{ id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 }],
            isFetching: true,
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
                },
                {
                    type: actionTypes.UPDATE_ISSUE_START,
                },
            ),
        ).toEqual({
            items: [
                { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
            ],
            isFetching: true,
        });
    });

    it("should handle UPDATE_ISSUE_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                        { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                    ],
                    isFetching: true,
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
                },
                {
                    type: actionTypes.DELETE_ISSUE_START,
                },
            ),
        ).toEqual({
            items: [
                { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
            ],
            isFetching: true,
        });
    });

    it("should handle DELETE_ISSUE_SUCCESS", () => {
        expect(
            issueReducer(
                {
                    items: [
                        { id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 },
                        { id: 2, name: "Issue 2", description: "My second issue", priority: "High", assigneeId: 3 },
                    ],
                    isFetching: true,
                },
                {
                    type: actionTypes.DELETE_ISSUE_SUCCESS,
                    issueId: 2,
                },
            ),
        ).toEqual({
            items: [{ id: 1, name: "Issue 1", description: "My first issue", priority: "Medium", assigneeId: 1 }],
            isFetching: false,
        });
    });
});
