import React from "react";
import "./styles.scss";

export default ({ imgSrc }) => {
    const unassignedImageURL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/WikiFont_uniE600_-_userAvatar_-_blue.svg/240px-WikiFont_uniE600_-_userAvatar_-_blue.svg.png";

    return (
        <div
            className="avatar"
            style={{
                backgroundImage: `url(${imgSrc || unassignedImageURL})`,
            }}
        />
    );
};
