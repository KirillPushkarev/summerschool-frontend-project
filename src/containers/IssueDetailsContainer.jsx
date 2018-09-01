import { connect } from "react-redux";
import IssueDetails from "src/components/IssueDetails/IssueDetails";
import { updateIssue } from "src/redux/issues";

const mapStateToProps = (state, ownProps) => ({
    issue: state.issues.items.find(issue => "" + issue.id === ownProps.match.params.id),
    users: state.users.items,
});
const mapDispatchToProps = {
    updateIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IssueDetails);
