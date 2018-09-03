import React, { Component } from "react";
import "./styles.scss";

import onClickOutside from "react-onclickoutside";

class ComboboxWithAvatars extends Component {
    state = {
        closed: true,
        selectedOption: this.props.options.find(option => option.value === this.props.selectedValue),
    };

    onSelectedClick = () => {
        this.setState(prevState => ({
            ...prevState,
            closed: !prevState.closed,
        }));
    };

    onOptionClick = option => () => {
        this.setState({
            closed: true,
            selectedOption: option,
        });
        this.props.onChange(option.value);
    };

    onClickOutside = () => {
        this.setState(prevState => ({
            ...prevState,
            closed: true,
        }));
    };

    render() {
        const { options } = this.props;
        const unassignedImageURL =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/WikiFont_uniE600_-_userAvatar_-_blue.svg/240px-WikiFont_uniE600_-_userAvatar_-_blue.svg.png";

        return (
            <div className="combobox">
                <div className="combobox__option combobox__selected-option" onClick={this.onSelectedClick}>
                    <div
                        className="combobox__option-avatar"
                        style={{
                            backgroundImage: `url(${
                                this.state.selectedOption.imgSrc ? this.state.selectedOption.imgSrc : unassignedImageURL
                            })`,
                        }}
                    />
                    {this.state.selectedOption.text}
                    <i className="fas fa-angle-down combobox__selected-icon" />
                </div>
                <div className={`combobox__options${this.state.closed ? " combobox__options_hidden" : ""}`}>
                    {options.map(option => (
                        <div key={option.value} className="combobox__option" onClick={this.onOptionClick(option)}>
                            <div
                                className="combobox__option-avatar"
                                style={{
                                    backgroundImage: `url(${option.imgSrc ? option.imgSrc : unassignedImageURL})`,
                                }}
                            />
                            {option.text}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const clickOutsideConfig = {
    handleClickOutside: function(instance) {
        return instance.onClickOutside;
    },
};
export default onClickOutside(ComboboxWithAvatars, clickOutsideConfig);
