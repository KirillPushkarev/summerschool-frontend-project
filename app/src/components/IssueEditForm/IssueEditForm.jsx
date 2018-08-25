import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './styles.css';

class IssueEditForm extends Component {
    constructor(props){
        super(props);

        if (this.props.mode === "Create"){
            this.state = {
                issue: {
                    name: "",
                    description: "",
                    priority: "Medium",
                    status: "To do"
                },
                isSubmitted: false,
                isCancelled: false
            }
        } else {
            this.state = {
                isSubmitted: false,
                isCancelled: false
            }
        }
    }

    componentDidMount(){
        this.props.issueApiService.getIssue(this.props.match.params.id)
            .then(response => this.setState({ issue: response.data }));
    }

    onChange = (fieldName) => (event) => {
        this.setState({
            issue: {...this.state.issue, [fieldName]: event.target.value }
        });
      }
    
    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.mode === "Create"){
            this.props.issueApiService.postIssue(this.state.issue)
                .then(response => 
                    this.setState({
                        ...this.state,
                        isSubmitted: true,
                    }
                ));
        } else {
            this.props.issueApiService.putIssue(this.state.issue.id, this.state.issue)
            .then(response => 
                this.setState({
                    ...this.state,
                    isSubmitted: true,
                }
            ));
        }
    }

    onCancel = (event) => {
        this.setState({
            ...this.state,
            isCancelled: true,
        });

        event.preventDefault();
    }

  render() {
    if (!this.state.issue) return null;

    if (this.state.isCancelled || this.state.isSubmitted){
        if (this.props.mode === "Create") return <Redirect to='/issues' />;
        else return <Redirect to={`/issues/${this.props.match.params.id}`} />;
    }

    return (
      <div className="issue-edit-form">
        <h1>{this.props.mode === "Create" ? "Create issue" : "Edit issue"}</h1>
        <form onSubmit={this.onSubmit}>
            <label htmlFor="issue-edit-form__name">Name</label>
            <input type="text" id="issue-edit-form__name" value={this.state.issue.name} onChange={this.onChange("name")} />

            <label htmlFor="issue-edit-form__description">Description</label>
            <textarea id="issue-edit-form__description" value={this.state.issue.description} onChange={this.onChange("description")} />

            <label htmlFor="issue-edit-form__description">Priority</label>
            <select value={this.state.issue.priority} onChange={this.onChange("priority")}>
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Lowest">Lowest</option>
            </select>

            <input type="submit" className="submit" value="Submit" />
            <button className="cancel" onClick={this.onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

export default IssueEditForm;