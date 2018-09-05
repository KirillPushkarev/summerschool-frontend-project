import { connect } from "react-redux";
import Spinner from "../components/Spinner/Spinner";

const mapStateToProps = state => ({
    isFetching: state.issues.isFetching || state.users.isFetching,
});

export default connect(mapStateToProps)(Spinner);
