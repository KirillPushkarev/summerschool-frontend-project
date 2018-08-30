import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import "../../common-styles/form-elements.scss";
import Combobox from "../Combobox/Combobox";

class IssueDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.issueApiService
            .getIssue(this.props.match.params.id)
            .then(response => this.setState({ issue: response.data }));
    }

    onChange = (fieldName, value) => {
        this.setState({
            issue: { ...this.state.issue, [fieldName]: value },
        });

        this.props.issueApiService.patchIssue(this.state.issue.id, { [fieldName]: value });
    };

    render() {
        if (!this.state.issue) return null;
        const { id, name, description, status, priority, assigneeId, comments } = this.state.issue;

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
                        <select
                            className="select-input"
                            value={priority}
                            onChange={e => this.onChange("priority", e.target.value)}
                        >
                            <option value="Highest">Highest</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            <option value="Lowest">Lowest</option>
                        </select>
                    </div>
                    <div className="issue-details__block">
                        <h2 className="issue-details__field-name">Status</h2>
                        <select
                            className="select-input"
                            value={status}
                            onChange={e => this.onChange("status", e.target.value)}
                        >
                            <option value="To do">To do</option>
                            <option value="In progress">In progress</option>
                            <option value="In review">In review</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="issue-details__block">
                        <h2 className="issue-details__field-name">Assignee</h2>
                        <div className="issue-details__assignee-container">
                            <Combobox
                                options={[
                                    { value: "-1", text: "Not assigned", imgSrc: null },
                                    ...this.props.users.map(user => ({
                                        value: user.id,
                                        text: user.name,
                                        imgSrc: user.avatar,
                                    })),
                                ]}
                                selectedValue={assigneeId}
                                onChange={value => this.onChange("assigneeId", value)}
                            />
                        </div>
                    </div>
                </div>
                <Link to={`/updateissue/${id}`} className="edit-button">
                    <i className="fas fa-pen edit-button-icon" />
                    Edit issue
                </Link>
            </div>
        );
    }
}

export default IssueDetails;
