import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import IssueApiService from "src/api_services/IssueApiService";
import UserApiService from "src/api_services/UserApiService";

import Header from "src/components/Header/Header";
import IssueList from "src/components/IssueList/IssueList";
import Board from "src/components/Board/Board";
import IssueDetails from "src/components/IssueDetails/IssueDetails";
import IssueEditForm from "src/components/IssueEditForm/IssueEditForm";

class App extends Component {
    constructor(props) {
        super(props);
        this.issueApiService = new IssueApiService("http://localhost:8000");
        this.userApiService = new UserApiService("http://localhost:8000");
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.userApiService.getUsers().then(response => this.setState({ users: response.data }));
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={props => <IssueList {...props} issueApiService={this.issueApiService} />}
                        />
                        <Route
                            exact
                            path="/issues"
                            component={props => <IssueList {...props} issueApiService={this.issueApiService} />}
                        />
                        <Route
                            exact
                            path="/board"
                            component={props => <Board {...props} issueApiService={this.issueApiService} />}
                        />
                        <Route
                            path="/issues/:id"
                            component={props => (
                                <IssueDetails
                                    {...props}
                                    issueApiService={this.issueApiService}
                                    users={this.state.users}
                                />
                            )}
                        />
                        <Route
                            path="/createissue"
                            render={props => (
                                <IssueEditForm
                                    {...props}
                                    mode={"Create"}
                                    issueApiService={this.issueApiService}
                                    users={this.state.users}
                                />
                            )}
                        />
                        <Route
                            path="/updateissue/:id"
                            render={props => (
                                <IssueEditForm
                                    {...props}
                                    mode={"Update"}
                                    issueApiService={this.issueApiService}
                                    users={this.state.users}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
