import React from 'react';
import PropTypes from "prop-types";

const Backdrop = (props) => (
    props.show ?
        <div className="backdrop" onClick={props.click}></div>
        : null
);

Backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    click: PropTypes.func.isRequired
};

export default Backdrop;
