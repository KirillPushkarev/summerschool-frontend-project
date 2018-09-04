import React, { Component } from "react";
import "./styles.scss";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardItemContainer from "../../containers/BoardItemContainer";

class BoardColumn extends Component {
    render() {
        const { issues, status } = this.props;

        return (
            <div className="board__board-group">
                <div className="board__board-group-header">{status}</div>
                <Droppable droppableId={status} key={status}>
                    {(provided, snapshot) => (
                        <div
                            className={
                                snapshot.isDraggingOver
                                    ? "board__board-group-items board__board-group-items_highlighted"
                                    : "board__board-group-items"
                            }
                            ref={provided.innerRef}
                        >
                            {issues.map((issue, index) => (
                                <BoardItemContainer key={issue.id} issue={issue} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

export default BoardColumn;
