import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIssues } from "./redux/issues";
import { fetchUsers } from "./redux/users";
import { successAuth } from "./redux/auth";

import Header from "./components/Header/Header";
import IssueListContainer from "./containers/IssueListContainer";
import IssueDetailsContainer from "./containers/IssueDetailsContainer";
import IssueFormContainer from "./containers/IssueFormContainer";
import BoardContainer from "./containers/BoardContainer";
import Callback from "./components/Callback/Callback";
import Guest from "./components/Guest/Guest";
import PrivateRoute from "./containers/PrivateRoute";
import { authService } from "./api_services/index";
import history from "./history";

import "./App.scss";

const handleAuthentication = ({ location }, successAuth) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        authService.handleAuthentication(() => successAuth());
    }
};

class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated && !nextProps.isInitialDataFetched) {
            nextProps.fetchIssues();
            nextProps.fetchUsers();
        }
    }

    render() {
        return (
            <Router history={history}>
                <div className="app">
                    <Header auth={authService} />

                    <div className="layout">
                        <Switch>
                            <PrivateRoute exact path="/" component={IssueListContainer} />
                            <PrivateRoute exact path="/issues" component={IssueListContainer} />
                            <PrivateRoute path="/issues/:id" component={IssueDetailsContainer} />
                            <PrivateRoute
                                path="/createissue"
                                component={props => <IssueFormContainer {...props} mode="Create" />}
                            />
                            <PrivateRoute
                                path="/updateissue/:id"
                                component={props => <IssueFormContainer {...props} mode="Update" />}
                            />
                            <PrivateRoute exact path="/board" component={BoardContainer} />
                            <Route
                                path="/callback"
                                component={props => {
                                    handleAuthentication(props, this.props.successAuth);
                                    return <Callback {...props} />;
                                }}
                            />
                        </Switch>
                        {!this.props.isAuthenticated && <Guest />}
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isInitialDataFetched: state.issues.isInitialDataFetched && state.users.isInitialDataFetched,
});

const mapDispatchToProps = {
    fetchIssues,
    fetchUsers,
    successAuth,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
