import { ADD_ISSUE, addIssue } from "../src/redux/issues";

describe("actions", () => {
    it("should create an action to add an issue", () => {
        const issue = {
            name: "Issue 0",
            description: "My first issue",
            priority: "Medium",
            assigneeId: "1",
        };
        const expectedAction = {
            type: ADD_ISSUE,
            issue,
        };
        expect(addIssue(issue)).toEqual(expectedAction);
    });
});
