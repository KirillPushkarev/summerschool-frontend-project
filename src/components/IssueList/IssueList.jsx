import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

import IssueListItem from "../IssueListItem/IssueListItem";

class IssueList extends Component {
    onRemove = (issueId, e) => {
        e.stopPropagation();
        this.props.deleteIssue(issueId);
    };

    render() {
        if (!this.props.isInitialDataFetched) return null;

        const issueElements = this.props.issues.map(issue => (
            <IssueListItem key={issue.id} issue={issue} onRemove={e => this.onRemove(issue.id, e)} />
        ));

        return (
            <div className="issue-list">
                <div className="issue-list__items">{issueElements}</div>
                <div className="issue-list__buttons-container">
                    <div className="issue-list__create-button-container">
                        <Link to="/createissue" className="secondary-button">
                            <i className="fas fa-plus issue-list__create-button-icon" />
                            Create issue
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default IssueList;
