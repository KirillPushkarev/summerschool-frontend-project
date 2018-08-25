import React, { Component } from 'react';
import './styles.css';

import IssueBoardItem from '../IssueBoardItem/IssueBoardItem';

import axios from 'axios'

class Board extends Component {
  constructor(props){
    super(props);

    this.state = {
        issues: [],
    };
    axios.get("http://localhost:3004/issues")
          .then(response => this.setState({ issues: response.data }));
  }

  render() {
    const issueElements = this.state.issues.map(issue => <IssueBoardItem key={issue.id} issue={issue}/>);

    return (
        <div className="issue-list">
            {issueElements}
        </div>
    );
  }
}

export default Board;