import React, { Component } from "react";
import "./styles.scss";
import { Draggable } from "react-beautiful-dnd";
import Avatar from "../Avatar/Avatar";

class BoardItem extends Component {
    render() {
        const { issue, user, index } = this.props;
        const unassignedImageURL =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/WikiFont_uniE600_-_userAvatar_-_blue.svg/240px-WikiFont_uniE600_-_userAvatar_-_blue.svg.png";

        return (
            <Draggable draggableId={issue.id} index={index}>
                {provided => (
                    <div
                        className="board__board-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {issue.name}
                        <div className="board__board-item-avatar-container">
                            <Avatar imgSrc={user ? user.avatar : null} />
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default BoardItem;
