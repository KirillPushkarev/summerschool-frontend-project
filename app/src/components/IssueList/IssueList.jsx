import React, { Component } from "react";
import "./styles.css";

import IssueListItem from "../IssueListItem/IssueListItem";
import { Link } from "react-router-dom";

class IssueList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: [],
        };
    }

    componentDidMount() {
        this.props.issueApiService.getIssues().then(response => this.setState({ issues: response.data }));
    }

    onRemove = issueId => {
        this.setState({
            ...this.state,
            issues: this.state.issues.filter(issue => issue.id !== issueId),
        });

        this.props.issueApiService.deleteIssue(issueId);
    };

    render() {
        const issueElements = this.state.issues.map(issue => (
            <IssueListItem key={issue.id} issue={issue} onRemove={() => this.onRemove(issue.id)} />
        ));

        return (
            <div className="issue-list">
                <div className="issue-list__items">{issueElements}</div>
                <Link to={"/createissue"} className="issue-list__add-button">
                    Add
                </Link>
            </div>
        );
    }
}

export default IssueList;
