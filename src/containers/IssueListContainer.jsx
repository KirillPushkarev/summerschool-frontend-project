import { connect } from "react-redux";
import IssueList from "src/components/IssueList/IssueList";
import { deleteIssue } from "src/redux/issues";

const mapStateToProps = state => ({
    issues: state.issues.items,
    isInitialDataFetched: state.issues.isInitialDataFetched,
});
const mapDispatchToProps = {
    deleteIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IssueList);
