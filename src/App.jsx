import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIssues } from "./redux/issues";
import { fetchUsers } from "./redux/users";

import Header from "./components/Header/Header";
import IssueListContainer from "./containers/IssueListContainer";
import IssueDetailsContainer from "./containers/IssueDetailsContainer";
import IssueFormContainer from "./containers/IssueFormContainer";
import BoardContainer from "./containers/BoardContainer";

import "./App.scss";

class App extends Component {
    componentDidMount() {
        this.props.fetchIssues();
        this.props.fetchUsers();
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Header />
                    <div className="layout">
                        <Switch>
                            <Route exact path="/" component={IssueListContainer} />
                            <Route exact path="/issues" component={IssueListContainer} />
                            <Route path="/issues/:id" component={IssueDetailsContainer} />
                            <Route
                                path="/createissue"
                                render={props => <IssueFormContainer {...props} mode="Create" />}
                            />
                            <Route
                                path="/updateissue/:id"
                                render={props => <IssueFormContainer {...props} mode="Update" />}
                            />
                            <Route exact path="/board" component={BoardContainer} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = {
    fetchIssues,
    fetchUsers,
};

export default connect(
    null,
    mapDispatchToProps,
)(App);
