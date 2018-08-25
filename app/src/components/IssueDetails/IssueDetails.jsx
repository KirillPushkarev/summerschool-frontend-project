import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

class IssueDetails extends Component {
  constructor(props){
    super(props);
    
    this.state = {}
  }

  componentDidMount(){
    this.props.issueApiService.getIssue(this.props.match.params.id)
      .then(response => this.setState({ issue: response.data }));
  }

  render() {
    if (!this.state.issue) return null;

    const {id, name, description, status, priority } = this.state.issue;

    return (
        <div className="issue-details">
          <h1>Issue details</h1>
          <div>
            <h2>Name</h2>
            <div>{name}</div>
            <h2>Description</h2>
            <div>{description}</div>
            <h2>Priority</h2>
            <div>{priority}</div>
            <h2>Status</h2>
            <div>{status}</div>
          </div>
          <Link to={`/updateissue/${id}`}>Edit</Link>
        </div>
    );
  }
}

export default IssueDetails;