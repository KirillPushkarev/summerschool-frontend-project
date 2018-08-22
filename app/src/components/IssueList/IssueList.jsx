import React, { Component } from 'react';

import IssueListItem from '../IssueListItem/IssueListItem';
import { Link } from 'react-router-dom'

import axios from 'axios'

class IssueList extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          issues: [],
        }
        axios.get("http://localhost:3004/issues")
            .then(response => this.setState({ issues: response.data }));
    }

    onRemove = (issueId) => {
        axios.delete(`http://localhost:3004/issues/${issueId}`);

        this.setState({
          ...this.state,
          issues: this.state.issues.filter(issue => issue.id !== issueId)
        });
    }

    render() {
        const issueElements = this.state.issues.map(issue => <IssueListItem key={issue.id} issue={issue} onRemove={() => this.onRemove(issue.id)}/>)

        return (
            <div className="issue-list">
                {issueElements}
                <Link to={"/createissue"}>Add</Link>
            </div>
        );
    }
}

export default IssueList;