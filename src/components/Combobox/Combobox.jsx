import React, { Component } from "react";
import "./styles.scss";

import onClickOutside from "react-onclickoutside";

class Combobox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            closed: true,
            selectedOption: this.props.options.find(option => option.value === this.props.selectedValue),
        };
    }

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

        return (
            <div className="combobox">
                <div className="combobox__option combobox__selected-option" onClick={this.onSelectedClick}>
                    <div
                        className="combobox__option-avatar"
                        style={{
                            background: this.state.selectedOption.imgSrc
                                ? `url(${this.state.selectedOption.imgSrc})`
                                : "#ddd",
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
                                    background: option.imgSrc ? `url(${option.imgSrc})` : "#ddd",
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
export default onClickOutside(Combobox, clickOutsideConfig);
