import { connect } from "react-redux";
import IssueEditForm from "src/components/IssueEditForm/IssueEditForm";
import { addIssue, updateIssue } from "src/redux/issues";

const initialIssueState = {
    name: "",
    description: "",
    priority: "Medium",
    assigneeId: "-1",
};

const mapStateToProps = (state, ownProps) => ({
    issue:
        ownProps.mode === "Create"
            ? initialIssueState
            : state.issues.items.find(issue => "" + issue.id === ownProps.match.params.id),
    users: state.users.items,
});
const mapDispatchToProps = {
    addIssue,
    updateIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IssueEditForm);
