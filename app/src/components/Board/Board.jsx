import React, { Component } from "react";
import "./styles.css";

import BoardGroup from "../BoardGroup/BoardGroup";

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: [],
        };
    }

    componentDidMount() {
        this.props.issueApiService.getIssues().then(response => this.setState({ issues: response.data }));
    }

    render() {
        const statuses = ["To do", "In progress", "In review", "Done"];
        const boardGroupElements = statuses.map(status => (
            <BoardGroup
                key={status}
                status={status}
                issues={this.state.issues.filter(issue => issue.status === status)}
            />
        ));

        return <div className="board">{boardGroupElements}</div>;
    }
}

export default Board;
