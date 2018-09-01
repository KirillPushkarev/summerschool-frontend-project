import React, { Component } from "react";
import "./styles.scss";

import IssueListItem from "../IssueListItem/IssueListItem";
import { Link } from "react-router-dom";

class IssueList extends Component {
    onRemove = (issueId, e) => {
        e.stopPropagation();
        this.props.deleteIssue(issueId);
    };

    render() {
        const issueElements = this.props.issues.map(issue => (
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
