import React, { Component } from 'react';
import './styles.css';

import IssueListItem from '../IssueListItem/IssueListItem';
import { Link } from 'react-router-dom'

class IssueList extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          issues: [],
        }
    }

    componentDidMount(){
        this.props.issueApiService.getIssues()
            .then(response => this.setState({ issues: response.data }));
    }

    onRemove = (issueId) => {
        this.props.issueApiService.deleteIssue(issueId);

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