import { connect } from "react-redux";
import IssueDetails from "../components/IssueDetails/IssueDetails";
import { updateIssue } from "../redux/issues";

const mapStateToProps = (state, ownProps) => ({
    issue: state.issues.items.find(issue => issue.id.toString() === ownProps.match.params.id),
    users: state.users.items,
    isInitialDataFetched: state.issues.isInitialDataFetched && state.users.isInitialDataFetched,
});
const mapDispatchToProps = {
    updateIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IssueDetails);
