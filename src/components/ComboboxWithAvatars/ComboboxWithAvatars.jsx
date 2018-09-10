import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import Avatar from "../Avatar/Avatar";
import "./styles.scss";

class ComboboxWithAvatars extends Component {
    state = {
        closed: true,
    };

    onSelectedClick = () => {
        this.setState(prevState => ({
            closed: !prevState.closed,
        }));
    };

    onOptionClick = option => () => {
        this.setState({
            closed: true,
        });
        this.props.onChange(option.value);
    };

    onClickOutside = () => {
        this.setState({
            closed: true,
        });
    };

    render() {
        const { options, selectedValue } = this.props;
        const selectedOption = options.find(option => option.value === selectedValue);

        return (
            <div className="combobox">
                <div className="combobox__option combobox__selected-option" onClick={this.onSelectedClick}>
                    <div className="combobox__option-avatar-container">
                        <Avatar imgSrc={selectedOption.imgSrc} />
                    </div>
                    {selectedOption.text}
                    <i className="fas fa-angle-down combobox__selected-icon" />
                </div>
                <div className={`combobox__options${this.state.closed ? " combobox__options_hidden" : ""}`}>
                    {options.map(option => (
                        <div key={option.value} className="combobox__option" onClick={this.onOptionClick(option)}>
                            <div className="combobox__option-avatar-container">
                                <Avatar imgSrc={option.imgSrc} />
                            </div>
                            {option.text}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const clickOutsideConfig = {
    handleClickOutside: instance => instance.onClickOutside,
};
export default onClickOutside(ComboboxWithAvatars, clickOutsideConfig);
