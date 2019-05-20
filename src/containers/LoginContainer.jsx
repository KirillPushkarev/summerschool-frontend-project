import { connect } from "react-redux";
import { startAuth, successAuth, failAuth, logout } from "../redux/auth";
import Login from "../components/Login/Login";

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    startAuth,
    successAuth,
    failAuth,
    logout,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
