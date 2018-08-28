import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import "../../common-styles/form-elements.css";

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

    onChange = fieldName => event => {
        this.setState({
            issue: { ...this.state.issue, [fieldName]: event.target.value },
        });

        this.props.issueApiService.patchIssue(this.state.issue.id, { [fieldName]: event.target.value });
    };

    render() {
        if (!this.state.issue) return null;
        const { id, name, description, status, priority } = this.state.issue;

        return (
            <div className="issue-details">
                <Link to="/issues" className="issue-details__back-btn">
                    {"< Back to issues"}
                </Link>
                <h1 className="issue-details__title">{name}</h1>
                <Link to={`/updateissue/${id}`} className="issue-list__edit-button">
                    Edit
                </Link>

                <div className="issue-details__block">
                    <h2 className="issue-details__field-name">Description</h2>
                    <div className="issue-details__description">{description}</div>
                </div>
                <div className="issue-details__block">
                    <h2 className="issue-details__field-name">Priority</h2>
                    <select className="select-input" value={priority} onChange={this.onChange("priority")}>
                        <option value="Highest">Highest</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="Lowest">Lowest</option>
                    </select>
                </div>
                <div className="issue-details__block">
                    <h2 className="issue-details__field-name">Status</h2>
                    <select className="select-input" value={status} onChange={this.onChange("status")}>
                        <option value="To do">To do</option>
                        <option value="In progress">In progress</option>
                        <option value="In review">In review</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default IssueDetails;
