import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios'

class IssueDetails extends Component {
  constructor(props){
    super(props);
    
    this.state = {}
    axios.get(`http://localhost:3004/issues/${this.props.match.params.id}`)
      .then(response => this.setState({ issue: response.data }));
  }

  render() {
    if (!this.state.issue) return null;

    const {id, name, description, status } = this.state.issue;

    return (
        <div>
          <h1>Issue details</h1>
          <div>
            <div>{name}</div>
            <div>{description}</div>
            <div>{status}</div>
          </div>
          <Link to={`/updateissue/${id}`}>Edit</Link>
        </div>
    );
  }
}

export default IssueDetails;