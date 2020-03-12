import React from 'react';
import PropTypes from "prop-types";

const buildControl = (props) => {
    console.log(props.disabled);
    return (
        <div className="build-control">
            <div className="build-control__label">{props.label}</div>
            <button
                className="build-control__less"
                onClick={props.deleted}
                disabled={props.disabled}>
                Less
            </button>
            <button
                className="build-control__more"
                onClick={props.added}>
                More
            </button>
        </div>
    );
};

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    added: PropTypes.func.isRequired,
    deleted: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default buildControl;
