import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIssues } from "src/redux/issues";
import { fetchUsers } from "src/redux/users";

import Header from "src/components/Header/Header";
import IssueListContainer from "src/containers/IssueListContainer";
import IssueDetailsContainer from "src/containers/IssueDetailsContainer";
import IssueEditFormContainer from "src/containers/IssueEditFormContainer";

class App extends Component {
    componentDidMount() {
        this.props.fetchIssues();
        this.props.fetchUsers();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={IssueListContainer} />
                        <Route exact path="/issues" component={IssueListContainer} />
                        <Route path="/issues/:id" component={IssueDetailsContainer} />
                        <Route
                            path="/createissue"
                            render={props => <IssueEditFormContainer {...props} mode="Create" />}
                        />
                        <Route
                            path="/updateissue/:id"
                            render={props => <IssueEditFormContainer {...props} mode="Update" />}
                        />
                    </Switch>
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
