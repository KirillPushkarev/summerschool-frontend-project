import React, { Component } from "react";
import "./styles.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";

import BoardColumn from "../BoardColumn/BoardColumn";

class Board extends Component {
    onDragEnd = result => {
        const { draggableId, source, destination } = result;
        if (!destination) return;

        const { issues, updateIssue } = this.props;

        if (source.droppableId === destination.droppableId) {
            // put here logic for reordering items in one column
        } else {
            const movedIssue = cloneDeep(issues.find(issue => issue.id === draggableId));
            movedIssue.status = destination.droppableId;
            updateIssue(movedIssue);
        }
    };

    render() {
        const { isInitialDataFetched, issues } = this.props;

        if (!isInitialDataFetched) return null;

        const statuses = ["To do", "In progress", "In review", "Done"];
        const boardGroupElements = statuses.map(status => (
            <BoardColumn key={status} status={status} issues={issues.filter(issue => issue.status === status)} />
        ));

        return (
            <div className="board">
                <DragDropContext onDragEnd={this.onDragEnd}>{boardGroupElements}</DragDropContext>
            </div>
        );
    }
}

export default Board;
