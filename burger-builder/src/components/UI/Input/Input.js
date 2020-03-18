import React from 'react';
import PropTypes from "prop-types";

const input = (props) => {
    let inputElement = null;
    const {inputType, label, inputProps, value} = props;

    switch (inputType) {
        case 'input':
            inputElement =
                <input
                    className="form__input"
                    {...inputProps}
                    value={value}
                    onChange={props.onChange}/>;
            break;
        case 'textarea':
            inputElement =
                <textarea
                    className="form__input"
                    {...inputProps}
                    value={value}
                    onChange={props.onChange}>
                </textarea>;
            break;
        case 'select':
            let {options, ...rest} = inputProps;
            inputElement = (<select
                className="form__input"
                {...rest}
                onChange={props.onChange}
                value={value}>
                {
                    Object.entries(options).map(([, {key, value}]) =>
                        <option key={key} value={key}>{value}</option>
                    )
                }
            </select>);
            break;
        default:
            console.error(`This input does not exist -> ${inputType}`);
            break;
    }

    return (
        <div className="form">
            <label className="form__label">{label}</label>
            {inputElement}
        </div>
    );
};

input.propTypes = {
    inputType: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputProps: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default input;
