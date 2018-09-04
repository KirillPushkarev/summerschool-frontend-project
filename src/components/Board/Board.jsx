import React, { Component } from "react";
import "./styles.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { cloneDeep } from "lodash";

import BoardColumn from "../BoardColumn/BoardColumn";

class Board extends Component {
    onDragEnd = result => {
        const { draggableId, source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
        } else {
            const movedIssue = cloneDeep(this.props.issues.find(issue => issue.id === draggableId));
            movedIssue.status = destination.droppableId;
            this.props.updateIssue(movedIssue);
        }
    };

    render() {
        const statuses = ["To do", "In progress", "In review", "Done"];
        const boardGroupElements = statuses.map(status => (
            <BoardColumn
                key={status}
                status={status}
                issues={this.props.issues.filter(issue => issue.status === status)}
            />
        ));

        return (
            <div className="board">
                <DragDropContext onDragEnd={this.onDragEnd}>{boardGroupElements}</DragDropContext>
            </div>
        );
    }
}

export default Board;
