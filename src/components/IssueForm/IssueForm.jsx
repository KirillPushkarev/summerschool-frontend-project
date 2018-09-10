import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./styles.scss";
import ComboboxWithAvatars from "../ComboboxWithAvatars/ComboboxWithAvatars";

class IssueForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInitialDataFetched: this.props.isInitialDataFetched,
            issue: this.props.issue,
            isSubmitted: false,
            isCancelled: false,
            errors: [],
        };
    }

    // Need this to fill form fields if issues weren't fetched before constructor call
    static getDerivedStateFromProps(props, state) {
        if (!state.isInitialDataFetched && props.isInitialDataFetched) {
            return {
                isInitialDataFetched: true,
                issue: props.issue,
            };
        }
        return null;
    }

    onChange = (fieldName, value) => {
        this.setState(prevState => ({
            ...prevState,
            issue: { ...prevState.issue, [fieldName]: value },
        }));
    };

    validate = () => {
        const { issue } = this.state;
        const errors = [];

        if (!issue.name) {
            errors.push({ fieldName: "name", message: "Issue name cannot be empty." });
        }

        this.setState(prevState => ({ ...prevState, errors }));
        return errors.length === 0;
    };

    onSubmit = event => {
        event.preventDefault();

        if (!this.validate()) return;

        if (this.props.mode === "Create") {
            this.props.addIssue(this.state.issue);
        } else {
            this.props.updateIssue(this.state.issue);
        }
        this.setState(prevState => ({
            ...prevState,
            isSubmitted: true,
        }));
    };

    onCancel = event => {
        this.setState(prevState => ({
            ...prevState,
            isCancelled: true,
        }));

        event.preventDefault();
    };

    render() {
        const { mode, users, match } = this.props;
        const { issue, isInitialDataFetched, isCancelled, isSubmitted, errors } = this.state;

        if (!isInitialDataFetched) return null;

        if (isCancelled || isSubmitted) {
            if (mode === "Create") return <Redirect push to="/issues" />;
            return <Redirect push to={`/issues/${match.params.id}`} />;
        }

        return (
            <div className="issue-edit-form">
                <h1 className="issue-edit-form__title">{mode === "Create" ? "Create issue" : "Edit issue"}</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__name" className="issue-edit-form__label">
                            Name
                        </label>
                        {this.renderNameInput(issue)}
                    </div>

                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__description" className="issue-edit-form__label">
                            Description
                        </label>
                        {this.renderDescritionInput(issue)}
                    </div>

                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__priority" className="issue-edit-form__label">
                            Priority
                        </label>
                        {this.renderPriorityCombobox(issue)}
                    </div>

                    <div className="issue-edit-form__block">
                        <label className="issue-edit-form__label">Assignee</label>
                        {this.renderAssigneeCombobox(issue, users)}
                    </div>

                    <div className="issue-edit-form__errors">
                        {errors.map(error => (
                            <div key={error.fieldName} className="issue-edit-form__error">
                                {error.message}
                            </div>
                        ))}
                    </div>

                    <div className="issue-edit-form__btns-block">
                        <div className="issue-edit-form__submit-btn-container">
                            <button type="submit" className="primary-button">
                                Submit
                            </button>
                        </div>
                        <div className="issue-edit-form__cancel-btn-container">
                            <button type="button" className="cancel-button" onClick={this.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    renderNameInput = issue => (
        <div className="issue-edit-form__text-input-container">
            <input
                type="text"
                id="issue-edit-form__name"
                className="text-input"
                value={issue.name}
                onChange={e => this.onChange("name", e.target.value)}
                autoComplete="off"
            />
        </div>
    );

    renderDescritionInput = issue => (
        <div className="issue-edit-form__textarea-input-container">
            <textarea
                id="issue-edit-form__description"
                className="textarea-input"
                value={issue.description}
                onChange={e => this.onChange("description", e.target.value)}
            />
        </div>
    );

    renderPriorityCombobox = issue => (
        <div className="issue-edit-form__select-container">
            <select
                id="issue-edit-form__priority"
                className="select-input"
                value={issue.priority}
                onChange={e => this.onChange("priority", e.target.value)}
            >
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Lowest">Lowest</option>
            </select>
        </div>
    );

    renderAssigneeCombobox = (issue, users) => (
        <div className="issue-edit-form__select-container">
            <ComboboxWithAvatars
                options={[
                    { value: "-1", text: "Not assigned", imgSrc: null },
                    ...users.map(user => ({
                        value: user.id,
                        text: user.name,
                        imgSrc: user.avatar,
                    })),
                ]}
                selectedValue={issue.assigneeId}
                onChange={value => this.onChange("assigneeId", value)}
            />
        </div>
    );
}

export default IssueForm;
