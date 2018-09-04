import React, { Component } from "react";
import "./styles.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class BoardItem extends Component {
    render() {
        const { issue, user, index } = this.props;
        const unassignedImageURL =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/WikiFont_uniE600_-_userAvatar_-_blue.svg/240px-WikiFont_uniE600_-_userAvatar_-_blue.svg.png";

        return (
            <Draggable draggableId={issue.id} index={index}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className="board__board-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {issue.name}
                            <div
                                className="board__board-item-avatar"
                                style={{
                                    backgroundImage: `url(${user ? user.avatar : unassignedImageURL})`,
                                }}
                            />
                        </div>
                    );
                }}
            </Draggable>
        );
    }
}

export default BoardItem;
