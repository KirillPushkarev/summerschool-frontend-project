import { connect } from "react-redux";
import IssueList from "src/components/IssueList/IssueList";
import { deleteIssue } from "src/redux/issues";

const mapStateToProps = state => ({
    issues: state.issues.items,
});
const mapDispatchToProps = {
    deleteIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IssueList);
