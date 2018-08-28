import React, { Component } from "react";
import "./styles.css";

import { Link } from "react-router-dom";

class IssueListItem extends Component {
    render() {
        const { id, name } = this.props.issue;

        return (
            <Link to={`/issues/${id}`} className="issue-list__item" onClick={this.onClick}>
                <div className="issue-list__item-info">{name}</div>
                <div className="issue-list__item-remove-button" onClick={this.props.onRemove}>
                    Delete
                </div>
            </Link>
        );
    }
}

export default IssueListItem;
