import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : null)} />;
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    null,
)(PrivateRoute);
