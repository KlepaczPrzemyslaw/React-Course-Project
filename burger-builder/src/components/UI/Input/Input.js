import React from 'react';
import PropTypes from "prop-types";

const Input = (props) => {
    let inputElement = null;
    const {inputType, label, inputProps, value, valid, touched} = props;

    switch (inputType) {
        case 'input':
            inputElement =
                <input
                    className={"form__input" + (!valid && touched ? " form__input--invalid" : "")}
                    {...inputProps}
                    value={value}
                    onChange={props.onChange}/>;
            break;
        case 'textarea':
            inputElement =
                <textarea
                    className={"form__input" + (!valid && touched ? " form__input--invalid" : "")}
                    {...inputProps}
                    value={value}
                    onChange={props.onChange}>
                </textarea>;
            break;
        case 'select':
            let {options, ...rest} = inputProps;
            inputElement = (<select
                className={"form__input" + (!valid && touched ? " form__input--invalid" : "")}
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

Input.propTypes = {
    inputType: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputProps: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired
};

export default Input;
