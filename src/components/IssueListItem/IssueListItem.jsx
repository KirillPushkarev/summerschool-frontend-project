import React, { Component } from "react";
import "./styles.scss";

import { Redirect } from "react-router-dom";

class IssueListItem extends Component {
    state = {
        redirectToDetails: false,
    };

    onClick = () => {
        this.setState({
            redirectToDetails: true,
        });
    };

    render() {
        const { issue, onRemove } = this.props;
        const { id, name } = issue;

        if (this.state.redirectToDetails) {
            return <Redirect push to={`/issues/${id}`} />;
        }

        return (
            <div className="issue-list__item" onClick={this.onClick}>
                <div className="issue-list__item-info">{name}</div>
                <div className="issue-list__item-delete-btn-container">
                    <div className="delete-button" onClick={onRemove}>
                        Delete
                    </div>
                </div>
            </div>
        );
    }
}

export default IssueListItem;
