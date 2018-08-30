import React, { Component } from "react";
import "./styles.scss";

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

    onRemove = (issueId, e) => {
        e.stopPropagation();
        this.setState({
            ...this.state,
            issues: this.state.issues.filter(issue => issue.id !== issueId),
        });

        this.props.issueApiService.deleteIssue(issueId);
    };

    render() {
        const issueElements = this.state.issues.map(issue => (
            <IssueListItem key={issue.id} issue={issue} onRemove={e => this.onRemove(issue.id, e)} />
        ));

        return (
            <div className="issue-list">
                <div className="issue-list__items">{issueElements}</div>
                <Link to={"/createissue"} className="issue-list__add-button">
                    Create issue
                </Link>
            </div>
        );
    }
}

export default IssueList;
