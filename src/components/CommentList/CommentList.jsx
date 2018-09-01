import React, { Component } from "react";
import "./styles.scss";

class CommentList extends Component {
  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
          <div key={comment.id}>{comment.text}</div>
        ))}
      </div>
    );
  }
}

export default CommentList;
