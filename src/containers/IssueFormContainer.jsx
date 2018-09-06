import { connect } from "react-redux";
import IssueForm from "../components/IssueForm/IssueForm";
import { addIssue, updateIssue } from "../redux/issues";

const initialIssueState = {
    name: "",
    description: "",
    priority: "Medium",
    status: "To do",
    assigneeId: "-1",
};

const mapStateToProps = (state, ownProps) => ({
    issue:
        ownProps.mode === "Create"
            ? initialIssueState
            : state.issues.items.find(issue => issue.id.toString() === ownProps.match.params.id),
    users: state.users.items,
    isInitialDataFetched:
        (ownProps.mode === "Create" || state.issues.isInitialDataFetched) && state.users.isInitialDataFetched,
});
const mapDispatchToProps = {
    addIssue,
    updateIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IssueForm);
