import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import ComboboxWithAvatars from "../ComboboxWithAvatars/ComboboxWithAvatars";

class IssueDetails extends Component {
    render() {
        if (!this.props.isInitialDataFetched) return null;

        const { id, name, description, priority } = this.props.issue;

        return (
            <div>
                <div className="issue-details">
                    <Link to="/issues" className="issue-details__back-btn">
                        {"< Back to issues"}
                    </Link>
                    <h1 className="issue-details__title">{name}</h1>

                    <div className="issue-details__block">
                        <h2 className="issue-details__field-name">Description</h2>
                        <div className="issue-details__description">{description}</div>
                    </div>
                    <div className="issue-details__block">
                        <h2 className="issue-details__field-name">Priority</h2>
                        <div className="issue-details__priority">{priority}</div>
                    </div>
                    <div className="issue-details__block">
                        <h2 className="issue-details__field-name">Status</h2>
                        {this.renderStatusCombobox()}
                    </div>
                    <div className="issue-details__block">
                        <h2 className="issue-details__field-name">Assignee</h2>
                        {this.renderAssigneeCombobox()}
                    </div>
                </div>
                <div className="issue-details__edit-button-container">
                    <Link to={`/updateissue/${id}`} className="secondary-button">
                        <i className="fas fa-pen issue-details__edit-button-icon" />
                        Edit issue
                    </Link>
                </div>
            </div>
        );
    }

    onChange = (fieldName, value) => {
        this.props.updateIssue({ ...this.props.issue, [fieldName]: value });
    };

    renderStatusCombobox = () => (
        <div className="issue-details__select-container">
            <select
                className="select-input"
                value={this.props.issue.status}
                onChange={e => this.onChange("status", e.target.value)}
            >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="In review">In review</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );

    renderAssigneeCombobox = () => (
        <div className="issue-details__select-container">
            <ComboboxWithAvatars
                options={[
                    { value: "-1", text: "Not assigned", imgSrc: null },
                    ...this.props.users.map(user => ({
                        value: user.id,
                        text: user.name,
                        imgSrc: user.avatar,
                    })),
                ]}
                selectedValue={this.props.issue.assigneeId}
                onChange={value => this.onChange("assigneeId", value)}
            />
        </div>
    );
}

export default IssueDetails;
