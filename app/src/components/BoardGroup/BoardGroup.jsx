import React, { Component } from "react";
import "./styles.css";

import IssueBoardItem from "../IssueBoardItem/IssueBoardItem";

class BoardGroup extends Component {
    render() {
        const issueElements = this.props.issues.map(issue => <IssueBoardItem key={issue.id} issue={issue} />);

        return <div className="board-group">{issueElements}</div>;
    }
}

export default BoardGroup;
