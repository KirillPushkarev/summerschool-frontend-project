import React, { Component } from "react";
import "./styles.scss";

import { Redirect } from "react-router-dom";

class IssueListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToDetails: false,
        };
    }

    onClick = e => {
        this.setState({
            redirectToDetails: true,
        });
    };

    render() {
        const { id, name } = this.props.issue;

        if (this.state.redirectToDetails) {
            return <Redirect push to={`/issues/${id}`} />;
        }

        return (
            <div className="issue-list__item" onClick={this.onClick}>
                <div className="issue-list__item-info">{name}</div>
                <div className="issue-list__item-remove-button" onClick={this.props.onRemove}>
                    Delete
                </div>
            </div>
        );
    }
}

export default IssueListItem;