import React, { Component } from 'react';
import './styles.css';

import { Link } from 'react-router-dom'

class IssueListItem extends Component {
  render() {
    const { id, name, description } = this.props.issue;

    return (
        <div className="issue-item">
          <div className="issue-item-info">
            <Link to={`/issues/${id}`}>
              {name}
            </Link>
          </div>

          <div className="issue-remove" onClick={this.props.onRemove}>Remove</div>
        </div>
    );
  }
}

export default IssueListItem;