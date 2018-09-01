import React, { Component } from "react";
import "./styles.scss";

class IssueBoardItem extends Component {
    render() {
        return <div>{this.props.issue.name}</div>;
    }
}

export default IssueBoardItem;
