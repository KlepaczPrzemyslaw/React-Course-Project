import React from 'react';
import PropTypes from "prop-types";

const backdrop = (props) => (
    props.show ?
        <div className="backdrop" onClick={props.click}></div>
        : null
);

backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    click: PropTypes.func.isRequired
};

export default backdrop;
