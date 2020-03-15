import React, {Fragment, Component} from 'react';
import PropTypes from "prop-types";

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.show !== this.props.show) ||
            (nextProps.loading !== this.props.loading);
    }

    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} click={this.props.clickBackdrop}/>
                <div
                    className="modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    clickBackdrop: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Modal;
