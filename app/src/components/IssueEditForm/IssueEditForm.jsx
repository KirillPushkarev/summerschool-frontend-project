import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import "../../common-styles/form-elements.css";

class IssueEditForm extends Component {
    constructor(props) {
        super(props);

        if (this.props.mode === "Create") {
            this.state = {
                issue: {
                    name: "",
                    description: "",
                    priority: "Medium",
                    status: "To do",
                },
                isSubmitted: false,
                isCancelled: false,
            };
        } else {
            this.state = {
                isSubmitted: false,
                isCancelled: false,
            };
        }
    }

    componentDidMount() {
        if (this.props.mode === "Update") {
            this.props.issueApiService
                .getIssue(this.props.match.params.id)
                .then(response => this.setState({ issue: response.data }));
        }
    }

    onChange = fieldName => event => {
        this.setState({
            issue: { ...this.state.issue, [fieldName]: event.target.value },
        });
    };

    onSubmit = event => {
        event.preventDefault();

        if (this.props.mode === "Create") {
            this.props.issueApiService.postIssue(this.state.issue).then(response =>
                this.setState({
                    ...this.state,
                    isSubmitted: true,
                }),
            );
        } else {
            this.props.issueApiService.putIssue(this.state.issue).then(response =>
                this.setState({
                    ...this.state,
                    isSubmitted: true,
                }),
            );
        }
    };

    onCancel = event => {
        this.setState({
            ...this.state,
            isCancelled: true,
        });

        event.preventDefault();
    };

    render() {
        if (!this.state.issue) return null;

        if (this.state.isCancelled || this.state.isSubmitted) {
            if (this.props.mode === "Create") return <Redirect to="/issues" />;
            else return <Redirect to={`/issues/${this.props.match.params.id}`} />;
        }

        return (
            <div className="issue-edit-form">
                <h1 className="issue-edit-form__title">
                    {this.props.mode === "Create" ? "Create issue" : "Edit issue"}
                </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__name" className="issue-edit-form__label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="issue-edit-form__name"
                            className="text-input"
                            value={this.state.issue.name}
                            onChange={this.onChange("name")}
                            autoComplete="off"
                        />
                    </div>

                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__description" className="issue-edit-form__label">
                            Description
                        </label>
                        <textarea
                            id="issue-edit-form__description"
                            className="textarea-input"
                            value={this.state.issue.description}
                            onChange={this.onChange("description")}
                        />
                    </div>

                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__description" className="issue-edit-form__label">
                            Priority
                        </label>
                        <select
                            className="select-input"
                            value={this.state.issue.priority}
                            onChange={this.onChange("priority")}
                        >
                            <option value="Highest">Highest</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            <option value="Lowest">Lowest</option>
                        </select>
                    </div>

                    <div className="issue-edit-form__btns-block">
                        <input type="submit" className="issue-edit-form__submit-btn" value="Submit" />
                        <button className="issue-edit-form__cancel-btn" onClick={this.onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default IssueEditForm;
