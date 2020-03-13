import React, {Fragment} from 'react';
import PropTypes from "prop-types";

import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Fragment>
        <Backdrop show={props.show} click={props.clickBackdrop}/>
        <div
            className="modal"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Fragment>
);

modal.propTypes = {
    show: PropTypes.bool.isRequired,
    clickBackdrop: PropTypes.func.isRequired
};

export default modal;
