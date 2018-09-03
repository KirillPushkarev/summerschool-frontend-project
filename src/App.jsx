import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIssues } from "./redux/issues";
import { fetchUsers } from "./redux/users";

import Header from "./components/Header/Header";
import IssueListContainer from "./containers/IssueListContainer";
import IssueDetailsContainer from "./containers/IssueDetailsContainer";
import IssueFormContainer from "./containers/IssueFormContainer";

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
                            render={props => <IssueFormContainer {...props} mode="Update" />}
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
