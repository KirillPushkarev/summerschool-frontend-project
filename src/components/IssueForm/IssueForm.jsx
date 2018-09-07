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

    onSubmit = event => {
        event.preventDefault();

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
        if (!this.state.isInitialDataFetched) return null;

        if (this.state.isCancelled || this.state.isSubmitted) {
            if (this.props.mode === "Create") return <Redirect push to="/issues" />;
            else return <Redirect push to={`/issues/${this.props.match.params.id}`} />;
        }

        const { users } = this.props;
        const { issue } = this.state;

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
                    </div>

                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__description" className="issue-edit-form__label">
                            Description
                        </label>
                        <div className="issue-edit-form__textarea-input-container">
                            <textarea
                                id="issue-edit-form__description"
                                className="textarea-input"
                                value={issue.description}
                                onChange={e => this.onChange("description", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="issue-edit-form__block">
                        <label htmlFor="issue-edit-form__priority" className="issue-edit-form__label">
                            Priority
                        </label>
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
                    </div>

                    <div className="issue-edit-form__block">
                        <label className="issue-edit-form__label">Assignee</label>
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
                    </div>

                    <div className="issue-edit-form__btns-block">
                        <div className="issue-edit-form__submit-btn-container">
                            <input type="submit" className="primary-button" value="Submit" />
                        </div>
                        <button className="issue-edit-form__cancel-btn" onClick={this.onCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default IssueForm;
