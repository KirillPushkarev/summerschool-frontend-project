import { connect } from "react-redux";
import Board from "../components/Board/Board";
import { updateIssue } from "src/redux/issues";

const mapStateToProps = state => ({
    issues: state.issues.items,
});

const mapDispatchToProps = {
    updateIssue,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Board);
