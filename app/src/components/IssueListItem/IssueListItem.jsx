import React, { Component } from 'react';
import './styles.css';

import { Link } from 'react-router-dom'

class IssueListItem extends Component {
  render() {
    const { id, name } = this.props.issue;

    return (
        <div className="issue-list__item">
          <div className="issue-list__item-info">
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