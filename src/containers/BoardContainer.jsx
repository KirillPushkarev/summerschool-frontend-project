import { connect } from "react-redux";
import Board from "../components/Board/Board";
import { updateIssue } from "../redux/issues";

const mapStateToProps = state => ({
    issues: state.issues.items,
    isInitialDataFetched: state.issues.isInitialDataFetched && state.users.isInitialDataFetched,
});

const mapDispatchToProps = {
    updateIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
