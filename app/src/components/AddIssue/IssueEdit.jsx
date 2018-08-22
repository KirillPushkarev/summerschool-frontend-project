import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import axios from 'axios'

class IssueEdit extends Component {
    constructor(props){
        super(props);

        if (this.props.mode === "Create"){
            this.state = {
                issue: {
                    name: "",
                    description: "",
                    status: "To do"
                },
                isSubmitted: false,
                isCancelled: false
            }
        } else {
            axios.get(`http://localhost:3004/issues/${this.props.match.params.id}`)
                .then(response => this.setState({ issue: response.data }));
            this.state = {
                isSubmitted: false,
                isCancelled: false
            }
        }
    }

    onChange = (event) => {
        this.setState({
            issue: {...this.state.issue, [event.target.id]: event.target.value }
        });
      }
    
    onSubmit = (event) => {
        event.preventDefault();

        if (this.props.mode === "Create"){
            axios.post(`http://localhost:3004/issues`, this.state.issue)
                .then(response => 
                    this.setState({
                        ...this.state,
                        isSubmitted: true,
                    }
                ));
        } else {
            axios.put(`http://localhost:3004/issues/${this.state.issue.id}`, this.state.issue)
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

    if (this.state.isCancelled || this.state.isSubmitted) return <Redirect to='/issues' />;

    return (
    <form onSubmit={this.onSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={this.state.issue.name} onChange={this.onChange} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={this.state.issue.description} onChange={this.onChange} />

        <input type="submit" value="Submit" />
        <button onClick={this.onCancel}>Cancel</button>
      </form>
    );
  }
}

export default IssueEdit;